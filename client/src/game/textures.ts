import Phaser from 'phaser';
import { EXTRA_COUNT, TILE } from './assets';

// Small pixel-art pieces drawn in code: tiles the Kenney packs do not have (water, neon streets,
// docks…) and effect sprites (glows, projectiles, runes, prompts).

type Ctx = CanvasRenderingContext2D;

function px(g: Ctx, x: number, y: number, w: number, h: number, color: string) {
  g.fillStyle = color;
  g.fillRect(x, y, w, h);
}

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function drawExtraTile(g: Ctx, i: number, ox: number) {
  const r = seeded(i * 97 + 13);
  switch (i) {
    case 0: // water
    case 6: {
      px(g, ox, 0, TILE, TILE, i === 0 ? '#2f6fd6' : '#2558b0');
      for (let k = 0; k < 5; k++) {
        const x = Math.floor(r() * 12);
        const y = Math.floor(r() * 15);
        px(g, ox + x, y, 4, 1, '#5d97ef');
      }
      break;
    }
    case 1: // neon street cobbles
    case 2: {
      px(g, ox, 0, TILE, TILE, '#2a2346');
      for (let y = 0; y < 16; y += 4) {
        const shift = (y / 4) % 2 ? 4 : 0;
        for (let x = -4; x < 16; x += 8) {
          px(g, ox + Math.max(0, x + shift) + 1, y + 1, 6, 2, '#3a3166');
        }
      }
      if (i === 2) {
        px(g, ox + 7, 0, 2, 16, '#ffd84a');
      }
      break;
    }
    case 3: // dock planks
      px(g, ox, 0, TILE, TILE, '#9a6631');
      for (let y = 3; y < 16; y += 4) px(g, ox, y, TILE, 1, '#6b4320');
      px(g, ox + 3, 1, 1, 1, '#4a2e15');
      px(g, ox + 11, 9, 1, 1, '#4a2e15');
      break;
    case 4: // street lamp (transparent background)
      px(g, ox + 7, 5, 2, 10, '#3b3b4f');
      px(g, ox + 5, 14, 6, 2, '#3b3b4f');
      px(g, ox + 5, 1, 6, 4, '#ffe680');
      px(g, ox + 6, 2, 4, 2, '#fffbe0');
      px(g, ox + 4, 0, 8, 1, '#3b3b4f');
      break;
    case 5: // dark arena floor
      px(g, ox, 0, TILE, TILE, '#1d1a2c');
      px(g, ox, 0, TILE, 1, '#2a2640');
      px(g, ox, 0, 1, TILE, '#2a2640');
      if (r() > 0.6) px(g, ox + 6, 7, 3, 2, '#25213a');
      break;
    case 7: // jungle grass
    case 8: {
      px(g, ox, 0, TILE, TILE, '#3f8f3a');
      for (let k = 0; k < 7; k++) px(g, ox + Math.floor(r() * 15), Math.floor(r() * 14), 1, 2, '#58ab4b');
      for (let k = 0; k < 4; k++) px(g, ox + Math.floor(r() * 15), Math.floor(r() * 15), 2, 1, '#2f7230');
      if (i === 8) {
        // fern fronds
        for (let k = 0; k < 4; k++) {
          px(g, ox + 3 + k, 11 - k, 1, 1, '#79c95f');
          px(g, ox + 12 - k, 11 - k, 1, 1, '#79c95f');
        }
        px(g, ox + 7, 6, 2, 7, '#69bb55');
      }
      break;
    }
    case 9: // temple stone
    case 10: {
      px(g, ox, 0, TILE, TILE, '#b3a682');
      px(g, ox, 0, TILE, 1, '#8a7f60');
      px(g, ox, 8, TILE, 1, '#8a7f60');
      px(g, ox, 1, 1, 7, '#8a7f60');
      px(g, ox + 8, 1, 1, 7, '#8a7f60');
      px(g, ox + 4, 9, 1, 7, '#8a7f60');
      px(g, ox + 12, 9, 1, 7, '#8a7f60');
      px(g, ox + 1, 1, 6, 1, '#c9bd98');
      px(g, ox + 9, 1, 6, 1, '#c9bd98');
      px(g, ox + 5, 9, 6, 1, '#c9bd98');
      if (i === 10) {
        px(g, ox + 1, 6, 4, 2, '#5f9a3e');
        px(g, ox + 2, 5, 2, 1, '#4c8232');
        px(g, ox + 9, 12, 3, 3, '#5f9a3e');
        px(g, ox + 13, 2, 2, 2, '#4c8232');
      }
      break;
    }
    case 11: // jungle swamp water
      px(g, ox, 0, TILE, TILE, '#2e6f5e');
      for (let k = 0; k < 4; k++) px(g, ox + Math.floor(r() * 12), Math.floor(r() * 15), 4, 1, '#4f9c84');
      if (r() > 0.5) {
        px(g, ox + 9, 9, 4, 3, '#5fb04a');
        px(g, ox + 11, 10, 1, 1, '#2e6f5e');
      }
      break;
    case 12: // snow
    case 13: {
      px(g, ox, 0, TILE, TILE, '#eef4fb');
      for (let k = 0; k < 6; k++) px(g, ox + Math.floor(r() * 15), Math.floor(r() * 15), 1 + Math.floor(r() * 2), 1, '#d5e1ef');
      px(g, ox + Math.floor(r() * 15), Math.floor(r() * 15), 1, 1, '#ffffff');
      if (i === 13) {
        // wind-blown drift
        px(g, ox + 2, 10, 8, 1, '#c8d6e8');
        px(g, ox + 4, 9, 6, 1, '#dde7f3');
        px(g, ox + 8, 4, 6, 1, '#c8d6e8');
      }
      break;
    }
    case 14: // ice
      px(g, ox, 0, TILE, TILE, '#a8dcf2');
      for (let k = 0; k < 3; k++) {
        const x = Math.floor(r() * 10);
        const y = Math.floor(r() * 12);
        for (let s = 0; s < 4; s++) px(g, ox + x + s, y + 3 - s, 1, 1, '#e6f7ff');
      }
      px(g, ox + 3, 12, 5, 1, '#7cb8d8');
      px(g, ox + 7, 11, 1, 1, '#7cb8d8');
      break;
    case 15: // cave floor
      px(g, ox, 0, TILE, TILE, '#6a6573');
      for (let k = 0; k < 5; k++) px(g, ox + Math.floor(r() * 14), Math.floor(r() * 14), 2, 1, '#7f7a89');
      for (let k = 0; k < 4; k++) px(g, ox + Math.floor(r() * 15), Math.floor(r() * 15), 1, 1, '#524d5c');
      break;
    case 16: // cave wall (opaque rock face)
      px(g, ox, 0, TILE, TILE, '#2e2a36');
      for (const [x, y, w, h] of [[0, 1, 7, 6], [8, 0, 8, 5], [1, 9, 6, 6], [9, 7, 6, 8]]) {
        px(g, ox + x, y, w, h, '#3d3847');
        px(g, ox + x, y, w, 1, '#4f495b');
        px(g, ox + x, y + h - 1, w, 1, '#221f29');
      }
      break;
    case 17: // boulder
      px(g, ox + 3, 5, 10, 9, '#7d8290');
      px(g, ox + 2, 7, 12, 6, '#7d8290');
      px(g, ox + 4, 5, 6, 2, '#a3a8b4');
      px(g, ox + 3, 7, 2, 2, '#a3a8b4');
      px(g, ox + 3, 12, 10, 2, '#5a5e6a');
      px(g, ox + 4, 14, 8, 1, '#3e414b');
      px(g, ox + 9, 8, 1, 3, '#5a5e6a');
      break;
    case 18: // snowy pine
      px(g, ox + 7, 13, 2, 3, '#5a3a1e');
      for (const [y, w] of [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12]]) px(g, ox + 8 - w / 2, y, w, 2, '#2d5a3d');
      for (const [y, w] of [[1, 2], [5, 4], [9, 8]]) px(g, ox + 8 - w / 2, y, w, 1, '#f2f7fc');
      px(g, ox + 2, 12, 3, 1, '#f2f7fc');
      px(g, ox + 11, 8, 2, 1, '#f2f7fc');
      break;
    case 19: // jungle tree
      px(g, ox + 7, 10, 2, 6, '#6b4423');
      px(g, ox + 2, 2, 12, 9, '#2f7a2f');
      px(g, ox + 1, 4, 14, 5, '#2f7a2f');
      px(g, ox + 4, 1, 8, 1, '#2f7a2f');
      px(g, ox + 4, 2, 5, 2, '#47a03f');
      px(g, ox + 2, 4, 3, 2, '#47a03f');
      px(g, ox + 3, 9, 10, 2, '#215a22');
      px(g, ox + 12, 5, 2, 3, '#215a22');
      px(g, ox + 1, 9, 1, 3, '#47a03f'); // hanging vine
      px(g, ox + 13, 10, 1, 4, '#47a03f');
      break;
    case 20: // temple column
      px(g, ox + 2, 0, 12, 4, '#5a5038');
      px(g, ox + 3, 1, 10, 2, '#efe6cc');
      px(g, ox + 4, 4, 8, 9, '#5a5038');
      px(g, ox + 5, 4, 6, 9, '#ddd2b0');
      px(g, ox + 5, 4, 1, 9, '#f6efdc');
      px(g, ox + 9, 4, 2, 9, '#a69a78');
      px(g, ox + 2, 13, 12, 3, '#5a5038');
      px(g, ox + 3, 13, 10, 2, '#efe6cc');
      px(g, ox + 6, 6, 2, 3, '#5f9a3e'); // moss
      break;
    case 21: // fern (walkable)
      for (let k = 0; k < 5; k++) {
        px(g, ox + 2 + k, 13 - k, 1, 1, '#4fae46');
        px(g, ox + 13 - k, 13 - k, 1, 1, '#4fae46');
      }
      px(g, ox + 7, 6, 2, 8, '#3e9638');
      px(g, ox + 5, 9, 1, 1, '#79c95f');
      px(g, ox + 10, 9, 1, 1, '#79c95f');
      break;
    case 22: // torch
      px(g, ox + 7, 6, 2, 9, '#5a3a1e');
      px(g, ox + 5, 15, 6, 1, '#3e2a16');
      px(g, ox + 6, 5, 4, 1, '#3b3b4f');
      px(g, ox + 6, 1, 4, 4, '#ff9b2e');
      px(g, ox + 7, 0, 2, 1, '#ff9b2e');
      px(g, ox + 7, 2, 2, 2, '#ffe680');
      break;
    case 23: // ice crystal
      px(g, ox + 6, 2, 3, 12, '#7fdfff');
      px(g, ox + 3, 7, 3, 7, '#7fdfff');
      px(g, ox + 10, 5, 3, 9, '#7fdfff');
      px(g, ox + 7, 1, 1, 1, '#7fdfff');
      px(g, ox + 6, 3, 1, 10, '#e6fbff');
      px(g, ox + 10, 6, 1, 7, '#e6fbff');
      px(g, ox + 8, 3, 1, 11, '#3fa9d6');
      px(g, ox + 5, 8, 1, 6, '#3fa9d6');
      px(g, ox + 3, 14, 10, 1, '#3fa9d6');
      break;
    case 24: // circuit board
    case 25: {
      px(g, ox, 0, TILE, TILE, '#13292d');
      px(g, ox, 0, TILE, 1, '#1a3539');
      px(g, ox + 4, 1, 1, 6, '#1f4b50');
      px(g, ox + 4, 6, 7, 1, '#1f4b50');
      px(g, ox + 11, 6, 1, 10, '#1f4b50');
      px(g, ox + 1, 11, 6, 1, '#1f4b50');
      px(g, ox + 3, 5, 3, 3, '#2b6f69'); // solder pads
      px(g, ox + 10, 13, 3, 3, '#2b6f69');
      if (r() > 0.5) px(g, ox + 13, 2, 2, 2, '#2b6f69');
      if (i === 25) {
        // a live signal running through the board
        px(g, ox, 7, TILE, 2, '#00b892');
        px(g, ox, 7, TILE, 1, '#5dffd9');
        px(g, ox + 7, 6, 2, 4, '#b5fff0');
      }
      break;
    }
    case 26: // server rack
      px(g, ox + 1, 0, 14, 16, '#14171f');
      px(g, ox + 2, 1, 12, 14, '#2a2f3a');
      for (let y = 2; y < 14; y += 3) {
        px(g, ox + 3, y, 10, 2, '#3b4252');
        px(g, ox + 11, y, 1, 1, r() > 0.4 ? '#39ff7a' : '#29e7ff');
        px(g, ox + 4, y + 1, 4, 1, '#1d2129');
      }
      break;
    case 27: // neural network node
      px(g, ox + 7, 11, 2, 4, '#2a2f3a');
      px(g, ox + 5, 14, 6, 2, '#14171f');
      px(g, ox + 5, 2, 6, 9, '#00e5b0');
      px(g, ox + 4, 3, 8, 7, '#00e5b0');
      px(g, ox + 6, 4, 4, 5, '#13292d');
      px(g, ox + 7, 5, 2, 3, '#b5fff0');
      break;
  }
}

