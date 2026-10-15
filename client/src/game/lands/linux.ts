import { LANDS } from '@shared/game';
import { TRACK_BY_ID } from '@shared/tracks';
import type { L } from '@shared/types';
import type { DialogueLine } from '../../store';
import { DUNGEON } from '../assets';
import { MapDraft } from '../mapBuilder';
import { SPEAKERS } from '../story';
import type { LandContent } from './types';

// Linux Land · Penguin Peaks: snowy mountains, the shell caves dug under them, and Kernel Pass
// where the Kernel Panic Golem guards a Crystal Shard.

const SHELLY: L = { en: 'Shelly the Guide', fr: 'Shelly la Guide' };
const CHMOD: L = { en: 'Old Chmod', fr: 'Vieux Chmod' };
const GREP: L = { en: 'Grep the Hermit', fr: 'Grep l’Ermite' };
const PIPER: L = { en: 'Piper', fr: 'Piper' };
const SIGRID: L = { en: 'Sysadmin Sigrid', fr: 'Sigrid l’Admin' };
const GOLEM = TRACK_BY_ID.linux.boss;
const WORD = LANDS.linux.spellWord;

const say = (portrait: number, speaker: L, en: string, fr: string): DialogueLine => ({ portrait, speaker, text: { en, fr } });
const narrate = (en: string, fr: string): DialogueLine => ({ text: { en, fr } });
const ada = (en: string, fr: string): DialogueLine => say(DUNGEON.princess, SPEAKERS.ADA, en, fr);

function draft(): MapDraft {
  const d = new MapDraft(64, 44, 's');
  d.frame('N', 0, 0, 64, 44, 2);

  // West slopes and the gravel trail up the mountain
  d.hroad(0, 48, 21, 'c');
  d.clear(0, 21, 2, 2);
  d.mark({ type: 'exit', x: 0, y: 21, w: 1, h: 2, id: 'world' });
  d.mark({ type: 'spawn', x: 3, y: 21 });
  d.mark({ type: 'checkpoint', x: 4, y: 24, id: 'start' });
  d.mark({ type: 'npc', x: 7, y: 19, id: 'shelly' });
  d.mark({ type: 'sign', x: 16, y: 19, id: 'home' });

  // /home camp: cabins around a gravel square
  d.fill('c', 29, 17, 8, 10);
  d.stamp(21, 16, 'houseGrey').stamp(25, 16, 'houseRed');
  d.stamp(38, 16, 'houseRed').stamp(42, 16, 'houseGrey');
  d.stamp(21, 25, 'shop').stamp(40, 25, 'houseGrey');
  d.put(28, 18, 'O').put(37, 18, 'O').put(28, 25, 'O').put(37, 25, 'O');
  d.mark({ type: 'shrine', x: 32, y: 18, id: '0' });
  d.mark({ type: 'checkpoint', x: 35, y: 24, id: 'camp' });
  d.mark({ type: 'npc', x: 30, y: 24, id: 'chmod' });
  d.mark({ type: 'chest', x: 32, y: 28, id: 'c1' });

  // Bash Caves, dug into the northern cliff: a few rooms, like directories
  d.fill('c', 19, 3, 27, 8);
  d.frame('X', 18, 2, 29, 10);
  d.vroad(31, 11, 16, 'c', 3);
  d.clear(31, 11, 3, 1);
  d.line('X', 26, 3, 26, 7).line('X', 38, 6, 38, 10);
  d.put(19, 3, 'O').put(25, 10, 'O').put(37, 3, 'O').put(45, 10, 'O');
  d.mark({ type: 'shrine', x: 22, y: 5, id: '1' });
  d.mark({ type: 'chest', x: 44, y: 4, id: 'c2' });
  d.mark({ type: 'npc', x: 30, y: 5, id: 'grep' });

  // /tmp Lake: frozen solid, with crystals growing out of the ice
  d.vroad(31, 29, 32, 'c', 3);
  d.fill('i', 20, 33, 26, 8);
  d.put(22, 35, 'K').put(36, 34, 'K').put(42, 40, 'K').put(28, 40, 'K');
  d.mark({ type: 'shrine', x: 24, y: 38, id: '2' });
  d.mark({ type: 'chest', x: 44, y: 38, id: 'c3' });
  d.mark({ type: 'npc', x: 30, y: 35, id: 'piper' });

  // Kernel Pass: the last slope before the cliff, and the tunnel to the Golem's cave
  d.fill('c', 49, 8, 7, 28);
  d.frame('X', 56, 0, 6, 44, 3);
  d.clear(56, 21, 4, 2);
  d.fill('c', 56, 21, 4, 2);
  d.put(60, 20, 'W').put(60, 21, 'G').put(60, 22, 'G').put(60, 23, 'W');
  d.put(55, 19, 'O').put(55, 24, 'O');
  d.put(49, 9, 'K').put(55, 9, 'K').put(49, 34, 'K').put(55, 34, 'K');
  d.put(50, 14, 'R').put(54, 14, 'R').put(50, 29, 'R').put(54, 29, 'R');
  d.mark({ type: 'bossGate', x: 60, y: 21, h: 2 });
  d.mark({ type: 'checkpoint', x: 52, y: 25, id: 'pass' });
  d.mark({ type: 'npc', x: 51, y: 18, id: 'sigrid' });
  d.mark({ type: 'sign', x: 47, y: 19, id: 'pass' });

  // Bugs crawling out of every process table
  for (const [x, y] of [[8, 13], [12, 27], [14, 16], [6, 33], [20, 29], [44, 13]]) d.mark({ type: 'monster', x, y, tier: 1 });
  for (const [x, y] of [[34, 8], [41, 5], [22, 9], [26, 38], [38, 37], [41, 35]]) d.mark({ type: 'monster', x, y, tier: 2 });
  for (const [x, y] of [[52, 12], [53, 31], [50, 27], [54, 17]]) d.mark({ type: 'monster', x, y, tier: 3 });

  d.scatter(['N', 'N', 'R', 'N', 'K'], 45, 7, { x: 2, y: 2, w: 15, h: 40 });
  d.scatter(['N', 'R', 'N'], 10, 13, { x: 18, y: 12, w: 30, h: 4 });
  d.scatter(['N', 'R'], 8, 29, { x: 47, y: 2, w: 9, h: 40 });
  return d;
}

