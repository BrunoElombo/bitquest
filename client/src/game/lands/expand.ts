import { CRASH_COURSES } from '@shared/crashcourse';
import type { L } from '@shared/types';
import type { DialogueLine } from '../../store';
import { DUNGEON } from '../assets';
import { type GroundCh, MapDraft } from '../mapBuilder';
import type { LandContent, NpcDef } from './types';

// Every playable Land is widened westward to make room for a dojo courtyard and a training
// grounds. The original 64×44 map is copied 20 tiles to the right, so all of its hand-placed
// content stays intact; the new area gives the master a home and adds enough encounters for
// every challenge of the course.
//
// Keeping this in one helper means future Lands get a dojo at their entrance for free.

export const DOJO_DX = 20;
export const DOJO_MASTER = 'dojo_master';
export const DOJO_ASSISTANT = 'dojo_assistant';

const say = (portrait: number, speaker: L, en: string, fr: string): DialogueLine => ({
  portrait,
  speaker,
  text: { en, fr },
});

export interface DojoTheme {
  /** Decoration used for the new outer border. */
  border: string;
  /** Props sprinkled in the new grass/jungle/snow. */
  props: string[];
  /** Base ground of the new area. */
  floor: GroundCh;
  /** Stone floor of the dojo courtyard. */
  plaza: GroundCh;
  /** Road/path tile. */
  road: GroundCh;
}

/**
 * Grows a 64×44 Land to 84×44: the old map slides east, and a dojo + training grounds take the
 * west. The old west exit and spawn are replaced by a new entrance in front of the dojo.
 */
export function expandDraft(base: MapDraft, theme: DojoTheme): MapDraft {
  const width = base.w + DOJO_DX;
  const height = base.h;
  const d = new MapDraft(width, height, theme.floor);

  // Copy the original map, decoration and markers, shifted east.
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < base.w; x++) {
      d.ground[y][x + DOJO_DX] = base.ground[y][x];
      d.deco[y][x + DOJO_DX] = base.deco[y][x];
    }
  }
  for (const m of base.markers) {
    if (m.type === 'exit' || m.type === 'spawn') continue;
    // The old entrance flag becomes a city checkpoint; the new one is the Land start.
    const id = m.type === 'checkpoint' && m.id === 'start' ? 'city' : m.id;
    d.mark({ ...m, x: m.x + DOJO_DX, id });
  }

  // Outer border of the new west wing, with a gate for the world exit.
  d.frame(theme.border, 0, 0, DOJO_DX, height, 2);
  d.clear(0, 21, 3, 2);
  // Open the old west wall of the original map onto the new road.
  d.clear(18, 21, 4, 2);

  // Dojo courtyard: a stone floor enclosed by a low fence, open at the south.
  d.fill(theme.plaza, 4, 9, 11, 8);
  d.frame('F', 4, 9, 11, 8);
  d.clear(8, 16, 3, 2);
  d.put(4, 9, 'O').put(14, 9, 'O').put(4, 16, 'O').put(14, 16, 'O');
  for (const x of [6, 12]) d.put(x, 9, 'b');
  d.mark({ type: 'dojo', x: 9, y: 13, w: 11, h: 8 });
  d.mark({ type: 'npc', x: 9, y: 15, id: DOJO_MASTER });
  d.mark({ type: 'chest', x: 6, y: 12, id: 'c4' });
  d.mark({ type: 'sign', x: 16, y: 20, id: 'dojo' });

  // Training grounds: an open yard with sparring bugs and two puzzle chests.
  d.fill(theme.floor, 3, 29, 15, 10);
  d.line('F', 3, 29, 8, 29).line('F', 12, 40, 17, 40);
  d.put(3, 29, 'l').put(17, 29, 'l').put(4, 39, 'b').put(16, 39, 'b');
  d.mark({ type: 'checkpoint', x: 9, y: 26, id: 'dojo' });
  d.mark({ type: 'npc', x: 4, y: 31, id: DOJO_ASSISTANT });
  d.mark({ type: 'chest', x: 15, y: 34, id: 'c5' });
  d.mark({ type: 'chest', x: 5, y: 38, id: 'c6' });
  d.mark({ type: 'sign', x: 16, y: 28, id: 'training' });

  // Entrance road, dojo path, and the path down to the training grounds. Drawn after the
  // courtyards so the path cuts through their floors instead of being overwritten.
  d.hroad(0, DOJO_DX + 1, 21, theme.road, 2);
  d.vroad(9, 8, 22, theme.road, 2);
  d.vroad(9, 22, 31, theme.road, 2);

  // Two sparring bugs in the courtyard, eight in the training grounds. They ask questions from
  // the whole Land, so the bigger map is also a practise field for every concept.
  for (const [x, y] of [[5, 18], [13, 18]]) d.mark({ type: 'monster', x, y, tier: 1, respawn: true });
  const yard: [number, number, 1 | 2 | 3][] = [
    [5, 33, 1],
    [8, 36, 1],
    [11, 30, 1],
    [14, 32, 2],
    [7, 39, 2],
    [13, 38, 2],
    [16, 36, 3],
    [4, 35, 3],
  ];
  for (const [x, y, tier] of yard) d.mark({ type: 'monster', x, y, tier, respawn: true });

  // New spawn, checkpoint and exit at the Land entrance.
  d.mark({ type: 'exit', x: 0, y: 21, w: 1, h: 2, id: 'world' });
  d.mark({ type: 'spawn', x: 3, y: 21 });
  d.mark({ type: 'checkpoint', x: 3, y: 24, id: 'start' });

  d.scatter(theme.props, 18, 11, { x: 2, y: 2, w: 16, h: 40 });
  return d;
}

