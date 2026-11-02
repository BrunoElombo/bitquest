import { LANDS, type LandId } from '@shared/game';
import { TRACK_BY_ID } from '@shared/tracks';
import type { L } from '@shared/types';
import type { DialogueLine } from '../../store';
import type { Scene as MusicScene } from '../../audio/music';
import { DUNGEON } from '../assets';
import { MapDraft } from '../mapBuilder';
import { SPEAKERS } from '../story';
import { withDojo, type DojoTheme } from './expand';
import type { LandContent } from './types';

// Six Lands share one carefully laid-out template: a five-zone map, three shrine letters,
// three puzzle chests and a boss arena. The colour palette, zone names and guides change per
// course, while the dojo and the training grounds are added by withDojo(). The hand-built
// Lands (JS, Python, Linux, AI) keep their bespoke maps.
//
// This keeps every course playable with the same complete loop: explore, train at the dojo,
// solve shrines, open chests, fight the guardian.

export interface LandTheme extends DojoTheme {
  music: { scene: MusicScene; intensity: number };
  bossFrame: number;
  bossTint: number;
}

interface LandConfig {
  theme: LandTheme;
  /** Five zone names, from the entrance to the boss gate. */
  zones: [L, L, L, L, L];
  /** Optional guide names; defaults to the five roles below. */
  guides?: [L, L, L, L, L];
}

const say = (portrait: number, speaker: L, en: string, fr: string): DialogueLine => ({
  portrait,
  speaker,
  text: { en, fr },
});

const narrate = (en: string, fr: string): DialogueLine => ({ text: { en, fr } });

const ada = (en: string, fr: string): DialogueLine => say(DUNGEON.princess, SPEAKERS.ADA, en, fr);

const GUIDE_ROLES: [L, L, L, L, L] = [
  { en: 'the Gatekeeper', fr: 'le Gardien' },
  { en: 'the Archivist', fr: 'l’Archiviste' },
  { en: 'the Engineer', fr: 'l’Ingénieur' },
  { en: 'the Tester', fr: 'le Testeur' },
  { en: 'the Warden', fr: 'la Gardienne' },
];

const GUIDE_FRAMES = [DUNGEON.villagerA, DUNGEON.villagerB, DUNGEON.villagerC, DUNGEON.monk, DUNGEON.ranger];

