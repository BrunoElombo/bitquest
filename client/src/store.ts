import type {
  Account,
  EncounterResponse,
  EncounterType,
  GameOverInfo,
  LandId,
  MeResponse,
  SaveState,
} from '@shared/game';
import type { Challenge, L, UserSettings } from '@shared/types';
import { create } from 'zustand';
import { api, ApiError, getToken, setToken } from './api';
import { music } from './audio/music';

const SETTINGS_KEY = 'bq_settings';

const DEFAULT_SETTINGS: UserSettings = {
  lang: navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : 'en',
  musicVolume: 0.5,
  sfxVolume: 0.7,
  crt: true,
  reducedMotion: false,
};

function loadLocalSettings(): UserSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function saveLocalSettings(s: UserSettings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}

// ------------------------------------------------------------------ overlay requests (from Phaser)

export interface DialogueLine {
  /** Speaker name; omitted for the narrator. */
  speaker?: L;
  /** Frame in the Tiny Dungeon sheet used as portrait. */
  portrait?: number;
  text: L;
}

export interface EncounterUIRequest {
  land: LandId;
  type: EncounterType;
  targetId: string;
  challenge: Challenge;
  /** e.g. "A wild Bug appears!" */
  title: L;
  portrait?: number;
  timeLimitMs: number | null;
  hintAllowed: boolean;
}

export type PauseAction = 'resume' | 'quit' | 'checkpoint' | 'world';

/** Which part of the pause menu opens first. */
export type PauseView = 'main' | 'controls' | 'quit';

export interface PauseRequest {
  /** "Restart from checkpoint" is offered inside a Land or a boss fight. */
  canRestart: boolean;
  /** "Back to the world map" is offered inside a Land or a boss fight. */
  canLeave: boolean;
  view: PauseView;
}

export interface Toast {
  id: number;
  icon: string;
  title: string;
  body?: string;
}

interface GameState {
  booting: boolean;
  account: Account | null;
  save: SaveState | null;
  solved: string[];
  settings: UserSettings;

  // HUD context set by the running scene
  place: { label: L; land: LandId | null } | null;
  boss: { name: L; hits: number; needed: number } | null;

  // Overlays the game waits on
  dialogue: { lines: DialogueLine[]; resolve: () => void } | null;
  encounter: { req: EncounterUIRequest; resolve: (r: EncounterResponse) => void } | null;
  pause: { req: PauseRequest; resolve: (a: PauseAction) => void } | null;
  gameOver: { info: GameOverInfo; resolve: () => void } | null;
  banner: { id: number; title: string; sub?: string } | null;
  toasts: Toast[];

  // Device-only preferences (not synced to the account)
  muted: boolean;
  touchControls: boolean;

  boot(): Promise<void>;
  login(username: string, password: string): Promise<void>;
  register(username: string, password: string): Promise<void>;
  logout(): void;
  newGame(hero: SaveState['hero'], skin: number): Promise<void>;
  setSave(save: SaveState): void;
  markSolved(id: string): void;
  updateSettings(patch: Partial<UserSettings>): void;
  pushToast(t: Omit<Toast, 'id'>): void;
  showBanner(title: string, sub?: string): void;
  toggleMute(): void;
  setTouchControls(on: boolean): void;
}

let uid = 0;

const MUTED_KEY = 'bq_muted';
const TOUCH_KEY = 'bq_touch';

function loadFlag(key: string, fallback: boolean): boolean {
  try {
    const v = localStorage.getItem(key);
    return v === null ? fallback : v === '1';
  } catch {
    return fallback;
  }
}

function saveFlag(key: string, value: boolean) {
  try {
    localStorage.setItem(key, value ? '1' : '0');
  } catch {
    /* ignore */
  }
}

const initiallyMuted = loadFlag(MUTED_KEY, false);
music.setMuted(initiallyMuted);

export const useGame = create<GameState>((set, get) => {
  const signedIn = (r: MeResponse) => {
    saveLocalSettings(r.account.settings);
    music.setVolumes(r.account.settings.musicVolume, r.account.settings.sfxVolume);
    set({ account: r.account, save: r.save, solved: r.solved, settings: r.account.settings });
  };

  return {
    booting: true,
    account: null,
    save: null,
    solved: [],
    settings: loadLocalSettings(),
    place: null,
    boss: null,
    dialogue: null,
    encounter: null,
    pause: null,
    gameOver: null,
    banner: null,
    toasts: [],
    muted: initiallyMuted,
    touchControls: loadFlag(TOUCH_KEY, window.matchMedia?.('(pointer: coarse)').matches ?? false),

    async boot() {
      const s = get().settings;
      music.setVolumes(s.musicVolume, s.sfxVolume);
      if (!getToken()) return set({ booting: false });
      try {
        signedIn(await api.me());
      } catch (e) {
        if (e instanceof ApiError && e.status === 401) setToken(null);
      }
      set({ booting: false });
    },
    async login(username, password) {
      const r = await api.login(username, password);
      setToken(r.token);
      signedIn(r);
    },
    async register(username, password) {
      const local = get().settings;
      const r = await api.register(username, password, local.lang);
      setToken(r.token);
      signedIn(r);
      get().updateSettings(local);
    },
    logout() {
      setToken(null);
      set({ account: null, save: null, solved: [] });
    },
    async newGame(hero, skin) {
      const { save } = await api.newGame(hero, skin);
      set({ save });
    },
    setSave(save) {
      set({ save });
    },
    markSolved(id) {
      if (!get().solved.includes(id)) set({ solved: [...get().solved, id] });
    },
    updateSettings(patch) {
      const settings = { ...get().settings, ...patch };
      saveLocalSettings(settings);
      music.setVolumes(settings.musicVolume, settings.sfxVolume);
      set({ settings });
      if (get().account) api.updateSettings(patch).catch(() => {});
    },
    pushToast(t) {
      const id = ++uid;
      set({ toasts: [...get().toasts, { ...t, id }] });
      setTimeout(() => set({ toasts: get().toasts.filter((x) => x.id !== id) }), 4000);
    },
    toggleMute() {
      const muted = !get().muted;
      saveFlag(MUTED_KEY, muted);
      music.setMuted(muted);
      set({ muted });
    },
    setTouchControls(on) {
      saveFlag(TOUCH_KEY, on);
      set({ touchControls: on });
    },
    showBanner(title, sub) {
      const id = ++uid;
      set({ banner: { id, title, sub } });
      setTimeout(() => get().banner?.id === id && set({ banner: null }), 3200);
    },
  };
});

/** Personalises story text: "{name}" becomes the player's username. */
export function personalize(text: string): string {
  return text.replaceAll('{name}', useGame.getState().account?.username ?? 'Hero');
}
