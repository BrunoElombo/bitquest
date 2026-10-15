import { existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import express, { type NextFunction, type Request, type Response } from 'express';
import { ALL_CHALLENGES } from '../../shared/content';
import { authRouter } from './routes/auth';
import { gameRouter } from './routes/game';
import { meRouter } from './routes/me';

// API_PORT (not PORT) so tools that set PORT for the web client do not move the API.
const PORT = Number(process.env.API_PORT ?? 3001);
const here = dirname(fileURLToPath(import.meta.url));
const CLIENT_DIST = resolve(here, '..', '..', 'client', 'dist');

const app = express();
app.disable('x-powered-by');
app.use(cors({ origin: process.env.CORS_ORIGIN ?? ['http://localhost:5180', 'http://127.0.0.1:5180'] }));
app.use(express.json({ limit: '200kb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, challenges: ALL_CHALLENGES.length });
});
app.use('/api/auth', authRouter);
app.use('/api', meRouter);
app.use('/api', gameRouter);
app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// In production the built client is served by this same server.
if (existsSync(CLIENT_DIST)) {
  app.use(express.static(CLIENT_DIST));
  app.get(/^(?!\/api).*/, (_req, res) => res.sendFile(resolve(CLIENT_DIST, 'index.html')));
}

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🕹️  BitQuest API ready on http://localhost:${PORT} (${ALL_CHALLENGES.length} challenges loaded)`);
});
