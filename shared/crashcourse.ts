// The crash courses taught by the dojo masters. Every Land has one: a five-module plan
// (four tiers + a boss lab) whose drills cover *every* challenge of the track, so a learner
// who finishes the course has met each concept and each challenge type before the boss.
//
// The data is shared: the client shows it in the dojo, and `npm run crashcourses` exports it
// to CRASH_COURSES.md / CRASH_COURSES.fr.md.
import { CHALLENGES_BY_TRACK } from './content';
import type { Challenge, L, Tier, TrackId } from './types';

export interface CrashCourseModule {
  /** Stable id used in save flags: m1..m5. */
  id: string;
  /** 1..4 for the tier modules, 0 for the boss lab. */
  tier: Tier | 0;
  title: L;
  goal: L;
  /** Every concept taught in this module, in course order. */
  concepts: L[];
  /** Challenge ids drilled in this module, in course order. */
  drills: string[];
  /** How the master asks the learner to work through the module. */
  method: L;
}

export interface CrashCourse {
  track: TrackId;
  title: L;
  master: L;
  dojo: L;
  assistant: L;
  summary: L;
  /** Human-readable estimate, e.g. "3–4 hours". */
  duration: L;
  prerequisites: L;
  outcomes: L[];
  /** Study habits that apply to the whole course. */
  methods: L[];
  modules: CrashCourseModule[];
  /** What the boss lab adds before the real fight. */
  exam: L;
}

interface CourseMeta {
  title: L;
  master: L;
  dojo: L;
  summary: L;
  duration: L;
  prerequisites: L;
  outcomes: L[];
  methods: L[];
}

const MODULE_TITLES: Record<1 | 2 | 3 | 4 | 5, L> = {
  1: { en: 'Foundations', fr: 'Fondations' },
  2: { en: 'Core reflexes', fr: 'Réflexes du cœur' },
  3: { en: 'Applied practice', fr: 'Mise en pratique' },
  4: { en: 'Expert pitfalls', fr: 'Pièges d’expert' },
  5: { en: 'Boss lab', fr: 'Laboratoire du boss' },
};

const MODULE_GOALS: Record<1 | 2 | 3 | 4 | 5, L> = {
  1: {
    en: 'Build the mental model: the vocabulary, syntax and tiny programs every later challenge rests on.',
    fr: 'Construire le modèle mental : le vocabulaire, la syntaxe et les petits programmes sur lesquels reposent tous les défis suivants.',
  },
  2: {
    en: 'Turn the basics into fluent reflexes with data structures, functions and short programs you can read at a glance.',
    fr: 'Transformer les bases en réflexes fluides avec les structures de données, les fonctions et de courts programmes lisibles d’un coup d’œil.',
  },
  3: {
    en: 'Apply the language to realistic problems: read an error, choose the right tool and predict what the code will do.',
    fr: 'Appliquer le langage à des problèmes réalistes : lire une erreur, choisir le bon outil et prédire ce que fait le code.',
  },
  4: {
    en: 'Handle the expert pitfalls: edge cases, performance, security and the traps that separate a working script from a solid one.',
    fr: 'Gérer les pièges d’expert : cas limites, performance, sécurité et les traquenards qui séparent un script qui marche d’un code solide.',
  },
  5: {
    en: 'Mix every challenge type under mild pressure, repair weak spots, then walk into the boss fight ready.',
    fr: 'Mélanger tous les types de défis sous une légère pression, réparer les points faibles, puis entrer dans le combat de boss prêt.',
  },
};

