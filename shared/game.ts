// BitQuest game rules shared by the client (to play) and the server (to validate and save).
import { CHALLENGES_BY_TRACK, MODE_KINDS } from './content';
import type { Challenge, ChallengeKind, L, Tier, TrackId } from './types';

// ------------------------------------------------------------------ Heroes

export type HeroClass = 'knight' | 'mage' | 'rogue' | 'bard';

export interface HeroDef {
  id: HeroClass;
  name: L;
  perk: L;
  /** Frames in the Tiny Dungeon spritesheet, one per skin. */
  skins: number[];
  maxHearts: number;
  /** Walking speed in pixels per second. */
  speed: number;
  /** Extra time on timed challenges. */
  timerBonusMs: number;
  pointsMultiplier: number;
  freeHintsPerLand: number;
}

export const HEROES: Record<HeroClass, HeroDef> = {
  knight: {
    id: 'knight',
    name: { en: 'Knight', fr: 'Chevalier' },
    perk: { en: '+1 heart (4 instead of 3)', fr: '+1 cœur (4 au lieu de 3)' },
    skins: [96, 97, 87],
    maxHearts: 4,
    speed: 72,
    timerBonusMs: 0,
    pointsMultiplier: 1,
    freeHintsPerLand: 0,
  },
  mage: {
    id: 'mage',
    name: { en: 'Mage', fr: 'Mage' },
    perk: { en: '1 free hint in every Land', fr: '1 indice gratuit dans chaque Terre' },
    skins: [84, 111],
    maxHearts: 3,
    speed: 72,
    timerBonusMs: 0,
    pointsMultiplier: 1,
    freeHintsPerLand: 1,
  },
  rogue: {
    id: 'rogue',
    name: { en: 'Rogue', fr: 'Voleur' },
    perk: { en: 'Moves faster, +3 s on timed challenges', fr: 'Plus rapide, +3 s sur les défis chronométrés' },
    skins: [112, 98],
    maxHearts: 3,
    speed: 92,
    timerBonusMs: 3000,
    pointsMultiplier: 1,
    freeHintsPerLand: 0,
  },
  bard: {
    id: 'bard',
    name: { en: 'Bard', fr: 'Barde' },
    perk: { en: 'Points ×1.2', fr: 'Points ×1,2' },
    skins: [85, 86, 88],
    maxHearts: 3,
    speed: 72,
    timerBonusMs: 0,
    pointsMultiplier: 1.2,
    freeHintsPerLand: 0,
  },
};

// ------------------------------------------------------------------ Lands

export type LandId = TrackId;

export interface LandDef {
  id: LandId;
  name: L;
  /** Lands that must be cleared (boss defeated) before this one opens. */
  requires: LandId[];
  /** False while the Land is still "in the fog" (not built yet). */
  playable: boolean;
  /** Chest ids placed on the map. */
  chests: string[];
  /** Correct answers needed on boss runes to defeat the boss. */
  bossHits: number;
  /** Word of the Restore Spell revealed by this Land. */
  spellWord: L;
}

export const SHRINES_PER_LAND = 3;

