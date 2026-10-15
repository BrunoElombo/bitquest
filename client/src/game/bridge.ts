import type { EncounterResponse, GameOverInfo } from '@shared/game';
import { useGame, type DialogueLine, type EncounterUIRequest, type PauseAction, type PauseRequest } from '../store';

// Phaser scenes talk to the React overlay through these promise-returning calls:
// the scene awaits while the player reads a dialogue or answers a challenge.

export const ui = {
  say(lines: DialogueLine[]): Promise<void> {
    if (!lines.length) return Promise.resolve();
    return new Promise((resolve) =>
      useGame.setState({
        dialogue: {
          lines,
          resolve: () => {
            useGame.setState({ dialogue: null });
            resolve();
          },
        },
      }),
    );
  },

  encounter(req: EncounterUIRequest): Promise<EncounterResponse> {
    return new Promise((resolve) =>
      useGame.setState({
        encounter: {
          req,
          resolve: (r) => {
            useGame.setState({ encounter: null });
            resolve(r);
          },
        },
      }),
    );
  },

  pause(req: PauseRequest): Promise<PauseAction> {
    return new Promise((resolve) =>
      useGame.setState({
        pause: {
          req,
          resolve: (a) => {
            useGame.setState({ pause: null });
            resolve(a);
          },
        },
      }),
    );
  },

  gameOver(info: GameOverInfo): Promise<void> {
    return new Promise((resolve) =>
      useGame.setState({
        gameOver: {
          info,
          resolve: () => {
            useGame.setState({ gameOver: null });
            resolve();
          },
        },
      }),
    );
  },

  banner(title: string, sub?: string) {
    useGame.getState().showBanner(title, sub);
  },

  toast(icon: string, title: string, body?: string) {
    useGame.getState().pushToast({ icon, title, body });
  },
};

/** Set by the Play page so scenes can leave the game (e.g. "Save & quit"). */
export const exitGame = { handler: () => {} };
