import type { PauseView } from '../store';

// Input coming from the React overlay (on-screen buttons, touch pad) rather than the keyboard
// or a gamepad. Scenes read it every frame in BaseScene.readInput().

export const virtualInput = {
  /** Held direction from the touch pad, -1..1 on each axis. */
  vx: 0,
  vy: 0,
  /** One-shot "action" press, consumed by the next frame that reads it. */
  act: false,
  /** One-shot request to open the pause menu on a given view. */
  menu: null as PauseView | null,
};

export function consumeAct(): boolean {
  const v = virtualInput.act;
  virtualInput.act = false;
  return v;
}

export function consumeMenu(): PauseView | null {
  const v = virtualInput.menu;
  virtualInput.menu = null;
  return v;
}

export function isFullscreen(): boolean {
  return !!document.fullscreenElement;
}

export function toggleFullscreen(): void {
  if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
  else void document.documentElement.requestFullscreen?.().catch(() => {});
}
