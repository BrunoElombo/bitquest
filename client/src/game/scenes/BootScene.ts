import Phaser from 'phaser';
import { useGame } from '../../store';
import { generateTextures } from '../textures';

/** Loads the Kenney sheets, draws generated textures, waits for the pixel font, then resumes the save. */
export class BootScene extends Phaser.Scene {
  constructor() {
    super('boot');
  }

  preload() {
    this.load.spritesheet('town', '/assets/town.png', { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('dungeon', '/assets/dungeon.png', { frameWidth: 16, frameHeight: 16 });
  }

  create() {
    generateTextures(this);
    const ready = document.fonts?.load('8px "Press Start 2P"').catch(() => undefined) ?? Promise.resolve();
    void ready.then(() => {
      // The page may have been left (or React re-mounted it) while the font loaded.
      if (!this.sys?.settings?.active) return;
      const save = useGame.getState().save;
      const loc = save?.location;
      switch (loc?.scene) {
        case 'world':
          this.scene.start('world', { at: 'saved' });
          break;
        case 'land':
        case 'boss':
          this.scene.start('land', { land: loc.land, at: 'saved' });
          break;
        default:
          this.scene.start('village', { at: 'saved' });
      }
    });
  }
}
