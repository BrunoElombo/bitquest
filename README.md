# 🕹️ BitQuest: The Legend of Bytaria

A top-down pixel-art RPG where you learn **JavaScript, TypeScript, Java, Node.js, Python, Git, GitHub, Linux, DevOps and AI** to free Princess Ada from Lord Bugmancer. English and French.

Lord Bugmancer shattered the Source Crystal into ten shards and locked Princess Ada in the Kernel Citadel. Each Land (one per course) is corrupted by a guardian boss. In each Land you:

- explore the map with the **arrow keys / WASD / ZQSD, a gamepad, or the on-screen touch pad**;
- talk to its people (each teaches a concept);
- squash roaming **bugs**: touch one and you must answer its timed challenge;
- solve the **3 enigma shrines** to read Ada's letters, which breaks the boss gate's seal;
- open **chests** (coding puzzles, including real JS/TS/Python run in the browser);
- fight the **boss** in real time: dodge its projectiles, and step on glowing runes to answer and strike.

**Game controls:**

| Action | Keyboard | Other |
|---|---|---|
| Move | Arrows, WASD, ZQSD | Gamepad stick / D-pad, touch joystick |
| Talk, open, enter | SPACE, ENTER, E | Gamepad A, touch A button |
| Pause menu | ESC, P | Gamepad START, ⏸ button |
| Controls help | H | ? button |
| Mute / unmute | M | 🔊 button |
| Fullscreen | F | ⛶ button |
| Save & quit | Pause menu | ⏻ button (asks to confirm) |

The pause menu also offers **Restart from checkpoint** and **Back to the world map** inside a Land or boss fight, volumes, language and a touch-controls switch (on by default on touch screens).

**Lives and points:**
- 3 hearts (4 for the Knight).
- A wrong answer or a hit costs a heart; a wrong answer also costs 50 points.
- Game Over sends you back to your last checkpoint flag and costs 20% of that Land's points.
- You earn an extra heart every 5,000 points.

**Heroes:**

| Hero | Perk |
|---|---|
| Knight | +1 heart |
| Mage | 1 free hint per Land |
| Rogue | Faster, +3 s on timers |
| Bard | Points ×1.2 |

An account is required to play: the adventure is saved on the server, which validates every answer, point, heart and boss hit.

## Status: milestone 1

| Done | Next |
|---|---|
| Accounts, hero select, Hello World Village, world map, **JS Land complete** (story, 5 NPCs, 16 monsters, 3 shrines, 3 chests, checkpoints, Callback Kraken boss), Hall of Fame, Codex, settings | The 8 other Lands and the Kernel Citadel ending (milestone 2), Arena of Champions: vs computer and online duels (milestone 3), Docker + PostgreSQL deployment (milestone 4) |

## Getting started

Requires Node.js ≥ 22.13.

```bash
npm install
npm run dev
```

- Game: http://localhost:5180
- API: http://localhost:3001 (Vite proxies `/api` to it)

Production: `npm run build` then `npm start` (serves the API and the built client on port 3001).

Environment variables (optional):

| Variable | Default | Purpose |
|---|---|---|
| `API_PORT` | `3001` | API / production server port |
| `JWT_SECRET` | random, saved in `server/data/.jwt-secret` | Token signing secret; set it in production |
| `DB_PATH` | `server/data/bitquest.db` | SQLite database file |
| `CORS_ORIGIN` | `http://localhost:5180` | Allowed browser origin in development |

## Project layout

```
shared/                 Rules used by both client and server
  game.ts               Heroes, Lands, scoring, lives, save format, challenge picking
  content/*.ts          198 bilingual challenges, one file per course
  check.ts              Answer checking
  tracks.ts             Courses and their bosses
server/src/
  routes/auth.ts        Register / login (required to play)
  routes/game.ts        Encounters, damage, checkpoints, boss fights (authoritative)
  routes/me.ts          Profile, settings, new game, leaderboard
client/src/
  game/                 Phaser 3 engine
    scenes/             Boot, Village, World map, Land, Boss
    lands/javascript.ts JS Land: map, people, monsters, letters, story
    story.ts            Prologue, village and world map texts
    mapBuilder.ts       Code-drafted tilemaps with auto-tiled paths and collisions
  components/game/      React overlay: HUD, dialogues, challenges, pause, game over
  audio/music.ts        Procedural adaptive music (calm in villages, intense in boss fights)
client/public/assets/   Kenney "Tiny Town" and "Tiny Dungeon" sheets (CC0)
```

## Adding a Land

1. Create `client/src/game/lands/<land>.ts` following `javascript.ts`. It holds the map draft, NPCs, monsters, signs, story, Ada's three letters and the boss arena.
2. Register it in `client/src/game/lands/index.ts`.
3. Set `playable: true` for it in `shared/game.ts`.

Challenges come from `shared/content/<course>.ts`. Run `npm run validate` after editing them.

## Credits

Pixel art: [Kenney.nl](https://kenney.nl) *Tiny Town* and *Tiny Dungeon* (CC0). Water, neon streets, docks and effects are drawn in code.
