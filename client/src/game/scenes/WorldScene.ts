import Phaser from 'phaser';
import { keysCollected, LAND_IDS, LANDS, landUnlocked, type LandId } from '@shared/game';
import { TRACK_BY_ID } from '@shared/tracks';
import type { L } from '@shared/types';
import { api } from '../../api';
import { music } from '../../audio/music';
import { tl } from '../../i18n';
import { useGame } from '../../store';
import { TILE } from '../assets';
import { BaseScene, FONT } from '../BaseScene';
import { ui } from '../bridge';
import { LAND_CONTENT } from '../lands';
import { MapDraft } from '../mapBuilder';
import { WORLD_INTRO, WORLD_TEXT } from '../story';

const WORLD_NAME: L = { en: 'Kingdom of Bytaria', fr: 'Royaume de Bytaria' };

/** Portal positions (left tile of a 2-wide road). */
const GATES: Record<LandId | 'citadel' | 'village', { x: number; y: number }> = {
  javascript: { x: 12, y: 23 },
  python: { x: 28, y: 20 },
  ai: { x: 20, y: 20 },
  linux: { x: 44, y: 23 },
  typescript: { x: 6, y: 10 },
  nodejs: { x: 18, y: 10 },
  java: { x: 28, y: 12 },
  git: { x: 38, y: 10 },
  github: { x: 50, y: 10 },
  devops: { x: 38, y: 4 },
  citadel: { x: 28, y: 3 },
  village: { x: 28, y: 33 },
};

function worldDraft(): MapDraft {
  const d = new MapDraft(56, 36);
  d.frame('T', 0, 0, 56, 36, 2);
  d.hroad(12, 45, 27);
  d.vroad(28, 2, 34);
  d.vroad(12, 15, 28).vroad(44, 15, 28);
  d.hroad(6, 19, 15).vroad(6, 10, 16).vroad(18, 6, 16);
  d.hroad(38, 51, 15).vroad(38, 4, 16).vroad(50, 10, 16);
  d.hroad(18, 39, 6);
  d.hroad(23, 26, 20);
  d.fill('~', 33, 21, 6, 4).fill('~', 2, 19, 5, 6).fill('~', 47, 30, 6, 3);
  d.fill(',', 21, 22, 4, 3).fill(',', 44, 4, 5, 3);
  for (const g of Object.values(GATES)) d.fill(':', g.x - 1, g.y - 1, 4, 3);
  d.scatter(['T', 'T', 'Y', 't', 'y', 'B'], 160, 3, { x: 2, y: 2, w: 52, h: 32 });
  return d;
}

export class WorldScene extends BaseScene {
  protected sceneId = 'world' as const;

  constructor() {
    super('world');
  }

  create(data: { from?: LandId | 'village'; at?: 'saved'; cleared?: boolean }) {
    this.land = undefined;
    const d = worldDraft();
    const below = (g: { x: number; y: number }) => ({ x: (g.x + 1) * TILE, y: (g.y + 2) * TILE + 8 });
    let spawn = below(GATES.village);
    spawn.y -= 3 * TILE;
    if (data.from && data.from !== 'village') spawn = below(GATES[data.from]);
    const loc = this.save.location;
    if (data.at === 'saved' && loc.scene === 'world' && loc.x >= 0) spawn = { x: loc.x, y: loc.y };

    this.setupWorld(d, spawn, { scene: 'menu', intensity: 0.3 });
    this.setPlace(WORLD_NAME, null);

    for (const id of Object.keys(LANDS) as LandId[]) this.addGate(id);
    this.addCitadel();
    this.addVillagePortal();

    ui.banner(tl(WORLD_NAME));
    void this.welcome(data.cleared ? data.from : undefined);
  }

  private async welcome(cleared?: LandId | 'village') {
    if (cleared && cleared !== 'village') {
      const content = LAND_CONTENT[cleared];
      if (content) await this.say(content.story.afterVictory);
    }
    if (!this.save.flags.worldIntro) {
      await this.say(WORLD_INTRO);
      const r = await api.progress({ flags: { worldIntro: true } }).catch(() => null);
      if (r) useGame.getState().setSave(r.save);
    }
  }

