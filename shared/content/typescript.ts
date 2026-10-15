import type { Challenge } from '../types';

export const challenges: Challenge[] = [
  // ───────────────────────────── Tier 1 · Novice ─────────────────────────────
  {
    id: 'ts-001',
    track: 'typescript',
    tier: 1,
    kind: 'mcq',
    concept: { en: 'Type annotations', fr: 'Annotations de type' },
    prompt: {
      en: 'Which line correctly declares a variable `age` of type number?',
      fr: 'Quelle ligne déclare correctement une variable `age` de type number ?',
    },
    options: [
      { en: 'let age = number 30;', fr: 'let age = number 30;' },
      { en: 'let age: number = 30;', fr: 'let age: number = 30;' },
      { en: 'let number age = 30;', fr: 'let number age = 30;' },
      { en: 'let age<number> = 30;', fr: 'let age<number> = 30;' },
    ],
    answer: 1,
    hint: {
      en: 'In TypeScript the type comes after the name, separated by a single symbol.',
      fr: 'En TypeScript, le type se place après le nom, séparé par un seul symbole.',
    },
    explanation: {
      en: 'A type annotation is written `name: Type`, right after the variable, parameter or before a function body for the return type. Unlike Java or C, the type comes after the name. Annotations only exist at compile time and are erased from the JavaScript output.',
      fr: "Une annotation de type s'écrit `nom: Type`, juste après la variable, le paramètre, ou avant le corps d'une fonction pour le type de retour. Contrairement à Java ou C, le type vient après le nom. Les annotations n'existent qu'à la compilation et sont effacées du JavaScript produit.",
    },
  },
  {
    id: 'ts-002',
    track: 'typescript',
    tier: 1,
    kind: 'output',
    concept: { en: 'Types are erased', fr: 'Types effacés' },
    prompt: {
      en: 'What does this TypeScript program print once compiled and run?',
      fr: 'Qu’affiche ce programme TypeScript une fois compilé et exécuté ?',
    },
    code: `let id: string | number = 'A7';
id = 7;
console.log(typeof id);`,
    codeLang: 'typescript',
    accepted: ['number'],
    hint: {
      en: 'At runtime, `typeof` only sees the current value, never the TypeScript annotation.',
      fr: "À l'exécution, `typeof` ne voit que la valeur actuelle, jamais l'annotation TypeScript.",
    },
    explanation: {
      en: 'TypeScript types are erased when compiling to JavaScript. The union `string | number` only tells the compiler which values are allowed; at runtime `id` simply holds 7, so the JavaScript `typeof` operator returns "number".',
      fr: "Les types TypeScript sont effacés à la compilation en JavaScript. L'union `string | number` indique seulement au compilateur quelles valeurs sont permises ; à l'exécution, `id` contient simplement 7, donc l'opérateur JavaScript `typeof` renvoie \"number\".",
    },
  },
  {
    id: 'ts-003',
    track: 'typescript',
    tier: 1,
    kind: 'fill',
    concept: { en: 'Function signatures', fr: 'Signatures de fonction' },
    prompt: {
      en: 'Annotate the parameter and the return type of `greet`.',
      fr: 'Annotez le paramètre et le type de retour de `greet`.',
    },
    template: `function greet(name: ___): ___ {
  return 'Hello, ' + name;
}

greet('Ada');`,
    blanks: [['string'], ['string']],
    hint: {
      en: "Look at what is passed in and at what is built by the `+`. Primitive type names are lowercase.",
      fr: 'Regardez ce qui est passé en argument et ce que construit le `+`. Les noms de types primitifs sont en minuscules.',
    },
    explanation: {
      en: 'Parameters are annotated like variables, and the return type goes after the parentheses: `(name: string): string`. Use the lowercase primitive types `string`, `number` and `boolean`, not the `String`/`Number` wrapper objects. The compiler can now reject `greet(42)`.',
      fr: 'Les paramètres s’annotent comme des variables, et le type de retour se place après les parenthèses : `(name: string): string`. Utilisez les types primitifs en minuscules `string`, `number` et `boolean`, pas les objets enveloppes `String`/`Number`. Le compilateur peut désormais refuser `greet(42)`.',
    },
  },
  {
    id: 'ts-004',
    track: 'typescript',
    tier: 1,
    kind: 'riddle',
    concept: { en: 'The any type', fr: 'Le type any' },
    prompt: {
      en: "I accept every value and check nothing.\nWith me around, the compiler closes its eyes and errors slip through to runtime.\nI am TypeScript's escape hatch.\nWhat type am I?",
      fr: "J'accepte toutes les valeurs et je ne vérifie rien.\nAvec moi, le compilateur ferme les yeux et les erreurs filent jusqu'à l'exécution.\nJe suis la porte de sortie de TypeScript.\nQuel type suis-je ?",
    },
    accepted: ['any', 'type any', 'any type'],
    hint: {
      en: 'Three letters. It literally means "whatever".',
      fr: 'Trois lettres. En anglais, il signifie littéralement « n’importe lequel ».',
    },
    explanation: {
      en: '`any` disables type checking for a value: you can call it, read any property or assign it anywhere, and the compiler will not complain. It is useful when migrating JavaScript, but every `any` is a hole in your safety net; prefer `unknown` for values of uncertain type.',
      fr: "`any` désactive la vérification de type pour une valeur : on peut l'appeler, lire n'importe quelle propriété ou l'affecter partout sans que le compilateur se plaigne. Il est pratique pour migrer du JavaScript, mais chaque `any` est un trou dans votre filet de sécurité ; préférez `unknown` pour les valeurs de type incertain.",
    },
  },
  {
    id: 'ts-005',
    track: 'typescript',
    tier: 1,
    kind: 'mcq',
    concept: { en: 'Type inference', fr: 'Inférence de type' },
    prompt: {
      en: 'There is no annotation here. What does the compiler say?',
      fr: "Il n'y a aucune annotation ici. Que dit le compilateur ?",
    },
    code: `let count = 5;
count = 'five';`,
    codeLang: 'typescript',
    options: [
      { en: 'Nothing: `count` simply becomes a string', fr: 'Rien : `count` devient simplement une chaîne' },
      { en: 'Nothing: without annotation, `count` is `any`', fr: 'Rien : sans annotation, `count` est de type `any`' },
      {
        en: "Error: Type 'string' is not assignable to type 'number'",
        fr: "Erreur : Type 'string' is not assignable to type 'number'",
      },
      { en: 'Nothing at compile time, but it crashes at runtime', fr: "Rien à la compilation, mais ça plante à l'exécution" },
    ],
    answer: 2,
    hint: {
      en: 'TypeScript looks at the initial value to decide the type of a variable.',
      fr: 'TypeScript regarde la valeur initiale pour décider du type d’une variable.',
    },
    explanation: {
      en: 'TypeScript infers types from initial values: `let count = 5` makes `count` a `number` without any annotation. Assigning a string later is therefore an error. Rely on inference for local variables and annotate function parameters and public APIs.',
      fr: "TypeScript infère les types à partir des valeurs initiales : `let count = 5` fait de `count` un `number` sans aucune annotation. Lui affecter ensuite une chaîne est donc une erreur. Laissez l'inférence travailler pour les variables locales et annotez les paramètres de fonctions et les API publiques.",
    },
  },
  {
    id: 'ts-006',
    track: 'typescript',
    tier: 1,
    kind: 'order',
    concept: { en: 'Typed arrow functions', fr: 'Fonctions fléchées typées' },
    prompt: {
      en: 'Put the lines in order: define a typed `formatPrice` arrow function, use it, then print "9.50 EUR".',
      fr: "Remettez les lignes dans l'ordre : définissez une fonction fléchée typée `formatPrice`, utilisez-la, puis affichez « 9.50 EUR ».",
    },
    lines: [
      'const formatPrice = (amount: number, currency: string): string => {',
      '  const rounded = amount.toFixed(2);',
      '  return `${rounded} ${currency}`;',
      '};',
      "const label: string = formatPrice(9.5, 'EUR');",
      'console.log(label);',
    ],
    hint: {
      en: 'A `const` function cannot be used before its definition, and `label` must exist before it is printed.',
      fr: 'Une fonction déclarée avec `const` ne peut pas être utilisée avant sa définition, et `label` doit exister avant d’être affiché.',
    },
    explanation: {
      en: 'An arrow function stored in a `const` is not hoisted: it must be defined before it is called. Its signature `(amount: number, currency: string): string` types both parameters and the return value, so the compiler checks every call site.',
      fr: "Une fonction fléchée stockée dans un `const` n'est pas remontée : elle doit être définie avant d'être appelée. Sa signature `(amount: number, currency: string): string` type les deux paramètres et la valeur de retour : le compilateur vérifie ainsi chaque appel.",
    },
  },

  // ─────────────────────────── Tier 2 · Apprentice ───────────────────────────
  {
    id: 'ts-007',
    track: 'typescript',
    tier: 2,
    kind: 'code',
    concept: { en: 'Generic functions', fr: 'Fonctions génériques' },
    prompt: {
      en: 'Write the generic function `lastOr<T>(items, fallback)` that returns the last element of `items`, or `fallback` if the array is empty. It must work for any element type.',
      fr: "Écrivez la fonction générique `lastOr<T>(items, fallback)` qui renvoie le dernier élément de `items`, ou `fallback` si le tableau est vide. Elle doit fonctionner pour n'importe quel type d'élément.",
    },
    language: 'typescript',
    starter: `function lastOr<T>(items: T[], fallback: T): T {
  // TODO: return the last item, or fallback when items is empty
  return fallback;
}`,
    tests: `assertEqual(lastOr([1, 2, 3], 0), 3, 'numbers');
assertEqual(lastOr(['a', 'b'], 'z'), 'b', 'strings');
assertEqual(lastOr([], 'none'), 'none', 'empty array uses the fallback');
assertEqual(lastOr([{ id: 1 }, { id: 2 }], { id: 0 }), { id: 2 }, 'objects');`,
    solution: `function lastOr<T>(items: T[], fallback: T): T {
  return items.length > 0 ? items[items.length - 1] : fallback;
}`,
    hint: {
      en: 'The last index of an array is its length minus one. Check the length first.',
      fr: "Le dernier indice d'un tableau est sa longueur moins un. Vérifiez d'abord la longueur.",
    },
    explanation: {
      en: 'The type parameter `T` is a placeholder filled in at each call: `lastOr([1, 2], 0)` infers `T = number` and returns a `number`, with no `any` involved. Generics let one implementation stay fully typed for every element type.',
      fr: "Le paramètre de type `T` est un emplacement rempli à chaque appel : `lastOr([1, 2], 0)` infère `T = number` et renvoie un `number`, sans aucun `any`. Les génériques permettent à une seule implémentation de rester entièrement typée pour tous les types d'éléments.",
    },
  },
  {
    id: 'ts-008',
    track: 'typescript',
    tier: 2,
    kind: 'mcq',
    concept: { en: 'interface vs type', fr: 'interface ou type' },
    prompt: {
      en: 'Which of these can you do with a `type` alias but NOT with an `interface`?',
      fr: 'Laquelle de ces choses peut-on faire avec un alias `type` mais PAS avec une `interface` ?',
    },
    options: [
      { en: 'Describe the shape of an object', fr: "Décrire la forme d'un objet" },
      { en: 'Be implemented by a class', fr: 'Être implémenté par une classe' },
      { en: 'Extend another object type', fr: "Étendre un autre type d'objet" },
      { en: "Name a union such as 'light' | 'dark'", fr: "Nommer une union comme 'light' | 'dark'" },
    ],
    answer: 3,
    hint: {
      en: 'An interface always describes one object shape.',
      fr: "Une interface décrit toujours une seule forme d'objet.",
    },
    explanation: {
      en: 'Interfaces and type aliases both describe object shapes, can be extended and implemented. But only `type` can name unions, primitives, tuples or computed types like `type Theme = \'light\' | \'dark\'`. A common rule: `interface` for object contracts, `type` for everything else.',
      fr: "Les interfaces et les alias de type décrivent tous deux des formes d'objets, peuvent être étendus et implémentés. Mais seul `type` peut nommer des unions, des primitifs, des tuples ou des types calculés comme `type Theme = 'light' | 'dark'`. Règle courante : `interface` pour les contrats d'objets, `type` pour le reste.",
    },
  },
  {
    id: 'ts-009',
    track: 'typescript',
    tier: 2,
    kind: 'bug',
    concept: { en: 'Literal union types', fr: 'Unions de littéraux' },
    prompt: {
      en: 'A status may only be idle, loading or done. The compiler rejects exactly one line: click it.',
      fr: 'Un statut ne peut valoir que idle, loading ou done. Le compilateur refuse exactement une ligne : cliquez dessus.',
    },
    lines: [
      "type Status = 'idle' | 'loading' | 'done';",
      "let current: Status = 'idle';",
      'function setStatus(next: Status): void {',
      '  current = next;',
      '}',
      "setStatus('loading');",
      "setStatus('finished');",
    ],
    bugLine: 6,
    hint: {
      en: 'Compare every string passed around with the exact list of allowed values.',
      fr: 'Comparez chaque chaîne utilisée avec la liste exacte des valeurs permises.',
    },
    explanation: {
      en: "A union of string literals restricts a value to an exact set of strings. `'finished'` is a string, but not one of the three members of `Status`, so the call is rejected at compile time instead of causing a silent bug at runtime. Editors also autocomplete the allowed values.",
      fr: "Une union de littéraux de chaîne restreint une valeur à un ensemble exact de chaînes. `'finished'` est bien une chaîne, mais pas l'un des trois membres de `Status` : l'appel est refusé à la compilation au lieu de provoquer un bug silencieux à l'exécution. Les éditeurs proposent aussi l'autocomplétion des valeurs permises.",
    },
  },
  {
    id: 'ts-010',
    track: 'typescript',
    tier: 2,
    kind: 'fill',
    concept: { en: 'readonly & optional', fr: 'readonly et optionnel' },
    prompt: {
      en: 'Complete the interface so that `id` can never be reassigned and `nickname` may be omitted.',
      fr: "Complétez l'interface pour que `id` ne puisse jamais être réaffecté et que `nickname` puisse être omis.",
    },
    template: `interface User {
  ___ id: number;
  name: string;
  nickname___: string;
}

const u: User = { id: 1, name: 'Ada' }; // OK: nickname is optional
u.id = 2; // Error: id cannot be reassigned`,
    blanks: [['readonly'], ['?']],
    hint: {
      en: 'One blank is a modifier keyword placed before the property; the other is a single character placed after its name.',
      fr: "L'un des blancs est un mot-clé placé avant la propriété ; l'autre est un seul caractère placé après son nom.",
    },
    explanation: {
      en: '`readonly` forbids reassigning a property after the object is created (at compile time only). A `?` after a property name makes it optional: its type becomes `string | undefined`, so the compiler will make you handle the missing case before using it.',
      fr: "`readonly` interdit de réaffecter une propriété après la création de l'objet (uniquement à la compilation). Un `?` après le nom d'une propriété la rend optionnelle : son type devient `string | undefined`, et le compilateur vous obligera à gérer le cas où elle manque avant de l'utiliser.",
    },
  },
  {
    id: 'ts-011',
    track: 'typescript',
    tier: 2,
    kind: 'output',
    concept: { en: 'Numeric enums', fr: 'Enums numériques' },
    prompt: {
      en: 'What does this program print?',
      fr: 'Qu’affiche ce programme ?',
    },
    code: `enum Status { Idle, Running, Done = 10, Failed }

console.log(Status.Running, Status.Failed, Status[10]);`,
    codeLang: 'typescript',
    accepted: ['1 11 Done'],
    hint: {
      en: 'Numbering starts at 0 and continues from the last explicit value. Numeric enums also map numbers back to names.',
      fr: "La numérotation commence à 0 et reprend à partir de la dernière valeur explicite. Les enums numériques associent aussi les nombres à leurs noms.",
    },
    explanation: {
      en: 'Numeric enum members auto-increment from 0, and after an explicit value (`Done = 10`) counting continues from it, so `Failed` is 11. Unlike most TS features, an enum produces a real JavaScript object, including a reverse mapping: `Status[10]` is "Done".',
      fr: "Les membres d'un enum numérique s'incrémentent automatiquement à partir de 0, et après une valeur explicite (`Done = 10`) le compte reprend à partir d'elle : `Failed` vaut 11. Contrairement à la plupart des fonctionnalités de TS, un enum produit un vrai objet JavaScript, avec une table inverse : `Status[10]` vaut \"Done\".",
    },
  },
  {
    id: 'ts-012',
    track: 'typescript',
    tier: 2,
    kind: 'mcq',
    concept: { en: 'Strict mode', fr: 'Mode strict' },
    prompt: {
      en: 'What does `"strict": true` do in `tsconfig.json`?',
      fr: 'Que fait `"strict": true` dans `tsconfig.json` ?',
    },
    code: `{
  "compilerOptions": {
    "strict": true
  }
}`,
    codeLang: 'json',
    options: [
      {
        en: 'It enables a family of stricter checks, such as `strictNullChecks` and `noImplicitAny`',
        fr: 'Il active une famille de vérifications plus strictes, comme `strictNullChecks` et `noImplicitAny`',
      },
      { en: 'It makes the compiled JavaScript run faster', fr: 'Il rend le JavaScript compilé plus rapide' },
      { en: 'It forbids writing `any` anywhere in the project', fr: "Il interdit d'écrire `any` où que ce soit dans le projet" },
      { en: 'It turns compile errors into runtime exceptions', fr: "Il transforme les erreurs de compilation en exceptions à l'exécution" },
    ],
    answer: 0,
    hint: {
      en: 'It is a single switch that turns on several other compiler options at once.',
      fr: "C'est un seul interrupteur qui active plusieurs autres options du compilateur d'un coup.",
    },
    explanation: {
      en: '`strict` is a shortcut that enables a group of checks: `strictNullChecks` (null/undefined must be handled), `noImplicitAny` (no silent `any` parameters), `strictFunctionTypes` and more. It has no effect on runtime speed, and explicit `any` is still allowed. Turn it on for every new project.',
      fr: "`strict` est un raccourci qui active un groupe de vérifications : `strictNullChecks` (null/undefined doivent être gérés), `noImplicitAny` (pas de paramètres `any` implicites), `strictFunctionTypes`, etc. Il n'a aucun effet sur la vitesse d'exécution, et un `any` explicite reste permis. Activez-le dans tout nouveau projet.",
    },
  },

  // ───────────────────────────── Tier 3 · Adept ──────────────────────────────
  {
    id: 'ts-013',
    track: 'typescript',
    tier: 3,
    kind: 'output',
    concept: { en: 'Narrowing with typeof', fr: 'Affinage avec typeof' },
    prompt: {
      en: 'What does this program print?',
      fr: 'Qu’affiche ce programme ?',
    },
    code: `function describe(x: string | number | boolean): string {
  if (typeof x === 'string') return 's:' + x.length;
  if (typeof x === 'number') return 'n:' + x.toFixed(1);
  return 'b:' + !x;
}

console.log(describe('hey'), describe(2), describe(false));`,
    codeLang: 'typescript',
    accepted: ['s:3 n:2.0 b:true'],
    hint: {
      en: 'Follow each value through the `if`s. `toFixed(1)` always keeps one decimal.',
      fr: 'Suivez chaque valeur à travers les `if`. `toFixed(1)` garde toujours une décimale.',
    },
    explanation: {
      en: "Inside `if (typeof x === 'string')`, TypeScript narrows `x` to `string`, so `.length` is allowed; in the next branch it is `number`, so `.toFixed` is allowed; at the end only `boolean` remains. Narrowing lets one function safely handle each member of a union.",
      fr: "Dans `if (typeof x === 'string')`, TypeScript affine `x` en `string`, donc `.length` est permis ; dans la branche suivante c'est un `number`, donc `.toFixed` est permis ; à la fin il ne reste que `boolean`. L'affinage (narrowing) permet à une seule fonction de traiter sans risque chaque membre d'une union.",
    },
  },
  {
    id: 'ts-014',
    track: 'typescript',
    tier: 3,
    kind: 'riddle',
    concept: { en: 'The unknown type', fr: 'Le type unknown' },
    prompt: {
      en: "Like my reckless cousin, I can hold any value at all.\nBut you may not call me, read my properties or add me up\nuntil you have proven what I really am.\nWhat type am I?",
      fr: "Comme mon cousin imprudent, je peux contenir n'importe quelle valeur.\nMais tu ne peux ni m'appeler, ni lire mes propriétés, ni m'additionner\ntant que tu n'as pas prouvé ce que je suis vraiment.\nQuel type suis-je ?",
    },
    accepted: ['unknown', 'type unknown', 'unknown type'],
    hint: {
      en: 'Its name says you do not know yet what is inside.',
      fr: "Son nom (en anglais) dit qu'on ne sait pas encore ce qu'il contient.",
    },
    explanation: {
      en: '`unknown` is the type-safe counterpart of `any`: every value can be assigned to it, but you cannot use it until you narrow it with `typeof`, `instanceof`, `in` or a type guard. Use it for data from `JSON.parse`, APIs or `catch (err)`.',
      fr: "`unknown` est l'équivalent sûr de `any` : on peut lui affecter n'importe quelle valeur, mais on ne peut pas l'utiliser avant de l'affiner avec `typeof`, `instanceof`, `in` ou une garde de type. Utilisez-le pour les données venant de `JSON.parse`, d'API ou de `catch (err)`.",
    },
  },
  {
    id: 'ts-015',
    track: 'typescript',
    tier: 3,
    kind: 'code',
    concept: { en: 'Type guards', fr: 'Gardes de type' },
    prompt: {
      en: 'Write the type guard `isNumber(value)` (true only for numbers that are not NaN), then use it in `sumNumbers(values)` to add up only the numbers of a list of unknown values.',
      fr: "Écrivez la garde de type `isNumber(value)` (vraie uniquement pour les nombres qui ne sont pas NaN), puis utilisez-la dans `sumNumbers(values)` pour additionner uniquement les nombres d'une liste de valeurs inconnues.",
    },
    language: 'typescript',
    starter: `function isNumber(value: unknown): value is number {
  // TODO: true only for real numbers (not NaN)
  return false;
}

function sumNumbers(values: unknown[]): number {
  // TODO: add up only the values that pass isNumber
  return 0;
}`,
    tests: `assertEqual(isNumber(42), true, 'a number');
assertEqual(isNumber('42'), false, 'a numeric string is not a number');
assertEqual(isNumber(NaN), false, 'NaN is rejected');
assertEqual(sumNumbers([1, '2', 3, null, { n: 4 }, NaN, 5]), 9, 'mixed values');
assertEqual(sumNumbers(['a', true, undefined]), 0, 'no numbers at all');`,
    solution: `function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !Number.isNaN(value);
}

function sumNumbers(values: unknown[]): number {
  let total = 0;
  for (const v of values) {
    if (isNumber(v)) total += v;
  }
  return total;
}`,
    hint: {
      en: 'Combine `typeof` with `Number.isNaN`. In `sumNumbers`, inside `if (isNumber(v))` TypeScript knows `v` is a number.',
      fr: 'Combinez `typeof` et `Number.isNaN`. Dans `sumNumbers`, à l’intérieur de `if (isNumber(v))`, TypeScript sait que `v` est un nombre.',
    },
    explanation: {
      en: 'A function returning `value is number` is a user-defined type guard: when it returns true, TypeScript narrows the argument to `number` in the calling code. It packages a runtime check into a reusable function, so `unknown` data can be used safely.',
      fr: "Une fonction qui renvoie `value is number` est une garde de type personnalisée : quand elle renvoie true, TypeScript affine l'argument en `number` dans le code appelant. Elle encapsule une vérification d'exécution dans une fonction réutilisable, pour utiliser des données `unknown` en toute sécurité.",
    },
  },
  {
    id: 'ts-016',
    track: 'typescript',
    tier: 3,
    kind: 'mcq',
    concept: { en: 'Utility types', fr: 'Types utilitaires' },
    prompt: {
      en: 'Which type is equivalent to `{ id: number; name: string }`?',
      fr: 'Quel type est équivalent à `{ id: number; name: string }` ?',
    },
    code: `type User = { id: number; name: string; password: string };`,
    codeLang: 'typescript',
    options: [
      { en: 'Partial<User>', fr: 'Partial<User>' },
      { en: "Pick<User, 'password'>", fr: "Pick<User, 'password'>" },
      { en: "Omit<User, 'password'>", fr: "Omit<User, 'password'>" },
      { en: "Record<'id' | 'name', User>", fr: "Record<'id' | 'name', User>" },
    ],
    answer: 2,
    hint: {
      en: 'You want everything except one property.',
      fr: 'Vous voulez tout, sauf une propriété.',
    },
    explanation: {
      en: "`Omit<T, K>` removes the keys `K` from `T`, while `Pick<T, K>` keeps only them. `Partial<T>` makes every property optional, and `Record<K, V>` builds an object type whose keys are `K` and values are `V`. These utility types derive new types from existing ones instead of duplicating them.",
      fr: "`Omit<T, K>` retire les clés `K` de `T`, tandis que `Pick<T, K>` ne garde qu'elles. `Partial<T>` rend toutes les propriétés optionnelles, et `Record<K, V>` construit un type d'objet dont les clés sont `K` et les valeurs `V`. Ces types utilitaires dérivent de nouveaux types à partir des existants au lieu de les dupliquer.",
    },
  },
  {
    id: 'ts-017',
    track: 'typescript',
    tier: 3,
    kind: 'order',
    concept: { en: 'Generics with Record', fr: 'Génériques et Record' },
    prompt: {
      en: 'Rebuild the generic `groupBy` function that sorts items into buckets named by `getKey`.',
      fr: 'Reconstruisez la fonction générique `groupBy` qui range les éléments dans des groupes nommés par `getKey`.',
    },
    lines: [
      'function groupBy<T>(items: T[], getKey: (item: T) => string): Record<string, T[]> {',
      '  const groups: Record<string, T[]> = {};',
      '  for (const item of items) {',
      '    (groups[getKey(item)] ??= []).push(item);',
      '  }',
      '  return groups;',
      '}',
    ],
    hint: {
      en: 'Create the empty result first, fill it in the loop, return it at the end.',
      fr: 'Créez d’abord le résultat vide, remplissez-le dans la boucle, renvoyez-le à la fin.',
    },
    explanation: {
      en: '`Record<string, T[]>` describes an object whose keys are strings and whose values are arrays of `T`. Because `T` is generic, `groupBy(users, u => u.role)` returns `Record<string, User[]>`. The `??=` operator creates the bucket only when it does not exist yet.',
      fr: "`Record<string, T[]>` décrit un objet dont les clés sont des chaînes et les valeurs des tableaux de `T`. Comme `T` est générique, `groupBy(users, u => u.role)` renvoie `Record<string, User[]>`. L'opérateur `??=` ne crée le groupe que s'il n'existe pas encore.",
    },
  },

  // ───────────────────────────── Tier 4 · Expert ─────────────────────────────
  {
    id: 'ts-018',
    track: 'typescript',
    tier: 4,
    kind: 'mcq',
    concept: { en: 'The satisfies operator', fr: "L'opérateur satisfies" },
    prompt: {
      en: 'Why does `palette.green.toUpperCase()` compile here, whereas it would fail with `const palette: Record<string, Color> = ...`?',
      fr: 'Pourquoi `palette.green.toUpperCase()` compile-t-il ici, alors que cela échouerait avec `const palette: Record<string, Color> = ...` ?',
    },
    code: `type Color = string | [number, number, number];

const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
} satisfies Record<string, Color>;

palette.green.toUpperCase();`,
    codeLang: 'typescript',
    options: [
      { en: '`satisfies` turns type checking off for this object', fr: 'satisfies désactive la vérification de type pour cet objet' },
      {
        en: '`satisfies` checks the object against the type but keeps its precise inferred type, so `green` is known to be a string',
        fr: "satisfies vérifie l'objet par rapport au type mais conserve son type inféré précis : `green` est donc connu comme une chaîne",
      },
      { en: '`satisfies` converts every property to `any`', fr: 'satisfies convertit chaque propriété en `any`' },
      { en: '`satisfies` converts the values at runtime', fr: "satisfies convertit les valeurs à l'exécution" },
    ],
    answer: 1,
    hint: {
      en: 'Think about what an annotation does to the type of `green`: it widens it to `Color`.',
      fr: 'Pensez à ce que fait une annotation au type de `green` : elle l’élargit à `Color`.',
    },
    explanation: {
      en: 'An annotation replaces the inferred type, so `palette.green` would be `Color` and `.toUpperCase()` would be rejected (it might be a tuple). `satisfies` validates the value against the type (catching typos and wrong values) while keeping the narrower inferred type of each property.',
      fr: "Une annotation remplace le type inféré : `palette.green` serait de type `Color` et `.toUpperCase()` serait refusé (ce pourrait être un tuple). `satisfies` valide la valeur par rapport au type (en attrapant fautes de frappe et mauvaises valeurs) tout en conservant le type inféré plus précis de chaque propriété.",
    },
  },
  {
    id: 'ts-019',
    track: 'typescript',
    tier: 4,
    kind: 'riddle',
    concept: { en: 'The never type', fr: 'Le type never' },
    prompt: {
      en: "I am the type that no value can ever have.\nA function that always throws returns me; a switch that handled every case leaves only me behind.\nAssign anything to me and the compiler cries out.\nWhat type am I?",
      fr: "Je suis le type qu'aucune valeur ne peut jamais avoir.\nUne fonction qui lève toujours une erreur me renvoie ; un switch qui a traité tous les cas ne laisse que moi.\nAffecte-moi quoi que ce soit et le compilateur proteste.\nQuel type suis-je ?",
    },
    accepted: ['never', 'type never', 'never type'],
    hint: {
      en: 'Its name answers the question "when will this happen?"',
      fr: 'Son nom (en anglais) répond à la question « quand cela arrivera-t-il ? »',
    },
    explanation: {
      en: '`never` is the empty type: it has no values. It is the return type of functions that never return, and what remains of a union once every member has been narrowed away. Assigning a value to a `never` variable in a `default` branch turns a forgotten case into a compile error (exhaustiveness checking).',
      fr: "`never` est le type vide : il ne contient aucune valeur. C'est le type de retour des fonctions qui ne se terminent jamais normalement, et ce qui reste d'une union une fois tous ses membres éliminés par affinage. Affecter une valeur à une variable `never` dans une branche `default` transforme un cas oublié en erreur de compilation (vérification d'exhaustivité).",
    },
  },
  {
    id: 'ts-020',
    track: 'typescript',
    tier: 4,
    kind: 'code',
    concept: { en: 'Discriminated unions', fr: 'Unions discriminées' },
    prompt: {
      en: "Implement `area(shape)` for the discriminated union `Shape`. Switch on `kind`, and add a `default` branch that assigns the shape to a `never` variable so that any forgotten case fails to compile.",
      fr: "Implémentez `area(shape)` pour l'union discriminée `Shape`. Faites un switch sur `kind`, et ajoutez une branche `default` qui affecte la forme à une variable `never`, pour qu'un cas oublié ne compile pas.",
    },
    language: 'typescript',
    starter: `type Shape =
  | { kind: 'square'; size: number }
  | { kind: 'rect'; width: number; height: number }
  | { kind: 'circle'; radius: number };

function area(shape: Shape): number {
  // TODO: switch on shape.kind and compute the area of each shape
  return 0;
}`,
    tests: `assertEqual(area({ kind: 'square', size: 3 }), 9, 'square');
assertEqual(area({ kind: 'rect', width: 2, height: 5 }), 10, 'rectangle');
assertEqual(Math.round(area({ kind: 'circle', radius: 2 }) * 100) / 100, 12.57, 'circle (pi * r * r)');
assertEqual(area({ kind: 'rect', width: 0, height: 7 }), 0, 'flat rectangle');`,
    solution: `type Shape =
  | { kind: 'square'; size: number }
  | { kind: 'rect'; width: number; height: number }
  | { kind: 'circle'; radius: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'square':
      return shape.size ** 2;
    case 'rect':
      return shape.width * shape.height;
    case 'circle':
      return Math.PI * shape.radius ** 2;
    default: {
      const unreachable: never = shape;
      throw new Error('Unknown shape: ' + JSON.stringify(unreachable));
    }
  }
}`,
    hint: {
      en: "In `case 'circle':` TypeScript already knows `shape.radius` exists. In `default`, nothing is left.",
      fr: "Dans `case 'circle':`, TypeScript sait déjà que `shape.radius` existe. Dans `default`, il ne reste plus rien.",
    },
    explanation: {
      en: 'The shared literal property `kind` is the discriminant: checking it narrows `shape` to one member of the union, giving access to its specific fields. In `default`, `shape` has type `never`; if someone adds a new shape without handling it, the `never` assignment becomes a compile error.',
      fr: "La propriété littérale commune `kind` est le discriminant : la tester affine `shape` vers un seul membre de l'union et donne accès à ses champs propres. Dans `default`, `shape` est de type `never` ; si quelqu'un ajoute une nouvelle forme sans la gérer, l'affectation à `never` devient une erreur de compilation.",
    },
  },
  {
    id: 'ts-021',
    track: 'typescript',
    tier: 4,
    kind: 'bug',
    concept: { en: 'keyof typeof', fr: 'keyof typeof' },
    prompt: {
      en: 'Only declared routes may be used with `go`. The compiler rejects exactly one line: click it.',
      fr: 'Seules les routes déclarées peuvent être utilisées avec `go`. Le compilateur refuse exactement une ligne : cliquez dessus.',
    },
    lines: [
      'const routes = {',
      "  home: '/',",
      "  about: '/about',",
      '} satisfies Record<string, string>;',
      'type RouteName = keyof typeof routes;',
      'function go(name: RouteName): string {',
      '  return routes[name];',
      '}',
      "go('about');",
      "go('contact');",
    ],
    bugLine: 9,
    hint: {
      en: 'Work out what `RouteName` actually is by listing the keys of `routes`.',
      fr: 'Déterminez ce qu’est réellement `RouteName` en listant les clés de `routes`.',
    },
    explanation: {
      en: "`typeof routes` gets the type of the value, and `keyof` turns its keys into the union `'home' | 'about'`, so `'contact'` is rejected. Because `satisfies` keeps the exact keys (an annotation `Record<string, string>` would widen `RouteName` to `string`), adding a route automatically updates the allowed names.",
      fr: "`typeof routes` récupère le type de la valeur, et `keyof` transforme ses clés en l'union `'home' | 'about'` : `'contact'` est donc refusé. Comme `satisfies` conserve les clés exactes (une annotation `Record<string, string>` élargirait `RouteName` à `string`), ajouter une route met automatiquement à jour les noms permis.",
    },
  },
  {
    id: 'ts-022',
    track: 'typescript',
    tier: 4,
    kind: 'fill',
    concept: { en: 'Mapped & conditional types', fr: 'Types mappés et conditionnels' },
    prompt: {
      en: 'Complete the mapped type `Optional<T>` (all properties optional) and the conditional type `ElementOf<T>` (element type of an array).',
      fr: "Complétez le type mappé `Optional<T>` (toutes les propriétés optionnelles) et le type conditionnel `ElementOf<T>` (type des éléments d'un tableau).",
    },
    template: `type Optional<T> = { [K ___ keyof T]___: T[K] };
type ElementOf<T> = T ___ (infer U)[] ? U : never;

type A = Optional<{ a: number }>; // { a?: number }
type B = ElementOf<string[]>;     // string`,
    blanks: [['in'], ['?'], ['extends']],
    hint: {
      en: 'Mapped types iterate over keys like a `for...in` loop; conditional types reuse the keyword used for generic constraints.',
      fr: 'Les types mappés parcourent les clés comme une boucle `for...in` ; les types conditionnels réutilisent le mot-clé des contraintes génériques.',
    },
    explanation: {
      en: '`{ [K in keyof T]?: T[K] }` loops over every key of `T` and rebuilds each property, here with a `?` modifier: this is exactly how `Partial<T>` is defined. `T extends X ? A : B` is a type-level if/else, and `infer U` captures a piece of the matched type.',
      fr: "`{ [K in keyof T]?: T[K] }` parcourt chaque clé de `T` et reconstruit chaque propriété, ici avec le modificateur `?` : c'est exactement ainsi qu'est défini `Partial<T>`. `T extends X ? A : B` est un si/sinon au niveau des types, et `infer U` capture une partie du type reconnu.",
    },
  },
];
