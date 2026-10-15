import type { CodeLang } from '@shared/types';
import type { ReactNode } from 'react';

const KEYWORDS: Partial<Record<CodeLang, string[]>> = {
  javascript: 'const let var function return if else for while do switch case break continue new class extends super this typeof instanceof in of async await yield import export from default try catch finally throw null undefined true false delete void static get set'.split(' '),
  typescript: 'const let var function return if else for while do switch case break continue new class extends super this typeof instanceof in of async await yield import export from default try catch finally throw null undefined true false interface type enum implements readonly keyof as satisfies never unknown any string number boolean public private protected abstract declare namespace infer is'.split(' '),
  python: 'def return if elif else for while in not and or is None True False class import from as try except finally raise with lambda yield pass break continue global nonlocal async await self print len range'.split(' '),
  java: 'public private protected static final void class interface extends implements return if else for while do switch case break continue new this super try catch finally throw throws int long double float boolean char byte short String null true false import package var record enum abstract'.split(' '),
  bash: 'if then else fi for do done while case esac function echo export sudo cd ls git docker kubectl npm cat grep chmod'.split(' '),
  yaml: 'on jobs steps uses with run name env runs-on needs if strategy matrix services image ports'.split(' '),
  dockerfile: 'FROM RUN COPY ADD WORKDIR CMD ENTRYPOINT EXPOSE ENV ARG USER VOLUME LABEL AS HEALTHCHECK'.split(' '),
};

const TOKEN_RE =
  /(\/\/[^\n]*|#[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$-]*)(?=\s*\()|([A-Za-z_$][\w$-]*)/g;

/** Tiny regex highlighter: good enough for short teaching snippets, no dependency. */
export function highlight(code: string, lang: CodeLang = 'text'): ReactNode[] {
  if (lang === 'text' || lang === 'json') return [code];
  const kw = new Set(KEYWORDS[lang] ?? []);
  const hashComments = lang === 'python' || lang === 'bash' || lang === 'yaml' || lang === 'dockerfile';
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of code.matchAll(TOKEN_RE)) {
    const start = m.index ?? 0;
    if (start > last) out.push(code.slice(last, start));
    const [text, comment, str, num, fn, word] = m;
    let cls = '';
    if (comment) {
      const isHash = comment.startsWith('#');
      cls = isHash && !hashComments ? '' : 'tok-com';
      // "#" in JS (private fields) or "//" in Python are not comments.
      if (!isHash && hashComments && comment.startsWith('//')) cls = '';
    } else if (str) cls = 'tok-str';
    else if (num) cls = 'tok-num';
    else if (fn) cls = kw.has(fn) ? 'tok-kw' : 'tok-fn';
    else if (word && kw.has(word)) cls = 'tok-kw';
    out.push(cls ? <span key={i++} className={cls}>{text}</span> : text);
    last = start + text.length;
  }
  if (last < code.length) out.push(code.slice(last));
  return out;
}

export function CodeBlock({ code, lang, className = '' }: { code: string; lang?: CodeLang; className?: string }) {
  return (
    <pre
      className={`overflow-x-auto whitespace-pre border-2 border-arcade-border bg-arcade-deep p-3 text-arcade-text ${className}`}
    >
      <code>{highlight(code, lang)}</code>
    </pre>
  );
}
