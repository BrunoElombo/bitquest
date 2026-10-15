import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { shuffle } from '@shared/rng';
import type {
  AnswerValue,
  BugChallenge,
  Challenge,
  CodeChallenge,
  CodeLang,
  CommandChallenge,
  FillChallenge,
  McqChallenge,
  OrderChallenge,
  OutputChallenge,
  RiddleChallenge,
} from '@shared/types';
import CodeMirror from '@uiw/react-codemirror';
import { useEffect, useMemo, useRef, useState } from 'react';
import { music } from '../../audio/music';
import { useT } from '../../i18n';
import { isPythonReady, runCode, warmupPython, type RunResult } from '../../runner/runCode';
import { CodeBlock, highlight } from '../CodeBlock';

export interface ViewProps<C extends Challenge> {
  c: C;
  disabled: boolean;
  onAnswer: (a: AnswerValue) => void;
}

export function langOf(c: Challenge): CodeLang {
  if (c.kind === 'code') return c.language;
  if (c.codeLang) return c.codeLang;
  switch (c.track) {
    case 'javascript':
    case 'nodejs':
      return 'javascript';
    case 'typescript':
      return 'typescript';
    case 'python':
      return 'python';
    case 'java':
      return 'java';
    case 'github':
      return 'yaml';
    default:
      return 'bash';
  }
}

// ------------------------------------------------------------------ MCQ

export function McqView({ c, disabled, onAnswer }: ViewProps<McqChallenge>) {
  const { tl } = useT();
  const [picked, setPicked] = useState<number | null>(null);

  useEffect(() => {
    if (disabled) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'INPUT' || (e.target as HTMLElement)?.tagName === 'TEXTAREA') return;
      const n = Number(e.key) - 1;
      if (n >= 0 && n < c.options.length) {
        setPicked(n);
        onAnswer({ kind: 'mcq', choice: n });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [c, disabled, onAnswer]);

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {c.options.map((o, i) => {
        const state =
          disabled && i === c.answer
            ? 'border-neon-green bg-neon-green/15'
            : disabled && picked === i
              ? 'border-neon-red bg-neon-red/15'
              : 'border-arcade-border hover:border-neon-cyan hover:bg-arcade-panel2';
        return (
          <button
            key={i}
            disabled={disabled}
            onClick={() => {
              setPicked(i);
              onAnswer({ kind: 'mcq', choice: i });
            }}
            className={`flex items-start gap-3 border-4 bg-arcade-deep p-3 text-left text-xl transition-colors ${state} disabled:cursor-default`}
          >
            <span className="font-pixel mt-1 shrink-0 text-xs text-neon-yellow">{i + 1}</span>
            <span>{tl(o)}</span>
          </button>
        );
      })}
    </div>
  );
}

// ------------------------------------------------------------------ Fill in the blanks

export function FillView({ c, disabled, onAnswer }: ViewProps<FillChallenge>) {
  const { t } = useT();
  const parts = useMemo(() => c.template.split('___'), [c.template]);
  const [values, setValues] = useState<string[]>(() => c.blanks.map(() => ''));
  const first = useRef<HTMLInputElement>(null);
  useEffect(() => first.current?.focus(), []);

  const submit = () => !disabled && values.some((v) => v.trim()) && onAnswer({ kind: 'fill', values });

  return (
    <div>
      <pre className="overflow-x-auto whitespace-pre-wrap border-2 border-arcade-border bg-arcade-deep p-3 leading-8">
        <code>
          {parts.map((part, i) => (
            <span key={i}>
              {highlight(part, langOf(c))}
              {i < parts.length - 1 && (
                <input
                  ref={i === 0 ? first : undefined}
                  aria-label={`blank ${i + 1}`}
                  disabled={disabled}
                  value={values[i]}
                  spellCheck={false}
                  autoCapitalize="off"
                  autoComplete="off"
                  onChange={(e) => setValues(values.map((v, j) => (j === i ? e.target.value : v)))}
                  onKeyDown={(e) => e.key === 'Enter' && submit()}
                  style={{ width: `${Math.max(4, Math.max(...c.blanks[i].map((b) => b.length)) + 2)}ch` }}
                  className="pixel-input mx-1 inline-block px-1 py-0 align-baseline"
                />
              )}
            </span>
          ))}
        </code>
      </pre>
      {!disabled && (
        <button className="pixel-btn green mt-4" onClick={submit}>
          {t('submit')}
        </button>
      )}
    </div>
  );
}

// ------------------------------------------------------------------ Order lines (Parsons problem)

