import Phaser from 'phaser';
import { EXTRA, GID, STAMPS, TILE, TOWN } from './assets';

// Maps are drafted in code on two grids — ground and decoration — plus a list of markers
// (spawn points, NPCs, shrines…). buildMap() turns a draft into a Phaser tilemap with collisions.

/** Ground: '.' grass  ',' flowers  '=' dirt path (auto-tiled)  '~' water  '#' neon street  '*' lit street
 *  '_' dock planks  ':' plaza stone  'd' dark floor  'j' jungle grass  'o' temple stone  'g' swamp water
 *  's' snow  'i' ice  'c' cave floor  'u' circuit board  'v' glowing circuit */
export type GroundCh = '.' | ',' | '=' | '~' | '#' | '*' | '_' | ':' | 'd' | 'j' | 'o' | 'g' | 's' | 'i' | 'c' | 'u' | 'v';

/** Open ground where props may be scattered and that dirt paths blend into. */
const NATURAL = new Set<GroundCh>(['.', ',', 'j', 's']);

/** Ground tiles nobody can walk on. */
const SOLID_GROUND = [GID.extra + EXTRA.water, GID.extra + EXTRA.waterDeep, GID.extra + EXTRA.swamp];

/** Decoration: one char per prop, or a raw gid for building stamps. */
export const DECO: Record<string, { gid: number; solid: boolean }> = {
  T: { gid: GID.town + TOWN.treeGreen, solid: true },
  Y: { gid: GID.town + TOWN.treeOrange, solid: true },
  t: { gid: GID.town + TOWN.treeGreenSmall, solid: true },
  y: { gid: GID.town + TOWN.treeOrangeSmall, solid: true },
  B: { gid: GID.town + TOWN.bush, solid: true },
  m: { gid: GID.town + TOWN.mushrooms, solid: false },
  p: { gid: GID.town + TOWN.sprout, solid: false },
  F: { gid: GID.town + TOWN.fenceH, solid: true },
  f: { gid: GID.town + TOWN.fenceV, solid: true },
  w: { gid: GID.town + TOWN.stoneWall, solid: true },
  W: { gid: GID.town + TOWN.battlement, solid: true },
  b: { gid: GID.town + TOWN.barrel, solid: true },
  l: { gid: GID.town + TOWN.logs, solid: true },
  h: { gid: GID.town + TOWN.beehive, solid: true },
  k: { gid: GID.town + TOWN.well, solid: true },
  n: { gid: GID.town + TOWN.sign, solid: true },
  L: { gid: GID.extra + EXTRA.lamp, solid: true },
  G: { gid: GID.town + TOWN.gate, solid: true },
  P: { gid: GID.extra + EXTRA.jungleTree, solid: true },
  e: { gid: GID.extra + EXTRA.fern, solid: false },
  C: { gid: GID.extra + EXTRA.column, solid: true },
  R: { gid: GID.extra + EXTRA.rock, solid: true },
  N: { gid: GID.extra + EXTRA.snowPine, solid: true },
  X: { gid: GID.extra + EXTRA.caveWall, solid: true },
  O: { gid: GID.extra + EXTRA.torch, solid: true },
  K: { gid: GID.extra + EXTRA.iceCrystal, solid: true },
  S: { gid: GID.extra + EXTRA.serverRack, solid: true },
  Q: { gid: GID.extra + EXTRA.neuralNode, solid: true },
};

export interface Marker {
  type: 'spawn' | 'checkpoint' | 'shrine' | 'chest' | 'npc' | 'monster' | 'exit' | 'bossGate' | 'sign' | 'gate' | 'light';
  x: number;
  y: number;
  id?: string;
  tier?: 1 | 2 | 3;
  w?: number;
  h?: number;
}

export class MapDraft {
  ground: GroundCh[][];
  deco: (string | number | null)[][];
  markers: Marker[] = [];

  constructor(
    public w: number,
    public h: number,
    fill: GroundCh = '.',
  ) {
    this.ground = Array.from({ length: h }, () => Array<GroundCh>(w).fill(fill));
    this.deco = Array.from({ length: h }, () => Array<string | number | null>(w).fill(null));
  }

