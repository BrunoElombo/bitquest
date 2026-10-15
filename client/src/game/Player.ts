import Phaser from 'phaser';
import { HEROES, type SaveState } from '@shared/game';

/** The hero: an arcade-physics sprite with a little walking waddle and hit invulnerability. */
export class Player extends Phaser.Physics.Arcade.Sprite {
  speed: number;
  invulnerableUntil = 0;
  private shadow: Phaser.GameObjects.Image;
  private walkTime = 0;

  constructor(scene: Phaser.Scene, x: number, y: number, save: SaveState) {
    const hero = HEROES[save.hero];
    super(scene, x, y, 'dungeon', hero.skins[save.skin] ?? hero.skins[0]);
    this.speed = hero.speed;
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setSize(9, 7).setOffset(3.5, 8.5);
    this.setCollideWorldBounds(true);
    this.shadow = scene.add.image(x, y + 7, 'shadow').setDepth(1);
    this.setDepth(10);
  }

  get invulnerable(): boolean {
    return this.scene.time.now < this.invulnerableUntil;
  }

  move(vx: number, vy: number, dt: number) {
    const len = Math.hypot(vx, vy);
    if (len > 0.1) {
      const s = this.speed / Math.max(1, len);
      this.setVelocity(vx * s, vy * s);
      if (vx < -0.1) this.setFlipX(true);
      else if (vx > 0.1) this.setFlipX(false);
      this.walkTime += dt;
      this.setAngle(Math.sin(this.walkTime / 70) * 7);
    } else {
      this.setVelocity(0, 0);
      this.setAngle(0);
    }
  }

  halt() {
    this.setVelocity(0, 0);
    this.setAngle(0);
  }

  hurt(fromX: number, fromY: number) {
    this.invulnerableUntil = this.scene.time.now + 1600;
    const a = Math.atan2(this.y - fromY, this.x - fromX);
    this.scene.tweens.add({ targets: this, x: this.x + Math.cos(a) * 14, y: this.y + Math.sin(a) * 14, duration: 140 });
    this.scene.tweens.add({ targets: this, alpha: 0.25, yoyo: true, repeat: 7, duration: 100, onComplete: () => this.setAlpha(1) });
    this.setTint(0xff6680);
    this.scene.time.delayedCall(250, () => this.clearTint());
  }

  preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    this.shadow.setPosition(this.x, this.y + 7);
    this.setDepth(10 + this.y / 1000);
  }

  destroy(fromScene?: boolean) {
    this.shadow.destroy();
    super.destroy(fromScene);
  }
}
