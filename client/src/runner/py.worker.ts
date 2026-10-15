/// <reference lib="webworker" />
// Runs learner Python with Pyodide (CPython compiled to WebAssembly), loaded lazily from the CDN.

const PYODIDE_URL = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.mjs';

interface Pyodide {
  runPython(code: string, opts?: { globals?: unknown }): unknown;
  setStdout(opts: { batched: (s: string) => void }): void;
  setStderr(opts: { batched: (s: string) => void }): void;
  globals: { get(name: string): unknown };
  toPy(v: unknown): unknown;
}

let pyodidePromise: Promise<Pyodide> | null = null;

function getPyodide(): Promise<Pyodide> {
  if (!pyodidePromise) {
    pyodidePromise = import(/* @vite-ignore */ PYODIDE_URL).then(
      (m: { loadPyodide: (o?: object) => Promise<Pyodide> }) => m.loadPyodide(),
    );
  }
  return pyodidePromise;
}

const HARNESS = `
import json as __json
__results = []
def assert_equal(actual, expected, label=None):
    __results.append({
        "label": label or f"test {len(__results) + 1}",
        "pass": actual == expected,
        "actual": repr(actual),
        "expected": repr(expected),
    })
`;

self.onmessage = async (e: MessageEvent<{ type: 'warmup' } | { type: 'run'; code: string; tests: string }>) => {
  if (e.data.type === 'warmup') {
    await getPyodide();
    self.postMessage({ type: 'ready' });
    return;
  }
  const logs: string[] = [];
  try {
    const py = await getPyodide();
    py.setStdout({ batched: (s) => logs.push(s) });
    py.setStderr({ batched: (s) => logs.push('✖ ' + s) });
    // A fresh namespace per run so earlier attempts cannot leak definitions.
    const ns = py.runPython('dict()');
    py.runPython(HARNESS, { globals: ns });
    py.runPython(e.data.code, { globals: ns });
    py.runPython(e.data.tests, { globals: ns });
    const json = py.runPython('__json.dumps(__results)', { globals: ns }) as string;
    self.postMessage({ type: 'result', ok: true, results: JSON.parse(json), logs });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    // Keep only the useful last lines of the Python traceback.
    const short = msg.trim().split('\n').slice(-3).join('\n');
    self.postMessage({ type: 'result', ok: false, error: short, results: [], logs });
  }
};