function baseDraft(theme: LandTheme): MapDraft {
  const d = new MapDraft(64, 44, theme.floor);
  d.frame(theme.border, 0, 0, 64, 44, 2);

  // Entrance road and the old west exit.
  d.hroad(0, 18, 21, theme.road, 2);
  d.clear(0, 21, 2, 2);
  d.mark({ type: 'exit', x: 0, y: 21, w: 1, h: 2, id: 'world' });
  d.mark({ type: 'spawn', x: 3, y: 21 });
  d.mark({ type: 'checkpoint', x: 4, y: 24, id: 'start' });
  d.mark({ type: 'npc', x: 7, y: 19, id: 'guide0' });
  d.mark({ type: 'sign', x: 16, y: 19, id: 'entrance' });

  // Central plaza, its cross roads, and the boss approach.
  d.fill(theme.plaza, 18, 12, 30, 20);
  d.fill(theme.plaza, 49, 8, 7, 28);
  d.hroad(18, 47, 13, theme.road, 2);
  d.hroad(18, 47, 31, theme.road, 2);
  d.vroad(31, 3, 41, theme.road, 2);

  // A few buildings and lamps give the plaza a town silhouette even with a shared layout.
  d.stamp(21, 17, 'houseRed').stamp(37, 17, 'houseGrey');
  d.stamp(21, 24, 'shop').stamp(38, 24, 'houseGrey');
  for (const x of [20, 24, 28, 40, 44]) d.put(x, 20, 'L').put(x, 23, 'L');
  for (const y of [5, 9, 27, 34, 38]) d.put(31, y, 'L').put(34, y, 'L');

  // North: shrine, archive chest, guide.
  d.mark({ type: 'shrine', x: 23, y: 5, id: '1' });
  d.mark({ type: 'chest', x: 44, y: 10, id: 'c2' });
  d.mark({ type: 'npc', x: 28, y: 8, id: 'guide1' });

  // Centre: the first shrine, a puzzle chest and the central checkpoint.
  d.mark({ type: 'shrine', x: 30, y: 19, id: '0' });
  d.mark({ type: 'checkpoint', x: 35, y: 24, id: 'plaza' });
  d.mark({ type: 'npc', x: 30, y: 24, id: 'guide2' });
  d.mark({ type: 'chest', x: 30, y: 27, id: 'c1' });

  // South: the third shrine, a chest and the last guide before the gate.
  d.mark({ type: 'shrine', x: 24, y: 38, id: '2' });
  d.mark({ type: 'chest', x: 44, y: 38, id: 'c3' });
  d.mark({ type: 'npc', x: 30, y: 34, id: 'guide3' });

  // East: the boss gate and its final checkpoint.
  d.put(60, 20, 'W').put(60, 21, 'G').put(60, 22, 'G').put(60, 23, 'W');
  d.mark({ type: 'bossGate', x: 60, y: 21, h: 2 });
  d.mark({ type: 'checkpoint', x: 52, y: 25, id: 'gate' });
  d.mark({ type: 'npc', x: 51, y: 18, id: 'guide4' });
  d.mark({ type: 'sign', x: 47, y: 19, id: 'gate' });

  // Sixteen roaming bugs, easy near the entrance, expert near the gate.
  for (const [x, y] of [[8, 13], [12, 27], [14, 16], [6, 32], [25, 22], [45, 21]]) d.mark({ type: 'monster', x, y, tier: 1 });
  for (const [x, y] of [[26, 10], [37, 7], [42, 9], [26, 36], [38, 38], [41, 33]]) d.mark({ type: 'monster', x, y, tier: 2 });
  for (const [x, y] of [[52, 12], [53, 31], [50, 28], [54, 22]]) d.mark({ type: 'monster', x, y, tier: 3 });

  d.scatter(theme.props, 45, 7, { x: 2, y: 2, w: 60, h: 40 });
  return d;
}

function arena(theme: LandTheme): MapDraft {
  const d = new MapDraft(28, 16, theme.plaza);
  d.fill(theme.floor, 0, 0, 28, 5);
  d.line(theme.border, 0, 15, 27, 15);
  d.line(theme.border, 0, 5, 0, 14).line(theme.border, 27, 5, 27, 14);
  d.put(1, 5, 'b').put(26, 5, 'b').put(1, 14, 'l').put(26, 14, 'l');
  d.mark({ type: 'spawn', x: 13, y: 12 });
  return d;
}

