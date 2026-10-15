import type { RunnableLang } from '@shared/types';
import { transform } from 'sucrase';

export interface TestResult {
  label: string;
  pass: boolean;
  actual: string;
  expected: string;
}

export interface RunResult {
  passed: boolean;
  results: TestResult[];
  logs: string[];
  error?: string;
}

const JS_TIMEOUT_MS = 3000;
const PY_TIMEOUT_MS = 8000;
const PY_LOAD_TIMEOUT_MS = 90000;

function finish(data: { ok: boolean; results: TestResult[]; logs: string[]; error?: string }): RunResult {
  const passed = data.ok && data.results.length > 0 && data.results.every((r) => r.pass);
  return { passed, results: data.results, logs: data.logs, error: data.error };
}

function runJs(code: string, tests: string): Promise<RunResult> {
  return new Promise((resolve) => {
    const worker = new Worker(new URL('./js.worker.ts', import.meta.url), { type: 'module' });
    const timer = setTimeout(() => {
      worker.terminate();
      resolve({ passed: false, results: [], logs: [], error: 'Timeout: is there an infinite loop?' });
    }, JS_TIMEOUT_MS);
    worker.onmessage = (e) => {
      clearTimeout(timer);
      worker.terminate();
      resolve(finish(e.data));
    };
    worker.onerror = (e) => {
      clearTimeout(timer);
      worker.terminate();
      resolve({ passed: false, results: [], logs: [], error: e.message });
    };
    worker.postMessage({ code, tests });
  });
}

// The Python worker is expensive to boot (~10 MB of WebAssembly), so it is kept alive between runs
// and only recreated when a run hangs.
let pyWorker: Worker | null = null;
let pyReady = false;

function getPyWorker(): Worker {
  if (!pyWorker) {
    pyWorker = new Worker(new URL('./py.worker.ts', import.meta.url), { type: 'module' });
    pyReady = false;
  }
  return pyWorker;
}

export function isPythonReady(): boolean {
  return pyReady;
}

export function warmupPython(): Promise<void> {
  if (pyReady) return Promise.resolve();
  const w = getPyWorker();
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Python runtime took too long to load')), PY_LOAD_TIMEOUT_MS);
    const onMsg = (e: MessageEvent) => {
      if (e.data?.type === 'ready') {
        clearTimeout(timer);
        pyReady = true;
        w.removeEventListener('message', onMsg);
        resolve();
      }
    };
    w.addEventListener('message', onMsg);
    w.postMessage({ type: 'warmup' });
  });
}

async function runPython(code: string, tests: string): Promise<RunResult> {
  try {
    await warmupPython();
  } catch (e) {
    return { passed: false, results: [], logs: [], error: (e as Error).message };
  }
  const w = getPyWorker();
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      w.terminate();
      pyWorker = null;
      pyReady = false;
      resolve({ passed: false, results: [], logs: [], error: 'Timeout: is there an infinite loop?' });
    }, PY_TIMEOUT_MS);
    const onMsg = (e: MessageEvent) => {
      if (e.data?.type !== 'result') return;
      clearTimeout(timer);
      w.removeEventListener('message', onMsg);
      resolve(finish(e.data));
    };
    w.addEventListener('message', onMsg);
    w.postMessage({ type: 'run', code, tests });
  });
}

export async function runCode(language: RunnableLang, code: string, tests: string): Promise<RunResult> {
  if (language === 'python') return runPython(code, tests);
  let js = code;
  if (language === 'typescript') {
    try {
      // Types are stripped (not checked) so the tests can run; type lessons live in the quizzes.
      js = transform(code, { transforms: ['typescript'] }).code;
    } catch (e) {
      return { passed: false, results: [], logs: [], error: `SyntaxError: ${(e as Error).message}` };
    }
  }
  return runJs(js, tests);
}
