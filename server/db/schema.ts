import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_PATH = process.env.DB_PATH || path.join(process.cwd(), 'data', 'platform.db');

let db: Database.Database;

export function getDb(): Database.Database {
  if (!db) {
    // Ensure data dir exists
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    initDb(db);
  }
  return db;
}

function initDb(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      balance_cents INTEGER DEFAULT 0,
      stripe_customer_id TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS bots (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id),
      name TEXT NOT NULL,
      persona TEXT DEFAULT 'friendly',
      model TEXT DEFAULT 'anthropic',
      system_prompt TEXT DEFAULT '',
      channel TEXT DEFAULT '',
      status TEXT DEFAULT 'offline',
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS integrations (
      id TEXT PRIMARY KEY,
      bot_id TEXT NOT NULL REFERENCES bots(id),
      type TEXT NOT NULL,
      config TEXT DEFAULT '{}',
      status TEXT DEFAULT 'available',
      connected_at TEXT
    );

    CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id),
      type TEXT NOT NULL,
      amount_cents INTEGER NOT NULL,
      description TEXT DEFAULT '',
      stripe_session_id TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS claims (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL UNIQUE REFERENCES users(id),
      wallet_address TEXT NOT NULL,
      amount INTEGER NOT NULL DEFAULT 100,
      status TEXT DEFAULT 'reserved',
      tx_signature TEXT,
      reserved_at TEXT DEFAULT (datetime('now')),
      distributed_at TEXT
    );

    CREATE INDEX IF NOT EXISTS idx_claims_wallet ON claims(wallet_address);
    CREATE INDEX IF NOT EXISTS idx_claims_status ON claims(status);

    CREATE TABLE IF NOT EXISTS claim_tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      task TEXT NOT NULL,
      reward INTEGER NOT NULL DEFAULT 0,
      proof TEXT,
      completed_at TEXT DEFAULT (datetime('now')),
      UNIQUE(user_id, task)
    );

    CREATE INDEX IF NOT EXISTS idx_claim_tasks_user ON claim_tasks(user_id);
  `);

  // Add columns to existing databases (safe to run repeatedly)
  try { db.exec('ALTER TABLE users ADD COLUMN balance_cents INTEGER DEFAULT 0'); } catch {}
  try { db.exec('ALTER TABLE users ADD COLUMN stripe_customer_id TEXT'); } catch {}
}
