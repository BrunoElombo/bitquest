import type { AnswerValue, Challenge } from './types';

export function normalizeSpaces(s: string): string {
  return s.trim().replace(/\s+/g, ' ');
}

function stripAccents(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

/** Lenient normalization for riddle answers: case, accents, articles and punctuation are ignored. */
export function normalizeRiddle(s: string): string {
  let t = stripAccents(s.toLowerCase()).replace(/[’`]/g, "'").trim();
  t = t.replace(/^(?:(?:the|a|an|le|la|les|un|une|des)\s+|l')/, '');
  t = t.replace(/[^a-z0-9+#.\-_/ ]/g, ' ');
  t = t.replace(/\s+/g, ' ').replace(/^[.\s]+|[.\s]+$/g, '');
  // Pure-symbol answers such as "===" or "=>" would be erased above: keep them verbatim.
  return t || s.replace(/\s+/g, '');
}

/** Output answers: each line trimmed and whitespace-collapsed, blank edges removed. */
export function normalizeOutput(s: string): string {
  const lines = s.replace(/\r\n/g, '\n').split('\n').map((l) => normalizeSpaces(l));
  while (lines.length && lines[0] === '') lines.shift();
  while (lines.length && lines[lines.length - 1] === '') lines.pop();
  return lines.join('\n');
}

export function normalizeCommand(s: string): string {
  // Learners often paste the prompt symbol along with the command.
  return normalizeSpaces(s).replace(/^\$\s*/, '');
}

export function checkAnswer(challenge: Challenge, answer: AnswerValue): boolean {
  if (answer.kind === 'timeout' || answer.kind !== challenge.kind) return false;

  switch (challenge.kind) {
    case 'mcq':
      return answer.kind === 'mcq' && answer.choice === challenge.answer;

    case 'fill': {
      if (answer.kind !== 'fill' || answer.values.length !== challenge.blanks.length) return false;
      const cs = challenge.caseSensitive !== false;
      const norm = (v: string) => (cs ? normalizeSpaces(v) : normalizeSpaces(v).toLowerCase());
      return challenge.blanks.every((accepted, i) => accepted.map(norm).includes(norm(answer.values[i] ?? '')));
    }

    case 'order':
      return (
        answer.kind === 'order' &&
        answer.lines.length === challenge.lines.length &&
        answer.lines.every((l, i) => l === challenge.lines[i])
      );

    case 'bug':
      return answer.kind === 'bug' && answer.line === challenge.bugLine;

    case 'command': {
      if (answer.kind !== 'command') return false;
      const input = normalizeCommand(answer.text);
      if (challenge.accepted.some((a) => normalizeCommand(a) === input)) return true;
      return (challenge.patterns ?? []).some((p) => {
        try {
          return new RegExp(`^(?:${p})$`).test(input);
        } catch {
          return false;
        }
      });
    }

    case 'output': {
      if (answer.kind !== 'output') return false;
      const input = normalizeOutput(answer.text);
      return challenge.accepted.some((a) => normalizeOutput(a) === input);
    }

    case 'riddle': {
      if (answer.kind !== 'riddle') return false;
      const input = normalizeRiddle(answer.text);
      return input.length > 0 && challenge.accepted.some((a) => normalizeRiddle(a) === input);
    }

    case 'code':
      // Code runs in the learner's browser sandbox; the server trusts the reported test result.
      return answer.kind === 'code' && answer.passed;
  }
}

/** A human-readable "correct answer" for the reveal screen. */
export function correctAnswerText(challenge: Challenge, lang: 'en' | 'fr'): string {
  switch (challenge.kind) {
    case 'mcq':
      return challenge.options[challenge.answer][lang];
    case 'fill':
      return challenge.blanks.map((b) => b[0]).join('  |  ');
    case 'order':
      return challenge.lines.join('\n');
    case 'bug':
      return `${lang === 'fr' ? 'Ligne' : 'Line'} ${challenge.bugLine + 1}: ${challenge.lines[challenge.bugLine].trim()}`;
    case 'command':
      return challenge.accepted[0] ?? '';
    case 'output':
      return challenge.accepted[0] ?? '';
    case 'riddle':
      return challenge.accepted[0] ?? '';
    case 'code':
      return challenge.solution;
  }
}
