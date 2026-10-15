import type { L } from '@shared/types';
import type { DialogueLine } from '../store';
import { DUNGEON } from './assets';

// The Legend of Bytaria: the prologue, Hello World Village and the world map.
// "{name}" is replaced by the player's username.

const GRANDMA: L = { en: 'Grandma Compile', fr: 'Mamie Compile' };
const ADA: L = { en: 'Princess Ada', fr: 'Princesse Ada' };

export const SPEAKERS = { GRANDMA, ADA };

export const PROLOGUE: DialogueLine[] = [
  {
    text: {
      en: 'Long ago, the Kingdom of Bytaria ran on the Source Crystal. Every program, every loop, every lamp in every Land drew its power from it.',
      fr: "Il y a longtemps, le Royaume de Bytaria fonctionnait grâce au Cristal Source. Chaque programme, chaque boucle, chaque lampe de chaque Terre puisait en lui son énergie.",
    },
  },
  {
    text: {
      en: 'One stormy night, the sorcerer Lord Bugmancer shattered the Crystal into ten shards… and kidnapped Princess Ada, the only one who knows how to rebuild it.',
      fr: "Par une nuit d'orage, le sorcier Lord Bugmancer brisa le Cristal en dix éclats… et enleva la Princesse Ada, la seule à savoir le reconstruire.",
    },
  },
  {
    portrait: DUNGEON.princess,
    speaker: ADA,
    text: { en: 'Help! Someone… anyone who can code… please!', fr: "À l'aide ! Quelqu'un… n'importe qui sachant coder… je vous en prie !" },
  },
  {
    text: {
      en: 'Bugmancer locked her in the Kernel Citadel behind ten seals. Each shard fell into one Land and corrupted its guardian into a monster.',
      fr: 'Bugmancer l’enferma dans la Citadelle du Noyau derrière dix sceaux. Chaque éclat tomba dans une Terre et corrompit son gardien en monstre.',
    },
  },
  {
    text: {
      en: 'Far away, in a tiny village, a beginner has just printed their very first line of code…',
      fr: 'Loin de là, dans un petit village, un débutant vient d’afficher sa toute première ligne de code…',
    },
  },
];

export const GRANDMA_TUTORIAL: DialogueLine[] = [
  {
    portrait: DUNGEON.grandma,
    speaker: GRANDMA,
    text: {
      en: '{name}! You just printed "Hello, World!", didn\'t you? I felt it in my bones. Perfect timing.',
      fr: '{name} ! Tu viens d’afficher « Hello, World! », n’est-ce pas ? Je l’ai senti dans mes os. Ça tombe à pic.',
    },
  },
  {
    portrait: DUNGEON.grandma,
    speaker: GRANDMA,
    text: {
      en: 'The Princess is gone and the Lands are crawling with bugs. Take this blinking cursor. It is not much of a sword, but in the right hands it can fix anything.',
      fr: 'La Princesse a disparu et les Terres grouillent de bugs. Prends ce curseur clignotant. Ce n’est pas une grande épée, mais entre de bonnes mains il peut tout réparer.',
    },
  },
  {
    portrait: DUNGEON.grandma,
    speaker: GRANDMA,
    text: {
      en: 'Walk with the arrow keys (or WASD, ZQSD, a gamepad). Press SPACE to talk, open chests and read shrines.',
      fr: 'Marche avec les flèches (ou ZQSD, WASD, une manette). Appuie sur ESPACE pour parler, ouvrir les coffres et lire les sanctuaires.',
    },
  },
  {
    portrait: DUNGEON.grandma,
    speaker: GRANDMA,
    text: {
      en: 'Monsters are bugs. Touch one and you must answer its challenge to squash it. A wrong answer costs a heart and 50 points.',
      fr: 'Les monstres sont des bugs. Touche-en un et tu devras relever son défi pour l’écraser. Une mauvaise réponse coûte un cœur et 50 points.',
    },
  },
  {
    portrait: DUNGEON.grandma,
    speaker: GRANDMA,
    text: {
      en: 'Lose all your hearts and it is GAME OVER: you wake up at the last checkpoint flag and lose a fifth of that Land\'s points. Every 5,000 points earns you an extra heart.',
      fr: 'Perds tous tes cœurs et c’est GAME OVER : tu te réveilles au dernier drapeau de contrôle et tu perds un cinquième des points de cette Terre. Tous les 5 000 points, tu gagnes un cœur bonus.',
    },
  },
  {
    portrait: DUNGEON.grandma,
    speaker: GRANDMA,
    text: {
      en: 'Leave by the north road to reach the map of Bytaria. Start with JS Land, Python Land or Linux Land. Ada is counting on you, little one.',
      fr: 'Pars par la route du nord pour rejoindre la carte de Bytaria. Commence par la Terre JS, la Terre Python ou la Terre Linux. Ada compte sur toi, mon petit.',
    },
  },
];

