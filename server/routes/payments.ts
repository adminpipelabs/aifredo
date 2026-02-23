import { Router } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import Stripe from 'stripe';
import { getDb } from '../db/schema.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'af-dev-secret-change-in-production';

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || '';
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';
const APP_URL = process.env.APP_URL || 'http://localhost:3000';

let stripe: Stripe | null = null;
if (STRIPE_SECRET_KEY) {
  stripe = new Stripe(STRIPE_SECRET_KEY);
}

function getUserId(req: any): string | null {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return null;
  try {
    const payload = jwt.verify(authHeader.slice(7), JWT_SECRET) as { userId: string };
    return payload.userId;
  } catch {
    return null;
  }
}

// ─── Balance & Transactions ─────────────────────────────────

router.get('/balance', (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const db = getDb();
  const user = db.prepare('SELECT balance_cents FROM users WHERE id = ?').get(userId) as { balance_cents: number } | undefined;
  res.json({ balance_cents: user?.balance_cents || 0 });
});

router.get('/transactions', (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const db = getDb();
  const transactions = db.prepare(
    'SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT 50'
  ).all(userId);
  res.json({ transactions });
});

// ─── Activate Checkout (no auth required — creates account from Stripe) ─────

router.post('/activate-checkout', async (req, res) => {
  if (!stripe) {
    return res.status(503).json({ message: 'Payment system not configured. Set STRIPE_SECRET_KEY.' });
  }

  const { amount_cents, draft_bots } = req.body;

  const allowedAmounts = [500, 1000, 2500];
  if (!allowedAmounts.includes(amount_cents)) {
    return res.status(400).json({ message: 'Invalid top-up amount' });
  }

  // If user is already logged in, use their existing account
  const existingUserId = getUserId(req);

  try {
    const sessionData: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'AgentForge Balance',
              description: `$${(amount_cents / 100).toFixed(0)} starting balance — activate your bots`,
            },
            unit_amount: amount_cents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        amount_cents: String(amount_cents),
        draft_bot_count: String((draft_bots || []).length),
        draft_bot_names: (draft_bots || []).map((b: any) => b.name).join(', ').slice(0, 490),
        ...(existingUserId ? { agentforge_user_id: existingUserId } : {}),
        flow: 'activate',
      },
      success_url: `${APP_URL}/activate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_URL}/activate`,
    };

    // If existing user, attach their Stripe customer
    if (existingUserId) {
      const db = getDb();
      const user = db.prepare('SELECT stripe_customer_id, email, name FROM users WHERE id = ?').get(existingUserId) as {
        stripe_customer_id: string | null; email: string; name: string;
      } | undefined;

      if (user?.stripe_customer_id) {
        sessionData.customer = user.stripe_customer_id;
      } else if (user) {
        sessionData.customer_email = user.email;
      }
    }

    const session = await stripe.checkout.sessions.create(sessionData);
    res.json({ url: session.url });
  } catch (err) {
    console.error('Activate checkout error:', err);
    res.status(500).json({ message: 'Failed to create payment session' });
  }
});

// ─── Verify & Complete Activation ───────────────────────────

