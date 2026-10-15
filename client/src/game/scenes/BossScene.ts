import Phaser from 'phaser';
import confetti from 'canvas-confetti';
import { LANDS, type LandId } from '@shared/game';
import { TRACK_BY_ID } from '@shared/tracks';
import type { Tier } from '@shared/types';
import { api } from '../../api';
import { music } from '../../audio/music';
import { tl } from '../../i18n';
import { useGame } from '../../store';
import { TILE } from '../assets';
import { BaseScene } from '../BaseScene';
import { ui } from '../bridge';
import { LAND_CONTENT } from '../lands';
import type { BossAttack, LandContent } from '../lands/types';
import { at } from '../mapBuilder';

/** The Kraken's pattern, used by bosses that do not define their own. */
const DEFAULT_ATTACKS: Record<1 | 2 | 3, BossAttack[]> = { 1: ['fan'], 2: ['fan'], 3: ['fan', 'fan', 'ring'] };

/**
 * A real-time boss fight: the boss moves over the top of its arena and fires volleys you must
 * dodge (patterns and movement come from the Land's BossArenaDef). Glowing runes appear on the
 * floor; stepping on one triggers a timed challenge, and only a correct answer (validated by the
 * server) lands a hit. Each third of its health is a phase.
 */
export class BossScene extends BaseScene {
  protected sceneId = 'boss' as const;
  private content!: LandContent;
  private boss!: Phaser.GameObjects.Sprite;
  private bullets!: Phaser.Physics.Arcade.Group;
  private rune!: Phaser.Physics.Arcade.Image;
  private runeGlow!: Phaser.GameObjects.Image;
  private nextShot = 0;
  private nextRune = 0;
  private runeExpires = 0;
  private volley = 0;
  private started = false;
  private defeated = false;

  constructor() {
    super('boss');
  }

  get needed() {
    return LANDS[this.land!].bossHits;
  }

  get hits() {
    return useGame.getState().save?.bossFight?.hits ?? 0;
  }

  /** 1, 2 or 3 depending on how hurt the boss is. */
  get phase(): 1 | 2 | 3 {
    const r = this.hits / this.needed;
    return r < 1 / 3 ? 1 : r < 2 / 3 ? 2 : 3;
  }

  create(data: { land: LandId }) {
    const content = LAND_CONTENT[data.land];
    if (!content) return this.scene.start('world', {});
    this.content = content;
    this.land = data.land;
    this.started = false;
    this.defeated = false;
    this.volley = 0;

    const d = content.boss.arena();
    const sp = d.markers.find((m) => m.type === 'spawn')!;
    this.setupWorld(d, at(sp.x, sp.y), { scene: 'battle', intensity: 0.5 });
    const cam = this.cameras.main;
    cam.stopFollow();
    cam.removeBounds();
    cam.centerOn(this.built.width / 2, this.built.height / 2);
    content.grade?.(cam);

    const def = TRACK_BY_ID[data.land].boss;
    this.setPlace(def.name, data.land);
    const b = content.boss;
    this.boss = (b.texture ? this.add.sprite(this.built.width / 2, 2.6 * TILE, b.texture) : this.add.sprite(this.built.width / 2, 2.6 * TILE, 'dungeon', b.frame))
      .setScale(content.boss.scale)
      .setTint(content.boss.tint)
      .setDepth(40);
    this.add.image(this.boss.x, 4.6 * TILE, 'shadow').setScale(4, 2).setAlpha(0.6).setDepth(2);

    this.bullets = this.physics.add.group();
    this.physics.add.overlap(this.player, this.bullets, (_p, b) => void this.onBullet(b as Phaser.Physics.Arcade.Image));

    this.rune = this.physics.add.image(-100, -100, 'rune').setDepth(5).setVisible(false);
    this.runeGlow = this.add.image(-100, -100, 'glow').setTint(0x39ff7a).setBlendMode(Phaser.BlendModes.ADD).setAlpha(0.5).setVisible(false).setDepth(4);
    this.tweens.add({ targets: this.rune, angle: 360, repeat: -1, duration: 2400 });
    this.physics.add.overlap(this.player, this.rune, () => void this.onRune());

    this.syncBar();
    void this.intro();
  }

  private async intro() {
    if (!this.save.bossFight) {
      const r = await api.bossStart(this.land!).catch(() => null);
      if (r) useGame.getState().setSave(r.save);
      this.syncBar();
    }
    ui.banner(tl(TRACK_BY_ID[this.land!].boss.name), tl(TRACK_BY_ID[this.land!].boss.title));
    await this.say(this.content.story.bossHint);
    this.started = true;
    this.nextShot = this.time.now + 1200;
    this.nextRune = this.time.now + 2500;
  }

