# BitQuest — Cours accélérés

Chaque Terre possède un dojo à son entrée. Son maître propose un cours accéléré de cinq modules : quatre paliers de difficulté, puis un laboratoire du boss. Les exercices du dojo sont sans chronomètre, sans cœur perdu et sans point perdu ; on peut quitter et reprendre un module quand on veut. Le programme ci-dessous couvre **tous** les défis du cours, avec leurs identifiants, pour réviser hors du jeu.

**Comment suivre un cours :** lis le résumé et les résultats attendus, puis fais les modules dans l’ordre. Pour chaque module : lis l’objectif, réponds à tous les défis, lis chaque explication, puis note les concepts ratés dans ton Codex. Termine par le laboratoire du boss sans indice, puis affronte le vrai boss.

**Les huit types de défis :** choix multiple, texte à trous, remise en ordre, chasse au bug, commande, prédiction de sortie, énigme et code. Un cours accéléré terminé signifie que tu as rencontré chacun d’eux.

**Chronomètres en combat :** 45 s pour un monstre, 35 s pour une rune de boss, +5 s avec le Voleur. Le dojo, lui, n’a jamais de chronomètre.

| # | Cours | Dojo | Maître | Durée | Modules |
|---|---|---|---|---|---|
| 1 | JavaScript | Dojo de la Boucle d’Événements | Maître Eventloop | 3 à 4 heures | 5 |
| 2 | TypeScript | Dojo des Types Stricts | Maître Typeur | 3 à 4 heures | 5 |
| 3 | Java | Dojo du Tas | Maître Javalon | 4 à 5 heures | 5 |
| 4 | Node.js | Dojo du Serveur | Maître Callback | 4 à 5 heures | 5 |
| 5 | Python | Dojo du Serpent | Maître Indent | 3 à 4 heures | 5 |
| 6 | Git | Dojo des Trois Arbres | Maître Branche | 2 à 3 heures | 5 |
| 7 | GitHub | Dojo de la Pull Request | Maître Octo | 2 à 3 heures | 5 |
| 8 | Linux | Dojo du Noyau | Maître Shell | 3 à 4 heures | 5 |
| 9 | DevOps | Dojo du Pipeline | Maître Pipeline | 4 à 5 heures | 5 |
| 10 | AI | Dojo du Chemin Neural | Maître Gradient | 4 à 5 heures | 5 |

## JavaScript — Le Kraken des Callbacks

- **Dojo :** Dojo de la Boucle d’Événements
- **Maître :** Maître Eventloop
- **Durée :** 3 à 4 heures
- **Prérequis :** Aucun. C’est la meilleure première Terre.
- **Boss :** Le Kraken des Callbacks — Seigneur de la Pyramide Infernale

**Résumé :** Le langage du web : valeurs, fonctions, objets, asynchrone et environnement du navigateur — enseigné avec les huit types de défis que la Terre peut te lancer.

**Résultats attendus :**
- Lire et écrire de courts programmes JavaScript sans deviner ce qu’est une valeur.
- Utiliser fonctions, objets et tableaux avec aisance, et expliquer la portée et les closures.
- Gérer les promesses, async/await et les erreurs, et reconnaître les pièges classiques de JS.

**Méthodes de travail :**
- Tape chaque extrait toi-même au lieu de seulement le lire. Le clavier se souvient pour toi.
- Quand une prédiction est fausse, explique à voix haute la vraie sortie. C’est là que l’apprentissage se produit.
- Utilise la console du navigateur pour chaque défi « qu’affiche ce code ? » que tu rates deux fois.
- Tiens une liste des pièges : coercition, this, hissage, boucle d’événements. Relis-la avant le boss.

### Module 1 — Fondations

**Objectif :** Construire le modèle mental : le vocabulaire, la syntaxe et les petits programmes sur lesquels reposent tous les défis suivants.

**Concepts (6) :** let ou const · Types primitifs · Égalité stricte · Conversion implicite · Littéraux de gabarit · Boucle décalée de un

**Exercices (6) :**
- `js-001` — let ou const (choix multiple)
- `js-002` — Types primitifs (prédire la sortie)
- `js-003` — Égalité stricte (énigme)
- `js-004` — Conversion implicite (choix multiple)
- `js-005` — Littéraux de gabarit (texte à trous)
- `js-006` — Boucle décalée de un (chasse au bug)

**Méthode :** Dis chaque règle à voix haute avec tes propres mots, puis réponds aux défis. Si tu en rates un, relis l’explication deux fois avant de continuer.

### Module 2 — Réflexes du cœur

**Objectif :** Transformer les bases en réflexes fluides avec les structures de données, les fonctions et de courts programmes lisibles d’un coup d’œil.

**Concepts (6) :** Déstructuration et spread · filter et map · Objets par référence · Portée de bloc · Fonctions fléchées · Fonctions et boucles

**Exercices (6) :**
- `js-007` — Déstructuration et spread (texte à trous)
- `js-008` — filter et map (écrire du code)
- `js-009` — Objets par référence (prédire la sortie)
- `js-010` — Portée de bloc (choix multiple)
- `js-011` — Fonctions fléchées (énigme)
- `js-012` — Fonctions et boucles (remise en ordre)

**Méthode :** Prédis la sortie avant de valider. Écris le petit extrait sur papier si ça aide ; le but est un réflexe, pas un coup de chance.

### Module 3 — Mise en pratique

**Objectif :** Appliquer le langage à des problèmes réalistes : lire une erreur, choisir le bon outil et prédire ce que fait le code.

**Concepts (5) :** Fermetures · Remontée (hoisting) · Perte de this · Chaîne de prototypes · Classes

**Exercices (5) :**
- `js-013` — Fermetures (prédire la sortie)
- `js-014` — Remontée (hoisting) (choix multiple)
- `js-015` — Perte de this (chasse au bug)
- `js-016` — Chaîne de prototypes (énigme)
- `js-017` — Classes (écrire du code)

**Méthode :** Pour chaque défi, nomme d’abord le type (choix multiple, texte à trous, ordre, chasse au bug, commande, sortie, énigme ou code), puis résous-le.

### Module 4 — Pièges d’expert

**Objectif :** Gérer les pièges d’expert : cas limites, performance, sécurité et les traquenards qui séparent un script qui marche d’un code solide.

**Concepts (5) :** Boucle d'événements · Promesses · Erreurs avec async/await · Modules ES · Générateurs

**Exercices (5) :**
- `js-018` — Boucle d'événements (prédire la sortie)
- `js-019` — Promesses (texte à trous)
- `js-020` — Erreurs avec async/await (remise en ordre)
- `js-021` — Modules ES (choix multiple)
- `js-022` — Générateurs (écrire du code)

**Méthode :** Cherche le contre-exemple. Demande-toi « quand est-ce que ça casse ? » et note le cas limite qui te piège. Cette note est ton aide-mémoire.

### Module 5 — Laboratoire du boss

**Objectif :** Mélanger tous les types de défis sous une légère pression, réparer les points faibles, puis entrer dans le combat de boss prêt.

**Concepts (8) :** Boucle d'événements · Promesses · Erreurs avec async/await · Modules ES · Générateurs · Perte de this · Chaîne de prototypes · Fermetures

**Exercices (8) :**
- `js-018` — Boucle d'événements (prédire la sortie)
- `js-019` — Promesses (texte à trous)
- `js-020` — Erreurs avec async/await (remise en ordre)
- `js-021` — Modules ES (choix multiple)
- `js-022` — Générateurs (écrire du code)
- `js-015` — Perte de this (chasse au bug)
- `js-016` — Chaîne de prototypes (énigme)
- `js-013` — Fermetures (prédire la sortie)

