// Procedural, adaptive game music built on the Web Audio API — no audio files.
//
// A lookahead scheduler plays a 4-bar chord progression one 16th note at a time. The current
// "scene" picks a palette (key, tempo range, instruments) and a continuous `intensity` (0..1)
// decides tempo, filter brightness and which layers play: calm pads at low intensity for
// concentration, then arpeggios, bass, drums and finally a lead line as the action heats up.

export type Scene = 'menu' | 'puzzle' | 'enigma' | 'battle' | 'focus' | 'review' | 'silent';
export type Sfx =
  | 'click'
  | 'correct'
  | 'wrong'
  | 'hit'
  | 'crit'
  | 'hurt'
  | 'levelUp'
  | 'coin'
  | 'victory'
  | 'defeat'
  | 'tick'
  | 'chime'
  | 'start';

type Quality = 'min' | 'maj' | 'min7' | 'maj7' | 'dom7';

interface Palette {
  bpm: [number, number];
  /** Chord roots as MIDI notes (around octave 2-3), one chord per bar. */
  chords: { root: number; q: Quality }[];
  /** Root of the lead scale (MIDI) and its intervals. */
  leadRoot: number;
  leadScale: number[];
  padWave: OscillatorType;
  arpWave: OscillatorType;
  bassWave: OscillatorType;
  /** Intensity at which each layer joins in (> 1 = never). */
  layers: { arp: number; bass: number; kick: number; hat: number; snare: number; lead: number };
  /** 16th steps per arpeggio note. */
  arpEvery: 1 | 2 | 4;
  swing: number;
  /** Soft noise bed ("rain") level, for focus music. */
  noiseBed: number;
  padLevel: number;
}

const INTERVALS: Record<Quality, number[]> = {
  min: [0, 3, 7],
  maj: [0, 4, 7],
  min7: [0, 3, 7, 10],
  maj7: [0, 4, 7, 11],
  dom7: [0, 4, 7, 10],
};

const MINOR_PENTA = [0, 3, 5, 7, 10];
const MAJOR_PENTA = [0, 2, 4, 7, 9];

