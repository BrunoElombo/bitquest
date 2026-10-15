/// <reference lib="webworker" />
// Runs learner JavaScript (already transpiled from TS if needed) isolated from the page.
// The main thread terminates this worker if it does not answer in time (infinite loops).

interface RunRequest {
  code: string;
  tests: string;
}

interface TestResult {
  label: string;
  pass: boolean;
  actual: string;
  expected: string;
}

const fmt = (v: unknown): string => {
  try {
    return typeof v === 'string' ? JSON.stringify(v) : (JSON.stringify(v) ?? String(v));
  } catch {
    return String(v);
  }
};

self.onmessage = (e: MessageEvent<RunRequest>) => {
  const logs: string[] = [];
  const results: TestResult[] = [];
  const capture =
    (prefix: string) =>
    (...args: unknown[]) =>
      logs.push(prefix + args.map((a) => (typeof a === 'string' ? a : fmt(a))).join(' '));
  const fakeConsole = { log: capture(''), info: capture(''), warn: capture('⚠ '), error: capture('✖ ') };

  const assertEqual = (actual: unknown, expected: unknown, label = `test ${results.length + 1}`) => {
    results.push({ label, pass: fmt(actual) === fmt(expected), actual: fmt(actual), expected: fmt(expected) });
  };

  try {
    // Learner code and tests share one function scope so tests can call the learner's functions.
    const fn = new Function('console', 'assertEqual', `"use strict";\n${e.data.code}\n;\n${e.data.tests}`);
    fn(fakeConsole, assertEqual);
    self.postMessage({ ok: true, results, logs });
  } catch (err) {
    const message = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
    self.postMessage({ ok: false, error: message, results, logs });
  }
};
