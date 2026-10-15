import { TRACK_BY_ID } from '@shared/tracks';
import type { L } from '@shared/types';
import type { DialogueLine } from '../../store';
import { DUNGEON } from '../assets';
import { MapDraft } from '../mapBuilder';
import { SPEAKERS } from '../story';
import type { LandContent } from './types';

// JS Land · Scriptopolis: the neon city that never blocks, and the Async Harbor where the
// Callback Kraken swallowed the first Crystal Shard.

const LUMI: L = { en: 'Lumi the Lamplighter', fr: 'Lumi l’Allumeuse' };
const HOISTER: L = { en: 'Old Hoister', fr: 'Vieux Hoister' };
const NAN: L = { en: 'Kid NaN', fr: 'Petit NaN' };
const PROMISE: L = { en: 'Promise the Merchant', fr: 'Promise la Marchande' };
const CLOSURE: L = { en: 'Captain Closure', fr: 'Capitaine Closure' };
const KRAKEN = TRACK_BY_ID.javascript.boss;

const say = (portrait: number, speaker: L, en: string, fr: string): DialogueLine => ({ portrait, speaker, text: { en, fr } });
const narrate = (en: string, fr: string): DialogueLine => ({ text: { en, fr } });
const ada = (en: string, fr: string): DialogueLine => say(DUNGEON.princess, SPEAKERS.ADA, en, fr);

function draft(): MapDraft {
  const d = new MapDraft(64, 44);
  d.frame('T', 0, 0, 64, 44, 2);

  // West outskirts and the entrance road
  d.hroad(0, 18, 21);
  d.clear(0, 21, 2, 2);
  d.fill(',', 3, 4, 6, 4).fill(',', 9, 33, 5, 4);
  d.mark({ type: 'exit', x: 0, y: 21, w: 1, h: 2, id: 'world' });
  d.mark({ type: 'spawn', x: 3, y: 21 });
  d.mark({ type: 'checkpoint', x: 4, y: 24, id: 'start' });
  d.mark({ type: 'npc', x: 7, y: 19, id: 'lumi' });
  d.mark({ type: 'sign', x: 16, y: 19, id: 'city' });

  // Scriptopolis: neon avenues, plaza and city fences
  d.fill('#', 18, 21, 31, 2);
  d.fill('#', 32, 3, 2, 39);
  d.fill('#', 20, 13, 12, 2).fill('#', 34, 13, 12, 2);
  d.fill('#', 20, 29, 12, 2).fill('#', 34, 29, 12, 2);
  d.fill(':', 29, 18, 8, 8);
  d.line('f', 18, 3, 18, 20).line('f', 18, 23, 18, 41);
  d.line('f', 48, 3, 48, 20).line('f', 48, 23, 48, 41);

  // City blocks
  d.stamp(21, 17, 'houseRed').stamp(25, 17, 'houseGrey');
  d.stamp(37, 17, 'houseGrey').stamp(41, 17, 'houseRed');
  d.stamp(21, 24, 'shop').stamp(26, 24, 'houseRed');
  d.stamp(38, 24, 'houseGrey').stamp(42, 24, 'houseRed');
  for (const x of [20, 24, 28, 40, 44]) d.put(x, 20, 'L').put(x, 23, 'L');
  for (const y of [5, 9, 27, 34, 38]) d.put(31, y, 'L').put(34, y, 'L');
  d.mark({ type: 'shrine', x: 30, y: 19, id: '0' });
  d.mark({ type: 'checkpoint', x: 35, y: 24, id: 'plaza' });
  d.mark({ type: 'npc', x: 30, y: 24, id: 'hoister' });
  d.mark({ type: 'chest', x: 30, y: 27, id: 'c1' });

  // North park
  d.fill('~', 40, 4, 5, 3);
  d.fill(',', 21, 8, 4, 3).fill(',', 36, 9, 3, 2);
  d.mark({ type: 'shrine', x: 23, y: 5, id: '1' });
  d.mark({ type: 'chest', x: 44, y: 10, id: 'c2' });
  d.mark({ type: 'npc', x: 28, y: 8, id: 'kidnan' });
  d.scatter(['T', 't', 'B', 'Y'], 16, 11, { x: 20, y: 3, w: 26, h: 9 });

  // South market
  for (const x of [21, 22, 23, 36, 37]) d.put(x, 33, 'b');
  d.put(27, 33, 'l').put(28, 33, 'l').put(40, 36, 'h').put(41, 36, 'h');
  d.fill(',', 35, 39, 4, 2);
  d.mark({ type: 'shrine', x: 24, y: 38, id: '2' });
  d.mark({ type: 'chest', x: 44, y: 38, id: 'c3' });
  d.mark({ type: 'npc', x: 30, y: 34, id: 'promise' });

  // Async Harbor: docks, sea, and the sealed gate at the end of the pier
  d.fill('_', 49, 8, 7, 28);
  d.fill('~', 56, 0, 6, 44);
  d.clear(56, 0, 6, 44);
  d.fill('_', 56, 21, 4, 2);
  d.put(60, 20, 'W').put(60, 21, 'G').put(60, 22, 'G').put(60, 23, 'W');
  d.put(50, 10, 'b').put(54, 30, 'b').put(54, 11, 'l');
  d.mark({ type: 'bossGate', x: 60, y: 21, h: 2 });
  d.mark({ type: 'checkpoint', x: 52, y: 25, id: 'harbor' });
  d.mark({ type: 'npc', x: 51, y: 18, id: 'closure' });
  d.mark({ type: 'sign', x: 47, y: 19, id: 'harbor' });

  // Bugs crawling everywhere
  for (const [x, y] of [[8, 13], [12, 27], [14, 16], [6, 32], [25, 22], [45, 21]]) d.mark({ type: 'monster', x, y, tier: 1 });
  for (const [x, y] of [[26, 10], [37, 7], [42, 9], [26, 36], [38, 38], [41, 33]]) d.mark({ type: 'monster', x, y, tier: 2 });
  for (const [x, y] of [[52, 12], [53, 31], [50, 28], [54, 22]]) d.mark({ type: 'monster', x, y, tier: 3 });

  d.scatter(['T', 'T', 't', 'Y', 'B', 'm'], 45, 7, { x: 2, y: 2, w: 15, h: 40 });
  return d;
}