export function OrderView({ c, disabled, onAnswer }: ViewProps<OrderChallenge>) {
  const { t } = useT();
  const [lines, setLines] = useState<string[]>(() => {
    let s = shuffle(c.lines);
    for (let i = 0; i < 5 && s.every((l, j) => l === c.lines[j]); i++) s = shuffle(c.lines);
    return s;
  });

  const move = (i: number, d: -1 | 1) => {
    const j = i + d;
    if (j < 0 || j >= lines.length) return;
    music.sfx('click');
    const next = [...lines];
    [next[i], next[j]] = [next[j], next[i]];
    setLines(next);
  };

  return (
    <div>
      <p className="mb-2 text-arcade-muted">{t('reorder')}</p>
      <ol className="space-y-2">
        {lines.map((line, i) => {
          const ok = disabled && line === c.lines[i];
          return (
            <li
              key={line}
              className={`flex items-stretch border-2 bg-arcade-deep ${disabled ? (ok ? 'border-neon-green' : 'border-neon-red') : 'border-arcade-border'}`}
            >
              <span className="font-pixel flex w-10 shrink-0 items-center justify-center border-r-2 border-arcade-border text-[10px] text-neon-yellow">
                {i + 1}
              </span>
              <code className="flex-1 overflow-x-auto whitespace-pre px-3 py-2">{highlight(line, langOf(c))}</code>
              {!disabled && (
                <span className="flex shrink-0 flex-col">
                  <button aria-label="up" className="px-3 text-neon-cyan hover:bg-arcade-panel2" onClick={() => move(i, -1)}>
                    ▲
                  </button>
                  <button aria-label="down" className="px-3 text-neon-cyan hover:bg-arcade-panel2" onClick={() => move(i, 1)}>
                    ▼
                  </button>
                </span>
              )}
            </li>
          );
        })}
      </ol>
      {!disabled && (
        <button className="pixel-btn green mt-4" onClick={() => onAnswer({ kind: 'order', lines })}>
          {t('submit')}
        </button>
      )}
    </div>
  );
}

// ------------------------------------------------------------------ Bug hunt

