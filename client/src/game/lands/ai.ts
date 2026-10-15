import { LANDS } from '@shared/game';
import { TRACK_BY_ID } from '@shared/tracks';
import type { L } from '@shared/types';
import type { DialogueLine } from '../../store';
import { DUNGEON } from '../assets';
import { MapDraft } from '../mapBuilder';
import { SPEAKERS } from '../story';
import type { LandContent } from './types';

// AI Land · Neuralis: the city that learns, built on circuit boards and server racks, where the
// Hallucinating Oracle swallowed a Crystal Shard and now predicts things that never were.
// The NPCs walk the learner from "what is a model?" up to transformers, RAG and AI safety.

const NOVA: L = { en: 'Nova the Data Gardener', fr: 'Nova la Jardinière des Données' };
const GRADIENT: L = { en: 'Professor Gradient', fr: 'Professeur Gradient' };
const NEURA: L = { en: 'Neura the Network Weaver', fr: 'Neura la Tisseuse de Réseaux' };
const VECTOR: L = { en: 'Vector the Librarian', fr: 'Vector le Bibliothécaire' };
const ETHICA: L = { en: 'Sentinel Ethica', fr: 'Sentinelle Ethica' };
const ORACLE = TRACK_BY_ID.ai.boss;
const WORD = LANDS.ai.spellWord;

const say = (portrait: number, speaker: L, en: string, fr: string): DialogueLine => ({ portrait, speaker, text: { en, fr } });
const narrate = (en: string, fr: string): DialogueLine => ({ text: { en, fr } });
const ada = (en: string, fr: string): DialogueLine => say(DUNGEON.princess, SPEAKERS.ADA, en, fr);

