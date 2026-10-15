import { LANDS } from '@shared/game';
import { TRACK_BY_ID } from '@shared/tracks';
import type { L } from '@shared/types';
import type { DialogueLine } from '../../store';
import { DUNGEON } from '../assets';
import { MapDraft } from '../mapBuilder';
import { SPEAKERS } from '../story';
import type { LandContent } from './types';

// Python Land · Pythonia: a jungle temple where indentation is law, and the Sunken Sanctum
// where the Indentation Serpent coils around a Crystal Shard.

const MOSSA: L = { en: 'Mossa the Temple Keeper', fr: 'Mossa la Gardienne du Temple' };
const SLICE: L = { en: 'Professor Slice', fr: 'Professeur Slice' };
const LISTCOMP: L = { en: 'Brother Listcomp', fr: 'Frère Listcomp' };
const DICTA: L = { en: 'Dicta the Explorer', fr: 'Dicta l’Exploratrice' };
const OLDDEF: L = { en: 'Old Def', fr: 'Vieux Def' };
const SERPENT = TRACK_BY_ID.python.boss;
const WORD = LANDS.python.spellWord;

const say = (portrait: number, speaker: L, en: string, fr: string): DialogueLine => ({ portrait, speaker, text: { en, fr } });
const narrate = (en: string, fr: string): DialogueLine => ({ text: { en, fr } });
const ada = (en: string, fr: string): DialogueLine => say(DUNGEON.princess, SPEAKERS.ADA, en, fr);

/** A ring of temple columns with a gap in the middle of each side. */
function colonnade(d: MapDraft, x: number, y: number, w: number, h: number) {
  const cx = x + Math.floor(w / 2);
  const cy = y + Math.floor(h / 2);
  for (let i = x; i < x + w; i += 2) {
    if (Math.abs(i - cx) <= 2) continue;
    d.put(i, y, 'C').put(i, y + h - 1, 'C');
  }
  for (let j = y; j < y + h; j += 2) {
    if (Math.abs(j - cy) <= 2) continue;
    d.put(x, j, 'C').put(x + w - 1, j, 'C');
  }
}