const PALETTES: Record<Exclude<Scene, 'silent'>, Palette> = {
  menu: {
    bpm: [88, 100],
    chords: [
      { root: 45, q: 'min7' },
      { root: 41, q: 'maj7' },
      { root: 48, q: 'maj7' },
      { root: 43, q: 'dom7' },
    ],
    leadRoot: 69,
    leadScale: MINOR_PENTA,
    padWave: 'sawtooth',
    arpWave: 'square',
    bassWave: 'triangle',
    layers: { arp: 0.1, bass: 0.3, kick: 0.45, hat: 0.4, snare: 0.6, lead: 0.85 },
    arpEvery: 2,
    swing: 0.08,
    noiseBed: 0,
    padLevel: 0.05,
  },
  puzzle: {
    bpm: [84, 118],
    chords: [
      { root: 40, q: 'min7' },
      { root: 48, q: 'maj7' },
      { root: 43, q: 'maj' },
      { root: 50, q: 'maj' },
    ],
    leadRoot: 64,
    leadScale: MINOR_PENTA,
    padWave: 'triangle',
    arpWave: 'square',
    bassWave: 'triangle',
    layers: { arp: 0.15, bass: 0.3, kick: 0.45, hat: 0.38, snare: 0.6, lead: 0.8 },
    arpEvery: 2,
    swing: 0.1,
    noiseBed: 0,
    padLevel: 0.06,
  },
  enigma: {
    bpm: [68, 84],
    chords: [
      { root: 50, q: 'min' },
      { root: 46, q: 'maj7' },
      { root: 43, q: 'min7' },
      { root: 45, q: 'dom7' },
    ],
    leadRoot: 62,
    leadScale: [0, 2, 3, 7, 8],
    padWave: 'sine',
    arpWave: 'triangle',
    bassWave: 'sine',
    layers: { arp: 0.05, bass: 0.35, kick: 0.7, hat: 0.55, snare: 2, lead: 0.6 },
    arpEvery: 2,
    swing: 0,
    noiseBed: 0.006,
    padLevel: 0.07,
  },
  battle: {
    bpm: [120, 152],
    chords: [
      { root: 48, q: 'min' },
      { root: 44, q: 'maj' },
      { root: 46, q: 'maj' },
      { root: 43, q: 'maj' },
    ],
    leadRoot: 72,
    leadScale: MINOR_PENTA,
    padWave: 'sawtooth',
    arpWave: 'square',
    bassWave: 'sawtooth',
    layers: { arp: 0.2, bass: 0.1, kick: 0.2, hat: 0.35, snare: 0.45, lead: 0.72 },
    arpEvery: 1,
    swing: 0,
    noiseBed: 0,
    padLevel: 0.035,
  },
  focus: {
    bpm: [62, 70],
    chords: [
      { root: 50, q: 'maj7' },
      { root: 47, q: 'min7' },
      { root: 43, q: 'maj7' },
      { root: 45, q: 'dom7' },
    ],
    leadRoot: 74,
    leadScale: MAJOR_PENTA,
    padWave: 'triangle',
    arpWave: 'sine',
    bassWave: 'sine',
    layers: { arp: 0, bass: 0.15, kick: 0.25, hat: 0.3, snare: 2, lead: 0.5 },
    arpEvery: 4,
    swing: 0.15,
    noiseBed: 0.012,
    padLevel: 0.07,
  },
  review: {
    bpm: [70, 78],
    chords: [
      { root: 48, q: 'maj7' },
      { root: 45, q: 'min7' },
      { root: 41, q: 'maj7' },
      { root: 43, q: 'dom7' },
    ],
    leadRoot: 72,
    leadScale: MAJOR_PENTA,
    padWave: 'triangle',
    arpWave: 'sine',
    bassWave: 'sine',
    layers: { arp: 0, bass: 0.2, kick: 0.35, hat: 0.35, snare: 2, lead: 0.6 },
    arpEvery: 2,
    swing: 0.12,
    noiseBed: 0.008,
    padLevel: 0.065,
  },
};

const midiToFreq = (n: number) => 440 * Math.pow(2, (n - 69) / 12);

class MusicEngine {
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private musicBus!: GainNode;
  private sfxBus!: GainNode;
  private padFilter!: BiquadFilterNode;
  private delaySend!: GainNode;
  private noiseBuffer!: AudioBuffer;
  private noiseBedGain!: GainNode;

  private scene: Scene = 'menu';
  private palette: Palette = PALETTES.menu;
  private pendingPalette: Palette | null = null;
  private focusOverride = false;
  private target = 0.25;
  private intensity = 0.25;
  private step = 0;
  private nextTime = 0;
  private timer: number | null = null;
  private leadIndex = 2;
  private musicVolume = 0.5;
  private sfxVolume = 0.7;
  private muted = false;

  get started(): boolean {
    return this.ctx !== null && this.ctx.state === 'running';
  }

  /** Must be called from a user gesture (browser autoplay policy). Safe to call repeatedly. */
  unlock(): void {
    if (!this.ctx) this.init();
    if (this.ctx!.state === 'suspended') void this.ctx!.resume();
    if (this.timer === null) {
      this.nextTime = this.ctx!.currentTime + 0.1;
      this.timer = window.setInterval(() => this.schedule(), 25);
    }
  }

  setVolumes(musicVolume: number, sfxVolume: number): void {
    this.musicVolume = musicVolume;
    this.sfxVolume = sfxVolume;
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.musicBus.gain.setTargetAtTime(this.scene === 'silent' ? 0 : musicVolume * 0.6, t, 0.1);
    this.sfxBus.gain.setTargetAtTime(sfxVolume * 0.8, t, 0.05);
  }

  /** Silences music and sound effects at once, keeping the volume settings. */
  setMuted(muted: boolean): void {
    this.muted = muted;
    if (this.ctx) this.master.gain.setTargetAtTime(muted ? 0 : 0.9, this.ctx.currentTime, 0.05);
  }

