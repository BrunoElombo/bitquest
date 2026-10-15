import Phaser from 'phaser';
import { BootScene } from './scenes/BootScene';
import { BossScene } from './scenes/BossScene';
import { LandScene } from './scenes/LandScene';
import { VillageScene } from './scenes/VillageScene';
import { WorldScene } from './scenes/WorldScene';

/** 480×270 pixel-art canvas, scaled to fit the window (16:9). */
export function createGame(parent: HTMLElement): Phaser.Game {
  const game = new Phaser.Game({
    type: Phaser.AUTO,
    parent,
    width: 480,
    height: 270,
    pixelArt: true,
    roundPixels: true,
    backgroundColor: '#0b0b1a',
    physics: { default: 'arcade', arcade: { debug: false } },
    input: { gamepad: true },
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    scene: [BootScene, VillageScene, WorldScene, LandScene, BossScene],
  });
  // Handy for debugging and automated play-tests in development only.
  if (import.meta.env.DEV) (window as unknown as { __game: Phaser.Game }).__game = game;
  return game;
}
