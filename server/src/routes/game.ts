// Authoritative game rules: the client moves the hero and shows challenges, but every point,
// heart, shrine, chest and boss hit is decided here.
import { Router, type Response } from 'express';
import { z } from 'zod';
import { checkAnswer } from '../../../shared/check';
import { CHALLENGE_BY_ID } from '../../../shared/content';
import {
  ENCOUNTER_KINDS,
  EXTRA_HEARTS_CAP,
  EXTRA_LIFE_EVERY,
  GAME_OVER_PENALTY,
  HEROES,
  LAND_IDS,
  LANDS,
  POINTS,
  SHRINES_PER_LAND,
  TIMER_SLACK_MS,
  landUnlocked,
  timeLimitMs,
  type EncounterEvent,
  type EncounterResponse,
  type GameOverInfo,
  type HurtResponse,
  type LandId,
  type SaveState,
} from '../../../shared/game';
import { loadSave, writeSave } from '../account';
import { requireAuth, type AuthedRequest } from '../auth';
import { db, transaction } from '../db';

export const gameRouter = Router();

const LandEnum = z.enum(LAND_IDS as [LandId, ...LandId[]]);

const Answer = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('mcq'), choice: z.number().int() }),
  z.object({ kind: z.literal('fill'), values: z.array(z.string().max(200)).max(10) }),
  z.object({ kind: z.literal('order'), lines: z.array(z.string().max(500)).max(30) }),
  z.object({ kind: z.literal('bug'), line: z.number().int() }),
  z.object({ kind: z.literal('command'), text: z.string().max(500) }),
  z.object({ kind: z.literal('output'), text: z.string().max(2000) }),
  z.object({ kind: z.literal('riddle'), text: z.string().max(200) }),
  z.object({ kind: z.literal('code'), passed: z.boolean() }),
  z.object({ kind: z.literal('timeout') }),
]);

function withSave(req: AuthedRequest, res: Response): SaveState | null {
  const s = loadSave(req.userId!);
  if (!s) res.status(409).json({ error: 'No adventure started' });
  return s;
}

function playable(s: SaveState, land: LandId): boolean {
  return LANDS[land].playable && landUnlocked(s, land);
}

/** Adds (or removes) points; grants an extra heart each time the score passes a threshold. */
function addPoints(s: SaveState, land: LandId, delta: number, events: EncounterEvent[]): number {
  const before = s.score;
  s.score = Math.max(0, s.score + delta);
  s.lands[land].points = Math.max(0, s.lands[land].points + delta);
  while (s.score >= s.nextLifeAt) {
    s.nextLifeAt += EXTRA_LIFE_EVERY;
    if (s.hearts < s.maxHearts + EXTRA_HEARTS_CAP) {
      s.hearts++;
      events.push('extraLife');
    }
  }
  return s.score - before;
}

/** Removes a heart. At zero: Game Over, lose part of this Land's points, back to the checkpoint. */
function damage(s: SaveState, land: LandId): GameOverInfo | null {
  s.hearts = Math.max(0, s.hearts - 1);
  if (s.hearts > 0) return null;
  const p = s.lands[land];
  const pointsLost = Math.round(p.points * GAME_OVER_PENALTY);
  p.points -= pointsLost;
  s.score = Math.max(0, s.score - pointsLost);
  s.hearts = s.maxHearts;
  s.gameOvers++;
  s.bossFight = null;
  s.location = { scene: 'land', land, x: -1, y: -1 };
  return { pointsLost, checkpoint: p.checkpoint };
}

// ------------------------------------------------------------------ progress (position, flags)

const Progress = z.object({
  location: z
    .object({
      scene: z.enum(['village', 'world', 'land', 'boss']),
      land: LandEnum.optional(),
      x: z.number().min(-1).max(100000),
      y: z.number().min(-1).max(100000),
    })
    .optional(),
  flags: z.record(z.string().regex(/^[a-z0-9_:-]{1,40}$/i), z.boolean()).optional(),
  checkpoint: z.object({ land: LandEnum, id: z.string().max(20) }).optional(),
  introSeen: LandEnum.optional(),
});

