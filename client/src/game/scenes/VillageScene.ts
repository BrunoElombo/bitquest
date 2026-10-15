import Phaser from 'phaser';
import type { L } from '@shared/types';
import { api } from '../../api';
import { tl } from '../../i18n';
import { useGame } from '../../store';
import { DUNGEON, TILE, TOWN } from '../assets';
import { BaseScene } from '../BaseScene';
import { ui } from '../bridge';
import { at, MapDraft } from '../mapBuilder';
import { GRANDMA_TIPS, GRANDMA_TUTORIAL, PROLOGUE, SIGNS, VILLAGERS } from '../story';

const VILLAGE_NAME: L = { en: 'Hello World Village', fr: 'Village Hello World' };

function villageDraft(): MapDraft {
  const d = new MapDraft(40, 26);
  d.frame('T', 0, 0, 40, 26, 2);
  d.vroad(19, 0, 16);
  d.clear(19, 0, 2, 2);
  d.hroad(4, 35, 9);
  d.fill(':', 15, 12, 10, 6);
  d.vroad(19, 18, 23);
  d.hroad(25, 32, 16);
  d.fill('~', 3, 17, 5, 4);
  d.fill(',', 9, 19, 4, 3).fill(',', 33, 4, 4, 3);

  d.stamp(5, 6, 'houseRed').stamp(10, 6, 'houseGrey').stamp(26, 6, 'houseRed').stamp(31, 6, 'houseGrey');
  d.stamp(28, 13, 'arena');
  d.put(19, 14, 'k');
  d.line('F', 9, 23, 14, 23).put(16, 20, 'h').put(23, 20, 'l');

  d.mark({ type: 'exit', x: 19, y: 0, w: 2, h: 1, id: 'north' });
  d.mark({ type: 'spawn', x: 19, y: 21 });
  d.mark({ type: 'npc', x: 7, y: 11, id: 'grandma' });
  d.mark({ type: 'npc', x: 12, y: 11, id: 'printf' });
  d.mark({ type: 'npc', x: 22, y: 15, id: 'loop' });
  d.mark({ type: 'npc', x: 33, y: 17, id: 'keeper' });
  d.mark({ type: 'sign', x: 21, y: 3, id: 'north' });
  d.mark({ type: 'sign', x: 21, y: 20, id: 'village' });
  d.mark({ type: 'sign', x: 27, y: 17, id: 'arena' });
  d.scatter(['T', 'Y', 't', 'B', 'm', 'p'], 28, 5, { x: 2, y: 2, w: 36, h: 22 });
  return d;
}

export class VillageScene extends BaseScene {
  protected sceneId = 'village' as const;
  private talks = new Map<string, number>();

  constructor() {
    super('village');
  }

  create(data: { at?: 'saved' | 'north' }) {
    this.land = undefined;
    const d = villageDraft();
    const spawnM = d.markers.find((m) => m.type === 'spawn')!;
    // Roads are two tiles wide: stand in their middle.
    let spawn = { x: at(spawnM.x, spawnM.y).x + TILE / 2, y: at(spawnM.x, spawnM.y).y };
    const loc = this.save.location;
    if (data.at === 'north') spawn = { x: at(19, 2).x + TILE / 2, y: at(19, 2).y };
    else if (data.at === 'saved' && loc.scene === 'village' && loc.x >= 0) spawn = { x: loc.x, y: loc.y };

    this.setupWorld(d, spawn, { scene: 'review', intensity: 0.2 });
    this.setPlace(VILLAGE_NAME, null);

    for (const m of d.markers) {
      const p = at(m.x, m.y);
      if (m.type === 'npc') this.addVillager(m.id!, p.x, p.y);
      if (m.type === 'sign') {
        const s = this.physics.add.staticImage(p.x, p.y, 'town', TOWN.sign);
        this.physics.add.collider(this.player, s);
        const text = SIGNS[m.id!];
        this.interactables.push({ x: p.x, y: p.y, onAct: () => this.say([{ text }]) });
      }
      if (m.type === 'exit') {
        this.triggers.push({
          rect: new Phaser.Geom.Rectangle(m.x * TILE, -8, (m.w ?? 1) * TILE, TILE),
          onEnter: () => this.go('world', { from: 'village' }),
        });
      }
    }

    ui.banner(tl(VILLAGE_NAME));
    if (!this.save.flags.prologue) void this.prologue();
  }

  private async prologue() {
    await this.say(PROLOGUE);
    await this.say(GRANDMA_TUTORIAL);
    const r = await api.progress({ flags: { prologue: true } }).catch(() => null);
    if (r) useGame.getState().setSave(r.save);
  }

  private addVillager(id: string, x: number, y: number) {
    if (id === 'grandma') {
      this.addNpc(x, y, DUNGEON.grandma, async () => {
        const n = this.talks.get(id) ?? 0;
        this.talks.set(id, n + 1);
        await this.say(n === 0 && !this.save.flags.prologue ? GRANDMA_TUTORIAL : GRANDMA_TIPS[n % GRANDMA_TIPS.length]);
      });
      return;
    }
    const v = VILLAGERS[id as keyof typeof VILLAGERS];
    this.addNpc(x, y, v.frame, async () => {
      const n = this.talks.get(id) ?? 0;
      this.talks.set(id, n + 1);
      await this.say(v.lines[n % v.lines.length]);
    });
  }
}
