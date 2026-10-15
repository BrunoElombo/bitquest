import type { L, TrackId } from './types';

export interface BossDef {
  name: L;
  title: L;
  /** Emoji used as the boss "sprite". */
  sprite: string;
  maxHp: number;
  /** Damage dealt to the player on a wrong answer or a timeout. */
  attack: number;
  taunts: L[];
}

export interface TrackDef {
  id: TrackId;
  name: string;
  icon: string;
  /** Tailwind-friendly hex accent color. */
  color: string;
  tagline: L;
  boss: BossDef;
}

export const TRACKS: TrackDef[] = [
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: 'JS',
    color: '#f7df1e',
    tagline: { en: 'The language of the web', fr: 'Le langage du web' },
    boss: {
      name: { en: 'The Callback Kraken', fr: 'Le Kraken des Callbacks' },
      title: { en: 'Lord of the Pyramid of Doom', fr: 'Seigneur de la Pyramide Infernale' },
      sprite: '🐙',
      maxHp: 100,
      attack: 20,
      taunts: [
        { en: 'undefined is not a function... and neither are you!', fr: "undefined n'est pas une fonction... et toi non plus !" },
        { en: 'My tentacles are nested 12 levels deep!', fr: 'Mes tentacules sont imbriqués sur 12 niveaux !' },
        { en: 'NaN === NaN? Never!', fr: 'NaN === NaN ? Jamais !' },
      ],
    },
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: 'TS',
    color: '#3178c6',
    tagline: { en: 'JavaScript with super-powers', fr: 'JavaScript avec des super-pouvoirs' },
    boss: {
      name: { en: 'The Any Golem', fr: "Le Golem 'any'" },
      title: { en: 'Devourer of Types', fr: 'Dévoreur de Types' },
      sprite: '🗿',
      maxHp: 110,
      attack: 20,
      taunts: [
        { en: 'Type everything as any. Resistance is untyped.', fr: 'Type tout en any. La résistance est non typée.' },
        { en: "Property 'victory' does not exist on type 'You'.", fr: "La propriété 'victoire' n'existe pas sur le type 'Toi'." },
      ],
    },
  },
  {
    id: 'java',
    name: 'Java',
    icon: '☕',
    color: '#e76f00',
    tagline: { en: 'Write once, run anywhere', fr: 'Écrire une fois, exécuter partout' },
    boss: {
      name: { en: 'The NullPointer Wraith', fr: 'Le Spectre NullPointer' },
      title: { en: 'Haunter of the Heap', fr: 'Hanteur du Tas' },
      sprite: '👻',
      maxHp: 110,
      attack: 22,
      taunts: [
        { en: 'Exception in thread "main": you.', fr: 'Exception dans le thread "main" : toi.' },
        { en: 'AbstractSingletonProxyFactoryBean awaits you.', fr: "AbstractSingletonProxyFactoryBean t'attend." },
      ],
    },
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    icon: '⬢',
    color: '#5fa04e',
    tagline: { en: 'JavaScript on the server', fr: 'JavaScript côté serveur' },
    boss: {
      name: { en: 'The Event Loop Hydra', fr: "L'Hydre de la Boucle d'Événements" },
      title: { en: 'Blocker of Threads', fr: 'Bloqueuse de Threads' },
      sprite: '🐉',
      maxHp: 110,
      attack: 20,
      taunts: [
        { en: 'I will block your event loop forever!', fr: "Je bloquerai ta boucle d'événements pour toujours !" },
        { en: 'node_modules weighs more than a black hole.', fr: 'node_modules pèse plus lourd qu’un trou noir.' },
      ],
    },
  },
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    color: '#4b8bbe',
    tagline: { en: 'Readable, powerful, everywhere', fr: 'Lisible, puissant, partout' },
    boss: {
      name: { en: 'The Indentation Serpent', fr: "Le Serpent de l'Indentation" },
      title: { en: 'Mixer of Tabs and Spaces', fr: 'Mélangeur de Tabs et d’Espaces' },
      sprite: '🐍',
      maxHp: 100,
      attack: 20,
      taunts: [
        { en: 'IndentationError: unexpected hero.', fr: 'IndentationError : héros inattendu.' },
        { en: 'My default argument is a mutable list. Muahaha!', fr: 'Mon argument par défaut est une liste mutable. Mouahaha !' },
      ],
    },
  },
  {
    id: 'git',
    name: 'Git',
    icon: '⎇',
    color: '#f05032',
    tagline: { en: 'Time travel for your code', fr: 'Le voyage dans le temps pour ton code' },
    boss: {
      name: { en: 'The Merge Conflict Chimera', fr: 'La Chimère des Conflits de Fusion' },
      title: { en: '<<<<<<< HEAD of Chaos', fr: '<<<<<<< HEAD du Chaos' },
      sprite: '🦁',
      maxHp: 100,
      attack: 22,
      taunts: [
        { en: 'git push --force and all is lost!', fr: 'git push --force et tout est perdu !' },
        { en: 'You are in detached HEAD state. Forever.', fr: 'Tu es en état HEAD détaché. Pour toujours.' },
      ],
    },
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: '🐱',
    color: '#a371f7',
    tagline: { en: 'Collaborate, review, ship', fr: 'Collaborer, relire, livrer' },
    boss: {
      name: { en: 'The Stale PR Phantom', fr: 'Le Fantôme des PR Oubliées' },
      title: { en: 'Keeper of 400 Unread Notifications', fr: 'Gardien de 400 Notifications Non Lues' },
      sprite: '👾',
      maxHp: 100,
      attack: 20,
      taunts: [
        { en: 'LGTM without reading. Approved!', fr: 'LGTM sans lire. Approuvé !' },
        { en: 'Your CI is red and so is your future.', fr: 'Ta CI est rouge, et ton avenir aussi.' },
      ],
    },
  },
  {
    id: 'linux',
    name: 'Linux',
    icon: '🐧',
    color: '#fcc624',
    tagline: { en: 'Master the command line', fr: 'Maîtrise la ligne de commande' },
    boss: {
      name: { en: 'The Kernel Panic Golem', fr: 'Le Golem Kernel Panic' },
      title: { en: 'Wielder of rm -rf', fr: 'Porteur de rm -rf' },
      sprite: '🤖',
      maxHp: 110,
      attack: 22,
      taunts: [
        { en: 'Permission denied. Always.', fr: 'Permission refusée. Toujours.' },
        { en: 'How do you exit vim? You don’t.', fr: 'Comment quitter vim ? On ne quitte pas.' },
      ],
    },
  },
  {
    id: 'devops',
    name: 'DevOps',
    icon: '♾',
    color: '#2496ed',
    tagline: { en: 'Build, ship, run, observe', fr: 'Construire, livrer, exécuter, observer' },
    boss: {
      name: { en: 'The Pipeline Dragon', fr: 'Le Dragon du Pipeline' },
      title: { en: 'Breaker of Production on Fridays', fr: 'Casseur de Prod le Vendredi' },
      sprite: '🐲',
      maxHp: 120,
      attack: 24,
      taunts: [
        { en: 'It works on my machine. Not on yours!', fr: 'Ça marche sur ma machine. Pas sur la tienne !' },
        { en: 'CrashLoopBackOff is my favorite state.', fr: 'CrashLoopBackOff est mon état préféré.' },
      ],
    },
  },
  {
    id: 'ai',
    name: 'AI',
    icon: '🧠',
    color: '#00e5b0',
    tagline: { en: 'Teach machines to learn', fr: 'Apprendre aux machines à apprendre' },
    boss: {
      name: { en: 'The Hallucinating Oracle', fr: "L'Oracle Hallucinant" },
      title: { en: 'Prophet of Things That Never Were', fr: "Prophète de ce qui n'a jamais existé" },
      sprite: '🔮',
      maxHp: 110,
      attack: 22,
      taunts: [
        { en: 'I am 99% confident. In something I just made up.', fr: "J'en suis sûr à 99 %. De quelque chose que je viens d'inventer." },
        { en: 'Your test set? I trained on it. Muahaha!', fr: "Ton jeu de test ? Je me suis entraîné dessus. Mouahaha !" },
      ],
    },
  },
];

export const TRACK_BY_ID: Record<TrackId, TrackDef> = Object.fromEntries(
  TRACKS.map((t) => [t.id, t]),
) as Record<TrackId, TrackDef>;

export const TIER_NAMES: Record<number, L> = {
  1: { en: 'Novice', fr: 'Novice' },
  2: { en: 'Apprentice', fr: 'Apprenti' },
  3: { en: 'Adept', fr: 'Adepte' },
  4: { en: 'Expert', fr: 'Expert' },
};