gameRouter.post('/game/progress', requireAuth, (req: AuthedRequest, res) => {
  const parsed = Progress.safeParse(req.body);
  if (!parsed.success) return void res.status(400).json({ error: 'Invalid progress' });
  const s = withSave(req, res);
  if (!s) return;
  const { location, flags, checkpoint, introSeen } = parsed.data;

  if (location) {
    const ok = !location.land || playable(s, location.land);
    // The boss arena is never a resume point: you come back in front of its gate.
    if (ok) s.location = location.scene === 'boss' ? { ...location, scene: 'land', x: -1, y: -1 } : location;
  }
  if (flags && Object.keys(s.flags).length + Object.keys(flags).length <= 200) Object.assign(s.flags, flags);
  if (checkpoint && playable(s, checkpoint.land)) s.lands[checkpoint.land].checkpoint = checkpoint.id;
  if (introSeen) s.lands[introSeen].introSeen = true;

  writeSave(req.userId!, s);
  res.json({ save: s });
});

// ------------------------------------------------------------------ encounters

const Encounter = z.object({
  land: LandEnum,
  type: z.enum(['monster', 'shrine', 'chest', 'boss']),
  targetId: z.string().max(20),
  challengeId: z.string().max(40),
  answer: Answer,
  timeMs: z.number().min(0).max(3_600_000),
  hintUsed: z.boolean(),
});

gameRouter.post('/game/encounter', requireAuth, (req: AuthedRequest, res) => {
  const parsed = Encounter.safeParse(req.body);
  if (!parsed.success) return void res.status(400).json({ error: 'Invalid encounter' });
  const e = parsed.data;
  const userId = req.userId!;

  const result = transaction((): EncounterResponse | { status: number; error: string } => {
    const s = loadSave(userId);
    if (!s) return { status: 409, error: 'No adventure started' };
    if (!playable(s, e.land)) return { status: 403, error: 'This Land is locked' };
    const c = CHALLENGE_BY_ID.get(e.challengeId);
    if (!c || c.track !== e.land || !ENCOUNTER_KINDS[e.type].includes(c.kind)) {
      return { status: 400, error: 'Challenge does not match this encounter' };
    }
    const p = s.lands[e.land];
    const def = LANDS[e.land];
    const hero = HEROES[s.hero];

    let shrineIdx = -1;
    if (e.type === 'shrine') {
      shrineIdx = Number(e.targetId);
      if (!Number.isInteger(shrineIdx) || shrineIdx < 0 || shrineIdx >= SHRINES_PER_LAND) {
        return { status: 400, error: 'Unknown shrine' };
      }
    }
    if (e.type === 'chest' && !def.chests.includes(e.targetId)) return { status: 400, error: 'Unknown chest' };
    if (e.type === 'boss') {
      if (p.bossDefeated || s.bossFight?.land !== e.land) return { status: 409, error: 'No boss fight in progress' };
    }

    // Too slow on a timed challenge counts as a timeout, whatever the answer.
    const late = e.timeMs > timeLimitMs(e.type, s.hero) + TIMER_SLACK_MS;
    const correct = !late && checkAnswer(c, e.answer);

    const events: EncounterEvent[] = [];
    let delta = 0;

    if (e.hintUsed && (e.type === 'shrine' || e.type === 'chest')) {
      if (p.hintsUsed < hero.freeHintsPerLand) p.hintsUsed++;
      else delta += POINTS.hint;
    }

    db.prepare(
      `INSERT INTO attempts (user_id, challenge_id, correct_count, wrong_count, solved_at)
       VALUES (?, ?, ?, ?, CASE WHEN ? THEN datetime('now') END)
       ON CONFLICT (user_id, challenge_id) DO UPDATE SET
         correct_count = correct_count + excluded.correct_count,
         wrong_count = wrong_count + excluded.wrong_count,
         solved_at = COALESCE(solved_at, excluded.solved_at)`,
    ).run(userId, c.id, correct ? 1 : 0, correct ? 0 : 1, correct ? 1 : 0);

    let gameOver: GameOverInfo | null = null;
    if (correct) {
      let gain = 0;
      switch (e.type) {
        case 'monster': {
          const base = POINTS.monsterPerTier[c.tier];
          const speed = Math.max(0, 1 - e.timeMs / timeLimitMs('monster', s.hero));
          gain = base + Math.round(base * 0.5 * speed);
          break;
        }
        case 'shrine':
          if (!p.shrines.includes(shrineIdx)) {
            p.shrines.push(shrineIdx);
            gain = POINTS.shrine;
            events.push('shrineSolved');
            if (p.shrines.length === SHRINES_PER_LAND) events.push('gateOpened');
          }
          break;
        case 'chest':
          if (!p.chests.includes(e.targetId)) {
            p.chests.push(e.targetId);
            gain = c.kind === 'code' ? POINTS.chestCode : POINTS.chest;
            events.push('chestOpened');
          }
          break;
        case 'boss':
          s.bossFight!.hits++;
          gain = POINTS.bossHit;
          events.push('bossHit');
          if (s.bossFight!.hits >= def.bossHits) {
            p.bossDefeated = true;
            s.bossFight = null;
            gain += POINTS.bossDefeat;
            events.push('bossDefeated');
          }
          break;
      }
      delta += Math.round(gain * hero.pointsMultiplier);
    } else {
      delta += POINTS.wrong;
    }

    const pointsDelta = addPoints(s, e.land, delta, events);
    if (!correct) gameOver = damage(s, e.land);
    writeSave(userId, s);
    return { correct, pointsDelta, events, gameOver, save: s };
  });

  if ('status' in result) return void res.status(result.status).json({ error: result.error });
  res.json(result);
});

