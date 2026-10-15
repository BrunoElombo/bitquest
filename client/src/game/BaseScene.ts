import Phaser from 'phaser';
import {
  isTimed,
  pickChallenge,
  timeLimitMs,
  type EncounterResponse,
  type EncounterType,
  type LandId,
  type SceneId,
} from '@shared/game';
import type { L, Tier } from '@shared/types';
import { api } from '../api';
import { music, type Scene as MusicScene } from '../audio/music';
import { tl } from '../i18n';
import { useGame, type PauseView } from '../store';
import { exitGame, ui } from './bridge';
import { consumeAct, consumeMenu, virtualInput } from './controls';
import { buildMap, type BuiltMap, type MapDraft } from './mapBuilder';
import { Player } from './Player';

export interface Interactable {
  x: number;
  y: number;
  radius?: number;
  onAct: () => Promise<void> | void;
}

export interface Trigger {
  rect: Phaser.Geom.Rectangle;
  onEnter: () => Promise<void> | void;
  inside?: boolean;
}

interface InputState {
  vx: number;
  vy: number;
  act: boolean;
  /** Pause menu requested, and on which view. */
  menu: PauseView | null;
}

export const FONT = { fontFamily: '"Press Start 2P", monospace', fontSize: '8px' };

/** Movement, interaction, overlays and autosave shared by every playable scene. */
export abstract class BaseScene extends Phaser.Scene {
  player!: Player;
  built!: BuiltMap;
  busy = false;
  interactables: Interactable[] = [];
  triggers: Trigger[] = [];
  protected abstract sceneId: SceneId;
  protected land: LandId | undefined;
  private keys!: Record<string, Phaser.Input.Keyboard.Key>;
  private padPrev: boolean[] = [];
  private prompt!: Phaser.GameObjects.Image;
  private lastSave = { x: 0, y: 0, t: 0 };
  private recent: string[] = [];

  get save() {
    return useGame.getState().save!;
  }

  /** Common setup: map, player, camera, controls. Call from create(). */
  protected setupWorld(draft: MapDraft, spawn: { x: number; y: number }, music_: { scene: MusicScene; intensity: number }) {
    this.busy = false;
    this.interactables = [];
    this.triggers = [];
    this.built = buildMap(this, draft);
    this.physics.world.setBounds(0, 0, this.built.width, this.built.height);

    this.player = new Player(this, spawn.x, spawn.y, this.save);
    this.physics.add.collider(this.player, this.built.deco);
    this.physics.add.collider(this.player, this.built.ground);

    const cam = this.cameras.main;
    cam.setBounds(0, 0, this.built.width, this.built.height);
    cam.startFollow(this.player, true, 0.12, 0.12);
    cam.setRoundPixels(true);
    cam.fadeIn(350, 0, 0, 0);

    this.prompt = this.add.image(0, 0, 'prompt').setDepth(50).setVisible(false);

    this.setupControls();
    music.setScene(music_.scene, music_.intensity);
    this.lastSave = { x: spawn.x, y: spawn.y, t: this.time.now };
    this.events.once('shutdown', () => useGame.setState({ boss: null }));
  }

  protected setupControls() {
    const kb = this.input.keyboard!;
    this.keys = kb.addKeys('UP,DOWN,LEFT,RIGHT,W,A,S,D,Z,Q,SPACE,ENTER,E,ESC,P,H') as Record<string, Phaser.Input.Keyboard.Key>;
  }

  private padButton(i: number): boolean {
    const pad = this.input.gamepad?.pad1;
    const now = !!pad?.buttons[i]?.pressed;
    const was = this.padPrev[i] ?? false;
    this.padPrev[i] = now;
    return now && !was;
  }