  private inside(x: number, y: number) {
    return x >= 0 && y >= 0 && x < this.w && y < this.h;
  }

  fill(ch: GroundCh, x: number, y: number, w: number, h: number): this {
    for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) if (this.inside(i, j)) this.ground[j][i] = ch;
    return this;
  }

  /** Horizontal road from x1 to x2 (inclusive), `width` tiles thick starting at row y. */
  hroad(x1: number, x2: number, y: number, ch: GroundCh = '=', width = 2): this {
    return this.fill(ch, Math.min(x1, x2), y, Math.abs(x2 - x1) + 1, width);
  }

  vroad(x: number, y1: number, y2: number, ch: GroundCh = '=', width = 2): this {
    return this.fill(ch, x, Math.min(y1, y2), width, Math.abs(y2 - y1) + 1);
  }

  put(x: number, y: number, ch: string): this {
    if (this.inside(x, y)) this.deco[y][x] = ch;
    return this;
  }

  /** Rectangle outline of decoration (e.g. forest border, walls). */
  frame(ch: string, x: number, y: number, w: number, h: number, thickness = 1): this {
    for (let j = y; j < y + h; j++)
      for (let i = x; i < x + w; i++) {
        const edge = i < x + thickness || j < y + thickness || i >= x + w - thickness || j >= y + h - thickness;
        if (edge) this.put(i, j, ch);
      }
    return this;
  }

  line(ch: string, x1: number, y1: number, x2: number, y2: number): this {
    for (let j = Math.min(y1, y2); j <= Math.max(y1, y2); j++)
      for (let i = Math.min(x1, x2); i <= Math.max(x1, x2); i++) this.put(i, j, ch);
    return this;
  }

  /** Removes decoration in an area (to carve openings). */
  clear(x: number, y: number, w = 1, h = 1): this {
    for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) if (this.inside(i, j)) this.deco[j][i] = null;
    return this;
  }

  stamp(x: number, y: number, key: keyof typeof STAMPS): this {
    STAMPS[key].forEach((row, j) => row.forEach((frame, i) => this.inside(x + i, y + j) && (this.deco[y + j][x + i] = GID.town + frame)));
    return this;
  }

  mark(m: Marker): this {
    this.markers.push(m);
    return this;
  }

  private occupied(x: number, y: number): boolean {
    return this.markers.some((m) => Math.abs(m.x - x) <= 1 && Math.abs(m.y - y) <= 1);
  }

  /** Sprinkles props on free grass, keeping one free tile around each so paths stay walkable. */
  scatter(chars: string[], count: number, seed: number, area = { x: 0, y: 0, w: this.w, h: this.h }, clearance = 1): this {
    let s = seed;
    const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647);
    let placed = 0;
    for (let tries = 0; tries < count * 30 && placed < count; tries++) {
      const x = area.x + Math.floor(rand() * area.w);
      const y = area.y + Math.floor(rand() * area.h);
      if (!this.inside(x, y) || this.occupied(x, y)) continue;
      let ok = true;
      for (let j = -clearance; j <= clearance && ok; j++)
        for (let i = -clearance; i <= clearance && ok; i++) {
          if (!this.inside(x + i, y + j)) continue;
          const g = this.ground[y + j][x + i];
          if (this.deco[y + j][x + i] !== null || !NATURAL.has(g)) ok = false;
        }
      if (!ok) continue;
      this.deco[y][x] = chars[Math.floor(rand() * chars.length)];
      placed++;
    }
    return this;
  }

  /** Dense forest filling an area, leaving markers and roads free. */
  forest(x: number, y: number, w: number, h: number, chars = ['T', 'T', 't', 'Y']): this {
    for (let j = y; j < y + h; j++)
      for (let i = x; i < x + w; i++) {
        if (!this.inside(i, j) || this.deco[j][i] !== null || this.occupied(i, j)) continue;
        const g = this.ground[j][i];
        if (NATURAL.has(g)) this.deco[j][i] = chars[(i * 7 + j * 13) % chars.length];
      }
    return this;
  }
}

function hash(x: number, y: number) {
  return ((x * 73856093) ^ (y * 19349663)) >>> 0;
}