function makeLand(id: LandId, cfg: LandConfig): LandContent {
  const track = TRACK_BY_ID[id];
  const boss = track.boss;
  const land = LANDS[id];
  const word = land.spellWord;
  const guides = cfg.guides ?? GUIDE_ROLES;
  const zones = cfg.zones;

  const npcs: LandContent['npcs'] = {};
  guides.forEach((name, i) => {
    const frame = GUIDE_FRAMES[i];
    const next = i < 4 ? zones[i + 1] : zones[4];
    npcs[`guide${i}`] = {
      frame,
      first: [
        say(
          frame,
          name,
          `Welcome to ${land.name.en}, traveler. I am ${name.en}. The ${boss.name.en} has swallowed this Land's Crystal Shard, and its corruption crawls out of every stack trace.`,
          `Bienvenue en ${land.name.fr}, voyageur. Je suis ${name.fr}. Le ${boss.name.fr} a avalé l’Éclat de Cristal de cette Terre, et sa corruption sort de chaque pile d’appels.`,
        ),
        say(
          frame,
          name,
          `Princess Ada hid three letters in our shrines. Find them all and the gate to ${next.en} opens. The master at the dojo can train you for every challenge on the way.`,
          `La Princesse Ada a caché trois lettres dans nos sanctuaires. Trouve-les toutes et la porte vers ${next.fr} s’ouvrira. Le maître du dojo peut t’entraîner à chaque défi du chemin.`,
        ),
      ],
      tips: [
        [
          say(
            frame,
            name,
            'Talk to me again and I will teach the concepts of this area, one by one. The master at the entrance drills the whole course.',
            'Parle-moi encore et je t’enseignerai les concepts de cette zone, un par un. Le maître à l’entrée entraîne sur tout le programme.',
          ),
        ],
        [
          say(
            frame,
            name,
            'Chests hold the puzzle questions, monsters the battle ones, shrines the enigmas. Between them, every concept of this Land can be practised.',
            'Les coffres cachent les questions-énigmes, les monstres celles de combat, les sanctuaires les énigmes. Ensemble, chaque concept de cette Terre peut être travaillé.',
          ),
        ],
      ],
    };
  });

  return withDojo(
    {
      id,
      music: cfg.theme.music,
      grade: (cam) => {
        const fx = cam.postFX?.addColorMatrix();
        fx?.saturate(0.2);
        cam.postFX?.addVignette(0.5, 0.5, 0.9, 0.4);
      },
      draft: () => baseDraft(cfg.theme),
      npcs,
      monsters: {
        1: { frame: DUNGEON.slime, name: { en: 'Corrupted Slime', fr: 'Slime corrompu' }, speed: 26 },
        2: { frame: DUNGEON.bat, name: { en: 'Glitch Bat', fr: 'Chauve-souris glitch' }, speed: 38 },
        3: { frame: DUNGEON.ghost, name: { en: 'Error Wraith', fr: 'Spectre d’erreur' }, speed: 44, tint: 0xd6b0ff },
      },
      zones: [
        { name: zones[0], area: { x: 0, y: 0, w: 18, h: 44 }, guide: 'guide0', tiers: [1] },
        { name: zones[1], area: { x: 18, y: 0, w: 30, h: 13 }, guide: 'guide1', tiers: [2, 3] },
        { name: zones[2], area: { x: 18, y: 13, w: 30, h: 18 }, guide: 'guide2', tiers: [1, 2] },
        { name: zones[3], area: { x: 18, y: 31, w: 30, h: 13 }, guide: 'guide3', tiers: [2, 3] },
        { name: zones[4], area: { x: 48, y: 0, w: 16, h: 44 }, guide: 'guide4', tiers: [3, 4] },
      ],
      signs: {
        entrance: { en: `${land.name.en} → the dojo is on your left`, fr: `${land.name.fr} → le dojo est sur ta gauche` },
        gate: { en: `${zones[4].en} → (danger: ${boss.name.en})`, fr: `${zones[4].fr} → (danger : ${boss.name.fr})` },
      },
      story: {
        intro: [
          narrate(
            `${land.name.en}. Its neon, stone and static used to hum in harmony…`,
            `${land.name.fr}. Ses néons, sa pierre et sa friture bourdonnaient autrefois en harmonie…`,
          ),
          narrate(
            `…until the ${boss.name.en} swallowed the Crystal Shard. Now every concept is twisted into a trap.`,
            `…jusqu’à ce que le ${boss.name.fr} avale l’Éclat du Cristal. Désormais, chaque concept est tordu en piège.`,
          ),
          narrate(
            'Find the dojo master at the entrance. Train first; the Land can wait a few minutes.',
            'Trouve le maître du dojo à l’entrée. Entraîne-toi d’abord ; la Terre peut attendre quelques minutes.',
          ),
        ],
        shrineIntro: [
          narrate(
            'An ancient shrine hums with light. A voice whispers an enigma. Answer it to open the sealed letter.',
            'Un ancien sanctuaire vibre de lumière. Une voix murmure une énigme. Résous-la pour ouvrir la lettre scellée.',
          ),
        ],
        letters: [
          [
            narrate('The shrine opens. Inside, a letter sealed with a tiny crown…', 'Le sanctuaire s’ouvre. À l’intérieur, une lettre scellée d’une petite couronne…'),
            ada(
              '"If you are reading this, a brave coder found my first shrine. Bugmancer feeds on unhandled errors: every challenge you face makes him weaker."',
              '« Si tu lis ceci, c’est qu’un codeur courageux a trouvé mon premier sanctuaire. Bugmancer se nourrit des erreurs non gérées : chaque défi affronté l’affaiblit. »',
            ),
          ],
          [
            narrate('Another letter, the ink still fresh…', 'Une autre lettre, l’encre encore fraîche…'),
            ada(
              '"The guardian of this Land hates order. Take the challenges one at a time, read every explanation, and it will run out of tricks."',
              '« Le gardien de cette Terre déteste l’ordre. Prends les défis un par un, lis chaque explication, et il sera à court de ruses. »',
            ),
          ],
          [
            narrate('The last letter glows as you unfold it.', 'La dernière lettre brille quand tu la déplies.'),
            ada(
              `"The word of the Restore Spell hidden here is ${word.en}. Keep it close. When all ten words are spoken, the Citadel will open. Hurry…"`,
              `« Le mot du Sort de Restauration caché ici est ${word.fr}. Garde-le précieusement. Quand les dix mots seront prononcés, la Citadelle s’ouvrira. Dépêche-toi… »`,
            ),
          ],
        ],
        gateSealed: (found) => [
          narrate(
            `The gate to the ${boss.name.en} is sealed by three locks of light. Ada's letters found: ${found}/3.`,
            `La porte du ${boss.name.fr} est scellée par trois verrous de lumière. Lettres d’Ada trouvées : ${found}/3.`,
          ),
        ],
        gateOpened: [
          narrate(
            `The seal of ${zones[4].en} cracks and falls. The ${boss.name.en}'s gate is open!`,
            `Le sceau de ${zones[4].fr} se fissure et tombe. La porte du ${boss.name.fr} est ouverte !`,
          ),
        ],
        bossIntro: [
          narrate('The air freezes. A silhouette of corrupted code rises…', 'L’air se fige. Une silhouette de code corrompu s’élève…'),
          { portrait: cfg.theme.bossFrame, speaker: boss.name, text: boss.taunts[0] },
        ],
        bossHint: [
          narrate(
            'Dodge the projectiles, step on a glowing rune and answer to strike. The dojo drills are drawn from the same pool as the runes.',
            'Esquive les projectiles, marche sur une rune lumineuse et réponds pour frapper. Les exercices du dojo viennent du même vivier que les runes.',
          ),
        ],
        victory: [
          narrate(
            `The ${boss.name.en} dissolves into a cloud of resolved errors. The Crystal Shard glows in your hands!`,
            `Le ${boss.name.fr} se dissout en un nuage d’erreurs résolues. L’Éclat du Cristal brille entre tes mains !`,
          ),
          narrate(`Key Shard of ${track.name} obtained ✦ Spell word: ${word.en}`, `Éclat-clé de ${track.name} obtenu ✦ Mot du sort : ${word.fr}`),
          ada('{name}…? I can hear you through the shard! One more seal is broken. I believe in you!', '{name}… ? Je t’entends à travers l’éclat ! Un sceau de plus est brisé. Je crois en toi !'),
        ],
        afterVictory: [
          say(
            GUIDE_FRAMES[0],
            guides[0],
            `The Land is free again. The portals beyond ${land.name.en} are open. Go, hero: the Citadel is waiting.`,
            `La Terre est libre à nouveau. Les portails au-delà de ${land.name.fr} sont ouverts. Va, héros : la Citadelle t’attend.`,
          ),
        ],
        gateCleared: [narrate('Only calm ground remains beyond the gate. The guardian is gone.', 'Seul un sol calme reste derrière la porte. Le gardien n’est plus.')],
      },
      boss: {
        frame: cfg.theme.bossFrame,
        tint: cfg.theme.bossTint,
        scale: 4,
        arena: () => arena(cfg.theme),
        projectileTint: 0xffffff,
        movement: 'drift',
      },
    },
    cfg.theme,
  );
}