export function BugView({ c, disabled, onAnswer }: ViewProps<BugChallenge>) {
  const { t } = useT();
  const [picked, setPicked] = useState<number | null>(null);
  return (
    <div>
      <p className="mb-2 text-arcade-muted">{t('clickBugLine')}</p>
      <div className="overflow-x-auto border-2 border-arcade-border bg-arcade-deep py-2">
        {c.lines.map((line, i) => {
          const cls =
            disabled && i === c.bugLine
              ? 'bg-neon-green/20'
              : disabled && i === picked
                ? 'bg-neon-red/20'
                : 'hover:bg-neon-pink/15';
          return (
            <button
              key={i}
              disabled={disabled}
              onClick={() => {
                setPicked(i);
                onAnswer({ kind: 'bug', line: i });
              }}
              className={`font-code flex w-full text-left ${cls} disabled:cursor-default`}
            >
              <span className="w-10 shrink-0 select-none pr-3 text-right text-arcade-muted">{i + 1}</span>
              <span className="whitespace-pre pr-3">{highlight(line, langOf(c)) }{line === '' ? ' ' : ''}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------ Terminal command

export function CommandView({ c, disabled, onAnswer }: ViewProps<CommandChallenge>) {
  const { t } = useT();
  const [text, setText] = useState('');
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => input.current?.focus(), []);
  return (
    <div
      className="cursor-text border-2 border-arcade-border bg-black p-3 font-code text-neon-green"
      onClick={() => input.current?.focus()}
    >
      <div className="mb-1 text-xs text-arcade-muted">bitquest@arcade:~/{c.track}</div>
      <div className="flex items-center gap-2">
        <span className="text-neon-pink">$</span>
        <input
          ref={input}
          disabled={disabled}
          value={text}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          placeholder={t('typeCommand')}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && text.trim() && onAnswer({ kind: 'command', text })}
          className="flex-1 bg-transparent text-neon-green outline-none placeholder:text-arcade-border"
        />
        {!disabled && <span className="h-5 w-2.5 animate-blink bg-neon-green" />}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------ Predict the output

export function OutputView({ c, disabled, onAnswer }: ViewProps<OutputChallenge>) {
  const { t } = useT();
  const [text, setText] = useState('');
  const submit = () => !disabled && text.trim() && onAnswer({ kind: 'output', text });
  return (
    <div className="space-y-3">
      <CodeBlock code={c.code} lang={langOf(c)} />
      <label className="block">
        <span className="font-pixel text-[10px] text-neon-yellow">{t('output')} &gt;</span>
        <textarea
          autoFocus
          disabled={disabled}
          value={text}
          rows={Math.min(6, Math.max(2, text.split('\n').length))}
          spellCheck={false}
          placeholder={t('yourOutput')}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          className="pixel-input mt-1 block w-full resize-y"
        />
      </label>
      {!disabled && (
        <button className="pixel-btn green" onClick={submit}>
          {t('submit')}
        </button>
      )}
    </div>
  );
}

// ------------------------------------------------------------------ Riddle

export function RiddleView({ disabled, onAnswer }: ViewProps<RiddleChallenge>) {
  const { t } = useT();
  const [text, setText] = useState('');
  const submit = () => !disabled && text.trim() && onAnswer({ kind: 'riddle', text });
  return (
    <div className="flex flex-wrap gap-3">
      <input
        autoFocus
        disabled={disabled}
        value={text}
        spellCheck={false}
        placeholder={t('yourAnswer')}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && submit()}
        className="pixel-input min-w-0 flex-1"
      />
      {!disabled && (
        <button className="pixel-btn green" onClick={submit}>
          {t('submit')}
        </button>
      )}
    </div>
  );
}

// ------------------------------------------------------------------ Write real code

export function CodeView({ c, disabled, onAnswer }: ViewProps<CodeChallenge>) {
  const { t } = useT();
  const [code, setCode] = useState(c.starter);
  const [running, setRunning] = useState(false);
  const [loadingPy, setLoadingPy] = useState(c.language === 'python' && !isPythonReady());
  const [result, setResult] = useState<RunResult | null>(null);

  useEffect(() => {
    if (c.language !== 'python' || isPythonReady()) return;
    warmupPython()
      .catch(() => {})
      .finally(() => setLoadingPy(false));
  }, [c.language]);

  const extensions = useMemo(
    () => [c.language === 'python' ? python() : javascript({ typescript: c.language === 'typescript' })],
    [c.language],
  );

  const run = async () => {
    setRunning(true);
    const r = await runCode(c.language, code, c.tests);
    setRunning(false);
    setResult(r);
    if (r.passed) onAnswer({ kind: 'code', passed: true });
    else music.sfx('wrong');
  };

  return (
    <div className="space-y-3">
      <div className="border-2 border-arcade-border">
        <div className="flex items-center justify-between bg-arcade-panel2 px-3 py-1 text-sm text-arcade-muted">
          <span>
            {c.language === 'python' ? 'main.py' : c.language === 'typescript' ? 'main.ts' : 'main.js'}
          </span>
          {!disabled && (
            <button className="text-neon-cyan hover:underline" onClick={() => setCode(c.starter)}>
              {t('reset')}
            </button>
          )}
        </div>
        <CodeMirror
          value={code}
          onChange={setCode}
          theme="dark"
          editable={!disabled}
          extensions={extensions}
          minHeight="160px"
          maxHeight="380px"
          basicSetup={{ foldGutter: false, highlightActiveLine: !disabled }}
        />
      </div>

      {loadingPy && <p className="animate-pulse text-neon-yellow">{t('loadingPython')}</p>}

      {!disabled && (
        <div className="flex flex-wrap gap-3">
          <button className="pixel-btn green" disabled={running || loadingPy} onClick={run}>
            {running ? t('running') : `▶ ${t('runTests')}`}
          </button>
          <button className="pixel-btn ghost" disabled={running} onClick={() => onAnswer({ kind: 'code', passed: false })}>
            {t('giveUp')}
          </button>
        </div>
      )}

      {result && (
        <div className="border-2 border-arcade-border bg-arcade-deep p-3 font-code text-sm">
          {result.error && <div className="mb-2 whitespace-pre-wrap text-neon-red">{result.error}</div>}
          {result.results.map((r, i) => (
            <div key={i} className={r.pass ? 'text-neon-green' : 'text-neon-red'}>
              {r.pass ? '✔' : '✘'} {r.label}
              {!r.pass && (
                <span className="text-arcade-muted">
                  {' '}
                  → got {r.actual}, expected {r.expected}
                </span>
              )}
            </div>
          ))}
          {result.passed && <div className="mt-2 text-neon-yellow">{t('testsPassed')}</div>}
          {result.logs.length > 0 && (
            <div className="mt-3 border-t border-arcade-border pt-2 text-arcade-muted">
              <div className="mb-1 text-xs uppercase">{t('console')}</div>
              {result.logs.slice(0, 50).map((l, i) => (
                <div key={i} className="whitespace-pre-wrap">
                  {l}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
