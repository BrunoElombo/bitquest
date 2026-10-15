import Phaser from 'phaser';
import { LANDS, SHRINES_PER_LAND, type LandId } from '@shared/game';
import type { Tier } from '@shared/types';
import { api } from '../../api';
import { music } from '../../audio/music';
import { tl } from '../../i18n';
import { useGame } from '../../store';
import { DUNGEON, EXTRA, GID, TILE, TOWN } from '../assets';
import { BaseScene } from '../BaseScene';
import { ui } from '../bridge';
import { LAND_CONTENT } from '../lands';
import type { LandContent, MonsterDef } from '../lands/types';
import { at, type Marker } from '../mapBuilder';

export interface LandSceneData {
  land: LandId;
  /** Where to place the hero. */
  at: 'entrance' | 'checkpoint' | 'saved';
}

/** Decoration tiles that glow, with the tint of their light. */
const LIGHT_TINTS: Record<number, number> = {
  [GID.extra + EXTRA.lamp]: 0xffffff,
  [GID.extra + EXTRA.torch]: 0xffb060,
  [GID.extra + EXTRA.iceCrystal]: 0x7fdfff,
  [GID.extra + EXTRA.neuralNode]: 0x00e5b0,
};

interface Monster {
  sprite: Phaser.Physics.Arcade.Sprite;
  def: MonsterDef;
  tier: 1 | 2 | 3;
  home: Phaser.Math.Vector2;
  nextTurn: number;
  id: string;
}

export class LandScene extends BaseScene {
  protected sceneId = 'land' as const;
  private content!: LandContent;
  private monsters: Monster[] = [];
  private checkpointFlags = new Map<string, Phaser.GameObjects.Image>();
  private gateMarker?: Marker;
  private talkCount = new Map<string, number>();

  constructor() {
    super('land');
  }

  create(data: LandSceneData) {
    const content = LAND_CONTENT[data.land];
    if (!content) {
      this.scene.start('world', {});
      return;
    }
    this.content = content;
    this.land = data.land;
    this.monsters = [];
    this.checkpointFlags.clear();
    const d = content.draft();
    const markers = d.markers;
    const progress = this.save.lands[data.land];

    const find = (type: Marker['type'], id?: string) => markers.find((m) => m.type === type && (id === undefined || m.id === id));
    const spawnMarker = find('spawn')!;
    const checkpointMarker = find('checkpoint', progress.checkpoint ?? 'start') ?? spawnMarker;
    let spawn = { x: at(spawnMarker.x, spawnMarker.y).x, y: at(spawnMarker.x, spawnMarker.y).y + TILE / 2 };
    if (data.at === 'checkpoint') spawn = { x: at(checkpointMarker.x, checkpointMarker.y).x, y: at(checkpointMarker.x, checkpointMarker.y).y + 14 };
    if (data.at === 'saved') {
      const loc = this.save.location;
      if (loc.scene === 'land' && loc.land === data.land && loc.x >= 0) spawn = { x: loc.x, y: loc.y };
      else spawn = { x: at(checkpointMarker.x, checkpointMarker.y).x, y: at(checkpointMarker.x, checkpointMarker.y).y + 14 };
    }

    this.setupWorld(d, spawn, content.music);
    content.grade?.(this.cameras.main);
    this.setPlace(LANDS[data.land].name, data.land);
    this.addLights();

    for (const m of markers) {
      const p = at(m.x, m.y);
      switch (m.type) {
        case 'npc':
          this.addLandNpc(m.id!, p.x, p.y);
          break;
        case 'shrine':
          this.addShrine(Number(m.id), p.x, p.y);
          break;
        case 'chest':
          this.addChest(m.id!, p.x, p.y);
          break;
        case 'checkpoint':
          this.addCheckpoint(m.id!, p.x, p.y);
          break;
        case 'monster':
          this.addMonster(m, p.x, p.y);
          break;
        case 'sign':
          this.addSign(m.id!, p.x, p.y);
          break;
        case 'exit':
          this.triggers.push({
            rect: new Phaser.Geom.Rectangle(m.x * TILE - 8, m.y * TILE, (m.w ?? 1) * TILE + 4, (m.h ?? 1) * TILE),
            onEnter: () => this.go('world', { from: this.land }),
          });
          break;
        case 'bossGate':
          this.gateMarker = m;
          this.interactables.push({ x: m.x * TILE, y: (m.y + (m.h ?? 1) / 2) * TILE, radius: 26, onAct: () => this.onGate() });
          break;
      }
    }
    this.refreshGate();

    ui.banner(tl(LANDS[data.land].name));
    if (!progress.introSeen) {
      void this.say(content.story.intro).then(() =>
        api.progress({ introSeen: data.land }).then((r) => useGame.getState().setSave(r.save)),
      );
    }
  }

  protected restoreMusic() {
    music.setScene(this.content.music.scene, this.content.music.intensity);
  }

  // ---------------------------------------------------------------- world objects