  private portal(gx: number, gy: number, color: number, state: 'open' | 'locked' | 'fog' | 'cleared') {
    const x = (gx + 1) * TILE;
    const y = gy * TILE + 8;
    const p = this.add.image(x, y, 'portal').setDepth(5).setTint(state === 'cleared' ? 0xffe14d : color);
    if (state === 'locked' || state === 'fog') p.setAlpha(0.35);
    else {
      this.tweens.add({ targets: p, angle: 360, repeat: -1, duration: 4000 });
      const glow = this.add.image(x, y, 'glow').setTint(color).setBlendMode(Phaser.BlendModes.ADD).setAlpha(0.5).setDepth(4);
      this.tweens.add({ targets: glow, scale: 1.25, yoyo: true, repeat: -1, duration: 1000 });
    }
    if (state === 'locked') this.add.image(x, y, 'lock').setDepth(6);
    if (state === 'fog') {
      const f = this.add.image(x, y, 'fog').setDepth(7).setAlpha(0.7);
      this.tweens.add({ targets: f, x: x + 3, yoyo: true, repeat: -1, duration: 2000 });
    }
    return { x, y };
  }

  private addGate(id: LandId) {
    const g = GATES[id];
    const def = LANDS[id];
    const track = TRACK_BY_ID[id];
    const color = Phaser.Display.Color.HexStringToColor(track.color).color;
    const p = this.save.lands[id];
    const unlocked = landUnlocked(this.save, id);
    const state = p.bossDefeated ? 'cleared' : !unlocked ? 'locked' : !def.playable ? 'fog' : 'open';
    const pos = this.portal(g.x, g.y, color, state);
    this.label(pos.x, pos.y - 11, track.name + (p.bossDefeated ? ' ✓' : ''), state === 'locked' ? '#9a9ad0' : track.color);

    this.interactables.push({
      x: pos.x,
      y: pos.y,
      radius: 18,
      onAct: async () => {
        if (!unlocked) {
          const names = def.requires.map((r) => TRACK_BY_ID[r].name).join(' + ');
          await this.say([{ text: { en: WORLD_TEXT.sealed.en + names, fr: WORLD_TEXT.sealed.fr + names } }]);
          return;
        }
        if (!def.playable || !LAND_CONTENT[id]) {
          await this.say([{ text: { en: `${def.name.en}. ${WORLD_TEXT.fog.en}`, fr: `${def.name.fr}. ${WORLD_TEXT.fog.fr}` } }]);
          return;
        }
        music.sfx('start');
        this.go('land', { land: id, at: p.checkpoint ? 'checkpoint' : 'entrance' });
      },
    });
  }

  private addCitadel() {
    const g = GATES.citadel;
    const x = (g.x + 1) * TILE;
    const y = g.y * TILE + 8;
    this.add.image(x - 8, y - 4, 'town', 100).setDepth(6);
    this.add.image(x + 8, y - 4, 'town', 100).setDepth(6);
    this.add.image(x, y + 4, 'town', 111).setDepth(6);
    this.add.text(x, y - 14, 'KERNEL CITADEL', { ...FONT, color: '#ff4d6a', stroke: '#14142b', strokeThickness: 3 }).setOrigin(0.5, 1).setDepth(60);
    this.interactables.push({
      x,
      y: y + 6,
      radius: 22,
      onAct: () =>
        this.say([
          {
            text: {
              en: `${WORLD_TEXT.citadel.en}${keysCollected(this.save)}/${LAND_IDS.length}.`,
              fr: `${WORLD_TEXT.citadel.fr}${keysCollected(this.save)}/${LAND_IDS.length}.`,
            },
          },
        ]),
    });
  }

  private addVillagePortal() {
    const pos = this.portal(GATES.village.x, GATES.village.y, 0x39ff7a, 'open');
    this.label(pos.x, pos.y - 11, 'Hello World', '#39ff7a');
    this.interactables.push({ x: pos.x, y: pos.y, radius: 18, onAct: () => this.go('village', { at: 'north' }) });
  }
}