export const GRANDMA_TIPS: DialogueLine[][] = [
  [
    {
      portrait: DUNGEON.grandma,
      speaker: GRANDMA,
      text: {
        en: 'Read the explanation after every answer, right or wrong. That is where the real treasure is.',
        fr: 'Lis l’explication après chaque réponse, juste ou fausse. C’est là qu’est le vrai trésor.',
      },
    },
  ],
  [
    {
      portrait: DUNGEON.grandma,
      speaker: GRANDMA,
      text: {
        en: 'Shrines hide Ada\'s letters. Find the three letters of a Land and its guardian\'s gate will open.',
        fr: 'Les sanctuaires cachent les lettres d’Ada. Trouve les trois lettres d’une Terre et la porte de son gardien s’ouvrira.',
      },
    },
  ],
  [
    {
      portrait: DUNGEON.grandma,
      speaker: GRANDMA,
      text: {
        en: 'Touch the checkpoint flags! If you fall, that is where you will wake up.',
        fr: 'Touche les drapeaux de contrôle ! Si tu tombes, c’est là que tu te réveilleras.',
      },
    },
  ],
  [
    {
      portrait: DUNGEON.grandma,
      speaker: GRANDMA,
      text: {
        en: 'In a boss fight, dodge the projectiles and step on the glowing runes to strike.',
        fr: 'Pendant un combat de boss, esquive les projectiles et marche sur les runes lumineuses pour frapper.',
      },
    },
  ],
];

export const VILLAGERS = {
  printf: {
    frame: DUNGEON.villagerB,
    lines: [
      [
        {
          portrait: DUNGEON.villagerB,
          speaker: { en: 'Old Printf', fr: 'Vieux Printf' },
          text: {
            en: 'In my day we debugged with print statements. …We still do, actually. console.log never lets you down.',
            fr: 'De mon temps, on déboguait avec des print. …On le fait encore, en fait. console.log ne te laisse jamais tomber.',
          },
        },
      ],
      [
        {
          portrait: DUNGEON.villagerB,
          speaker: { en: 'Old Printf', fr: 'Vieux Printf' },
          text: {
            en: 'A bug you can reproduce is a bug half fixed. Remember that, young one.',
            fr: 'Un bug qu’on sait reproduire est un bug à moitié corrigé. Souviens-t’en, jeunot.',
          },
        },
      ],
    ] as DialogueLine[][],
  },
  loop: {
    frame: DUNGEON.villagerC,
    lines: [
      [
        {
          portrait: DUNGEON.villagerC,
          speaker: { en: 'Little Loop', fr: 'Petite Boucle' },
          text: {
            en: 'I ran around the well 10 times! Or was it 11? I always end up off by one…',
            fr: "J'ai fait 10 fois le tour du puits ! Ou 11 ? Je me trompe toujours d'un…",
          },
        },
      ],
      [
        {
          portrait: DUNGEON.villagerC,
          speaker: { en: 'Little Loop', fr: 'Petite Boucle' },
          text: {
            en: 'Mom says if I never change my condition, I will loop forever. Is that bad?',
            fr: 'Maman dit que si je ne change jamais ma condition, je vais boucler pour toujours. C’est grave ?',
          },
        },
      ],
    ] as DialogueLine[][],
  },
  keeper: {
    frame: DUNGEON.viking,
    lines: [
      [
        {
          portrait: DUNGEON.viking,
          speaker: { en: 'Brakka, Arena Keeper', fr: "Brakka, gardienne de l'Arène" },
          text: {
            en: 'This is the Arena of Champions! Soon you will duel the computer here… or coders from all over the world. The gates open in a coming update!',
            fr: "Voici l'Arène des Champions ! Bientôt tu pourras y affronter l'ordinateur… ou des codeurs du monde entier. Les portes ouvrent dans une prochaine mise à jour !",
          },
        },
      ],
    ] as DialogueLine[][],
  },
};

export const SIGNS: Record<string, L> = {
  north: { en: '↑ North road: the map of Bytaria', fr: '↑ Route du nord : la carte de Bytaria' },
  village: { en: 'Hello World Village · population: 1 + you', fr: 'Village Hello World · population : 1 + toi' },
  arena: { en: 'Arena of Champions · opening soon', fr: 'Arène des Champions · ouverture prochaine' },
};

export const WORLD_INTRO: DialogueLine[] = [
  {
    text: {
      en: 'This is Bytaria. Ten Lands, ten seals, and at the top, the Kernel Citadel where Ada is held.',
      fr: 'Voici Bytaria. Dix Terres, dix sceaux, et tout en haut, la Citadelle du Noyau où Ada est retenue.',
    },
  },
  {
    text: {
      en: 'Walk to a glowing portal and press SPACE to enter a Land. Three are open: JS Land, Python Land and Linux Land. Defeating a guardian opens the portals next to it.',
      fr: 'Marche jusqu’à un portail lumineux et appuie sur ESPACE pour entrer dans une Terre. Trois sont ouvertes : la Terre JS, la Terre Python et la Terre Linux. Vaincre un gardien ouvre les portails voisins.',
    },
  },
];

export const WORLD_TEXT = {
  fog: {
    en: 'A thick fog of unfinished code covers this Land. Its story arrives in a coming update. For now, JS Land awaits you!',
    fr: 'Un épais brouillard de code inachevé recouvre cette Terre. Son histoire arrive dans une prochaine mise à jour. Pour l’instant, la Terre JS t’attend !',
  },
  sealed: { en: 'Sealed. Defeat the guardian of: ', fr: 'Scellé. Bats d’abord le gardien de : ' },
  citadel: {
    en: 'The Kernel Citadel. Ten locks of light keep its gate shut. Keys collected: ',
    fr: 'La Citadelle du Noyau. Dix verrous de lumière gardent sa porte close. Clés obtenues : ',
  },
  village: { en: 'Back to Hello World Village', fr: 'Retour au Village Hello World' },
} satisfies Record<string, L>;