const MODULE_METHODS: Record<1 | 2 | 3 | 4 | 5, L> = {
  1: {
    en: 'Say each rule out loud in your own words, then answer the drills. If you miss one, read the explanation twice before moving on.',
    fr: 'Dis chaque règle à voix haute avec tes propres mots, puis réponds aux défis. Si tu en rates un, relis l’explication deux fois avant de continuer.',
  },
  2: {
    en: 'Predict the output before you submit. Write the small snippet on paper if it helps; the goal is a reflex, not a lucky guess.',
    fr: 'Prédis la sortie avant de valider. Écris le petit extrait sur papier si ça aide ; le but est un réflexe, pas un coup de chance.',
  },
  3: {
    en: 'For each drill, name the challenge type first (multiple choice, fill, order, bug hunt, command, output, riddle or code), then solve it.',
    fr: 'Pour chaque défi, nomme d’abord le type (choix multiple, texte à trous, ordre, chasse au bug, commande, sortie, énigme ou code), puis résous-le.',
  },
  4: {
    en: 'Hunt the counter-example. Ask “when does this break?” and write down the edge case that catches you. That note is your cheat sheet.',
    fr: 'Cherche le contre-exemple. Demande-toi « quand est-ce que ça casse ? » et note le cas limite qui te piège. Cette note est ton aide-mémoire.',
  },
  5: {
    en: 'Run the drills in one sitting, without hints, and keep a list of every miss. Re-run that list before you enter the boss gate.',
    fr: 'Enchaîne les défis d’une traite, sans indice, et note chaque erreur. Repasse cette liste avant de franchir la porte du boss.',
  },
};