  setScene(scene: Scene, intensity?: number): void {
    if (intensity !== undefined) this.setIntensity(intensity);
    if (scene === this.scene) return;
    this.scene = scene;
    this.applyPalette();
    this.setVolumes(this.musicVolume, this.sfxVolume);
  }

  /** While the focus timer runs, calm music replaces menu/puzzle music (battles stay epic). */
  setFocusOverride(on: boolean): void {
    this.focusOverride = on;
    this.applyPalette();
  }

  setIntensity(x: number): void {
    this.target = Math.min(1, Math.max(0, x));
  }

  private applyPalette() {
    if (this.scene === 'silent') return;
    const p = this.focusOverride && this.scene !== 'battle' ? PALETTES.focus : PALETTES[this.scene];
    if (p !== this.palette) this.pendingPalette = p;
  }

  private init() {
    const ctx = new AudioContext();
    this.ctx = ctx;

    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14;
    comp.ratio.value = 4;
    this.master = ctx.createGain();
    this.master.gain.value = this.muted ? 0 : 0.9;
    comp.connect(this.master).connect(ctx.destination);

    this.musicBus = ctx.createGain();
    this.musicBus.gain.value = this.musicVolume * 0.6;
    this.musicBus.connect(comp);

    this.sfxBus = ctx.createGain();
    this.sfxBus.gain.value = this.sfxVolume * 0.8;
    this.sfxBus.connect(comp);

    this.padFilter = ctx.createBiquadFilter();
    this.padFilter.type = 'lowpass';
    this.padFilter.frequency.value = 900;
    this.padFilter.Q.value = 0.7;
    this.padFilter.connect(this.musicBus);

    // Simple echo for arps and lead.
    const delay = ctx.createDelay(1);
    delay.delayTime.value = 0.33;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.28;
    const wet = ctx.createGain();
    wet.gain.value = 0.22;
    this.delaySend = ctx.createGain();
    this.delaySend.connect(delay);
    delay.connect(feedback).connect(delay);
    delay.connect(wet).connect(this.musicBus);

    const len = ctx.sampleRate;
    this.noiseBuffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = this.noiseBuffer.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;

    // Brown-ish noise bed for focus palettes ("rain on the window").
    const brown = ctx.createBuffer(1, len * 2, ctx.sampleRate);
    const b = brown.getChannelData(0);
    let last = 0;
    for (let i = 0; i < b.length; i++) {
      last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02;
      b[i] = last * 3.5;
    }
    const bed = ctx.createBufferSource();
    bed.buffer = brown;
    bed.loop = true;
    const bedFilter = ctx.createBiquadFilter();
    bedFilter.type = 'lowpass';
    bedFilter.frequency.value = 1200;
    this.noiseBedGain = ctx.createGain();
    this.noiseBedGain.gain.value = 0;
    bed.connect(bedFilter).connect(this.noiseBedGain).connect(this.musicBus);
    bed.start();
  }

  // ---------------------------------------------------------------- scheduler

  private sixteenth(): number {
    const [lo, hi] = this.palette.bpm;
    const bpm = lo + (hi - lo) * this.intensity;
    return 60 / bpm / 4;
  }

  private schedule() {
    const ctx = this.ctx!;
    while (this.nextTime < ctx.currentTime + 0.12) {
      this.playStep(this.step, this.nextTime);
      this.nextTime += this.sixteenth();
      this.step++;
    }
  }

