import type { Challenge, ChallengeKind, TrackId } from '../types';
import { challenges as javascript } from './javascript';
import { challenges as typescript } from './typescript';
import { challenges as java } from './java';
import { challenges as nodejs } from './nodejs';
import { challenges as python } from './python';
import { challenges as git } from './git';
import { challenges as github } from './github';
import { challenges as linux } from './linux';
import { challenges as devops } from './devops';
import { challenges as ai } from './ai';

export const CHALLENGES_BY_TRACK: Record<TrackId, Challenge[]> = {
  javascript,
  typescript,
  java,
  nodejs,
  python,
  git,
  github,
  linux,
  devops,
  ai,
};

export const ALL_CHALLENGES: Challenge[] = Object.values(CHALLENGES_BY_TRACK).flat();

export const CHALLENGE_BY_ID: Map<string, Challenge> = new Map(ALL_CHALLENGES.map((c) => [c.id, c]));

/** Which challenge kinds each mode draws from. */
export const MODE_KINDS: Record<'puzzle' | 'enigma' | 'battle', ChallengeKind[]> = {
  puzzle: ['mcq', 'fill', 'order', 'bug', 'command', 'code'],
  enigma: ['output', 'riddle'],
  // Battles are timed, so slower kinds (ordering lines, writing code) are left out.
  battle: ['mcq', 'fill', 'bug', 'command', 'output', 'riddle'],
};