function arena(): MapDraft {
  const d = new MapDraft(28, 16, '_');
  d.fill('~', 0, 0, 28, 5);
  d.line('F', 0, 15, 27, 15);
  d.line('f', 0, 5, 0, 14).line('f', 27, 5, 27, 14);
  d.put(1, 5, 'b').put(26, 5, 'b').put(1, 14, 'l').put(26, 14, 'l');
  d.mark({ type: 'spawn', x: 13, y: 12 });
  return d;
}

export const javascriptLand: LandContent = {
  id: 'javascript',
  music: { scene: 'puzzle', intensity: 0.35 },
  grade: (cam) => {
    const fx = cam.postFX?.addColorMatrix();
    fx?.saturate(0.25);
    cam.postFX?.addVignette(0.5, 0.5, 0.95, 0.35);
  },
  draft,
  npcs: {
    lumi: {
      frame: DUNGEON.villagerA,
      first: [
        say(DUNGEON.villagerA, LUMI, 'A traveler! Thank the event loop. I am Lumi, I keep the lamps of Scriptopolis lit.', 'Un voyageur ! Merci la boucle d’événements. Je suis Lumi, j’entretiens les lampes de Scriptopolis.'),
        say(DUNGEON.villagerA, LUMI, 'Since the Callback Kraken swallowed the Crystal Shard, promises break, callbacks nest forever and bugs crawl out of every stack trace.', 'Depuis que le Kraken des Callbacks a avalé l’Éclat du Cristal, les promesses se brisent, les callbacks s’imbriquent sans fin et des bugs sortent de chaque pile d’appels.'),
        say(DUNGEON.villagerA, LUMI, 'The Kraken hides in the Async Harbor, east of the city, behind a sealed gate. The seal breaks only if you find the three letters Princess Ada hid in our shrines.', 'Le Kraken se cache dans le Port Asynchrone, à l’est de la ville, derrière une porte scellée. Le sceau ne cède que si tu trouves les trois lettres que la Princesse Ada a cachées dans nos sanctuaires.'),
        say(DUNGEON.villagerA, LUMI, 'One shrine is on the central plaza, one in the north park, one in the south market. Good luck, and mind the bugs: they bite!', 'Un sanctuaire est sur la place centrale, un dans le parc au nord, un au marché du sud. Bonne chance, et attention aux bugs : ils mordent !'),
      ],
      tips: [
        [say(DUNGEON.villagerA, LUMI, '`let` can change, `const` cannot be reassigned. Choose `const` by default: fewer surprises, fewer bugs.', '`let` peut changer, `const` ne peut pas être réassignée. Choisis `const` par défaut : moins de surprises, moins de bugs.')],
        [say(DUNGEON.villagerA, LUMI, 'Always compare with `===`. Its little brother `==` converts types behind your back: `"1" == 1` is true!', 'Compare toujours avec `===`. Son petit frère `==` convertit les types dans ton dos : `"1" == 1` vaut true !')],
        [say(DUNGEON.villagerA, LUMI, 'Lost? The shrines glow green. Chests hide coding puzzles worth lots of points.', 'Perdu ? Les sanctuaires brillent en vert. Les coffres cachent des énigmes de code qui rapportent beaucoup de points.')],
      ],
    },
    hoister: {
      frame: DUNGEON.villagerB,
      first: [
        say(DUNGEON.villagerB, HOISTER, 'Eh? You can use me before you even declare me! Well… `var` lets you. `let` and `const` will throw a ReferenceError at you.', 'Hein ? Tu peux m’utiliser avant même de me déclarer ! Enfin… `var` te le permet. `let` et `const` te lanceront une ReferenceError.'),
        say(DUNGEON.villagerB, HOISTER, 'That is hoisting, kid: declarations float to the top of their scope like old memories.', 'C’est le hissage (hoisting), petit : les déclarations remontent en haut de leur portée comme de vieux souvenirs.'),
      ],
      tips: [
        [say(DUNGEON.villagerB, HOISTER, 'Functions declared with `function` are hoisted whole. Arrow functions in a `const`? Not so much.', 'Les fonctions déclarées avec `function` sont hissées entières. Les fonctions fléchées dans une `const` ? Pas vraiment.')],
        [say(DUNGEON.villagerB, HOISTER, 'The plaza shrine glows right behind me. Its enigma is the gentlest of the three.', 'Le sanctuaire de la place brille juste derrière moi. Son énigme est la plus douce des trois.')],
      ],
    },
    kidnan: {
      frame: DUNGEON.villagerC,
      first: [
        say(DUNGEON.villagerC, NAN, 'Guess what! I am Not-a-Number, but `typeof NaN` says "number". Weird, huh?', 'Devine quoi ! Je suis Not-a-Number, mais `typeof NaN` répond "number". Bizarre, hein ?'),
        say(DUNGEON.villagerC, NAN, 'And I am not even equal to myself: `NaN === NaN` is false! Use `Number.isNaN()` to find me.', 'Et je ne suis même pas égal à moi-même : `NaN === NaN` vaut false ! Utilise `Number.isNaN()` pour me trouver.'),
      ],
      tips: [
        [say(DUNGEON.villagerC, NAN, '`"5" * 2` is 10 but `"5" + 2` is "52". The `+` loves strings more than numbers!', '`"5" * 2` vaut 10 mais `"5" + 2` vaut "52". Le `+` préfère les chaînes aux nombres !')],
        [say(DUNGEON.villagerC, NAN, 'The park shrine is in the north-west corner, past the trees.', 'Le sanctuaire du parc est dans le coin nord-ouest, derrière les arbres.')],
      ],
    },
    promise: {
      frame: DUNGEON.monk,
      first: [
        say(DUNGEON.monk, PROMISE, 'Welcome to my stall! I promise I will pay you back… eventually. I am either pending, fulfilled or rejected. Never two at once!', 'Bienvenue à mon étal ! Je te promets de te rembourser… un jour. Je suis soit en attente, soit tenue, soit rompue. Jamais deux à la fois !'),
        say(DUNGEON.monk, PROMISE, 'Chain me with `.then()`, catch my failures with `.catch()`, or simply `await` me inside an `async` function.', 'Enchaîne-moi avec `.then()`, attrape mes échecs avec `.catch()`, ou simplement `await`-moi dans une fonction `async`.'),
      ],
      tips: [
        [say(DUNGEON.monk, PROMISE, 'A forgotten `await` gives you a Promise instead of a value. Classic customer mistake!', 'Un `await` oublié te donne une Promise au lieu d’une valeur. Erreur classique de client !')],
        [say(DUNGEON.monk, PROMISE, '`Promise.all` waits for everyone. `Promise.race` only for the fastest. Like my customers.', '`Promise.all` attend tout le monde. `Promise.race` seulement le plus rapide. Comme mes clients.')],
      ],
    },
    closure: {
      frame: DUNGEON.ranger,
      first: [
        say(DUNGEON.ranger, CLOSURE, 'Ahoy! My ship remembers every port it ever visited, just like a closure remembers the variables around it when it was created.', 'Ohé ! Mon navire se souvient de chaque port visité, comme une closure se souvient des variables autour d’elle à sa création.'),
        say(DUNGEON.ranger, CLOSURE, 'The Kraken lurks past the gate at the end of the pier. It throws ink bubbles of nested callbacks. Dodge them!', 'Le Kraken rôde derrière la porte au bout de la jetée. Il crache des bulles d’encre de callbacks imbriqués. Esquive-les !'),
      ],
      tips: [
        [say(DUNGEON.ranger, CLOSURE, 'Touch the flag on the docks before facing the Kraken. If you sink, you will wash up there.', 'Touche le drapeau sur les quais avant d’affronter le Kraken. Si tu coules, tu échoueras là.')],
        [say(DUNGEON.ranger, CLOSURE, 'Callbacks inside callbacks inside callbacks… we call that the Pyramid of Doom. Promises and async/await flatten it.', 'Des callbacks dans des callbacks dans des callbacks… on appelle ça la Pyramide Infernale. Les Promises et async/await l’aplatissent.')],
      ],
    },
  },
  monsters: {
    1: { frame: DUNGEON.slime, name: { en: 'Undefined Slime', fr: 'Slime Undefined' }, speed: 26 },
    2: { frame: DUNGEON.bat, name: { en: 'NaN Bat', fr: 'Chauve-souris NaN' }, speed: 38 },
    3: { frame: DUNGEON.ghost, name: { en: 'Callback Ghost', fr: 'Fantôme Callback' }, speed: 44, tint: 0xd6b0ff },
  },
  signs: {
    city: { en: 'Scriptopolis → the city that never blocks', fr: 'Scriptopolis → la ville qui ne bloque jamais' },
    harbor: { en: 'Async Harbor → (danger: Kraken)', fr: 'Port Asynchrone → (danger : Kraken)' },
  },
  story: {
    intro: [
      narrate('Scriptopolis, the city that never blocks. Its neon lamps used to glow in perfect asynchronous harmony…', 'Scriptopolis, la ville qui ne bloque jamais. Ses lampes néon brillaient autrefois en parfaite harmonie asynchrone…'),
      narrate('…until the Callback Kraken rose from the Async Harbor and swallowed the first Crystal Shard.', '…jusqu’à ce que le Kraken des Callbacks surgisse du Port Asynchrone et avale le premier Éclat du Cristal.'),
      narrate('Find the lamplighter. She will know what to do.', 'Trouve l’allumeuse de lampes. Elle saura quoi faire.'),
    ],
    shrineIntro: [
      narrate('An ancient shrine hums with green light. A voice whispers an enigma. Answer it to open the sealed letter.', 'Un ancien sanctuaire vibre d’une lumière verte. Une voix murmure une énigme. Résous-la pour ouvrir la lettre scellée.'),
    ],
    letters: [
      [
        narrate('The shrine opens. Inside, a letter sealed with a tiny crown…', 'Le sanctuaire s’ouvre. À l’intérieur, une lettre scellée d’une petite couronne…'),
        ada('"If you are reading this, a brave coder found my first shrine. Bugmancer is not only cruel: he feeds on unhandled errors. Every bug you squash makes him weaker."', '« Si tu lis ceci, c’est qu’un codeur courageux a trouvé mon premier sanctuaire. Bugmancer n’est pas seulement cruel : il se nourrit des erreurs non gérées. Chaque bug que tu écrases l’affaiblit. »'),
      ],
      [
        narrate('Another letter, the ink still fresh…', 'Une autre lettre, l’encre encore fraîche…'),
        ada('"The Kraken hates order. It wants every callback nested inside another until nobody can read the code. Fight it like a Promise: one step at a time. Then… then… then."', '« Le Kraken déteste l’ordre. Il veut imbriquer chaque callback dans un autre jusqu’à ce que plus personne ne puisse lire le code. Combats-le comme une Promise : une étape à la fois. Puis… puis… puis. »'),
      ],
      [
        narrate('The last letter glows as you unfold it.', 'La dernière lettre brille quand tu la déplies.'),
        ada('"The first word of the Restore Spell is RESOLVE. Keep it close. When all ten words are spoken, the Citadel will open. Hurry… I can hear Bugmancer laughing."', '« Le premier mot du Sort de Restauration est RÉSOUDS. Garde-le précieusement. Quand les dix mots seront prononcés, la Citadelle s’ouvrira. Dépêche-toi… j’entends Bugmancer rire. »'),
      ],
    ],
    gateSealed: (found) => [
      narrate(`The gate to the Kraken's lair is sealed by three locks of light. Ada's letters found: ${found}/3.`, `La porte de l’antre du Kraken est scellée par trois verrous de lumière. Lettres d’Ada trouvées : ${found}/3.`),
    ],
    gateOpened: [
      narrate('Far to the east, the seal of the Async Harbor cracks and falls into the sea. The Kraken\'s gate is open!', 'Loin à l’est, le sceau du Port Asynchrone se fissure et tombe dans la mer. La porte du Kraken est ouverte !'),
    ],
    bossIntro: [
      narrate('The sea boils. Tentacles of tangled code rise from the water…', 'La mer bouillonne. Des tentacules de code enchevêtré s’élèvent des flots…'),
      { portrait: DUNGEON.crab, speaker: KRAKEN.name, text: { en: 'You found her little letters? Cute. Let\'s see how you handle MY callbacks!', fr: 'Tu as trouvé ses petites lettres ? Mignon. Voyons comment tu gères MES callbacks !' } },
    ],
    bossHint: [
      narrate('Dodge the ink bubbles with the arrow keys. When a green rune appears on the dock, step on it and answer to strike the Kraken!', 'Esquive les bulles d’encre avec les flèches. Quand une rune verte apparaît sur le quai, marche dessus et réponds pour frapper le Kraken !'),
    ],
    victory: [
      narrate('The Kraken dissolves into a cloud of resolved promises. The first Crystal Shard glows in your hands!', 'Le Kraken se dissout en un nuage de promesses résolues. Le premier Éclat du Cristal brille entre tes mains !'),
      narrate('Key Shard of JavaScript obtained ✦ Spell word: RESOLVE', 'Éclat-clé de JavaScript obtenu ✦ Mot du sort : RÉSOUDS'),
      ada('{name}…? I can hear you through the shard! One seal is broken, nine to go. I believe in you!', '{name}… ? Je t’entends à travers l’éclat ! Un sceau est brisé, il en reste neuf. Je crois en toi !'),
    ],
    afterVictory: [
      say(DUNGEON.villagerA, LUMI, 'The lamps are shining again! Scriptopolis is free. On the map, the portals of TypeScript Land and Node Land have opened.', 'Les lampes brillent à nouveau ! Scriptopolis est libre. Sur la carte, les portails de la Terre TypeScript et de la Terre Node se sont ouverts.'),
    ],
    gateCleared: [narrate('Only calm water remains beyond the gate. The guardian is gone.', 'Seule une eau calme reste derrière la porte. Le gardien n’est plus.')],
  },
  boss: { frame: DUNGEON.crab, tint: 0xb07cff, scale: 4, arena, projectileTint: 0xffffff },
};
