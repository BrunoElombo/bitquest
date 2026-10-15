// Frame catalogue for the Kenney CC0 sheets (16×16 tiles, 12 columns, no spacing) and the
// tiles/sprites BitQuest generates itself at boot.

export const TILE = 16;

/** First global tile id of each tileset in a tilemap. */
export const GID = { town: 1, dungeon: 133, extra: 265 } as const;

/** Tiny Town frames. */
export const TOWN = {
  grass: 0,
  grassTuft: 1,
  flowers: 2,
  treeOrange: 3,
  treeGreen: 4,
  bush: 5,
  sprout: 17,
  treeGreenSmall: 28,
  treeOrangeSmall: 27,
  mushrooms: 29,
  path: { tl: 12, t: 13, tr: 14, l: 24, c: 25, r: 26, bl: 36, b: 37, br: 38 },
  stonePatch: 43,
  fenceH: 81,
  fenceV: 59,
  sign: 83,
  beehive: 94,
  target: 95,
  well: 104,
  logs: 106,
  barrel: 107,
  plaza: 109,
  battlement: 100,
  gate: 111,
  stoneWall: 126,
} as const;

/** Tiny Dungeon frames (characters, monsters, props). */
export const DUNGEON = {
  mage: 84,
  villagerA: 85,
  villagerB: 86,
  viking: 87,
  villagerC: 88,
  knight: 96,
  knightB: 97,
  rogue: 98,
  princess: 99,
  grandma: 100,
  slime: 108,
  cyclops: 109,
  crab: 110,
  monk: 111,
  ranger: 112,
  bat: 120,
  ghost: 121,
  spider: 122,
  rat: 123,
  chest: 89,
  chestOpen: 91,
  statueDim: 7,
  statueLit: 8,
  pedestal: 44,
  floorSand: 48,
  brick: 40,
  potion: 115,
} as const;

/** Tiles drawn by BootScene into the "extra" tileset. */
export const EXTRA = {
  water: 0,
  street: 1,
  streetLit: 2,
  planks: 3,
  lamp: 4,
  darkFloor: 5,
  waterDeep: 6,
  // Pythonia (jungle temple)
  jungleGrass: 7,
  jungleFerns: 8,
  templeStone: 9,
  templeMoss: 10,
  swamp: 11,
  // Penguin Peaks (snowy mountains, shell caves)
  snow: 12,
  snowDrift: 13,
  ice: 14,
  caveFloor: 15,
  // Props (transparent background, drawn on the deco layer)
  caveWall: 16,
  rock: 17,
  snowPine: 18,
  jungleTree: 19,
  column: 20,
  fern: 21,
  torch: 22,
  iceCrystal: 23,
  // Neuralis (AI city)
  circuit: 24,
  circuitLit: 25,
  serverRack: 26,
  neuralNode: 27,
} as const;
export const EXTRA_COUNT = 28;

/** Multi-tile buildings, as rows of Tiny Town frames. */
export const STAMPS: Record<string, number[][]> = {
  houseRed: [
    [52, 53, 54],
    [64, 65, 66],
    [84, 85, 84],
  ],
  houseGrey: [
    [48, 49, 50],
    [60, 61, 62],
    [88, 89, 88],
  ],
  arena: [
    [48, 49, 49, 49, 50],
    [60, 61, 61, 61, 62],
    [76, 77, 78, 77, 79],
  ],
  shop: [
    [52, 53, 53, 54],
    [64, 65, 65, 66],
    [72, 73, 74, 75],
  ],
};

/** Sprite offset inside the 192×176 sheet, for CSS portraits. */
export function frameXY(frame: number): { x: number; y: number } {
  return { x: (frame % 12) * TILE, y: Math.floor(frame / 12) * TILE };
}
