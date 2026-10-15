import type Phaser from 'phaser';
import type { LandId } from '@shared/game';
import type { L } from '@shared/types';
import type { Scene as MusicScene } from '../../audio/music';
import type { DialogueLine } from '../../store';
import type { MapDraft } from '../mapBuilder';

export interface NpcDef {
  frame: number;
  /** Shown the first time you talk to them. */
  first: DialogueLine[];
  /** Then one of these, in turn. */
  tips: DialogueLine[][];
}

export interface MonsterDef {
  frame: number;
  name: L;
  speed: number;
  tint?: number;
}

/**
 * One volley of a boss:
 * - fan: a spread aimed at the hero (3/5/7 shots by phase)
 * - ring: a full circle around the boss
 * - wall: a row sweeping down the arena with one gap to slip through
 * - rain: shots falling straight down from random columns, plus one aimed at the hero
 */
export type BossAttack = 'fan' | 'ring' | 'wall' | 'rain';

/** How the boss moves over the top of its arena. */
export type BossMovement = 'sway' | 'slither' | 'stomp' | 'drift';

export interface BossArenaDef {
  /** Tiny Dungeon frame used as the boss portrait (and as its sprite unless `texture` is set). */
  frame: number;
  /** Generated texture (see textures.ts) drawn instead of `frame` in the arena. */
  texture?: string;
  tint: number;
  scale: number;
  /** Builds the arena map; the boss hovers over the top rows. */
  arena: () => MapDraft;
  /** Projectile texture (default 'bubble') and its tint (0xffffff keeps its colours). */
  projectile?: string;
  projectileTint: number;
  /** Volleys fired in turn during each phase. Default: fans, plus a ring every third volley in phase 3. */
  attacks?: Record<1 | 2 | 3, BossAttack[]>;
  /** Default 'sway'. */
  movement?: BossMovement;
  /** Tile rows (inclusive) where strike runes may appear. Default [7, 12]. */
  runeRows?: [number, number];
}

/** Everything that makes a Land unique: its map, people, monsters and story. */
export interface LandContent {
  id: LandId;
  music: { scene: MusicScene; intensity: number };
  /** Applies a colour mood to the camera (WebGL only). */
  grade?: (cam: Phaser.Cameras.Scene2D.Camera) => void;
  draft: () => MapDraft;
  npcs: Record<string, NpcDef>;
  monsters: Record<1 | 2 | 3, MonsterDef>;
  signs: Record<string, L>;
  story: {
    intro: DialogueLine[];
    shrineIntro: DialogueLine[];
    /** One letter per shrine; the last reveals the spell word. */
    letters: [DialogueLine[], DialogueLine[], DialogueLine[]];
    gateSealed: (found: number) => DialogueLine[];
    gateOpened: DialogueLine[];
    bossIntro: DialogueLine[];
    bossHint: DialogueLine[];
    victory: DialogueLine[];
    afterVictory: DialogueLine[];
    /** Read at the open gate once the boss is gone. */
    gateCleared: DialogueLine[];
  };
  boss: BossArenaDef;
}