**Méthode :** Enchaîne les défis d’une traite, sans indice, et note chaque erreur. Repasse cette liste avant de franchir la porte du boss.

### Examen blanc

Le laboratoire du boss mélange choix multiples, textes à trous, remises en ordre, chasses au bug, commandes, prédiction de sortie, énigmes et code. Termine-le sans indice, puis franchis la porte du boss : ses runes puisent dans le même vivier.

---

## TypeScript — Le Golem 'any'

- **Dojo :** Dojo des Types Stricts
- **Maître :** Maître Typeur
- **Durée :** 3 à 4 heures
- **Prérequis :** Les bases de JavaScript (Terre JS, ou un mois de pratique).
- **Boss :** Le Golem 'any' — Dévoreur de Types

**Résumé :** JavaScript plus un système de types : annoter, inférer, affiner et modéliser les données pour que le compilateur attrape les bugs avant l’exécution.

**Résultats attendus :**
- Annoter fonctions et objets sans tout transformer en any.
- Affiner les valeurs unknown en sécurité et concevoir des unions discriminées.
- Lire les erreurs du compilateur et utiliser les types utilitaires, mappés et conditionnels.

**Méthodes de travail :**
- Lis l’erreur de type de bas en haut : la dernière ligne nomme l’incompatibilité.
- Préfère l’inférence pour les locales et les annotations pour les frontières publiques.
- Quand tu es tenté par any, écris unknown et affine-le avec un garde.
- Retape à la main la solution du défi ; les types s’apprennent avec les doigts.

### Module 1 — Fondations

**Objectif :** Construire le modèle mental : le vocabulaire, la syntaxe et les petits programmes sur lesquels reposent tous les défis suivants.

**Concepts (6) :** Annotations de type · Types effacés · Signatures de fonction · Le type any · Inférence de type · Fonctions fléchées typées

**Exercices (6) :**
- `ts-001` — Annotations de type (choix multiple)
- `ts-002` — Types effacés (prédire la sortie)
- `ts-003` — Signatures de fonction (texte à trous)
- `ts-004` — Le type any (énigme)
- `ts-005` — Inférence de type (choix multiple)
- `ts-006` — Fonctions fléchées typées (remise en ordre)

**Méthode :** Dis chaque règle à voix haute avec tes propres mots, puis réponds aux défis. Si tu en rates un, relis l’explication deux fois avant de continuer.

### Module 2 — Réflexes du cœur

**Objectif :** Transformer les bases en réflexes fluides avec les structures de données, les fonctions et de courts programmes lisibles d’un coup d’œil.

**Concepts (6) :** Fonctions génériques · interface ou type · Unions de littéraux · readonly et optionnel · Enums numériques · Mode strict

**Exercices (6) :**
- `ts-007` — Fonctions génériques (écrire du code)
- `ts-008` — interface ou type (choix multiple)
- `ts-009` — Unions de littéraux (chasse au bug)
- `ts-010` — readonly et optionnel (texte à trous)
- `ts-011` — Enums numériques (prédire la sortie)
- `ts-012` — Mode strict (choix multiple)

**Méthode :** Prédis la sortie avant de valider. Écris le petit extrait sur papier si ça aide ; le but est un réflexe, pas un coup de chance.

### Module 3 — Mise en pratique

**Objectif :** Appliquer le langage à des problèmes réalistes : lire une erreur, choisir le bon outil et prédire ce que fait le code.

**Concepts (5) :** Affinage avec typeof · Le type unknown · Gardes de type · Types utilitaires · Génériques et Record

**Exercices (5) :**
- `ts-013` — Affinage avec typeof (prédire la sortie)
- `ts-014` — Le type unknown (énigme)
- `ts-015` — Gardes de type (écrire du code)
- `ts-016` — Types utilitaires (choix multiple)
- `ts-017` — Génériques et Record (remise en ordre)

**Méthode :** Pour chaque défi, nomme d’abord le type (choix multiple, texte à trous, ordre, chasse au bug, commande, sortie, énigme ou code), puis résous-le.

### Module 4 — Pièges d’expert

**Objectif :** Gérer les pièges d’expert : cas limites, performance, sécurité et les traquenards qui séparent un script qui marche d’un code solide.

**Concepts (5) :** L'opérateur satisfies · Le type never · Unions discriminées · keyof typeof · Types mappés et conditionnels

**Exercices (5) :**
- `ts-018` — L'opérateur satisfies (choix multiple)
- `ts-019` — Le type never (énigme)
- `ts-020` — Unions discriminées (écrire du code)
- `ts-021` — keyof typeof (chasse au bug)
- `ts-022` — Types mappés et conditionnels (texte à trous)

**Méthode :** Cherche le contre-exemple. Demande-toi « quand est-ce que ça casse ? » et note le cas limite qui te piège. Cette note est ton aide-mémoire.

### Module 5 — Laboratoire du boss

**Objectif :** Mélanger tous les types de défis sous une légère pression, réparer les points faibles, puis entrer dans le combat de boss prêt.

**Concepts (8) :** L'opérateur satisfies · Le type never · Unions discriminées · keyof typeof · Types mappés et conditionnels · Affinage avec typeof · Génériques et Record · Le type unknown

**Exercices (8) :**
- `ts-018` — L'opérateur satisfies (choix multiple)
- `ts-019` — Le type never (énigme)
- `ts-020` — Unions discriminées (écrire du code)
- `ts-021` — keyof typeof (chasse au bug)
- `ts-022` — Types mappés et conditionnels (texte à trous)
- `ts-013` — Affinage avec typeof (prédire la sortie)
- `ts-017` — Génériques et Record (remise en ordre)
- `ts-014` — Le type unknown (énigme)

**Méthode :** Enchaîne les défis d’une traite, sans indice, et note chaque erreur. Repasse cette liste avant de franchir la porte du boss.

### Examen blanc

Le laboratoire du boss mélange choix multiples, textes à trous, remises en ordre, chasses au bug, commandes, prédiction de sortie, énigmes et code. Termine-le sans indice, puis franchis la porte du boss : ses runes puisent dans le même vivier.

---

## Java — Le Spectre NullPointer

- **Dojo :** Dojo du Tas
- **Maître :** Maître Javalon
- **Durée :** 4 à 5 heures
- **Prérequis :** Des bases de programmation ; variables et boucles aident.
- **Boss :** Le Spectre NullPointer — Hanteur du Tas

**Résumé :** Un langage orienté objet et typé statiquement sur la JVM : classes, interfaces, collections, exceptions, streams et cycle de build.

**Résultats attendus :**
- Écrire des classes avec constructeurs, encapsulation et responsabilités claires.
- Choisir entre tableaux, collections, interfaces et classes abstraites.
- Gérer les exceptions vérifiées et non vérifiées et utiliser lambdas et streams.

**Méthodes de travail :**
- Écris le squelette de la classe avant le corps des méthodes ; Java récompense la structure.
- Dis « est-un » ou « a-un » avant de choisir héritage ou composition.
- Pour chaque défi sur les exceptions, demande : qui peut récupérer, et qui doit déclarer ?
- Compile mentalement : les types d’abord, la nullabilité ensuite, les effets de bord en dernier.

### Module 1 — Fondations

**Objectif :** Construire le modèle mental : le vocabulaire, la syntaxe et les petits programmes sur lesquels reposent tous les défis suivants.