// ------------------------------------------------------------------ damage from monsters / projectiles

const lastHurt = new Map<number, number>();
const Hurt = z.object({ land: LandEnum, source: z.enum(['monster', 'projectile', 'boss']) });

gameRouter.post('/game/hurt', requireAuth, (req: AuthedRequest, res) => {
  const parsed = Hurt.safeParse(req.body);
  if (!parsed.success) return void res.status(400).json({ error: 'Invalid hit' });
  const s = withSave(req, res);
  if (!s) return;
  // The client grants ~1.5 s of invulnerability after a hit; ignore anything faster.
  const now = Date.now();
  const recent = now - (lastHurt.get(req.userId!) ?? 0) < 900;
  let gameOver: GameOverInfo | null = null;
  if (!recent && playable(s, parsed.data.land)) {
    lastHurt.set(req.userId!, now);
    gameOver = damage(s, parsed.data.land);
    writeSave(req.userId!, s);
  }
  const body: HurtResponse = { hearts: s.hearts, gameOver, save: s };
  res.json(body);
});

// ------------------------------------------------------------------ boss

gameRouter.post('/game/boss/start', requireAuth, (req: AuthedRequest, res) => {
  const parsed = z.object({ land: LandEnum }).safeParse(req.body);
  if (!parsed.success) return void res.status(400).json({ error: 'Invalid land' });
  const s = withSave(req, res);
  if (!s) return;
  const p = s.lands[parsed.data.land];
  if (!playable(s, parsed.data.land)) return void res.status(403).json({ error: 'This Land is locked' });
  if (p.shrines.length < SHRINES_PER_LAND) return void res.status(409).json({ error: 'The gate is still sealed' });
  if (p.bossDefeated) return void res.status(409).json({ error: 'Boss already defeated' });
  s.bossFight = { land: parsed.data.land, hits: 0 };
  writeSave(req.userId!, s);
  res.json({ save: s });
});