  private syncBar() {
    useGame.setState({ boss: { name: TRACK_BY_ID[this.land!].boss.name, hits: this.hits, needed: this.needed } });
  }

  protected restoreMusic() {
    music.setScene('battle', 0.55 + this.phase * 0.12);
  }

  // ---------------------------------------------------------------- fight loop

  protected tick(time: number) {
    if (!this.started || this.defeated) return;
    const phase = this.phase;
    const t = time / 1000;
    const speed = 0.5 + phase * 0.25;
    const range = this.built.width / 2 - 3 * TILE;
    switch (this.content.boss.movement ?? 'sway') {
      case 'sway':
        this.boss.x = this.built.width / 2 + Math.sin(t * speed) * range;
        this.boss.y = 2.6 * TILE + Math.sin(t * 2.2) * 4;
        this.boss.setFlipX(Math.cos(t * speed) < 0);
        break;
      case 'slither': {
        const s = speed * 0.8;
        this.boss.x = this.built.width / 2 + Math.sin(t * s) * range;
        this.boss.y = 2.6 * TILE + Math.sin(t * 5) * 5;
        this.boss.setAngle(Math.sin(t * 5) * 8);
        this.boss.setFlipX(Math.cos(t * s) < 0);
        break;
      }
      case 'drift': {
        // A floating figure-eight that flickers like a glitch.
        const s = speed * 0.9;
        this.boss.x = this.built.width / 2 + Math.sin(t * s) * range;
        this.boss.y = 2.6 * TILE + Math.sin(t * s * 2) * 8;
        this.boss.setAlpha(Math.floor(t * 7) % 9 === 0 ? 0.55 : 1);
        this.boss.setFlipX(Math.cos(t * s) < 0);
        break;
      }
      case 'stomp': {
        // Heavy hops from side to side.
        const s = speed * 0.7;
        this.boss.x = this.built.width / 2 + Math.sin(t * s) * range;
        this.boss.y = 2.6 * TILE - Math.abs(Math.sin(t * 3.5)) * 7;
        this.boss.setFlipX(Math.cos(t * s) < 0);
        break;
      }
    }
    if (phase === 3) this.boss.setTint(Math.floor(t * 6) % 2 ? 0xff4d6a : this.content.boss.tint);
    music.setIntensity(0.55 + phase * 0.12 + (this.save.hearts <= 1 ? 0.1 : 0));

    if (time > this.nextShot) {
      this.fire(phase);
      this.nextShot = time + [0, 2300, 1800, 1350][phase];
    }

    if (!this.rune.visible && time > this.nextRune) this.spawnRune(time);
    if (this.rune.visible && time > this.runeExpires) this.spawnRune(time);

    this.bullets.getChildren().forEach((b) => {
      const img = b as Phaser.Physics.Arcade.Image;
      if (img.x < -10 || img.y < -10 || img.x > this.built.width + 10 || img.y > this.built.height + 10) img.destroy();
    });
  }

  private fire(phase: 1 | 2 | 3) {
    this.volley++;
    const pattern = (this.content.boss.attacks ?? DEFAULT_ATTACKS)[phase];
    const attack = pattern[(this.volley - 1) % pattern.length];
    const speed = [0, 70, 85, 100][phase];
    const ox = this.boss.x;
    const oy = this.boss.y + 14;
    switch (attack) {
      case 'fan': {
        const count = [0, 3, 5, 7][phase];
        const aim = Phaser.Math.Angle.Between(ox, oy, this.player.x, this.player.y);
        for (let i = 0; i < count; i++) this.shoot(ox, oy, aim + (i - (count - 1) / 2) * 0.22, speed);
        break;
      }
      case 'ring':
        for (let i = 0; i < 12; i++) this.shoot(ox, oy, (Math.PI * 2 * i) / 12 + this.volley * 0.2, speed);
        break;
      case 'wall': {
        // The gap always sits on a multiple of four tiles: indentation is law.
        const cols = this.built.map.width;
        const gap = (4 * Phaser.Math.Between(0, Math.floor((cols - 4) / 4)) + 2) * TILE + TILE / 2;
        const half = [0, 24, 21, 18][phase];
        for (let x = TILE; x < this.built.width - TILE / 2; x += 12) {
          if (Math.abs(x - gap) > half) this.shoot(x, oy, Math.PI / 2, speed * 0.7);
        }
        break;
      }
      case 'rain': {
        const count = [0, 5, 7, 9][phase];
        for (let i = 0; i < count; i++) {
          const x = Phaser.Math.Between(TILE, this.built.width - TILE);
          this.shoot(x, oy - 8, Math.PI / 2 + Phaser.Math.FloatBetween(-0.08, 0.08), speed * Phaser.Math.FloatBetween(0.8, 1.15));
        }
        this.shoot(ox, oy, Phaser.Math.Angle.Between(ox, oy, this.player.x, this.player.y), speed);
        break;
      }
    }
    this.tweens.add({ targets: this.boss, scaleX: this.content.boss.scale * 1.12, yoyo: true, duration: 120 });
  }