**Concepts (6) :** JDK, JRE et JVM · La méthode main · Division entière · La JVM · Primitifs et wrappers · Conditions

**Exercices (6) :**
- `java-001` — JDK, JRE et JVM (choix multiple)
- `java-002` — La méthode main (texte à trous)
- `java-003` — Division entière (prédire la sortie)
- `java-004` — La JVM (énigme)
- `java-005` — Primitifs et wrappers (choix multiple)
- `java-006` — Conditions (chasse au bug)

**Méthode :** Dis chaque règle à voix haute avec tes propres mots, puis réponds aux défis. Si tu en rates un, relis l’explication deux fois avant de continuer.

### Module 2 — Réflexes du cœur

**Objectif :** Transformer les bases en réflexes fluides avec les structures de données, les fonctions et de courts programmes lisibles d’un coup d’œil.

**Concepts (6) :** Immuabilité des String · equals contre == · Boucles while · Encapsulation · Constructeurs et this · Tableaux

**Exercices (6) :**
- `java-007` — Immuabilité des String (prédire la sortie)
- `java-008` — equals contre == (choix multiple)
- `java-009` — Boucles while (remise en ordre)
- `java-010` — Encapsulation (énigme)
- `java-011` — Constructeurs et this (texte à trous)
- `java-012` — Tableaux (prédire la sortie)

**Méthode :** Prédis la sortie avant de valider. Écris le petit extrait sur papier si ça aide ; le but est un réflexe, pas un coup de chance.

### Module 3 — Mise en pratique

**Objectif :** Appliquer le langage à des problèmes réalistes : lire une erreur, choisir le bon outil et prédire ce que fait le code.

**Concepts (5) :** Polymorphisme · Exceptions vérifiées ou non · Interfaces · Classes abstraites · Collections et génériques

**Exercices (5) :**
- `java-013` — Polymorphisme (prédire la sortie)
- `java-014` — Exceptions vérifiées ou non (choix multiple)
- `java-015` — Interfaces (énigme)
- `java-016` — Classes abstraites (chasse au bug)
- `java-017` — Collections et génériques (texte à trous)

**Méthode :** Pour chaque défi, nomme d’abord le type (choix multiple, texte à trous, ordre, chasse au bug, commande, sortie, énigme ou code), puis résous-le.

### Module 4 — Pièges d’expert

**Objectif :** Gérer les pièges d’expert : cas limites, performance, sécurité et les traquenards qui séparent un script qui marche d’un code solide.

**Concepts (5) :** Lambdas et streams · Dépassement d’entier · Records · Cycle de vie Maven · Optional et null

**Exercices (5) :**
- `java-018` — Lambdas et streams (prédire la sortie)
- `java-019` — Dépassement d’entier (prédire la sortie)
- `java-020` — Records (énigme)
- `java-021` — Cycle de vie Maven (remise en ordre)
- `java-022` — Optional et null (choix multiple)

**Méthode :** Cherche le contre-exemple. Demande-toi « quand est-ce que ça casse ? » et note le cas limite qui te piège. Cette note est ton aide-mémoire.

### Module 5 — Laboratoire du boss

**Objectif :** Mélanger tous les types de défis sous une légère pression, réparer les points faibles, puis entrer dans le combat de boss prêt.

**Concepts (8) :** Lambdas et streams · Records · Cycle de vie Maven · Optional et null · Classes abstraites · Collections et génériques · Dépassement d’entier · Polymorphisme

**Exercices (8) :**
- `java-018` — Lambdas et streams (prédire la sortie)
- `java-020` — Records (énigme)
- `java-021` — Cycle de vie Maven (remise en ordre)
- `java-022` — Optional et null (choix multiple)
- `java-016` — Classes abstraites (chasse au bug)
- `java-017` — Collections et génériques (texte à trous)
- `java-019` — Dépassement d’entier (prédire la sortie)
- `java-013` — Polymorphisme (prédire la sortie)

**Méthode :** Enchaîne les défis d’une traite, sans indice, et note chaque erreur. Repasse cette liste avant de franchir la porte du boss.

### Examen blanc

Le laboratoire du boss mélange choix multiples, textes à trous, remises en ordre, chasses au bug, commandes, prédiction de sortie, énigmes et code. Termine-le sans indice, puis franchis la porte du boss : ses runes puisent dans le même vivier.

---

## Node.js — L'Hydre de la Boucle d'Événements

- **Dojo :** Dojo du Serveur
- **Maître :** Maître Callback
- **Durée :** 4 à 5 heures
- **Prérequis :** Les bases de JavaScript (Terre JS) et un terminal.
- **Boss :** L'Hydre de la Boucle d'Événements — Bloqueuse de Threads

**Résumé :** JavaScript côté serveur : modules, npm, fichiers, HTTP, Express, streams, boucle d’événements et sécurité en production.

**Résultats attendus :**
- Structurer un projet Node avec modules, scripts et dépendances.
- Servir du HTTP avec Express, middleware et gestion d’erreurs correcte.
- Utiliser fs, streams, Buffers et worker threads sans bloquer la boucle.

**Méthodes de travail :**
- Dessine la boucle d’événements avant tout défi asynchrone : timers, I/O, microtâches.
- Lance chaque défi de commande dans un dossier brouillon ; npm récompense la mémoire musculaire.
- Pour HTTP, suis une requête de bout en bout : socket, parseur, middleware, handler, réponse.
- Ne fais jamais confiance aux entrées : valide, échappe et paramètre avant de livrer.

### Module 1 — Fondations

**Objectif :** Construire le modèle mental : le vocabulaire, la syntaxe et les petits programmes sur lesquels reposent tous les défis suivants.

**Concepts (6) :** Qu'est-ce que Node.js · npm init · process.argv · package.json · Modules CommonJS · Configuration par l'environnement

**Exercices (6) :**
- `node-001` — Qu'est-ce que Node.js (choix multiple)
- `node-002` — npm init (commande)
- `node-003` — process.argv (prédire la sortie)
- `node-004` — package.json (énigme)
- `node-005` — Modules CommonJS (texte à trous)
- `node-006` — Configuration par l'environnement (écrire du code)

**Méthode :** Dis chaque règle à voix haute avec tes propres mots, puis réponds aux défis. Si tu en rates un, relis l’explication deux fois avant de continuer.

### Module 2 — Réflexes du cœur

**Objectif :** Transformer les bases en réflexes fluides avec les structures de données, les fonctions et de courts programmes lisibles d’un coup d’œil.

**Concepts (6) :** Versionnage sémantique · Dépendances de développement · Le module path · fs/promises et ESM · EventEmitter · Middleware Express

**Exercices (6) :**
- `node-007` — Versionnage sémantique (choix multiple)
- `node-008` — Dépendances de développement (commande)
- `node-009` — Le module path (prédire la sortie)
- `node-010` — fs/promises et ESM (texte à trous)
- `node-011` — EventEmitter (chasse au bug)
- `node-012` — Middleware Express (remise en ordre)

**Méthode :** Prédis la sortie avant de valider. Écris le petit extrait sur papier si ça aide ; le but est un réflexe, pas un coup de chance.

### Module 3 — Mise en pratique

**Objectif :** Appliquer le langage à des problèmes réalistes : lire une erreur, choisir le bon outil et prédire ce que fait le code.

**Concepts (5) :** Flux (streams) · Buffers et octets · Serveur HTTP · Chaîne de middlewares · Gestion d'erreurs Express