router.post('/activate-verify', async (req, res) => {
  if (!stripe) {
    return res.status(503).json({ message: 'Payment system not configured' });
  }

  const { session_id, draft_bots: clientDrafts } = req.body;
  if (!session_id) return res.status(400).json({ message: 'Missing session_id' });

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== 'paid') {
      return res.status(400).json({ message: 'Payment not completed' });
    }

    const amountCents = parseInt(session.metadata?.amount_cents || '0', 10);
    if (amountCents <= 0) {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const db = getDb();

    // Idempotency — check if already processed
    const existingTx = db.prepare('SELECT id FROM transactions WHERE stripe_session_id = ?').get(session_id);
    if (existingTx) {
      // Already processed — find the user and return their token
      const tx = db.prepare('SELECT user_id FROM transactions WHERE stripe_session_id = ?').get(session_id) as { user_id: string };
      const user = db.prepare('SELECT id, name, email, balance_cents FROM users WHERE id = ?').get(tx.user_id) as any;
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '30d' });
      return res.json({ token, user: { id: user.id, name: user.name, email: user.email }, balance_cents: user.balance_cents, already_processed: true });
    }

    // Get customer email from Stripe
    const customerEmail = session.customer_details?.email || session.customer_email || '';
    const customerName = session.customer_details?.name || customerEmail.split('@')[0] || 'Bot Owner';

    if (!customerEmail) {
      return res.status(400).json({ message: 'No email found in payment session' });
    }

    // Check if user already exists with this email
    let userId = session.metadata?.agentforge_user_id || null;
    let user: any = null;

    if (userId) {
      user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    }

    if (!user) {
      user = db.prepare('SELECT * FROM users WHERE email = ?').get(customerEmail);
    }

    if (!user) {
      // Auto-create account — no password needed (Stripe is their identity)
      userId = crypto.randomUUID();
      const randomPass = crypto.randomBytes(32).toString('hex');
      const passwordHash = await bcrypt.hash(randomPass, 10);

      db.prepare('INSERT INTO users (id, name, email, password_hash, balance_cents, stripe_customer_id) VALUES (?, ?, ?, ?, 0, ?)').run(
        userId,
        customerName,
        customerEmail,
        passwordHash,
        typeof session.customer === 'string' ? session.customer : null,
      );
      user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    } else {
      userId = user.id;
      // Update Stripe customer ID if missing
      if (!user.stripe_customer_id && typeof session.customer === 'string') {
        db.prepare('UPDATE users SET stripe_customer_id = ? WHERE id = ?').run(session.customer, userId);
      }
    }

    // Credit the balance
    db.prepare('UPDATE users SET balance_cents = balance_cents + ? WHERE id = ?').run(amountCents, userId);

    // Record transaction
    db.prepare(
      'INSERT INTO transactions (id, user_id, type, amount_cents, description, stripe_session_id) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(crypto.randomUUID(), userId, 'topup', amountCents, `Activation: $${(amountCents / 100).toFixed(2)}`, session_id);

    // Migrate draft bots from client request body
    const drafts: any[] = Array.isArray(clientDrafts) ? clientDrafts : [];

    for (const draft of drafts) {
      if (!draft.name?.trim()) continue;
      const botId = crypto.randomUUID();
      db.prepare(`
        INSERT INTO bots (id, user_id, name, persona, model, channel, system_prompt, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'online')
      `).run(
        botId,
        userId,
        draft.name.trim(),
        draft.persona || 'friendly',
        draft.model || 'anthropic',
        draft.channel || '',
        draft.system_prompt || 'You are a helpful personal AI assistant.',
      );
    }

    // Remove auto-created default bot if we migrated drafts
    if (drafts.length > 0) {
      db.prepare("DELETE FROM bots WHERE user_id = ? AND name LIKE '%''s Bot'").run(userId);
    }

    // Generate JWT
    const freshUser = db.prepare('SELECT id, name, email, balance_cents FROM users WHERE id = ?').get(userId) as any;
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '30d' });

    console.log(`[payments] Activated user ${userId} (${customerEmail}) with ${amountCents} cents and ${drafts.length} bots`);

    res.json({
      token,
      user: { id: freshUser.id, name: freshUser.name, email: freshUser.email },
      balance_cents: freshUser.balance_cents,
      bots_migrated: drafts.length,
    });
  } catch (err) {
    console.error('Activate verify error:', err);
    res.status(500).json({ message: 'Failed to verify activation' });
  }
});

// ─── Top-up Checkout (for existing authenticated users) ─────

