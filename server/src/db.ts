import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
// Built into Node >= 22.13: no native module to compile, no database server to run.
import { DatabaseSync } from 'node:sqlite';

const here = dirname(fileURLToPath(import.meta.url));
export const DATA_DIR = resolve(here, '..', 'data');
mkdirSync(DATA_DIR, { recursive: true });

export const db = new DatabaseSync(process.env.DB_PATH ?? resolve(DATA_DIR, 'bitquest.db'));

db.exec(`
  PRAGMA journal_mode = WAL;
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS users (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    username      TEXT NOT NULL UNIQUE COLLATE NOCASE,
    password_hash TEXT NOT NULL,
    settings      TEXT NOT NULL DEFAULT '{}',
    created_at    TEXT NOT NULL DEFAULT (datetime('now'))
  );

  -- One adventure per account. The full state is JSON; score is copied out for the leaderboard.
  CREATE TABLE IF NOT EXISTS saves (
    user_id    INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    state      TEXT NOT NULL,
    score      INTEGER NOT NULL DEFAULT 0,
    keys       INTEGER NOT NULL DEFAULT 0,
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE INDEX IF NOT EXISTS saves_score ON saves(score DESC);

  -- Every challenge ever answered, for the Codex and to prefer unseen questions.
  CREATE TABLE IF NOT EXISTS attempts (
    user_id       INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    challenge_id  TEXT NOT NULL,
    correct_count INTEGER NOT NULL DEFAULT 0,
    wrong_count   INTEGER NOT NULL DEFAULT 0,
    solved_at     TEXT,
    PRIMARY KEY (user_id, challenge_id)
  );
`);

export interface UserRow {
  id: number;
  username: string;
  password_hash: string;
  settings: string;
  created_at: string;
}

export function getUser(id: number): UserRow | undefined {
  return db.prepare('SELECT * FROM users WHERE id = ?').get(id) as UserRow | undefined;
}

export function getUserByName(username: string): UserRow | undefined {
  return db.prepare('SELECT * FROM users WHERE username = ?').get(username) as UserRow | undefined;
}

/** Runs `fn` inside a transaction (node:sqlite has no helper for it). */
export function transaction<T>(fn: () => T): T {
  db.exec('BEGIN');
  try {
    const out = fn();
    db.exec('COMMIT');
    return out;
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
}
