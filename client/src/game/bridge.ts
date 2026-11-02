import type { EncounterResponse, GameOverInfo } from '@shared/game';
import {
  useGame,
  type ConfirmRequest,
  type DialogueLine,
  type EncounterUIRequest,
  type PauseAction,
  type PauseRequest,
  type TrainingResult,
  type TrainingUIRequest,
} from '../store';

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

  /** A dojo drill. The caller gets the local verdict; nothing is sent to the server. */
  train(req: TrainingUIRequest): Promise<TrainingResult> {
    return new Promise((resolve) =>
      useGame.setState({
        training: {
          req,
          resolve: (r) => {
            useGame.setState({ training: null });
            resolve(r);
          },
        },
      }),
    );
  },

  confirm(req: ConfirmRequest): Promise<boolean> {
    return new Promise((resolve) =>
      useGame.setState({
        confirm: {
          req,
          resolve: (ok) => {
            useGame.setState({ confirm: null });
            resolve(ok);
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