  private playStep(step: number, time: number) {
    // Ease towards the requested intensity so changes feel musical, not abrupt.
    this.intensity += (this.target - this.intensity) * 0.06;
    const inBar = step % 16;

    if (inBar === 0 && this.pendingPalette) {
      this.palette = this.pendingPalette;
      this.pendingPalette = null;
    }
    if (this.scene === 'silent') return;

    const p = this.palette;
    const x = this.intensity;
    const s16 = this.sixteenth();
    const bar = Math.floor(step / 16) % p.chords.length;
    const chord = p.chords[bar];
    const tones = INTERVALS[chord.q].map((i) => chord.root + i);
    const t = time + (inBar % 2 === 1 ? p.swing * s16 : 0);

    if (inBar === 0) {
      this.padFilter.frequency.setTargetAtTime(500 + x * 2600, time, 0.4);
      this.noiseBedGain.gain.setTargetAtTime(p.noiseBed, time, 1);
      this.pad(tones.map((n) => n + 12), time, s16 * 16);
    }

    if (x >= p.layers.arp && inBar % p.arpEvery === 0) {
      const sparse = p.arpEvery === 4 ? Math.random() < 0.35 : false;
      if (!sparse) {
        const seq = [...tones, ...tones.slice(1, -1).reverse()];
        const n = seq[(inBar / p.arpEvery) % seq.length] + 24;
        this.pluck(n, t, s16 * p.arpEvery * 0.9, p.arpWave, 0.05 + x * 0.03);
      }
    }

    if (x >= p.layers.bass) {
      const pattern = x > 0.75 ? [0, 2, 4, 6, 8, 10, 12, 14] : x > 0.5 ? [0, 6, 8, 14] : [0, 8];
      if (pattern.includes(inBar)) this.bass(chord.root - 12 + (chord.root < 44 ? 12 : 0), t, s16 * 1.8, p.bassWave);
    }

    if (x >= p.layers.kick) {
      const four = x > 0.6 ? [0, 4, 8, 12] : p === PALETTES.focus || p === PALETTES.review ? [0, 10] : [0, 8];
      if (four.includes(inBar)) this.kick(time, p === PALETTES.focus ? 0.45 : 0.8);
    }
    if (x >= p.layers.snare && (inBar === 4 || inBar === 12)) this.snare(time);
    if (x >= p.layers.hat) {
      const every = x > 0.8 ? 1 : 2;
      if (inBar % every === 0 && (every === 1 || inBar % 4 === 2 || x > 0.55)) {
        this.hat(t, inBar % 4 === 2 ? 0.07 : 0.035);
      }
    }

    if (x >= p.layers.lead && inBar % 2 === 0 && Math.random() < 0.55) {
      this.leadIndex = Math.max(0, Math.min(9, this.leadIndex + Math.floor(Math.random() * 5) - 2));
      const octave = Math.floor(this.leadIndex / p.leadScale.length);
      const n = p.leadRoot + p.leadScale[this.leadIndex % p.leadScale.length] + 12 * octave - 12;
      this.pluck(n, t, s16 * 1.8, p === PALETTES.battle ? 'square' : 'triangle', 0.045, true);
    }
  }

  // ---------------------------------------------------------------- instruments

  private pad(notes: number[], time: number, dur: number) {
    const ctx = this.ctx!;
    const level = this.palette.padLevel;
    for (const n of notes) {
      for (const detune of [-7, 7]) {
        const osc = ctx.createOscillator();
        osc.type = this.palette.padWave;
        osc.frequency.value = midiToFreq(n);
        osc.detune.value = detune;
        const g = ctx.createGain();
        g.gain.setValueAtTime(0, time);
        g.gain.linearRampToValueAtTime(level / notes.length, time + Math.min(0.6, dur * 0.3));
        g.gain.setValueAtTime(level / notes.length, time + dur * 0.8);
        g.gain.linearRampToValueAtTime(0, time + dur + 0.1);
        osc.connect(g).connect(this.padFilter);
        osc.start(time);
        osc.stop(time + dur + 0.15);
      }
    }
  }

