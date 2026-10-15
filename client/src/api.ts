import type {
  Account,
  EncounterRequest,
  EncounterResponse,
  HeroClass,
  HurtResponse,
  LandId,
  MeResponse,
  SaveState,
  SceneId,
} from '@shared/game';
import type { UserSettings } from '@shared/types';

const TOKEN_KEY = 'bq_token';

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string | null): void {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    /* storage unavailable: session-only login */
  }
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

async function request<T>(path: string, init: { method?: string; body?: unknown } = {}): Promise<T> {
  const token = getToken();
  const res = await fetch(`/api${path}`, {
    method: init.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError((data as { error?: string }).error ?? res.statusText, res.status);
  return data as T;
}

type AuthResponse = MeResponse & { token: string };

export interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
  keys: number;
  hero: HeroClass;
}

export interface ProgressPatch {
  location?: { scene: SceneId; land?: LandId; x: number; y: number };
  flags?: Record<string, boolean>;
  checkpoint?: { land: LandId; id: string };
  introSeen?: LandId;
}

export const api = {
  register: (username: string, password: string, lang: string) =>
    request<AuthResponse>('/auth/register', { method: 'POST', body: { username, password, lang } }),
  login: (username: string, password: string) =>
    request<AuthResponse>('/auth/login', { method: 'POST', body: { username, password } }),
  me: () => request<MeResponse>('/me'),
  updateSettings: (patch: Partial<UserSettings>) => request<Account>('/me/settings', { method: 'PATCH', body: patch }),
  newGame: (hero: HeroClass, skin: number) => request<{ save: SaveState }>('/save/new', { method: 'POST', body: { hero, skin } }),
  progress: (patch: ProgressPatch) => request<{ save: SaveState }>('/game/progress', { method: 'POST', body: patch }),
  encounter: (e: EncounterRequest) => request<EncounterResponse>('/game/encounter', { method: 'POST', body: e }),
  hurt: (land: LandId, source: 'monster' | 'projectile' | 'boss') =>
    request<HurtResponse>('/game/hurt', { method: 'POST', body: { land, source } }),
  bossStart: (land: LandId) => request<{ save: SaveState }>('/game/boss/start', { method: 'POST', body: { land } }),
  leaderboard: () => request<{ entries: LeaderboardEntry[] }>('/leaderboard'),
};