export const LANDS: Record<LandId, LandDef> = {
  javascript: {
    id: 'javascript',
    name: { en: 'JS Land · Scriptopolis', fr: 'Terre JS · Scriptopolis' },
    requires: [],
    playable: true,
    chests: ['c1', 'c2', 'c3'],
    bossHits: 6,
    spellWord: { en: 'RESOLVE', fr: 'RÉSOUDS' },
  },
  python: {
    id: 'python',
    name: { en: 'Python Land · Pythonia', fr: 'Terre Python · Pythonia' },
    requires: [],
    playable: true,
    chests: ['c1', 'c2', 'c3'],
    bossHits: 6,
    spellWord: { en: 'IMPORT', fr: 'IMPORTE' },
  },
  linux: {
    id: 'linux',
    name: { en: 'Linux Land · Penguin Peaks', fr: 'Terre Linux · Pics du Pingouin' },
    requires: [],
    playable: true,
    chests: ['c1', 'c2', 'c3'],
    bossHits: 6,
    spellWord: { en: 'MOUNT', fr: 'MONTE' },
  },
  typescript: {
    id: 'typescript',
    name: { en: 'TypeScript Land · Typeholm', fr: 'Terre TypeScript · Typeholm' },
    requires: ['javascript'],
    playable: false,
    chests: ['c1', 'c2', 'c3'],
    bossHits: 7,
    spellWord: { en: 'DECLARE', fr: 'DÉCLARE' },
  },
  nodejs: {
    id: 'nodejs',
    name: { en: 'Node Land · Nodeheim', fr: 'Terre Node · Nodeheim' },
    requires: ['javascript'],
    playable: false,
    chests: ['c1', 'c2', 'c3'],
    bossHits: 7,
    spellWord: { en: 'LISTEN', fr: 'ÉCOUTE' },
  },
  java: {
    id: 'java',
    name: { en: 'Java Land · Javalon', fr: 'Terre Java · Javalon' },
    requires: ['python'],
    playable: false,
    chests: ['c1', 'c2', 'c3'],
    bossHits: 7,
    spellWord: { en: 'CONSTRUCT', fr: 'CONSTRUIS' },
  },
  git: {
    id: 'git',
    name: { en: 'Git Land · Branchwood', fr: 'Terre Git · Bois-Branche' },
    requires: ['linux'],
    playable: false,
    chests: ['c1', 'c2', 'c3'],
    bossHits: 7,
    spellWord: { en: 'COMMIT', fr: 'VALIDE' },
  },
  github: {
    id: 'github',
    name: { en: 'GitHub Land · Octoport', fr: 'Terre GitHub · Octoport' },
    requires: ['git'],
    playable: false,
    chests: ['c1', 'c2', 'c3'],
    bossHits: 7,
    spellWord: { en: 'MERGE', fr: 'FUSIONNE' },
  },
  devops: {
    id: 'devops',
    name: { en: 'DevOps Land · Cloud Isles', fr: 'Terre DevOps · Îles Nuages' },
    requires: ['nodejs', 'git'],
    playable: false,
    chests: ['c1', 'c2', 'c3'],
    bossHits: 8,
    spellWord: { en: 'DEPLOY', fr: 'DÉPLOIE' },
  },
  ai: {
    id: 'ai',
    name: { en: 'AI Land · Neuralis', fr: 'Terre IA · Neuralis' },
    requires: ['python'],
    playable: true,
    chests: ['c1', 'c2', 'c3'],
    bossHits: 7,
    spellWord: { en: 'LEARN', fr: 'APPRENDS' },
  },
};

export const LAND_IDS = Object.keys(LANDS) as LandId[];

// ------------------------------------------------------------------ Scoring & lives

export const POINTS = {
  monsterPerTier: { 1: 100, 2: 150, 3: 200, 4: 300 } as Record<Tier, number>,
  shrine: 500,
  chest: 300,
  chestCode: 450,
  bossHit: 250,
  bossDefeat: 2000,
  wrong: -50,
  hint: -100,
};

/** An extra heart every N points (up to max hearts + EXTRA_HEARTS_CAP). */
export const EXTRA_LIFE_EVERY = 5000;
export const EXTRA_HEARTS_CAP = 2;
/** Share of the current Land's points lost on Game Over. */
export const GAME_OVER_PENALTY = 0.2;
export const ENCOUNTER_TIME_MS = { monster: 25000, boss: 20000 };
/** Network/rendering slack the server tolerates on timers. */
export const TIMER_SLACK_MS = 2500;

export type EncounterType = 'monster' | 'shrine' | 'chest' | 'boss';

/** Which challenge kinds each kind of encounter uses. */
export const ENCOUNTER_KINDS: Record<EncounterType, ChallengeKind[]> = {
  monster: MODE_KINDS.battle,
  boss: MODE_KINDS.battle,
  shrine: MODE_KINDS.enigma,
  chest: MODE_KINDS.puzzle,
};

export function isTimed(type: EncounterType): boolean {
  return type === 'monster' || type === 'boss';
}

export function timeLimitMs(type: EncounterType, hero: HeroClass): number {
  if (type !== 'monster' && type !== 'boss') return Infinity;
  return ENCOUNTER_TIME_MS[type] + HEROES[hero].timerBonusMs;
}

// ------------------------------------------------------------------ Save

export interface LandProgress {
  points: number;
  introSeen: boolean;
  /** Indexes (0..2) of solved shrines. */
  shrines: number[];
  chests: string[];
  bossDefeated: boolean;
  /** Id of the last checkpoint touched in this Land. */
  checkpoint: string | null;
  hintsUsed: number;
}

export type SceneId = 'village' | 'world' | 'land' | 'boss';