  private pluck(n: number, time: number, dur: number, wave: OscillatorType, level: number, echo = true) {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    osc.type = wave;
    osc.frequency.value = midiToFreq(n);
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1500 + this.intensity * 3500;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, time);
    g.gain.exponentialRampToValueAtTime(level, time + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, time + Math.max(0.08, dur));
    osc.connect(filter).connect(g).connect(this.musicBus);
    if (echo) g.connect(this.delaySend);
    osc.start(time);
    osc.stop(time + dur + 0.05);
  }

  private bass(n: number, time: number, dur: number, wave: OscillatorType) {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    osc.type = wave;
    osc.frequency.value = midiToFreq(n);
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 300 + this.intensity * 700;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, time);
    g.gain.exponentialRampToValueAtTime(0.16, time + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
    osc.connect(filter).connect(g).connect(this.musicBus);
    osc.start(time);
    osc.stop(time + dur + 0.05);
  }

  private kick(time: number, level: number) {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(40, time + 0.12);
    const g = ctx.createGain();
    g.gain.setValueAtTime(level * 0.5, time);
    g.gain.exponentialRampToValueAtTime(0.0001, time + 0.25);
    osc.connect(g).connect(this.musicBus);
    osc.start(time);
    osc.stop(time + 0.3);
  }

  private noise(time: number, dur: number, type: BiquadFilterType, freq: number, level: number, bus: AudioNode) {
    const ctx = this.ctx!;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const filter = ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(level, time);
    g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
    src.connect(filter).connect(g).connect(bus);
    src.start(time, Math.random() * 0.5);
    src.stop(time + dur + 0.02);
  }

  private snare(time: number) {
    this.noise(time, 0.16, 'highpass', 1200, 0.16, this.musicBus);
    this.tone(190, time, 0.08, 'triangle', 0.08, this.musicBus);
  }

  private hat(time: number, level: number) {
    this.noise(time, 0.04, 'highpass', 7500, level, this.musicBus);
  }

  private tone(freq: number, time: number, dur: number, wave: OscillatorType, level: number, bus: AudioNode, slideTo?: number) {
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    osc.type = wave;
    osc.frequency.setValueAtTime(freq, time);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, time + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, time);
    g.gain.exponentialRampToValueAtTime(level, time + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
    osc.connect(g).connect(bus);
    osc.start(time);
    osc.stop(time + dur + 0.02);
  }

  // ---------------------------------------------------------------- sound effects

  sfx(name: Sfx): void {
    if (!this.ctx) return;
    const t = this.ctx.currentTime + 0.01;
    const bus = this.sfxBus;
    const seq = (notes: number[], gap: number, dur: number, wave: OscillatorType, level: number) =>
      notes.forEach((n, i) => this.tone(midiToFreq(n), t + i * gap, dur, wave, level, bus));

    switch (name) {
      case 'click':
        this.tone(1200, t, 0.03, 'square', 0.05, bus);
        break;
      case 'start':
        seq([60, 64, 67, 72, 76, 79, 84], 0.05, 0.12, 'square', 0.12);
        break;
      case 'correct':
        seq([76, 83], 0.07, 0.14, 'square', 0.14);
        break;
      case 'wrong':
        this.tone(220, t, 0.3, 'sawtooth', 0.12, bus, 90);
        break;
      case 'hit':
        this.noise(t, 0.12, 'lowpass', 2500, 0.35, bus);
        this.tone(160, t, 0.12, 'square', 0.15, bus, 60);
        break;
      case 'crit':
        this.noise(t, 0.2, 'bandpass', 3000, 0.4, bus);
        seq([84, 91, 96], 0.04, 0.1, 'square', 0.12);
        break;
      case 'hurt':
        this.noise(t, 0.25, 'lowpass', 600, 0.5, bus);
        this.tone(110, t, 0.25, 'sawtooth', 0.15, bus, 50);
        break;
      case 'coin':
        this.tone(midiToFreq(83), t, 0.08, 'square', 0.12, bus);
        this.tone(midiToFreq(88), t + 0.08, 0.3, 'square', 0.12, bus);
        break;
      case 'levelUp':
        seq([60, 64, 67, 72, 67, 72, 76, 79, 84], 0.07, 0.15, 'square', 0.13);
        break;
      case 'victory':
        seq([67, 67, 67, 72, 76, 79, 84], 0.11, 0.22, 'square', 0.14);
        seq([55, 55, 55, 60, 64, 67, 72], 0.11, 0.22, 'triangle', 0.12);
        break;
      case 'defeat':
        seq([67, 66, 65, 64, 60, 55], 0.16, 0.3, 'triangle', 0.14);
        break;
      case 'tick':
        this.tone(1800, t, 0.03, 'square', 0.06, bus);
        break;
      case 'chime':
        seq([79, 84, 88, 91], 0.15, 0.8, 'sine', 0.12);
        break;
    }
  }
}

export const music = new MusicEngine();
