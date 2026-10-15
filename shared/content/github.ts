import type { Challenge } from '../types';

export const challenges: Challenge[] = [
  // ───────────────────────── Tier 1 — Novice ─────────────────────────
  {
    id: 'gh-001',
    track: 'github',
    tier: 1,
    kind: 'mcq',
    concept: { en: "Git vs GitHub", fr: "Git ou GitHub" },
    prompt: {
      en: "What is the difference between Git and GitHub?",
      fr: "Quelle est la différence entre Git et GitHub ?",
    },
    options: [
      { en: "None: they are two names for the same tool", fr: "Aucune : ce sont deux noms pour le même outil" },
      { en: "GitHub is the newer version of Git", fr: "GitHub est la nouvelle version de Git" },
      { en: "Git is the version control tool on your machine; GitHub is a platform that hosts Git repositories and adds collaboration tools", fr: "Git est l'outil de gestion de versions sur ta machine ; GitHub est une plateforme qui héberge des dépôts Git et ajoute des outils de collaboration" },
      { en: "Git only works with GitHub", fr: "Git ne fonctionne qu'avec GitHub" },
    ],
    answer: 2,
    hint: {
      en: "One works perfectly offline; the other is a website.",
      fr: "L'un fonctionne parfaitement hors ligne ; l'autre est un site web.",
    },
    explanation: {
      en: "Git is open-source software that tracks history locally. GitHub (like GitLab or Bitbucket) hosts remote copies of Git repositories and adds issues, pull requests, Actions, Pages and more. You can use Git without GitHub, but GitHub is built on Git.",
      fr: "Git est un logiciel libre qui suit l'historique en local. GitHub (comme GitLab ou Bitbucket) héberge des copies distantes de dépôts Git et ajoute issues, pull requests, Actions, Pages, etc. On peut utiliser Git sans GitHub, mais GitHub repose sur Git.",
    },
  },
  {
    id: 'gh-002',
    track: 'github',
    tier: 1,
    kind: 'riddle',
    concept: { en: "Fork", fr: "Fork" },
    prompt: {
      en: "You can't push to their repository? No problem.\nWith one click I copy it into YOUR account,\nwhere you can change anything you like,\nthen propose your work back to the original. What am I?",
      fr: "Tu ne peux pas pousser sur leur dépôt ? Pas de souci.\nEn un clic, je le copie dans TON compte,\noù tu peux tout modifier à ta guise,\npuis proposer ton travail au dépôt d'origine. Qui suis-je ?",
    },
    accepted: ['fork', 'forks', 'a fork', 'un fork', 'bifurcation', 'fourche'],
    hint: {
      en: "Like a road that splits in two, or the utensil next to your knife.",
      fr: "Comme une route qui se sépare en deux ; en anglais, c'est aussi le nom de la fourchette.",
    },
    explanation: {
      en: "A fork is your own server-side copy of someone else's repository. It's the standard open-source flow: fork, push changes to your fork, then open a pull request toward the upstream repository. A star, by contrast, is just a bookmark and a sign of appreciation.",
      fr: "Un fork est ta propre copie, côté serveur, du dépôt de quelqu'un d'autre. C'est le parcours classique de l'open source : forker, pousser sur ton fork, puis ouvrir une pull request vers le dépôt d'origine (upstream). Une étoile (star), elle, n'est qu'un favori et une marque d'appréciation.",
    },
  },
  {
    id: 'gh-003',
    track: 'github',
    tier: 1,
    kind: 'command',
    concept: { en: "gh repo clone", fr: "gh repo clone" },
    prompt: {
      en: "Using the GitHub CLI, clone the repository `octocat/Spoon-Knife`.",
      fr: "Avec la CLI GitHub, clone le dépôt `octocat/Spoon-Knife`.",
    },
    accepted: [
      'gh repo clone octocat/Spoon-Knife',
      'gh repo clone https://github.com/octocat/Spoon-Knife',
      'gh repo clone https://github.com/octocat/Spoon-Knife.git',
    ],
    hint: {
      en: "The CLI is `gh`, then the noun, then the verb.",
      fr: "La CLI s'appelle `gh`, suivie du nom puis du verbe.",
    },
    explanation: {
      en: "`gh` commands follow a `gh <noun> <verb>` pattern. `gh repo clone OWNER/REPO` accepts the short form and uses your authenticated protocol (HTTPS or SSH). When you clone your own fork, it also adds the original repository as the `upstream` remote.",
      fr: "Les commandes `gh` suivent le modèle `gh <nom> <verbe>`. `gh repo clone PROPRIÉTAIRE/DÉPÔT` accepte la forme courte et utilise ton protocole authentifié (HTTPS ou SSH). Si tu clones ton propre fork, il ajoute aussi le dépôt d'origine comme remote `upstream`.",
    },
  },
  {
    id: 'gh-004',
    track: 'github',
    tier: 1,
    kind: 'mcq',
    concept: { en: "Issues & labels", fr: "Issues et labels" },
    prompt: {
      en: "You want to flag an issue as a simple task, ideal for newcomers to the project. What do you add to it?",
      fr: "Tu veux signaler une issue comme une tâche simple, idéale pour les nouveaux venus du projet. Que lui ajoutes-tu ?",
    },
    options: [
      { en: "The label `good first issue`", fr: "Le label `good first issue`" },
      { en: "A milestone", fr: "Un jalon (milestone)" },
      { en: "A Discussion", fr: "Une Discussion" },
      { en: "A Project board", fr: "Un tableau Projects" },
    ],
    answer: 0,
    hint: {
      en: "It's a colored tag you can filter by, and GitHub highlights this particular one to newcomers.",
      fr: "C'est une étiquette colorée sur laquelle on peut filtrer, et GitHub met celle-ci en avant auprès des nouveaux venus.",
    },
    explanation: {
      en: "Issues track bugs and tasks; labels categorize them (`bug`, `enhancement`, `good first issue`...) and make filtering easy. Milestones group issues toward a release, Projects are planning boards, and Discussions host open-ended questions that aren't actionable tasks.",
      fr: "Les issues suivent les bugs et les tâches ; les labels les catégorisent (`bug`, `enhancement`, `good first issue`...) et facilitent le filtrage. Les milestones regroupent des issues pour une version, Projects sert de tableau de planification et les Discussions accueillent les questions ouvertes qui ne sont pas des tâches.",
    },
  },
  {
    id: 'gh-005',
    track: 'github',
    tier: 1,
    kind: 'fill',
    concept: { en: "Community files", fr: "Fichiers communautaires" },
    prompt: {
      en: "Fill in the three standard files of a healthy open-source repo: (1) the front page explaining the project, (2) the legal terms for reusing the code, (3) the guide for contributors.",
      fr: "Complète les trois fichiers standard d'un bon dépôt open source : (1) la page d'accueil qui présente le projet, (2) les conditions légales de réutilisation du code, (3) le guide des contributeurs.",
    },
    template: `my-project/
├── ___.md
├── ___
├── ___.md
└── src/`,
    blanks: [['README'], ['LICENSE', 'LICENSE.md', 'LICENSE.txt'], ['CONTRIBUTING']],
    caseSensitive: false,
    hint: {
      en: "By convention these file names are written in capital letters; the first one literally tells you to read it.",
      fr: "Par convention, ces noms de fichiers sont en majuscules ; le premier te dit littéralement de le lire.",
    },
    explanation: {
      en: "GitHub renders README.md on the repository's home page, detects the LICENSE to show reuse rights (no license means all rights reserved!), and links CONTRIBUTING.md when people open issues or pull requests. Together they are basic open-source etiquette.",
      fr: "GitHub affiche README.md sur la page d'accueil du dépôt, détecte le fichier LICENSE pour indiquer les droits de réutilisation (sans licence, tous droits réservés !) et propose CONTRIBUTING.md quand on ouvre une issue ou une pull request. Ensemble, c'est la politesse de base de l'open source.",
    },
  },
  {
    id: 'gh-006',
    track: 'github',
    tier: 1,
    kind: 'command',
    concept: { en: "gh issue list", fr: "gh issue list" },
    prompt: {
      en: "From inside a cloned repository, list its open issues with the GitHub CLI.",
      fr: "Depuis un dépôt cloné, liste ses issues ouvertes avec la CLI GitHub.",
    },
    accepted: [
      'gh issue list',
      'gh issue ls',
      'gh issue list --state open',
      'gh issue list -s open',
    ],
    hint: {
      en: "Noun: issue. Verb: the usual word for showing many items.",
      fr: "Nom : issue. Verbe : le mot habituel pour afficher plusieurs éléments.",
    },
    explanation: {
      en: "`gh issue list` shows open issues of the repository detected from your current folder's remote. Add filters such as `--label bug`, `--assignee @me` or `--state closed` to triage from the terminal without opening a browser.",
      fr: "`gh issue list` affiche les issues ouvertes du dépôt détecté à partir du remote du dossier courant. Ajoute des filtres comme `--label bug`, `--assignee @me` ou `--state closed` pour trier depuis le terminal sans ouvrir de navigateur.",
    },
  },

  // ───────────────────────── Tier 2 — Apprentice ─────────────────────────
  {
    id: 'gh-007',
    track: 'github',
    tier: 2,
    kind: 'output',
    concept: { en: "Closing keywords", fr: "Mots-clés de fermeture" },
    prompt: {
      en: "This pull request is merged into the default branch. Which issue is closed automatically? (number only)",
      fr: "Cette pull request est fusionnée dans la branche par défaut. Quelle issue est fermée automatiquement ? (numéro seulement)",
    },
    code: `Add dark mode toggle

Closes #12
See also #15`,
    codeLang: 'text',
    accepted: ['12', '#12'],
    hint: {
      en: "Only certain verbs, like close / fix / resolve, trigger the automation.",
      fr: "Seuls certains verbes, comme close / fix / resolve, déclenchent l'automatisme.",
    },
    explanation: {
      en: "Keywords such as `Closes`, `Fixes` or `Resolves` followed by `#number` link the PR to an issue and close it when the PR is merged into the default branch. \"See also #15\" only creates a cross-reference link; issue 15 stays open.",
      fr: "Les mots-clés `Closes`, `Fixes` ou `Resolves` suivis de `#numéro` lient la PR à une issue et la ferment lors de la fusion dans la branche par défaut. « See also #15 » crée seulement un lien de référence : l'issue 15 reste ouverte.",
    },
  },
  {
    id: 'gh-008',
    track: 'github',
    tier: 2,
    kind: 'order',
    concept: { en: "Fork & PR flow", fr: "Parcours fork et PR" },
    prompt: {
      en: "Put the steps in order to contribute a typo fix to `octocat/Spoon-Knife`, a repo you can't push to.",
      fr: "Remets dans l'ordre les étapes pour proposer une correction de faute à `octocat/Spoon-Knife`, un dépôt sur lequel tu ne peux pas pousser.",
    },
    lines: [
      'gh repo fork octocat/Spoon-Knife --clone',
      'cd Spoon-Knife',
      'git switch -c fix-typo',
      'git commit -am "docs: fix typo in README"',
      'git push -u origin fix-typo',
      'gh pr create --fill',
    ],
    hint: {
      en: "You need your own copy before anything else, and the PR comes last, once the branch exists on GitHub.",
      fr: "Il te faut ta propre copie avant tout, et la PR vient en dernier, une fois la branche présente sur GitHub.",
    },
    explanation: {
      en: "`gh repo fork --clone` creates your fork and clones it locally (with `origin` = your fork, `upstream` = the original). You work on a dedicated branch, push it to your fork, then `gh pr create` opens a pull request toward the upstream repository.",
      fr: "`gh repo fork --clone` crée ton fork et le clone en local (`origin` = ton fork, `upstream` = l'original). Tu travailles sur une branche dédiée, tu la pousses sur ton fork, puis `gh pr create` ouvre une pull request vers le dépôt d'origine.",
    },
  },
  {
    id: 'gh-009',
    track: 'github',
    tier: 2,
    kind: 'mcq',
    concept: { en: "Branch protection", fr: "Protection de branche" },
    prompt: {
      en: "Which GitHub feature stops anyone from pushing directly to `main` and requires an approved review and green CI before merging?",
      fr: "Quelle fonctionnalité GitHub empêche quiconque de pousser directement sur `main` et exige une revue approuvée et une CI au vert avant la fusion ?",
    },
    options: [
      { en: "A CODEOWNERS file", fr: "Un fichier CODEOWNERS" },
      { en: "Dependabot", fr: "Dependabot" },
      { en: "GitHub Pages", fr: "GitHub Pages" },
      { en: "A branch protection rule (or ruleset)", fr: "Une règle de protection de branche (ou ruleset)" },
    ],
    answer: 3,
    hint: {
      en: "It's configured in the repository settings, per branch.",
      fr: "Cela se configure dans les paramètres du dépôt, branche par branche.",
    },
    explanation: {
      en: "Branch protection rules (and the newer rulesets) can require pull requests, a number of approving reviews, passing status checks and even signed commits. A reviewer can Comment, Approve or Request changes; with protection on, a \"Request changes\" review blocks the merge until resolved.",
      fr: "Les règles de protection de branche (et les rulesets plus récents) peuvent exiger des pull requests, un nombre de revues approuvées, des vérifications réussies et même des commits signés. Un relecteur peut commenter, approuver ou demander des changements ; avec la protection, « Request changes » bloque la fusion jusqu'à résolution.",
    },
  },
  {
    id: 'gh-010',
    track: 'github',
    tier: 2,
    kind: 'fill',
    concept: { en: "Workflow anatomy", fr: "Anatomie d'un workflow" },
    prompt: {
      en: "Complete this GitHub Actions workflow: the trigger key, the runner key, and the key that runs a reusable action.",
      fr: "Complète ce workflow GitHub Actions : la clé des déclencheurs, la clé du runner et la clé qui exécute une action réutilisable.",
    },
    template: `name: CI
___:
  push:
    branches: [main]
  pull_request:
jobs:
  test:
    ___: ubuntu-latest
    steps:
      - ___: actions/checkout@v4
      - run: npm ci
      - run: npm test`,
    blanks: [['on'], ['runs-on'], ['uses']],
    hint: {
      en: "Trigger: a two-letter word. Runner: \"runs\" plus something. Action: the verb you'd use for borrowing a tool.",
      fr: "Déclencheur : un mot de deux lettres. Runner : « runs » plus quelque chose. Action : le verbe « utiliser » en anglais.",
    },
    explanation: {
      en: "A workflow lives in `.github/workflows/*.yml`. `on` lists the events that trigger it, each job declares the machine it `runs-on`, and steps either `uses` a published action (like `actions/checkout`, which fetches your code) or `run` a shell command.",
      fr: "Un workflow se place dans `.github/workflows/*.yml`. `on` liste les événements déclencheurs, chaque job déclare la machine sur laquelle il tourne avec `runs-on`, et chaque étape soit `uses` une action publiée (comme `actions/checkout`, qui récupère ton code), soit `run` une commande shell.",
    },
  },
  {
    id: 'gh-011',
    track: 'github',
    tier: 2,
    kind: 'command',
    concept: { en: "gh pr create", fr: "gh pr create" },
    prompt: {
      en: "Your branch is pushed. Open a pull request with the GitHub CLI, filling the title and body automatically from your commits.",
      fr: "Ta branche est poussée. Ouvre une pull request avec la CLI GitHub, en remplissant automatiquement le titre et la description à partir de tes commits.",
    },
    accepted: [
      'gh pr create --fill',
      'gh pr create -f',
      'gh pr new --fill',
      'gh pr new -f',
    ],
    hint: {
      en: "`gh pr` + the verb to make something new + a flag meaning \"fill it in for me\".",
      fr: "`gh pr` + le verbe pour créer + un flag qui veut dire « remplis-le pour moi ».",
    },
    explanation: {
      en: "`gh pr create` opens a PR from the current branch; `--fill` uses the commit messages for the title and description, skipping the interactive prompts. Other handy flags: `--draft`, `--reviewer`, `--base`. A good PR stays small, explains why, and links its issue.",
      fr: "`gh pr create` ouvre une PR depuis la branche courante ; `--fill` reprend les messages de commit pour le titre et la description, sans questions interactives. Autres flags utiles : `--draft`, `--reviewer`, `--base`. Une bonne PR reste petite, explique le pourquoi et référence son issue.",
    },
  },
  {
    id: 'gh-012',
    track: 'github',
    tier: 2,
    kind: 'riddle',
    concept: { en: "GitHub Pages", fr: "GitHub Pages" },
    prompt: {
      en: "Push some HTML, or let a workflow build it,\nand I'll serve your docs, blog or portfolio\nat username.github.io, free of charge,\nstraight from a repository. What am I?",
      fr: "Pousse un peu de HTML, ou laisse un workflow le générer,\net je servirai ta doc, ton blog ou ton portfolio\nsur username.github.io, gratuitement,\ndirectement depuis un dépôt. Qui suis-je ?",
    },
    accepted: ['github pages', 'pages', 'gh pages', 'gh-pages', 'github page'],
    hint: {
      en: "Websites are made of these, and the platform's name comes first.",
      fr: "Les sites web sont faits de ça, précédé du nom de la plateforme.",
    },
    explanation: {
      en: "GitHub Pages hosts static websites (HTML, CSS, JS) directly from a repository, either from a branch/folder or via a GitHub Actions deployment. It's perfect for documentation and portfolios; it doesn't run server-side code.",
      fr: "GitHub Pages héberge des sites statiques (HTML, CSS, JS) directement depuis un dépôt, à partir d'une branche ou d'un dossier, ou via un déploiement GitHub Actions. Parfait pour la documentation et les portfolios ; il n'exécute pas de code côté serveur.",
    },
  },

  // ───────────────────────── Tier 3 — Adept ─────────────────────────
  {
    id: 'gh-013',
    track: 'github',
    tier: 3,
    kind: 'bug',
    concept: { en: "Using secrets", fr: "Utiliser les secrets" },
    prompt: {
      en: "This publish workflow fails with an authentication error: the token is empty. Which line is the bug?",
      fr: "Ce workflow de publication échoue avec une erreur d'authentification : le jeton est vide. Quelle ligne contient le bug ?",
    },
    lines: [
      'name: Publish',
      'on:',
      '  release:',
      '    types: [published]',
      'jobs:',
      '  publish:',
      '    runs-on: ubuntu-latest',
      '    steps:',
      '      - uses: actions/checkout@v4',
      '      - uses: actions/setup-node@v4',
      '        with:',
      '          node-version: 20',
      "          registry-url: 'https://registry.npmjs.org'",
      '      - run: npm publish',
      '        env:',
      '          NODE_AUTH_TOKEN: ${{ secret.NPM_TOKEN }}',
    ],
    bugLine: 15,
    hint: {
      en: "Check the exact name of the context that holds encrypted repository secrets.",
      fr: "Vérifie le nom exact du contexte qui contient les secrets chiffrés du dépôt.",
    },
    explanation: {
      en: "Secrets are read from the `secrets` context (plural): `${{ secrets.NPM_TOKEN }}`. Secrets are stored encrypted in the repository or organization settings, masked in logs, and never committed to the code; a typo in the expression just evaluates to an empty string.",
      fr: "Les secrets se lisent dans le contexte `secrets` (au pluriel) : `${{ secrets.NPM_TOKEN }}`. Ils sont stockés chiffrés dans les paramètres du dépôt ou de l'organisation, masqués dans les logs et jamais commités dans le code ; une faute de frappe dans l'expression donne simplement une chaîne vide.",
    },
  },
  {
    id: 'gh-014',
    track: 'github',
    tier: 3,
    kind: 'output',
    concept: { en: "Build matrix", fr: "Matrice de build" },
    prompt: {
      en: "How many jobs does this matrix start?",
      fr: "Combien de jobs cette matrice lance-t-elle ?",
    },
    code: `jobs:
  test:
    runs-on: \${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest]
        node: [18, 20, 22]
        exclude:
          - os: windows-latest
            node: 18
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node }}
      - run: npm test`,
    codeLang: 'yaml',
    accepted: ['5'],
    hint: {
      en: "Multiply the list sizes, then remove what is excluded.",
      fr: "Multiplie la taille des listes, puis retire ce qui est exclu.",
    },
    explanation: {
      en: "A matrix runs one job per combination: 2 OS × 3 Node versions = 6, minus the single excluded combination (windows + 18) = 5 parallel jobs. Matrices let you test many environments with one job definition; `include` can add extra combinations.",
      fr: "Une matrice lance un job par combinaison : 2 OS × 3 versions de Node = 6, moins la combinaison exclue (windows + 18) = 5 jobs en parallèle. Les matrices testent de nombreux environnements avec une seule définition de job ; `include` permet d'ajouter des combinaisons.",
    },
  },
  {
    id: 'gh-015',
    track: 'github',
    tier: 3,
    kind: 'command',
    concept: { en: "gh pr checkout", fr: "gh pr checkout" },
    prompt: {
      en: "A teammate asks you to test pull request #42 locally. Fetch its branch and switch to it with one GitHub CLI command.",
      fr: "Un collègue te demande de tester la pull request n°42 en local. Récupère sa branche et bascule dessus en une seule commande de la CLI GitHub.",
    },
    accepted: ['gh pr checkout 42'],
    hint: {
      en: "Same verb as the classic Git command for switching branches.",
      fr: "Le même verbe que la commande Git classique pour changer de branche.",
    },
    explanation: {
      en: "`gh pr checkout 42` fetches the PR's head branch, even from a contributor's fork, and checks it out locally. Running the code yourself is part of a thorough review: read the diff, test the behavior, then leave comments, approve or request changes.",
      fr: "`gh pr checkout 42` récupère la branche de la PR, même depuis le fork d'un contributeur, et l'extrait en local. Exécuter le code fait partie d'une revue sérieuse : lire le diff, tester le comportement, puis commenter, approuver ou demander des changements.",
    },
  },
  {
    id: 'gh-016',
    track: 'github',
    tier: 3,
    kind: 'output',
    concept: { en: "CODEOWNERS", fr: "CODEOWNERS" },
    prompt: {
      en: "A PR modifies only `src/README.md`. Which team is automatically requested for review?",
      fr: "Une PR modifie uniquement `src/README.md`. Quelle équipe est automatiquement sollicitée pour la revue ?",
    },
    code: `# .github/CODEOWNERS
*          @acme/core
*.md       @acme/writers
/src/      @acme/devs`,
    codeLang: 'text',
    accepted: ['@acme/devs', 'acme/devs'],
    hint: {
      en: "Several patterns match this file. In CODEOWNERS, position in the file decides who wins.",
      fr: "Plusieurs motifs correspondent à ce fichier. Dans CODEOWNERS, c'est la position dans le fichier qui décide.",
    },
    explanation: {
      en: "All three patterns match `src/README.md`, but in CODEOWNERS the LAST matching pattern takes precedence, so `/src/` wins and @acme/devs is requested. Combined with branch protection's \"Require review from Code Owners\", this guarantees experts approve changes to their area.",
      fr: "Les trois motifs correspondent à `src/README.md`, mais dans CODEOWNERS c'est le DERNIER motif correspondant qui l'emporte : `/src/` gagne et @acme/devs est sollicitée. Associé à l'option de protection « Require review from Code Owners », cela garantit que les experts valident les changements de leur domaine.",
    },
  },
  {
    id: 'gh-017',
    track: 'github',
    tier: 3,
    kind: 'order',
    concept: { en: "CI steps & artifacts", fr: "Étapes CI et artefacts" },
    prompt: {
      en: "Order the steps of this build job so it produces a downloadable `dist` artifact.",
      fr: "Ordonne les étapes de ce job de build pour qu'il produise un artefact `dist` téléchargeable.",
    },
    lines: [
      '- uses: actions/checkout@v4',
      '- uses: actions/setup-node@v4',
      '- run: npm ci',
      '- run: npm run build',
      '- uses: actions/upload-artifact@v4',
    ],
    hint: {
      en: "The runner starts empty: no code, no Node, no dependencies. Each step needs the previous one's result.",
      fr: "Le runner démarre vide : ni code, ni Node, ni dépendances. Chaque étape a besoin du résultat de la précédente.",
    },
    explanation: {
      en: "Every job starts on a fresh runner: first check out the code, install the toolchain, install dependencies (`npm ci`, ideally with `cache: npm` in setup-node), build, and finally upload the output with `upload-artifact` so other jobs or humans can download it.",
      fr: "Chaque job démarre sur un runner vierge : on récupère d'abord le code, on installe la chaîne d'outils, puis les dépendances (`npm ci`, idéalement avec `cache: npm` dans setup-node), on construit, et enfin on publie le résultat avec `upload-artifact` pour que d'autres jobs ou des humains puissent le télécharger.",
    },
  },

  // ───────────────────────── Tier 4 — Expert ─────────────────────────
  {
    id: 'gh-018',
    track: 'github',
    tier: 4,
    kind: 'riddle',
    concept: { en: "Dependabot", fr: "Dependabot" },
    prompt: {
      en: "I'm a tireless robot who reads your lockfiles.\nWhen a library you rely on gets a patch or a security fix,\nI open a pull request to bump it for you.\nConfigure me with a YAML file inside .github/. Who am I?",
      fr: "Je suis un robot infatigable qui lit tes fichiers de verrouillage.\nQuand une bibliothèque dont tu dépends reçoit un correctif de sécurité,\nj'ouvre une pull request pour la mettre à jour à ta place.\nOn me configure avec un fichier YAML dans .github/. Qui suis-je ?",
    },
    accepted: ['dependabot', 'dependa bot', 'depend a bot'],
    hint: {
      en: "I'm built into GitHub, and my name says what I watch over and what kind of worker I am.",
      fr: "Je suis intégré à GitHub, et mon nom dit ce que je surveille et quel genre de travailleur je suis.",
    },
    explanation: {
      en: "Dependabot raises alerts for vulnerable dependencies and opens PRs to update them (security and version updates, configured in `.github/dependabot.yml`). Combined with CI, each bump is tested automatically, keeping the supply chain patched with little effort.",
      fr: "Dependabot signale les dépendances vulnérables et ouvre des PR pour les mettre à jour (mises à jour de sécurité et de version, configurées dans `.github/dependabot.yml`). Avec la CI, chaque mise à jour est testée automatiquement : la chaîne d'approvisionnement reste à jour sans effort.",
    },
  },
  {
    id: 'gh-019',
    track: 'github',
    tier: 4,
    kind: 'bug',
    concept: { en: "Conditional jobs", fr: "Jobs conditionnels" },
    prompt: {
      en: "The deploy job should run only for pushes to `main`, but it is ALWAYS skipped. Which line is the bug?",
      fr: "Le job deploy ne doit tourner que pour les push sur `main`, mais il est TOUJOURS ignoré. Quelle ligne contient le bug ?",
    },
    lines: [
      'name: Deploy',
      'on: push',
      'jobs:',
      '  build:',
      '    runs-on: ubuntu-latest',
      '    steps:',
      '      - uses: actions/checkout@v4',
      '      - run: npm ci && npm run build',
      '  deploy:',
      '    needs: build',
      "    if: github.ref == 'main'",
      '    runs-on: ubuntu-latest',
      '    environment: production',
      '    steps:',
      '      - run: ./deploy.sh',
    ],
    bugLine: 10,
    hint: {
      en: "Print `github.ref` on a push to main: what does the full value look like?",
      fr: "Affiche `github.ref` lors d'un push sur main : à quoi ressemble la valeur complète ?",
    },
    explanation: {
      en: "`github.ref` holds the full reference, `refs/heads/main`, so comparing it with `'main'` is always false. Use `github.ref == 'refs/heads/main'` or `github.ref_name == 'main'`. `needs: build` correctly makes deploy wait for a successful build.",
      fr: "`github.ref` contient la référence complète, `refs/heads/main` : la comparer à `'main'` est toujours faux. Utilise `github.ref == 'refs/heads/main'` ou `github.ref_name == 'main'`. `needs: build` fait bien attendre au déploiement la réussite du build.",
    },
  },
  {
    id: 'gh-020',
    track: 'github',
    tier: 4,
    kind: 'fill',
    concept: { en: "Caching & secrets", fr: "Cache et secrets" },
    prompt: {
      en: "Complete the steps: the official action that caches files, its key that decides when the cache is reused, and the context that holds encrypted tokens.",
      fr: "Complète les étapes : l'action officielle qui met des fichiers en cache, sa clé qui décide quand le cache est réutilisé, et le contexte qui contient les jetons chiffrés.",
    },
    template: `    steps:
      - uses: actions/checkout@v4
      - uses: actions/___@v4
        with:
          path: ~/.npm
          ___: npm-\${{ runner.os }}-\${{ hashFiles('package-lock.json') }}
      - run: npm ci
      - run: ./deploy.sh
        env:
          API_TOKEN: \${{ ___.API_TOKEN }}`,
    blanks: [['cache'], ['key'], ['secrets']],
    hint: {
      en: "The action's name is the feature itself; the second blank is a word for something that opens a lock.",
      fr: "Le nom de l'action est la fonctionnalité elle-même ; le deuxième trou désigne, en anglais, l'objet qui ouvre une serrure.",
    },
    explanation: {
      en: "`actions/cache` restores a folder when the `key` matches; hashing the lockfile into the key means the cache is invalidated exactly when dependencies change. Tokens come from the `secrets` context, which keeps them encrypted and masked in logs.",
      fr: "`actions/cache` restaure un dossier quand la `key` correspond ; inclure le hash du lockfile dans la clé invalide le cache exactement quand les dépendances changent. Les jetons proviennent du contexte `secrets`, qui les garde chiffrés et masqués dans les logs.",
    },
  },
  {
    id: 'gh-021',
    track: 'github',
    tier: 4,
    kind: 'command',
    concept: { en: "GitHub Releases", fr: "GitHub Releases" },
    prompt: {
      en: "The tag `v2.0.0` is already pushed. Create a GitHub Release for it with the CLI, with release notes generated automatically.",
      fr: "Le tag `v2.0.0` est déjà poussé. Crée une GitHub Release pour ce tag avec la CLI, avec des notes de version générées automatiquement.",
    },
    accepted: [
      'gh release create v2.0.0 --generate-notes',
      'gh release create --generate-notes v2.0.0',
    ],
    hint: {
      en: "`gh release <verb> <tag>` plus a flag that \"generates notes\".",
      fr: "`gh release <verbe> <tag>` plus un flag qui « génère les notes ».",
    },
    explanation: {
      en: "A Release wraps a Git tag with notes and downloadable assets (binaries, archives). `--generate-notes` builds the changelog from merged PRs and contributors since the previous release; you can also attach files: `gh release create v2.0.0 ./dist/app.zip`.",
      fr: "Une Release enveloppe un tag Git avec des notes et des fichiers téléchargeables (binaires, archives). `--generate-notes` construit le changelog à partir des PR fusionnées et des contributeurs depuis la release précédente ; on peut aussi joindre des fichiers : `gh release create v2.0.0 ./dist/app.zip`.",
    },
  },
  {
    id: 'gh-022',
    track: 'github',
    tier: 4,
    kind: 'mcq',
    concept: { en: "Leaked credentials", fr: "Identifiants divulgués" },
    prompt: {
      en: "You accidentally pushed a Personal Access Token in a commit to a public repository. What should you do FIRST?",
      fr: "Tu as poussé par erreur un Personal Access Token dans un commit d'un dépôt public. Que faut-il faire EN PREMIER ?",
    },
    options: [
      { en: "Delete the commit and force-push", fr: "Supprimer le commit et faire un push forcé" },
      { en: "Revoke the token immediately and create a new one", fr: "Révoquer le jeton immédiatement et en créer un nouveau" },
      { en: "Make the repository private", fr: "Rendre le dépôt privé" },
      { en: "Add the file to .gitignore", fr: "Ajouter le fichier au .gitignore" },
    ],
    answer: 1,
    hint: {
      en: "Bots scan public commits within seconds. Can you be sure nobody copied it already?",
      fr: "Des robots scannent les commits publics en quelques secondes. Peux-tu être sûr que personne ne l'a déjà copié ?",
    },
    explanation: {
      en: "Once public, a secret must be considered compromised: rewriting history doesn't remove copies already scraped, so revoke and rotate it first, then clean history. Prevent it with secret scanning and push protection, store tokens in Actions secrets, and prefer short-lived, fine-grained PATs or SSH keys with minimal scope.",
      fr: "Une fois public, un secret doit être considéré comme compromis : réécrire l'historique n'efface pas les copies déjà aspirées. Il faut donc d'abord le révoquer et le remplacer, puis nettoyer l'historique. Préviens ce risque avec le secret scanning et la push protection, range les jetons dans les secrets Actions, et préfère des PAT à granularité fine et courte durée ou des clés SSH au périmètre minimal.",
    },
  },
];
