import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { getDb } from '../db/schema.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'af-dev-secret-change-in-production';

const CLAIM_AMOUNT = 100;
const MAX_CLAIMS = 10_000;

const TASKS = [
  { id: 'wallet',   label: 'Connect wallet',     reward: 10 },
  { id: 'bot',      label: 'Create a bot',        reward: 40 },
  { id: 'telegram', label: 'Join Telegram',        reward: 10 },
  { id: 'x_follow', label: 'Follow on X',          reward: 10 },
  { id: 'tweet',    label: 'Tweet your bot link',  reward: 30 },
] as const;

const TASK_IDS = TASKS.map(t => t.id);

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

function getUserTasks(userId: string) {
  const db = getDb();
  const rows = db.prepare('SELECT task, proof, completed_at FROM claim_tasks WHERE user_id = ?').all(userId) as {
    task: string; proof: string | null; completed_at: string;
  }[];
  const completed = new Set(rows.map(r => r.task));
  return TASKS.map(t => ({
    ...t,
    completed: completed.has(t.id),
    proof: rows.find(r => r.task === t.id)?.proof || null,
  }));
}

// ─── Public: claim stats ─────────────────────────────────────────────────
router.get('/stats', (_req, res) => {
  const db = getDb();
  const row = db.prepare(
    `SELECT COUNT(*) as total FROM claims WHERE status IN ('reserved', 'distributed')`
  ).get() as { total: number };

  res.json({
    total_claimed: row.total,
    max_claims: MAX_CLAIMS,
    remaining: Math.max(0, MAX_CLAIMS - row.total),
    claim_amount: CLAIM_AMOUNT,
    tasks: TASKS,
  });
});

// ─── Auth: full claim status for current user ────────────────────────────
router.get('/status', (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const db = getDb();

  const botCount = (db.prepare('SELECT COUNT(*) as c FROM bots WHERE user_id = ?').get(userId) as { c: number }).c;
  const claim = db.prepare('SELECT * FROM claims WHERE user_id = ?').get(userId) as any | undefined;

  const totalClaimed = (db.prepare(
    `SELECT COUNT(*) as c FROM claims WHERE status IN ('reserved', 'distributed')`
  ).get() as { c: number }).c;

  const spotsLeft = Math.max(0, MAX_CLAIMS - totalClaimed);
  const tasks = getUserTasks(userId);
  const completedCount = tasks.filter(t => t.completed).length;
  const allDone = completedCount === TASKS.length;

  res.json({
    eligible: allDone && !claim && spotsLeft > 0,
    has_bots: botCount > 0,
    claimed: !!claim,
    claim: claim || null,
    spots_remaining: spotsLeft,
    total_claimed: totalClaimed,
    max_claims: MAX_CLAIMS,
    claim_amount: CLAIM_AMOUNT,
    tasks,
    completed_count: completedCount,
    total_tasks: TASKS.length,
  });
});

// ─── Auth: complete a task ───────────────────────────────────────────────
router.post('/task', (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const { task, proof } = req.body;

  if (!task || !TASK_IDS.includes(task)) {
    return res.status(400).json({ message: `Invalid task. Must be one of: ${TASK_IDS.join(', ')}` });
  }

  const db = getDb();
  const taskDef = TASKS.find(t => t.id === task)!;

  // Auto-verify: bot task requires at least one bot
  if (task === 'bot') {
    const botCount = (db.prepare('SELECT COUNT(*) as c FROM bots WHERE user_id = ?').get(userId) as { c: number }).c;
    if (botCount === 0) {
      return res.status(403).json({ message: 'You must create a bot first' });
    }
  }

  // Auto-verify: wallet task requires a wallet address as proof
  if (task === 'wallet') {
    if (!proof || typeof proof !== 'string' || proof.length < 32 || proof.length > 44) {
      return res.status(400).json({ message: 'Valid Solana wallet address required' });
    }
  }

  // Tweet task requires a URL as proof
  if (task === 'tweet') {
    if (!proof || typeof proof !== 'string' || !proof.includes('x.com/') && !proof.includes('twitter.com/')) {
      return res.status(400).json({ message: 'Tweet URL required (x.com or twitter.com link)' });
    }
  }

  // Check if already completed
  const existing = db.prepare('SELECT id FROM claim_tasks WHERE user_id = ? AND task = ?').get(userId, task);
  if (existing) {
    return res.status(409).json({ message: 'Task already completed' });
  }

  db.prepare(
    'INSERT INTO claim_tasks (user_id, task, reward, proof) VALUES (?, ?, ?, ?)'
  ).run(userId, task, taskDef.reward, proof || null);

  const tasks = getUserTasks(userId);
  const completedCount = tasks.filter(t => t.completed).length;

  res.json({
    success: true,
    task,
    reward: taskDef.reward,
    tasks,
    completed_count: completedCount,
    total_tasks: TASKS.length,
    all_done: completedCount === TASKS.length,
  });
});

// ─── Auth: reserve claim (requires all tasks done) ──────────────────────
router.post('/reserve', (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const db = getDb();

  // Check all tasks completed
  const tasks = getUserTasks(userId);
  const incompleteTasks = tasks.filter(t => !t.completed);
  if (incompleteTasks.length > 0) {
    return res.status(403).json({
      message: `Complete all tasks first. Missing: ${incompleteTasks.map(t => t.label).join(', ')}`,
      missing: incompleteTasks.map(t => t.id),
    });
  }

  // Get wallet address from the wallet task
  const walletTask = db.prepare("SELECT proof FROM claim_tasks WHERE user_id = ? AND task = 'wallet'").get(userId) as { proof: string } | undefined;
  if (!walletTask?.proof) {
    return res.status(400).json({ message: 'Wallet address not found' });
  }

  // Check if already claimed
  const existing = db.prepare('SELECT id FROM claims WHERE user_id = ?').get(userId);
  if (existing) {
    return res.status(409).json({ message: 'You have already reserved your claim' });
  }

  // Check global cap
  const totalClaimed = (db.prepare(
    `SELECT COUNT(*) as c FROM claims WHERE status IN ('reserved', 'distributed')`
  ).get() as { c: number }).c;

  if (totalClaimed >= MAX_CLAIMS) {
    return res.status(410).json({ message: 'All claims have been taken' });
  }

  const result = db.prepare(
    `INSERT INTO claims (user_id, wallet_address, amount, status) VALUES (?, ?, ?, 'reserved')`
  ).run(userId, walletTask.proof, CLAIM_AMOUNT);

  const claim = db.prepare('SELECT * FROM claims WHERE id = ?').get(result.lastInsertRowid);

  res.json({
    success: true,
    claim,
    message: `Reserved ${CLAIM_AMOUNT} $FREDO for wallet ${walletTask.proof}`,
  });
});

export default router;