**Exercices (5) :**
- `node-013` — Flux (streams) (énigme)
- `node-014` — Buffers et octets (prédire la sortie)
- `node-015` — Serveur HTTP (remise en ordre)
- `node-016` — Chaîne de middlewares (écrire du code)
- `node-017` — Gestion d'erreurs Express (chasse au bug)

**Méthode :** Pour chaque défi, nomme d’abord le type (choix multiple, texte à trous, ordre, chasse au bug, commande, sortie, énigme ou code), puis résous-le.

### Module 4 — Pièges d’expert

**Objectif :** Gérer les pièges d’expert : cas limites, performance, sécurité et les traquenards qui séparent un script qui marche d’un code solide.

**Concepts (5) :** Phases de la boucle d'événements · Worker threads · Échapper le HTML (XSS) · Rejets non gérés · Injection SQL

**Exercices (5) :**
- `node-018` — Phases de la boucle d'événements (prédire la sortie)
- `node-019` — Worker threads (énigme)
- `node-020` — Échapper le HTML (XSS) (écrire du code)
- `node-021` — Rejets non gérés (texte à trous)
- `node-022` — Injection SQL (choix multiple)

**Méthode :** Cherche le contre-exemple. Demande-toi « quand est-ce que ça casse ? » et note le cas limite qui te piège. Cette note est ton aide-mémoire.

### Module 5 — Laboratoire du boss

**Objectif :** Mélanger tous les types de défis sous une légère pression, réparer les points faibles, puis entrer dans le combat de boss prêt.

**Concepts (8) :** Phases de la boucle d'événements · Worker threads · Échapper le HTML (XSS) · Rejets non gérés · Injection SQL · Serveur HTTP · Gestion d'erreurs Express · Dépendances de développement

**Exercices (8) :**
- `node-018` — Phases de la boucle d'événements (prédire la sortie)
- `node-019` — Worker threads (énigme)
- `node-020` — Échapper le HTML (XSS) (écrire du code)
- `node-021` — Rejets non gérés (texte à trous)
- `node-022` — Injection SQL (choix multiple)
- `node-015` — Serveur HTTP (remise en ordre)
- `node-017` — Gestion d'erreurs Express (chasse au bug)
- `node-008` — Dépendances de développement (commande)

**Méthode :** Enchaîne les défis d’une traite, sans indice, et note chaque erreur. Repasse cette liste avant de franchir la porte du boss.

### Examen blanc

Le laboratoire du boss mélange choix multiples, textes à trous, remises en ordre, chasses au bug, commandes, prédiction de sortie, énigmes et code. Termine-le sans indice, puis franchis la porte du boss : ses runes puisent dans le même vivier.

---

## Python — Le Serpent de l'Indentation

- **Dojo :** Dojo du Serpent
- **Maître :** Maître Indent
- **Durée :** 3 à 4 heures
- **Prérequis :** Aucun. Python est un premier langage tout doux.
- **Boss :** Le Serpent de l'Indentation — Mélangeur de Tabs et d’Espaces

**Résumé :** Lisible, puissant, partout : types, conteneurs, fonctions, classes, exceptions, générateurs et bibliothèque standard.

**Résultats attendus :**
- Utiliser listes, dictionnaires, ensembles et compréhensions pour transformer des données.
- Écrire fonctions et classes avec arguments, portée et méthodes dunder clairs.
- Gérer erreurs, fichiers, générateurs, décorateurs et gestionnaires de contexte.

**Méthodes de travail :**
- Indente délibérément : quatre espaces, un bloc à la fois, avant d’écrire le corps.
- Dans le REPL, teste une expression par ligne ; Python s’explique quand on lui demande.
- Pour les défauts mutables et la portée, dessine les boîtes : nom → objet → valeur.
- Lis la trace d’appels par le bas : type d’exception, message, puis la ligne.

### Module 1 — Fondations

**Objectif :** Construire le modèle mental : le vocabulaire, la syntaxe et les petits programmes sur lesquels reposent tous les défis suivants.

**Concepts (6) :** Typage dynamique · Nombres et conversions · f-strings · Booléens · Fonctions et return · input() renvoie du texte

**Exercices (6) :**
- `py-001` — Typage dynamique (choix multiple)
- `py-002` — Nombres et conversions (prédire la sortie)
- `py-003` — f-strings (texte à trous)
- `py-004` — Booléens (énigme)
- `py-005` — Fonctions et return (écrire du code)
- `py-006` — input() renvoie du texte (choix multiple)

**Méthode :** Dis chaque règle à voix haute avec tes propres mots, puis réponds aux défis. Si tu en rates un, relis l’explication deux fois avant de continuer.

### Module 2 — Réflexes du cœur

**Objectif :** Transformer les bases en réflexes fluides avec les structures de données, les fonctions et de courts programmes lisibles d’un coup d’œil.

**Concepts (6) :** Indices et découpage · Boucles et conditions · Ensembles (set) · Compréhensions de liste · Parcourir un dict · Arguments par défaut et nommés

**Exercices (6) :**
- `py-007` — Indices et découpage (prédire la sortie)
- `py-008` — Boucles et conditions (remise en ordre)
- `py-009` — Ensembles (set) (énigme)
- `py-010` — Compréhensions de liste (écrire du code)
- `py-011` — Parcourir un dict (texte à trous)
- `py-012` — Arguments par défaut et nommés (chasse au bug)

**Méthode :** Prédis la sortie avant de valider. Écris le petit extrait sur papier si ça aide ; le but est un réflexe, pas un coup de chance.

### Module 3 — Mise en pratique

**Objectif :** Appliquer le langage à des problèmes réalistes : lire une erreur, choisir le bon outil et prédire ce que fait le code.

**Concepts (5) :** Argument par défaut mutable · Portée (LEGB) · Classes et méthodes spéciales · Environnements virtuels · Exceptions

**Exercices (5) :**
- `py-013` — Argument par défaut mutable (prédire la sortie)
- `py-014` — Portée (LEGB) (chasse au bug)
- `py-015` — Classes et méthodes spéciales (écrire du code)
- `py-016` — Environnements virtuels (énigme)
- `py-017` — Exceptions (texte à trous)

**Méthode :** Pour chaque défi, nomme d’abord le type (choix multiple, texte à trous, ordre, chasse au bug, commande, sortie, énigme ou code), puis résous-le.

### Module 4 — Pièges d’expert

**Objectif :** Gérer les pièges d’expert : cas limites, performance, sécurité et les traquenards qui séparent un script qui marche d’un code solide.