  private addLights() {
    const deco = this.built.deco;
    deco.forEachTile((t) => {
      const tint = LIGHT_TINTS[t.index];
      if (tint === undefined) return;
      const glow = this.add
        .image(t.pixelX + 8, t.pixelY + 3, 'glow')
        .setBlendMode(Phaser.BlendModes.ADD)
        .setDepth(30)
        .setAlpha(0.55)
        .setScale(0.9);
      if (tint !== 0xffffff) glow.setTint(tint);
      this.tweens.add({ targets: glow, alpha: 0.35, yoyo: true, repeat: -1, duration: 900 + Math.random() * 900 });
    });
  }

  private addLandNpc(id: string, x: number, y: number) {
    const def = this.content.npcs[id];
    if (!def) return;
    this.addNpc(x, y, def.frame, async () => {
      const n = this.talkCount.get(id) ?? 0;
      this.talkCount.set(id, n + 1);
      const p = this.save.lands[this.land!];
      if (id === Object.keys(this.content.npcs)[0] && p.bossDefeated) {
        await this.say(this.content.story.afterVictory);
        return;
      }
      await this.say(n === 0 ? def.first : def.tips[(n - 1) % def.tips.length]);
    });
  }

  private addSign(id: string, x: number, y: number) {
    const s = this.physics.add.staticImage(x, y, 'town', TOWN.sign);
    this.physics.add.collider(this.player, s);
    const text = this.content.signs[id];
    if (text) this.interactables.push({ x, y, onAct: () => this.say([{ text }]) });
  }

  private addShrine(idx: number, x: number, y: number) {
    const solved = () => this.save.lands[this.land!].shrines.includes(idx);
    const statue = this.physics.add.staticSprite(x, y, 'dungeon', solved() ? DUNGEON.statueDim : DUNGEON.statueLit);
    statue.setDepth(10 + y / 1000);
    this.physics.add.collider(this.player, statue);
    const glow = this.add.image(x, y, 'glow').setBlendMode(Phaser.BlendModes.ADD).setTint(0x39ff7a).setAlpha(solved() ? 0 : 0.5).setDepth(9);
    this.tweens.add({ targets: glow, scale: 1.2, yoyo: true, repeat: -1, duration: 1100 });

    this.interactables.push({
      x,
      y,
      onAct: async () => {
        const story = this.content.story;
        if (solved()) {
          await this.say(story.letters[idx]);
          return;
        }
        await this.say(story.shrineIntro);
        const r = await this.challenge('shrine', String(idx), {
          title: { en: `Shrine of the letter ${idx + 1}: solve the enigma`, fr: `Sanctuaire de la lettre ${idx + 1} : résous l’énigme` },
          portrait: DUNGEON.statueLit,
          maxTier: 4,
          preferTier: (idx + 1) as Tier,
        });
        if (!r?.correct || r.gameOver) return;
        statue.setFrame(DUNGEON.statueDim);
        glow.setAlpha(0);
        music.sfx('chime');
        await this.say(story.letters[idx]);
        if (r.events.includes('gateOpened')) {
          this.refreshGate();
          await this.say(story.gateOpened);
        } else {
          const n = this.save.lands[this.land!].shrines.length;
          ui.toast('✉', tl({ en: `Ada's letters: ${n}/${SHRINES_PER_LAND}`, fr: `Lettres d’Ada : ${n}/${SHRINES_PER_LAND}` }));
        }
      },
    });
  }

  private addChest(id: string, x: number, y: number) {
    const opened = () => this.save.lands[this.land!].chests.includes(id);
    const chest = this.physics.add.staticSprite(x, y, 'dungeon', opened() ? DUNGEON.chestOpen : DUNGEON.chest);
    chest.setDepth(10 + y / 1000);
    this.physics.add.collider(this.player, chest);
    const index = this.content.draft().markers.filter((m) => m.type === 'chest').findIndex((m) => m.id === id);

    this.interactables.push({
      x,
      y,
      onAct: async () => {
        if (opened()) {
          await this.say([{ text: { en: 'The chest is empty.', fr: 'Le coffre est vide.' } }]);
          return;
        }
        const r = await this.challenge('chest', id, {
          title: { en: 'A locked chest! Solve its puzzle to open it.', fr: 'Un coffre verrouillé ! Résous son énigme pour l’ouvrir.' },
          portrait: DUNGEON.chest,
          maxTier: 4,
          preferTier: Math.min(4, 2 + index) as Tier,
        });
        if (r?.events.includes('chestOpened')) {
          chest.setFrame(DUNGEON.chestOpen);
          music.sfx('coin');
          this.burst(x, y, 0xffe14d);
        }
      },
    });
  }

  private addCheckpoint(id: string, x: number, y: number) {
    const current = () => (this.save.lands[this.land!].checkpoint ?? 'start') === id;
    const flag = this.add.image(x, y, current() ? 'flag' : 'flagOff').setDepth(10 + y / 1000);
    this.checkpointFlags.set(id, flag);
    this.triggers.push({
      rect: new Phaser.Geom.Rectangle(x - 12, y - 12, 24, 28),
      onEnter: async () => {
        if (current()) return;
        const r = await api.progress({ checkpoint: { land: this.land!, id } }).catch(() => null);
        if (!r) return;
        useGame.getState().setSave(r.save);
        this.checkpointFlags.forEach((f, k) => f.setTexture(k === id ? 'flag' : 'flagOff'));
        music.sfx('coin');
        ui.toast('⛳', tl({ en: 'Checkpoint saved', fr: 'Point de contrôle enregistré' }));
      },
    });
  }

