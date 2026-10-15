import type { Challenge } from '../types';

export const challenges: Challenge[] = [
  // ───────────────────────────── Tier 1 — Novice ─────────────────────────────
  {
    id: 'py-001',
    track: 'python',
    tier: 1,
    kind: 'mcq',
    concept: { en: 'Dynamic typing', fr: 'Typage dynamique' },
    prompt: {
      en: 'What happens when this code runs?',
      fr: 'Que se passe-t-il quand ce code s’exécute ?',
    },
    code: `score = 10
score = "ten"
print(score)`,
    codeLang: 'python',
    options: [
      { en: 'TypeError: score was declared as an int', fr: 'TypeError : score a été déclaré comme un int' },
      { en: 'It prints ten: score now refers to a str', fr: 'Il affiche ten : score désigne maintenant une str' },
      { en: 'SyntaxError: a variable cannot be assigned twice', fr: 'SyntaxError : une variable ne peut pas être affectée deux fois' },
      { en: 'It prints 10: the first value wins', fr: 'Il affiche 10 : la première valeur l’emporte' },
    ],
    answer: 1,
    hint: {
      en: 'In Python, does the type belong to the variable name or to the value?',
      fr: 'En Python, le type appartient-il au nom de la variable ou à la valeur ?',
    },
    explanation: {
      en: 'Python is dynamically typed: a variable is just a name bound to an object, and the type lives on the object. Rebinding score to a string is perfectly legal; there is no type declaration to violate.',
      fr: 'Python est typé dynamiquement : une variable n’est qu’un nom lié à un objet, et c’est l’objet qui porte le type. Réaffecter score à une chaîne est parfaitement légal ; il n’y a aucune déclaration de type à enfreindre.',
    },
  },
  {
    id: 'py-002',
    track: 'python',
    tier: 1,
    kind: 'output',
    concept: { en: 'Numbers & conversions', fr: 'Nombres et conversions' },
    prompt: {
      en: 'What does this program print?',
      fr: 'Qu’affiche ce programme ?',
    },
    code: `print(7 // 2, 7 / 2, 7 % 2)
print(int("4") + 1, str(4) + "1")`,
    codeLang: 'python',
    accepted: ['3 3.5 1\n5 41'],
    hint: {
      en: 'One slash and two slashes are different operators. And + means something different for strings.',
      fr: 'Une barre oblique et deux barres obliques sont des opérateurs différents. Et + n’a pas le même sens pour les chaînes.',
    },
    explanation: {
      en: '// is floor division (an int here), / always returns a float, and % gives the remainder. int("4") converts text to a number, while str(4) + "1" concatenates two strings into "41".',
      fr: '// est la division entière (un int ici), / renvoie toujours un float et % donne le reste. int("4") convertit du texte en nombre, alors que str(4) + "1" concatène deux chaînes pour donner "41".',
    },
  },
  {
    id: 'py-003',
    track: 'python',
    tier: 1,
    kind: 'fill',
    concept: { en: 'f-strings', fr: 'f-strings' },
    prompt: {
      en: 'Complete the code so it prints: Ada is 36 years old',
      fr: 'Complète le code pour qu’il affiche : Ada is 36 years old',
    },
    template: `name = "Ada"
age = 36
print(___"{name} is {age} years old")`,
    blanks: [['f', 'F']],
    hint: {
      en: 'A single-letter prefix tells Python to replace {…} with the values of expressions.',
      fr: 'Un préfixe d’une seule lettre indique à Python de remplacer {…} par la valeur des expressions.',
    },
    explanation: {
      en: 'Prefixing a string with f turns it into a formatted string literal: every {expression} inside is evaluated and inserted. Without the f, the braces would be printed literally.',
      fr: 'Préfixer une chaîne par f en fait une chaîne formatée : chaque {expression} à l’intérieur est évaluée puis insérée. Sans le f, les accolades seraient affichées telles quelles.',
    },
  },
  {
    id: 'py-004',
    track: 'python',
    tier: 1,
    kind: 'riddle',
    concept: { en: 'Booleans', fr: 'Booléens' },
    prompt: {
      en: 'I have two faces and never a third,\none means yes and one means no.\nCompare two values and I am the word;\na logician named George gave me my name long ago.\nWhich Python type am I?',
      fr: 'J’ai deux visages, jamais un troisième,\nl’un dit oui et l’autre dit non.\nCompare deux valeurs : me voici quand même ;\nun logicien nommé George m’a donné mon nom.\nQuel type Python suis-je ?',
    },
    accepted: ['bool', 'bools', 'boolean', 'booleans', 'booléen', 'booleen', 'booléens', 'booleens'],
    hint: {
      en: 'Its only two values are written with a capital letter in Python.',
      fr: 'Ses deux seules valeurs s’écrivent avec une majuscule en Python.',
    },
    explanation: {
      en: 'bool has exactly two values, True and False, named after George Boole. Comparisons like 3 > 2 produce a bool, and bool is actually a subclass of int (True == 1).',
      fr: 'bool possède exactement deux valeurs, True et False, nommées d’après George Boole. Les comparaisons comme 3 > 2 produisent un bool, et bool est en fait une sous-classe de int (True == 1).',
    },
  },
  {
    id: 'py-005',
    track: 'python',
    tier: 1,
    kind: 'code',
    concept: { en: 'Functions & return', fr: 'Fonctions et return' },
    prompt: {
      en: 'Write greet(name) so that it RETURNS (not prints) the string "Hello, <name>!". The type hints say it takes a str and returns a str.',
      fr: 'Écris greet(name) pour qu’elle RENVOIE (et non affiche) la chaîne "Hello, <name>!". Les annotations de type indiquent qu’elle prend une str et renvoie une str.',
    },
    language: 'python',
    starter: `def greet(name: str) -> str:
    # TODO: return "Hello, <name>!" using an f-string
    pass`,
    tests: `assert_equal(greet("Ada"), "Hello, Ada!", "greet('Ada')")
assert_equal(greet("Linus"), "Hello, Linus!", "greet('Linus')")
assert_equal(greet(""), "Hello, !", "empty name")`,
    solution: `def greet(name: str) -> str:
    return f"Hello, {name}!"`,
    hint: {
      en: 'Use the return keyword with an f-string; print() would only display the text and return None.',
      fr: 'Utilise le mot-clé return avec une f-string ; print() ne ferait qu’afficher le texte et renverrait None.',
    },
    explanation: {
      en: 'return hands a value back to the caller so it can be stored or tested; print only shows text. Type hints like name: str and -> str document intent and help tools, but Python does not enforce them at runtime.',
      fr: 'return renvoie une valeur à l’appelant pour qu’il puisse la stocker ou la tester ; print se contente d’afficher. Les annotations comme name: str et -> str documentent l’intention et aident les outils, mais Python ne les vérifie pas à l’exécution.',
    },
  },
  {
    id: 'py-006',
    track: 'python',
    tier: 1,
    kind: 'mcq',
    concept: { en: 'input() returns text', fr: 'input() renvoie du texte' },
    prompt: {
      en: 'The user types 20 and presses Enter. What happens?',
      fr: 'L’utilisateur tape 20 puis Entrée. Que se passe-t-il ?',
    },
    code: `age = input("Your age? ")
print(age + 1)`,
    codeLang: 'python',
    options: [
      { en: 'It prints 21', fr: 'Il affiche 21' },
      { en: 'It prints 201', fr: 'Il affiche 201' },
      { en: 'TypeError: input() returned a str, which cannot be added to an int', fr: 'TypeError : input() a renvoyé une str, qu’on ne peut pas additionner à un int' },
      { en: 'It prints 20 1', fr: 'Il affiche 20 1' },
    ],
    answer: 2,
    hint: {
      en: 'What is the type of whatever the keyboard gives you?',
      fr: 'Quel est le type de ce que renvoie le clavier ?',
    },
    explanation: {
      en: 'input() always returns a str, even if the user typed digits. Python refuses to mix str and int with + (no silent conversion), so you must write int(input(...)) to get a number.',
      fr: 'input() renvoie toujours une str, même si l’utilisateur a tapé des chiffres. Python refuse de mélanger str et int avec + (aucune conversion implicite) : il faut écrire int(input(...)) pour obtenir un nombre.',
    },
  },

  // ─────────────────────────── Tier 2 — Apprentice ───────────────────────────
  {
    id: 'py-007',
    track: 'python',
    tier: 2,
    kind: 'output',
    concept: { en: 'Indexing & slicing', fr: 'Indices et découpage' },
    prompt: {
      en: 'What does this program print?',
      fr: 'Qu’affiche ce programme ?',
    },
    code: `word = "PYTHON"
print(word[0], word[-1])
print(word[1:4])
print(word[::-1])`,
    codeLang: 'python',
    accepted: ['P N\nYTH\nNOHTYP'],
    hint: {
      en: 'Indexes start at 0, negative indexes count from the end, and a slice stops just BEFORE its end index.',
      fr: 'Les indices commencent à 0, les indices négatifs partent de la fin, et une tranche s’arrête juste AVANT son indice de fin.',
    },
    explanation: {
      en: 'word[-1] is the last character. A slice [start:stop] includes start but excludes stop, so [1:4] gives indexes 1, 2, 3. A step of -1 in [::-1] walks backwards, reversing the sequence.',
      fr: 'word[-1] est le dernier caractère. Une tranche [début:fin] inclut le début mais exclut la fin, donc [1:4] donne les indices 1, 2 et 3. Un pas de -1 dans [::-1] parcourt la séquence à l’envers et l’inverse.',
    },
  },
  {
    id: 'py-008',
    track: 'python',
    tier: 2,
    kind: 'order',
    concept: { en: 'Loops & conditions', fr: 'Boucles et conditions' },
    prompt: {
      en: 'Rebuild the function that returns the sum of the even numbers in a list.',
      fr: 'Reconstruis la fonction qui renvoie la somme des nombres pairs d’une liste.',
    },
    lines: [
      'def sum_evens(nums):',
      '    total = 0',
      '    for n in nums:',
      '        if n % 2 == 0:',
      '            total += n',
      '    return total',
    ],
    hint: {
      en: 'Indentation tells you which block each line belongs to. The accumulator must exist before the loop starts.',
      fr: 'L’indentation indique à quel bloc appartient chaque ligne. L’accumulateur doit exister avant le début de la boucle.',
    },
    explanation: {
      en: 'The accumulator pattern: initialise total before the loop, update it inside the if, and return after the loop finishes. In Python, indentation is syntax: it is what defines the body of def, for and if.',
      fr: 'Le motif de l’accumulateur : on initialise total avant la boucle, on le met à jour dans le if, et on le renvoie une fois la boucle terminée. En Python, l’indentation fait partie de la syntaxe : c’est elle qui définit le corps de def, for et if.',
    },
  },
  {
    id: 'py-009',
    track: 'python',
    tier: 2,
    kind: 'riddle',
    concept: { en: 'Sets', fr: 'Ensembles (set)' },
    prompt: {
      en: 'Throw in duplicates: I keep just one.\nAsk for my order: I have none.\nCurly braces are my home,\nyet I hold no keys: I am not a dict.\nWhat collection am I?',
      fr: 'Donne-moi des doublons : je n’en garde qu’un.\nDemande-moi un ordre : je n’en ai aucun.\nLes accolades sont ma maison,\nmais je n’ai pas de clés : je ne suis pas un dict.\nQuelle collection suis-je ?',
    },
    accepted: ['set', 'sets', 'set()', 'ensemble', 'ensembles'],
    hint: {
      en: 'It is the go-to tool to remove duplicates or to test membership very quickly.',
      fr: 'C’est l’outil idéal pour supprimer des doublons ou tester l’appartenance très rapidement.',
    },
    explanation: {
      en: 'A set stores unique, hashable items with no order: {1, 2, 2} == {1, 2}. Compare: list is ordered and mutable, tuple is ordered and immutable, dict maps keys to values. Beware: {} is an empty dict, an empty set is set().',
      fr: 'Un set stocke des éléments uniques et hachables, sans ordre : {1, 2, 2} == {1, 2}. À comparer : la list est ordonnée et modifiable, le tuple est ordonné et immuable, le dict associe des clés à des valeurs. Attention : {} est un dict vide, un set vide s’écrit set().',
    },
  },
  {
    id: 'py-010',
    track: 'python',
    tier: 2,
    kind: 'code',
    concept: { en: 'List comprehensions', fr: 'Compréhensions de liste' },
    prompt: {
      en: 'Write squares_of_evens(nums) that returns a list with the square of every even number in nums, keeping the original order. Try a one-line list comprehension!',
      fr: 'Écris squares_of_evens(nums) qui renvoie une liste contenant le carré de chaque nombre pair de nums, dans l’ordre d’origine. Essaie avec une compréhension de liste sur une seule ligne !',
    },
    language: 'python',
    starter: `def squares_of_evens(nums):
    # TODO: return [n * n for every even n] using a list comprehension
    pass`,
    tests: `assert_equal(squares_of_evens([1, 2, 3, 4]), [4, 16], "mixed numbers")
assert_equal(squares_of_evens([]), [], "empty list")
assert_equal(squares_of_evens([5, 7]), [], "no even number")
assert_equal(squares_of_evens([-2, 0, 3]), [4, 0], "negatives and zero")`,
    solution: `def squares_of_evens(nums):
    return [n * n for n in nums if n % 2 == 0]`,
    hint: {
      en: 'The shape is [expression for item in iterable if condition].',
      fr: 'La forme est [expression for élément in itérable if condition].',
    },
    explanation: {
      en: 'A list comprehension builds a new list from an iterable in one expression: the expression part transforms each item and the optional if filters them. It is usually clearer and faster than append() in a loop.',
      fr: 'Une compréhension de liste construit une nouvelle liste à partir d’un itérable en une seule expression : la partie expression transforme chaque élément et le if facultatif les filtre. C’est souvent plus clair et plus rapide qu’un append() dans une boucle.',
    },
  },
  {
    id: 'py-011',
    track: 'python',
    tier: 2,
    kind: 'fill',
    concept: { en: 'Looping over a dict', fr: 'Parcourir un dict' },
    prompt: {
      en: 'Complete the loop so it gets both the key and the value of each entry.',
      fr: 'Complète la boucle pour obtenir à la fois la clé et la valeur de chaque entrée.',
    },
    template: `scores = {"ada": 12, "bob": 7}
for name, points in scores.___():
    print(name, points)`,
    blanks: [['items']],
    hint: {
      en: 'There are three view methods on a dict: one for keys, one for values, and one for (key, value) pairs.',
      fr: 'Un dict possède trois méthodes de vue : une pour les clés, une pour les valeurs et une pour les paires (clé, valeur).',
    },
    explanation: {
      en: 'dict.items() yields (key, value) tuples, which the for loop unpacks into two variables. Looping over the dict directly only gives the keys; .values() gives only the values.',
      fr: 'dict.items() produit des tuples (clé, valeur) que la boucle for décompose en deux variables. Parcourir le dict directement ne donne que les clés ; .values() ne donne que les valeurs.',
    },
  },
  {
    id: 'py-012',
    track: 'python',
    tier: 2,
    kind: 'bug',
    concept: { en: 'Default & keyword args', fr: 'Arguments par défaut et nommés' },
    prompt: {
      en: 'This script should print 9, 1024 and 8, but Python refuses to even run it. Click the faulty line.',
      fr: 'Ce script devrait afficher 9, 1024 et 8, mais Python refuse même de l’exécuter. Clique sur la ligne fautive.',
    },
    lines: [
      'def power(base, exponent=2):',
      '    return base ** exponent',
      'print(power(3))',
      'print(power(2, exponent=10))',
      'print(power(exponent=3, 2))',
    ],
    bugLine: 4,
    hint: {
      en: 'Look at the order in which positional and keyword arguments are passed.',
      fr: 'Regarde l’ordre dans lequel sont passés les arguments positionnels et nommés.',
    },
    explanation: {
      en: 'Positional arguments must always come before keyword arguments: power(exponent=3, 2) is a SyntaxError. Write power(2, exponent=3) instead. Here exponent=2 is a default value, used when the caller omits it.',
      fr: 'Les arguments positionnels doivent toujours précéder les arguments nommés : power(exponent=3, 2) est une SyntaxError. Il faut écrire power(2, exponent=3). Ici, exponent=2 est une valeur par défaut, utilisée quand l’appelant l’omet.',
    },
  },

  // ───────────────────────────── Tier 3 — Adept ──────────────────────────────
  {
    id: 'py-013',
    track: 'python',
    tier: 3,
    kind: 'output',
    concept: { en: 'Mutable default argument', fr: 'Argument par défaut mutable' },
    prompt: {
      en: 'What does this program print?',
      fr: 'Qu’affiche ce programme ?',
    },
    code: `def add_item(item, bucket=[]):
    bucket.append(item)
    return bucket

add_item("apple")
print(add_item("pear"))`,
    codeLang: 'python',
    accepted: ["['apple', 'pear']", '["apple", "pear"]'],
    hint: {
      en: 'When exactly is the default value [] created: at each call, or once?',
      fr: 'Quand la valeur par défaut [] est-elle créée exactement : à chaque appel, ou une seule fois ?',
    },
    explanation: {
      en: 'Default values are evaluated once, when def runs, so every call shares the same list object. The idiom is bucket=None, then if bucket is None: bucket = [] inside the function.',
      fr: 'Les valeurs par défaut sont évaluées une seule fois, à l’exécution du def : tous les appels partagent donc le même objet liste. L’idiome correct est bucket=None, puis if bucket is None: bucket = [] dans la fonction.',
    },
  },
  {
    id: 'py-014',
    track: 'python',
    tier: 3,
    kind: 'bug',
    concept: { en: 'Scope (LEGB)', fr: 'Portée (LEGB)' },
    prompt: {
      en: 'This should print 1, but it crashes with UnboundLocalError. Click the line that raises the error.',
      fr: 'Ce code devrait afficher 1, mais il plante avec une UnboundLocalError. Clique sur la ligne qui lève l’erreur.',
    },
    lines: [
      'counter = 0',
      'def increment():',
      '    counter = counter + 1',
      '    return counter',
      'print(increment())',
    ],
    bugLine: 2,
    hint: {
      en: 'Assigning to a name anywhere inside a function changes how Python treats that name in the whole function.',
      fr: 'Affecter un nom n’importe où dans une fonction change la façon dont Python traite ce nom dans toute la fonction.',
    },
    explanation: {
      en: 'Because counter is assigned inside increment, Python treats it as a local variable for the whole function, so reading it on the right-hand side fails. Declare global counter (or better, pass and return the value). Names are looked up Local, Enclosing, Global, then Built-in.',
      fr: 'Comme counter est affecté dans increment, Python le considère comme une variable locale dans toute la fonction ; le lire à droite du = échoue donc. Il faut déclarer global counter (ou mieux, passer et renvoyer la valeur). Les noms sont cherchés dans l’ordre Local, Englobant, Global, puis Built-in.',
    },
  },
  {
    id: 'py-015',
    track: 'python',
    tier: 3,
    kind: 'code',
    concept: { en: 'Classes & dunder methods', fr: 'Classes et méthodes spéciales' },
    prompt: {
      en: 'Finish the Vector class: v1 + v2 must return a NEW Vector with summed coordinates, and repr(Vector(1, 2)) must return "Vector(1, 2)".',
      fr: 'Termine la classe Vector : v1 + v2 doit renvoyer un NOUVEAU Vector aux coordonnées additionnées, et repr(Vector(1, 2)) doit renvoyer "Vector(1, 2)".',
    },
    language: 'python',
    starter: `class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        # TODO: return a new Vector whose x and y are the sums
        pass

    def __repr__(self):
        # TODO: return a string like "Vector(1, 2)"
        pass`,
    tests: `v = Vector(1, 2) + Vector(3, 4)
assert_equal(isinstance(v, Vector), True, "+ returns a Vector")
assert_equal(v.x, 4, "x is summed")
assert_equal(v.y, 6, "y is summed")
assert_equal(repr(Vector(1, 2)), "Vector(1, 2)", "repr")
assert_equal(str(Vector(0, -5)), "Vector(0, -5)", "str falls back to __repr__")`,
    solution: `class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"`,
    hint: {
      en: 'Inside a method, self is the left operand and other is the right one. An f-string makes the repr easy.',
      fr: 'Dans une méthode, self est l’opérande de gauche et other celui de droite. Une f-string simplifie le repr.',
    },
    explanation: {
      en: 'Dunder ("double underscore") methods let your objects plug into Python syntax: a + b calls a.__add__(b), and repr()/print use __repr__ (str() falls back to it when __str__ is missing). self is the instance the method is called on.',
      fr: 'Les méthodes « dunder » (double underscore) permettent à tes objets de s’intégrer à la syntaxe de Python : a + b appelle a.__add__(b), et repr()/print utilisent __repr__ (str() s’y replie quand __str__ est absent). self est l’instance sur laquelle la méthode est appelée.',
    },
  },
  {
    id: 'py-016',
    track: 'python',
    tier: 3,
    kind: 'riddle',
    concept: { en: 'Virtual environments', fr: 'Environnements virtuels' },
    prompt: {
      en: 'I am a bubble around your project:\nmy own python, my own pip.\nWhat you install while I am active\nnever leaks into the system.\nA single "python -m" command brings me to life.\nWhat am I?',
      fr: 'Je suis une bulle autour de ton projet :\nmon propre python, mon propre pip.\nCe que tu installes quand je suis activé\nne fuit jamais dans le système.\nUne simple commande « python -m » me donne vie.\nQui suis-je ?',
    },
    accepted: ['venv', '.venv', 'virtualenv', 'virtual environment', 'virtual env', 'environnement virtuel', 'env virtuel'],
    hint: {
      en: 'Its folder is very often named .venv at the root of a project.',
      fr: 'Son dossier s’appelle très souvent .venv, à la racine du projet.',
    },
    explanation: {
      en: 'python -m venv .venv creates an isolated environment; once activated, pip install puts packages there instead of in the global interpreter. Each project gets its own dependency versions, usually recorded in requirements.txt or pyproject.toml.',
      fr: 'python -m venv .venv crée un environnement isolé ; une fois activé, pip install y place les paquets au lieu de l’interpréteur global. Chaque projet a ainsi ses propres versions de dépendances, généralement notées dans requirements.txt ou pyproject.toml.',
    },
  },
  {
    id: 'py-017',
    track: 'python',
    tier: 3,
    kind: 'fill',
    concept: { en: 'Exceptions', fr: 'Exceptions' },
    prompt: {
      en: 'Complete the code: catch the conversion error, and run a final message no matter what.',
      fr: 'Complète le code : intercepte l’erreur de conversion, et affiche un dernier message quoi qu’il arrive.',
    },
    template: `try:
    number = int("abc")
___ ValueError:
    print("Not a number!")
___:
    print("Always runs")`,
    blanks: [['except'], ['finally']],
    hint: {
      en: 'The first keyword catches a specific error type; the second one names a block that runs whether or not an error occurred.',
      fr: 'Le premier mot-clé intercepte un type d’erreur précis ; le second désigne un bloc exécuté qu’il y ait eu une erreur ou non.',
    },
    explanation: {
      en: 'except ValueError catches only that error type, so unrelated bugs still surface. finally always runs, even after a return or an uncaught exception, which makes it the place for cleanup. There is also else, which runs only when no exception occurred.',
      fr: 'except ValueError n’intercepte que ce type d’erreur, si bien que les autres bugs restent visibles. finally s’exécute toujours, même après un return ou une exception non interceptée : c’est l’endroit idéal pour le nettoyage. Il existe aussi else, exécuté seulement si aucune exception n’a eu lieu.',
    },
  },

  // ───────────────────────────── Tier 4 — Expert ─────────────────────────────
  {
    id: 'py-018',
    track: 'python',
    tier: 4,
    kind: 'output',
    concept: { en: 'Generators & iterators', fr: 'Générateurs et itérateurs' },
    prompt: {
      en: 'What does this program print?',
      fr: 'Qu’affiche ce programme ?',
    },
    code: `def countdown(n):
    while n > 0:
        yield n
        n -= 1

gen = countdown(3)
print(next(gen))
print(list(gen))`,
    codeLang: 'python',
    accepted: ['3\n[2, 1]'],
    hint: {
      en: 'A generator remembers where it paused. Values already consumed by next() do not come back.',
      fr: 'Un générateur se souvient de l’endroit où il s’est arrêté. Les valeurs déjà consommées par next() ne reviennent pas.',
    },
    explanation: {
      en: 'Calling a function containing yield returns a generator, a lazy iterator. next() runs it until the next yield; list() then consumes what is left. Once exhausted, a generator stays empty: it cannot be rewound.',
      fr: 'Appeler une fonction contenant yield renvoie un générateur, un itérateur paresseux. next() l’exécute jusqu’au prochain yield ; list() consomme ensuite ce qui reste. Une fois épuisé, un générateur reste vide : on ne peut pas le rembobiner.',
    },
  },
  {
    id: 'py-019',
    track: 'python',
    tier: 4,
    kind: 'code',
    concept: { en: 'Decorators & *args/**kwargs', fr: 'Décorateurs et *args/**kwargs' },
    prompt: {
      en: 'Write the decorator shout(func): it returns a wrapper that accepts any positional and keyword arguments, calls func with them, and returns the result in UPPERCASE.',
      fr: 'Écris le décorateur shout(func) : il renvoie une fonction wrapper qui accepte n’importe quels arguments positionnels et nommés, appelle func avec eux, et renvoie le résultat en MAJUSCULES.',
    },
    language: 'python',
    starter: `def shout(func):
    # TODO: define wrapper(*args, **kwargs) that calls func
    # with the same arguments and returns the result in uppercase,
    # then return wrapper
    pass`,
    tests: `@shout
def greet(name, punctuation="!"):
    return f"hello, {name}{punctuation}"

@shout
def motto():
    return "never stop learning"

assert_equal(greet("ada"), "HELLO, ADA!", "positional argument")
assert_equal(greet("bob", punctuation="?"), "HELLO, BOB?", "keyword argument")
assert_equal(greet(name="eve"), "HELLO, EVE!", "keyword-only call")
assert_equal(motto(), "NEVER STOP LEARNING", "no arguments")`,
    solution: `import functools

def shout(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs).upper()
    return wrapper`,
    hint: {
      en: '*args collects extra positional arguments into a tuple and **kwargs collects keyword arguments into a dict; use the same stars to pass them on.',
      fr: '*args regroupe les arguments positionnels dans un tuple et **kwargs les arguments nommés dans un dict ; utilise les mêmes étoiles pour les retransmettre.',
    },
    explanation: {
      en: '@shout above def greet is shorthand for greet = shout(greet): the decorator receives a function and returns a new one. *args/**kwargs let the wrapper forward any signature untouched, and functools.wraps copies the original name and docstring.',
      fr: '@shout au-dessus de def greet est un raccourci pour greet = shout(greet) : le décorateur reçoit une fonction et en renvoie une nouvelle. *args/**kwargs permettent au wrapper de retransmettre n’importe quelle signature, et functools.wraps recopie le nom et la docstring d’origine.',
    },
  },
  {
    id: 'py-020',
    track: 'python',
    tier: 4,
    kind: 'order',
    concept: { en: 'Context managers', fr: 'Gestionnaires de contexte' },
    prompt: {
      en: 'Order the lines to build a context manager: with tag("b"): print("hi") must print <b>, then hi, then </b>.',
      fr: 'Remets les lignes dans l’ordre pour créer un gestionnaire de contexte : with tag("b"): print("hi") doit afficher <b>, puis hi, puis </b>.',
    },
    lines: [
      'from contextlib import contextmanager',
      '@contextmanager',
      'def tag(name):',
      '    print(f"<{name}>")',
      '    yield',
      '    print(f"</{name}>")',
    ],
    hint: {
      en: 'The body of the with block runs exactly where the generator pauses.',
      fr: 'Le corps du bloc with s’exécute exactement là où le générateur fait une pause.',
    },
    explanation: {
      en: 'With @contextmanager, the code before yield is the setup (__enter__) and the code after it is the teardown (__exit__). The with statement guarantees the teardown runs, which is why files are opened with with open(...).',
      fr: 'Avec @contextmanager, le code avant yield sert de préparation (__enter__) et le code après sert de nettoyage (__exit__). L’instruction with garantit l’exécution du nettoyage : c’est pour cela qu’on ouvre les fichiers avec with open(...).',
    },
  },
  {
    id: 'py-021',
    track: 'python',
    tier: 4,
    kind: 'riddle',
    concept: { en: 'The GIL & asyncio', fr: 'Le GIL et asyncio' },
    prompt: {
      en: 'Inside CPython I hold a single key:\nonly one thread runs bytecode at a time through me.\nFor heavy maths, spawn processes instead;\nfor waiting on the network, asyncio is ahead.\nWhat am I? (an acronym or its full name)',
      fr: 'Dans CPython, je garde une seule clé :\nun seul thread exécute du bytecode à la fois grâce à moi.\nPour les gros calculs, lance plutôt des processus ;\npour attendre le réseau, asyncio fait l’affaire.\nQui suis-je ? (un sigle ou son nom complet)',
    },
    accepted: [
      'gil',
      'global interpreter lock',
      'python gil',
      'verrou global',
      "verrou global de l'interpreteur",
      "verrou global d'interpreteur",
    ],
    hint: {
      en: 'Three letters; the last one stands for "Lock".',
      fr: 'Trois lettres ; la dernière signifie « Lock » (verrou).',
    },
    explanation: {
      en: 'The Global Interpreter Lock lets only one thread execute Python bytecode at a time, so threads do not speed up CPU-bound work: use multiprocessing for that. For I/O-bound work, threads or asyncio (async def / await on an event loop) still shine, because waiting releases control.',
      fr: 'Le Global Interpreter Lock ne laisse qu’un seul thread exécuter du bytecode Python à la fois : les threads n’accélèrent donc pas les calculs intensifs, pour lesquels on utilise multiprocessing. Pour les tâches limitées par les E/S, les threads ou asyncio (async def / await sur une boucle d’événements) restent efficaces, car l’attente rend la main.',
    },
  },
  {
    id: 'py-022',
    track: 'python',
    tier: 4,
    kind: 'mcq',
    concept: { en: 'is vs ==', fr: 'is contre ==' },
    prompt: {
      en: 'What does this program print?',
      fr: 'Qu’affiche ce programme ?',
    },
    code: `a = [1, 2, 3]
b = a
c = [1, 2, 3]
print(a == c, a is c, a is b)`,
    codeLang: 'python',
    options: [
      { en: 'True False True', fr: 'True False True' },
      { en: 'True True True', fr: 'True True True' },
      { en: 'False False True', fr: 'False False True' },
      { en: 'True False False', fr: 'True False False' },
    ],
    answer: 0,
    hint: {
      en: 'One operator compares contents, the other asks: "is this the very same object in memory?"',
      fr: 'Un opérateur compare les contenus, l’autre demande : « est-ce exactement le même objet en mémoire ? »',
    },
    explanation: {
      en: '== compares values (it calls __eq__), while is compares identity. c is an equal but distinct list; b = a copies no data, it binds a second name to the same object. Use is only for singletons such as None: if x is None.',
      fr: '== compare les valeurs (il appelle __eq__), tandis que is compare l’identité. c est une liste égale mais distincte ; b = a ne copie rien, il lie un second nom au même objet. N’utilise is que pour des singletons comme None : if x is None.',
    },
  },
];
