# 🕹️ BitQuest: The Legend of Bytaria

A top-down pixel-art RPG where you learn **JavaScript, TypeScript, Java, Node.js, Python, Git, GitHub, Linux, DevOps and AI** to free Princess Ada from Lord Bugmancer. English and French.

Lord Bugmancer shattered the Source Crystal into ten shards and locked Princess Ada in the Kernel Citadel. Each Land (one per course) is corrupted by a guardian boss. All ten Lands are playable. In each Land you:

- explore the map with the **arrow keys / WASD / ZQSD, a gamepad, or the on-screen touch pad**;
- **train at the dojo at the entrance**: its master offers a five-module crash course that drills every challenge of the Land — untimed, with no heart or point at stake. The training grounds next door add six chests and respawning sparring bugs;
- talk to its people. Each Land is split into 7 zones, each with a guide. At every play session, all the Land's concepts are dealt at random to the zones (easy near the entrance, expert near the boss). The zone's monsters and chest then ask random questions on its concepts, and its guide teaches every one of them, in random order: a nudge before you solve it, the full lesson (✓) after. Together the guides teach every concept of the language;
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
- Timed challenges give you room to think: **45 s** for a monster, **35 s** for a boss rune. The Rogue adds **+5 s** to both. Dojo drills never have a timer.

**Heroes:**

| Hero | Perk |
|---|---|
| Knight | +1 heart |
| Mage | 1 free hint per Land |
| Rogue | Faster, +5 s on timers |
| Bard | Points ×1.2 |

An account is required to play: the adventure is saved on the server, which validates every answer, point, heart and boss hit.

## Status: milestone 2 (ten Lands, dojo crash courses)

| Done | Next |
|---|---|
| Accounts, hero select, Hello World Village, world map, **all 10 Lands playable** (story, 5 guides, 26 monsters, 3 shrines, 6 chests, dojo + training grounds, checkpoints, a guardian boss each), crash courses for every course, Hall of Fame, Codex, settings | The Kernel Citadel ending, Arena of Champions: vs computer and online duels (milestone 3), Docker + PostgreSQL deployment (milestone 4) |

The four hand-built Lands are **JS, Python, Linux and AI**; the other six use a themed five-zone template with their own guides, stories and bosses. Every Land has the same complete loop.

## Dojos and crash courses

Every Land entrance has a **dojo** with a master and a training grounds. The master's crash course has five modules: four difficulty tiers plus a boss lab. Each module drills **every challenge of its tier** (multiple choice, fill-in, ordering, bug hunt, command, output, riddle and code), reads the explanation with you, and remembers the modules you complete in the save flags. Training never costs a heart or a point and never has a timer, so you can stop mid-module and resume later.

The full syllabus is written out for every course, in English and French:

- [CRASH_COURSES.md](CRASH_COURSES.md) — English
- [CRASH_COURSES.fr.md](CRASH_COURSES.fr.md) — French

These files are generated from `shared/crashcourse.ts`; regenerate them after editing a course with:

```bash
npm run crashcourses
```

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
  crashcourse.ts        The five-module crash course of every course
  content/*.ts          220 bilingual challenges, one file per course
  check.ts              Answer checking
  tracks.ts             Courses and their bosses
server/src/
  routes/auth.ts        Register / login (required to play)
  routes/game.ts        Encounters, damage, checkpoints, boss fights (authoritative)
  routes/me.ts          Profile, settings, new game, leaderboard
server/scripts/
  validate-content.ts   Structural checks + runs every reference solution
  export-crashcourses.ts Regenerates CRASH_COURSES.md and .fr.md
client/src/
  game/                 Phaser 3 engine
    scenes/             Boot, Village, World map, Land, Boss
    lands/expand.ts     Wraps a Land with the dojo, training grounds and bigger map
    lands/template.ts   The six themed template Lands
    lands/javascript.ts JS Land: map, people, monsters, letters, story
    story.ts            Prologue, village and world map texts
    mapBuilder.ts       Code-drafted tilemaps with auto-tiled paths and collisions
  components/game/      React overlay: HUD, dialogues, challenges, pause, game over
  audio/music.ts        Procedural adaptive music (calm in villages, intense in boss fights)
client/public/assets/   Kenney "Tiny Town" and "Tiny Dungeon" sheets (CC0)
```

## Adding a Land

1. Create `client/src/game/lands/<land>.ts` following `javascript.ts`. It holds the map draft, NPCs, monsters, signs, story, Ada's three letters and the boss arena. Wrap the export in `withDojo(content, theme)`: it widens the map, adds the entrance dojo, the training grounds, three extra chests and the master/assistant NPCs.
2. Add the course's dojo names and crash-course text to `shared/crashcourse.ts` (the `META` table).
3. Register it in `client/src/game/lands/index.ts`.
4. Set `playable: true` for it in `shared/game.ts`, and list its chests (`c1`…`c6`).

Challenges come from `shared/content/<course>.ts`. Run `npm run validate` after editing them, and `npm run crashcourses` after editing a course plan.

## Credits

Pixel art: [Kenney.nl](https://kenney.nl) *Tiny Town* and *Tiny Dungeon* (CC0). Water, neon streets, docks and effects are drawn in code.