**Concepts (5) :** Générateurs et itérateurs · Décorateurs et *args/**kwargs · Gestionnaires de contexte · Le GIL et asyncio · is contre ==

**Exercices (5) :**
- `py-018` — Générateurs et itérateurs (prédire la sortie)
- `py-019` — Décorateurs et *args/**kwargs (écrire du code)
- `py-020` — Gestionnaires de contexte (remise en ordre)
- `py-021` — Le GIL et asyncio (énigme)
- `py-022` — is contre == (choix multiple)

**Méthode :** Cherche le contre-exemple. Demande-toi « quand est-ce que ça casse ? » et note le cas limite qui te piège. Cette note est ton aide-mémoire.

### Module 5 — Laboratoire du boss

**Objectif :** Mélanger tous les types de défis sous une légère pression, réparer les points faibles, puis entrer dans le combat de boss prêt.

**Concepts (8) :** Générateurs et itérateurs · Décorateurs et *args/**kwargs · Gestionnaires de contexte · Le GIL et asyncio · is contre == · Portée (LEGB) · Exceptions · Argument par défaut mutable

**Exercices (8) :**
- `py-018` — Générateurs et itérateurs (prédire la sortie)
- `py-019` — Décorateurs et *args/**kwargs (écrire du code)
- `py-020` — Gestionnaires de contexte (remise en ordre)
- `py-021` — Le GIL et asyncio (énigme)
- `py-022` — is contre == (choix multiple)
- `py-014` — Portée (LEGB) (chasse au bug)
- `py-017` — Exceptions (texte à trous)
- `py-013` — Argument par défaut mutable (prédire la sortie)

**Méthode :** Enchaîne les défis d’une traite, sans indice, et note chaque erreur. Repasse cette liste avant de franchir la porte du boss.

### Examen blanc

Le laboratoire du boss mélange choix multiples, textes à trous, remises en ordre, chasses au bug, commandes, prédiction de sortie, énigmes et code. Termine-le sans indice, puis franchis la porte du boss : ses runes puisent dans le même vivier.

---

## Git — La Chimère des Conflits de Fusion

- **Dojo :** Dojo des Trois Arbres
- **Maître :** Maître Branche
- **Durée :** 2 à 3 heures
- **Prérequis :** La ligne de commande de base (la Terre Linux aide).
- **Boss :** La Chimère des Conflits de Fusion — <<<<<<< HEAD du Chaos

**Résumé :** Le voyage dans le temps du code : instantanés, branches, fusions, conflits, dépôts distants et les outils de secours qui sauvent une mauvaise journée.

**Résultats attendus :**
- Expliquer l’arbre de travail, l’index et le dépôt, et déplacer les changements entre eux.
- Créer des branches, les fusionner et résoudre les conflits sans panique.
- Utiliser stash, reflog, reset et les dépôts distants pour récupérer et collaborer.

**Méthodes de travail :**
- Dessine les trois zones et les flèches entre elles avant chaque défi de commande.
- Lance chaque commande dans un dépôt jetable ; les erreurs y sont gratuites.
- Lis `git status` et `git log --oneline --graph` après chaque étape.
- Quand un conflit apparaît, identifie « le nôtre », « le leur » et le résultat voulu avant d’éditer.

### Module 1 — Fondations

**Objectif :** Construire le modèle mental : le vocabulaire, la syntaxe et les petits programmes sur lesquels reposent tous les défis suivants.

**Concepts (6) :** Gestion de versions · git init · Les trois zones · Fichiers non suivis · Commit · Add & commit

**Exercices (6) :**
- `git-001` — Gestion de versions (choix multiple)
- `git-002` — git init (commande)
- `git-003` — Les trois zones (choix multiple)
- `git-004` — Fichiers non suivis (prédire la sortie)
- `git-005` — Commit (énigme)
- `git-006` — Add & commit (texte à trous)

**Méthode :** Dis chaque règle à voix haute avec tes propres mots, puis réponds aux défis. Si tu en rates un, relis l’explication deux fois avant de continuer.

### Module 2 — Réflexes du cœur

**Objectif :** Transformer les bases en réflexes fluides avec les structures de données, les fonctions et de courts programmes lisibles d’un coup d’œil.

**Concepts (6) :** Motifs .gitignore · Créer une branche · Flux de contribution · Fusion à trois points · Marqueurs de conflit · Stash (remise)

**Exercices (6) :**
- `git-007` — Motifs .gitignore (chasse au bug)
- `git-008` — Créer une branche (commande)
- `git-009` — Flux de contribution (remise en ordre)
- `git-010` — Fusion à trois points (prédire la sortie)
- `git-011` — Marqueurs de conflit (texte à trous)
- `git-012` — Stash (remise) (énigme)

**Méthode :** Prédis la sortie avant de valider. Écris le petit extrait sur papier si ça aide ; le but est un réflexe, pas un coup de chance.

### Module 3 — Mise en pratique

**Objectif :** Appliquer le langage à des problèmes réalistes : lire une erreur, choisir le bon outil et prédire ce que fait le code.

**Concepts (5) :** Push et branche amont · Rebase interactif · reset --soft · Rebase ou merge · Conventional Commits

**Exercices (5) :**
- `git-013` — Push et branche amont (commande)
- `git-014` — Rebase interactif (texte à trous)
- `git-015` — reset --soft (prédire la sortie)
- `git-016` — Rebase ou merge (choix multiple)
- `git-017` — Conventional Commits (chasse au bug)

**Méthode :** Pour chaque défi, nomme d’abord le type (choix multiple, texte à trous, ordre, chasse au bug, commande, sortie, énigme ou code), puis résous-le.

### Module 4 — Pièges d’expert

**Objectif :** Gérer les pièges d’expert : cas limites, performance, sécurité et les traquenards qui séparent un script qui marche d’un code solide.

**Concepts (5) :** git revert · Cherry-pick · Taguer une version · git bisect · Récupérer via reflog

**Exercices (5) :**
- `git-018` — git revert (commande)
- `git-019` — Cherry-pick (commande)
- `git-020` — Taguer une version (remise en ordre)
- `git-021` — git bisect (énigme)
- `git-022` — Récupérer via reflog (choix multiple)

**Méthode :** Cherche le contre-exemple. Demande-toi « quand est-ce que ça casse ? » et note le cas limite qui te piège. Cette note est ton aide-mémoire.

### Module 5 — Laboratoire du boss

**Objectif :** Mélanger tous les types de défis sous une légère pression, réparer les points faibles, puis entrer dans le combat de boss prêt.

**Concepts (8) :** git revert · Taguer une version · git bisect · Récupérer via reflog · Rebase interactif · reset --soft · Conventional Commits · Cherry-pick

**Exercices (8) :**
- `git-018` — git revert (commande)
- `git-020` — Taguer une version (remise en ordre)
- `git-021` — git bisect (énigme)
- `git-022` — Récupérer via reflog (choix multiple)
- `git-014` — Rebase interactif (texte à trous)
- `git-015` — reset --soft (prédire la sortie)
- `git-017` — Conventional Commits (chasse au bug)
- `git-019` — Cherry-pick (commande)

**Méthode :** Enchaîne les défis d’une traite, sans indice, et note chaque erreur. Repasse cette liste avant de franchir la porte du boss.

### Examen blanc

Le laboratoire du boss mélange choix multiples, textes à trous, remises en ordre, chasses au bug, commandes, prédiction de sortie, énigmes et code. Termine-le sans indice, puis franchis la porte du boss : ses runes puisent dans le même vivier.

---

## GitHub — Le Fantôme des PR Oubliées

- **Dojo :** Dojo de la Pull Request
- **Maître :** Maître Octo
- **Durée :** 2 à 3 heures
- **Prérequis :** Les bases de Git (Terre Git).
- **Boss :** Le Fantôme des PR Oubliées — Gardien de 400 Notifications Non Lues

**Résumé :** Collaborer, relire, livrer : forks, branches, pull requests, revues, issues, Actions et releases.

**Résultats attendus :**
- Contribuer via un fork et une pull request ciblée.
- Relire le code de façon constructive et utiliser les issues pour planifier.
- Automatiser les vérifications avec Actions et publier une release.

**Méthodes de travail :**
- Une pull request = une idée ; découpe tout ce que tu ne peux pas décrire en une phrase.
- Écris la description de la PR avant le code : problème, changement, plan de test.
- Relis le diff, pas l’auteur. Pose des questions, puis suggère.
- Regarde une exécution Actions du début à la fin ; les logs sont la compétence.

### Module 1 — Fondations

**Objectif :** Construire le modèle mental : le vocabulaire, la syntaxe et les petits programmes sur lesquels reposent tous les défis suivants.

**Concepts (6) :** Git ou GitHub · Fork · gh repo clone · Issues et labels · Fichiers communautaires · gh issue list

**Exercices (6) :**
- `gh-001` — Git ou GitHub (choix multiple)
- `gh-002` — Fork (énigme)
- `gh-003` — gh repo clone (commande)
- `gh-004` — Issues et labels (choix multiple)
- `gh-005` — Fichiers communautaires (texte à trous)
- `gh-006` — gh issue list (commande)

**Méthode :** Dis chaque règle à voix haute avec tes propres mots, puis réponds aux défis. Si tu en rates un, relis l’explication deux fois avant de continuer.

### Module 2 — Réflexes du cœur

**Objectif :** Transformer les bases en réflexes fluides avec les structures de données, les fonctions et de courts programmes lisibles d’un coup d’œil.

**Concepts (6) :** Mots-clés de fermeture · Parcours fork et PR · Protection de branche · Anatomie d'un workflow · gh pr create · GitHub Pages

**Exercices (6) :**
- `gh-007` — Mots-clés de fermeture (prédire la sortie)
- `gh-008` — Parcours fork et PR (remise en ordre)
- `gh-009` — Protection de branche (choix multiple)
- `gh-010` — Anatomie d'un workflow (texte à trous)
- `gh-011` — gh pr create (commande)
- `gh-012` — GitHub Pages (énigme)

**Méthode :** Prédis la sortie avant de valider. Écris le petit extrait sur papier si ça aide ; le but est un réflexe, pas un coup de chance.

### Module 3 — Mise en pratique

**Objectif :** Appliquer le langage à des problèmes réalistes : lire une erreur, choisir le bon outil et prédire ce que fait le code.

**Concepts (5) :** Utiliser les secrets · Matrice de build · gh pr checkout · CODEOWNERS · Étapes CI et artefacts

**Exercices (5) :**
- `gh-013` — Utiliser les secrets (chasse au bug)
- `gh-014` — Matrice de build (prédire la sortie)
- `gh-015` — gh pr checkout (commande)
- `gh-016` — CODEOWNERS (prédire la sortie)
- `gh-017` — Étapes CI et artefacts (remise en ordre)

**Méthode :** Pour chaque défi, nomme d’abord le type (choix multiple, texte à trous, ordre, chasse au bug, commande, sortie, énigme ou code), puis résous-le.

### Module 4 — Pièges d’expert

**Objectif :** Gérer les pièges d’expert : cas limites, performance, sécurité et les traquenards qui séparent un script qui marche d’un code solide.

**Concepts (5) :** Dependabot · Jobs conditionnels · Cache et secrets · GitHub Releases · Identifiants divulgués

**Exercices (5) :**
- `gh-018` — Dependabot (énigme)
- `gh-019` — Jobs conditionnels (chasse au bug)
- `gh-020` — Cache et secrets (texte à trous)
- `gh-021` — GitHub Releases (commande)
- `gh-022` — Identifiants divulgués (choix multiple)

**Méthode :** Cherche le contre-exemple. Demande-toi « quand est-ce que ça casse ? » et note le cas limite qui te piège. Cette note est ton aide-mémoire.

### Module 5 — Laboratoire du boss

**Objectif :** Mélanger tous les types de défis sous une légère pression, réparer les points faibles, puis entrer dans le combat de boss prêt.

**Concepts (8) :** Dependabot · Jobs conditionnels · Cache et secrets · GitHub Releases · Identifiants divulgués · Matrice de build · Étapes CI et artefacts · Utiliser les secrets

**Exercices (8) :**
- `gh-018` — Dependabot (énigme)
- `gh-019` — Jobs conditionnels (chasse au bug)
- `gh-020` — Cache et secrets (texte à trous)
- `gh-021` — GitHub Releases (commande)
- `gh-022` — Identifiants divulgués (choix multiple)
- `gh-014` — Matrice de build (prédire la sortie)
- `gh-017` — Étapes CI et artefacts (remise en ordre)
- `gh-013` — Utiliser les secrets (chasse au bug)

**Méthode :** Enchaîne les défis d’une traite, sans indice, et note chaque erreur. Repasse cette liste avant de franchir la porte du boss.

### Examen blanc

Le laboratoire du boss mélange choix multiples, textes à trous, remises en ordre, chasses au bug, commandes, prédiction de sortie, énigmes et code. Termine-le sans indice, puis franchis la porte du boss : ses runes puisent dans le même vivier.

---

## Linux — Le Golem Kernel Panic

- **Dojo :** Dojo du Noyau
- **Maître :** Maître Shell
- **Durée :** 3 à 4 heures
- **Prérequis :** Aucun ; un terminal sur n’importe quel OS suffit pour suivre.
- **Boss :** Le Golem Kernel Panic — Porteur de rm -rf

**Résumé :** Maîtrise la ligne de commande : système de fichiers, permissions, pipes, processus, paquets, réseau et sauvegardes.

**Résultats attendus :**
- Naviguer dans le système de fichiers et lire, trouver et combiner des fichiers avec le shell.
- Raisonner sur les permissions, processus, signaux et codes de sortie.
- Automatiser une petite tâche avec un script, cron, ssh et une sauvegarde.

**Méthodes de travail :**
- Utilise `man` et `--help` avant de deviner ; le manuel fait partie de la compétence.
- Dis ce qu’un pipe fait à stdout et stderr avant de l’exécuter.
- Pour les permissions, convertis entre symbolique et numérique jusqu’à l’automatisme.
- Teste les commandes destructrices dans un dossier brouillon, jamais dans ton dossier personnel.

### Module 1 — Fondations

**Objectif :** Construire le modèle mental : le vocabulaire, la syntaxe et les petits programmes sur lesquels reposent tous les défis suivants.

**Concepts (6) :** Arborescence des fichiers · Lire un fichier : tail · Lister les fichiers : ls · Le répertoire racine · Chemins relatifs et cd · Options de mkdir et cp

**Exercices (6) :**
- `linux-001` — Arborescence des fichiers (choix multiple)
- `linux-002` — Lire un fichier : tail (commande)
- `linux-003` — Lister les fichiers : ls (commande)
- `linux-004` — Le répertoire racine (énigme)
- `linux-005` — Chemins relatifs et cd (prédire la sortie)
- `linux-006` — Options de mkdir et cp (texte à trous)

**Méthode :** Dis chaque règle à voix haute avec tes propres mots, puis réponds aux défis. Si tu en rates un, relis l’explication deux fois avant de continuer.

### Module 2 — Réflexes du cœur

**Objectif :** Transformer les bases en réflexes fluides avec les structures de données, les fonctions et de courts programmes lisibles d’un coup d’œil.

**Concepts (6) :** chmod : droit d’exécution · Droits numériques et chown · Tubes (pipes) · Compter les lignes : wc · sort et uniq · Redirection > et >>

**Exercices (6) :**
- `linux-007` — chmod : droit d’exécution (commande)
- `linux-008` — Droits numériques et chown (texte à trous)
- `linux-009` — Tubes (pipes) (énigme)
- `linux-010` — Compter les lignes : wc (commande)
- `linux-011` — sort et uniq (prédire la sortie)
- `linux-012` — Redirection > et >> (chasse au bug)

**Méthode :** Prédis la sortie avant de valider. Écris le petit extrait sur papier si ça aide ; le but est un réflexe, pas un coup de chance.

### Module 3 — Mise en pratique

**Objectif :** Appliquer le langage à des problèmes réalistes : lire une erreur, choisir le bon outil et prédire ce que fait le code.

**Concepts (5) :** Scripts shell et codes de sortie · Processus et signaux · Code de retour $? · La variable PATH · apt et systemd

**Exercices (5) :**
- `linux-013` — Scripts shell et codes de sortie (remise en ordre)
- `linux-014` — Processus et signaux (commande)
- `linux-015` — Code de retour $? (prédire la sortie)
- `linux-016` — La variable PATH (énigme)
- `linux-017` — apt et systemd (texte à trous)

**Méthode :** Pour chaque défi, nomme d’abord le type (choix multiple, texte à trous, ordre, chasse au bug, commande, sortie, énigme ou code), puis résous-le.

### Module 4 — Pièges d’expert

**Objectif :** Gérer les pièges d’expert : cas limites, performance, sécurité et les traquenards qui séparent un script qui marche d’un code solide.

**Concepts (5) :** HTTP avec curl · sed et awk · Planifier avec cron · ssh et scp · Sauvegardes avec tar et du

**Exercices (5) :**
- `linux-018` — HTTP avec curl (commande)
- `linux-019` — sed et awk (prédire la sortie)
- `linux-020` — Planifier avec cron (énigme)
- `linux-021` — ssh et scp (chasse au bug)
- `linux-022` — Sauvegardes avec tar et du (remise en ordre)

**Méthode :** Cherche le contre-exemple. Demande-toi « quand est-ce que ça casse ? » et note le cas limite qui te piège. Cette note est ton aide-mémoire.

### Module 5 — Laboratoire du boss

**Objectif :** Mélanger tous les types de défis sous une légère pression, réparer les points faibles, puis entrer dans le combat de boss prêt.

**Concepts (8) :** HTTP avec curl · sed et awk · Planifier avec cron · ssh et scp · Sauvegardes avec tar et du · apt et systemd · Arborescence des fichiers · Scripts shell et codes de sortie

**Exercices (8) :**
- `linux-018` — HTTP avec curl (commande)
- `linux-019` — sed et awk (prédire la sortie)
- `linux-020` — Planifier avec cron (énigme)
- `linux-021` — ssh et scp (chasse au bug)
- `linux-022` — Sauvegardes avec tar et du (remise en ordre)
- `linux-017` — apt et systemd (texte à trous)
- `linux-001` — Arborescence des fichiers (choix multiple)
- `linux-013` — Scripts shell et codes de sortie (remise en ordre)

**Méthode :** Enchaîne les défis d’une traite, sans indice, et note chaque erreur. Repasse cette liste avant de franchir la porte du boss.

### Examen blanc

Le laboratoire du boss mélange choix multiples, textes à trous, remises en ordre, chasses au bug, commandes, prédiction de sortie, énigmes et code. Termine-le sans indice, puis franchis la porte du boss : ses runes puisent dans le même vivier.

---

## DevOps — Le Dragon du Pipeline

- **Dojo :** Dojo du Pipeline
- **Maître :** Maître Pipeline
- **Durée :** 4 à 5 heures
- **Prérequis :** Les bases de Linux et Git ; un peu de Node ou Python aide.
- **Boss :** Le Dragon du Pipeline — Casseur de Prod le Vendredi

**Résumé :** Construire, livrer, exécuter, observer : conteneurs, CI/CD, infrastructure as code, cloud, supervision et réponse aux incidents.

**Résultats attendus :**
- Conteneuriser une application et expliquer image, conteneur, volume et réseau.
- Concevoir un pipeline CI/CD avec tests, builds et déploiements sûrs.
- Superviser un service et déboguer un déploiement en échec depuis les logs et métriques.

**Méthodes de travail :**
- Suis un commit du push à la production ; nomme chaque étape à voix haute.
- Pour Docker, compare l’image (la recette) au conteneur (l’instance en cours).
- Écris le plan de retour arrière avant le plan de déploiement.
- Lis un vrai post-mortem d’incident ; note la détection, l’atténuation et la prévention.

### Module 1 — Fondations

**Objectif :** Construire le modèle mental : le vocabulaire, la syntaxe et les petits programmes sur lesquels reposent tous les défis suivants.

**Concepts (6) :** Culture DevOps · Conteneurs ou VM · Image ou conteneur · docker run · Bases du Dockerfile · Essentiels de la CLI Docker

**Exercices (6) :**
- `devops-001` — Culture DevOps (choix multiple)
- `devops-002` — Conteneurs ou VM (choix multiple)
- `devops-003` — Image ou conteneur (énigme)
- `devops-004` — docker run (commande)
- `devops-005` — Bases du Dockerfile (texte à trous)
- `devops-006` — Essentiels de la CLI Docker (texte à trous)

**Méthode :** Dis chaque règle à voix haute avec tes propres mots, puis réponds aux défis. Si tu en rates un, relis l’explication deux fois avant de continuer.

### Module 2 — Réflexes du cœur

**Objectif :** Transformer les bases en réflexes fluides avec les structures de données, les fonctions et de courts programmes lisibles d’un coup d’œil.

**Concepts (6) :** Pipeline CI/CD · docker logs · Démarré ou arrêté · CI ou CD · WORKDIR ou RUN cd · Docker Compose

**Exercices (6) :**
- `devops-007` — Pipeline CI/CD (remise en ordre)
- `devops-008` — docker logs (commande)
- `devops-009` — Démarré ou arrêté (prédire la sortie)
- `devops-010` — CI ou CD (choix multiple)
- `devops-011` — WORKDIR ou RUN cd (chasse au bug)
- `devops-012` — Docker Compose (texte à trous)

**Méthode :** Prédis la sortie avant de valider. Écris le petit extrait sur papier si ça aide ; le but est un réflexe, pas un coup de chance.

### Module 3 — Mise en pratique

**Objectif :** Appliquer le langage à des problèmes réalistes : lire une erreur, choisir le bon outil et prédire ce que fait le code.

**Concepts (5) :** kubectl apply · Réplicas auto-réparés · Collecte de métriques · Builds multi-étapes · terraform plan

**Exercices (5) :**
- `devops-013` — kubectl apply (commande)
- `devops-014` — Réplicas auto-réparés (prédire la sortie)
- `devops-015` — Collecte de métriques (énigme)
- `devops-016` — Builds multi-étapes (choix multiple)
- `devops-017` — terraform plan (commande)

**Méthode :** Pour chaque défi, nomme d’abord le type (choix multiple, texte à trous, ordre, chasse au bug, commande, sortie, énigme ou code), puis résous-le.

### Module 4 — Pièges d’expert

**Objectif :** Gérer les pièges d’expert : cas limites, performance, sécurité et les traquenards qui séparent un script qui marche d’un code solide.

**Concepts (5) :** Flux Terraform · Déploiement canari · Sélecteurs de Service · Annuler un déploiement · Budget d'erreur

**Exercices (5) :**
- `devops-018` — Flux Terraform (remise en ordre)
- `devops-019` — Déploiement canari (énigme)
- `devops-020` — Sélecteurs de Service (chasse au bug)
- `devops-021` — Annuler un déploiement (commande)
- `devops-022` — Budget d'erreur (prédire la sortie)

**Méthode :** Cherche le contre-exemple. Demande-toi « quand est-ce que ça casse ? » et note le cas limite qui te piège. Cette note est ton aide-mémoire.

### Module 5 — Laboratoire du boss

**Objectif :** Mélanger tous les types de défis sous une légère pression, réparer les points faibles, puis entrer dans le combat de boss prêt.

**Concepts (8) :** Flux Terraform · Déploiement canari · Sélecteurs de Service · Annuler un déploiement · Budget d'erreur · Builds multi-étapes · Docker Compose · kubectl apply

**Exercices (8) :**
- `devops-018` — Flux Terraform (remise en ordre)
- `devops-019` — Déploiement canari (énigme)
- `devops-020` — Sélecteurs de Service (chasse au bug)
- `devops-021` — Annuler un déploiement (commande)
- `devops-022` — Budget d'erreur (prédire la sortie)
- `devops-016` — Builds multi-étapes (choix multiple)
- `devops-012` — Docker Compose (texte à trous)
- `devops-013` — kubectl apply (commande)

**Méthode :** Enchaîne les défis d’une traite, sans indice, et note chaque erreur. Repasse cette liste avant de franchir la porte du boss.

### Examen blanc

Le laboratoire du boss mélange choix multiples, textes à trous, remises en ordre, chasses au bug, commandes, prédiction de sortie, énigmes et code. Termine-le sans indice, puis franchis la porte du boss : ses runes puisent dans le même vivier.

---

## AI — L'Oracle Hallucinant

- **Dojo :** Dojo du Chemin Neural
- **Maître :** Maître Gradient
- **Durée :** 4 à 5 heures
- **Prérequis :** Les bases de Python et un peu d’algèbre (fonctions, moyennes).
- **Boss :** L'Oracle Hallucinant — Prophète de ce qui n'a jamais existé

**Résumé :** Apprendre aux machines à apprendre : données, perte, gradients, évaluation, réseaux de neurones, transformers, RAG et sécurité.

**Résultats attendus :**
- Formuler un problème en supervisé ou non supervisé et découper les données honnêtement.
- Expliquer perte, descente de gradient, surapprentissage et la bonne métrique.
- Décrire transformers, embeddings, RAG et les principaux modes de défaillance.

**Méthodes de travail :**
- Pour chaque modèle, écris entrées, sorties, perte et métrique en une ligne.
- Demande toujours quelle est la référence ; un modèle doit battre quelque chose.
- Dessine la boucle d’entraînement : avant, perte, rétropropagation, pas, répéter.
- Traite les hallucinations comme un risque produit, pas un bug amusant : vérifie par récupération.

### Module 1 — Fondations

**Objectif :** Construire le modèle mental : le vocabulaire, la syntaxe et les petits programmes sur lesquels reposent tous les défis suivants.

**Concepts (6) :** IA, ML et apprentissage profond · Supervisé ou non supervisé · Caractéristiques et étiquettes · Séparer entraînement et test · Entraînement et inférence · Exactitude (accuracy)

**Exercices (6) :**
- `ai-001` — IA, ML et apprentissage profond (choix multiple)
- `ai-002` — Supervisé ou non supervisé (choix multiple)
- `ai-003` — Caractéristiques et étiquettes (énigme)
- `ai-004` — Séparer entraînement et test (prédire la sortie)
- `ai-005` — Entraînement et inférence (texte à trous)
- `ai-006` — Exactitude (accuracy) (écrire du code)

**Méthode :** Dis chaque règle à voix haute avec tes propres mots, puis réponds aux défis. Si tu en rates un, relis l’explication deux fois avant de continuer.

### Module 2 — Réflexes du cœur

**Objectif :** Transformer les bases en réflexes fluides avec les structures de données, les fonctions et de courts programmes lisibles d’un coup d’œil.

**Concepts (6) :** Surapprentissage · Perte : erreur quadratique moyenne · Descente de gradient · Un pas de descente de gradient · k plus proches voisins · Mise à l’échelle des données

**Exercices (6) :**
- `ai-007` — Surapprentissage (choix multiple)
- `ai-008` — Perte : erreur quadratique moyenne (prédire la sortie)
- `ai-009` — Descente de gradient (énigme)
- `ai-010` — Un pas de descente de gradient (texte à trous)
- `ai-011` — k plus proches voisins (chasse au bug)
- `ai-012` — Mise à l’échelle des données (écrire du code)

**Méthode :** Prédis la sortie avant de valider. Écris le petit extrait sur papier si ça aide ; le but est un réflexe, pas un coup de chance.

### Module 3 — Mise en pratique

**Objectif :** Appliquer le langage à des problèmes réalistes : lire une erreur, choisir le bon outil et prédire ce que fait le code.

**Concepts (5) :** Un neurone artificiel · Rétropropagation · Précision et rappel · Plongements (embeddings) · Softmax

**Exercices (5) :**
- `ai-013` — Un neurone artificiel (prédire la sortie)
- `ai-014` — Rétropropagation (choix multiple)
- `ai-015` — Précision et rappel (écrire du code)
- `ai-016` — Plongements (embeddings) (énigme)
- `ai-017` — Softmax (chasse au bug)

**Méthode :** Pour chaque défi, nomme d’abord le type (choix multiple, texte à trous, ordre, chasse au bug, commande, sortie, énigme ou code), puis résous-le.

### Module 4 — Pièges d’expert

**Objectif :** Gérer les pièges d’expert : cas limites, performance, sécurité et les traquenards qui séparent un script qui marche d’un code solide.

**Concepts (5) :** Transformers et attention · Décodage du token suivant · Génération augmentée par récupération (RAG) · Hallucinations · La boucle d’entraînement

**Exercices (5) :**
- `ai-018` — Transformers et attention (choix multiple)
- `ai-019` — Décodage du token suivant (prédire la sortie)
- `ai-020` — Génération augmentée par récupération (RAG) (choix multiple)
- `ai-021` — Hallucinations (énigme)
- `ai-022` — La boucle d’entraînement (remise en ordre)

**Méthode :** Cherche le contre-exemple. Demande-toi « quand est-ce que ça casse ? » et note le cas limite qui te piège. Cette note est ton aide-mémoire.

### Module 5 — Laboratoire du boss

**Objectif :** Mélanger tous les types de défis sous une légère pression, réparer les points faibles, puis entrer dans le combat de boss prêt.

**Concepts (8) :** Transformers et attention · Décodage du token suivant · Hallucinations · La boucle d’entraînement · Précision et rappel · Softmax · Un pas de descente de gradient · Génération augmentée par récupération (RAG)

**Exercices (8) :**
- `ai-018` — Transformers et attention (choix multiple)
- `ai-019` — Décodage du token suivant (prédire la sortie)
- `ai-021` — Hallucinations (énigme)
- `ai-022` — La boucle d’entraînement (remise en ordre)
- `ai-015` — Précision et rappel (écrire du code)
- `ai-017` — Softmax (chasse au bug)
- `ai-010` — Un pas de descente de gradient (texte à trous)
- `ai-020` — Génération augmentée par récupération (RAG) (choix multiple)

**Méthode :** Enchaîne les défis d’une traite, sans indice, et note chaque erreur. Repasse cette liste avant de franchir la porte du boss.

### Examen blanc

Le laboratoire du boss mélange choix multiples, textes à trous, remises en ordre, chasses au bug, commandes, prédiction de sortie, énigmes et code. Termine-le sans indice, puis franchis la porte du boss : ses runes puisent dans le même vivier.

---

_Généré depuis `shared/crashcourse.ts` par `npm run crashcourses -w server`. Ne pas éditer à la main._
