import type { Challenge } from '../types';

export const challenges: Challenge[] = [
  // ───────────────────────────── Tier 1 — Novice ─────────────────────────────
  {
    id: 'java-001',
    track: 'java',
    tier: 1,
    kind: 'mcq',
    concept: { en: 'JDK, JRE & JVM', fr: 'JDK, JRE et JVM' },
    prompt: {
      en: 'You want to COMPILE Hello.java into bytecode with javac. What must be installed?',
      fr: 'Tu veux COMPILER Hello.java en bytecode avec javac. Que faut-il installer ?',
    },
    options: [
      { en: 'The JVM alone', fr: 'La JVM seule' },
      { en: 'The JRE alone', fr: 'Le JRE seul' },
      { en: 'The JDK', fr: 'Le JDK' },
      { en: 'A web browser', fr: 'Un navigateur web' },
    ],
    answer: 2,
    hint: {
      en: 'Which of the three is the "Development Kit"?',
      fr: 'Lequel des trois est le « Development Kit » (kit de développement) ?',
    },
    explanation: {
      en: 'The JVM executes bytecode, the JRE is the JVM plus the standard libraries needed to run programs, and the JDK adds developer tools such as the javac compiler. javac turns .java source into .class bytecode that any JVM can run.',
      fr: 'La JVM exécute le bytecode, le JRE regroupe la JVM et les bibliothèques standard nécessaires pour lancer un programme, et le JDK y ajoute les outils de développement comme le compilateur javac. javac transforme le source .java en bytecode .class exécutable par n’importe quelle JVM.',
    },
  },
  {
    id: 'java-002',
    track: 'java',
    tier: 1,
    kind: 'fill',
    concept: { en: 'The main method', fr: 'La méthode main' },
    prompt: {
      en: 'Complete the entry point so the JVM can launch this program.',
      fr: 'Complète le point d’entrée pour que la JVM puisse lancer ce programme.',
    },
    template: `public class Hello {
    public ___ void main(___[] args) {
        System.out.println("Hello, JVM!");
    }
}`,
    blanks: [['static'], ['String']],
    hint: {
      en: 'The JVM calls main without creating an object first, and passes the command-line arguments as text.',
      fr: 'La JVM appelle main sans créer d’objet au préalable, et lui transmet les arguments de la ligne de commande sous forme de texte.',
    },
    explanation: {
      en: 'main must be static because the JVM calls it on the class itself, before any instance exists. Its parameter String[] args receives the command-line arguments. Java is case-sensitive: string or Static would not compile.',
      fr: 'main doit être static car la JVM l’appelle sur la classe elle-même, avant qu’aucune instance n’existe. Son paramètre String[] args reçoit les arguments de la ligne de commande. Java est sensible à la casse : string ou Static ne compileraient pas.',
    },
  },
  {
    id: 'java-003',
    track: 'java',
    tier: 1,
    kind: 'output',
    concept: { en: 'Integer division', fr: 'Division entière' },
    prompt: {
      en: 'What does this code print?',
      fr: 'Qu’affiche ce code ?',
    },
    code: `System.out.println(7 / 2);
System.out.println(7 / 2.0);
System.out.println(7 % 2);`,
    codeLang: 'java',
    accepted: ['3\n3.5\n1'],
    hint: {
      en: 'Look at the types of the operands: int with int, or int with double?',
      fr: 'Regarde le type des opérandes : int avec int, ou int avec double ?',
    },
    explanation: {
      en: 'When both operands are int, / performs integer division and drops the decimal part. As soon as one operand is a double (2.0), the other is promoted and the result is a double. % returns the remainder.',
      fr: 'Quand les deux opérandes sont des int, / effectue une division entière et supprime la partie décimale. Dès qu’un opérande est un double (2.0), l’autre est promu et le résultat est un double. % renvoie le reste.',
    },
  },
  {
    id: 'java-004',
    track: 'java',
    tier: 1,
    kind: 'riddle',
    concept: { en: 'The JVM', fr: 'La JVM' },
    prompt: {
      en: 'I never read your .java files,\nonly the bytecode javac compiles.\nOn Windows, Linux or Mac I stand,\nso you "write once, run anywhere" as planned.\nWhat am I?',
      fr: 'Je ne lis jamais tes fichiers .java,\nseulement le bytecode que javac compila.\nSur Windows, Linux ou Mac je me dresse,\npour « écrire une fois, exécuter partout » : c’est ma promesse.\nQui suis-je ?',
    },
    accepted: ['jvm', 'java virtual machine', 'machine virtuelle java', 'machine virtuelle'],
    hint: {
      en: 'Three letters: Java ... Machine.',
      fr: 'Trois lettres : Java ... Machine.',
    },
    explanation: {
      en: 'The Java Virtual Machine loads .class bytecode and runs it, interpreting it and JIT-compiling hot code to native instructions. Since every platform has its own JVM, the same bytecode runs everywhere.',
      fr: 'La Java Virtual Machine charge le bytecode .class et l’exécute, en l’interprétant puis en compilant à la volée (JIT) le code le plus utilisé en instructions natives. Comme chaque plateforme a sa propre JVM, le même bytecode tourne partout.',
    },
  },
  {
    id: 'java-005',
    track: 'java',
    tier: 1,
    kind: 'mcq',
    concept: { en: 'Primitives vs wrappers', fr: 'Primitifs et wrappers' },
    prompt: {
      en: 'Which of these is NOT a primitive type in Java?',
      fr: 'Lequel de ces types n’est PAS un type primitif en Java ?',
    },
    options: [
      { en: 'int', fr: 'int' },
      { en: 'boolean', fr: 'boolean' },
      { en: 'double', fr: 'double' },
      { en: 'Integer', fr: 'Integer' },
    ],
    answer: 3,
    hint: {
      en: 'Primitive type names are all lowercase.',
      fr: 'Les noms des types primitifs sont tous en minuscules.',
    },
    explanation: {
      en: 'Java has 8 primitives (byte, short, int, long, float, double, char, boolean) that hold raw values. Integer is a wrapper class: an object that can be null and can be stored in collections like List<Integer>. Java converts between them automatically (autoboxing).',
      fr: 'Java possède 8 types primitifs (byte, short, int, long, float, double, char, boolean) qui contiennent des valeurs brutes. Integer est une classe wrapper : un objet qui peut valoir null et qu’on peut ranger dans des collections comme List<Integer>. Java convertit automatiquement de l’un à l’autre (autoboxing).',
    },
  },
  {
    id: 'java-006',
    track: 'java',
    tier: 1,
    kind: 'bug',
    concept: { en: 'Conditions', fr: 'Conditions' },
    prompt: {
      en: 'This snippet should print "five" when x equals 5, but it does not compile. Click the faulty line.',
      fr: 'Ce code devrait afficher « five » quand x vaut 5, mais il ne compile pas. Clique sur la ligne fautive.',
    },
    lines: [
      'int x = 5;',
      'if (x = 5) {',
      '    System.out.println("five");',
      '}',
    ],
    bugLine: 1,
    hint: {
      en: 'There are two different operators that look alike: one assigns, one compares.',
      fr: 'Deux opérateurs se ressemblent : l’un affecte, l’autre compare.',
    },
    explanation: {
      en: 'x = 5 is an assignment whose value is an int, and an if condition must be a boolean, so javac rejects it. The comparison operator is ==. Static typing catches this classic mistake at compile time.',
      fr: 'x = 5 est une affectation dont la valeur est un int, or la condition d’un if doit être un boolean : javac la refuse. L’opérateur de comparaison est ==. Le typage statique détecte cette erreur classique dès la compilation.',
    },
  },

  // ─────────────────────────── Tier 2 — Apprentice ───────────────────────────
  {
    id: 'java-007',
    track: 'java',
    tier: 2,
    kind: 'output',
    concept: { en: 'String immutability', fr: 'Immuabilité des String' },
    prompt: {
      en: 'What does this code print?',
      fr: 'Qu’affiche ce code ?',
    },
    code: `String s = "hello";
s.toUpperCase();
System.out.println(s);
s = s.toUpperCase();
System.out.println(s);`,
    codeLang: 'java',
    accepted: ['hello\nHELLO'],
    hint: {
      en: 'Does toUpperCase() change the string it is called on, or give you something back?',
      fr: 'toUpperCase() modifie-t-elle la chaîne sur laquelle on l’appelle, ou renvoie-t-elle quelque chose ?',
    },
    explanation: {
      en: 'Strings are immutable: methods like toUpperCase() return a NEW String and leave the original untouched. The first call’s result is thrown away; only reassigning s keeps it. To build text in a loop, use StringBuilder.',
      fr: 'Les String sont immuables : des méthodes comme toUpperCase() renvoient une NOUVELLE String et laissent l’originale intacte. Le résultat du premier appel est perdu ; seule la réaffectation de s le conserve. Pour construire du texte dans une boucle, utilise StringBuilder.',
    },
  },
  {
    id: 'java-008',
    track: 'java',
    tier: 2,
    kind: 'mcq',
    concept: { en: 'equals vs ==', fr: 'equals contre ==' },
    prompt: {
      en: 'What do the two comparisons evaluate to?',
      fr: 'Que valent les deux comparaisons ?',
    },
    code: `String a = new String("hi");
String b = new String("hi");
boolean first = (a == b);
boolean second = a.equals(b);`,
    codeLang: 'java',
    options: [
      { en: 'first = true, second = true', fr: 'first = true, second = true' },
      { en: 'first = false, second = true', fr: 'first = false, second = true' },
      { en: 'first = true, second = false', fr: 'first = true, second = false' },
      { en: 'first = false, second = false', fr: 'first = false, second = false' },
    ],
    answer: 1,
    hint: {
      en: 'new always creates a distinct object. Which operator looks at the characters?',
      fr: 'new crée toujours un objet distinct. Quel opérateur regarde les caractères ?',
    },
    explanation: {
      en: 'For objects, == compares references (are they the same object?), while equals() compares contents. Two new String objects are different objects with the same characters. Always compare strings with equals().',
      fr: 'Pour les objets, == compare les références (est-ce le même objet ?), tandis que equals() compare les contenus. Deux objets créés avec new String sont distincts mais ont les mêmes caractères. Compare toujours les chaînes avec equals().',
    },
  },
  {
    id: 'java-009',
    track: 'java',
    tier: 2,
    kind: 'order',
    concept: { en: 'while loops', fr: 'Boucles while' },
    prompt: {
      en: 'Order the lines so the program prints 0, 1 and 2 (one per line).',
      fr: 'Remets les lignes dans l’ordre pour que le programme affiche 0, 1 et 2 (un par ligne).',
    },
    lines: [
      'int i = 0;',
      'while (i < 3) {',
      '    System.out.println(i);',
      '    i++;',
      '}',
    ],
    hint: {
      en: 'Should the counter be printed before or after it is incremented, given that the first number shown is 0?',
      fr: 'Faut-il afficher le compteur avant ou après l’avoir incrémenté, sachant que le premier nombre affiché est 0 ?',
    },
    explanation: {
      en: 'A while loop needs three things: an initialised variable, a condition checked before each pass, and an update inside the body. Printing before i++ shows 0, 1, 2; forgetting i++ would loop forever.',
      fr: 'Une boucle while a besoin de trois choses : une variable initialisée, une condition vérifiée avant chaque tour et une mise à jour dans le corps. Afficher avant i++ donne 0, 1, 2 ; oublier i++ créerait une boucle infinie.',
    },
  },
  {
    id: 'java-010',
    track: 'java',
    tier: 2,
    kind: 'riddle',
    concept: { en: 'Encapsulation', fr: 'Encapsulation' },
    prompt: {
      en: 'I hide my fields behind private walls;\ngetters and setters answer the calls.\nNo one outside may break my rules:\nI am one of the four OOP pillars. Who am I?',
      fr: 'Je cache mes champs derrière des murs private ;\ngetters et setters répondent quand on frappe.\nNul ne peut, du dehors, briser mes règles :\nje suis l’un des quatre piliers de la POO. Qui suis-je ?',
    },
    accepted: ['encapsulation'],
    hint: {
      en: 'Think of a capsule protecting what is inside.',
      fr: 'Pense à une capsule qui protège ce qu’elle contient.',
    },
    explanation: {
      en: 'Encapsulation keeps fields private and exposes controlled methods, so an object can validate changes and keep its state consistent. Java access modifiers go from private (class only) to package-private (default), protected (package + subclasses) and public.',
      fr: 'L’encapsulation garde les champs private et expose des méthodes contrôlées, afin que l’objet puisse valider les modifications et rester cohérent. Les modificateurs d’accès Java vont de private (la classe seule) à package-private (par défaut), protected (paquetage + sous-classes) et public.',
    },
  },
  {
    id: 'java-011',
    track: 'java',
    tier: 2,
    kind: 'fill',
    concept: { en: 'Constructors & this', fr: 'Constructeurs et this' },
    prompt: {
      en: 'Complete the constructor so new Dog("Rex") stores "Rex" in the name field.',
      fr: 'Complète le constructeur pour que new Dog("Rex") enregistre "Rex" dans le champ name.',
    },
    template: `public class Dog {
    private String name;

    public ___(String name) {
        ___.name = name;
    }
}`,
    blanks: [['Dog'], ['this']],
    hint: {
      en: 'A constructor has no return type and a very specific name. The field and the parameter share a name, so you need a way to say "this object’s field".',
      fr: 'Un constructeur n’a pas de type de retour et porte un nom bien précis. Le champ et le paramètre ont le même nom : il faut pouvoir dire « le champ de cet objet ».',
    },
    explanation: {
      en: 'A constructor is named exactly like its class and has no return type; it runs when you call new. Inside it, the parameter name shadows the field, so this.name refers to the field of the object being built.',
      fr: 'Un constructeur porte exactement le nom de sa classe et n’a pas de type de retour ; il s’exécute lors d’un appel à new. À l’intérieur, le paramètre name masque le champ : this.name désigne donc le champ de l’objet en construction.',
    },
  },
  {
    id: 'java-012',
    track: 'java',
    tier: 2,
    kind: 'output',
    concept: { en: 'Arrays', fr: 'Tableaux' },
    prompt: {
      en: 'What does this code print?',
      fr: 'Qu’affiche ce code ?',
    },
    code: `int[] a = new int[3];
a[0] = 5;
System.out.println(a.length + " " + a[0] + " " + a[2]);`,
    codeLang: 'java',
    accepted: ['3 5 0'],
    hint: {
      en: 'What value does Java put in the slots of a new int array you never filled?',
      fr: 'Quelle valeur Java place-t-il dans les cases d’un nouveau tableau d’int jamais remplies ?',
    },
    explanation: {
      en: 'An array has a fixed length set at creation, read with .length (a field, not a method). New slots get default values: 0 for numbers, false for boolean, null for objects. Accessing a[3] here would throw ArrayIndexOutOfBoundsException.',
      fr: 'Un tableau a une taille fixe définie à sa création, lue avec .length (un champ, pas une méthode). Les nouvelles cases reçoivent une valeur par défaut : 0 pour les nombres, false pour les boolean, null pour les objets. Accéder à a[3] ici lèverait une ArrayIndexOutOfBoundsException.',
    },
  },

  // ───────────────────────────── Tier 3 — Adept ──────────────────────────────
  {
    id: 'java-013',
    track: 'java',
    tier: 3,
    kind: 'output',
    concept: { en: 'Polymorphism', fr: 'Polymorphisme' },
    prompt: {
      en: 'What does this code print?',
      fr: 'Qu’affiche ce code ?',
    },
    code: `class Animal {
    String sound() { return "..."; }
}
class Cat extends Animal {
    @Override
    String sound() { return "Meow"; }
}

Animal pet = new Cat();
System.out.println(pet.sound());`,
    codeLang: 'java',
    accepted: ['Meow'],
    hint: {
      en: 'The variable is declared as Animal, but what kind of object was actually created?',
      fr: 'La variable est déclarée comme Animal, mais quel objet a réellement été créé ?',
    },
    explanation: {
      en: 'Java uses dynamic dispatch: the overridden method of the actual runtime object (Cat) is called, not the one of the declared type (Animal). This is polymorphism, one interface with many behaviours. @Override asks the compiler to check that you really override a method.',
      fr: 'Java utilise la liaison dynamique : c’est la méthode redéfinie de l’objet réel à l’exécution (Cat) qui est appelée, et non celle du type déclaré (Animal). C’est le polymorphisme : une même interface, plusieurs comportements. @Override demande au compilateur de vérifier que tu redéfinis bien une méthode.',
    },
  },
  {
    id: 'java-014',
    track: 'java',
    tier: 3,
    kind: 'mcq',
    concept: { en: 'Checked vs unchecked', fr: 'Exceptions vérifiées ou non' },
    prompt: {
      en: 'Which exception is CHECKED, meaning the compiler forces you to catch it or declare it with throws?',
      fr: 'Quelle exception est VÉRIFIÉE (checked), c’est-à-dire que le compilateur t’oblige à l’intercepter ou à la déclarer avec throws ?',
    },
    options: [
      { en: 'IOException', fr: 'IOException' },
      { en: 'NullPointerException', fr: 'NullPointerException' },
      { en: 'ArithmeticException', fr: 'ArithmeticException' },
      { en: 'IllegalArgumentException', fr: 'IllegalArgumentException' },
    ],
    answer: 0,
    hint: {
      en: 'Three of these extend RuntimeException and usually signal a programming bug; one signals a problem with the outside world.',
      fr: 'Trois d’entre elles héritent de RuntimeException et signalent en général un bug de programmation ; une seule signale un problème venant du monde extérieur.',
    },
    explanation: {
      en: 'Checked exceptions (subclasses of Exception but not RuntimeException) represent recoverable external failures such as a missing file, so the compiler enforces try/catch or throws. Unchecked ones (RuntimeException) like NullPointerException usually reveal bugs and are not enforced.',
      fr: 'Les exceptions vérifiées (sous-classes de Exception mais pas de RuntimeException) représentent des échecs externes récupérables, comme un fichier absent : le compilateur impose try/catch ou throws. Les non vérifiées (RuntimeException), comme NullPointerException, révèlent généralement des bugs et ne sont pas imposées.',
    },
  },
  {
    id: 'java-015',
    track: 'java',
    tier: 3,
    kind: 'riddle',
    concept: { en: 'Interfaces', fr: 'Interfaces' },
    prompt: {
      en: 'I am a contract and nothing more:\nI name the methods, you write the core.\nA class may extend just one parent,\nbut implement as many of me as it wants.\nWhat am I?',
      fr: 'Je suis un contrat, rien de plus :\nje nomme les méthodes, à toi d’écrire le reste.\nUne classe n’étend qu’un seul parent,\nmais peut m’implémenter autant de fois qu’elle le veut.\nQui suis-je ?',
    },
    accepted: ['interface', 'interfaces', 'java interface'],
    hint: {
      en: 'Classes use the keyword implements to sign me.',
      fr: 'Les classes utilisent le mot-clé implements pour me signer.',
    },
    explanation: {
      en: 'An interface declares behaviour (method signatures, plus optional default methods) without instance state. A class can implement many interfaces but extend only one class, which is how Java offers flexible typing without multiple inheritance of state.',
      fr: 'Une interface déclare un comportement (des signatures de méthodes, plus d’éventuelles méthodes default) sans état d’instance. Une classe peut implémenter plusieurs interfaces mais n’étendre qu’une seule classe : c’est ainsi que Java offre un typage souple sans héritage multiple d’état.',
    },
  },
  {
    id: 'java-016',
    track: 'java',
    tier: 3,
    kind: 'bug',
    concept: { en: 'Abstract classes', fr: 'Classes abstraites' },
    prompt: {
      en: 'We want a shape whose area is 4.0, but this does not compile. Click the faulty line.',
      fr: 'On veut une forme dont l’aire vaut 4.0, mais ce code ne compile pas. Clique sur la ligne fautive.',
    },
    lines: [
      'abstract class Shape {',
      '    abstract double area();',
      '}',
      'class Square extends Shape {',
      '    double side = 2;',
      '    double area() { return side * side; }',
      '}',
      'Shape s = new Shape();',
    ],
    bugLine: 7,
    hint: {
      en: 'Can you build something whose blueprint is deliberately unfinished?',
      fr: 'Peut-on construire un objet dont le plan est volontairement inachevé ?',
    },
    explanation: {
      en: 'An abstract class cannot be instantiated: it may declare abstract methods with no body. You instantiate a concrete subclass instead and can still use the abstract type for the variable: Shape s = new Square();. Unlike an interface, an abstract class can hold fields and constructors.',
      fr: 'Une classe abstraite ne peut pas être instanciée : elle peut déclarer des méthodes abstraites sans corps. On instancie plutôt une sous-classe concrète, tout en gardant le type abstrait pour la variable : Shape s = new Square();. Contrairement à une interface, une classe abstraite peut avoir des champs et des constructeurs.',
    },
  },
  {
    id: 'java-017',
    track: 'java',
    tier: 3,
    kind: 'fill',
    concept: { en: 'Collections & generics', fr: 'Collections et génériques' },
    prompt: {
      en: 'Complete with the classic implementations: an array-backed resizable list, and a hash-table map.',
      fr: 'Complète avec les implémentations classiques : une liste redimensionnable basée sur un tableau, et une map basée sur une table de hachage.',
    },
    template: `List<String> names = new ___<>();
names.add("Ada");
Map<String, Integer> ages = new ___<>();
ages.put("Ada", 36);`,
    blanks: [['ArrayList'], ['HashMap']],
    hint: {
      en: 'Each implementation name combines its internal structure with the interface name.',
      fr: 'Le nom de chaque implémentation combine sa structure interne et le nom de l’interface.',
    },
    explanation: {
      en: 'ArrayList offers fast index access (backed by an array), while LinkedList only wins for frequent insertions at the ends. HashMap gives average O(1) lookups by key. The <> diamond lets the compiler infer the generic types from the declaration, so the compiler rejects names.add(42).',
      fr: 'ArrayList offre un accès rapide par indice (grâce à un tableau), alors que LinkedList n’est avantageuse que pour des insertions fréquentes aux extrémités. HashMap permet des recherches par clé en O(1) en moyenne. L’opérateur diamant <> laisse le compilateur déduire les types génériques de la déclaration : names.add(42) serait donc refusé.',
    },
  },

  // ───────────────────────────── Tier 4 — Expert ─────────────────────────────
  {
    id: 'java-018',
    track: 'java',
    tier: 4,
    kind: 'output',
    concept: { en: 'Lambdas & streams', fr: 'Lambdas et streams' },
    prompt: {
      en: 'What does this code print?',
      fr: 'Qu’affiche ce code ?',
    },
    code: `List<Integer> nums = List.of(1, 2, 3, 4, 5);
int result = nums.stream()
    .filter(n -> n % 2 == 1)
    .map(n -> n * n)
    .reduce(0, Integer::sum);
System.out.println(result);`,
    codeLang: 'java',
    accepted: ['35'],
    hint: {
      en: 'Follow the pipeline step by step: keep, transform, then combine.',
      fr: 'Suis le pipeline étape par étape : garder, transformer, puis combiner.',
    },
    explanation: {
      en: 'filter keeps the odd numbers 1, 3, 5; map squares them into 1, 9, 25; reduce adds them starting from 0, giving 35. Streams are lazy: nothing runs until a terminal operation such as reduce or collect, and the source list is never modified.',
      fr: 'filter garde les nombres impairs 1, 3, 5 ; map les élève au carré pour obtenir 1, 9, 25 ; reduce les additionne en partant de 0, ce qui donne 35. Les streams sont paresseux : rien ne s’exécute avant une opération terminale comme reduce ou collect, et la liste source n’est jamais modifiée.',
    },
  },
  {
    id: 'java-019',
    track: 'java',
    tier: 4,
    kind: 'output',
    concept: { en: 'Integer overflow', fr: 'Dépassement d’entier' },
    prompt: {
      en: 'What does this code print?',
      fr: 'Qu’affiche ce code ?',
    },
    code: `int max = Integer.MAX_VALUE;   // 2147483647
System.out.println(max + 1);`,
    codeLang: 'java',
    accepted: ['-2147483648'],
    hint: {
      en: 'An int is stored on 32 bits in two’s complement. Java does not throw on overflow.',
      fr: 'Un int est stocké sur 32 bits en complément à deux. Java ne lève pas d’erreur en cas de dépassement.',
    },
    explanation: {
      en: 'int arithmetic silently wraps around: MAX_VALUE + 1 becomes Integer.MIN_VALUE, -2147483648. Use long for bigger values, Math.addExact to get an ArithmeticException on overflow, or BigInteger for arbitrary precision.',
      fr: 'L’arithmétique sur les int boucle silencieusement : MAX_VALUE + 1 devient Integer.MIN_VALUE, soit -2147483648. Utilise long pour des valeurs plus grandes, Math.addExact pour obtenir une ArithmeticException en cas de dépassement, ou BigInteger pour une précision arbitraire.',
    },
  },
  {
    id: 'java-020',
    track: 'java',
    tier: 4,
    kind: 'riddle',
    concept: { en: 'Records', fr: 'Records' },
    prompt: {
      en: 'One line declares me, my fields are final;\nequals, hashCode and toString come free, no manual.\nSince Java 16 I carry plain data with grace:\nPoint(int x, int y) is my typical face.\nWhich kind of class am I?',
      fr: 'Une ligne me déclare, mes champs sont final ;\nequals, hashCode et toString sont offerts, sans effort manuel.\nDepuis Java 16, je transporte des données avec élégance :\nPoint(int x, int y) est ma forme par excellence.\nQuel genre de classe suis-je ?',
    },
    accepted: ['record', 'records', 'java record', 'record class', 'classe record', 'enregistrement'],
    hint: {
      en: 'Its keyword replaces class in the declaration.',
      fr: 'Son mot-clé remplace class dans la déclaration.',
    },
    explanation: {
      en: 'record Point(int x, int y) {} generates private final fields, a constructor, accessors x() and y(), plus equals, hashCode and toString. Records are immutable data carriers, ideal for DTOs and map keys.',
      fr: 'record Point(int x, int y) {} génère des champs private final, un constructeur, les accesseurs x() et y(), ainsi qu’equals, hashCode et toString. Les records sont des porteurs de données immuables, parfaits pour les DTO et les clés de map.',
    },
  },
  {
    id: 'java-021',
    track: 'java',
    tier: 4,
    kind: 'order',
    concept: { en: 'Maven lifecycle', fr: 'Cycle de vie Maven' },
    prompt: {
      en: 'Put the phases of the Maven default lifecycle in the order Maven runs them.',
      fr: 'Remets les phases du cycle de vie par défaut de Maven dans l’ordre où Maven les exécute.',
    },
    lines: ['validate', 'compile', 'test', 'package', 'verify', 'install', 'deploy'],
    hint: {
      en: 'You cannot test code that is not compiled, nor publish a JAR that does not exist yet. install copies to your local repository, deploy to a remote one.',
      fr: 'On ne peut pas tester du code non compilé, ni publier un JAR qui n’existe pas encore. install copie dans le dépôt local, deploy dans un dépôt distant.',
    },
    explanation: {
      en: 'Running a phase runs every earlier phase too: mvn package validates, compiles, tests, then builds the JAR. Maven (pom.xml) and Gradle (build.gradle) both manage dependencies and this build pipeline for you.',
      fr: 'Lancer une phase exécute aussi toutes les phases précédentes : mvn package valide, compile, teste, puis construit le JAR. Maven (pom.xml) et Gradle (build.gradle) gèrent tous deux les dépendances et cette chaîne de construction à ta place.',
    },
  },
  {
    id: 'java-022',
    track: 'java',
    tier: 4,
    kind: 'mcq',
    concept: { en: 'Optional & null safety', fr: 'Optional et null' },
    prompt: {
      en: 'findNickname("bob") returns null. What does this code print?',
      fr: 'findNickname("bob") renvoie null. Qu’affiche ce code ?',
    },
    code: `String nick = Optional.ofNullable(findNickname("bob"))
    .map(String::toUpperCase)
    .orElse("guest");
System.out.println(nick);`,
    codeLang: 'java',
    options: [
      { en: 'null', fr: 'null' },
      { en: 'It throws a NullPointerException', fr: 'Il lève une NullPointerException' },
      { en: 'guest', fr: 'guest' },
      { en: 'GUEST', fr: 'GUEST' },
    ],
    answer: 2,
    hint: {
      en: 'On an empty Optional, map is skipped entirely.',
      fr: 'Sur un Optional vide, map est entièrement ignoré.',
    },
    explanation: {
      en: 'ofNullable(null) gives an empty Optional, so map never calls toUpperCase and orElse returns the fallback unchanged: guest. Calling toUpperCase() directly on null would throw a NullPointerException; Optional makes "no value" explicit in the type.',
      fr: 'ofNullable(null) donne un Optional vide : map n’appelle jamais toUpperCase et orElse renvoie la valeur de repli telle quelle, guest. Appeler toUpperCase() directement sur null lèverait une NullPointerException ; Optional rend l’absence de valeur explicite dans le type.',
    },
  },
];