  private shoot(x: number, y: number, angle: number, speed: number) {
    const def = this.content.boss;
    const b = this.bullets.create(x, y, def.projectile ?? 'bubble') as Phaser.Physics.Arcade.Image;
    b.setDepth(45).setCircle(3, 1, 1);
    if (def.projectileTint !== 0xffffff) b.setTint(def.projectileTint);
    b.setVelocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
  }

  private spawnRune(time: number) {
    const [top, bottom] = this.content.boss.runeRows ?? [7, 12];
    for (let tries = 0; tries < 30; tries++) {
      const x = (2 + Math.floor(Math.random() * (this.built.map.width - 4))) * TILE + TILE / 2;
      const y = (top + Math.floor(Math.random() * (bottom - top + 1))) * TILE + TILE / 2;
      if (Phaser.Math.Distance.Between(x, y, this.player.x, this.player.y) < 56) continue;
      this.rune.setPosition(x, y).setVisible(true);
      (this.rune.body as Phaser.Physics.Arcade.Body).enable = true;
      this.runeGlow.setPosition(x, y).setVisible(true);
      this.runeExpires = time + 9000;
      return;
    }
  }

  private hideRune() {
    this.rune.setVisible(false).setPosition(-100, -100);
    (this.rune.body as Phaser.Physics.Arcade.Body).enable = false;
    this.runeGlow.setVisible(false);
  }

  private async onBullet(b: Phaser.Physics.Arcade.Image) {
    if (this.busy || this.defeated || this.player.invulnerable) return;
    const bx = b.x;
    const by = b.y;
    b.destroy();
    this.player.hurt(bx, by);
    music.sfx('hurt');
    this.cameras.main.shake(160, 0.012);
    const r = await api.hurt(this.land!, 'projectile').catch(() => null);
    if (!r) return;
    useGame.getState().setSave(r.save);
    if (r.gameOver) {
      const info = r.gameOver;
      music.sfx('defeat');
      await this.withUI(() => ui.gameOver(info));
      this.go('land', { land: this.land, at: 'checkpoint' });
    }
  }

  private async onRune() {
    if (this.busy || this.defeated || !this.rune.visible) return;
    this.hideRune();
    const def = TRACK_BY_ID[this.land!].boss;
    const r = await this.challenge('boss', 'rune', {
      title: { en: `Code rune! Answer to strike ${def.name.en}`, fr: `Rune de code ! Réponds pour frapper ${def.name.fr}` },
      portrait: this.content.boss.frame,
      maxTier: 4,
      preferTier: Math.min(4, this.phase + 1) as Tier,
    });
    this.nextRune = this.time.now + 2200;
    if (!r || r.gameOver) return;
    this.syncBar();
    if (!r.correct) {
      music.sfx('hurt');
      this.player.hurt(this.boss.x, this.boss.y);
      return;
    }
    await this.strike();
    if (r.events.includes('bossDefeated')) await this.victory();
  }

  private strike(): Promise<void> {
    return new Promise((resolve) => {
      const slash = this.add.image(this.player.x, this.player.y, 'slash').setDepth(60).setScale(1.5);
      this.tweens.add({
        targets: slash,
        x: this.boss.x,
        y: this.boss.y,
        angle: 720,
        duration: 260,
        onComplete: () => {
          slash.destroy();
          music.sfx('crit');
          this.cameras.main.shake(200, 0.015);
          this.boss.setTintFill(0xffffff);
          this.time.delayedCall(120, () => this.boss.setTint(this.content.boss.tint));
          this.floatText(this.boss.x, this.boss.y - 30, `${this.hits}/${this.needed}`, '#39ff7a');
          resolve();
        },
      });
    });
  }

  private async victory() {
    this.defeated = true;
    this.hideRune();
    this.bullets.clear(true, true);
    music.sfx('victory');
    this.tweens.add({ targets: this.boss, alpha: 0, scale: 0.5, angle: 180, duration: 1600 });
    if (!useGame.getState().settings.reducedMotion) {
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 }, colors: ['#ff3caa', '#29e7ff', '#39ff7a', '#ffe14d'] });
    }
    await new Promise((r) => this.time.delayedCall(1700, r));
    useGame.setState({ boss: null });
    await this.say(this.content.story.victory);
    await api.progress({ location: { scene: 'world', x: -1, y: -1 } }).then((r) => useGame.getState().setSave(r.save)).catch(() => {});
    this.go('world', { from: this.land, cleared: true });
  }
}
