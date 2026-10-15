import type { Challenge } from '../types';

export const challenges: Challenge[] = [
  // ───────────────────────── Tier 1 — Novice ─────────────────────────
  {
    id: 'git-001',
    track: 'git',
    tier: 1,
    kind: 'mcq',
    concept: { en: "Version control", fr: "Gestion de versions" },
    prompt: {
      en: "What is the main job of a version control system (VCS) like Git?",
      fr: "Quel est le rôle principal d'un système de gestion de versions (VCS) comme Git ?",
    },
    options: [
      { en: "Compiling source code into an executable", fr: "Compiler le code source en exécutable" },
      { en: "Recording the history of changes so you can go back in time and collaborate safely", fr: "Enregistrer l'historique des modifications pour revenir en arrière et collaborer sans risque" },
      { en: "Hosting websites on the internet", fr: "Héberger des sites web sur Internet" },
      { en: "Automatically fixing bugs in your code", fr: "Corriger automatiquement les bugs du code" },
    ],
    answer: 1,
    hint: {
      en: "Think of a time machine plus a logbook for your project's files.",
      fr: "Pense à une machine à remonter le temps doublée d'un journal de bord pour les fichiers du projet.",
    },
    explanation: {
      en: "A VCS records snapshots of your project over time: who changed what, when and why. You can compare versions, restore old ones and let several people work in parallel without overwriting each other. Git is distributed: every clone holds the full history.",
      fr: "Un VCS enregistre des instantanés du projet au fil du temps : qui a changé quoi, quand et pourquoi. On peut comparer des versions, restaurer les anciennes et travailler à plusieurs en parallèle sans s'écraser. Git est distribué : chaque clone contient tout l'historique.",
    },
  },
  {
    id: 'git-002',
    track: 'git',
    tier: 1,
    kind: 'command',
    concept: { en: "git init", fr: "git init" },
    prompt: {
      en: "Turn the current folder into a brand-new Git repository.",
      fr: "Transforme le dossier courant en un tout nouveau dépôt Git.",
    },
    accepted: ['git init', 'git init .'],
    hint: {
      en: "The command name means \"initialize\".",
      fr: "Le nom de la commande signifie « initialiser ».",
    },
    explanation: {
      en: "`git init` creates a hidden `.git` folder that stores the whole history and configuration. Your files are not tracked yet: you still have to add and commit them. To copy an existing remote repository instead, you would use `git clone <url>`.",
      fr: "`git init` crée un dossier caché `.git` qui contient tout l'historique et la configuration. Tes fichiers ne sont pas encore suivis : il faut encore les ajouter puis les committer. Pour copier un dépôt distant existant, on utiliserait plutôt `git clone <url>`.",
    },
  },
  {
    id: 'git-003',
    track: 'git',
    tier: 1,
    kind: 'mcq',
    concept: { en: "The three areas", fr: "Les trois zones" },
    prompt: {
      en: "You edit `notes.txt` and run `git add notes.txt`. Where does the change now live?",
      fr: "Tu modifies `notes.txt` puis tu lances `git add notes.txt`. Où se trouve maintenant la modification ?",
    },
    code: `$ git add notes.txt`,
    codeLang: 'bash',
    options: [
      { en: "Only in the working directory", fr: "Seulement dans le répertoire de travail" },
      { en: "In the repository history, as a new commit", fr: "Dans l'historique du dépôt, sous forme de nouveau commit" },
      { en: "In the staging area (the index), ready for the next commit", fr: "Dans la zone de transit (l'index), prête pour le prochain commit" },
      { en: "On the remote server", fr: "Sur le serveur distant" },
    ],
    answer: 2,
    hint: {
      en: "`git add` prepares; it does not record history yet.",
      fr: "`git add` prépare ; il n'enregistre pas encore l'historique.",
    },
    explanation: {
      en: "Git has three areas: the working directory (your files), the staging area or index (what will go into the next commit) and the repository (the committed history). `git add` moves changes into the staging area; only `git commit` turns them into a permanent snapshot.",
      fr: "Git a trois zones : le répertoire de travail (tes fichiers), la zone de transit ou index (ce qui ira dans le prochain commit) et le dépôt (l'historique commité). `git add` place les modifications dans l'index ; seul `git commit` en fait un instantané permanent.",
    },
  },
  {
    id: 'git-004',
    track: 'git',
    tier: 1,
    kind: 'output',
    concept: { en: "Untracked files", fr: "Fichiers non suivis" },
    prompt: {
      en: "What does the last command print? (one line)",
      fr: "Qu'affiche la dernière commande ? (une ligne)",
    },
    code: `$ git init -b main
$ echo "hi" > notes.txt
$ git status -s`,
    codeLang: 'bash',
    accepted: ['?? notes.txt'],
    hint: {
      en: "Git has never heard of this file: the short status uses two identical symbols for that.",
      fr: "Git n'a jamais entendu parler de ce fichier : le statut court utilise deux symboles identiques pour ça.",
    },
    explanation: {
      en: "In short status, `??` means untracked: the file exists in the working directory but Git is not following it yet. After `git add notes.txt` it would become `A  notes.txt` (added to the staging area).",
      fr: "En statut court, `??` signifie non suivi : le fichier existe dans le répertoire de travail mais Git ne le suit pas encore. Après `git add notes.txt`, on verrait `A  notes.txt` (ajouté à l'index).",
    },
  },
  {
    id: 'git-005',
    track: 'git',
    tier: 1,
    kind: 'riddle',
    concept: { en: "Commit", fr: "Commit" },
    prompt: {
      en: "I am a snapshot frozen in time,\nwith an author, a date and a message of mine.\nA long hash is my name, my parent I recall:\nchain us together and you have history after all.\nWhat am I?",
      fr: "Je suis un instantané figé dans le temps,\navec un auteur, une date et un message parlant.\nUn long hash est mon nom, je connais mon parent :\nenchaîne-nous et voilà l'historique du projet, tout simplement.\nQui suis-je ?",
    },
    accepted: ['commit', 'commits', 'a commit', 'un commit', 'git commit'],
    hint: {
      en: "You create me right after staging your changes.",
      fr: "On me crée juste après avoir indexé ses modifications.",
    },
    explanation: {
      en: "A commit is an immutable snapshot of the staged files, identified by a SHA hash and pointing to its parent commit(s). This chain of commits is the project history that `git log` displays.",
      fr: "Un commit est un instantané immuable des fichiers indexés, identifié par un hash SHA et pointant vers son ou ses parents. Cette chaîne de commits forme l'historique du projet qu'affiche `git log`.",
    },
  },
  {
    id: 'git-006',
    track: 'git',
    tier: 1,
    kind: 'fill',
    concept: { en: "Add & commit", fr: "Add & commit" },
    prompt: {
      en: "Fill in the blanks: first stage `notes.txt`, then record it in history with a message.",
      fr: "Complète les trous : d'abord indexer `notes.txt`, puis l'enregistrer dans l'historique avec un message.",
    },
    template: `$ git ___ notes.txt
$ git ___ -m "Add notes"`,
    blanks: [['add', 'stage'], ['commit']],
    hint: {
      en: "Step one prepares, step two saves the snapshot.",
      fr: "La première étape prépare, la seconde enregistre l'instantané.",
    },
    explanation: {
      en: "`git add` stages changes and `git commit -m \"...\"` saves everything staged as one commit. Staging lets you choose exactly what goes into each commit, so you can make small, focused commits.",
      fr: "`git add` indexe les modifications et `git commit -m \"...\"` enregistre tout ce qui est indexé en un seul commit. L'index permet de choisir précisément le contenu de chaque commit, pour des commits petits et ciblés.",
    },
  },

  // ───────────────────────── Tier 2 — Apprentice ─────────────────────────
  {
    id: 'git-007',
    track: 'git',
    tier: 2,
    kind: 'bug',
    concept: { en: ".gitignore patterns", fr: "Motifs .gitignore" },
    prompt: {
      en: "This .gitignore should ignore dependencies, build output, secrets and every .log file. Yet `git status` still lists `debug.log`. Which line is the bug?",
      fr: "Ce .gitignore doit ignorer les dépendances, le build, les secrets et tous les fichiers .log. Pourtant `git status` affiche encore `debug.log`. Quelle ligne contient le bug ?",
    },
    lines: [
      '# Dependencies',
      'node_modules/',
      '# Build output',
      'dist/',
      '# Secrets',
      '.env',
      '# Logs',
      '*.log/',
    ],
    bugLine: 7,
    hint: {
      en: "Look at what a trailing slash means in a .gitignore pattern.",
      fr: "Regarde ce que signifie une barre oblique finale dans un motif .gitignore.",
    },
    explanation: {
      en: "A trailing `/` makes a pattern match directories only, so `*.log/` ignores folders named like `x.log` but not the file `debug.log`. Use `*.log`. Also remember that .gitignore only affects untracked files: an already committed file must be removed with `git rm --cached`.",
      fr: "Une `/` finale fait correspondre le motif uniquement à des dossiers : `*.log/` ignore des dossiers comme `x.log` mais pas le fichier `debug.log`. Il faut écrire `*.log`. Rappel : .gitignore n'agit que sur les fichiers non suivis ; un fichier déjà commité doit être retiré avec `git rm --cached`.",
    },
  },
  {
    id: 'git-008',
    track: 'git',
    tier: 2,
    kind: 'command',
    concept: { en: "Create a branch", fr: "Créer une branche" },
    prompt: {
      en: "In one command, create a new branch named `feature/login` and switch to it.",
      fr: "En une seule commande, crée une nouvelle branche nommée `feature/login` et bascule dessus.",
    },
    accepted: [
      'git switch -c feature/login',
      'git switch --create feature/login',
      'git checkout -b feature/login',
    ],
    hint: {
      en: "The modern command is `git switch` with the \"create\" option; the classic one is `git checkout` with `-b`.",
      fr: "La commande moderne est `git switch` avec l'option « create » ; la classique est `git checkout` avec `-b`.",
    },
    explanation: {
      en: "A branch is just a lightweight movable pointer to a commit, so creating one is instant. `git switch -c` (or the older `git checkout -b`) creates the branch at the current commit and moves HEAD onto it, so your next commits land there and leave `main` untouched.",
      fr: "Une branche n'est qu'un pointeur léger et mobile vers un commit : la créer est instantané. `git switch -c` (ou l'ancien `git checkout -b`) crée la branche sur le commit courant et y déplace HEAD : tes prochains commits iront là, sans toucher à `main`.",
    },
  },
  {
    id: 'git-009',
    track: 'git',
    tier: 2,
    kind: 'order',
    concept: { en: "Contribution workflow", fr: "Flux de contribution" },
    prompt: {
      en: "Put these commands in order: copy a remote project, work on a new branch, and publish that branch.",
      fr: "Remets ces commandes dans l'ordre : copier un projet distant, travailler sur une nouvelle branche et publier cette branche.",
    },
    lines: [
      'git clone https://github.com/ada/notes.git',
      'cd notes',
      'git switch -c add-todo',
      'git add todo.md',
      'git commit -m "Add todo list"',
      'git push -u origin add-todo',
    ],
    hint: {
      en: "You can't enter a folder that doesn't exist yet, and you can't push what you haven't committed.",
      fr: "On ne peut pas entrer dans un dossier qui n'existe pas encore, ni pousser ce qu'on n'a pas commité.",
    },
    explanation: {
      en: "`git clone` downloads the full repository and sets up the `origin` remote. You then branch, stage, commit, and finally `git push -u` sends the branch to `origin` and links it as upstream so later `git push` / `git pull` need no arguments.",
      fr: "`git clone` télécharge tout le dépôt et configure le dépôt distant `origin`. On crée ensuite une branche, on indexe, on commite, puis `git push -u` envoie la branche vers `origin` et la lie en amont : les `git push` / `git pull` suivants n'auront plus besoin d'arguments.",
    },
  },
  {
    id: 'git-010',
    track: 'git',
    tier: 2,
    kind: 'output',
    concept: { en: "Three-way merge", fr: "Fusion à trois points" },
    prompt: {
      en: "How many lines does the last command print (i.e. how many commits are in main's history)?",
      fr: "Combien de lignes affiche la dernière commande (c'est-à-dire combien de commits dans l'historique de main) ?",
    },
    code: `$ git init -b main
$ echo a > a.txt && git add a.txt && git commit -m "Add a"
$ git switch -c feature
$ echo b > b.txt && git add b.txt && git commit -m "Add b"
$ git switch main
$ echo c > c.txt && git add c.txt && git commit -m "Add c"
$ git merge feature -m "Merge feature"
$ git log --oneline`,
    codeLang: 'bash',
    accepted: ['4'],
    hint: {
      en: "Both branches moved forward after they split. Can Git simply slide main forward, or does it need something extra?",
      fr: "Les deux branches ont avancé après leur séparation. Git peut-il simplement avancer main, ou lui faut-il quelque chose en plus ?",
    },
    explanation: {
      en: "Since main and feature diverged, Git cannot fast-forward; it performs a three-way merge and creates a merge commit with two parents. History: Add a, Add b, Add c and Merge feature = 4. Without the \"Add c\" commit, the merge would have been a fast-forward with no merge commit (3 lines).",
      fr: "Comme main et feature ont divergé, Git ne peut pas faire d'avance rapide (fast-forward) : il réalise une fusion à trois points et crée un commit de fusion à deux parents. Historique : Add a, Add b, Add c et Merge feature = 4. Sans le commit « Add c », la fusion aurait été un fast-forward, sans commit de fusion (3 lignes).",
    },
  },
  {
    id: 'git-011',
    track: 'git',
    tier: 2,
    kind: 'fill',
    concept: { en: "Conflict markers", fr: "Marqueurs de conflit" },
    prompt: {
      en: "A merge conflict left these markers in `config.txt`. Fill in the three missing markers (start of your version, separator, end of the incoming version).",
      fr: "Un conflit de fusion a laissé ces marqueurs dans `config.txt`. Complète les trois marqueurs manquants (début de ta version, séparateur, fin de la version entrante).",
    },
    template: `___ HEAD
color = "blue"
___
color = "green"
___ feature`,
    blanks: [['<<<<<<<'], ['======='], ['>>>>>>>']],
    hint: {
      en: "Each marker is the same character repeated seven times: arrows pointing in, equals signs, arrows pointing out.",
      fr: "Chaque marqueur est le même caractère répété sept fois : chevrons ouvrants, signes égal, chevrons fermants.",
    },
    explanation: {
      en: "Between `<<<<<<< HEAD` and `=======` is your current branch's version; between `=======` and `>>>>>>> feature` is the incoming one. To resolve, edit the file to the desired content, delete all markers, then `git add config.txt` and `git commit` to conclude the merge.",
      fr: "Entre `<<<<<<< HEAD` et `=======` se trouve la version de ta branche courante ; entre `=======` et `>>>>>>> feature`, la version entrante. Pour résoudre : édite le fichier pour garder le bon contenu, supprime tous les marqueurs, puis `git add config.txt` et `git commit` pour terminer la fusion.",
    },
  },
  {
    id: 'git-012',
    track: 'git',
    tier: 2,
    kind: 'riddle',
    concept: { en: "Stash", fr: "Stash (remise)" },
    prompt: {
      en: "Called away mid-task, your desk is a mess?\nI sweep your unfinished changes into a hidden pocket,\nleaving a clean working tree without a single commit.\nSay \"pop\" and I hand everything back. What am I?",
      fr: "Appelé ailleurs en plein travail, ton bureau est en désordre ?\nJe range tes modifications inachevées dans une poche cachée,\net te laisse un répertoire propre sans le moindre commit.\nDis « pop » et je te rends tout. Qui suis-je ?",
    },
    accepted: ['stash', 'git stash', 'the stash', 'remise', 'la remise'],
    hint: {
      en: "The English word means to hide something away for later.",
      fr: "Le mot anglais signifie mettre quelque chose de côté, en cachette, pour plus tard.",
    },
    explanation: {
      en: "`git stash` saves your uncommitted changes on a stack and restores a clean working tree, so you can switch branches to fix something urgent. `git stash pop` reapplies the latest entry and removes it from the stack; `git stash list` shows what is stored.",
      fr: "`git stash` met tes modifications non commitées sur une pile et rétablit un répertoire de travail propre, pour changer de branche et corriger une urgence. `git stash pop` réapplique la dernière entrée et la retire de la pile ; `git stash list` montre ce qui est stocké.",
    },
  },

  // ───────────────────────── Tier 3 — Adept ─────────────────────────
  {
    id: 'git-013',
    track: 'git',
    tier: 3,
    kind: 'command',
    concept: { en: "Push & upstream", fr: "Push et branche amont" },
    prompt: {
      en: "Your local branch `feature/login` has never been pushed. Push it to `origin` AND set it as the upstream branch.",
      fr: "Ta branche locale `feature/login` n'a jamais été poussée. Pousse-la vers `origin` ET définis-la comme branche amont (upstream).",
    },
    accepted: [
      'git push -u origin feature/login',
      'git push --set-upstream origin feature/login',
      'git push origin -u feature/login',
      'git push origin feature/login -u',
      'git push origin --set-upstream feature/login',
      'git push origin feature/login --set-upstream',
    ],
    hint: {
      en: "`git push <remote> <branch>` plus a short flag that \"sets upstream\".",
      fr: "`git push <dépôt> <branche>` plus un flag court qui « définit l'amont ».",
    },
    explanation: {
      en: "`-u` (`--set-upstream`) records that your local branch tracks `origin/feature/login`. Afterwards, plain `git push` and `git pull` know where to go, and `git status` tells you if you are ahead or behind. Remember: `git pull` = `git fetch` (download) + merge.",
      fr: "`-u` (`--set-upstream`) enregistre que ta branche locale suit `origin/feature/login`. Ensuite, un simple `git push` ou `git pull` sait où aller, et `git status` indique si tu es en avance ou en retard. Rappel : `git pull` = `git fetch` (téléchargement) + fusion.",
    },
  },
  {
    id: 'git-014',
    track: 'git',
    tier: 3,
    kind: 'fill',
    concept: { en: "Interactive rebase", fr: "Rebase interactif" },
    prompt: {
      en: "Start an interactive rebase of the last 3 commits, then combine the two \"fix\" commits into the first one while keeping their messages for editing.",
      fr: "Lance un rebase interactif des 3 derniers commits, puis fusionne les deux commits « fix » dans le premier en conservant leurs messages pour les éditer.",
    },
    template: `$ git rebase ___ HEAD~3

pick a1b2c3d feat: add login form
___ d4e5f6a fix typo in login form
___ 9b8c7d6 fix lint in login form`,
    blanks: [['-i', '--interactive'], ['squash', 's'], ['squash', 's']],
    hint: {
      en: "The flag stands for \"interactive\"; the action word means to crush things together.",
      fr: "Le flag signifie « interactif » ; le mot d'action veut dire écraser, tasser ensemble.",
    },
    explanation: {
      en: "`git rebase -i` opens a todo list where each commit gets an action. `squash` melds a commit into the one above and lets you edit the combined message (`fixup` does the same but discards the message). It's the classic way to clean up a branch before opening a pull request.",
      fr: "`git rebase -i` ouvre une liste où chaque commit reçoit une action. `squash` fusionne un commit dans celui du dessus et permet d'éditer le message combiné (`fixup` fait pareil mais jette le message). C'est la méthode classique pour nettoyer une branche avant d'ouvrir une pull request.",
    },
  },
  {
    id: 'git-015',
    track: 'git',
    tier: 3,
    kind: 'output',
    concept: { en: "reset --soft", fr: "reset --soft" },
    prompt: {
      en: "What does the last command print? (one line)",
      fr: "Qu'affiche la dernière commande ? (une ligne)",
    },
    code: `$ git init -b main
$ echo a > a.txt && git add a.txt && git commit -m "Add a"
$ echo b > b.txt && git add b.txt && git commit -m "Add b"
$ git reset --soft HEAD~1
$ git status -s`,
    codeLang: 'bash',
    accepted: ['A  b.txt', 'A b.txt'],
    hint: {
      en: "A soft reset moves the branch pointer back but does not touch the staging area.",
      fr: "Un reset soft recule le pointeur de branche mais ne touche pas à l'index.",
    },
    explanation: {
      en: "`--soft` undoes the commit but keeps its changes staged, so `b.txt` shows as `A ` (added, staged). `--mixed` (the default) would also unstage it (`?? b.txt`), and `--hard` would delete the change entirely. Never reset commits already pushed to a shared branch: use `git revert` there.",
      fr: "`--soft` annule le commit mais garde ses modifications indexées : `b.txt` apparaît en `A ` (ajouté, indexé). `--mixed` (par défaut) le désindexerait aussi (`?? b.txt`) et `--hard` effacerait complètement la modification. Ne fais jamais de reset sur des commits déjà poussés sur une branche partagée : utilise `git revert`.",
    },
  },
  {
    id: 'git-016',
    track: 'git',
    tier: 3,
    kind: 'mcq',
    concept: { en: "Rebase vs merge", fr: "Rebase ou merge" },
    prompt: {
      en: "You and a teammate both pushed commits to the shared branch `feature/cart`. Which action is risky?",
      fr: "Toi et un collègue avez poussé des commits sur la branche partagée `feature/cart`. Quelle action est risquée ?",
    },
    options: [
      { en: "Merging `main` into `feature/cart`", fr: "Fusionner `main` dans `feature/cart`" },
      { en: "Running `git fetch` to see the latest commits", fr: "Lancer `git fetch` pour voir les derniers commits" },
      { en: "Rebasing your local, never-pushed commits on top of `origin/feature/cart`", fr: "Rebaser tes commits locaux jamais poussés sur `origin/feature/cart`" },
      { en: "Rebasing `feature/cart` onto `main` and force-pushing it", fr: "Rebaser `feature/cart` sur `main` puis faire un push forcé" },
    ],
    answer: 3,
    hint: {
      en: "Which action rewrites commits that other people already have?",
      fr: "Quelle action réécrit des commits que d'autres personnes possèdent déjà ?",
    },
    explanation: {
      en: "Rebase replays commits and gives them new hashes, producing a clean linear history; merge keeps history as it happened and adds a merge commit. The golden rule: never rebase commits others have already pulled, because force-pushing rewritten history breaks their copies. Rebasing local-only work is perfectly fine.",
      fr: "Le rebase rejoue les commits avec de nouveaux hashs et produit un historique linéaire ; le merge conserve l'historique réel et ajoute un commit de fusion. Règle d'or : ne jamais rebaser des commits que d'autres ont déjà récupérés, car le push forcé d'un historique réécrit casse leurs copies. Rebaser du travail purement local ne pose aucun problème.",
    },
  },
  {
    id: 'git-017',
    track: 'git',
    tier: 3,
    kind: 'bug',
    concept: { en: "Conventional Commits", fr: "Conventional Commits" },
    prompt: {
      en: "The team follows the Conventional Commits spec. Which commit message breaks the convention?",
      fr: "L'équipe suit la spécification Conventional Commits. Quel message de commit enfreint la convention ?",
    },
    lines: [
      'feat(auth): add GitHub login',
      'fix(cart): prevent negative quantities',
      'docs: explain how to run tests',
      'Fixed some stuff',
      'chore(deps): bump vite to 5.4.2',
      'refactor!: drop Node 16 support',
    ],
    bugLine: 3,
    hint: {
      en: "The format is `type(optional scope): description`.",
      fr: "Le format est `type(portée optionnelle): description`.",
    },
    explanation: {
      en: "Conventional Commits require a type such as `feat`, `fix`, `docs` or `chore`, an optional scope, a colon and an imperative description; `!` flags a breaking change. \"Fixed some stuff\" has no type and says nothing useful. Structured messages let tools generate changelogs and pick the next semantic version automatically.",
      fr: "Conventional Commits impose un type comme `feat`, `fix`, `docs` ou `chore`, une portée optionnelle, deux-points et une description à l'impératif ; `!` signale un changement cassant. « Fixed some stuff » n'a pas de type et n'apprend rien. Des messages structurés permettent de générer les changelogs et de choisir automatiquement la prochaine version sémantique.",
    },
  },

  // ───────────────────────── Tier 4 — Expert ─────────────────────────
  {
    id: 'git-018',
    track: 'git',
    tier: 4,
    kind: 'command',
    concept: { en: "git revert", fr: "git revert" },
    prompt: {
      en: "Commit `a1b2c3d` was already pushed to the shared `main` branch and broke the build. Undo it safely, without rewriting history.",
      fr: "Le commit `a1b2c3d` a déjà été poussé sur la branche partagée `main` et a cassé le build. Annule-le proprement, sans réécrire l'historique.",
    },
    accepted: ['git revert a1b2c3d'],
    patterns: ['git revert (--no-edit )?a1b2c3d( --no-edit)?'],
    hint: {
      en: "You want a NEW commit that does the opposite of the bad one.",
      fr: "Tu veux un NOUVEAU commit qui fait l'inverse du mauvais.",
    },
    explanation: {
      en: "`git revert` creates a new commit that applies the inverse of the target commit, so history only moves forward and teammates can pull normally. `git reset` would rewrite history and force everyone to deal with diverged branches; keep it for local, unpushed work.",
      fr: "`git revert` crée un nouveau commit qui applique l'inverse du commit visé : l'historique ne fait qu'avancer et les collègues peuvent faire un pull normalement. `git reset` réécrirait l'historique et provoquerait des branches divergentes ; réserve-le au travail local non poussé.",
    },
  },
  {
    id: 'git-019',
    track: 'git',
    tier: 4,
    kind: 'command',
    concept: { en: "Cherry-pick", fr: "Cherry-pick" },
    prompt: {
      en: "A hotfix lives in commit `9f8e7d6` on another branch. Apply just that one commit onto your current branch.",
      fr: "Un correctif se trouve dans le commit `9f8e7d6` sur une autre branche. Applique uniquement ce commit sur ta branche courante.",
    },
    accepted: ['git cherry-pick 9f8e7d6'],
    patterns: ['git cherry-pick (-x )?9f8e7d6( -x)?'],
    hint: {
      en: "Like picking a single cherry from the tree.",
      fr: "Comme cueillir une seule cerise sur l'arbre.",
    },
    explanation: {
      en: "`git cherry-pick` copies the changes of one commit and creates a new commit (with a new hash) on the current branch. It's ideal for backporting a fix to a release branch; the `-x` flag records the original hash in the message for traceability.",
      fr: "`git cherry-pick` copie les modifications d'un commit et crée un nouveau commit (avec un nouveau hash) sur la branche courante. Idéal pour reporter un correctif sur une branche de release ; le flag `-x` ajoute le hash d'origine au message pour la traçabilité.",
    },
  },
  {
    id: 'git-020',
    track: 'git',
    tier: 4,
    kind: 'order',
    concept: { en: "Tagging a release", fr: "Taguer une version" },
    prompt: {
      en: "Put these commands in order to ship release 1.3.0: update main, merge the release branch, tag it and publish everything.",
      fr: "Remets ces commandes dans l'ordre pour livrer la version 1.3.0 : mettre main à jour, fusionner la branche de release, taguer et tout publier.",
    },
    lines: [
      'git switch main',
      'git pull',
      'git merge --no-ff release/1.3.0',
      'git tag -a v1.3.0 -m "Release 1.3.0"',
      'git push origin main --follow-tags',
    ],
    hint: {
      en: "A tag points at a commit, so the commit you want to tag must exist first.",
      fr: "Un tag pointe vers un commit : le commit à taguer doit donc exister d'abord.",
    },
    explanation: {
      en: "You switch to main, pull the latest work, merge the release, then create an annotated tag on that merge commit and push both the branch and its tags. Version numbers follow semantic versioning MAJOR.MINOR.PATCH: 1.3.0 means new backward-compatible features since 1.2.x.",
      fr: "On bascule sur main, on récupère les derniers changements, on fusionne la release, puis on crée un tag annoté sur ce commit de fusion et on pousse la branche avec ses tags. Les numéros suivent le versionnage sémantique MAJEUR.MINEUR.CORRECTIF : 1.3.0 signale de nouvelles fonctionnalités rétrocompatibles depuis 1.2.x.",
    },
  },
  {
    id: 'git-021',
    track: 'git',
    tier: 4,
    kind: 'riddle',
    concept: { en: "git bisect", fr: "git bisect" },
    prompt: {
      en: "Somewhere among a thousand commits, a bug was born.\nTell me one commit that's good and one that's bad,\nand I'll cut history in half, again and again,\nuntil the guilty commit stands alone. What am I?",
      fr: "Quelque part parmi mille commits, un bug est né.\nDonne-moi un commit sain et un commit malade,\net je couperai l'historique en deux, encore et encore,\njusqu'à ce que le coupable reste seul. Qui suis-je ?",
    },
    accepted: ['bisect', 'git bisect', 'bissection', 'dichotomie', 'recherche dichotomique', 'binary search'],
    hint: {
      en: "It's a binary search through history; the command name comes from \"cut in two\".",
      fr: "C'est une recherche dichotomique dans l'historique ; le nom de la commande vient de « couper en deux ».",
    },
    explanation: {
      en: "`git bisect start`, then `git bisect bad` and `git bisect good <commit>`: Git checks out the midpoint (in detached HEAD state) and you mark it good or bad. Each answer halves the range, so 1,000 commits take only about 10 steps. `git bisect run <script>` can even automate the testing.",
      fr: "`git bisect start`, puis `git bisect bad` et `git bisect good <commit>` : Git extrait le commit du milieu (en HEAD détachée) et tu le marques bon ou mauvais. Chaque réponse divise l'intervalle par deux : 1 000 commits ne demandent qu'environ 10 étapes. `git bisect run <script>` peut même automatiser les tests.",
    },
  },
  {
    id: 'git-022',
    track: 'git',
    tier: 4,
    kind: 'mcq',
    concept: { en: "Reflog recovery", fr: "Récupérer via reflog" },
    prompt: {
      en: "Oops: you ran `git reset --hard HEAD~2` and your last two commits vanished from `git log`. Which command helps you find them again?",
      fr: "Oups : tu as lancé `git reset --hard HEAD~2` et tes deux derniers commits ont disparu de `git log`. Quelle commande t'aide à les retrouver ?",
    },
    code: `$ git reset --hard HEAD~2
HEAD is now at 3c4d5e6 Add login form`,
    codeLang: 'bash',
    options: [
      { en: "`git reflog`", fr: "`git reflog`" },
      { en: "`git stash list`", fr: "`git stash list`" },
      { en: "`git bisect`", fr: "`git bisect`" },
      { en: "`git log --all`", fr: "`git log --all`" },
    ],
    answer: 0,
    hint: {
      en: "You need a log of where HEAD has been, not a log of the branch.",
      fr: "Il te faut le journal des positions de HEAD, pas celui de la branche.",
    },
    explanation: {
      en: "The reflog records every position HEAD and branches have pointed to, even commits no longer reachable from any branch. Find the entry before the reset (e.g. `HEAD@{1}`) and run `git reset --hard HEAD@{1}` or create a branch there. Unreachable commits are kept for a while (90 days by default) before garbage collection.",
      fr: "Le reflog enregistre chaque position prise par HEAD et les branches, même vers des commits qui ne sont plus accessibles depuis une branche. Repère l'entrée d'avant le reset (par ex. `HEAD@{1}`) puis lance `git reset --hard HEAD@{1}` ou crée une branche à cet endroit. Les commits orphelins sont conservés un moment (90 jours par défaut) avant le ramasse-miettes.",
    },
  },
];