  private addMonster(m: Marker, x: number, y: number) {
    const tier = m.tier ?? 1;
    const def = this.content.monsters[tier];
    const sprite = this.physics.add.sprite(x, y, 'dungeon', def.frame);
    sprite.setSize(10, 9).setOffset(3, 6);
    if (def.tint) sprite.setTint(def.tint);
    sprite.setDepth(10 + y / 1000);
    this.physics.add.collider(sprite, this.built.deco);
    this.physics.add.collider(sprite, this.built.ground);
    const mon: Monster = { sprite, def, tier, home: new Phaser.Math.Vector2(x, y), nextTurn: 0, id: `${m.x}-${m.y}` };
    this.monsters.push(mon);
    this.tweens.add({ targets: sprite, scaleY: 0.85, yoyo: true, repeat: -1, duration: 260 + tier * 60 });
    this.physics.add.overlap(this.player, sprite, () => void this.onMonsterTouch(mon));
  }

  private async onMonsterTouch(mon: Monster) {
    if (this.busy || this.player.invulnerable || !mon.sprite.active) return;
    const r = await this.challenge('monster', mon.id, {
      title: { en: `${mon.def.name.en} attacks!`, fr: `${mon.def.name.fr} attaque !` },
      portrait: mon.def.frame,
      maxTier: mon.tier as Tier,
      preferTier: mon.tier as Tier,
    });
    if (!r || r.gameOver) return;
    if (r.correct) {
      music.sfx('hit');
      this.burst(mon.sprite.x, mon.sprite.y, 0xffffff);
      mon.sprite.disableBody(true, true);
      this.monsters = this.monsters.filter((x) => x !== mon);
    } else {
      music.sfx('hurt');
      this.cameras.main.shake(180, 0.01);
      this.player.hurt(mon.sprite.x, mon.sprite.y);
    }
  }

  private burst(x: number, y: number, tint: number) {
    const p = this.add.particles(x, y, 'spark', {
      speed: { min: 30, max: 90 },
      lifespan: 450,
      quantity: 14,
      scale: { start: 1, end: 0 },
      tint,
      emitting: false,
    });
    p.setDepth(100);
    p.explode(14);
    this.time.delayedCall(600, () => p.destroy());
  }

  // ---------------------------------------------------------------- boss gate

  private gateOpen(): boolean {
    return this.save.lands[this.land!].shrines.length >= SHRINES_PER_LAND;
  }

  private refreshGate() {
    const g = this.gateMarker;
    if (!g) return;
    const open = this.gateOpen() && !this.save.lands[this.land!].bossDefeated;
    for (let j = 0; j < (g.h ?? 1); j++) {
      const gid = open || this.save.lands[this.land!].bossDefeated ? GID.town + 113 : GID.town + TOWN.gate;
      this.built.deco.putTileAt(gid, g.x, g.y + j).setCollision(true);
    }
  }

  private async onGate() {
    const p = this.save.lands[this.land!];
    const story = this.content.story;
    if (p.bossDefeated) {
      await this.say(story.gateCleared);
      return;
    }
    if (!this.gateOpen()) {
      await this.say(story.gateSealed(p.shrines.length));
      return;
    }
    await this.say(story.bossIntro);
    try {
      const r = await api.bossStart(this.land!);
      useGame.getState().setSave(r.save);
      await this.savePosition();
      this.go('boss', { land: this.land });
    } catch (e) {
      ui.toast('⚠', (e as Error).message);
    }
  }

  // ---------------------------------------------------------------- monsters AI

  protected tick(time: number) {
    for (const m of this.monsters) {
      const s = m.sprite;
      if (!s.active) continue;
      const toPlayer = Phaser.Math.Distance.Between(s.x, s.y, this.player.x, this.player.y);
      const fromHome = Phaser.Math.Distance.Between(s.x, s.y, m.home.x, m.home.y);
      if (toPlayer < 70 && fromHome < 120 && !this.player.invulnerable) {
        this.physics.moveToObject(s, this.player, m.def.speed);
      } else if (fromHome > 60) {
        this.physics.moveTo(s, m.home.x, m.home.y, m.def.speed * 0.8);
      } else if (time > m.nextTurn) {
        m.nextTurn = time + 900 + Math.random() * 1400;
        const a = Math.random() * Math.PI * 2;
        const still = Math.random() < 0.3;
        s.setVelocity(still ? 0 : Math.cos(a) * m.def.speed * 0.6, still ? 0 : Math.sin(a) * m.def.speed * 0.6);
      }
      s.setFlipX((s.body?.velocity.x ?? 0) < 0);
      s.setDepth(10 + s.y / 1000);
    }
  }
}
