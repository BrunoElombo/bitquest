import type { Challenge } from '../types';

export const challenges: Challenge[] = [
  // ───────────────────────────── Tier 1 · Novice ─────────────────────────────
  {
    id: 'js-001',
    track: 'javascript',
    tier: 1,
    kind: 'mcq',
    concept: { en: 'let vs const', fr: 'let ou const' },
    prompt: {
      en: 'Which keyword declares a variable that can NOT be reassigned later?',
      fr: 'Quel mot-clé déclare une variable qui ne peut PAS être réaffectée ensuite ?',
    },
    options: [
      { en: 'var', fr: 'var' },
      { en: 'const', fr: 'const' },
      { en: 'let', fr: 'let' },
    ],
    answer: 1,
    hint: {
      en: 'Its name is short for a word meaning "never changes".',
      fr: "Son nom est l'abréviation d'un mot qui signifie « qui ne change jamais ».",
    },
    explanation: {
      en: '`const` creates a binding that cannot be reassigned (trying throws a TypeError). The value itself is not frozen: you can still push into a `const` array. Use `const` by default, `let` only when the variable must change, and avoid the old function-scoped `var`.',
      fr: "`const` crée une liaison qui ne peut pas être réaffectée (sinon une TypeError est levée). La valeur elle-même n'est pas figée : on peut toujours faire `push` dans un tableau déclaré avec `const`. Utilisez `const` par défaut, `let` seulement si la variable doit changer, et évitez l'ancien `var`.",
    },
  },
  {
    id: 'js-002',
    track: 'javascript',
    tier: 1,
    kind: 'output',
    concept: { en: 'Primitive types', fr: 'Types primitifs' },
    prompt: {
      en: 'What does this code print?',
      fr: 'Qu’affiche ce code ?',
    },
    code: `console.log(typeof 'hello');
console.log(typeof 42);
console.log(typeof true);
console.log(typeof undefined);`,
    codeLang: 'javascript',
    accepted: ['string\nnumber\nboolean\nundefined'],
    hint: {
      en: '`typeof` always returns the name of the type as a string.',
      fr: '`typeof` renvoie toujours le nom du type sous forme de chaîne.',
    },
    explanation: {
      en: '`typeof` returns a string naming the type of a value. JavaScript has a single `number` type for integers and decimals alike. Beware of a famous historical quirk: `typeof null` is `"object"`.',
      fr: "`typeof` renvoie une chaîne qui nomme le type d'une valeur. JavaScript n'a qu'un seul type `number` pour les entiers comme pour les décimaux. Attention à une bizarrerie historique célèbre : `typeof null` vaut `\"object\"`.",
    },
  },
  {
    id: 'js-003',
    track: 'javascript',
    tier: 1,
    kind: 'riddle',
    concept: { en: 'Strict equality', fr: 'Égalité stricte' },
    prompt: {
      en: "I am three bars standing side by side.\nMy little brother converts before he compares: for him, '1' equals 1.\nI refuse: same type AND same value, or it's false.\nWhat am I?",
      fr: "Je suis trois barres côte à côte.\nMon petit frère convertit avant de comparer : pour lui, '1' vaut 1.\nMoi, je refuse : même type ET même valeur, sinon c'est false.\nQui suis-je ?",
    },
    accepted: [
      '===',
      'strict equality',
      'strict equality operator',
      'triple equals',
      'triple equal',
      'égalité stricte',
      'egalite stricte',
      'triple égal',
      'triple egal',
    ],
    hint: {
      en: 'Count the equal signs of the safer comparison operator.',
      fr: "Comptez les signes égal de l'opérateur de comparaison le plus sûr.",
    },
    explanation: {
      en: "`===` is the strict equality operator: it never converts types, so `'1' === 1` is false. The loose `==` applies surprising coercion rules (`'' == 0` is true!), which is why most style guides require `===`.",
      fr: "`===` est l'opérateur d'égalité stricte : il ne convertit jamais les types, donc `'1' === 1` vaut false. Le `==` laxiste applique des règles de conversion surprenantes (`'' == 0` vaut true !), c'est pourquoi la plupart des guides de style imposent `===`.",
    },
  },
  {
    id: 'js-004',
    track: 'javascript',
    tier: 1,
    kind: 'mcq',
    concept: { en: 'Type coercion', fr: 'Conversion implicite' },
    prompt: {
      en: 'What is the result of this expression?',
      fr: 'Quel est le résultat de cette expression ?',
    },
    code: `'5' + 3`,
    codeLang: 'javascript',
    options: [
      { en: '8 (a number)', fr: '8 (un nombre)' },
      { en: 'NaN', fr: 'NaN' },
      { en: "'53' (a string)", fr: "'53' (une chaîne)" },
      { en: 'A TypeError', fr: 'Une TypeError' },
    ],
    answer: 2,
    hint: {
      en: 'The `+` operator has two jobs: adding numbers and joining text.',
      fr: "L'opérateur `+` a deux rôles : additionner des nombres et coller du texte.",
    },
    explanation: {
      en: "When either operand of `+` is a string, JavaScript converts the other one to a string and concatenates, giving `'53'`. Other arithmetic operators only work on numbers, so `'5' - 3` is `2`. Convert explicitly with `Number('5')` to avoid surprises.",
      fr: "Quand l'un des opérandes de `+` est une chaîne, JavaScript convertit l'autre en chaîne et concatène : on obtient `'53'`. Les autres opérateurs arithmétiques ne travaillent que sur des nombres, donc `'5' - 3` vaut `2`. Convertissez explicitement avec `Number('5')` pour éviter les surprises.",
    },
  },
  {
    id: 'js-005',
    track: 'javascript',
    tier: 1,
    kind: 'fill',
    concept: { en: 'Template literals', fr: 'Littéraux de gabarit' },
    prompt: {
      en: 'Complete the code so `msg` is "Hello, Ada!" built with a template literal, then print its number of characters.',
      fr: "Complétez le code pour que `msg` vaille « Hello, Ada! » grâce à un littéral de gabarit, puis affichez son nombre de caractères.",
    },
    template: `const name = 'Ada';
const msg = ___Hello, \${name}!___;
console.log(msg.___); // 11`,
    blanks: [['`'], ['`'], ['length']],
    hint: {
      en: 'Template literals use a special quote character, the one that lets `${...}` work.',
      fr: 'Les littéraux de gabarit utilisent un guillemet spécial, celui qui fait fonctionner `${...}`.',
    },
    explanation: {
      en: 'Template literals are delimited by backticks (`) and evaluate any expression placed inside `${...}`. They can also span several lines. Every string has a `length` property giving its number of characters.',
      fr: "Les littéraux de gabarit sont délimités par des accents graves (`) et évaluent toute expression placée dans `${...}`. Ils peuvent aussi s'étendre sur plusieurs lignes. Toute chaîne possède une propriété `length` qui donne son nombre de caractères.",
    },
  },
  {
    id: 'js-006',
    track: 'javascript',
    tier: 1,
    kind: 'bug',
    concept: { en: 'Off-by-one loops', fr: 'Boucle décalée de un' },
    prompt: {
      en: '`sum([1, 2, 3])` should return 6, but it returns NaN. Click the buggy line.',
      fr: '`sum([1, 2, 3])` devrait renvoyer 6, mais renvoie NaN. Cliquez sur la ligne fautive.',
    },
    lines: [
      'function sum(nums) {',
      '  let total = 0;',
      '  for (let i = 0; i <= nums.length; i++) {',
      '    total += nums[i];',
      '  }',
      '  return total;',
      '}',
    ],
    bugLine: 2,
    hint: {
      en: 'What is the index of the last element of a 3-item array?',
      fr: "Quel est l'indice du dernier élément d'un tableau de 3 éléments ?",
    },
    explanation: {
      en: 'Indexes go from 0 to `length - 1`. With `<=` the loop runs one extra time and reads `nums[3]`, which is `undefined`, and `6 + undefined` is NaN. Use `i < nums.length`, or better, a `for...of` loop.',
      fr: "Les indices vont de 0 à `length - 1`. Avec `<=`, la boucle fait un tour de trop et lit `nums[3]`, qui vaut `undefined`, et `6 + undefined` donne NaN. Utilisez `i < nums.length`, ou mieux, une boucle `for...of`.",
    },
  },

  // ─────────────────────────── Tier 2 · Apprentice ───────────────────────────
  {
    id: 'js-007',
    track: 'javascript',
    tier: 2,
    kind: 'fill',
    concept: { en: 'Destructuring & spread', fr: 'Déstructuration et spread' },
    prompt: {
      en: 'Fill the blanks: extract `x` and `y` from `point`, then copy `point` into a new object while overriding `x`.',
      fr: 'Complétez : extrayez `x` et `y` de `point`, puis copiez `point` dans un nouvel objet en remplaçant `x`.',
    },
    template: `const point = { x: 1, y: 2 };
const { x, ___ } = point;          // x === 1, y === 2
const moved = { ___point, x: 5 };  // { x: 5, y: 2 }`,
    blanks: [['y'], ['...']],
    hint: {
      en: 'Destructuring uses property names; copying uses three dots.',
      fr: 'La déstructuration utilise les noms des propriétés ; la copie utilise trois points.',
    },
    explanation: {
      en: 'Object destructuring pulls properties into variables of the same name. The spread syntax `...point` copies all of its properties into a new object; properties written after it (like `x: 5`) override the copied ones. The original `point` is left untouched.',
      fr: "La déstructuration d'objet extrait les propriétés dans des variables du même nom. La syntaxe spread `...point` copie toutes ses propriétés dans un nouvel objet ; celles écrites après (comme `x: 5`) écrasent les valeurs copiées. L'objet `point` d'origine reste intact.",
    },
  },
  {
    id: 'js-008',
    track: 'javascript',
    tier: 2,
    kind: 'code',
    concept: { en: 'filter and map', fr: 'filter et map' },
    prompt: {
      en: 'Write `doubleEvens(nums)`: keep only the even numbers of the array, then double each of them. Do not modify the input array.',
      fr: "Écrivez `doubleEvens(nums)` : gardez uniquement les nombres pairs du tableau, puis doublez chacun d'eux. Ne modifiez pas le tableau d'entrée.",
    },
    language: 'javascript',
    starter: `function doubleEvens(nums) {
  // TODO: keep the even numbers, then double each one
  return [];
}`,
    tests: `assertEqual(doubleEvens([1, 2, 3, 4]), [4, 8], 'doubles 2 and 4');
assertEqual(doubleEvens([1, 3, 5]), [], 'no even numbers');
assertEqual(doubleEvens([]), [], 'empty array');
assertEqual(doubleEvens([10, -2, 7]), [20, -4], 'negative numbers too');`,
    solution: `function doubleEvens(nums) {
  return nums.filter((n) => n % 2 === 0).map((n) => n * 2);
}`,
    hint: {
      en: 'Chain two array methods: one that selects, one that transforms. `n % 2` gives the remainder.',
      fr: "Enchaînez deux méthodes de tableau : l'une qui sélectionne, l'autre qui transforme. `n % 2` donne le reste.",
    },
    explanation: {
      en: '`filter` returns a new array with the items whose callback returns true, and `map` returns a new array with each item transformed. Both leave the original array untouched, which makes them easy to chain and to reason about.',
      fr: "`filter` renvoie un nouveau tableau avec les éléments pour lesquels le callback renvoie true, et `map` renvoie un nouveau tableau où chaque élément est transformé. Aucune des deux ne modifie le tableau d'origine, ce qui les rend faciles à enchaîner et à comprendre.",
    },
  },
  {
    id: 'js-009',
    track: 'javascript',
    tier: 2,
    kind: 'output',
    concept: { en: 'Objects by reference', fr: 'Objets par référence' },
    prompt: {
      en: 'What does this code print?',
      fr: 'Qu’affiche ce code ?',
    },
    code: `const a = { score: 1 };
const b = a;
const c = { ...a };
b.score = 2;
c.score = 3;
console.log(a.score, b.score, c.score);`,
    codeLang: 'javascript',
    accepted: ['2 2 3'],
    hint: {
      en: 'Ask yourself how many distinct objects actually exist in memory.',
      fr: 'Demandez-vous combien d’objets distincts existent réellement en mémoire.',
    },
    explanation: {
      en: '`const b = a` does not copy the object: `a` and `b` are two references to the same object, so changing `b.score` changes `a.score`. The spread `{ ...a }` creates a new (shallow) copy, so `c` is independent.',
      fr: "`const b = a` ne copie pas l'objet : `a` et `b` sont deux références vers le même objet, donc modifier `b.score` modifie `a.score`. Le spread `{ ...a }` crée une nouvelle copie (superficielle), donc `c` est indépendant.",
    },
  },
  {
    id: 'js-010',
    track: 'javascript',
    tier: 2,
    kind: 'mcq',
    concept: { en: 'Block scope', fr: 'Portée de bloc' },
    prompt: {
      en: 'What happens when this code runs?',
      fr: "Que se passe-t-il à l'exécution de ce code ?",
    },
    code: `if (true) {
  let secret = 42;
}
console.log(secret);`,
    codeLang: 'javascript',
    options: [
      { en: 'It prints 42', fr: 'Il affiche 42' },
      { en: 'It prints undefined', fr: 'Il affiche undefined' },
      { en: 'It prints null', fr: 'Il affiche null' },
      { en: 'ReferenceError: secret is not defined', fr: 'ReferenceError : secret is not defined' },
    ],
    answer: 3,
    hint: {
      en: 'Where does a `let` variable live: in the whole function, or only between its curly braces?',
      fr: 'Où vit une variable `let` : dans toute la fonction, ou seulement entre ses accolades ?',
    },
    explanation: {
      en: '`let` and `const` are block-scoped: `secret` only exists inside the `{ }` of the `if`. Outside, the name is unknown, so a ReferenceError is thrown. With `var` (function-scoped) it would have printed 42, a classic source of bugs.',
      fr: "`let` et `const` ont une portée de bloc : `secret` n'existe qu'à l'intérieur des `{ }` du `if`. À l'extérieur, le nom est inconnu, donc une ReferenceError est levée. Avec `var` (portée de fonction), on aurait affiché 42, une source classique de bugs.",
    },
  },
  {
    id: 'js-011',
    track: 'javascript',
    tier: 2,
    kind: 'riddle',
    concept: { en: 'Arrow functions', fr: 'Fonctions fléchées' },
    prompt: {
      en: "I am a function, yet I never say 'function'.\nAn arrow points from my parameters to my body.\nI have no 'this' of my own: I borrow it from where I was born.\nWhat am I?",
      fr: "Je suis une fonction, pourtant je ne dis jamais 'function'.\nUne flèche pointe de mes paramètres vers mon corps.\nJe n'ai pas de 'this' à moi : je l'emprunte là où je suis née.\nQui suis-je ?",
    },
    accepted: [
      'arrow function',
      'arrow functions',
      'arrow',
      'fat arrow',
      '=>',
      'fonction fléchée',
      'fonctions fléchées',
      'fonction flechee',
      'fonctions flechees',
      'fléchée',
      'flechee',
    ],
    hint: {
      en: 'Look at the symbol `=>`. What does it look like?',
      fr: 'Regardez le symbole `=>`. À quoi ressemble-t-il ?',
    },
    explanation: {
      en: 'Arrow functions (`(a, b) => a + b`) are a concise function syntax. With a single expression body they return it implicitly. Unlike regular functions they have no own `this` or `arguments`: they capture `this` lexically from the surrounding code, which makes them ideal for callbacks.',
      fr: "Les fonctions fléchées (`(a, b) => a + b`) offrent une syntaxe concise. Avec un corps réduit à une expression, elles la renvoient implicitement. Contrairement aux fonctions classiques, elles n'ont ni `this` ni `arguments` propres : elles capturent le `this` du code environnant, ce qui les rend idéales pour les callbacks.",
    },
  },
  {
    id: 'js-012',
    track: 'javascript',
    tier: 2,
    kind: 'order',
    concept: { en: 'Functions and loops', fr: 'Fonctions et boucles' },
    prompt: {
      en: "Put the lines in order so that `countVowels('Hello')` returns 2.",
      fr: "Remettez les lignes dans l'ordre pour que `countVowels('Hello')` renvoie 2.",
    },
    lines: [
      'function countVowels(text) {',
      '  let count = 0;',
      '  for (const ch of text.toLowerCase()) {',
      "    if ('aeiou'.includes(ch)) count++;",
      '  }',
      '  return count;',
      '}',
    ],
    hint: {
      en: 'Initialize the counter before the loop, and only return once the loop is finished.',
      fr: 'Initialisez le compteur avant la boucle, et ne renvoyez le résultat qu’une fois la boucle terminée.',
    },
    explanation: {
      en: 'A counting function follows a classic pattern: initialize an accumulator, loop over the input, update the accumulator, then return it after the loop. `for...of` iterates over the characters of a string directly.',
      fr: "Une fonction de comptage suit un schéma classique : initialiser un accumulateur, parcourir l'entrée, mettre à jour l'accumulateur, puis le renvoyer après la boucle. `for...of` parcourt directement les caractères d'une chaîne.",
    },
  },

  // ───────────────────────────── Tier 3 · Adept ──────────────────────────────
  {
    id: 'js-013',
    track: 'javascript',
    tier: 3,
    kind: 'output',
    concept: { en: 'Closures', fr: 'Fermetures' },
    prompt: {
      en: 'What does this code print?',
      fr: 'Qu’affiche ce code ?',
    },
    code: `function makeCounter() {
  let count = 0;
  return () => ++count;
}
const a = makeCounter();
const b = makeCounter();
a();
a();
console.log(a(), b());`,
    codeLang: 'javascript',
    accepted: ['3 1'],
    hint: {
      en: 'Each call to `makeCounter` creates a brand-new `count` variable.',
      fr: 'Chaque appel à `makeCounter` crée une toute nouvelle variable `count`.',
    },
    explanation: {
      en: 'The returned arrow function is a closure: it keeps access to the `count` variable of the call that created it, even after `makeCounter` has returned. `a` and `b` each have their own private `count`, so `a` reaches 3 while `b` is at 1.',
      fr: "La fonction fléchée renvoyée est une fermeture (closure) : elle garde l'accès à la variable `count` de l'appel qui l'a créée, même après le retour de `makeCounter`. `a` et `b` ont chacun leur propre `count` privé : `a` atteint 3 tandis que `b` est à 1.",
    },
  },
  {
    id: 'js-014',
    track: 'javascript',
    tier: 3,
    kind: 'mcq',
    concept: { en: 'Hoisting', fr: 'Remontée (hoisting)' },
    prompt: {
      en: 'What does this code print?',
      fr: 'Qu’affiche ce code ?',
    },
    code: `console.log(greet());
console.log(typeof shout);
function greet() { return 'hi'; }
var shout = function () { return 'HI'; };`,
    codeLang: 'javascript',
    options: [
      { en: "'hi', then 'undefined'", fr: "'hi', puis 'undefined'" },
      { en: "'hi', then 'function'", fr: "'hi', puis 'function'" },
      { en: 'A ReferenceError on the first line', fr: 'Une ReferenceError dès la première ligne' },
      { en: "'undefined', then 'undefined'", fr: "'undefined', puis 'undefined'" },
    ],
    answer: 0,
    hint: {
      en: 'Function declarations and `var` declarations are both hoisted, but not in the same way.',
      fr: 'Les déclarations de fonction et les déclarations `var` sont toutes deux remontées, mais pas de la même façon.',
    },
    explanation: {
      en: 'Before running, JavaScript hoists declarations to the top of their scope. A function declaration is hoisted with its body, so `greet()` works before its line. A `var` is hoisted but initialized to `undefined`; the function expression is only assigned when its line runs. (`let`/`const` are hoisted too, but accessing them early throws.)',
      fr: "Avant l'exécution, JavaScript remonte les déclarations en haut de leur portée. Une déclaration de fonction est remontée avec son corps : `greet()` fonctionne avant sa ligne. Un `var` est remonté mais initialisé à `undefined` ; l'expression de fonction n'est affectée qu'en arrivant à sa ligne. (`let`/`const` sont aussi remontés, mais y accéder trop tôt lève une erreur.)",
    },
  },
  {
    id: 'js-015',
    track: 'javascript',
    tier: 3,
    kind: 'bug',
    concept: { en: 'Losing this', fr: 'Perte de this' },
    prompt: {
      en: '`start()` should increase `this.seconds` every second, but `seconds` never changes. Click the line that causes the bug.',
      fr: '`start()` devrait augmenter `this.seconds` chaque seconde, mais `seconds` ne change jamais. Cliquez sur la ligne qui cause le bug.',
    },
    lines: [
      'class Timer {',
      '  constructor() {',
      '    this.seconds = 0;',
      '  }',
      '  start() {',
      '    setInterval(function () {',
      '      this.seconds++;',
      '    }, 1000);',
      '  }',
      '}',
    ],
    bugLine: 5,
    hint: {
      en: 'Which kind of function decides its own `this` based on how it is called?',
      fr: 'Quel type de fonction décide de son propre `this` selon la manière dont elle est appelée ?',
    },
    explanation: {
      en: 'A regular `function` gets its `this` from how it is called; `setInterval` calls it without our object, so `this` is not the Timer. Replacing it with an arrow function `() => { this.seconds++; }` fixes it, because arrows capture `this` from `start()`.',
      fr: "Une `function` classique reçoit son `this` selon la façon dont elle est appelée ; `setInterval` l'appelle sans notre objet, donc `this` n'est pas le Timer. La remplacer par une fonction fléchée `() => { this.seconds++; }` corrige le bug, car la flèche capture le `this` de `start()`.",
    },
  },
  {
    id: 'js-016',
    track: 'javascript',
    tier: 3,
    kind: 'riddle',
    concept: { en: 'Prototype chain', fr: 'Chaîne de prototypes' },
    prompt: {
      en: "Every object hides a link to a parent.\nAsk me for a property I lack and I'll ask my parent, then its parent, until null.\nClasses are only sugar poured on top of me.\nWhat am I?",
      fr: "Chaque objet cache un lien vers un parent.\nDemande-moi une propriété que je n'ai pas : je la demande à mon parent, puis au sien, jusqu'à null.\nLes classes ne sont que du sucre versé sur moi.\nQui suis-je ?",
    },
    accepted: [
      'prototype',
      'prototypes',
      'prototype chain',
      'the prototype chain',
      'chaîne de prototypes',
      'chaine de prototypes',
      'chaîne des prototypes',
      'chaine des prototypes',
      '__proto__',
    ],
    hint: {
      en: 'It is what `Object.getPrototypeOf(obj)` returns.',
      fr: "C'est ce que renvoie `Object.getPrototypeOf(obj)`.",
    },
    explanation: {
      en: "JavaScript uses prototypal inheritance: each object has an internal link to its prototype. When a property isn't found on the object, the engine walks up this prototype chain. Methods declared in a `class` are stored on `ClassName.prototype` and shared by all instances.",
      fr: "JavaScript utilise l'héritage par prototype : chaque objet possède un lien interne vers son prototype. Quand une propriété est absente de l'objet, le moteur remonte cette chaîne de prototypes. Les méthodes déclarées dans une `class` sont stockées sur `NomDeClasse.prototype` et partagées par toutes les instances.",
    },
  },
  {
    id: 'js-017',
    track: 'javascript',
    tier: 3,
    kind: 'code',
    concept: { en: 'Classes', fr: 'Classes' },
    prompt: {
      en: 'Implement a `Stack` class (last in, first out) with `push(item)`, `pop()` (removes and returns the top item), `peek()` (returns the top item without removing it) and `size()`.',
      fr: "Implémentez une classe `Stack` (dernier entré, premier sorti) avec `push(item)`, `pop()` (retire et renvoie l'élément du dessus), `peek()` (renvoie l'élément du dessus sans le retirer) et `size()`.",
    },
    language: 'javascript',
    starter: `class Stack {
  constructor() {
    // TODO: create the storage for the items
  }
  push(item) {
    // TODO: add item on top
  }
  pop() {
    // TODO: remove and return the top item
  }
  peek() {
    // TODO: return the top item without removing it
  }
  size() {
    // TODO: return the number of items
  }
}`,
    tests: `const s = new Stack();
assertEqual(s.size(), 0, 'a new stack is empty');
s.push('a');
s.push('b');
s.push('c');
assertEqual(s.size(), 3, 'size after 3 pushes');
assertEqual(s.pop(), 'c', 'pop returns the last pushed item');
assertEqual(s.peek(), 'b', 'peek shows the new top');
assertEqual(s.size(), 2, 'peek does not remove anything');`,
    solution: `class Stack {
  #items = [];

  push(item) {
    this.#items.push(item);
  }
  pop() {
    return this.#items.pop();
  }
  peek() {
    return this.#items[this.#items.length - 1];
  }
  size() {
    return this.#items.length;
  }
}`,
    hint: {
      en: 'An array already knows how to add and remove at its end. Store one on the instance.',
      fr: 'Un tableau sait déjà ajouter et retirer à sa fin. Stockez-en un sur l’instance.',
    },
    explanation: {
      en: 'A class bundles data (here an array) with the methods that use it; each `new Stack()` gets its own storage. Using a private field `#items` hides the array so callers must go through the methods, which protects the invariant of the stack.',
      fr: "Une classe regroupe des données (ici un tableau) avec les méthodes qui les utilisent ; chaque `new Stack()` possède son propre stockage. Le champ privé `#items` cache le tableau : on doit passer par les méthodes, ce qui protège la cohérence de la pile.",
    },
  },

  // ───────────────────────────── Tier 4 · Expert ─────────────────────────────
  {
    id: 'js-018',
    track: 'javascript',
    tier: 4,
    kind: 'output',
    concept: { en: 'Event loop', fr: "Boucle d'événements" },
    prompt: {
      en: 'In which order are the letters printed? (one per line)',
      fr: 'Dans quel ordre les lettres sont-elles affichées ? (une par ligne)',
    },
    code: `console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');`,
    codeLang: 'javascript',
    accepted: ['A\nD\nC\nB'],
    hint: {
      en: 'Synchronous code runs first. Then, which queue is emptied first: promise callbacks or timers?',
      fr: "Le code synchrone s'exécute d'abord. Ensuite, quelle file est vidée en premier : les callbacks de promesses ou les minuteurs ?",
    },
    explanation: {
      en: 'Synchronous code always finishes first (A, D). Then the event loop drains the microtask queue (promise callbacks: C) before taking the next macrotask (timers: B). That is why a `setTimeout(..., 0)` still runs after an already-resolved promise.',
      fr: "Le code synchrone se termine toujours en premier (A, D). Ensuite, la boucle d'événements vide la file des microtâches (callbacks de promesses : C) avant de prendre la macrotâche suivante (minuteurs : B). Voilà pourquoi un `setTimeout(..., 0)` passe quand même après une promesse déjà résolue.",
    },
  },
  {
    id: 'js-019',
    track: 'javascript',
    tier: 4,
    kind: 'fill',
    concept: { en: 'Promises', fr: 'Promesses' },
    prompt: {
      en: 'Complete `wait(ms)` so it returns a promise resolved after `ms` milliseconds, then react when it resolves.',
      fr: 'Complétez `wait(ms)` pour qu’elle renvoie une promesse résolue après `ms` millisecondes, puis réagissez à sa résolution.',
    },
    template: `function wait(ms) {
  return new ___((resolve) => setTimeout(resolve, ms));
}

wait(500).___(() => console.log('half a second later'));`,
    blanks: [['Promise'], ['then']],
    hint: {
      en: 'The constructor is named after the concept itself; the reaction method is a word meaning "afterwards".',
      fr: 'Le constructeur porte le nom du concept lui-même ; la méthode de réaction est un mot anglais qui signifie « ensuite ».',
    },
    explanation: {
      en: '`new Promise(executor)` wraps a callback-based API: call `resolve` when the work succeeds (or `reject` on failure). `.then(cb)` registers what to do with the result once the promise is fulfilled, and returns a new promise so calls can be chained.',
      fr: "`new Promise(executor)` enveloppe une API à base de callbacks : on appelle `resolve` quand le travail réussit (ou `reject` en cas d'échec). `.then(cb)` indique quoi faire du résultat une fois la promesse tenue, et renvoie une nouvelle promesse, ce qui permet d'enchaîner les appels.",
    },
  },
  {
    id: 'js-020',
    track: 'javascript',
    tier: 4,
    kind: 'order',
    concept: { en: 'async/await errors', fr: 'Erreurs avec async/await' },
    prompt: {
      en: "In an ES module (top-level `await` allowed), rebuild the code that loads a user, prints its name, and reports any error.",
      fr: "Dans un module ES (le `await` de premier niveau est autorisé), reconstruisez le code qui charge un utilisateur, affiche son nom et signale toute erreur.",
    },
    lines: [
      'try {',
      "  const res = await fetch('/api/user');",
      '  const user = await res.json();',
      '  console.log(user.name);',
      '} catch (err) {',
      "  console.error('Failed:', err.message);",
      '}',
    ],
    hint: {
      en: 'You need the response before you can read its JSON, and the JSON before you can use the name.',
      fr: 'Il faut la réponse avant de lire son JSON, et le JSON avant d’utiliser le nom.',
    },
    explanation: {
      en: '`await` pauses the async code until the promise settles, so each step can use the previous result as if it were synchronous. If any awaited promise rejects, the error is thrown at that `await` and caught by the surrounding `try...catch`, exactly like a synchronous exception.',
      fr: "`await` met le code asynchrone en pause jusqu'à ce que la promesse soit réglée : chaque étape peut utiliser le résultat précédent comme si tout était synchrone. Si une promesse attendue est rejetée, l'erreur est levée à ce `await` et attrapée par le `try...catch` englobant, exactement comme une exception synchrone.",
    },
  },
  {
    id: 'js-021',
    track: 'javascript',
    tier: 4,
    kind: 'mcq',
    concept: { en: 'ES modules', fr: 'Modules ES' },
    prompt: {
      en: '`math.js` is shown below. Which line correctly imports both `add` and `PI` in `app.js`?',
      fr: '`math.js` est affiché ci-dessous. Quelle ligne importe correctement `add` et `PI` dans `app.js` ?',
    },
    code: `// math.js
export default function add(a, b) { return a + b; }
export const PI = 3.14;`,
    codeLang: 'javascript',
    options: [
      { en: "import { add, PI } from './math.js';", fr: "import { add, PI } from './math.js';" },
      { en: "import add, { PI } from './math.js';", fr: "import add, { PI } from './math.js';" },
      { en: "import add, PI from './math.js';", fr: "import add, PI from './math.js';" },
      { en: "const { add, PI } = require('./math.js');", fr: "const { add, PI } = require('./math.js');" },
    ],
    answer: 1,
    hint: {
      en: 'Default exports and named exports are imported with different syntax.',
      fr: "Les exports par défaut et les exports nommés s'importent avec une syntaxe différente.",
    },
    explanation: {
      en: 'A module has at most one default export, imported without braces under any name you like. Named exports must be imported inside `{ }` with their exact names (or renamed with `as`). Both can be combined: `import add, { PI } from ...`.',
      fr: "Un module a au plus un export par défaut, importé sans accolades sous le nom de votre choix. Les exports nommés s'importent entre `{ }` avec leur nom exact (ou renommés avec `as`). On peut combiner les deux : `import add, { PI } from ...`.",
    },
  },
  {
    id: 'js-022',
    track: 'javascript',
    tier: 4,
    kind: 'code',
    concept: { en: 'Generators', fr: 'Générateurs' },
    prompt: {
      en: 'Write the generator `range(start, end, step = 1)` that lazily yields `start`, `start + step`, ... as long as the value is strictly below `end`.',
      fr: 'Écrivez le générateur `range(start, end, step = 1)` qui produit paresseusement `start`, `start + step`, ... tant que la valeur reste strictement inférieure à `end`.',
    },
    language: 'javascript',
    starter: `function* range(start, end, step = 1) {
  // TODO: yield each value while it stays below end
}`,
    tests: `assertEqual([...range(0, 5)], [0, 1, 2, 3, 4], 'range(0, 5)');
assertEqual([...range(2, 10, 3)], [2, 5, 8], 'custom step');
assertEqual([...range(5, 5)], [], 'empty range');
const it = range(1, 3);
assertEqual(it.next(), { value: 1, done: false }, 'first next()');
assertEqual([it.next().value, it.next().done], [2, true], 'then 2, then done');`,
    solution: `function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}`,
    hint: {
      en: 'A normal `for` loop works inside a generator; replace "push into an array" with one keyword.',
      fr: 'Une boucle `for` classique fonctionne dans un générateur ; remplacez « ajouter au tableau » par un seul mot-clé.',
    },
    explanation: {
      en: 'A `function*` returns an iterator: each `yield` hands out one value and pauses the function until the next `next()` call. Values are computed on demand, so even an infinite sequence costs no memory, and the spread `[...gen]` collects them all.',
      fr: "Une `function*` renvoie un itérateur : chaque `yield` fournit une valeur et met la fonction en pause jusqu'au prochain appel à `next()`. Les valeurs sont calculées à la demande : même une séquence infinie ne coûte pas de mémoire, et le spread `[...gen]` les collecte toutes.",
    },
  },
];
