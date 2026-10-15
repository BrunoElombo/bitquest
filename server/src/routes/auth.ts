import { Router } from 'express';
import { z } from 'zod';
import { hashPassword, signToken, verifyPassword } from '../auth';
import { db, getUserByName } from '../db';
import { me } from '../account';

export const authRouter = Router();

const Credentials = z.object({
  username: z
    .string()
    .trim()
    .min(3, 'Username: 3 characters minimum')
    .max(20, 'Username: 20 characters maximum')
    .regex(/^[A-Za-z0-9_-]+$/, 'Username: letters, digits, _ and - only'),
  password: z.string().min(6, 'Password: 6 characters minimum').max(128),
});

authRouter.post('/register', (req, res) => {
  const parsed = Credentials.safeParse(req.body);
  if (!parsed.success) return void res.status(400).json({ error: parsed.error.issues[0].message });
  const { username, password } = parsed.data;
  if (getUserByName(username)) return void res.status(409).json({ error: 'Username already taken' });

  const settings = typeof req.body.lang === 'string' && ['en', 'fr'].includes(req.body.lang) ? { lang: req.body.lang } : {};
  const info = db
    .prepare('INSERT INTO users (username, password_hash, settings) VALUES (?, ?, ?)')
    .run(username, hashPassword(password), JSON.stringify(settings));
  const id = Number(info.lastInsertRowid);
  res.status(201).json({ token: signToken(id), ...me(id) });
});

authRouter.post('/login', (req, res) => {
  const parsed = Credentials.safeParse(req.body);
  if (!parsed.success) return void res.status(400).json({ error: 'Invalid username or password' });
  const user = getUserByName(parsed.data.username);
  if (!user || !verifyPassword(parsed.data.password, user.password_hash)) {
    return void res.status(401).json({ error: 'Invalid username or password' });
  }
  res.json({ token: signToken(user.id), ...me(user.id) });
});