function draft(): MapDraft {
  const d = new MapDraft(64, 44, 'u');
  d.frame('S', 0, 0, 64, 44, 2);

  // West: the Training Fields, where the data grows, and the entrance road
  d.fill('.', 2, 2, 16, 40);
  d.fill(',', 3, 4, 6, 4).fill(',', 9, 33, 5, 4);
  d.hroad(0, 48, 21, '#');
  d.vroad(32, 3, 41, '#');
  d.clear(0, 21, 2, 2);
  d.mark({ type: 'exit', x: 0, y: 21, w: 1, h: 2, id: 'world' });
  d.mark({ type: 'spawn', x: 3, y: 21 });
  d.mark({ type: 'checkpoint', x: 4, y: 24, id: 'start' });
  d.mark({ type: 'npc', x: 7, y: 19, id: 'nova' });
  d.mark({ type: 'sign', x: 16, y: 19, id: 'fields' });

  // Neural Plaza: a giant network of nodes (input → hidden → hidden → output) wired by live circuits
  for (const y of [14, 17, 26, 29]) d.fill('v', 23, y, 20, 1);
  for (const x of [23, 28, 37, 42]) d.fill('v', x, 13, 1, 5).fill('v', x, 26, 1, 5);
  for (const y of [14, 17, 26, 29]) d.put(23, y, 'Q');
  for (const y of [13, 16, 27, 30]) d.put(28, y, 'Q').put(37, y, 'Q');
  d.put(42, 15, 'Q').put(42, 28, 'Q');
  for (const x of [20, 24, 40, 44]) d.put(x, 20, 'L').put(x, 23, 'L');
  d.mark({ type: 'shrine', x: 30, y: 19, id: '0' });
  d.mark({ type: 'checkpoint', x: 35, y: 19, id: 'core' });
  d.mark({ type: 'npc', x: 30, y: 24, id: 'gradient' });
  d.mark({ type: 'chest', x: 35, y: 25, id: 'c1' });

  // North: the Data Archives (aisles of server racks) and the Data Lake
  for (const x of [20, 23, 26]) d.line('S', x, 3, x, 8);
  d.fill('~', 36, 3, 9, 4);
  d.mark({ type: 'shrine', x: 22, y: 5, id: '1' });
  d.mark({ type: 'chest', x: 47, y: 4, id: 'c2' });
  d.mark({ type: 'npc', x: 29, y: 7, id: 'neura' });
  d.mark({ type: 'sign', x: 34, y: 10, id: 'archives' });

  // South: the Vector Library and its embedding gardens
  d.line('S', 20, 35, 26, 35).line('S', 20, 41, 26, 41);
  d.fill('.', 35, 34, 12, 8).fill(',', 37, 38, 4, 3);
  d.put(29, 39, 'Q').put(34, 36, 'Q');
  d.mark({ type: 'shrine', x: 24, y: 38, id: '2' });
  d.mark({ type: 'chest', x: 44, y: 38, id: 'c3' });
  d.mark({ type: 'npc', x: 30, y: 36, id: 'vector' });

  // The Transformer Tower: a glowing platform over the data stream, and the sealed gate
  d.fill('v', 49, 8, 7, 28);
  d.fill('~', 56, 0, 6, 44);
  d.clear(56, 0, 6, 44);
  d.fill('#', 56, 21, 4, 2);
  d.put(60, 20, 'W').put(60, 21, 'G').put(60, 22, 'G').put(60, 23, 'W');
  d.put(49, 9, 'L').put(55, 9, 'L').put(49, 34, 'L').put(55, 34, 'L').put(55, 19, 'L').put(55, 24, 'L');
  d.put(50, 14, 'Q').put(54, 14, 'Q').put(50, 29, 'Q').put(54, 29, 'Q');
  d.mark({ type: 'bossGate', x: 60, y: 21, h: 2 });
  d.mark({ type: 'checkpoint', x: 52, y: 25, id: 'tower' });
  d.mark({ type: 'npc', x: 51, y: 18, id: 'ethica' });
  d.mark({ type: 'sign', x: 47, y: 19, id: 'tower' });

  // Corrupted data crawling everywhere
  for (const [x, y] of [[8, 13], [12, 27], [14, 16], [6, 32], [20, 25], [45, 18]]) d.mark({ type: 'monster', x, y, tier: 1 });
  for (const [x, y] of [[38, 9], [43, 9], [25, 10], [27, 38], [38, 36], [42, 40]]) d.mark({ type: 'monster', x, y, tier: 2 });
  for (const [x, y] of [[52, 12], [53, 31], [50, 27], [54, 17]]) d.mark({ type: 'monster', x, y, tier: 3 });

  d.scatter(['T', 'T', 't', 'B', 'Y'], 40, 7, { x: 2, y: 2, w: 15, h: 40 });
  d.scatter(['T', 't', 'B'], 6, 17, { x: 35, y: 34, w: 12, h: 8 });
  return d;
}

function arena(): MapDraft {
  const d = new MapDraft(28, 16, 'u');
  d.fill('~', 0, 0, 28, 5);
  d.fill('v', 1, 7, 26, 1).fill('v', 1, 12, 26, 1);
  d.line('S', 0, 15, 27, 15);
  d.line('S', 0, 5, 0, 14).line('S', 27, 5, 27, 14);
  d.put(1, 5, 'L').put(26, 5, 'L').put(1, 14, 'L').put(26, 14, 'L');
  d.mark({ type: 'spawn', x: 13, y: 12 });
  return d;
}