export const typescriptLand: LandContent = makeLand('typescript', {
  theme: {
    border: 'S',
    props: ['S', 'T', 't', 'B'],
    floor: 'u',
    plaza: ':',
    road: '#',
    music: { scene: 'puzzle', intensity: 0.35 },
    bossFrame: DUNGEON.ghost,
    bossTint: 0x3178c6,
  },
  zones: [
    { en: 'the Type Bazaar', fr: 'le Bazar des Types' },
    { en: 'the Generic Gardens', fr: 'les Jardins Génériques' },
    { en: 'the Narrowing Halls', fr: 'les Halls du Rétrécissement' },
    { en: 'the Utility Foundry', fr: 'la Fonderie des Utilitaires' },
    { en: 'the Strict Gate', fr: 'la Porte Stricte' },
  ],
});

export const nodejsLand: LandContent = makeLand('nodejs', {
  theme: {
    border: 'T',
    props: ['T', 't', 'B', 'S'],
    floor: '.',
    plaza: ':',
    road: '#',
    music: { scene: 'focus', intensity: 0.35 },
    bossFrame: DUNGEON.crab,
    bossTint: 0x5fa04e,
  },
  zones: [
    { en: 'the Module Market', fr: 'le Marché des Modules' },
    { en: 'the npm Bazaar', fr: 'le Bazar npm' },
    { en: 'the Stream Docks', fr: 'les Docks des Flux' },
    { en: 'the Middleware Yard', fr: 'la Cour des Middlewares' },
    { en: 'the Event Loop Gate', fr: 'la Porte de la Boucle d’Événements' },
  ],
});