const META: Record<TrackId, CourseMeta> = {
  javascript: {
    title: { en: 'JavaScript crash course', fr: 'Cours accéléré de JavaScript' },
    master: { en: 'Master Eventloop', fr: 'Maître Eventloop' },
    dojo: { en: 'Dojo of the Event Loop', fr: 'Dojo de la Boucle d’Événements' },
    summary: {
      en: 'The language of the web: values, functions, objects, asynchronous code and the browser runtime — taught through the eight challenge types the Land can throw at you.',
      fr: 'Le langage du web : valeurs, fonctions, objets, asynchrone et environnement du navigateur — enseigné avec les huit types de défis que la Terre peut te lancer.',
    },
    duration: { en: '3–4 hours', fr: '3 à 4 heures' },
    prerequisites: { en: 'None. This is the best first Land.', fr: 'Aucun. C’est la meilleure première Terre.' },
    outcomes: [
      { en: 'Read and write short JavaScript programs without guessing what a value is.', fr: 'Lire et écrire de courts programmes JavaScript sans deviner ce qu’est une valeur.' },
      { en: 'Use functions, objects and arrays fluently, and explain scope and closures.', fr: 'Utiliser fonctions, objets et tableaux avec aisance, et expliquer la portée et les closures.' },
      { en: 'Handle promises, async/await and errors, and recognise the classic JS traps.', fr: 'Gérer les promesses, async/await et les erreurs, et reconnaître les pièges classiques de JS.' },
    ],
    methods: [
      { en: 'Type every snippet yourself instead of only reading it. The keyboard remembers for you.', fr: 'Tape chaque extrait toi-même au lieu de seulement le lire. Le clavier se souvient pour toi.' },
      { en: 'When a prediction is wrong, explain the actual output aloud. That is where learning happens.', fr: 'Quand une prédiction est fausse, explique à voix haute la vraie sortie. C’est là que l’apprentissage se produit.' },
      { en: 'Use the browser console for every “what does this print?” drill you miss twice.', fr: 'Utilise la console du navigateur pour chaque défi « qu’affiche ce code ? » que tu rates deux fois.' },
      { en: 'Keep a “gotcha” list: coercion, this, hoisting, the event loop. Re-read it before the boss.', fr: 'Tiens une liste des pièges : coercition, this, hissage, boucle d’événements. Relis-la avant le boss.' },
    ],
  },
  typescript: {
    title: { en: 'TypeScript crash course', fr: 'Cours accéléré de TypeScript' },
    master: { en: 'Master Typewright', fr: 'Maître Typeur' },
    dojo: { en: 'Dojo of Strict Types', fr: 'Dojo des Types Stricts' },
    summary: {
      en: 'JavaScript plus a type system: annotate, infer, narrow and model data so the compiler catches bugs before the runtime does.',
      fr: 'JavaScript plus un système de types : annoter, inférer, affiner et modéliser les données pour que le compilateur attrape les bugs avant l’exécution.',
    },
    duration: { en: '3–4 hours', fr: '3 à 4 heures' },
    prerequisites: { en: 'JavaScript basics (JS Land, or one month of practice).', fr: 'Les bases de JavaScript (Terre JS, ou un mois de pratique).' },
    outcomes: [
      { en: 'Annotate functions and objects without turning everything into any.', fr: 'Annoter fonctions et objets sans tout transformer en any.' },
      { en: 'Narrow unknown values safely and design discriminated unions.', fr: 'Affiner les valeurs unknown en sécurité et concevoir des unions discriminées.' },
      { en: 'Read compiler errors and use utility, mapped and conditional types.', fr: 'Lire les erreurs du compilateur et utiliser les types utilitaires, mappés et conditionnels.' },
    ],
    methods: [
      { en: 'Read the type error bottom-up: the last line names the incompatibility.', fr: 'Lis l’erreur de type de bas en haut : la dernière ligne nomme l’incompatibilité.' },
      { en: 'Prefer inference for locals and annotations for public boundaries.', fr: 'Préfère l’inférence pour les locales et les annotations pour les frontières publiques.' },
      { en: 'When tempted by any, write unknown and narrow it with a guard instead.', fr: 'Quand tu es tenté par any, écris unknown et affine-le avec un garde.' },
      { en: 'Re-type the drill solution by hand; types are learned through the fingers.', fr: 'Retape à la main la solution du défi ; les types s’apprennent avec les doigts.' },
    ],
  },
  java: {
    title: { en: 'Java crash course', fr: 'Cours accéléré de Java' },
    master: { en: 'Master Javalon', fr: 'Maître Javalon' },
    dojo: { en: 'Dojo of the Heap', fr: 'Dojo du Tas' },
    summary: {
      en: 'A statically typed, object-oriented language on the JVM: classes, interfaces, collections, exceptions, streams and the build lifecycle.',
      fr: 'Un langage orienté objet et typé statiquement sur la JVM : classes, interfaces, collections, exceptions, streams et cycle de build.',
    },
    duration: { en: '4–5 hours', fr: '4 à 5 heures' },
    prerequisites: { en: 'Any programming basics; variables and loops help.', fr: 'Des bases de programmation ; variables et boucles aident.' },
    outcomes: [
      { en: 'Write classes with constructors, encapsulation and clear responsibilities.', fr: 'Écrire des classes avec constructeurs, encapsulation et responsabilités claires.' },
      { en: 'Choose between arrays, collections, interfaces and abstract classes.', fr: 'Choisir entre tableaux, collections, interfaces et classes abstraites.' },
      { en: 'Handle checked and unchecked exceptions and use lambdas and streams.', fr: 'Gérer les exceptions vérifiées et non vérifiées et utiliser lambdas et streams.' },
    ],
    methods: [
      { en: 'Write the class skeleton before the method body; Java rewards structure.', fr: 'Écris le squelette de la classe avant le corps des méthodes ; Java récompense la structure.' },
      { en: 'Say “is-a” or “has-a” before choosing inheritance or composition.', fr: 'Dis « est-un » ou « a-un » avant de choisir héritage ou composition.' },
      { en: 'For every exception drill, ask: who can recover, and who must declare?', fr: 'Pour chaque défi sur les exceptions, demande : qui peut récupérer, et qui doit déclarer ?' },
      { en: 'Compile mentally: types first, then nullability, then side effects.', fr: 'Compile mentalement : les types d’abord, la nullabilité ensuite, les effets de bord en dernier.' },
    ],
  },
  nodejs: {
    title: { en: 'Node.js crash course', fr: 'Cours accéléré de Node.js' },
    master: { en: 'Master Callback', fr: 'Maître Callback' },
    dojo: { en: 'Dojo of the Server', fr: 'Dojo du Serveur' },
    summary: {
      en: 'JavaScript on the server: modules, npm, files, HTTP, Express, streams, the event loop and production safety.',
      fr: 'JavaScript côté serveur : modules, npm, fichiers, HTTP, Express, streams, boucle d’événements et sécurité en production.',
    },
    duration: { en: '4–5 hours', fr: '4 à 5 heures' },
    prerequisites: { en: 'JavaScript basics (JS Land) and a terminal.', fr: 'Les bases de JavaScript (Terre JS) et un terminal.' },
    outcomes: [
      { en: 'Structure a Node project with modules, scripts and dependencies.', fr: 'Structurer un projet Node avec modules, scripts et dépendances.' },
      { en: 'Serve HTTP with Express, middleware and proper error handling.', fr: 'Servir du HTTP avec Express, middleware et gestion d’erreurs correcte.' },
      { en: 'Use fs, streams, Buffers and worker threads without blocking the loop.', fr: 'Utiliser fs, streams, Buffers et worker threads sans bloquer la boucle.' },
    ],
    methods: [
      { en: 'Draw the event loop before any async drill: timers, I/O, microtasks.', fr: 'Dessine la boucle d’événements avant tout défi asynchrone : timers, I/O, microtâches.' },
      { en: 'Run every command drill in a scratch folder; npm rewards muscle memory.', fr: 'Lance chaque défi de commande dans un dossier brouillon ; npm récompense la mémoire musculaire.' },
      { en: 'For HTTP, trace one request end-to-end: socket, parser, middleware, handler, response.', fr: 'Pour HTTP, suis une requête de bout en bout : socket, parseur, middleware, handler, réponse.' },
      { en: 'Never trust input: validate, escape and parameterise before you ship.', fr: 'Ne fais jamais confiance aux entrées : valide, échappe et paramètre avant de livrer.' },
    ],
  },
  python: {
    title: { en: 'Python crash course', fr: 'Cours accéléré de Python' },
    master: { en: 'Master Indent', fr: 'Maître Indent' },
    dojo: { en: 'Dojo of the Serpent', fr: 'Dojo du Serpent' },
    summary: {
      en: 'Readable, powerful, everywhere: types, containers, functions, classes, exceptions, generators and the standard library.',
      fr: 'Lisible, puissant, partout : types, conteneurs, fonctions, classes, exceptions, générateurs et bibliothèque standard.',
    },
    duration: { en: '3–4 hours', fr: '3 à 4 heures' },
    prerequisites: { en: 'None. Python is a gentle first language.', fr: 'Aucun. Python est un premier langage tout doux.' },
    outcomes: [
      { en: 'Use lists, dicts, sets and comprehensions to transform data.', fr: 'Utiliser listes, dictionnaires, ensembles et compréhensions pour transformer des données.' },
      { en: 'Write functions and classes with clear arguments, scope and dunder methods.', fr: 'Écrire fonctions et classes avec arguments, portée et méthodes dunder clairs.' },
      { en: 'Handle errors, files, generators, decorators and context managers.', fr: 'Gérer erreurs, fichiers, générateurs, décorateurs et gestionnaires de contexte.' },
    ],
    methods: [
      { en: 'Indent deliberately: four spaces, one block at a time, before writing the body.', fr: 'Indente délibérément : quatre espaces, un bloc à la fois, avant d’écrire le corps.' },
      { en: 'In the REPL, test one expression per line; Python explains itself when you ask.', fr: 'Dans le REPL, teste une expression par ligne ; Python s’explique quand on lui demande.' },
      { en: 'For mutable defaults and scope drills, draw the boxes: name → object → value.', fr: 'Pour les défauts mutables et la portée, dessine les boîtes : nom → objet → valeur.' },
      { en: 'Read the traceback from the bottom: exception type, message, then the line.', fr: 'Lis la trace d’appels par le bas : type d’exception, message, puis la ligne.' },
    ],
  },
  git: {
    title: { en: 'Git crash course', fr: 'Cours accéléré de Git' },
    master: { en: 'Master Branch', fr: 'Maître Branche' },
    dojo: { en: 'Dojo of the Three Trees', fr: 'Dojo des Trois Arbres' },
    summary: {
      en: 'Time travel for your code: snapshots, branches, merges, conflicts, remotes and the recovery tools that save a bad afternoon.',
      fr: 'Le voyage dans le temps du code : instantanés, branches, fusions, conflits, dépôts distants et les outils de secours qui sauvent une mauvaise journée.',
    },
    duration: { en: '2–3 hours', fr: '2 à 3 heures' },
    prerequisites: { en: 'Basic command line (Linux Land helps).', fr: 'La ligne de commande de base (la Terre Linux aide).' },
    outcomes: [
      { en: 'Explain the working tree, the index and the repository, and move changes between them.', fr: 'Expliquer l’arbre de travail, l’index et le dépôt, et déplacer les changements entre eux.' },
      { en: 'Create branches, merge them and resolve conflicts without panic.', fr: 'Créer des branches, les fusionner et résoudre les conflits sans panique.' },
      { en: 'Use stash, reflog, reset and remotes to recover and collaborate.', fr: 'Utiliser stash, reflog, reset et les dépôts distants pour récupérer et collaborer.' },
    ],
    methods: [
      { en: 'Draw the three areas and the arrows between them before every command drill.', fr: 'Dessine les trois zones et les flèches entre elles avant chaque défi de commande.' },
      { en: 'Run every command in a throwaway repository; mistakes are free there.', fr: 'Lance chaque commande dans un dépôt jetable ; les erreurs y sont gratuites.' },
      { en: 'Read `git status` and `git log --oneline --graph` after each step.', fr: 'Lis `git status` et `git log --oneline --graph` après chaque étape.' },
      { en: 'When a conflict appears, identify “ours”, “theirs” and the desired result before editing.', fr: 'Quand un conflit apparaît, identifie « le nôtre », « le leur » et le résultat voulu avant d’éditer.' },
    ],
  },
  github: {
    title: { en: 'GitHub crash course', fr: 'Cours accéléré de GitHub' },
    master: { en: 'Master Octo', fr: 'Maître Octo' },
    dojo: { en: 'Dojo of the Pull Request', fr: 'Dojo de la Pull Request' },
    summary: {
      en: 'Collaborate, review, ship: forks, branches, pull requests, reviews, issues, Actions and releases.',
      fr: 'Collaborer, relire, livrer : forks, branches, pull requests, revues, issues, Actions et releases.',
    },
    duration: { en: '2–3 hours', fr: '2 à 3 heures' },
    prerequisites: { en: 'Git basics (Git Land).', fr: 'Les bases de Git (Terre Git).' },
    outcomes: [
      { en: 'Contribute through a fork and a focused pull request.', fr: 'Contribuer via un fork et une pull request ciblée.' },
      { en: 'Review code constructively and use issues to plan work.', fr: 'Relire le code de façon constructive et utiliser les issues pour planifier.' },
      { en: 'Automate checks with Actions and publish a release.', fr: 'Automatiser les vérifications avec Actions et publier une release.' },
    ],
    methods: [
      { en: 'Keep one pull request = one idea; split anything you cannot describe in one sentence.', fr: 'Une pull request = une idée ; découpe tout ce que tu ne peux pas décrire en une phrase.' },
      { en: 'Write the PR description before the code: problem, change, test plan.', fr: 'Écris la description de la PR avant le code : problème, changement, plan de test.' },
      { en: 'Review the diff, not the author. Ask questions, then suggest.', fr: 'Relis le diff, pas l’auteur. Pose des questions, puis suggère.' },
      { en: 'Watch one Actions run from start to finish; logs are the skill.', fr: 'Regarde une exécution Actions du début à la fin ; les logs sont la compétence.' },
    ],
  },
  linux: {
    title: { en: 'Linux crash course', fr: 'Cours accéléré de Linux' },
    master: { en: 'Master Shell', fr: 'Maître Shell' },
    dojo: { en: 'Dojo of the Kernel', fr: 'Dojo du Noyau' },
    summary: {
      en: 'Master the command line: the filesystem, permissions, pipes, processes, packages, networking and backups.',
      fr: 'Maîtrise la ligne de commande : système de fichiers, permissions, pipes, processus, paquets, réseau et sauvegardes.',
    },
    duration: { en: '3–4 hours', fr: '3 à 4 heures' },
    prerequisites: { en: 'None; a terminal on any OS is enough to follow along.', fr: 'Aucun ; un terminal sur n’importe quel OS suffit pour suivre.' },
    outcomes: [
      { en: 'Navigate the filesystem and read, find and combine files with the shell.', fr: 'Naviguer dans le système de fichiers et lire, trouver et combiner des fichiers avec le shell.' },
      { en: 'Reason about permissions, processes, signals and exit codes.', fr: 'Raisonner sur les permissions, processus, signaux et codes de sortie.' },
      { en: 'Automate a small task with a script, cron, ssh and a backup.', fr: 'Automatiser une petite tâche avec un script, cron, ssh et une sauvegarde.' },
    ],
    methods: [
      { en: 'Use `man` and `--help` before guessing; the manual is part of the skill.', fr: 'Utilise `man` et `--help` avant de deviner ; le manuel fait partie de la compétence.' },
      { en: 'Say what a pipe does to stdout and stderr before running it.', fr: 'Dis ce qu’un pipe fait à stdout et stderr avant de l’exécuter.' },
      { en: 'For permissions, convert between symbolic and numeric until it is automatic.', fr: 'Pour les permissions, convertis entre symbolique et numérique jusqu’à l’automatisme.' },
      { en: 'Test destructive commands on a scratch folder, never on your home directory.', fr: 'Teste les commandes destructrices dans un dossier brouillon, jamais dans ton dossier personnel.' },
    ],
  },
  devops: {
    title: { en: 'DevOps crash course', fr: 'Cours accéléré de DevOps' },
    master: { en: 'Master Pipeline', fr: 'Maître Pipeline' },
    dojo: { en: 'Dojo of the Pipeline', fr: 'Dojo du Pipeline' },
    summary: {
      en: 'Build, ship, run, observe: containers, CI/CD, infrastructure as code, cloud, monitoring and incident response.',
      fr: 'Construire, livrer, exécuter, observer : conteneurs, CI/CD, infrastructure as code, cloud, supervision et réponse aux incidents.',
    },
    duration: { en: '4–5 hours', fr: '4 à 5 heures' },
    prerequisites: { en: 'Linux and Git basics; a little Node or Python helps.', fr: 'Les bases de Linux et Git ; un peu de Node ou Python aide.' },
    outcomes: [
      { en: 'Containerise an app and explain image, container, volume and network.', fr: 'Conteneuriser une application et expliquer image, conteneur, volume et réseau.' },
      { en: 'Design a CI/CD pipeline with tests, builds and safe deploys.', fr: 'Concevoir un pipeline CI/CD avec tests, builds et déploiements sûrs.' },
      { en: 'Monitor a service and debug a failing deployment from logs and metrics.', fr: 'Superviser un service et déboguer un déploiement en échec depuis les logs et métriques.' },
    ],
    methods: [
      { en: 'Trace one commit from push to production; name every stage aloud.', fr: 'Suis un commit du push à la production ; nomme chaque étape à voix haute.' },
      { en: 'For Docker, compare the image (recipe) with the container (running instance).', fr: 'Pour Docker, compare l’image (la recette) au conteneur (l’instance en cours).' },
      { en: 'Write the rollback plan before the deploy plan.', fr: 'Écris le plan de retour arrière avant le plan de déploiement.' },
      { en: 'Read one real incident post-mortem; note the detection, mitigation and prevention.', fr: 'Lis un vrai post-mortem d’incident ; note la détection, l’atténuation et la prévention.' },
    ],
  },
  ai: {
    title: { en: 'AI crash course', fr: 'Cours accéléré d’IA' },
    master: { en: 'Master Gradient', fr: 'Maître Gradient' },
    dojo: { en: 'Dojo of the Neural Path', fr: 'Dojo du Chemin Neural' },
    summary: {
      en: 'Teach machines to learn: data, loss, gradients, evaluation, neural networks, transformers, RAG and safety.',
      fr: 'Apprendre aux machines à apprendre : données, perte, gradients, évaluation, réseaux de neurones, transformers, RAG et sécurité.',
    },
    duration: { en: '4–5 hours', fr: '4 à 5 heures' },
    prerequisites: { en: 'Python basics and a little algebra (functions, averages).', fr: 'Les bases de Python et un peu d’algèbre (fonctions, moyennes).' },
    outcomes: [
      { en: 'Frame a problem as supervised or unsupervised and split data honestly.', fr: 'Formuler un problème en supervisé ou non supervisé et découper les données honnêtement.' },
      { en: 'Explain loss, gradient descent, overfitting and the right metric.', fr: 'Expliquer perte, descente de gradient, surapprentissage et la bonne métrique.' },
      { en: 'Describe transformers, embeddings, RAG and the main failure modes.', fr: 'Décrire transformers, embeddings, RAG et les principaux modes de défaillance.' },
    ],
    methods: [
      { en: 'For every model, write inputs, outputs, loss and metric in one line.', fr: 'Pour chaque modèle, écris entrées, sorties, perte et métrique en une ligne.' },
      { en: 'Always ask what the baseline is; a model must beat something.', fr: 'Demande toujours quelle est la référence ; un modèle doit battre quelque chose.' },
      { en: 'Draw the training loop: forward, loss, backward, step, repeat.', fr: 'Dessine la boucle d’entraînement : avant, perte, rétropropagation, pas, répéter.' },
      { en: 'Treat hallucinations as a product risk, not a funny bug: verify with retrieval.', fr: 'Traite les hallucinations comme un risque produit, pas un bug amusant : vérifie par récupération.' },
    ],
  },
};