function draft(): MapDraft {
  const d = new MapDraft(64, 44, 'j');
  d.frame('P', 0, 0, 64, 44, 2);

  // West jungle and the entrance trail
  d.hroad(0, 17, 21, 'o');
  d.clear(0, 21, 2, 2);
  d.mark({ type: 'exit', x: 0, y: 21, w: 1, h: 2, id: 'world' });
  d.mark({ type: 'spawn', x: 3, y: 21 });
  d.mark({ type: 'checkpoint', x: 4, y: 24, id: 'start' });
  d.mark({ type: 'npc', x: 7, y: 19, id: 'mossa' });
  d.mark({ type: 'sign', x: 16, y: 19, id: 'temple' });

  // The river of the north, crossed by three plank bridges
  d.fill('g', 2, 10, 45, 2);
  d.fill('_', 12, 10, 2, 2).fill('_', 31, 10, 3, 2).fill('_', 42, 10, 2, 2);

  // Temple of Indentation: terraces nested four tiles deep, like blocks of code
  d.fill('o', 18, 12, 29, 20);
  d.vroad(31, 31, 34, 'o', 3);
  colonnade(d, 18, 12, 29, 20);
  colonnade(d, 22, 16, 21, 12);
  d.fill('g', 29, 17, 7, 2);
  d.put(28, 17, 'O').put(36, 17, 'O').put(26, 22, 'O').put(38, 22, 'O');
  d.mark({ type: 'shrine', x: 32, y: 20, id: '0' });
  d.mark({ type: 'checkpoint', x: 32, y: 25, id: 'temple' });
  d.mark({ type: 'npc', x: 36, y: 24, id: 'slice' });
  d.mark({ type: 'chest', x: 28, y: 24, id: 'c1' });

  // Garden of Lists, north of the river
  d.mark({ type: 'shrine', x: 24, y: 5, id: '1' });
  d.mark({ type: 'chest', x: 44, y: 4, id: 'c2' });
  d.mark({ type: 'npc', x: 28, y: 7, id: 'listcomp' });
  d.put(22, 4, 'O').put(26, 4, 'O');
  d.scatter(['P', 'P', 'e', 'R'], 16, 11, { x: 19, y: 2, w: 28, h: 8 });

  // Ruins of the Dict, south of the temple
  d.fill('o', 20, 35, 26, 6);
  d.line('w', 20, 34, 23, 34).line('w', 37, 34, 40, 34).line('w', 46, 36, 46, 40);
  d.put(27, 37, 'C').put(34, 39, 'C').put(40, 37, 'C');
  d.put(21, 36, 'O').put(45, 35, 'O');
  d.mark({ type: 'shrine', x: 24, y: 38, id: '2' });
  d.mark({ type: 'chest', x: 44, y: 38, id: 'c3' });
  d.mark({ type: 'npc', x: 30, y: 36, id: 'dicta' });

  // The Sunken Sanctum: a moat of green water and the sealed gate at the end of the bridge
  d.fill('o', 49, 8, 7, 28);
  d.fill('g', 56, 0, 6, 44);
  d.clear(56, 0, 6, 44);
  d.fill('_', 56, 21, 4, 2);
  d.put(60, 20, 'W').put(60, 21, 'G').put(60, 22, 'G').put(60, 23, 'W');
  d.put(49, 9, 'O').put(55, 9, 'O').put(49, 34, 'O').put(55, 34, 'O').put(55, 19, 'O').put(55, 24, 'O');
  d.put(50, 14, 'C').put(54, 14, 'C').put(50, 29, 'C').put(54, 29, 'C');
  d.mark({ type: 'bossGate', x: 60, y: 21, h: 2 });
  d.mark({ type: 'checkpoint', x: 52, y: 25, id: 'sanctum' });
  d.mark({ type: 'npc', x: 51, y: 18, id: 'olddef' });
  d.mark({ type: 'sign', x: 47, y: 19, id: 'sanctum' });

  // Bugs slithering everywhere
  for (const [x, y] of [[8, 13], [12, 27], [14, 16], [6, 33], [20, 25], [44, 18]]) d.mark({ type: 'monster', x, y, tier: 1 });
  for (const [x, y] of [[36, 4], [40, 7], [18, 6], [26, 39], [38, 38], [41, 36]]) d.mark({ type: 'monster', x, y, tier: 2 });
  for (const [x, y] of [[52, 12], [53, 31], [50, 27], [54, 17]]) d.mark({ type: 'monster', x, y, tier: 3 });

  d.scatter(['P', 'P', 'e', 'R', 'e'], 45, 7, { x: 2, y: 2, w: 15, h: 40 });
  d.scatter(['P', 'e', 'e'], 12, 21, { x: 47, y: 2, w: 9, h: 40 });
  return d;
}

function arena(): MapDraft {
  const d = new MapDraft(28, 16, 'o');
  d.fill('g', 0, 0, 28, 5);
  d.line('C', 0, 15, 27, 15);
  d.line('C', 0, 5, 0, 14).line('C', 27, 5, 27, 14);
  d.put(1, 5, 'O').put(26, 5, 'O').put(1, 14, 'O').put(26, 14, 'O');
  d.mark({ type: 'spawn', x: 13, y: 12 });
  return d;
}