function masterNpc(course: (typeof CRASH_COURSES)[keyof typeof CRASH_COURSES]): NpcDef {
  return {
    frame: DUNGEON.monk,
    first: [
      say(
        DUNGEON.monk,
        course.master,
        `I am ${course.master.en}, keeper of the ${course.dojo.en}. Word travels fast: a hero is coming to free this Land.`,
        `Je suis ${course.master.fr}, gardien du ${course.dojo.fr}. La nouvelle circule vite : un héros vient libérer cette Terre.`,
      ),
      say(
        DUNGEON.monk,
        course.master,
        'The guardian will test you with multiple choice, fill-in-the-blanks, ordering, bug hunts, commands, output prediction, riddles and code. Raw courage will not be enough.',
        'Le gardien te testera avec des choix multiples, des textes à trous, des remises en ordre, des chasses au bug, des commandes, des prédictions de sortie, des énigmes et du code. Le courage brut ne suffira pas.',
      ),
      say(
        DUNGEON.monk,
        course.master,
        `My crash course has ${course.modules.length} modules and drills every challenge of the Land. No heart, no point, no shame: here we train first, fight later.`,
        `Mon cours accéléré compte ${course.modules.length} modules et t’entraîne sur chaque défi de la Terre. Aucun cœur, aucun point, aucune honte : ici on s’entraîne d’abord, on combat ensuite.`,
      ),
      say(
        DUNGEON.monk,
        course.master,
        'Shall we begin?',
        'Commençons-nous ?',
      ),
    ],
    tips: [
      [
        say(
          DUNGEON.monk,
          course.master,
          'Each module follows a tier of the Land: foundations, core reflexes, applied practice, expert pitfalls, then the boss lab.',
          'Chaque module suit un palier de la Terre : fondations, réflexes du cœur, mise en pratique, pièges d’expert, puis le laboratoire du boss.',
        ),
      ],
      [
        say(
          DUNGEON.monk,
          course.master,
          'I remember the modules you finish. Come back between two fights, or after a Game Over, and we continue where we stopped.',
          'Je me souviens des modules que tu termines. Reviens entre deux combats, ou après un Game Over, et nous reprenons là où nous nous sommes arrêtés.',
        ),
      ],
      [
        say(
          DUNGEON.monk,
          course.master,
          'A missed answer here costs nothing but a little pride. Read the explanation, then ask me for the next drill.',
          'Une mauvaise réponse ici ne coûte qu’un peu d’orgueil. Lis l’explication, puis demande-moi le défi suivant.',
        ),
      ],
    ],
  };
}