export interface SaveState {
  hero: HeroClass;
  skin: number;
  hearts: number;
  maxHearts: number;
  score: number;
  nextLifeAt: number;
  location: { scene: SceneId; land?: LandId; x: number; y: number };
  lands: Record<LandId, LandProgress>;
  flags: Record<string, boolean>;
  /** Active boss fight: correct rune answers so far. */
  bossFight: { land: LandId; hits: number } | null;
  gameOvers: number;
}

export function emptyLand(): LandProgress {
  return { points: 0, introSeen: false, shrines: [], chests: [], bossDefeated: false, checkpoint: null, hintsUsed: 0 };
}

export function newSave(hero: HeroClass, skin: number): SaveState {
  const def = HEROES[hero];
  return {
    hero,
    skin: Math.max(0, Math.min(skin, def.skins.length - 1)),
    hearts: def.maxHearts,
    maxHearts: def.maxHearts,
    score: 0,
    nextLifeAt: EXTRA_LIFE_EVERY,
    location: { scene: 'village', x: -1, y: -1 },
    lands: Object.fromEntries(LAND_IDS.map((id) => [id, emptyLand()])) as Record<LandId, LandProgress>,
    flags: {},
    bossFight: null,
    gameOvers: 0,
  };
}

export function landUnlocked(save: SaveState, land: LandId): boolean {
  return LANDS[land].requires.every((r) => save.lands[r].bossDefeated);
}

export function keysCollected(save: SaveState): number {
  return LAND_IDS.filter((id) => save.lands[id].bossDefeated).length;
}

/** Which tiers a Land's challenges come from, growing with the learner's progress there. */
export function tierCap(save: SaveState, land: LandId, type: EncounterType): Tier {
  const p = save.lands[land];
  if (type === 'boss') return 4;
  const progress = p.shrines.length + p.chests.length + (p.bossDefeated ? 3 : 0);
  return Math.min(4, 1 + Math.floor(progress / 2)) as Tier;
}

/**
 * Chooses a challenge for an encounter: right kind, unlocked tier, unsolved first, avoiding
 * the ones just seen. Shrine i prefers tier i+1 so the three letters get progressively harder.
 */
export function pickChallenge(opts: {
  land: LandId;
  type: EncounterType;
  maxTier: Tier;
  solved: Set<string>;
  recent: string[];
  preferTier?: Tier;
  /**
   * Restricts the draw to these challenge ids (a zone's monsters or a chest's puzzle), so the
   * people of that zone can give hints for exactly what will be asked. The tier cap does not
   * apply to them; an empty or unusable list falls back to the whole Land.
   */
  only?: string[];
}): Challenge | null {
  const kinds = ENCOUNTER_KINDS[opts.type];
  const all = CHALLENGES_BY_TRACK[opts.land].filter((c) => kinds.includes(c.kind));
  const zone = opts.only?.length ? all.filter((c) => opts.only!.includes(c.id)) : [];
  const pool = zone.length ? zone : all.filter((c) => c.tier <= opts.maxTier);
  if (!pool.length) return null;
  const fresh = pool.filter((c) => !opts.recent.includes(c.id));
  const candidates = fresh.length ? fresh : pool;
  const score = (c: Challenge) =>
    (opts.solved.has(c.id) ? 0 : 10) +
    (opts.preferTier ? 6 - Math.abs(c.tier - opts.preferTier) * 3 : c.tier) +
    Math.random() * 5;
  return [...candidates].sort((a, b) => score(b) - score(a))[0];
}

// ------------------------------------------------------------------ API payloads

export interface Account {
  id: number;
  username: string;
  settings: import('./types').UserSettings;
}

export interface MeResponse {
  account: Account;
  save: SaveState | null;
  solved: string[];
}

export interface EncounterRequest {
  land: LandId;
  type: EncounterType;
  /** Monster id, shrine index ("0".."2"), chest id, or "rune". */
  targetId: string;
  challengeId: string;
  answer: import('./types').AnswerValue;
  timeMs: number;
  hintUsed: boolean;
}

export interface GameOverInfo {
  pointsLost: number;
  checkpoint: string | null;
}

export type EncounterEvent = 'shrineSolved' | 'gateOpened' | 'chestOpened' | 'bossHit' | 'bossDefeated' | 'extraLife';

export interface EncounterResponse {
  correct: boolean;
  pointsDelta: number;
  events: EncounterEvent[];
  gameOver: GameOverInfo | null;
  save: SaveState;
}

export interface HurtResponse {
  hearts: number;
  gameOver: GameOverInfo | null;
  save: SaveState;
}