/** Pick up to `n` challenges covering as many different kinds as possible. */
function sampleByKind(list: Challenge[], n: number): Challenge[] {
  const picked: Challenge[] = [];
  const kinds = new Set<string>();
  for (const c of list) {
    if (picked.length >= n) break;
    if (!kinds.has(c.kind)) {
      kinds.add(c.kind);
      picked.push(c);
    }
  }
  for (const c of list) {
    if (picked.length >= n) break;
    if (!picked.includes(c)) picked.push(c);
  }
  return picked;
}

function buildCourse(track: TrackId, meta: CourseMeta): CrashCourse {
  const all = CHALLENGES_BY_TRACK[track];
  const modules: CrashCourseModule[] = [];

  for (const tier of [1, 2, 3, 4] as Tier[]) {
    const list = all.filter((c) => c.tier === tier);
    if (!list.length) continue;
    modules.push({
      id: `m${modules.length + 1}`,
      tier,
      title: MODULE_TITLES[tier],
      goal: MODULE_GOALS[tier],
      concepts: list.map((c) => c.concept),
      drills: list.map((c) => c.id),
      method: MODULE_METHODS[tier],
    });
  }

  // The boss lab samples every challenge kind once, then fills with the hardest remaining
  // challenges. It is deliberately short: it is a dress rehearsal, not a second course.
  const hardest = [...all].sort((a, b) => b.tier - a.tier);
  const lab = sampleByKind(hardest, 8);
  modules.push({
    id: `m${modules.length + 1}`,
    tier: 0,
    title: MODULE_TITLES[5],
    goal: MODULE_GOALS[5],
    concepts: lab.map((c) => c.concept),
    drills: lab.map((c) => c.id),
    method: MODULE_METHODS[5],
  });

  return {
    track,
    title: meta.title,
    master: meta.master,
    dojo: meta.dojo,
    assistant: { en: 'Sparring Bug', fr: 'Bug d’entraînement' },
    summary: meta.summary,
    duration: meta.duration,
    prerequisites: meta.prerequisites,
    outcomes: meta.outcomes,
    methods: meta.methods,
    modules,
    exam: {
      en: 'The boss lab mixes multiple-choice, fill-in, ordering, bug hunts, commands, output prediction, riddles and code. Finish it without hints, then enter the boss gate: its runes draw from the same pool.',
      fr: 'Le laboratoire du boss mélange choix multiples, textes à trous, remises en ordre, chasses au bug, commandes, prédiction de sortie, énigmes et code. Termine-le sans indice, puis franchis la porte du boss : ses runes puisent dans le même vivier.',
    },
  };
}

export const CRASH_COURSES: Record<TrackId, CrashCourse> = Object.fromEntries(
  (Object.keys(META) as TrackId[]).map((track) => [track, buildCourse(track, META[track])]),
) as Record<TrackId, CrashCourse>;

/** The save flag marking a module as completed in a Land. */
export function moduleFlag(track: TrackId, moduleId: string): string {
  return `dojo:${track}:${moduleId}`;
}

/** The save flag marking the whole course as completed. */
export function masteredFlag(track: TrackId): string {
  return `dojo:${track}:mastered`;
}