function assistantNpc(course: (typeof CRASH_COURSES)[keyof typeof CRASH_COURSES]): NpcDef {
  return {
    frame: DUNGEON.villagerB,
    first: [
      say(
        DUNGEON.villagerB,
        course.assistant,
        `I am the ${course.assistant.en}. The master trained me on every trap of this Land; now I run the training grounds.`,
        `Je suis le ${course.assistant.fr}. Le maître m’a entraîné sur tous les pièges de cette Terre ; je dirige maintenant les terrains d’entraînement.`,
      ),
      say(
        DUNGEON.villagerB,
        course.assistant,
        'The bugs here ask questions from the whole Land: monsters, chests, shrines, everything. Touch one, answer, and no heart is lost if you miss.',
        'Les bugs ici posent des questions de toute la Terre : monstres, coffres, sanctuaires, tout. Touche-en un, réponds, et aucun cœur n’est perdu si tu te trompes.',
      ),
      say(
        DUNGEON.villagerB,
        course.assistant,
        'They come back after a short rest, so you can practise a concept until it stops being scary. That is the whole point of a dojo.',
        'Ils reviennent après un court repos, pour que tu puisses travailler un concept jusqu’à ce qu’il cesse de faire peur. C’est tout l’esprit d’un dojo.',
      ),
    ],
    tips: [
      [
        say(
          DUNGEON.villagerB,
          course.assistant,
          'Start with the master, then warm up here. A concept you can explain is a concept you can use.',
          'Commence avec le maître, puis échauffe-toi ici. Un concept que tu sais expliquer est un concept que tu sais utiliser.',
        ),
      ],
      [
        say(
          DUNGEON.villagerB,
          course.assistant,
          'If a bug asks something you have not seen, answer anyway: the explanation is the lesson.',
          'Si un bug te pose une question inédite, réponds quand même : l’explication est la leçon.',
        ),
      ],
      [
        say(
          DUNGEON.villagerB,
          course.assistant,
          'The chests behind me hold the Land’s puzzle questions. Ordering and code live there; come back when you feel ready.',
          'Les coffres derrière moi contiennent les questions-énigmes de la Terre. L’ordre et le code s’y trouvent ; reviens quand tu te sens prêt.',
        ),
      ],
    ],
  };
}

/**
 * Wraps a Land in the dojo experience: bigger map, new zones, master and sparring-bug NPCs,
 * and the dojo metadata the scene uses to start training.
 */
export function withDojo(base: LandContent, theme: DojoTheme): LandContent {
  const course = CRASH_COURSES[base.id];
  const zones = [
    ...base.zones.map((z) => ({ ...z, area: { ...z.area, x: z.area.x + DOJO_DX } })),
    {
      name: course.dojo,
      area: { x: 2, y: 8, w: 18, h: 17 },
      guide: DOJO_MASTER,
      tiers: [1, 2] as const,
    },
    {
      name: { en: 'the training grounds', fr: 'les terrains d’entraînement' },
      area: { x: 2, y: 26, w: 18, h: 18 },
      guide: DOJO_ASSISTANT,
      tiers: [1, 2, 3] as const,
    },
  ];

  return {
    ...base,
    draft: () => expandDraft(base.draft(), theme),
    dojo: { master: DOJO_MASTER, assistant: DOJO_ASSISTANT, course: base.id },
    npcs: {
      ...base.npcs,
      [DOJO_MASTER]: masterNpc(course),
      [DOJO_ASSISTANT]: assistantNpc(course),
    },
    zones: zones.map((z) => ({ ...z, tiers: [...z.tiers] })),
    signs: {
      ...base.signs,
      dojo: {
        en: 'Dojo → train with the master (no hearts lost)',
        fr: 'Dojo → entraînement avec le maître (aucun cœur perdu)',
      },
      training: {
        en: 'Training grounds → every concept of the Land, at your own pace',
        fr: 'Terrains d’entraînement → tout le programme de la Terre, à ton rythme',
      },
    },
  };
}
