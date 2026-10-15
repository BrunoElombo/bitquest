import { Router } from 'express';
import { z } from 'zod';
import { HEROES, type HeroClass } from '../../../shared/game';
import { accountOf, createSave, DEFAULT_SETTINGS, me } from '../account';
import { requireAuth, type AuthedRequest } from '../auth';
import { db, getUser } from '../db';

export const meRouter = Router();

meRouter.get('/me', requireAuth, (req: AuthedRequest, res) => {
  res.json(me(req.userId!));
});

const SettingsPatch = z
  .object({
    lang: z.enum(['en', 'fr']),
    musicVolume: z.number().min(0).max(1),
    sfxVolume: z.number().min(0).max(1),
    crt: z.boolean(),
    reducedMotion: z.boolean(),
  })
  .partial();

meRouter.patch('/me/settings', requireAuth, (req: AuthedRequest, res) => {
  const parsed = SettingsPatch.safeParse(req.body);
  if (!parsed.success) return void res.status(400).json({ error: 'Invalid settings' });
  const user = getUser(req.userId!)!;
  const merged = { ...DEFAULT_SETTINGS, ...JSON.parse(user.settings), ...parsed.data };
  db.prepare('UPDATE users SET settings = ? WHERE id = ?').run(JSON.stringify(merged), user.id);
  res.json(accountOf(user.id));
});

const NewGame = z.object({
  hero: z.enum(Object.keys(HEROES) as [HeroClass, ...HeroClass[]]),
  skin: z.number().int().min(0).max(5),
});

/** Starts a new adventure (replaces any existing save). */
meRouter.post('/save/new', requireAuth, (req: AuthedRequest, res) => {
  const parsed = NewGame.safeParse(req.body);
  if (!parsed.success) return void res.status(400).json({ error: 'Invalid hero' });
  const save = createSave(req.userId!, parsed.data.hero, parsed.data.skin);
  res.status(201).json({ save });
});

meRouter.get('/leaderboard', (_req, res) => {
  const rows = db
    .prepare(
      `SELECT u.username, s.score, s.keys, s.state FROM saves s JOIN users u ON u.id = s.user_id
       WHERE s.score > 0 ORDER BY s.score DESC LIMIT 25`,
    )
    .all() as { username: string; score: number; keys: number; state: string }[];
  res.json({
    entries: rows.map((r, i) => ({
      rank: i + 1,
      username: r.username,
      score: r.score,
      keys: r.keys,
      hero: (JSON.parse(r.state) as { hero: HeroClass }).hero,
    })),
  });
});