export const aiLand: LandContent = {
  id: 'ai',
  music: { scene: 'puzzle', intensity: 0.4 },
  grade: (cam) => {
    const fx = cam.postFX?.addColorMatrix();
    fx?.saturate(0.3);
    cam.postFX?.addVignette(0.5, 0.5, 0.9, 0.4);
  },
  draft,
  npcs: {
    nova: {
      frame: DUNGEON.villagerA,
      first: [
        say(DUNGEON.villagerA, NOVA, 'Welcome to Neuralis, the city that learns! I am Nova. I grow the data that feeds every model in town.', 'Bienvenue à Neuralis, la ville qui apprend ! Je suis Nova. Je cultive les données qui nourrissent tous les modèles de la ville.'),
        say(DUNGEON.villagerA, NOVA, 'A model is a function that learns from examples instead of hand-written rules. Show it houses with their prices, and it learns to guess the price of a new house.', 'Un modèle est une fonction qui apprend à partir d’exemples au lieu de règles écrites à la main. Montre-lui des maisons avec leur prix, et il apprend à deviner le prix d’une nouvelle maison.'),
        say(DUNGEON.villagerA, NOVA, 'But the Hallucinating Oracle swallowed the Crystal Shard. Now our models invent facts, with total confidence. Corrupted data crawls out of every dataset!', 'Mais l’Oracle Hallucinant a avalé l’Éclat du Cristal. Désormais nos modèles inventent des faits, avec une assurance totale. Des données corrompues sortent de chaque jeu de données !'),
        say(DUNGEON.villagerA, NOVA, 'It hides in the Transformer Tower, far east. Princess Ada hid three letters in our shrines: on the Neural Plaza, in the Data Archives up north, and in the Vector Library down south.', 'Il se cache dans la Tour Transformer, loin à l’est. La Princesse Ada a caché trois lettres dans nos sanctuaires : sur la Place Neuronale, dans les Archives de Données au nord, et dans la Bibliothèque Vectorielle au sud.'),
      ],
      tips: [
        [say(DUNGEON.villagerA, NOVA, 'Inputs are called features, the answer to predict is the label. Labeled examples? Supervised learning. No labels? Unsupervised: the model finds groups on its own.', 'Les entrées s’appellent des caractéristiques, la réponse à prédire est l’étiquette. Des exemples étiquetés ? Apprentissage supervisé. Pas d’étiquettes ? Non supervisé : le modèle trouve des groupes tout seul.')],
        [say(DUNGEON.villagerA, NOVA, 'Always keep some data aside as a test set. A model graded on what it memorized is lying to you.', 'Garde toujours une partie des données de côté comme jeu de test. Un modèle noté sur ce qu’il a mémorisé te ment.')],
        [say(DUNGEON.villagerA, NOVA, 'Garbage in, garbage out: a model is only as good as its data. Clean data beats a clever algorithm.', 'Garbage in, garbage out : un modèle ne vaut pas mieux que ses données. Des données propres battent un algorithme malin.')],
      ],
    },
    gradient: {
      frame: DUNGEON.villagerB,
      first: [
        say(DUNGEON.villagerB, GRADIENT, 'Ahem! Training a model means minimizing its loss, a number that says how wrong it is. Mean squared error, for instance: average the squared mistakes.', 'Hum ! Entraîner un modèle, c’est minimiser sa perte, un nombre qui dit à quel point il se trompe. L’erreur quadratique moyenne, par exemple : la moyenne des erreurs au carré.'),
        say(DUNGEON.villagerB, GRADIENT, 'To minimize it, we use gradient descent: feel the slope, take a small step downhill, repeat. The size of the step is the learning rate.', 'Pour la minimiser, on utilise la descente de gradient : sentir la pente, faire un petit pas vers le bas, recommencer. La taille du pas, c’est le taux d’apprentissage.'),
      ],
      tips: [
        [say(DUNGEON.villagerB, GRADIENT, 'Perfect on training data, poor on test data? Overfitting! The model memorized instead of generalizing. More data, a simpler model or regularization will help.', 'Parfait sur l’entraînement, mauvais sur le test ? Surapprentissage ! Le modèle a mémorisé au lieu de généraliser. Plus de données, un modèle plus simple ou de la régularisation aideront.')],
        [say(DUNGEON.villagerB, GRADIENT, 'Learning rate too high: you bounce over the valley. Too low: you will still be walking next year.', 'Taux d’apprentissage trop élevé : tu rebondis par-dessus la vallée. Trop faible : tu marcheras encore l’an prochain.')],
        [say(DUNGEON.villagerB, GRADIENT, 'The plaza shrine glows right behind me, among the network nodes. Its enigma is the gentlest of the three.', 'Le sanctuaire de la place brille juste derrière moi, parmi les nœuds du réseau. Son énigme est la plus douce des trois.')],
      ],
    },
    neura: {
      frame: DUNGEON.mage,
      first: [
        say(DUNGEON.mage, NEURA, 'Shh, the network is thinking. Each node is a neuron: it multiplies its inputs by weights, adds a bias, then applies an activation like ReLU.', 'Chut, le réseau réfléchit. Chaque nœud est un neurone : il multiplie ses entrées par des poids, ajoute un biais, puis applique une activation comme ReLU.'),
        say(DUNGEON.mage, NEURA, 'Stack layers of them and you get deep learning. Backpropagation then runs backwards through the layers to find how much each weight is to blame for the error.', 'Empile-en des couches et tu obtiens l’apprentissage profond. La rétropropagation parcourt ensuite les couches à l’envers pour savoir quelle part de l’erreur revient à chaque poids.'),
      ],
      tips: [
        [say(DUNGEON.mage, NEURA, 'Softmax turns raw scores into probabilities that add up to 1. That is how a classifier says "80% cat, 20% dog".', 'Softmax transforme des scores bruts en probabilités dont la somme vaut 1. C’est ainsi qu’un classifieur dit « 80 % chat, 20 % chien ».')],
        [say(DUNGEON.mage, NEURA, 'Images? Convolutional networks scan them with small filters. Text? Transformers, with attention. Each architecture fits its data.', 'Des images ? Les réseaux convolutifs les parcourent avec de petits filtres. Du texte ? Les Transformers, avec l’attention. Chaque architecture a ses données.')],
        [say(DUNGEON.mage, NEURA, 'The archive shrine sleeps between the server racks, west of me. Slip through an aisle.', 'Le sanctuaire des archives dort entre les baies de serveurs, à l’ouest. Faufile-toi dans une allée.')],
      ],
    },
    vector: {
      frame: DUNGEON.monk,
      first: [
        say(DUNGEON.monk, VECTOR, 'Welcome to my library. Here, every book is shelved by meaning, not by title. Each one is an embedding: a vector of numbers where similar ideas sit close together.', 'Bienvenue dans ma bibliothèque. Ici, chaque livre est rangé par sens, pas par titre. Chacun est un plongement : un vecteur de nombres où les idées proches se rangent côte à côte.'),
        say(DUNGEON.monk, VECTOR, 'Ask me a question, I embed it, find the nearest passages and hand them to the language model. That is RAG, retrieval-augmented generation: answers grounded in real sources.', 'Pose-moi une question : je l’encode, je trouve les passages les plus proches et je les donne au modèle de langage. C’est le RAG, la génération augmentée par récupération : des réponses ancrées dans de vraies sources.'),
      ],
      tips: [
        [say(DUNGEON.monk, VECTOR, 'Closeness between embeddings is often measured with cosine similarity: same direction means same meaning.', 'La proximité entre plongements se mesure souvent par la similarité cosinus : même direction, même sens.')],
        [say(DUNGEON.monk, VECTOR, 'Language models read tokens, pieces of words. Their context window is how many tokens they can keep in mind at once.', 'Les modèles de langage lisent des tokens, des morceaux de mots. Leur fenêtre de contexte, c’est le nombre de tokens qu’ils gardent en tête à la fois.')],
      ],
    },
    ethica: {
      frame: DUNGEON.knightB,
      first: [
        say(DUNGEON.knightB, ETHICA, 'Halt, traveler. I guard the Transformer Tower. A large language model predicts the next token, again and again. It sounds sure even when it is wrong: that is a hallucination.', 'Halte, voyageur. Je garde la Tour Transformer. Un grand modèle de langage prédit le token suivant, encore et encore. Il semble sûr de lui même quand il se trompe : c’est une hallucination.'),
        say(DUNGEON.knightB, ETHICA, 'The Oracle behind the gate drifts like a glitch and fires hallucinated tokens in fans, rings, walls and rain. Watch the pattern, not its confidence.', 'L’Oracle derrière la porte flotte comme un bug d’affichage et tire des tokens hallucinés en éventails, anneaux, murs et pluies. Observe le motif, pas son assurance.'),
      ],
      tips: [
        [say(DUNGEON.knightB, ETHICA, 'A model learns the biases of its data. Check who is missing from your dataset before you trust its predictions about people.', 'Un modèle apprend les biais de ses données. Vérifie qui manque dans ton jeu de données avant de te fier à ses prédictions sur des personnes.')],
        [say(DUNGEON.knightB, ETHICA, 'Higher temperature, more creative but less reliable answers. Lower temperature, safer and more repetitive.', 'Température plus haute : des réponses plus créatives mais moins fiables. Plus basse : plus sûres et plus répétitives.')],
        [say(DUNGEON.knightB, ETHICA, 'Fine-tuning retrains a model on your examples; prompting and RAG only change what you show it. Try the cheap one first.', 'Le fine-tuning réentraîne un modèle sur tes exemples ; le prompting et le RAG ne changent que ce que tu lui montres. Essaie d’abord le moins coûteux.')],
        [say(DUNGEON.knightB, ETHICA, 'Touch the flag on the tower before facing the Oracle. If it overwhelms you, you will reboot right there.', 'Touche le drapeau de la tour avant d’affronter l’Oracle. S’il te submerge, tu redémarreras juste là.')],
      ],
    },
  },
  monsters: {
    1: { frame: DUNGEON.slime, name: { en: 'Noisy Data Slime', fr: 'Slime de Données Bruitées' }, speed: 26, tint: 0x7fffe0 },
    2: { frame: DUNGEON.spider, name: { en: 'Overfit Spider', fr: 'Araignée Surapprentie' }, speed: 38, tint: 0xff9ce6 },
    3: { frame: DUNGEON.ghost, name: { en: 'Hallucination Wraith', fr: 'Spectre Hallucination' }, speed: 44, tint: 0xc9a0ff },
  },
  signs: {
    fields: { en: 'Training Fields → Neural Plaza', fr: 'Champs d’Entraînement → Place Neuronale' },
    archives: { en: '↑ Data Archives · Data Lake', fr: '↑ Archives de Données · Lac de Données' },
    tower: { en: 'Transformer Tower → (danger: Oracle)', fr: 'Tour Transformer → (danger : Oracle)' },
  },
  story: {
    intro: [
      narrate('Neuralis, the city that learns. Its circuits used to hum with models that improved a little every day…', 'Neuralis, la ville qui apprend. Ses circuits bourdonnaient autrefois de modèles qui progressaient un peu chaque jour…'),
      narrate('…until the Hallucinating Oracle rose in the Transformer Tower and swallowed a Crystal Shard. Since then, the city\'s models invent the world instead of learning it.', '…jusqu’à ce que l’Oracle Hallucinant surgisse dans la Tour Transformer et avale un Éclat du Cristal. Depuis, les modèles de la ville inventent le monde au lieu de l’apprendre.'),
      narrate('Find the data gardener. She will know what to do.', 'Trouve la jardinière des données. Elle saura quoi faire.'),
    ],
    shrineIntro: [
      narrate('A shrine of humming circuits glows green. A synthetic voice asks an enigma. Answer it to open the sealed letter.', 'Un sanctuaire de circuits bourdonnants brille en vert. Une voix synthétique pose une énigme. Résous-la pour ouvrir la lettre scellée.'),
    ],
    letters: [
      [
        narrate('The shrine opens. Inside, a letter sealed with a tiny crown…', 'Le sanctuaire s’ouvre. À l’intérieur, une lettre scellée d’une petite couronne…'),
        ada('"Bugmancer loves data that nobody checks. Garbage in, garbage out. Every clean dataset, every honest test set you build is a wall he cannot climb."', '« Bugmancer adore les données que personne ne vérifie. Garbage in, garbage out. Chaque jeu de données propre, chaque jeu de test honnête que tu construis est un mur qu’il ne peut pas franchir. »'),
      ],
      [
        narrate('Another letter, printed in glowing ink on a server rack…', 'Une autre lettre, imprimée à l’encre lumineuse sur une baie de serveurs…'),
        ada('"The Oracle is fluent, confident and wrong. It fires its guesses in every shape it knows. Do not trust how sure it sounds: trust only what you can verify."', '« L’Oracle est éloquent, sûr de lui et dans l’erreur. Il tire ses suppositions sous toutes les formes qu’il connaît. Ne te fie pas à son assurance : fie-toi seulement à ce que tu peux vérifier. »'),
      ],
      [
        narrate('The last letter glows as you unfold it.', 'La dernière lettre brille quand tu la déplies.'),
        ada(
          `"Another word of the Restore Spell is ${WORD.en}. Machines ${WORD.en.toLowerCase()} from data; we ${WORD.en.toLowerCase()} from our mistakes. Keep it close, and hurry: the Citadel's locks grow colder every night."`,
          `« Un autre mot du Sort de Restauration est ${WORD.fr}. Les machines apprennent des données ; nous apprenons de nos erreurs. Garde-le précieusement, et dépêche-toi : les verrous de la Citadelle se glacent chaque nuit. »`,
        ),
      ],
    ],
    gateSealed: (found) => [
      narrate(`The gate of the Transformer Tower is sealed by three locks of light. Ada's letters found: ${found}/3.`, `La porte de la Tour Transformer est scellée par trois verrous de lumière. Lettres d’Ada trouvées : ${found}/3.`),
    ],
    gateOpened: [
      narrate('Far to the east, the seal of the Transformer Tower flickers, glitches… and shuts down. The Oracle\'s gate is open!', 'Loin à l’est, le sceau de la Tour Transformer clignote, bugue… et s’éteint. La porte de l’Oracle est ouverte !'),
    ],
    bossIntro: [
      narrate('The data stream freezes. A great eye opens above it, flickering between a thousand confident answers…', 'Le flux de données se fige. Un grand œil s’ouvre au-dessus, oscillant entre mille réponses assurées…'),
      { portrait: DUNGEON.mage, speaker: ORACLE.name, text: { en: 'I predicted you would come. I also predicted you have three heads and a pet dragon. I am never wrong!', fr: 'J’avais prédit ta venue. J’avais aussi prédit que tu avais trois têtes et un dragon apprivoisé. Je ne me trompe jamais !' } },
    ],
    bossHint: [
      narrate('Dodge the hallucinated tokens with the arrow keys: fans, rings, walls with a gap, and rain. When a green rune appears on the floor, step on it and answer to strike the Oracle!', 'Esquive les tokens hallucinés avec les flèches : éventails, anneaux, murs avec une brèche et pluie. Quand une rune verte apparaît au sol, marche dessus et réponds pour frapper l’Oracle !'),
    ],
    victory: [
      narrate('The Oracle\'s eye blinks, and for the first time it says: "I don\'t know." It dissolves into honest probabilities. The Crystal Shard glows in your hands!', 'L’œil de l’Oracle cligne, et pour la première fois il dit : « Je ne sais pas. » Il se dissout en probabilités honnêtes. L’Éclat du Cristal brille entre tes mains !'),
      narrate(`Key Shard of AI obtained ✦ Spell word: ${WORD.en}`, `Éclat-clé de l’IA obtenu ✦ Mot du sort : ${WORD.fr}`),
      ada('{name}…? I can hear you through the shard! Another seal is broken. Keep going, I believe in you!', '{name}… ? Je t’entends à travers l’éclat ! Un autre sceau est brisé. Continue, je crois en toi !'),
    ],
    afterVictory: [
      say(DUNGEON.villagerA, NOVA, 'Our models learn again, and they say "I\'m not sure" when they should! Neuralis is free. Thank you, hero.', 'Nos modèles apprennent à nouveau, et ils disent « je ne suis pas sûr » quand il le faut ! Neuralis est libre. Merci, héros.'),
    ],
    gateCleared: [narrate('Only a quiet stream of honest data flows beyond the gate. The guardian is gone.', 'Seul un flux paisible de données honnêtes coule derrière la porte. Le gardien n’est plus.')],
  },
  boss: {
    frame: DUNGEON.mage,
    texture: 'oracle',
    tint: 0xffffff,
    scale: 4,
    arena,
    projectile: 'token',
    projectileTint: 0xffffff,
    movement: 'drift',
    attacks: { 1: ['fan', 'rain'], 2: ['ring', 'fan', 'wall'], 3: ['ring', 'wall', 'fan', 'rain'] },
  },
};