function arena(): MapDraft {
  const d = new MapDraft(28, 16, 'c');
  d.fill('s', 0, 0, 28, 5);
  d.line('R', 0, 4, 27, 4);
  d.line('X', 0, 0, 0, 15).line('X', 27, 0, 27, 15).line('X', 0, 15, 27, 15);
  d.put(2, 1, 'K').put(25, 2, 'K').put(6, 2, 'N').put(21, 1, 'N');
  d.put(1, 5, 'O').put(26, 5, 'O').put(1, 14, 'O').put(26, 14, 'O');
  d.mark({ type: 'spawn', x: 13, y: 12 });
  return d;
}

export const linuxLand: LandContent = {
  id: 'linux',
  music: { scene: 'focus', intensity: 0.35 },
  grade: (cam) => {
    const fx = cam.postFX?.addColorMatrix();
    fx?.saturate(-0.15);
    fx?.brightness(1.05, true);
    cam.postFX?.addVignette(0.5, 0.5, 0.95, 0.3);
  },
  draft,
  npcs: {
    shelly: {
      frame: DUNGEON.villagerA,
      first: [
        say(DUNGEON.villagerA, SHELLY, 'Brr! Welcome to Penguin Peaks, traveler. I am Shelly. Up here, we do everything by typing commands into the shell.', 'Brr ! Bienvenue aux Pics du Pingouin, voyageur. Je suis Shelly. Ici, on fait tout en tapant des commandes dans le shell.'),
        say(DUNGEON.villagerA, SHELLY, 'Everything starts at the root, `/`. Type `pwd` to know where you are, `ls` to look around, `cd` to move. `cd ..` climbs one level up.', 'Tout part de la racine, `/`. Tape `pwd` pour savoir où tu es, `ls` pour regarder autour, `cd` pour te déplacer. `cd ..` remonte d’un niveau.'),
        say(DUNGEON.villagerA, SHELLY, 'Since the Kernel Panic Golem swallowed the Crystal Shard, processes freeze, files vanish and bugs crawl out of the logs.', 'Depuis que le Golem Kernel Panic a avalé l’Éclat du Cristal, les processus gèlent, les fichiers disparaissent et des bugs sortent des journaux.'),
        say(DUNGEON.villagerA, SHELLY, 'It hides in a cave past Kernel Pass, far east. Princess Ada hid three letters here: in the /home camp, in the Bash Caves to the north, and by the frozen /tmp Lake to the south.', 'Il se cache dans une grotte après le Col du Noyau, loin à l’est. La Princesse Ada a caché trois lettres ici : au camp /home, dans les Grottes Bash au nord, et près du Lac /tmp gelé au sud.'),
      ],
      tips: [
        [say(DUNGEON.villagerA, SHELLY, 'A path starting with `/` is absolute: it always starts from the root. Without it, it is relative to where you stand.', 'Un chemin qui commence par `/` est absolu : il part toujours de la racine. Sans lui, il est relatif à l’endroit où tu te trouves.')],
        [say(DUNGEON.villagerA, SHELLY, 'Lost in a command? `man ls` opens its manual. Press `q` to quit it.', 'Perdu dans une commande ? `man ls` ouvre son manuel. Appuie sur `q` pour le quitter.')],
        [say(DUNGEON.villagerA, SHELLY, 'The shrines glow green. Chests hide coding puzzles worth lots of points.', 'Les sanctuaires brillent en vert. Les coffres cachent des énigmes de code qui rapportent beaucoup de points.')],
      ],
    },
    chmod: {
      frame: DUNGEON.villagerB,
      first: [
        say(DUNGEON.villagerB, CHMOD, 'Halt! Who gave you permission? Every file here has three rights: r to read, w to write, x to execute.', 'Halte ! Qui t’a donné la permission ? Chaque fichier ici a trois droits : r pour lire, w pour écrire, x pour exécuter.'),
        say(DUNGEON.villagerB, CHMOD, 'And three kinds of people: the owner, the group, everyone else. `chmod +x script.sh` lets you run a script. `chmod 755` means rwx for me, r-x for the rest.', 'Et trois sortes de gens : le propriétaire, le groupe, tous les autres. `chmod +x script.sh` te permet d’exécuter un script. `chmod 755` veut dire rwx pour moi, r-x pour les autres.'),
      ],
      tips: [
        [say(DUNGEON.villagerB, CHMOD, 'Count it out: r = 4, w = 2, x = 1. So 7 is rwx, 6 is rw-, 5 is r-x. Easy, once you add them up.', 'Compte : r = 4, w = 2, x = 1. Donc 7 c’est rwx, 6 c’est rw-, 5 c’est r-x. Facile, une fois qu’on additionne.')],
        [say(DUNGEON.villagerB, CHMOD, 'The camp shrine glows right behind me. Its enigma is the gentlest of the three.', 'Le sanctuaire du camp brille juste derrière moi. Son énigme est la plus douce des trois.')],
      ],
    },
    grep: {
      frame: DUNGEON.monk,
      first: [
        say(DUNGEON.monk, GREP, 'Hmm? A visitor in my caves… I am Grep. Give me a pattern and a file, and I will find every line that matches: `grep error app.log`.', 'Hmm ? Un visiteur dans mes grottes… Je suis Grep. Donne-moi un motif et un fichier, et je trouverai chaque ligne qui correspond : `grep error app.log`.'),
        say(DUNGEON.monk, GREP, 'Add `-i` to ignore case, `-r` to search a whole directory. And if you seek files rather than lines, ask my cousin `find`.', 'Ajoute `-i` pour ignorer la casse, `-r` pour fouiller tout un répertoire. Et si tu cherches des fichiers plutôt que des lignes, demande à mon cousin `find`.'),
      ],
      tips: [
        [say(DUNGEON.monk, GREP, '`tail -n 20 app.log` shows the last 20 lines. `tail -f` keeps watching as new lines arrive. Very useful for logs.', '`tail -n 20 app.log` affiche les 20 dernières lignes. `tail -f` continue de surveiller les nouvelles lignes. Très utile pour les journaux.')],
        [say(DUNGEON.monk, GREP, 'The cave shrine sits in the western room, behind the rock wall. Go around it from below.', 'Le sanctuaire de la grotte est dans la salle ouest, derrière le mur de roche. Contourne-le par le bas.')],
      ],
    },
    piper: {
      frame: DUNGEON.villagerC,
      first: [
        say(DUNGEON.villagerC, PIPER, 'Hey! Watch this: `cat fish.txt | sort | uniq`. The pipe `|` sends the output of one command into the next. Like a stream under the ice!', 'Hé ! Regarde : `cat fish.txt | sort | uniq`. Le tube `|` envoie la sortie d’une commande dans la suivante. Comme un ruisseau sous la glace !'),
        say(DUNGEON.villagerC, PIPER, 'And to keep the result, redirect it: `>` writes a file (and erases what was there!), `>>` adds to the end.', 'Et pour garder le résultat, redirige-le : `>` écrit un fichier (et efface ce qu’il y avait !), `>>` ajoute à la fin.'),
      ],
      tips: [
        [say(DUNGEON.villagerC, PIPER, 'How many fish did I catch? `wc -l fish.txt` counts the lines!', 'Combien de poissons j’ai pêchés ? `wc -l fish.txt` compte les lignes !')],
        [say(DUNGEON.villagerC, PIPER, '`uniq` only removes duplicates that are next to each other. That is why we `sort` first!', '`uniq` ne retire que les doublons côte à côte. C’est pour ça qu’on fait `sort` d’abord !')],
      ],
    },
    sigrid: {
      frame: DUNGEON.viking,
      first: [
        say(DUNGEON.viking, SIGRID, 'Stand back, I am on call. Every running program is a process with a number, its PID. `ps aux` lists them all.', 'Recule, je suis d’astreinte. Chaque programme qui tourne est un processus avec un numéro, son PID. `ps aux` les liste tous.'),
        say(DUNGEON.viking, SIGRID, 'The Golem waits in the cave behind the gate. When it stomps, boulders rain from the ceiling. Keep moving and never stand still!', 'Le Golem attend dans la grotte derrière la porte. Quand il frappe du pied, des rochers pleuvent du plafond. Bouge sans arrêt et ne reste jamais immobile !'),
      ],
      tips: [
        [say(DUNGEON.viking, SIGRID, '`kill 1234` politely asks process 1234 to stop (SIGTERM). `kill -9` does not ask. Use it only as a last resort.', '`kill 1234` demande poliment au processus 1234 de s’arrêter (SIGTERM). `kill -9`, lui, ne demande pas. À n’utiliser qu’en dernier recours.')],
        [say(DUNGEON.viking, SIGRID, 'After every command, `echo $?` shows its exit code. 0 means success; anything else means trouble.', 'Après chaque commande, `echo $?` affiche son code de retour. 0 signifie succès ; tout le reste, des ennuis.')],
        [say(DUNGEON.viking, SIGRID, 'Touch the flag on the pass before facing the Golem. If it flattens you, you will restart there.', 'Touche le drapeau du col avant d’affronter le Golem. S’il t’aplatit, tu recommenceras là.')],
      ],
    },
  },
  monsters: {
    1: { frame: DUNGEON.rat, name: { en: 'Zombie Process Rat', fr: 'Rat Processus Zombie' }, speed: 28 },
    2: { frame: DUNGEON.bat, name: { en: 'Segfault Bat', fr: 'Chauve-souris Segfault' }, speed: 38, tint: 0xbfe8ff },
    3: { frame: DUNGEON.cyclops, name: { en: 'Daemon Cyclops', fr: 'Cyclope Démon' }, speed: 40, tint: 0xc8d8ff },
  },
  signs: {
    home: { en: '/home → Penguin Peaks camp', fr: '/home → camp des Pics du Pingouin' },
    pass: { en: 'Kernel Pass → (danger: Golem)', fr: 'Col du Noyau → (danger : Golem)' },
  },
  story: {
    intro: [
      narrate('Penguin Peaks, where everything is a file. Its snowy slopes used to hum with a thousand quiet processes…', 'Les Pics du Pingouin, où tout est un fichier. Leurs pentes enneigées bourdonnaient autrefois de mille processus tranquilles…'),
      narrate('…until the Kernel Panic Golem woke up under Kernel Pass and swallowed a Crystal Shard.', '…jusqu’à ce que le Golem Kernel Panic s’éveille sous le Col du Noyau et avale un Éclat du Cristal.'),
      narrate('Find the mountain guide. She will know what to do.', 'Trouve la guide de montagne. Elle saura quoi faire.'),
    ],
    shrineIntro: [
      narrate('A frosted shrine hums with green light, like a blinking cursor. A voice asks an enigma. Answer it to open the sealed letter.', 'Un sanctuaire givré vibre d’une lumière verte, comme un curseur qui clignote. Une voix pose une énigme. Résous-la pour ouvrir la lettre scellée.'),
    ],
    letters: [
      [
        narrate('The shrine opens. Inside, a letter sealed with a tiny crown…', 'Le sanctuaire s’ouvre. À l’intérieur, une lettre scellée d’une petite couronne…'),
        ada('"On these peaks, everything is a file: your documents, your disks, even your keyboard. Bugmancer hid in the logs at first. Read them, they never lie."', '« Sur ces pics, tout est un fichier : tes documents, tes disques, même ton clavier. Bugmancer s’est d’abord caché dans les journaux. Lis-les, ils ne mentent jamais. »'),
      ],
      [
        narrate('Another letter, frozen into the cave wall…', 'Une autre lettre, prise dans la glace de la paroi…'),
        ada('"The Golem was once the kernel\'s guardian. Bugmancer filled it with errors until it panicked. Small commands, one after another, piped together: that is how you calm it."', '« Le Golem était autrefois le gardien du noyau. Bugmancer l’a rempli d’erreurs jusqu’à la panique. De petites commandes, l’une après l’autre, reliées par des tubes : voilà comment le calmer. »'),
      ],
      [
        narrate('The last letter glows as you unfold it.', 'La dernière lettre brille quand tu la déplies.'),
        ada(
          `"Another word of the Restore Spell is ${WORD.en}. Before you can use a disk, you must ${WORD.en.toLowerCase()} it; before you can open the Citadel, you must speak it. Hurry…"`,
          `« Un autre mot du Sort de Restauration est ${WORD.fr}. Avant d’utiliser un disque, il faut le monter ; avant d’ouvrir la Citadelle, il faut prononcer ce mot. Dépêche-toi… »`,
        ),
      ],
    ],
    gateSealed: (found) => [
      narrate(`The gate of the Golem's cave is sealed by three locks of light. Ada's letters found: ${found}/3.`, `La porte de la grotte du Golem est scellée par trois verrous de lumière. Lettres d’Ada trouvées : ${found}/3.`),
    ],
    gateOpened: [
      narrate('Far to the east, the seal of Kernel Pass cracks and tumbles down the cliff. The Golem\'s gate is open!', 'Loin à l’est, le sceau du Col du Noyau se fissure et dévale la falaise. La porte du Golem est ouverte !'),
    ],
    bossIntro: [
      narrate('The ground trembles. A mountain of stone rises, its cracks glowing with red error messages…', 'Le sol tremble. Une montagne de pierre se dresse, ses fissures rougeoyant de messages d’erreur…'),
      { portrait: DUNGEON.cyclops, speaker: GOLEM.name, text: { en: 'KERNEL PANIC: NOT SYNCING. Intruder detected. Permission denied!', fr: 'KERNEL PANIC : NOT SYNCING. Intrus détecté. Permission refusée !' } },
    ],
    bossHint: [
      narrate('Dodge the falling boulders with the arrow keys. When a green rune appears on the floor, step on it and answer to strike the Golem!', 'Esquive les rochers qui tombent avec les flèches. Quand une rune verte apparaît au sol, marche dessus et réponds pour frapper le Golem !'),
    ],
    victory: [
      narrate('The Golem\'s cracks stop glowing. It kneels, rebooting in silence, and the Crystal Shard rolls into your hands!', 'Les fissures du Golem s’éteignent. Il s’agenouille, redémarre en silence, et l’Éclat du Cristal roule entre tes mains !'),
      narrate(`Key Shard of Linux obtained ✦ Spell word: ${WORD.en}`, `Éclat-clé de Linux obtenu ✦ Mot du sort : ${WORD.fr}`),
      ada('{name}…? I can hear you through the shard! Another seal is broken. Keep going, I believe in you!', '{name}… ? Je t’entends à travers l’éclat ! Un autre sceau est brisé. Continue, je crois en toi !'),
    ],
    afterVictory: [
      say(DUNGEON.villagerA, SHELLY, 'Every process is running smoothly again! Penguin Peaks is free. On the map, the portal of Git Land has opened.', 'Tous les processus tournent à nouveau sans accroc ! Les Pics du Pingouin sont libres. Sur la carte, le portail de la Terre Git s’est ouvert.'),
    ],
    gateCleared: [narrate('Only a quiet, empty cave remains beyond the gate. The guardian is gone.', 'Seule une grotte vide et silencieuse reste derrière la porte. Le gardien n’est plus.')],
  },
  boss: {
    frame: DUNGEON.cyclops,
    texture: 'golem',
    tint: 0xffffff,
    scale: 4,
    arena,
    projectile: 'boulder',
    projectileTint: 0xffffff,
    movement: 'stomp',
    attacks: { 1: ['rain', 'fan'], 2: ['rain', 'fan', 'rain'], 3: ['rain', 'ring', 'fan'] },
  },
};
