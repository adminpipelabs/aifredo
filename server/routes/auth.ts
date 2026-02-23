import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Resend } from 'resend';
import { getDb } from '../db/schema.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'af-dev-secret-change-in-production';
const APP_URL = process.env.APP_URL || 'http://localhost:3000';
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const FROM_EMAIL = process.env.FROM_EMAIL || 'Aifredo <onboarding@resend.dev>';

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

// In-memory magic link token store (replace with DB/Redis in production)
const magicTokens = new Map<string, { email: string; expiresAt: number }>();

// Clean up expired tokens periodically
setInterval(() => {
  const now = Date.now();
  for (const [token, data] of magicTokens) {
    if (data.expiresAt < now) magicTokens.delete(token);
  }
}, 60_000);

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    const db = getDb();
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const id = crypto.randomUUID();
    const passwordHash = await bcrypt.hash(password, 10);

    db.prepare('INSERT INTO users (id, name, email, password_hash) VALUES (?, ?, ?, ?)').run(
      id, name, email, passwordHash
    );

    const botId = crypto.randomUUID();
    db.prepare('INSERT INTO bots (id, user_id, name) VALUES (?, ?, ?)').run(
      botId, id, `${name}'s Bot`
    );

    const token = jwt.sign({ userId: id }, JWT_SECRET, { expiresIn: '30d' });

    res.json({
      user: { id, name, email },
      token,
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const db = getDb();
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as {
      id: string; name: string; email: string; password_hash: string;
    } | undefined;

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '30d' });

    res.json({
      user: { id: user.id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Magic link: request a login link
router.post('/magic-link', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const db = getDb();
    const user = db.prepare('SELECT id, email FROM users WHERE email = ?').get(email) as {
      id: string; email: string;
    } | undefined;

    // Always return success to prevent email enumeration
    if (!user) {
      console.log(`[magic-link] No account found for ${email}`);
      return res.json({ message: 'If an account exists, a login link has been sent.' });
    }

    // Generate a secure token
    const magicToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes

    magicTokens.set(magicToken, { email: user.email, expiresAt });

    const loginUrl = `${APP_URL}/auth/verify?token=${magicToken}`;

    if (resend) {
      try {
        await resend.emails.send({
          from: FROM_EMAIL,
          to: user.email,
          subject: 'Your Aifredo login link',
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
              <h2 style="color: #1a1a2e; margin-bottom: 16px;">Sign in to Aifredo</h2>
              <p style="color: #555; line-height: 1.6;">Click the button below to sign in. This link expires in 15 minutes.</p>
              <a href="${loginUrl}" style="display: inline-block; margin: 24px 0; padding: 14px 32px; background: linear-gradient(135deg, #4f46e5, #7c3aed); color: white; text-decoration: none; border-radius: 12px; font-weight: 600;">Sign In</a>
              <p style="color: #999; font-size: 13px;">If you didn't request this, you can safely ignore this email.</p>
            </div>
          `,
        });
        console.log(`[magic-link] Email sent to ${user.email}`);
      } catch (emailErr) {
        console.error('[magic-link] Failed to send email:', emailErr);
        return res.status(500).json({ message: 'Failed to send login email. Please try again.' });
      }
    } else {
      // Fallback: log to console in dev when RESEND_API_KEY is not set
      console.log(`\n===== MAGIC LOGIN LINK (no email service configured) =====`);
      console.log(`Email: ${user.email}`);
      console.log(`Link: ${loginUrl}`);
      console.log(`Expires: ${new Date(expiresAt).toISOString()}`);
      console.log(`=========================================================\n`);
    }

    res.json({ message: 'If an account exists, a login link has been sent.' });
  } catch (err) {
    console.error('Magic link error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Magic link: verify token and log in
router.post('/verify-magic-link', async (req, res) => {
  try {
    const { token: magicToken } = req.body;

    if (!magicToken) {
      return res.status(400).json({ message: 'Token is required' });
    }

    const tokenData = magicTokens.get(magicToken);

    if (!tokenData) {
      return res.status(401).json({ message: 'Invalid or expired login link' });
    }

    if (tokenData.expiresAt < Date.now()) {
      magicTokens.delete(magicToken);
      return res.status(401).json({ message: 'Login link has expired. Please request a new one.' });
    }

    // Token is valid — consume it (single use)
    magicTokens.delete(magicToken);

    const db = getDb();
    const user = db.prepare('SELECT id, name, email FROM users WHERE email = ?').get(tokenData.email) as {
      id: string; name: string; email: string;
    } | undefined;

    if (!user) {
      return res.status(401).json({ message: 'Account not found' });
    }

    const jwtToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '30d' });

    res.json({
      user: { id: user.id, name: user.name, email: user.email },
      token: jwtToken,
    });
  } catch (err) {
    console.error('Verify magic link error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const payload = jwt.verify(authHeader.slice(7), JWT_SECRET) as { userId: string };
    const db = getDb();
    const user = db.prepare('SELECT id, name, email FROM users WHERE id = ?').get(payload.userId) as {
      id: string; name: string; email: string;
    } | undefined;

    if (!user) return res.status(401).json({ message: 'User not found' });

    res.json({ user });
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
});

export default router;