function groundGid(d: MapDraft, x: number, y: number): number {
  const g = d.ground[y][x];
  switch (g) {
    case '.': {
      const h = hash(x, y) % 10;
      return GID.town + (h < 6 ? TOWN.grass : h < 9 ? TOWN.grassTuft : TOWN.flowers);
    }
    case ',':
      return GID.town + TOWN.flowers;
    case '~':
      return GID.extra + (hash(x, y) % 3 === 0 ? EXTRA.waterDeep : EXTRA.water);
    case '#':
      return GID.extra + EXTRA.street;
    case '*':
      return GID.extra + EXTRA.streetLit;
    case '_':
      return GID.extra + EXTRA.planks;
    case ':':
      return GID.town + TOWN.plaza;
    case 'd':
      return GID.extra + EXTRA.darkFloor;
    case 'j':
      return GID.extra + (hash(x, y) % 5 === 0 ? EXTRA.jungleFerns : EXTRA.jungleGrass);
    case 'o':
      return GID.extra + (hash(x, y) % 4 === 0 ? EXTRA.templeMoss : EXTRA.templeStone);
    case 'g':
      return GID.extra + EXTRA.swamp;
    case 's':
      return GID.extra + (hash(x, y) % 4 === 0 ? EXTRA.snowDrift : EXTRA.snow);
    case 'i':
      return GID.extra + EXTRA.ice;
    case 'c':
      return GID.extra + EXTRA.caveFloor;
    case 'u':
      return GID.extra + EXTRA.circuit;
    case 'v':
      return GID.extra + EXTRA.circuitLit;
    case '=': {
      const same = (i: number, j: number) => i < 0 || j < 0 || i >= d.w || j >= d.h || !NATURAL.has(d.ground[j][i]);
      const n = same(x, y - 1);
      const s = same(x, y + 1);
      const w = same(x - 1, y);
      const e = same(x + 1, y);
      const P = TOWN.path;
      let f: number = P.c;
      if (!n && !w) f = P.tl;
      else if (!n && !e) f = P.tr;
      else if (!s && !w) f = P.bl;
      else if (!s && !e) f = P.br;
      else if (!n) f = P.t;
      else if (!s) f = P.b;
      else if (!w) f = P.l;
      else if (!e) f = P.r;
      return GID.town + f;
    }
  }
}

export interface BuiltMap {
  map: Phaser.Tilemaps.Tilemap;
  ground: Phaser.Tilemaps.TilemapLayer;
  deco: Phaser.Tilemaps.TilemapLayer;
  markers: Marker[];
  width: number;
  height: number;
}

export function buildMap(scene: Phaser.Scene, d: MapDraft): BuiltMap {
  const map = scene.make.tilemap({ tileWidth: TILE, tileHeight: TILE, width: d.w, height: d.h });
  const sets = [
    map.addTilesetImage('town', 'town', TILE, TILE, 0, 0, GID.town)!,
    map.addTilesetImage('dungeon', 'dungeon', TILE, TILE, 0, 0, GID.dungeon)!,
    map.addTilesetImage('extra', 'extra', TILE, TILE, 0, 0, GID.extra)!,
  ];
  const ground = map.createBlankLayer('ground', sets)!;
  const deco = map.createBlankLayer('deco', sets)!;
  const solid = new Set<number>();

  for (let y = 0; y < d.h; y++)
    for (let x = 0; x < d.w; x++) {
      ground.putTileAt(groundGid(d, x, y), x, y);
      const v = d.deco[y][x];
      if (v === null) continue;
      if (typeof v === 'number') {
        deco.putTileAt(v, x, y);
        solid.add(v);
      } else if (DECO[v]) {
        deco.putTileAt(DECO[v].gid, x, y);
        if (DECO[v].solid) solid.add(DECO[v].gid);
      }
    }

  ground.setCollision(SOLID_GROUND);
  deco.setCollision([...solid]);
  return { map, ground, deco, markers: d.markers, width: d.w * TILE, height: d.h * TILE };
}

/** Tile centre in pixels. */
export const at = (tx: number, ty: number) => ({ x: tx * TILE + TILE / 2, y: ty * TILE + TILE / 2 });