  protected readInput(): InputState {
    const k = this.keys;
    let vx = 0;
    let vy = 0;
    // Arrows, WASD (QWERTY) and ZQSD (AZERTY).
    if (k.LEFT.isDown || k.A.isDown || k.Q.isDown) vx -= 1;
    if (k.RIGHT.isDown || k.D.isDown) vx += 1;
    if (k.UP.isDown || k.W.isDown || k.Z.isDown) vy -= 1;
    if (k.DOWN.isDown || k.S.isDown) vy += 1;

    const pad = this.input.gamepad?.pad1;
    if (pad) {
      const sx = pad.leftStick.x;
      const sy = pad.leftStick.y;
      if (Math.hypot(sx, sy) > 0.25) {
        vx += sx;
        vy += sy;
      }
      if (pad.left) vx -= 1;
      if (pad.right) vx += 1;
      if (pad.up) vy -= 1;
      if (pad.down) vy += 1;
    }

    // On-screen touch pad and buttons
    vx += virtualInput.vx;
    vy += virtualInput.vy;

    const JD = Phaser.Input.Keyboard.JustDown;
    const act = JD(k.SPACE) || JD(k.ENTER) || JD(k.E) || this.padButton(0) || consumeAct();
    let menu = consumeMenu();
    if (JD(k.ESC) || JD(k.P) || this.padButton(9)) menu = 'main';
    else if (JD(k.H)) menu = 'controls';
    return { vx: Phaser.Math.Clamp(vx, -1, 1), vy: Phaser.Math.Clamp(vy, -1, 1), act, menu };
  }

  /** Freezes the world while React shows an overlay (dialogue, challenge, menu). */
  async withUI<T>(fn: () => Promise<T>): Promise<T> {
    this.busy = true;
    this.player?.halt();
    this.prompt?.setVisible(false);
    this.physics.world.pause();
    const kb = this.input.keyboard!;
    kb.enabled = false;
    kb.manager.enabled = false;
    try {
      return await fn();
    } finally {
      kb.manager.enabled = true;
      kb.enabled = true;
      kb.resetKeys();
      const pad = this.input.gamepad?.pad1;
      this.padPrev = pad ? pad.buttons.map((b) => b.pressed) : [];
      if (this.scene.isActive()) {
        this.physics.world.resume();
        this.busy = false;
      }
    }
  }

  say(lines: Parameters<typeof ui.say>[0]) {
    return this.withUI(() => ui.say(lines));
  }

  update(time: number, delta: number) {
    if (this.busy || !this.player?.active) {
      // A button tapped while an overlay was open must not fire once it closes.
      virtualInput.act = false;
      virtualInput.menu = null;
      return;
    }
    const input = this.readInput();
    if (input.menu) {
      void this.openPause(input.menu);
      return;
    }
    this.player.move(input.vx, input.vy, delta);
    this.tick(time, delta);

    for (const t of this.triggers) {
      const inside = t.rect.contains(this.player.x, this.player.y);
      if (inside && !t.inside) {
        t.inside = true;
        void t.onEnter();
        if (this.busy) return;
      } else if (!inside) t.inside = false;
    }

    let nearest: Interactable | null = null;
    let best = Infinity;
    for (const it of this.interactables) {
      const d = Phaser.Math.Distance.Between(this.player.x, this.player.y, it.x, it.y);
      if (d < (it.radius ?? 20) && d < best) {
        best = d;
        nearest = it;
      }
    }
    this.prompt.setVisible(!!nearest);
    if (nearest) {
      this.prompt.setPosition(nearest.x, nearest.y - 15 + Math.sin(time / 150) * 1.5);
      if (input.act) void nearest.onAct();
    }

    if (time - this.lastSave.t > 8000) {
      this.lastSave.t = time;
      if (Phaser.Math.Distance.Between(this.lastSave.x, this.lastSave.y, this.player.x, this.player.y) > 16) {
        this.lastSave.x = this.player.x;
        this.lastSave.y = this.player.y;
        void this.savePosition();
      }
    }
  }

  /** Per-scene logic every frame (monsters, boss…). */
  protected tick(_time: number, _delta: number) {}

  savePosition() {
    return api
      .progress({ location: { scene: this.sceneId, land: this.land, x: Math.round(this.player.x), y: Math.round(this.player.y) } })
      .then((r) => useGame.getState().setSave(r.save))
      .catch(() => {});
  }

