// Checks every challenge for structural mistakes and runs each coding challenge's reference
// solution against its tests (JS/TS in a Node VM, Python with the local interpreter).
// Usage: npm run validate
import { spawnSync } from 'node:child_process';
import { runInNewContext } from 'node:vm';
import { transform } from 'sucrase';
import { normalizeRiddle } from '../../shared/check';
import { ALL_CHALLENGES, CHALLENGES_BY_TRACK } from '../../shared/content';
import type { Challenge, L } from '../../shared/types';

const PREFIX: Record<string, string> = {
  javascript: 'js-',
  typescript: 'ts-',
  java: 'java-',
  nodejs: 'node-',
  python: 'py-',
  git: 'git-',
  github: 'gh-',
  linux: 'linux-',
  devops: 'devops-',
  ai: 'ai-',
};

const errors: string[] = [];
const warnings: string[] = [];
const err = (c: Challenge, msg: string) => errors.push(`${c.id}: ${msg}`);

function checkL(c: Challenge, field: string, l: L | undefined) {
  if (!l || !l.en?.trim() || !l.fr?.trim()) err(c, `missing translation in ${field}`);
}

function runJs(code: string, tests: string): string[] {
  const failures: string[] = [];
  const sandbox = {
    console: { log() {}, error() {}, warn() {} },
    assertEqual(actual: unknown, expected: unknown, label: string) {
      if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        failures.push(`${label}: got ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)}`);
      }
    },
  };
  try {
    runInNewContext(`${code}\n;\n${tests}`, sandbox, { timeout: 2000 });
  } catch (e) {
    failures.push(`threw: ${(e as Error).message}`);
  }
  return failures;
}

const PY_HELPER = `
import json as __json
__failures = []
def assert_equal(actual, expected, label=""):
    if actual != expected:
        __failures.append(f"{label}: got {actual!r}, expected {expected!r}")
`;

function runPython(code: string, tests: string): string[] {
  const script = `${PY_HELPER}\n${code}\n\n${tests}\nprint("__RESULT__" + __json.dumps(__failures))`;
  const py = spawnSync(process.platform === 'win32' ? 'python' : 'python3', ['-I', '-c', script], {
    encoding: 'utf8',
    timeout: 10000,
  });
  if (py.error) return [`python not available (${py.error.message})`];
  const line = py.stdout.split('\n').find((l) => l.startsWith('__RESULT__'));
  if (!line) return [`python error: ${py.stderr.trim().split('\n').pop()}`];
  return JSON.parse(line.slice('__RESULT__'.length)) as string[];
}

const seen = new Set<string>();
for (const c of ALL_CHALLENGES) {
  if (seen.has(c.id)) err(c, 'duplicate id');
  seen.add(c.id);
  if (!c.id.startsWith(PREFIX[c.track])) err(c, `id should start with ${PREFIX[c.track]}`);
  if (![1, 2, 3, 4].includes(c.tier)) err(c, 'invalid tier');
  checkL(c, 'concept', c.concept);
  checkL(c, 'prompt', c.prompt);
  checkL(c, 'hint', c.hint);
  checkL(c, 'explanation', c.explanation);

  switch (c.kind) {
    case 'mcq':
      c.options.forEach((o, i) => checkL(c, `options[${i}]`, o));
      if (c.answer < 0 || c.answer >= c.options.length) err(c, 'answer index out of range');
      break;
    case 'fill': {
      const holes = c.template.split('___').length - 1;
      if (holes !== c.blanks.length) err(c, `template has ${holes} blanks but ${c.blanks.length} answer lists`);
      if (c.blanks.some((b) => b.length === 0)) err(c, 'empty answer list for a blank');
      break;
    }
    case 'order':
      if (c.lines.length < 3) err(c, 'order needs at least 3 lines');
      if (new Set(c.lines).size !== c.lines.length) err(c, 'order lines must be unique');
      break;
    case 'bug':
      if (c.bugLine < 0 || c.bugLine >= c.lines.length) err(c, 'bugLine out of range');
      break;
    case 'command':
      if (c.accepted.length === 0 && !c.patterns?.length) err(c, 'no accepted command');
      for (const p of c.patterns ?? []) {
        try {
          new RegExp(`^(?:${p})$`);
        } catch {
          err(c, `invalid regex ${p}`);
        }
      }
      break;
    case 'output':
      if (c.accepted.length === 0) err(c, 'no accepted output');
      break;
    case 'riddle':
      if (c.accepted.length === 0 || c.accepted.some((a) => !normalizeRiddle(a))) err(c, 'bad riddle answers');
      break;
    case 'code': {
      let failures: string[];
      if (c.language === 'python') failures = runPython(c.solution, c.tests);
      else {
        const js = c.language === 'typescript' ? transform(c.solution, { transforms: ['typescript'] }).code : c.solution;
        failures = runJs(js, c.tests);
      }
      if (failures.length) err(c, `solution fails tests → ${failures.join(' | ')}`);

      const starterFailures =
        c.language === 'python'
          ? runPython(c.starter, c.tests)
          : runJs(c.language === 'typescript' ? transform(c.starter, { transforms: ['typescript'] }).code : c.starter, c.tests);
      if (starterFailures.length === 0) warnings.push(`${c.id}: starter code already passes the tests`);
      break;
    }
  }
}

console.log('\nTrack        T1 T2 T3 T4  total  kinds');
for (const [track, list] of Object.entries(CHALLENGES_BY_TRACK)) {
  const tiers = [1, 2, 3, 4].map((t) => String(list.filter((c) => c.tier === t).length).padStart(2));
  const kinds: Record<string, number> = {};
  for (const c of list) kinds[c.kind] = (kinds[c.kind] ?? 0) + 1;
  const kindStr = Object.entries(kinds)
    .map(([k, n]) => `${k}:${n}`)
    .join(' ');
  console.log(`${track.padEnd(12)} ${tiers.join(' ')}  ${String(list.length).padStart(5)}  ${kindStr}`);
}
console.log(`\n${ALL_CHALLENGES.length} challenges checked.`);
for (const w of warnings) console.warn(`⚠  ${w}`);
if (errors.length) {
  for (const e of errors) console.error(`✗ ${e}`);
  console.error(`\n${errors.length} error(s).`);
  process.exit(1);
}
console.log('✓ All content valid.');