export const pythonLand: LandContent = {
  id: 'python',
  music: { scene: 'enigma', intensity: 0.35 },
  grade: (cam) => {
    const fx = cam.postFX?.addColorMatrix();
    fx?.saturate(0.2);
    cam.postFX?.addVignette(0.5, 0.5, 0.9, 0.45);
  },
  draft,
  npcs: {
    mossa: {
      frame: DUNGEON.villagerA,
      first: [
        say(DUNGEON.villagerA, MOSSA, 'Shh… walk softly, traveler. This is Pythonia, where the temple stones are laid four spaces deep, never more, never less.', 'Chut… marche doucement, voyageur. Voici Pythonia, où les pierres du temple sont posées à quatre espaces de profondeur, jamais plus, jamais moins.'),
        say(DUNGEON.villagerA, MOSSA, 'In Python, there are no curly braces. Indentation IS the block: everything indented under an `if:` or a `def:` belongs to it.', 'En Python, il n’y a pas d’accolades. L’indentation EST le bloc : tout ce qui est indenté sous un `if:` ou un `def:` lui appartient.'),
        say(DUNGEON.villagerA, MOSSA, 'But the Indentation Serpent swallowed the Crystal Shard and now mixes tabs and spaces everywhere. Nothing lines up anymore!', 'Mais le Serpent de l’Indentation a avalé l’Éclat du Cristal et mélange maintenant tabulations et espaces partout. Plus rien ne s’aligne !'),
        say(DUNGEON.villagerA, MOSSA, 'It hides in the Sunken Sanctum, east of the temple. Princess Ada left three letters in our shrines: one in the temple, one in the Garden of Lists across the river, one in the Ruins of the Dict.', 'Il se cache dans le Sanctuaire Englouti, à l’est du temple. La Princesse Ada a laissé trois lettres dans nos sanctuaires : un dans le temple, un dans le Jardin des Listes de l’autre côté de la rivière, un dans les Ruines du Dict.'),
      ],
      tips: [
        [say(DUNGEON.villagerA, MOSSA, 'Python guesses the type from the value: `x = 5` is an int, `x = "5"` a str. Ask with `type(x)` when in doubt.', 'Python devine le type d’après la valeur : `x = 5` est un int, `x = "5"` une str. Demande avec `type(x)` en cas de doute.')],
        [say(DUNGEON.villagerA, MOSSA, 'Want to mix text and values? Use an f-string: `f"Hello {name}, you are {age}"`.', 'Tu veux mêler texte et valeurs ? Utilise une f-string : `f"Bonjour {name}, tu as {age} ans"`.')],
        [say(DUNGEON.villagerA, MOSSA, 'The shrines glow green. Chests hide coding puzzles worth lots of points.', 'Les sanctuaires brillent en vert. Les coffres cachent des énigmes de code qui rapportent beaucoup de points.')],
      ],
    },
    slice: {
      frame: DUNGEON.villagerB,
      first: [
        say(DUNGEON.villagerB, SLICE, 'Ah, a student! Lists start counting at 0. `fruits[0]` is the first, and `fruits[-1]`… the last! Negative indices count from the end.', 'Ah, un élève ! Les listes comptent à partir de 0. `fruits[0]` est le premier, et `fruits[-1]`… le dernier ! Les indices négatifs comptent depuis la fin.'),
        say(DUNGEON.villagerB, SLICE, 'Slices take a range: `word[1:4]` goes from index 1 up to, but NOT including, 4. And `word[::-1]` reverses the whole thing!', 'Les tranches prennent un intervalle : `word[1:4]` va de l’indice 1 jusqu’à 4, mais SANS l’inclure. Et `word[::-1]` inverse tout !'),
      ],
      tips: [
        [say(DUNGEON.villagerB, SLICE, 'A slice never raises an IndexError: `[1, 2][5:9]` is simply `[]`. A single index out of range, though… boom.', 'Une tranche ne lève jamais d’IndexError : `[1, 2][5:9]` vaut simplement `[]`. Un indice seul hors limites, par contre… boum.')],
        [say(DUNGEON.villagerB, SLICE, 'The temple shrine glows by the sacred pool, right in the middle of the terraces.', 'Le sanctuaire du temple brille près du bassin sacré, au centre des terrasses.')],
      ],
    },
    listcomp: {
      frame: DUNGEON.monk,
      first: [
        say(DUNGEON.monk, LISTCOMP, 'Peace, seeker. Why write four lines of loop when one comprehension will do? `squares = [n * n for n in range(5)]`.', 'Paix, chercheur. Pourquoi écrire quatre lignes de boucle quand une compréhension suffit ? `squares = [n * n for n in range(5)]`.'),
        say(DUNGEON.monk, LISTCOMP, 'Add a condition at the end to keep only what you need: `[n for n in nums if n % 2 == 0]` keeps the even ones.', 'Ajoute une condition à la fin pour ne garder que l’essentiel : `[n for n in nums if n % 2 == 0]` garde les pairs.'),
      ],
      tips: [
        [say(DUNGEON.monk, LISTCOMP, '`range(5)` gives 0, 1, 2, 3, 4. Five numbers, but 5 itself is never reached. Like enlightenment.', '`range(5)` donne 0, 1, 2, 3, 4. Cinq nombres, mais 5 lui-même n’est jamais atteint. Comme l’illumination.')],
        [say(DUNGEON.monk, LISTCOMP, 'A `set` keeps each value only once: `set([1, 1, 2])` is `{1, 2}`. Meditate on it.', 'Un `set` ne garde chaque valeur qu’une fois : `set([1, 1, 2])` vaut `{1, 2}`. Médite là-dessus.')],
      ],
    },
    dicta: {
      frame: DUNGEON.ranger,
      first: [
        say(DUNGEON.ranger, DICTA, 'These ruins were a giant dictionary once! Every door had a key, every key opened exactly one value: `{"door": "treasure"}`.', 'Ces ruines étaient autrefois un dictionnaire géant ! Chaque porte avait une clé, chaque clé ouvrait exactement une valeur : `{"door": "treasure"}`.'),
        say(DUNGEON.ranger, DICTA, 'Asking for a missing key raises a KeyError. Explorers use `.get("key", default)` instead, it never bites.', 'Demander une clé absente lève une KeyError. Les explorateurs utilisent plutôt `.get("key", default)`, ça ne mord jamais.'),
      ],
      tips: [
        [say(DUNGEON.ranger, DICTA, 'Loop over keys AND values at once with `for key, value in d.items():`.', 'Parcours les clés ET les valeurs à la fois avec `for key, value in d.items():`.')],
        [say(DUNGEON.ranger, DICTA, 'When something can fail, wrap it in `try:` … `except KeyError:`. Catch the precise error, never everything.', 'Quand quelque chose peut échouer, entoure-le de `try:` … `except KeyError:`. Attrape l’erreur précise, jamais tout.')],
      ],
    },
    olddef: {
      frame: DUNGEON.villagerC,
      first: [
        say(DUNGEON.villagerC, OLDDEF, 'Hmph. I am Old Def. I have defined functions since before you were `None`. A function without `return` gives back `None`, remember that.', 'Hmpf. Je suis Vieux Def. Je définis des fonctions depuis avant que tu ne sois `None`. Une fonction sans `return` renvoie `None`, souviens-t’en.'),
        say(DUNGEON.villagerC, OLDDEF, 'The Serpent coils behind the gate across the moat. It spits tab characters in long rows: find the gap and slip through!', 'Le Serpent est lové derrière la porte, de l’autre côté des douves. Il crache des tabulations en longues rangées : trouve la brèche et faufile-toi !'),
      ],
      tips: [
        [say(DUNGEON.villagerC, OLDDEF, 'Never write `def add(item, bag=[])`. That list is created ONCE and shared by every call. Use `bag=None` and create it inside.', 'N’écris jamais `def add(item, bag=[])`. Cette liste est créée UNE fois et partagée par tous les appels. Utilise `bag=None` et crée-la à l’intérieur.')],
        [say(DUNGEON.villagerC, OLDDEF, 'Touch the flag here before facing the Serpent. If it swallows you, you will wake up right there.', 'Touche le drapeau ici avant d’affronter le Serpent. S’il t’avale, tu te réveilleras juste là.')],
      ],
    },
  },
  monsters: {
    1: { frame: DUNGEON.slime, name: { en: 'None Slime', fr: 'Slime None' }, speed: 26 },
    2: { frame: DUNGEON.spider, name: { en: 'Tab Spider', fr: 'Araignée Tabulation' }, speed: 38 },
    3: { frame: DUNGEON.ghost, name: { en: 'Traceback Specter', fr: 'Spectre Traceback' }, speed: 44, tint: 0xa8ff9c },
  },
  signs: {
    temple: { en: 'Temple of Indentation → four spaces, no tabs', fr: 'Temple de l’Indentation → quatre espaces, pas de tabulations' },
    sanctum: { en: 'Sunken Sanctum → (danger: Serpent)', fr: 'Sanctuaire Englouti → (danger : Serpent)' },
  },
  story: {
    intro: [
      narrate('Pythonia, the jungle temple. For centuries its stones stood in perfect rows, each block indented exactly four spaces…', 'Pythonia, le temple de la jungle. Pendant des siècles, ses pierres se sont dressées en rangées parfaites, chaque bloc indenté d’exactement quatre espaces…'),
      narrate('…until the Indentation Serpent slid out of the Sunken Sanctum and swallowed a Crystal Shard.', '…jusqu’à ce que le Serpent de l’Indentation sorte du Sanctuaire Englouti et avale un Éclat du Cristal.'),
      narrate('Find the temple keeper. She will know what to do.', 'Trouve la gardienne du temple. Elle saura quoi faire.'),
    ],
    shrineIntro: [
      narrate('A mossy shrine glows green between the vines. A calm voice asks an enigma. Answer it to open the sealed letter.', 'Un sanctuaire moussu brille en vert entre les lianes. Une voix calme pose une énigme. Résous-la pour ouvrir la lettre scellée.'),
    ],
    letters: [
      [
        narrate('The shrine opens. Inside, a letter sealed with a tiny crown…', 'Le sanctuaire s’ouvre. À l’intérieur, une lettre scellée d’une petite couronne…'),
        ada('"Python says: readability counts. Bugmancer hates that. Every line you write clearly, every name you choose well, is a little light he cannot stand."', '« Python le dit : la lisibilité compte. Bugmancer déteste ça. Chaque ligne écrite clairement, chaque nom bien choisi est une petite lumière qu’il ne supporte pas. »'),
      ],
      [
        narrate('Another letter, tucked under a stone tablet…', 'Une autre lettre, glissée sous une tablette de pierre…'),
        ada('"The Serpent wants every block to lose its shape. It fires rows of tabs. Watch the rows: there is always a gap, and it always falls on a multiple of four."', '« Le Serpent veut que chaque bloc perde sa forme. Il tire des rangées de tabulations. Observe-les : il y a toujours une brèche, et elle tombe toujours sur un multiple de quatre. »'),
      ],
      [
        narrate('The last letter glows as you unfold it.', 'La dernière lettre brille quand tu la déplies.'),
        ada(
          `"Another word of the Restore Spell is ${WORD.en}. One small word that brings a whole library to life. Keep it close, and hurry: Bugmancer grows stronger every night."`,
          `« Un autre mot du Sort de Restauration est ${WORD.fr}. Un petit mot qui donne vie à toute une bibliothèque. Garde-le précieusement, et dépêche-toi : Bugmancer se renforce chaque nuit. »`,
        ),
      ],
    ],
    gateSealed: (found) => [
      narrate(`The gate of the Sunken Sanctum is sealed by three locks of light. Ada's letters found: ${found}/3.`, `La porte du Sanctuaire Englouti est scellée par trois verrous de lumière. Lettres d’Ada trouvées : ${found}/3.`),
    ],
    gateOpened: [
      narrate('Far to the east, the seal of the Sunken Sanctum cracks and sinks into the green water. The Serpent\'s gate is open!', 'Loin à l’est, le sceau du Sanctuaire Englouti se fissure et sombre dans l’eau verte. La porte du Serpent est ouverte !'),
    ],
    bossIntro: [
      narrate('The water ripples. Coils of misaligned code rise from the sacred pool…', 'L’eau frémit. Des anneaux de code mal aligné s’élèvent du bassin sacré…'),
      { portrait: DUNGEON.slime, speaker: SERPENT.name, text: { en: 'Sssso, you read her letters. Two spaces, three, a tab… who cares? Let me mix up YOUR blocks!', fr: 'Ssssi tu as lu ses lettres. Deux espaces, trois, une tabulation… qui s’en soucie ? Laisse-moi mélanger TES blocs !' } },
    ],
    bossHint: [
      narrate('Dodge the tabs with the arrow keys and slip through the gaps in their rows. When a green rune appears on the floor, step on it and answer to strike the Serpent!', 'Esquive les tabulations avec les flèches et faufile-toi dans les brèches de leurs rangées. Quand une rune verte apparaît au sol, marche dessus et réponds pour frapper le Serpent !'),
    ],
    victory: [
      narrate('The Serpent uncoils, every scale snapping back into a neat four-space row. The Crystal Shard glows in your hands!', 'Le Serpent se déroule, chaque écaille reprenant sa place dans une rangée nette de quatre espaces. L’Éclat du Cristal brille entre tes mains !'),
      narrate(`Key Shard of Python obtained ✦ Spell word: ${WORD.en}`, `Éclat-clé de Python obtenu ✦ Mot du sort : ${WORD.fr}`),
      ada('{name}…? I can hear you through the shard! Another seal is broken. Keep going, I believe in you!', '{name}… ? Je t’entends à travers l’éclat ! Un autre sceau est brisé. Continue, je crois en toi !'),
    ],
    afterVictory: [
      say(DUNGEON.villagerA, MOSSA, 'The stones line up again, four spaces deep! Pythonia is free. On the map, the portals of Java Land and AI Land have opened.', 'Les pierres s’alignent à nouveau, à quatre espaces ! Pythonia est libre. Sur la carte, les portails de la Terre Java et de la Terre IA se sont ouverts.'),
    ],
    gateCleared: [narrate('Only still green water remains beyond the gate. The guardian is gone.', 'Seule une eau verte et calme reste derrière la porte. Le gardien n’est plus.')],
  },
  boss: {
    frame: DUNGEON.slime,
    texture: 'serpent',
    tint: 0xffffff,
    scale: 4,
    arena,
    projectile: 'tabBolt',
    projectileTint: 0xffffff,
    movement: 'slither',
    attacks: { 1: ['fan', 'wall'], 2: ['wall', 'fan', 'fan'], 3: ['wall', 'ring', 'fan'] },
  },
};