  async openPause(view: PauseView = 'main') {
    music.sfx('click');
    const inLand = (this.sceneId === 'land' || this.sceneId === 'boss') && !!this.land;
    const action = await this.withUI(() => ui.pause({ canRestart: inLand, canLeave: inLand, view }));
    switch (action) {
      case 'quit':
        this.busy = true;
        await this.savePosition();
        exitGame.handler();
        break;
      case 'checkpoint':
        this.go('land', { land: this.land, at: 'checkpoint' });
        break;
      case 'world':
        await api.progress({ location: { scene: 'world', x: -1, y: -1 } }).then((r) => useGame.getState().setSave(r.save)).catch(() => {});
        this.go('world', { from: this.land });
        break;
    }
  }

  go(key: string, data?: object) {
    this.busy = true;
    this.player?.halt();
    this.cameras.main.fadeOut(280, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => this.scene.start(key, data));
  }

  floatText(x: number, y: number, text: string, color = '#ffe14d') {
    const t = this.add
      .text(x, y, text, { ...FONT, color, stroke: '#000000', strokeThickness: 3 })
      .setOrigin(0.5)
      .setDepth(200);
    this.tweens.add({ targets: t, y: y - 22, alpha: 0, duration: 1300, ease: 'Cubic.easeOut', onComplete: () => t.destroy() });
  }

  label(x: number, y: number, text: string, color = '#ffffff') {
    return this.add
      .text(x, y, text, { ...FONT, color, stroke: '#14142b', strokeThickness: 3, align: 'center' })
      .setOrigin(0.5, 1)
      .setDepth(60);
  }

  addNpc(x: number, y: number, frame: number, onTalk: () => Promise<void>) {
    const npc = this.physics.add.staticSprite(x, y, 'dungeon', frame);
    npc.setSize(10, 8).setOffset(3, 8);
    npc.refreshBody();
    npc.setDepth(10 + y / 1000);
    this.add.image(x, y + 7, 'shadow').setDepth(1);
    this.tweens.add({ targets: npc, scaleY: 1.06, yoyo: true, repeat: -1, duration: 900 + Math.random() * 400 });
    this.physics.add.collider(this.player, npc);
    this.interactables.push({ x, y, onAct: onTalk });
    return npc;
  }

  /**
   * Runs one learning challenge through the overlay. The server decides the outcome
   * (points, hearts, Game Over); this method only shows the consequences in the world.
   */
  async challenge(
    type: EncounterType,
    targetId: string,
    opts: { title: L; portrait?: number; maxTier: Tier; preferTier?: Tier },
  ): Promise<EncounterResponse | null> {
    const land = this.land!;
    const state = useGame.getState();
    const c = pickChallenge({
      land,
      type,
      maxTier: opts.maxTier,
      preferTier: opts.preferTier,
      solved: new Set(state.solved),
      recent: this.recent,
    });
    if (!c) return null;
    this.recent = [c.id, ...this.recent].slice(0, 10);
    music.setIntensity(type === 'shrine' || type === 'chest' ? 0.2 : 0.7);

    const r = await this.withUI(() =>
      ui.encounter({
        land,
        type,
        targetId,
        challenge: c,
        title: opts.title,
        portrait: opts.portrait,
        timeLimitMs: isTimed(type) ? timeLimitMs(type, this.save.hero) : null,
        hintAllowed: type === 'shrine' || type === 'chest',
      }),
    );
    this.restoreMusic();
    useGame.getState().setSave(r.save);
    if (r.correct) useGame.getState().markSolved(c.id);

    if (r.pointsDelta) {
      this.floatText(this.player.x, this.player.y - 12, `${r.pointsDelta > 0 ? '+' : ''}${r.pointsDelta}`, r.pointsDelta > 0 ? '#ffe14d' : '#ff4d6a');
    }
    if (r.events.includes('extraLife')) {
      music.sfx('levelUp');
      ui.toast('❤', tl({ en: 'Extra heart!', fr: 'Cœur bonus !' }));
    }
    if (r.gameOver) {
      music.sfx('defeat');
      const info = r.gameOver;
      await this.withUI(() => ui.gameOver(info));
      this.go('land', { land, at: 'checkpoint' });
    }
    return r;
  }

  /** Puts the land/scene music back after a challenge changed its intensity. */
  protected restoreMusic() {}

  protected setPlace(label: L, land: LandId | null) {
    useGame.setState({ place: { label, land } });
  }
}
