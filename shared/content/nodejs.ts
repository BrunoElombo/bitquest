import type { Challenge } from '../types';

export const challenges: Challenge[] = [
  // ───────────────────────────── Tier 1 · Novice ─────────────────────────────
  {
    id: 'node-001',
    track: 'nodejs',
    tier: 1,
    kind: 'mcq',
    concept: { en: 'What is Node.js', fr: "Qu'est-ce que Node.js" },
    prompt: {
      en: 'What is Node.js?',
      fr: "Qu'est-ce que Node.js ?",
    },
    options: [
      { en: 'A new programming language derived from JavaScript', fr: 'Un nouveau langage de programmation dérivé de JavaScript' },
      { en: 'A JavaScript framework for building web pages', fr: 'Un framework JavaScript pour construire des pages web' },
      {
        en: 'A runtime that executes JavaScript outside the browser, built on the V8 engine',
        fr: "Un environnement d'exécution qui fait tourner JavaScript hors du navigateur, basé sur le moteur V8",
      },
      { en: 'A database designed for JavaScript objects', fr: 'Une base de données conçue pour les objets JavaScript' },
    ],
    answer: 2,
    hint: {
      en: 'Node did not change the language: it changed where the language can run.',
      fr: "Node n'a pas changé le langage : il a changé l'endroit où il peut s'exécuter.",
    },
    explanation: {
      en: "Node.js is a runtime: it embeds Chrome's V8 engine and adds APIs the browser doesn't have (files, network, processes) instead of the DOM. It runs your JavaScript on a single main thread with an event loop and non-blocking I/O, which makes it great for servers and tools.",
      fr: "Node.js est un environnement d'exécution : il embarque le moteur V8 de Chrome et ajoute des API absentes du navigateur (fichiers, réseau, processus) à la place du DOM. Il exécute votre JavaScript sur un seul thread principal avec une boucle d'événements et des E/S non bloquantes, ce qui le rend idéal pour les serveurs et les outils.",
    },
  },
  {
    id: 'node-002',
    track: 'nodejs',
    tier: 1,
    kind: 'command',
    concept: { en: 'npm init', fr: 'npm init' },
    prompt: {
      en: 'Type the npm command that creates a `package.json` with default values, without asking any questions.',
      fr: 'Tapez la commande npm qui crée un `package.json` avec les valeurs par défaut, sans poser de questions.',
    },
    accepted: ['npm init -y', 'npm init --yes'],
    patterns: ['npm init (-y|--yes)'],
    hint: {
      en: 'The subcommand starts a new project; a short flag answers "yes" to everything.',
      fr: 'La sous-commande démarre un nouveau projet ; une option courte répond « oui » à tout.',
    },
    explanation: {
      en: '`npm init` creates the `package.json` that describes your project (name, version, scripts, dependencies). The `-y` / `--yes` flag accepts every default so you can start immediately and edit the file later.',
      fr: '`npm init` crée le `package.json` qui décrit votre projet (nom, version, scripts, dépendances). L’option `-y` / `--yes` accepte toutes les valeurs par défaut : vous démarrez tout de suite et modifiez le fichier plus tard.',
    },
  },
  {
    id: 'node-003',
    track: 'nodejs',
    tier: 1,
    kind: 'output',
    concept: { en: 'process.argv', fr: 'process.argv' },
    prompt: {
      en: 'This file is run with `node greet.js Ada Lovelace`. What does it print?',
      fr: 'Ce fichier est lancé avec `node greet.js Ada Lovelace`. Qu’affiche-t-il ?',
    },
    code: `// greet.js
const args = process.argv.slice(2);
console.log(args.length, args.join('-'));`,
    codeLang: 'javascript',
    accepted: ['2 Ada-Lovelace'],
    hint: {
      en: 'The first two entries of `process.argv` are the path to node and the path to the script.',
      fr: 'Les deux premières entrées de `process.argv` sont le chemin de node et le chemin du script.',
    },
    explanation: {
      en: '`process.argv` is an array of the command-line arguments: `[nodePath, scriptPath, ...userArgs]`. That is why `slice(2)` is the classic way to get only the arguments typed by the user, here `[\'Ada\', \'Lovelace\']`.',
      fr: "`process.argv` est un tableau des arguments de la ligne de commande : `[cheminNode, cheminScript, ...argsUtilisateur]`. C'est pourquoi `slice(2)` est la façon classique de ne garder que les arguments tapés par l'utilisateur, ici `['Ada', 'Lovelace']`.",
    },
  },
  {
    id: 'node-004',
    track: 'nodejs',
    tier: 1,
    kind: 'riddle',
    concept: { en: 'package.json', fr: 'package.json' },
    prompt: {
      en: "I sit at the root of every Node project, written in JSON.\nI know your name and version, I keep your scripts,\nand I list every dependency you need with its version range.\nWhat file am I?",
      fr: "Je trône à la racine de chaque projet Node, écrit en JSON.\nJe connais ton nom et ta version, je garde tes scripts,\net je liste chaque dépendance avec sa plage de versions.\nQuel fichier suis-je ?",
    },
    accepted: ['package.json', 'package json', 'packagejson', 'package'],
    hint: {
      en: 'npm creates me with `npm init`, and `npm install` reads me.',
      fr: 'npm me crée avec `npm init`, et `npm install` me lit.',
    },
    explanation: {
      en: '`package.json` is the manifest of a Node project: metadata, `scripts` runnable with `npm run`, `dependencies` and `devDependencies`, and the module type (`"type": "module"`). The exact installed versions are locked separately in `package-lock.json`.',
      fr: "`package.json` est le manifeste d'un projet Node : métadonnées, `scripts` lançables avec `npm run`, `dependencies` et `devDependencies`, et le type de module (`\"type\": \"module\"`). Les versions exactes installées sont verrouillées à part dans `package-lock.json`.",
    },
  },
  {
    id: 'node-005',
    track: 'nodejs',
    tier: 1,
    kind: 'fill',
    concept: { en: 'CommonJS modules', fr: 'Modules CommonJS' },
    prompt: {
      en: 'Using CommonJS, export `add` from `math.js` and load it in `app.js`.',
      fr: 'Avec CommonJS, exportez `add` depuis `math.js` et chargez-la dans `app.js`.',
    },
    template: `// math.js
function add(a, b) { return a + b; }
module.___ = { add };

// app.js
const { add } = ___('./math');
console.log(add(2, 3)); // 5`,
    blanks: [['exports'], ['require']],
    hint: {
      en: 'The object that leaves a file is a property of `module`; the function that loads a file is a verb meaning "to need".',
      fr: 'L’objet qui sort d’un fichier est une propriété de `module` ; la fonction qui charge un fichier est un verbe anglais signifiant « exiger ».',
    },
    explanation: {
      en: 'In CommonJS, the historical Node module system, whatever you assign to `module.exports` is what `require()` returns, loaded synchronously. The modern alternative is ES modules (`export` / `import`), enabled with `.mjs` files or `"type": "module"` in package.json.',
      fr: "Avec CommonJS, le système de modules historique de Node, ce que vous affectez à `module.exports` est ce que renvoie `require()`, chargé de façon synchrone. L'alternative moderne est les modules ES (`export` / `import`), activés par les fichiers `.mjs` ou `\"type\": \"module\"` dans package.json.",
    },
  },
  {
    id: 'node-006',
    track: 'nodejs',
    tier: 1,
    kind: 'code',
    concept: { en: 'Environment config', fr: "Configuration par l'environnement" },
    prompt: {
      en: 'Write `getPort(env)`: return `env.PORT` converted to a number if it is an integer between 1 and 65535, otherwise return the default port 3000. (In a real app you would call `getPort(process.env)`.)',
      fr: 'Écrivez `getPort(env)` : renvoyez `env.PORT` converti en nombre s’il s’agit d’un entier entre 1 et 65535, sinon renvoyez le port par défaut 3000. (Dans une vraie application, on appellerait `getPort(process.env)`.)',
    },
    language: 'javascript',
    starter: `function getPort(env) {
  // TODO: env.PORT is a string (or undefined). Validate it, else return 3000
  return 3000;
}`,
    tests: `assertEqual(getPort({ PORT: '8080' }), 8080, 'valid port');
assertEqual(getPort({}), 3000, 'missing PORT');
assertEqual(getPort({ PORT: 'abc' }), 3000, 'not a number');
assertEqual(getPort({ PORT: '' }), 3000, 'empty string');
assertEqual(getPort({ PORT: '70000' }), 3000, 'out of range');`,
    solution: `function getPort(env) {
  const port = Number(env.PORT);
  if (Number.isInteger(port) && port >= 1 && port <= 65535) {
    return port;
  }
  return 3000;
}`,
    hint: {
      en: "Environment variables are always strings. `Number('')` is 0 and `Number(undefined)` is NaN.",
      fr: "Les variables d'environnement sont toujours des chaînes. `Number('')` vaut 0 et `Number(undefined)` vaut NaN.",
    },
    explanation: {
      en: 'Configuration (ports, URLs, secrets) belongs in environment variables, read through `process.env`, so the same code runs in dev and production. Their values are always strings or `undefined`, so always convert and validate them, and fall back to a safe default.',
      fr: "La configuration (ports, URL, secrets) se place dans des variables d'environnement, lues via `process.env`, pour que le même code tourne en développement et en production. Leurs valeurs sont toujours des chaînes ou `undefined` : convertissez-les et validez-les toujours, avec une valeur par défaut sûre.",
    },
  },

  // ─────────────────────────── Tier 2 · Apprentice ───────────────────────────
  {
    id: 'node-007',
    track: 'nodejs',
    tier: 2,
    kind: 'mcq',
    concept: { en: 'Semantic versioning', fr: 'Versionnage sémantique' },
    prompt: {
      en: 'In `package.json`, which versions does this caret range accept?',
      fr: 'Dans `package.json`, quelles versions cette plage avec accent circonflexe accepte-t-elle ?',
    },
    code: `"dependencies": {
  "express": "^4.18.2"
}`,
    codeLang: 'json',
    options: [
      { en: 'Exactly 4.18.2 and nothing else', fr: 'Exactement 4.18.2 et rien d’autre' },
      { en: 'Any 4.x.x version greater than or equal to 4.18.2, but not 5.0.0', fr: 'Toute version 4.x.x supérieure ou égale à 4.18.2, mais pas 5.0.0' },
      { en: 'Only patch updates: 4.18.x', fr: 'Uniquement les correctifs : 4.18.x' },
      { en: 'Any version, including 5.0.0', fr: 'N’importe quelle version, y compris 5.0.0' },
    ],
    answer: 1,
    hint: {
      en: 'In MAJOR.MINOR.PATCH, which number signals breaking changes?',
      fr: 'Dans MAJEUR.MINEUR.CORRECTIF, quel nombre signale des changements incompatibles ?',
    },
    explanation: {
      en: 'Semver versions are MAJOR.MINOR.PATCH: a major bump means breaking changes. The caret `^4.18.2` allows any compatible update (new minors and patches) below 5.0.0, while the tilde `~4.18.2` only allows patches (4.18.x). `package-lock.json` then pins the exact version installed.',
      fr: "Les versions semver sont MAJEUR.MINEUR.CORRECTIF : une hausse de majeur signifie des changements incompatibles. L'accent circonflexe `^4.18.2` autorise toute mise à jour compatible (nouveaux mineurs et correctifs) en dessous de 5.0.0, tandis que le tilde `~4.18.2` n'autorise que les correctifs (4.18.x). `package-lock.json` fige ensuite la version exacte installée.",
    },
  },
  {
    id: 'node-008',
    track: 'nodejs',
    tier: 2,
    kind: 'command',
    concept: { en: 'Dev dependencies', fr: 'Dépendances de développement' },
    prompt: {
      en: 'Install the linter `eslint` as a development dependency (needed to work on the project, not to run it in production).',
      fr: "Installez le linter `eslint` comme dépendance de développement (utile pour travailler sur le projet, pas pour l'exécuter en production).",
    },
    accepted: ['npm install --save-dev eslint', 'npm install -D eslint', 'npm i -D eslint', 'npm i --save-dev eslint'],
    patterns: ['npm (install|i|add) (--save-dev|-D) eslint', 'npm (install|i|add) eslint (--save-dev|-D)'],
    hint: {
      en: 'Use `npm install` with the flag that saves to `devDependencies`.',
      fr: 'Utilisez `npm install` avec l’option qui enregistre dans `devDependencies`.',
    },
    explanation: {
      en: '`npm install --save-dev` (or `-D`) adds the package under `devDependencies`: tools like linters, test runners or TypeScript. Production installs (`npm ci --omit=dev`) skip them, keeping deployments smaller and safer.',
      fr: '`npm install --save-dev` (ou `-D`) ajoute le paquet dans `devDependencies` : outils comme les linters, les lanceurs de tests ou TypeScript. Les installations de production (`npm ci --omit=dev`) les ignorent, ce qui allège et sécurise les déploiements.',
    },
  },
  {
    id: 'node-009',
    track: 'nodejs',
    tier: 2,
    kind: 'output',
    concept: { en: 'The path module', fr: 'Le module path' },
    prompt: {
      en: 'What does this code print? (one result per line)',
      fr: 'Qu’affiche ce code ? (un résultat par ligne)',
    },
    code: `const path = require('node:path');
const file = '/home/ada/report.final.pdf';
console.log(path.basename(file));
console.log(path.extname(file));
console.log(path.basename(file, '.pdf'));`,
    codeLang: 'javascript',
    accepted: ['report.final.pdf\n.pdf\nreport.final'],
    hint: {
      en: 'The extension is only what follows the LAST dot.',
      fr: "L'extension n'est que ce qui suit le DERNIER point.",
    },
    explanation: {
      en: '`path.basename` returns the last part of a path (optionally without a given extension) and `path.extname` returns everything from the last dot. Use the `path` module (`join`, `resolve`, `basename`...) instead of string concatenation so paths work on every operating system.',
      fr: "`path.basename` renvoie la dernière partie d'un chemin (éventuellement sans l'extension donnée) et `path.extname` renvoie tout ce qui suit le dernier point, point compris. Utilisez le module `path` (`join`, `resolve`, `basename`...) plutôt que la concaténation de chaînes pour que les chemins fonctionnent sur tous les systèmes.",
    },
  },
  {
    id: 'node-010',
    track: 'nodejs',
    tier: 2,
    kind: 'fill',
    concept: { en: 'fs/promises & ESM', fr: 'fs/promises et ESM' },
    prompt: {
      en: 'In an ES module, import the promise-based `readFile` and wait for the file content without blocking the event loop.',
      fr: "Dans un module ES, importez la version à promesses de `readFile` et attendez le contenu du fichier sans bloquer la boucle d'événements.",
    },
    template: `// app.mjs (ES module)
import { readFile } from 'node:fs/___';

const text = ___ readFile('notes.txt', 'utf8');
console.log(text.length);`,
    blanks: [['promises'], ['await']],
    hint: {
      en: 'The module path ends with the plural of the thing `readFile` returns there; then you must wait for it.',
      fr: "Le chemin du module se termine par le pluriel anglais de ce que renvoie `readFile` ; il faut ensuite l'attendre.",
    },
    explanation: {
      en: "`node:fs/promises` exposes file functions that return promises, so they combine with `await` (allowed at the top level of ES modules). Unlike `readFileSync`, the main thread stays free to handle other work while the disk is read. The `'utf8'` argument returns a string instead of a Buffer.",
      fr: "`node:fs/promises` expose des fonctions de fichiers qui renvoient des promesses, à combiner avec `await` (autorisé au premier niveau des modules ES). Contrairement à `readFileSync`, le thread principal reste libre pendant la lecture du disque. L'argument `'utf8'` renvoie une chaîne au lieu d'un Buffer.",
    },
  },
  {
    id: 'node-011',
    track: 'nodejs',
    tier: 2,
    kind: 'bug',
    concept: { en: 'EventEmitter', fr: 'EventEmitter' },
    prompt: {
      en: "The 'ready' event can fire several times, but the message must be printed only the first time. Click the buggy line.",
      fr: "L'événement 'ready' peut être émis plusieurs fois, mais le message ne doit s'afficher que la première fois. Cliquez sur la ligne fautive.",
    },
    lines: [
      "const EventEmitter = require('node:events');",
      'const server = new EventEmitter();',
      "server.on('ready', () => {",
      "  console.log('Server ready!');",
      '});',
      "server.emit('ready');",
      "server.emit('ready');",
    ],
    bugLine: 2,
    hint: {
      en: 'EventEmitter has a method made exactly for one-shot listeners.',
      fr: 'EventEmitter possède une méthode faite exprès pour les écouteurs à usage unique.',
    },
    explanation: {
      en: '`emitter.on(name, fn)` calls `fn` every time the event is emitted, so the message appears twice. `emitter.once(name, fn)` removes the listener automatically after its first call. Emitting the same event several times is normal; choosing the right subscription method is your job.',
      fr: "`emitter.on(nom, fn)` appelle `fn` à chaque émission de l'événement : le message s'affiche donc deux fois. `emitter.once(nom, fn)` retire automatiquement l'écouteur après son premier appel. Émettre plusieurs fois le même événement est normal ; c'est à vous de choisir la bonne méthode d'abonnement.",
    },
  },
  {
    id: 'node-012',
    track: 'nodejs',
    tier: 2,
    kind: 'order',
    concept: { en: 'Express middleware', fr: 'Middleware Express' },
    prompt: {
      en: 'Build an Express app where `POST /echo` sends back the JSON body it receives.',
      fr: "Construisez une application Express où `POST /echo` renvoie le corps JSON qu'elle reçoit.",
    },
    lines: [
      "const express = require('express');",
      'const app = express();',
      'app.use(express.json());',
      "app.post('/echo', (req, res) => {",
      '  res.json(req.body);',
      '});',
    ],
    hint: {
      en: 'Middleware runs in registration order: the body must be parsed before the route reads `req.body`.',
      fr: "Les middlewares s'exécutent dans l'ordre d'enregistrement : le corps doit être analysé avant que la route lise `req.body`.",
    },
    explanation: {
      en: 'Express runs middleware and routes in the order they are registered. `express.json()` parses the JSON body and fills `req.body`; registered after the route, it would come too late and `req.body` would be `undefined`.',
      fr: "Express exécute les middlewares et les routes dans l'ordre où ils sont enregistrés. `express.json()` analyse le corps JSON et remplit `req.body` ; enregistré après la route, il arriverait trop tard et `req.body` vaudrait `undefined`.",
    },
  },

  // ───────────────────────────── Tier 3 · Adept ──────────────────────────────
  {
    id: 'node-013',
    track: 'nodejs',
    tier: 3,
    kind: 'riddle',
    concept: { en: 'Streams', fr: 'Flux (streams)' },
    prompt: {
      en: "I never carry the whole file at once:\nI flow chunk by chunk, so a 10 GB video fits in a few kilobytes of memory.\nPipe me from a reader to a writer and I handle the pressure.\nWhat am I?",
      fr: "Je ne transporte jamais tout le fichier d'un coup :\nje coule morceau par morceau, si bien qu'une vidéo de 10 Go tient en quelques kilo-octets de mémoire.\nRelie-moi d'un lecteur à un écrivain avec pipe et je gère la pression.\nQui suis-je ?",
    },
    accepted: ['stream', 'streams', 'readable stream', 'flux', 'flux de donnees', 'flux de données', 'flux lisible'],
    hint: {
      en: 'Think of water running in a river rather than a bucket.',
      fr: "Pensez à l'eau d'une rivière plutôt qu'à un seau.",
    },
    explanation: {
      en: 'Streams process data incrementally in chunks instead of loading everything in memory. `fs.createReadStream(src).pipe(res)` can serve a huge file with constant memory, and `pipe` / `stream.pipeline` handle backpressure by pausing the reader when the writer is slower.',
      fr: "Les flux (streams) traitent les données par morceaux au lieu de tout charger en mémoire. `fs.createReadStream(src).pipe(res)` peut servir un énorme fichier avec une mémoire constante, et `pipe` / `stream.pipeline` gèrent la contre-pression (backpressure) en mettant le lecteur en pause quand l'écrivain est plus lent.",
    },
  },
  {
    id: 'node-014',
    track: 'nodejs',
    tier: 3,
    kind: 'output',
    concept: { en: 'Buffers and bytes', fr: 'Buffers et octets' },
    prompt: {
      en: 'What does this code print? (one result per line)',
      fr: 'Qu’affiche ce code ? (un résultat par ligne)',
    },
    code: `const word = 'café';
console.log(word.length);
console.log(Buffer.from(word).length);`,
    codeLang: 'javascript',
    accepted: ['4\n5'],
    hint: {
      en: 'A Buffer counts bytes, encoded in UTF-8 by default. Is every character one byte?',
      fr: 'Un Buffer compte des octets, encodés en UTF-8 par défaut. Chaque caractère fait-il un octet ?',
    },
    explanation: {
      en: "A string's `length` counts characters (UTF-16 code units), while a Buffer holds raw bytes. In UTF-8, 'é' takes 2 bytes, so 'café' is 4 characters but 5 bytes. This matters for `Content-Length` headers, file sizes and binary protocols.",
      fr: "Le `length` d'une chaîne compte des caractères (unités UTF-16), alors qu'un Buffer contient des octets bruts. En UTF-8, 'é' occupe 2 octets : 'café' fait donc 4 caractères mais 5 octets. C'est important pour l'en-tête `Content-Length`, la taille des fichiers et les protocoles binaires.",
    },
  },
  {
    id: 'node-015',
    track: 'nodejs',
    tier: 3,
    kind: 'order',
    concept: { en: 'HTTP server', fr: 'Serveur HTTP' },
    prompt: {
      en: 'Rebuild a minimal HTTP server, without any framework, that answers "Hello, BitQuest!" on port 3000.',
      fr: 'Reconstruisez un serveur HTTP minimal, sans framework, qui répond « Hello, BitQuest! » sur le port 3000.',
    },
    lines: [
      "const http = require('node:http');",
      'const server = http.createServer((req, res) => {',
      "  res.writeHead(200, { 'Content-Type': 'text/plain' });",
      "  res.end('Hello, BitQuest!');",
      '});',
      "server.listen(3000, () => console.log('Listening on 3000'));",
    ],
    hint: {
      en: 'Headers must be sent before the body, and `end` closes the response.',
      fr: 'Les en-têtes doivent partir avant le corps, et `end` termine la réponse.',
    },
    explanation: {
      en: '`http.createServer` takes a handler called for every request with `req` (incoming) and `res` (outgoing). You set the status and headers first, then send the body and finish with `res.end()`. Nothing happens until `listen` binds the server to a port.',
      fr: "`http.createServer` prend un gestionnaire appelé à chaque requête avec `req` (entrante) et `res` (sortante). On fixe d'abord le statut et les en-têtes, puis on envoie le corps et on termine avec `res.end()`. Rien ne se passe tant que `listen` n'a pas attaché le serveur à un port.",
    },
  },
  {
    id: 'node-016',
    track: 'nodejs',
    tier: 3,
    kind: 'code',
    concept: { en: 'Middleware chain', fr: 'Chaîne de middlewares' },
    prompt: {
      en: 'Recreate the heart of Express: write `runPipeline(req, middlewares)`. Each middleware is `(req, next) => {...}`; call the first one, and each call to `next()` runs the following one. A middleware that does not call `next()` stops the chain. Return `req` at the end.',
      fr: 'Recréez le cœur d’Express : écrivez `runPipeline(req, middlewares)`. Chaque middleware est `(req, next) => {...}` ; appelez le premier, et chaque appel à `next()` lance le suivant. Un middleware qui n’appelle pas `next()` arrête la chaîne. Renvoyez `req` à la fin.',
    },
    language: 'javascript',
    starter: `function runPipeline(req, middlewares) {
  // TODO: call middlewares[0](req, next); next() must run the following one
  return req;
}`,
    tests: `const stamp = (req, next) => { req.steps.push('stamp'); next(); };
const stop = (req, next) => { req.steps.push('stop'); };
const auth = (req, next) => { req.user = 'ada'; next(); };
assertEqual(runPipeline({ steps: [] }, [stamp, stamp]).steps, ['stamp', 'stamp'], 'runs every middleware in order');
assertEqual(runPipeline({ steps: [] }, [stamp, stop, stamp]).steps, ['stamp', 'stop'], 'a middleware without next() stops the chain');
assertEqual(runPipeline({ steps: [] }, [auth, stamp]).user, 'ada', 'middlewares can enrich req');
assertEqual(runPipeline({ steps: [] }, []).steps, [], 'empty pipeline');`,
    solution: `function runPipeline(req, middlewares) {
  let index = 0;
  function next() {
    const middleware = middlewares[index++];
    if (middleware) middleware(req, next);
  }
  next();
  return req;
}`,
    hint: {
      en: 'Define an inner function `next` that picks the middleware at the current index, moves the index forward, and calls it with `(req, next)`.',
      fr: "Définissez une fonction interne `next` qui prend le middleware à l'indice courant, avance l'indice et l'appelle avec `(req, next)`.",
    },
    explanation: {
      en: "Express middleware is a chain of responsibility: each function receives the request and a `next` callback, and decides whether to pass control on (`next()`) or to stop by answering. The `next` closure remembers the current position, which is how logging, auth and body parsing get composed.",
      fr: "Les middlewares Express forment une chaîne de responsabilité : chaque fonction reçoit la requête et un callback `next`, et décide de passer la main (`next()`) ou de s'arrêter en répondant. La fermeture `next` mémorise la position courante : c'est ainsi que se composent journalisation, authentification et analyse du corps.",
    },
  },
  {
    id: 'node-017',
    track: 'nodejs',
    tier: 3,
    kind: 'bug',
    concept: { en: 'Express error handlers', fr: "Gestion d'erreurs Express" },
    prompt: {
      en: 'Errors thrown by routes should be answered by our JSON error handler, but Express shows its default HTML error page instead. Click the buggy line.',
      fr: "Les erreurs levées par les routes devraient être traitées par notre gestionnaire JSON, mais Express affiche sa page d'erreur HTML par défaut. Cliquez sur la ligne fautive.",
    },
    lines: [
      "const express = require('express');",
      'const app = express();',
      "app.get('/boom', () => {",
      "  throw new Error('Boom');",
      '});',
      'app.use((req, res, next) => {',
      "  res.status(500).json({ error: 'Something went wrong' });",
      '});',
      'app.listen(3000);',
    ],
    bugLine: 5,
    hint: {
      en: 'Express recognizes an error handler by the number of parameters of the function.',
      fr: "Express reconnaît un gestionnaire d'erreurs au nombre de paramètres de la fonction.",
    },
    explanation: {
      en: 'Express treats a middleware as an error handler only if it declares exactly four parameters: `(err, req, res, next)`. With three, it is a normal middleware that Express skips while an error is propagating. Error handlers must also be registered after the routes.',
      fr: "Express ne considère un middleware comme gestionnaire d'erreurs que s'il déclare exactement quatre paramètres : `(err, req, res, next)`. Avec trois, c'est un middleware normal qu'Express saute pendant qu'une erreur se propage. Les gestionnaires d'erreurs doivent aussi être enregistrés après les routes.",
    },
  },

  // ───────────────────────────── Tier 4 · Expert ─────────────────────────────
  {
    id: 'node-018',
    track: 'nodejs',
    tier: 4,
    kind: 'output',
    concept: { en: 'Event loop phases', fr: "Phases de la boucle d'événements" },
    prompt: {
      en: 'Inside an I/O callback, in which order are the words printed? (one per line)',
      fr: "À l'intérieur d'un callback d'E/S, dans quel ordre les mots sont-ils affichés ? (un par ligne)",
    },
    code: `const fs = require('node:fs');

fs.readFile(__filename, () => {
  setTimeout(() => console.log('timeout'), 0);
  setImmediate(() => console.log('immediate'));
  process.nextTick(() => console.log('nextTick'));
  Promise.resolve().then(() => console.log('promise'));
  console.log('sync');
});`,
    codeLang: 'javascript',
    accepted: ['sync\nnextTick\npromise\nimmediate\ntimeout'],
    hint: {
      en: 'After the callback: first the nextTick queue, then promise microtasks. Then the loop moves on from the poll phase: is the check phase or the timers phase next?',
      fr: 'Après le callback : d’abord la file nextTick, puis les microtâches de promesses. Ensuite la boucle quitte la phase poll : la phase check ou la phase timers vient-elle ensuite ?',
    },
    explanation: {
      en: "After any callback, Node drains `process.nextTick` callbacks, then promise microtasks. An I/O callback runs in the poll phase, which is followed by the check phase (`setImmediate`), and only then does the loop wrap around to the timers phase (`setTimeout`). Outside I/O callbacks, the timeout/immediate order is not guaranteed.",
      fr: "Après chaque callback, Node vide la file `process.nextTick`, puis les microtâches de promesses. Un callback d'E/S s'exécute dans la phase poll, suivie de la phase check (`setImmediate`) ; ce n'est qu'au tour suivant que la boucle revient à la phase timers (`setTimeout`). Hors d'un callback d'E/S, l'ordre entre timeout et immediate n'est pas garanti.",
    },
  },
  {
    id: 'node-019',
    track: 'nodejs',
    tier: 4,
    kind: 'riddle',
    concept: { en: 'Worker threads', fr: 'Worker threads' },
    prompt: {
      en: "When a heavy calculation would freeze your single main thread,\ncall me: I run JavaScript in parallel, with my own event loop,\nand talk to you only through messages.\nWhat am I?",
      fr: "Quand un calcul lourd risque de geler ton unique thread principal,\nappelle-moi : j'exécute du JavaScript en parallèle, avec ma propre boucle d'événements,\net je ne te parle que par messages.\nQui suis-je ?",
    },
    accepted: [
      'worker thread',
      'worker threads',
      'worker_threads',
      'worker',
      'workers',
      'thread',
      'threads',
      'thread de travail',
      'threads de travail',
      'fil de travail',
    ],
    hint: {
      en: 'Its built-in module is named with an underscore.',
      fr: 'Son module intégré porte un nom avec un tiret bas.',
    },
    explanation: {
      en: "Node's event loop is perfect for I/O but a CPU-heavy loop blocks every request. The `worker_threads` module runs code in separate threads, each with its own V8 instance and event loop, communicating with `postMessage`. Use it for CPU work (hashing, image processing), not for I/O, which is already non-blocking.",
      fr: "La boucle d'événements de Node est parfaite pour les E/S, mais une boucle gourmande en CPU bloque toutes les requêtes. Le module `worker_threads` exécute du code dans des threads séparés, chacun avec sa propre instance V8 et sa boucle d'événements, qui communiquent par `postMessage`. Utilisez-le pour le calcul (hachage, traitement d'images), pas pour les E/S, déjà non bloquantes.",
    },
  },
  {
    id: 'node-020',
    track: 'nodejs',
    tier: 4,
    kind: 'code',
    concept: { en: 'Escaping HTML (XSS)', fr: 'Échapper le HTML (XSS)' },
    prompt: {
      en: 'Your server inserts user input into HTML. Write `escapeHtml(str)` that replaces `&`, `<`, `>`, `"` and `\'` with `&amp;`, `&lt;`, `&gt;`, `&quot;` and `&#39;`.',
      fr: "Votre serveur insère des saisies d'utilisateurs dans du HTML. Écrivez `escapeHtml(str)` qui remplace `&`, `<`, `>`, `\"` et `'` par `&amp;`, `&lt;`, `&gt;`, `&quot;` et `&#39;`.",
    },
    language: 'javascript',
    starter: `function escapeHtml(str) {
  // TODO: replace & < > " ' with their HTML entities
  return str;
}`,
    tests: `assertEqual(escapeHtml('<script>alert("x")</script>'), '&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;', 'neutralizes a script tag');
assertEqual(escapeHtml('Tom & Jerry'), 'Tom &amp; Jerry', 'ampersand');
assertEqual(escapeHtml("it's"), 'it&#39;s', 'single quote');
assertEqual(escapeHtml('&lt;'), '&amp;lt;', 'escapes & only once, without double processing');
assertEqual(escapeHtml('plain text'), 'plain text', 'leaves safe text alone');`,
    solution: `function escapeHtml(str) {
  const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return str.replace(/[&<>"']/g, (ch) => entities[ch]);
}`,
    hint: {
      en: 'A single `replace` with a regex character class and a callback avoids escaping the same `&` twice.',
      fr: 'Un seul `replace` avec une classe de caractères regex et un callback évite d’échapper deux fois le même `&`.',
    },
    explanation: {
      en: 'Cross-site scripting (XSS) happens when user input is interpreted as HTML or script. Escaping the five special characters makes the browser display them as text. In practice, rely on a template engine that escapes by default, and never build HTML (or SQL) by raw concatenation.',
      fr: "Le cross-site scripting (XSS) survient quand une saisie utilisateur est interprétée comme du HTML ou du script. Échapper les cinq caractères spéciaux force le navigateur à les afficher comme du texte. En pratique, utilisez un moteur de templates qui échappe par défaut, et ne construisez jamais de HTML (ni de SQL) par simple concaténation.",
    },
  },
  {
    id: 'node-021',
    track: 'nodejs',
    tier: 4,
    kind: 'fill',
    concept: { en: 'Unhandled rejections', fr: 'Rejets non gérés' },
    prompt: {
      en: 'Add a last-resort safety net: log any promise rejection that nobody caught, then stop the process with an error code.',
      fr: "Ajoutez un filet de sécurité de dernier recours : journalisez tout rejet de promesse que personne n'a attrapé, puis arrêtez le processus avec un code d'erreur.",
    },
    template: `process.on('___', (reason) => {
  console.error('Unhandled promise rejection:', reason);
  process.___(1);
});`,
    blanks: [['unhandledRejection'], ['exit']],
    hint: {
      en: 'The event name describes a rejection that was not handled (camelCase). The method to stop the process is a four-letter word.',
      fr: "Le nom de l'événement décrit, en anglais et en camelCase, un rejet non géré. La méthode pour arrêter le processus est un mot de quatre lettres.",
    },
    explanation: {
      en: "When a promise rejects with no `.catch()` or `try/await`, Node emits `unhandledRejection` (and by default crashes since Node 15). Logging then calling `process.exit(1)` gives a clean, visible failure so a supervisor can restart the app. It is a safety net: still handle errors where they happen.",
      fr: "Quand une promesse est rejetée sans `.catch()` ni `try/await`, Node émet `unhandledRejection` (et, par défaut, plante depuis Node 15). Journaliser puis appeler `process.exit(1)` donne un échec propre et visible, pour qu'un superviseur relance l'application. C'est un filet de sécurité : gérez quand même les erreurs là où elles surviennent.",
    },
  },
  {
    id: 'node-022',
    track: 'nodejs',
    tier: 4,
    kind: 'mcq',
    concept: { en: 'SQL injection', fr: 'Injection SQL' },
    prompt: {
      en: '`name` comes straight from a query string. Which database call is safe?',
      fr: '`name` vient directement de la query string. Quel appel à la base de données est sûr ?',
    },
    options: [
      {
        en: "db.query(\"SELECT * FROM users WHERE name = '\" + name + \"'\")",
        fr: "db.query(\"SELECT * FROM users WHERE name = '\" + name + \"'\")",
      },
      {
        en: 'db.query(`SELECT * FROM users WHERE name = \'${name}\'`)',
        fr: 'db.query(`SELECT * FROM users WHERE name = \'${name}\'`)',
      },
      {
        en: "db.query(\"SELECT * FROM users WHERE name = '\" + name.trim() + \"'\")",
        fr: "db.query(\"SELECT * FROM users WHERE name = '\" + name.trim() + \"'\")",
      },
      {
        en: "db.query('SELECT * FROM users WHERE name = $1', [name])",
        fr: "db.query('SELECT * FROM users WHERE name = $1', [name])",
      },
    ],
    answer: 3,
    hint: {
      en: 'Safe code never lets user input become part of the SQL text itself.',
      fr: 'Un code sûr ne laisse jamais la saisie utilisateur devenir une partie du texte SQL lui-même.',
    },
    explanation: {
      en: "Concatenation and template literals both paste the input into the SQL, so `' OR '1'='1` changes the query's meaning: that is SQL injection. A parameterized query sends the SQL and the values separately, and the driver treats `name` strictly as data. Trimming is not sanitizing.",
      fr: "La concaténation comme les littéraux de gabarit collent la saisie dans le SQL : `' OR '1'='1` change alors le sens de la requête, c'est l'injection SQL. Une requête paramétrée envoie le SQL et les valeurs séparément, et le pilote traite `name` strictement comme une donnée. Supprimer les espaces n'est pas assainir.",
    },
  },
];