function canvasTexture(scene: Phaser.Scene, key: string, w: number, h: number, draw: (g: Ctx) => void) {
  if (scene.textures.exists(key)) return;
  const tex = scene.textures.createCanvas(key, w, h)!;
  const g = tex.getContext();
  g.imageSmoothingEnabled = false;
  draw(g);
  tex.refresh();
}

export function generateTextures(scene: Phaser.Scene) {
  canvasTexture(scene, 'extra', TILE * EXTRA_COUNT, TILE, (g) => {
    for (let i = 0; i < EXTRA_COUNT; i++) drawExtraTile(g, i, i * TILE);
  });

  canvasTexture(scene, 'shadow', 12, 5, (g) => {
    g.fillStyle = 'rgba(0,0,0,0.35)';
    g.beginPath();
    g.ellipse(6, 2.5, 6, 2.5, 0, 0, Math.PI * 2);
    g.fill();
  });

  canvasTexture(scene, 'glow', 64, 64, (g) => {
    const grad = g.createRadialGradient(32, 32, 2, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,230,140,0.85)');
    grad.addColorStop(0.4, 'rgba(255,200,90,0.3)');
    grad.addColorStop(1, 'rgba(255,180,60,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
  });

  canvasTexture(scene, 'bubble', 8, 8, (g) => {
    px(g, 2, 0, 4, 8, '#8a3ff0');
    px(g, 0, 2, 8, 4, '#8a3ff0');
    px(g, 1, 1, 6, 6, '#8a3ff0');
    px(g, 2, 2, 2, 2, '#e3c8ff');
  });

  // "→|": the Indentation Serpent spits tab characters.
  canvasTexture(scene, 'tabBolt', 8, 8, (g) => {
    px(g, 0, 3, 5, 2, '#ffd43b');
    px(g, 3, 1, 1, 6, '#ffd43b');
    px(g, 4, 2, 1, 4, '#ffd43b');
    px(g, 6, 0, 2, 8, '#3776ab');
    px(g, 1, 3, 3, 1, '#fff3b0');
  });

  // Falling boulders thrown by the Kernel Panic Golem.
  canvasTexture(scene, 'boulder', 8, 8, (g) => {
    px(g, 1, 0, 6, 8, '#8a8f9c');
    px(g, 0, 1, 8, 6, '#8a8f9c');
    px(g, 1, 1, 3, 2, '#c3c8d2');
    px(g, 1, 6, 6, 1, '#5a5e6a');
    px(g, 5, 2, 1, 3, '#ff8a3d'); // glowing panic crack
  });

  // Bosses the Kenney sheet has no sprite for (scaled up in the arena).
  canvasTexture(scene, 'serpent', 16, 16, (g) => {
    const body = '#3776ab';
    const dark = '#1f4a70';
    const belly = '#ffd43b';
    px(g, 2, 12, 12, 3, body);
    px(g, 3, 15, 10, 1, dark);
    px(g, 4, 13, 8, 1, belly);
    px(g, 4, 9, 8, 3, body);
    px(g, 5, 11, 6, 1, dark);
    px(g, 5, 10, 6, 1, belly);
    px(g, 7, 4, 3, 5, body);
    px(g, 8, 5, 1, 4, belly);
    px(g, 4, 0, 9, 4, body); // hood
    px(g, 5, 1, 7, 2, '#4b8bbe');
    px(g, 4, 3, 9, 1, dark);
    px(g, 5, 1, 2, 1, '#ff3b3b');
    px(g, 10, 1, 2, 1, '#ff3b3b');
    px(g, 8, 4, 1, 2, '#ff4d6a'); // tongue
  });

  canvasTexture(scene, 'golem', 16, 16, (g) => {
    const stone = '#7d8290';
    const light = '#a3a8b4';
    const dark = '#4f535e';
    px(g, 5, 0, 6, 5, stone);
    px(g, 5, 0, 6, 1, light);
    px(g, 6, 2, 1, 1, '#ff3b3b');
    px(g, 9, 2, 1, 1, '#ff3b3b');
    px(g, 3, 5, 10, 7, stone);
    px(g, 3, 5, 10, 1, light);
    px(g, 1, 5, 2, 8, dark);
    px(g, 13, 5, 2, 8, dark);
    px(g, 0, 11, 3, 2, stone);
    px(g, 13, 11, 3, 2, stone);
    px(g, 4, 12, 3, 4, dark);
    px(g, 9, 12, 3, 4, dark);
    px(g, 7, 6, 2, 3, '#ff8a3d'); // "!" of a kernel panic
    px(g, 7, 10, 2, 1, '#ff8a3d');
    px(g, 4, 8, 1, 2, '#ffb347');
    px(g, 11, 7, 1, 3, '#ffb347');
  });

  // The Hallucinating Oracle: a glitching all-seeing orb.
  canvasTexture(scene, 'oracle', 16, 16, (g) => {
    for (let y = -6; y <= 6; y++) {
      const half = Math.floor(Math.sqrt(40 - y * y));
      px(g, 8 - half, 7 + y, half * 2, 1, y < -3 ? '#b28cff' : y > 3 ? '#3a1a80' : '#7a3cff');
    }
    px(g, 4, 6, 8, 3, '#f0f0ff');
    px(g, 5, 5, 6, 1, '#f0f0ff');
    px(g, 5, 9, 6, 1, '#f0f0ff');
    px(g, 7, 5, 2, 5, '#00e5b0');
    px(g, 7, 7, 2, 1, '#000000');
    px(g, 0, 4, 3, 1, '#ff3caa'); // glitch bars
    px(g, 13, 10, 3, 1, '#ff3caa');
    px(g, 6, 14, 1, 2, '#2a2f3a');
    px(g, 9, 14, 1, 2, '#2a2f3a');
  });

  // A hallucinated token: "?"
  canvasTexture(scene, 'token', 8, 8, (g) => {
    px(g, 0, 0, 8, 8, '#ff3caa');
    px(g, 1, 1, 6, 6, '#2a0a20');
    px(g, 3, 2, 2, 1, '#ffffff');
    px(g, 5, 3, 1, 1, '#ffffff');
    px(g, 4, 4, 1, 1, '#ffffff');
    px(g, 4, 6, 1, 1, '#ffffff');
  });

  canvasTexture(scene, 'rune', 16, 16, (g) => {
    g.strokeStyle = '#39ff7a';
    g.lineWidth = 2;
    g.beginPath();
    g.arc(8, 8, 6.5, 0, Math.PI * 2);
    g.stroke();
    g.fillStyle = '#39ff7a';
    // "{ }"
    px(g, 5, 5, 1, 6, '#39ff7a');
    px(g, 4, 8, 1, 1, '#39ff7a');
    px(g, 6, 5, 1, 1, '#39ff7a');
    px(g, 6, 10, 1, 1, '#39ff7a');
    px(g, 10, 5, 1, 6, '#39ff7a');
    px(g, 11, 8, 1, 1, '#39ff7a');
    px(g, 9, 5, 1, 1, '#39ff7a');
    px(g, 9, 10, 1, 1, '#39ff7a');
  });

  canvasTexture(scene, 'flag', 16, 16, (g) => {
    px(g, 4, 2, 1, 13, '#d9d9e8');
    px(g, 3, 14, 4, 2, '#6b6b80');
    px(g, 5, 2, 8, 5, '#39ff7a');
    px(g, 5, 7, 5, 1, '#1fae4f');
  });

  canvasTexture(scene, 'flagOff', 16, 16, (g) => {
    px(g, 4, 2, 1, 13, '#d9d9e8');
    px(g, 3, 14, 4, 2, '#6b6b80');
    px(g, 5, 2, 8, 5, '#ff4d6a');
    px(g, 5, 7, 5, 1, '#b02a40');
  });

  canvasTexture(scene, 'prompt', 9, 11, (g) => {
    px(g, 0, 0, 9, 9, '#14142b');
    px(g, 1, 1, 7, 7, '#ffffff');
    px(g, 4, 2, 1, 3, '#14142b');
    px(g, 4, 6, 1, 1, '#14142b');
    px(g, 3, 9, 3, 1, '#14142b');
    px(g, 4, 10, 1, 1, '#14142b');
  });

  canvasTexture(scene, 'portal', 24, 24, (g) => {
    for (let r = 11; r > 2; r -= 3) {
      g.strokeStyle = r % 2 ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.55)';
      g.lineWidth = 2;
      g.beginPath();
      g.arc(12, 12, r, 0, Math.PI * 2);
      g.stroke();
    }
  });

  canvasTexture(scene, 'lock', 9, 10, (g) => {
    px(g, 2, 0, 5, 1, '#ffe14d');
    px(g, 1, 1, 1, 4, '#ffe14d');
    px(g, 7, 1, 1, 4, '#ffe14d');
    px(g, 0, 4, 9, 6, '#ffe14d');
    px(g, 4, 6, 1, 2, '#14142b');
  });

  canvasTexture(scene, 'slash', 16, 16, (g) => {
    g.strokeStyle = '#ffffff';
    g.lineWidth = 2;
    g.beginPath();
    g.arc(8, 8, 6, -Math.PI * 0.9, Math.PI * 0.1);
    g.stroke();
  });

  canvasTexture(scene, 'spark', 3, 3, (g) => px(g, 0, 0, 3, 3, '#ffffff'));

  canvasTexture(scene, 'fog', 48, 48, (g) => {
    const grad = g.createRadialGradient(24, 24, 4, 24, 24, 24);
    grad.addColorStop(0, 'rgba(220,220,240,0.9)');
    grad.addColorStop(1, 'rgba(220,220,240,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 48, 48);
  });
}