export const javaLand: LandContent = makeLand('java', {
  theme: {
    border: 'C',
    props: ['C', 'O', 'R', 'b'],
    floor: 'o',
    plaza: 'o',
    road: '=',
    music: { scene: 'enigma', intensity: 0.35 },
    bossFrame: DUNGEON.ghost,
    bossTint: 0xe76f00,
  },
  zones: [
    { en: 'the JVM Docks', fr: 'les Docks de la JVM' },
    { en: 'the Class Forge', fr: 'la Forge des Classes' },
    { en: 'the Interface Halls', fr: 'les Halls des Interfaces' },
    { en: 'the Collection Vault', fr: 'le Coffre des Collections' },
    { en: 'the Heap Gate', fr: 'la Porte du Tas' },
  ],
});

export const gitLand: LandContent = makeLand('git', {
  theme: {
    border: 'P',
    props: ['P', 'e', 'R', 'm'],
    floor: 'j',
    plaza: 'o',
    road: '=',
    music: { scene: 'enigma', intensity: 0.35 },
    bossFrame: DUNGEON.crab,
    bossTint: 0xf05032,
  },
  zones: [
    { en: 'the Working Tree', fr: 'l’Arbre de Travail' },
    { en: 'the Branch Grove', fr: 'le Bosquet des Branches' },
    { en: 'the Commit Quarry', fr: 'la Carrière des Commits' },
    { en: 'the Merge Marsh', fr: 'le Marais des Fusions' },
    { en: 'the Remote Gate', fr: 'la Porte Distante' },
  ],
});

export const githubLand: LandContent = makeLand('github', {
  theme: {
    border: 'S',
    props: ['S', 'T', 't', 'B'],
    floor: 'u',
    plaza: 'v',
    road: '#',
    music: { scene: 'puzzle', intensity: 0.35 },
    bossFrame: DUNGEON.ghost,
    bossTint: 0xa371f7,
  },
  zones: [
    { en: 'the Fork Plaza', fr: 'la Place des Forks' },
    { en: 'the Issue Boards', fr: 'les Tableaux d’Issues' },
    { en: 'the Review Rooms', fr: 'les Salles de Revue' },
    { en: 'the Actions Foundry', fr: 'la Fonderie des Actions' },
    { en: 'the Release Gate', fr: 'la Porte des Releases' },
  ],
});

export const devopsLand: LandContent = makeLand('devops', {
  theme: {
    border: 'N',
    props: ['N', 'K', 'R', 'O'],
    floor: 's',
    plaza: 'i',
    road: 'c',
    music: { scene: 'focus', intensity: 0.35 },
    bossFrame: DUNGEON.ghost,
    bossTint: 0x2496ed,
  },
  zones: [
    { en: 'the Build Yard', fr: 'la Cour des Builds' },
    { en: 'the Container Port', fr: 'le Port des Conteneurs' },
    { en: 'the Pipeline Plains', fr: 'les Plaines du Pipeline' },
    { en: 'the Monitoring Tower', fr: 'la Tour de Supervision' },
    { en: 'the Production Gate', fr: 'la Porte de Production' },
  ],
});
