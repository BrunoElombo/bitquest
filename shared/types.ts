// Shared domain types used by both the client (gameplay) and the server (validation, XP, badges).

export type Lang = 'en' | 'fr';

/** A bilingual string. Every piece of learner-facing text has both languages. */
export type L = { en: string; fr: string };

export type TrackId =
  | 'javascript'
  | 'typescript'
  | 'java'
  | 'nodejs'
  | 'python'
  | 'git'
  | 'github'
  | 'linux'
  | 'devops'
  | 'ai';

export type Tier = 1 | 2 | 3 | 4;

/** Languages the browser sandbox can actually execute. */
export type RunnableLang = 'javascript' | 'typescript' | 'python';

/** Languages used only for syntax highlighting / display. */
export type CodeLang = RunnableLang | 'java' | 'bash' | 'yaml' | 'dockerfile' | 'json' | 'text';

interface ChallengeBase {
  /** Unique id, e.g. "js-001". Never change once published: progress is keyed on it. */
  id: string;
  track: TrackId;
  /** 1 = Novice, 2 = Apprentice, 3 = Adept, 4 = Expert */
  tier: Tier;
  /** Short name of the concept being taught, e.g. "Closures". Shown in the Codex. */
  concept: L;
  /** The question / instruction. */
  prompt: L;
  /** Optional read-only snippet shown under the prompt. */
  code?: string;
  codeLang?: CodeLang;
  /** A nudge that does not give the answer away. Using it halves the XP. */
  hint: L;
  /** Why the answer is what it is. Shown after answering and collected in the Codex. */
  explanation: L;
}

/** Multiple choice. `answer` is the 0-based index of the correct option. */
export interface McqChallenge extends ChallengeBase {
  kind: 'mcq';
  options: L[];
  answer: number;
}

/**
 * Fill in the blanks. `template` contains one `___` (three underscores) per blank.
 * `blanks[i]` lists every accepted answer for blank i (compared after trimming).
 */
export interface FillChallenge extends ChallengeBase {
  kind: 'fill';
  template: string;
  blanks: string[][];
  /** Defaults to true. Set false for blanks where case does not matter. */
  caseSensitive?: boolean;
}

/** Parsons problem: put the lines in the right order. `lines` is the correct order. */
export interface OrderChallenge extends ChallengeBase {
  kind: 'order';
  lines: string[];
}

/** Bug hunt: click the line that contains the bug. `bugLine` is 0-based. */
export interface BugChallenge extends ChallengeBase {
  kind: 'bug';
  lines: string[];
  bugLine: number;
}

/**
 * Terminal command. Input is trimmed and internal whitespace collapsed, then compared to
 * `accepted` (exact) or tested against `patterns` (regex sources, implicitly anchored ^...$).
 */
export interface CommandChallenge extends ChallengeBase {
  kind: 'command';
  accepted: string[];
  patterns?: string[];
}

/** Predict the output of `code`. Each accepted answer is compared line by line, trimmed. */
export interface OutputChallenge extends ChallengeBase {
  kind: 'output';
  code: string;
  accepted: string[];
}

/**
 * Riddle / enigma. Input is lower-cased, accents and leading articles stripped,
 * then compared with each normalized entry of `accepted`.
 */
export interface RiddleChallenge extends ChallengeBase {
  kind: 'riddle';
  accepted: string[];
}

/**
 * Write code that passes tests in the browser sandbox.
 * JS/TS tests call `assertEqual(actual, expected, label)`; Python tests call
 * `assert_equal(actual, expected, label)`. Tests run after the learner's code in the same scope.
 */
export interface CodeChallenge extends ChallengeBase {
  kind: 'code';
  language: RunnableLang;
  starter: string;
  tests: string;
  solution: string;
}

export type Challenge =
  | McqChallenge
  | FillChallenge
  | OrderChallenge
  | BugChallenge
  | CommandChallenge
  | OutputChallenge
  | RiddleChallenge
  | CodeChallenge;

export type ChallengeKind = Challenge['kind'];

/** What the learner submitted, per challenge kind. */
export type AnswerValue =
  | { kind: 'mcq'; choice: number }
  | { kind: 'fill'; values: string[] }
  | { kind: 'order'; lines: string[] }
  | { kind: 'bug'; line: number }
  | { kind: 'command'; text: string }
  | { kind: 'output'; text: string }
  | { kind: 'riddle'; text: string }
  | { kind: 'code'; passed: boolean }
  | { kind: 'timeout' };

export interface UserSettings {
  lang: Lang;
  musicVolume: number; // 0..1
  sfxVolume: number; // 0..1
  crt: boolean;
  reducedMotion: boolean;
}