router.post('/create-checkout', async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  if (!stripe) {
    return res.status(503).json({ message: 'Payment system not configured. Set STRIPE_SECRET_KEY.' });
  }

  const { amount_cents } = req.body;
  const allowedAmounts = [500, 1000, 2500];
  if (!allowedAmounts.includes(amount_cents)) {
    return res.status(400).json({ message: 'Invalid top-up amount' });
  }

  const db = getDb();
  const user = db.prepare('SELECT id, email, name, stripe_customer_id FROM users WHERE id = ?').get(userId) as {
    id: string; email: string; name: string; stripe_customer_id: string | null;
  } | undefined;

  if (!user) return res.status(404).json({ message: 'User not found' });

  try {
    let customerId = user.stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email, name: user.name,
        metadata: { agentforge_user_id: user.id },
      });
      customerId = customer.id;
      db.prepare('UPDATE users SET stripe_customer_id = ? WHERE id = ?').run(customerId, user.id);
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'AgentForge Balance Top-Up', description: `Add $${(amount_cents / 100).toFixed(0)} to your balance` },
          unit_amount: amount_cents,
        },
        quantity: 1,
      }],
      metadata: { agentforge_user_id: user.id, amount_cents: String(amount_cents), flow: 'topup' },
      success_url: `${APP_URL}/topup?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_URL}/topup`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    res.status(500).json({ message: 'Failed to create payment session' });
  }
});

// ─── Verify top-up (for existing users) ─────────────────────

router.post('/verify', async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  if (!stripe) return res.status(503).json({ message: 'Payment system not configured' });

  const { session_id } = req.body;
  if (!session_id) return res.status(400).json({ message: 'Missing session_id' });

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.metadata?.agentforge_user_id !== userId) {
      return res.status(403).json({ message: 'Session does not belong to this user' });
    }
    if (session.payment_status !== 'paid') {
      return res.status(400).json({ message: 'Payment not completed' });
    }

    const amountCents = parseInt(session.metadata?.amount_cents || '0', 10);
    if (amountCents <= 0) return res.status(400).json({ message: 'Invalid amount' });

    const db = getDb();
    const existing = db.prepare('SELECT id FROM transactions WHERE stripe_session_id = ?').get(session_id);

    if (existing) {
      const user = db.prepare('SELECT balance_cents FROM users WHERE id = ?').get(userId) as { balance_cents: number };
      return res.json({ balance_cents: user.balance_cents, already_credited: true });
    }

    db.prepare('UPDATE users SET balance_cents = balance_cents + ? WHERE id = ?').run(amountCents, userId);
    db.prepare(
      'INSERT INTO transactions (id, user_id, type, amount_cents, description, stripe_session_id) VALUES (?, ?, ?, ?, ?, ?)'
    ).run(crypto.randomUUID(), userId, 'topup', amountCents, `Top-up: $${(amountCents / 100).toFixed(2)}`, session_id);

    const user = db.prepare('SELECT balance_cents FROM users WHERE id = ?').get(userId) as { balance_cents: number };
    res.json({ balance_cents: user.balance_cents, credited: amountCents });
  } catch (err) {
    console.error('Payment verify error:', err);
    res.status(500).json({ message: 'Failed to verify payment' });
  }
});

// ─── Stripe Webhook (backup) ────────────────────────────────

router.post('/webhook', async (req, res) => {
  if (!stripe || !STRIPE_WEBHOOK_SECRET) {
    return res.status(503).json({ message: 'Webhook not configured' });
  }

  const sig = req.headers['stripe-signature'] as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return res.status(400).json({ message: 'Invalid signature' });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.agentforge_user_id;
    const amountCents = parseInt(session.metadata?.amount_cents || '0', 10);

    if (userId && amountCents > 0) {
      const db = getDb();
      const existing = db.prepare('SELECT id FROM transactions WHERE stripe_session_id = ?').get(session.id);

      if (!existing) {
        db.prepare('UPDATE users SET balance_cents = balance_cents + ? WHERE id = ?').run(amountCents, userId);
        db.prepare(
          'INSERT INTO transactions (id, user_id, type, amount_cents, description, stripe_session_id) VALUES (?, ?, ?, ?, ?, ?)'
        ).run(crypto.randomUUID(), userId, 'topup', amountCents, `Top-up: $${(amountCents / 100).toFixed(2)} (webhook)`, session.id);
        console.log(`[payments] Webhook credited ${amountCents} cents to user ${userId}`);
      }
    }
  }

  res.json({ received: true });
});

export default router;
