import { keysCollected, LAND_IDS, newSave, emptyLand, type Account, type MeResponse, type SaveState } from '../../shared/game';
import type { UserSettings } from '../../shared/types';
import { db, getUser } from './db';

export const DEFAULT_SETTINGS: UserSettings = {
  lang: 'en',
  musicVolume: 0.5,
  sfxVolume: 0.7,
  crt: true,
  reducedMotion: false,
};

export function accountOf(userId: number): Account {
  const u = getUser(userId);
  if (!u) throw new Error('User not found');
  return { id: u.id, username: u.username, settings: { ...DEFAULT_SETTINGS, ...JSON.parse(u.settings) } };
}

export function loadSave(userId: number): SaveState | null {
  const row = db.prepare('SELECT state FROM saves WHERE user_id = ?').get(userId) as { state: string } | undefined;
  if (!row) return null;
  const s = JSON.parse(row.state) as SaveState;
  // Forward-compatible: Lands added after the save was created start empty.
  for (const id of LAND_IDS) s.lands[id] ??= emptyLand();
  return s;
}

export function writeSave(userId: number, s: SaveState): void {
  db.prepare(
    `INSERT INTO saves (user_id, state, score, keys, updated_at) VALUES (?, ?, ?, ?, datetime('now'))
     ON CONFLICT (user_id) DO UPDATE SET state = excluded.state, score = excluded.score,
       keys = excluded.keys, updated_at = excluded.updated_at`,
  ).run(userId, JSON.stringify(s), s.score, keysCollected(s));
}

export function createSave(userId: number, hero: Parameters<typeof newSave>[0], skin: number): SaveState {
  const s = newSave(hero, skin);
  writeSave(userId, s);
  return s;
}

export function solvedIds(userId: number): string[] {
  return (
    db.prepare('SELECT challenge_id FROM attempts WHERE user_id = ? AND solved_at IS NOT NULL').all(userId) as {
      challenge_id: string;
    }[]
  ).map((r) => r.challenge_id);
}

export function me(userId: number): MeResponse {
  return { account: accountOf(userId), save: loadSave(userId), solved: solvedIds(userId) };
}
