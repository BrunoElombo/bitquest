import type { Challenge } from '../types';

export const challenges: Challenge[] = [
  // ───────────────────────── Tier 1 — Novice ─────────────────────────
  {
    id: 'devops-001',
    track: 'devops',
    tier: 1,
    kind: 'mcq',
    concept: { en: "DevOps culture", fr: "Culture DevOps" },
    prompt: {
      en: "What best describes DevOps?",
      fr: "Qu'est-ce qui décrit le mieux le DevOps ?",
    },
    options: [
      { en: "A job title for the person who restarts servers", fr: "Un intitulé de poste pour la personne qui redémarre les serveurs" },
      { en: "A culture and set of practices that unite development and operations to ship faster and more reliably through automation and shared responsibility", fr: "Une culture et un ensemble de pratiques qui réunissent développement et exploitation pour livrer plus vite et plus sûrement grâce à l'automatisation et à la responsabilité partagée" },
      { en: "A programming language for writing infrastructure", fr: "Un langage de programmation pour écrire l'infrastructure" },
      { en: "A cloud provider", fr: "Un fournisseur cloud" },
    ],
    answer: 1,
    hint: {
      en: "The name merges two teams that used to work in silos.",
      fr: "Le nom fusionne deux équipes qui travaillaient autrefois en silos.",
    },
    explanation: {
      en: "DevOps breaks the wall between \"devs who write code\" and \"ops who run it\". Teams own their software end to end, automate builds, tests and deployments (CI/CD), measure everything and learn from incidents, which yields small, frequent and safer releases.",
      fr: "Le DevOps abat le mur entre « les devs qui écrivent le code » et « les ops qui le font tourner ». Les équipes sont responsables de leur logiciel de bout en bout, automatisent builds, tests et déploiements (CI/CD), mesurent tout et apprennent des incidents : on obtient des livraisons petites, fréquentes et plus sûres.",
    },
  },
  {
    id: 'devops-002',
    track: 'devops',
    tier: 1,
    kind: 'mcq',
    concept: { en: "Containers vs VMs", fr: "Conteneurs ou VM" },
    prompt: {
      en: "What is the key difference between a container and a virtual machine?",
      fr: "Quelle est la différence essentielle entre un conteneur et une machine virtuelle ?",
    },
    options: [
      { en: "Containers are always slower than VMs", fr: "Les conteneurs sont toujours plus lents que les VM" },
      { en: "VMs share the host's kernel, containers don't", fr: "Les VM partagent le noyau de l'hôte, pas les conteneurs" },
      { en: "Containers each run a full guest operating system on a hypervisor", fr: "Chaque conteneur exécute un système d'exploitation invité complet sur un hyperviseur" },
      { en: "Containers share the host's OS kernel and only isolate processes, so they are lighter and start in seconds", fr: "Les conteneurs partagent le noyau du système hôte et isolent seulement les processus : ils sont plus légers et démarrent en quelques secondes" },
    ],
    answer: 3,
    hint: {
      en: "Which one has to boot an entire operating system?",
      fr: "Lequel doit démarrer un système d'exploitation entier ?",
    },
    explanation: {
      en: "A VM virtualizes hardware and runs its own full OS on a hypervisor, which costs gigabytes and minutes. A container is an isolated process sharing the host kernel, packaging only the app and its dependencies: megabytes and seconds. VMs give stronger isolation; containers give density and portability.",
      fr: "Une VM virtualise le matériel et exécute son propre OS complet sur un hyperviseur : des gigaoctets et des minutes. Un conteneur est un processus isolé qui partage le noyau de l'hôte et n'embarque que l'application et ses dépendances : des mégaoctets et des secondes. Les VM isolent davantage ; les conteneurs offrent densité et portabilité.",
    },
  },
  {
    id: 'devops-003',
    track: 'devops',
    tier: 1,
    kind: 'riddle',
    concept: { en: "Image vs container", fr: "Image ou conteneur" },
    prompt: {
      en: "I'm a read-only template, built layer upon layer\nfrom the recipe of a Dockerfile.\nPush me to a registry and anyone can pull me;\nrun me, and I come alive as a container. What am I?",
      fr: "Je suis un modèle en lecture seule, construit couche après couche\nà partir de la recette d'un Dockerfile.\nPousse-moi dans un registre et chacun pourra me tirer ;\nlance-moi, et je prends vie sous forme de conteneur. Qui suis-je ?",
    },
    accepted: ['image', 'images', 'docker image', 'container image', 'image docker', 'image de conteneur', 'une image'],
    hint: {
      en: "If a container is the running program, I'm the file you start it from. Think class versus object.",
      fr: "Si le conteneur est le programme en cours d'exécution, je suis le fichier à partir duquel on le lance. Pense classe contre objet.",
    },
    explanation: {
      en: "An image is an immutable package (filesystem layers + metadata) built with `docker build` and stored in a registry like Docker Hub. A container is a running instance of an image with its own writable layer: you can start many containers from one image, just like many objects from one class.",
      fr: "Une image est un paquet immuable (couches de système de fichiers + métadonnées) construit avec `docker build` et stocké dans un registre comme Docker Hub. Un conteneur est une instance en cours d'exécution d'une image, avec sa propre couche inscriptible : on peut lancer plusieurs conteneurs depuis une image, comme plusieurs objets depuis une classe.",
    },
  },
  {
    id: 'devops-004',
    track: 'devops',
    tier: 1,
    kind: 'command',
    concept: { en: "docker run", fr: "docker run" },
    prompt: {
      en: "Start an `nginx` container in the background (detached), name it `web`, and map port 8080 on your machine to port 80 in the container.",
      fr: "Lance un conteneur `nginx` en arrière-plan (détaché), nomme-le `web` et associe le port 8080 de ta machine au port 80 du conteneur.",
    },
    accepted: ['docker run -d --name web -p 8080:80 nginx'],
    patterns: [
      'docker (?:container )?run (?=(?:\\S+ )*(?:-d|--detach|-dp) )(?=(?:\\S+ )*(?:(?:-p|--publish|-dp) 8080:80|--publish=8080:80) )(?=(?:\\S+ )*(?:--name web|--name=web) )(?:(?:-d|--detach|-p 8080:80|--publish 8080:80|--publish=8080:80|-dp 8080:80|--name web|--name=web) )+nginx(?::latest)?',
    ],
    hint: {
      en: "You need three options before the image name: one for detached mode, one to publish a port (host:container), one for the name.",
      fr: "Il faut trois options avant le nom de l'image : une pour le mode détaché, une pour publier un port (hôte:conteneur), une pour le nom.",
    },
    explanation: {
      en: "`-d` runs the container detached, `-p 8080:80` publishes container port 80 on host port 8080 (host first!), and `--name web` gives a friendly name instead of a random one. Options must come before the image name; anything after it is passed as the container's command.",
      fr: "`-d` lance le conteneur en mode détaché, `-p 8080:80` publie le port 80 du conteneur sur le port 8080 de l'hôte (l'hôte d'abord !) et `--name web` donne un nom lisible au lieu d'un nom aléatoire. Les options se placent avant le nom de l'image ; ce qui suit est transmis comme commande du conteneur.",
    },
  },
  {
    id: 'devops-005',
    track: 'devops',
    tier: 1,
    kind: 'fill',
    concept: { en: "Dockerfile basics", fr: "Bases du Dockerfile" },
    prompt: {
      en: "Complete this Dockerfile: choose the base image, execute a command at build time, and set the default command at run time.",
      fr: "Complète ce Dockerfile : choisir l'image de base, exécuter une commande pendant le build et définir la commande par défaut au lancement.",
    },
    template: `___ node:20-alpine
WORKDIR /app
COPY package*.json ./
___ npm ci
COPY . .
EXPOSE 3000
___ ["node", "server.js"]`,
    blanks: [['FROM'], ['RUN'], ['CMD', 'ENTRYPOINT']],
    caseSensitive: false,
    hint: {
      en: "Where do we start FROM? What do we RUN while building? What's the default command?",
      fr: "D'où part-on ? Que lance-t-on pendant le build ? Quelle est la commande par défaut ?",
    },
    explanation: {
      en: "`FROM` picks the base image, `RUN` executes commands while building (each creates a cached layer), and `CMD` sets what runs when the container starts. Copying `package*.json` and running `npm ci` before `COPY . .` means dependencies are re-installed only when they change, thanks to the layer cache.",
      fr: "`FROM` choisit l'image de base, `RUN` exécute des commandes pendant le build (chacune crée une couche en cache) et `CMD` définit ce qui s'exécute au démarrage du conteneur. Copier `package*.json` et lancer `npm ci` avant `COPY . .` permet de ne réinstaller les dépendances que si elles changent, grâce au cache des couches.",
    },
  },
  {
    id: 'devops-006',
    track: 'devops',
    tier: 1,
    kind: 'fill',
    concept: { en: "Docker CLI essentials", fr: "Essentiels de la CLI Docker" },
    prompt: {
      en: "Fill in the subcommands: (1) list running containers, (2) open an interactive shell inside the running container `web`, (3) stop `web` gracefully.",
      fr: "Complète les sous-commandes : (1) lister les conteneurs en cours d'exécution, (2) ouvrir un shell interactif dans le conteneur `web` démarré, (3) arrêter `web` proprement.",
    },
    template: `$ docker ___
$ docker ___ -it web sh
$ docker ___ web`,
    blanks: [['ps', 'container ls', 'container ps'], ['exec', 'container exec'], ['stop', 'container stop']],
    hint: {
      en: "The first one is borrowed from the Unix process-listing command; the second is short for \"execute\".",
      fr: "Le premier est emprunté à la commande Unix qui liste les processus ; le deuxième est l'abréviation d'« exécuter ».",
    },
    explanation: {
      en: "`docker ps` lists running containers (`-a` includes stopped ones), `docker exec -it` runs a new process such as a shell inside a running container, which is great for debugging, and `docker stop` sends SIGTERM, then SIGKILL after a grace period. `docker logs` shows what the container printed.",
      fr: "`docker ps` liste les conteneurs en cours (`-a` inclut les arrêtés), `docker exec -it` lance un nouveau processus, comme un shell, dans un conteneur démarré, idéal pour déboguer, et `docker stop` envoie SIGTERM, puis SIGKILL après un délai de grâce. `docker logs` affiche ce que le conteneur a écrit.",
    },
  },

  // ───────────────────────── Tier 2 — Apprentice ─────────────────────────
  {
    id: 'devops-007',
    track: 'devops',
    tier: 2,
    kind: 'order',
    concept: { en: "CI/CD pipeline", fr: "Pipeline CI/CD" },
    prompt: {
      en: "Order the stages of this pipeline: a push triggers it, dependencies are installed, tests must pass BEFORE any image is built, then the image is published and deployed.",
      fr: "Ordonne les étapes de ce pipeline : un push le déclenche, les dépendances sont installées, les tests doivent réussir AVANT toute construction d'image, puis l'image est publiée et déployée.",
    },
    lines: [
      'git push origin main',
      'npm ci',
      'npm test',
      'docker build -t acme/api:1.4.0 .',
      'docker push acme/api:1.4.0',
      'kubectl set image deployment/api api=acme/api:1.4.0',
    ],
    hint: {
      en: "Fail fast: the cheapest checks go first, and you can only deploy what's in the registry.",
      fr: "Échouer vite : les vérifications les moins coûteuses passent en premier, et on ne peut déployer que ce qui est dans le registre.",
    },
    explanation: {
      en: "A pipeline is a series of gates: each stage only runs if the previous one succeeded. Testing before building the image gives fast feedback, the image is tagged with an immutable version and pushed to a registry, and the deployment pulls exactly that tested artifact.",
      fr: "Un pipeline est une suite de portes : chaque étape ne s'exécute que si la précédente a réussi. Tester avant de construire l'image donne un retour rapide ; l'image reçoit une version immuable et est poussée dans un registre, puis le déploiement récupère exactement cet artefact testé.",
    },
  },
  {
    id: 'devops-008',
    track: 'devops',
    tier: 2,
    kind: 'command',
    concept: { en: "docker logs", fr: "docker logs" },
    prompt: {
      en: "The container `api` misbehaves. Stream its logs live (keep following new lines).",
      fr: "Le conteneur `api` se comporte mal. Affiche ses logs en direct (en continuant à suivre les nouvelles lignes).",
    },
    accepted: [
      'docker logs -f api',
      'docker logs --follow api',
      'docker logs api -f',
      'docker logs api --follow',
      'docker container logs -f api',
      'docker container logs --follow api',
    ],
    hint: {
      en: "Same flag as `tail` uses to keep following a file.",
      fr: "Le même flag que `tail` utilise pour suivre un fichier en continu.",
    },
    explanation: {
      en: "Containers should log to stdout/stderr (a 12-factor principle); Docker captures that stream, and `docker logs -f` follows it like `tail -f`. Add `--tail 100` to start with the last lines only, or `--since 10m` to limit the time range.",
      fr: "Les conteneurs doivent écrire leurs logs sur stdout/stderr (un principe des 12 facteurs) ; Docker capture ce flux et `docker logs -f` le suit comme `tail -f`. Ajoute `--tail 100` pour ne commencer qu'avec les dernières lignes, ou `--since 10m` pour limiter la période.",
    },
  },
  {
    id: 'devops-009',
    track: 'devops',
    tier: 2,
    kind: 'output',
    concept: { en: "Running vs stopped", fr: "Démarré ou arrêté" },
    prompt: {
      en: "Starting with no containers at all, what number does the last command print?",
      fr: "En partant d'aucun conteneur, quel nombre affiche la dernière commande ?",
    },
    code: `$ docker run -d --name api nginx
$ docker run -d --name web nginx
$ docker run --name job alpine echo "done"
$ docker stop api
$ docker ps -q | wc -l`,
    codeLang: 'bash',
    accepted: ['1'],
    hint: {
      en: "`docker ps` without `-a` only lists containers that are currently running. What happens to a container once its command finishes?",
      fr: "`docker ps` sans `-a` ne liste que les conteneurs en cours d'exécution. Que devient un conteneur une fois sa commande terminée ?",
    },
    explanation: {
      en: "`api` was stopped, and `job` exited as soon as `echo` finished: a container lives only as long as its main process. Only `web` is still running, so `docker ps -q` prints one ID. `docker ps -a` would show all three.",
      fr: "`api` a été arrêté et `job` s'est terminé dès la fin de `echo` : un conteneur ne vit que tant que son processus principal tourne. Seul `web` est encore en marche, donc `docker ps -q` affiche un seul identifiant. `docker ps -a` montrerait les trois.",
    },
  },
  {
    id: 'devops-010',
    track: 'devops',
    tier: 2,
    kind: 'mcq',
    concept: { en: "CI vs CD", fr: "CI ou CD" },
    prompt: {
      en: "Every commit that passes the pipeline goes to production automatically, with no human approval. What is this practice called?",
      fr: "Chaque commit qui passe le pipeline part automatiquement en production, sans validation humaine. Comment s'appelle cette pratique ?",
    },
    options: [
      { en: "Continuous deployment", fr: "Déploiement continu" },
      { en: "Continuous integration", fr: "Intégration continue" },
      { en: "Continuous delivery", fr: "Livraison continue" },
      { en: "Nightly build", fr: "Build nocturne" },
    ],
    answer: 0,
    hint: {
      en: "Two of the options are both abbreviated \"CD\"; the difference is whether a human presses the button.",
      fr: "Deux options s'abrègent toutes les deux « CD » ; la différence est de savoir si un humain appuie sur le bouton.",
    },
    explanation: {
      en: "Continuous integration merges and tests code frequently. Continuous delivery keeps every build releasable, but a human decides when to ship. Continuous deployment goes one step further: every green build is deployed automatically, which requires excellent tests and monitoring.",
      fr: "L'intégration continue fusionne et teste le code fréquemment. La livraison continue garde chaque build prêt à livrer, mais un humain décide quand. Le déploiement continu va plus loin : chaque build au vert est déployé automatiquement, ce qui exige d'excellents tests et une bonne supervision.",
    },
  },
  {
    id: 'devops-011',
    track: 'devops',
    tier: 2,
    kind: 'bug',
    concept: { en: "WORKDIR vs RUN cd", fr: "WORKDIR ou RUN cd" },
    prompt: {
      en: "This image should install and run the app from `/app`, but the files end up in `/` and `npm ci` fails. Which line is the bug?",
      fr: "Cette image devrait installer et lancer l'application depuis `/app`, mais les fichiers se retrouvent dans `/` et `npm ci` échoue. Quelle ligne contient le bug ?",
    },
    lines: [
      'FROM node:20-alpine',
      'RUN cd /app',
      'COPY package*.json ./',
      'RUN npm ci',
      'COPY . .',
      'CMD ["node", "server.js"]',
    ],
    bugLine: 1,
    hint: {
      en: "Does a directory change made in one RUN survive into the next instruction?",
      fr: "Un changement de dossier fait dans un RUN survit-il à l'instruction suivante ?",
    },
    explanation: {
      en: "Each `RUN` executes in its own shell, so `cd` is forgotten as soon as the line ends (and `/app` doesn't even exist yet). `WORKDIR /app` creates the directory and sets it for every following instruction, including `CMD` at run time.",
      fr: "Chaque `RUN` s'exécute dans son propre shell : le `cd` est oublié dès la fin de la ligne (et `/app` n'existe même pas encore). `WORKDIR /app` crée le dossier et le définit pour toutes les instructions suivantes, y compris `CMD` au lancement.",
    },
  },
  {
    id: 'devops-012',
    track: 'devops',
    tier: 2,
    kind: 'fill',
    concept: { en: "Docker Compose", fr: "Docker Compose" },
    prompt: {
      en: "Complete this compose file: publish the web port, pass configuration as environment variables, and choose the database's prebuilt image.",
      fr: "Complète ce fichier compose : publier le port web, passer la configuration en variables d'environnement et choisir l'image prête à l'emploi de la base de données.",
    },
    template: `services:
  web:
    build: .
    ___:
      - "8080:3000"
    ___:
      DATABASE_URL: postgres://app:\${DB_PASSWORD}@db:5432/app
    depends_on:
      - db
  db:
    ___: postgres:16
    environment:
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes:
      - db-data:/var/lib/postgresql/data
volumes:
  db-data:`,
    blanks: [['ports'], ['environment'], ['image']],
    hint: {
      en: "All three keys appear elsewhere in this file or in `docker run` options (-p, -e) under their long names.",
      fr: "Les trois clés correspondent aux options longues de `docker run` (-p, -e) ou apparaissent ailleurs dans ce fichier.",
    },
    explanation: {
      en: "Compose describes a multi-container app in one YAML file started with `docker compose up -d`. Services reach each other by name (`db`), `ports` publishes to the host, and `image` pulls a prebuilt image instead of `build`. Following the 12-factor app, config comes from the environment, and the password is injected from a `.env` file or a secrets manager, never hardcoded.",
      fr: "Compose décrit une application multi-conteneurs dans un seul fichier YAML, démarré avec `docker compose up -d`. Les services se joignent par leur nom (`db`), `ports` publie vers l'hôte et `image` récupère une image existante au lieu de `build`. Selon les 12 facteurs, la configuration vient de l'environnement, et le mot de passe est injecté depuis un fichier `.env` ou un gestionnaire de secrets, jamais écrit en dur.",
    },
  },

  // ───────────────────────── Tier 3 — Adept ─────────────────────────
  {
    id: 'devops-013',
    track: 'devops',
    tier: 3,
    kind: 'command',
    concept: { en: "kubectl apply", fr: "kubectl apply" },
    prompt: {
      en: "Create or update the Kubernetes resources described in the file `deployment.yaml`.",
      fr: "Crée ou mets à jour les ressources Kubernetes décrites dans le fichier `deployment.yaml`.",
    },
    accepted: ['kubectl apply -f deployment.yaml'],
    patterns: ['kubectl apply (?:-f|--filename)[ =](?:\\./)?deployment\\.yaml'],
    hint: {
      en: "The declarative verb means \"make the cluster match this file\"; the flag points to a file.",
      fr: "Le verbe déclaratif signifie « aligne le cluster sur ce fichier » ; le flag désigne un fichier.",
    },
    explanation: {
      en: "`kubectl apply -f` is declarative: you describe the desired state and Kubernetes works out what to create or change. Running it twice is safe (idempotent). Check the result with `kubectl get pods` and dig into problems with `kubectl describe pod <name>` and `kubectl logs <name>`.",
      fr: "`kubectl apply -f` est déclaratif : tu décris l'état souhaité et Kubernetes détermine quoi créer ou modifier. Le relancer est sans danger (idempotent). Vérifie le résultat avec `kubectl get pods` et creuse les problèmes avec `kubectl describe pod <nom>` et `kubectl logs <nom>`.",
    },
  },
  {
    id: 'devops-014',
    track: 'devops',
    tier: 3,
    kind: 'output',
    concept: { en: "Self-healing replicas", fr: "Réplicas auto-réparés" },
    prompt: {
      en: "The namespace contains only this Deployment's pods. A few seconds after the deletion, what number does the last command print?",
      fr: "Le namespace ne contient que les pods de ce Deployment. Quelques secondes après la suppression, quel nombre affiche la dernière commande ?",
    },
    code: `$ grep replicas deployment.yaml
  replicas: 3
$ kubectl apply -f deployment.yaml
$ kubectl delete pod web-7c9d8f-x2k4p
$ kubectl get pods --no-headers | wc -l`,
    codeLang: 'bash',
    accepted: ['3'],
    hint: {
      en: "Who is watching the number of pods, and what does it do when reality differs from the desired state?",
      fr: "Qui surveille le nombre de pods, et que fait-il quand la réalité diffère de l'état souhaité ?",
    },
    explanation: {
      en: "A Deployment manages a ReplicaSet whose controller constantly reconciles actual state with desired state. When a pod disappears, it immediately creates a replacement, so there are 3 pods again. Pods are disposable; never rely on a single pod's name or IP, use a Service.",
      fr: "Un Deployment gère un ReplicaSet dont le contrôleur réconcilie en permanence l'état réel avec l'état souhaité. Quand un pod disparaît, il en recrée un aussitôt : on retrouve 3 pods. Les pods sont jetables ; ne compte jamais sur le nom ou l'IP d'un pod, utilise un Service.",
    },
  },
  {
    id: 'devops-015',
    track: 'devops',
    tier: 3,
    kind: 'riddle',
    concept: { en: "Monitoring metrics", fr: "Collecte de métriques" },
    prompt: {
      en: "Named after the Titan who stole fire from the gods,\nevery few seconds I scrape your /metrics endpoints\nand store the numbers as time series you can query.\nGrafana paints my data on dashboards. What am I?",
      fr: "Je porte le nom du Titan qui vola le feu aux dieux ;\ntoutes les quelques secondes, je collecte vos endpoints /metrics\net je stocke les valeurs en séries temporelles interrogeables.\nGrafana peint mes données sur ses tableaux de bord. Qui suis-je ?",
    },
    accepted: ['prometheus', 'prométhée', 'promethee'],
    hint: {
      en: "Greek mythology: the Titan who gave fire to humanity.",
      fr: "Mythologie grecque : le Titan qui offrit le feu à l'humanité.",
    },
    explanation: {
      en: "Prometheus is a pull-based monitoring system: it scrapes metrics over HTTP, stores time series and evaluates alert rules, usually visualized in Grafana. Metrics are one pillar of observability; logs explain individual events and traces follow a request across services.",
      fr: "Prometheus est un système de supervision en mode pull : il collecte des métriques via HTTP, stocke des séries temporelles et évalue des règles d'alerte, généralement visualisées dans Grafana. Les métriques sont un pilier de l'observabilité ; les logs expliquent des événements précis et les traces suivent une requête à travers les services.",
    },
  },
  {
    id: 'devops-016',
    track: 'devops',
    tier: 3,
    kind: 'mcq',
    concept: { en: "Multi-stage builds", fr: "Builds multi-étapes" },
    prompt: {
      en: "What is the main benefit of this multi-stage Dockerfile?",
      fr: "Quel est le principal avantage de ce Dockerfile multi-étapes ?",
    },
    code: `FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html`,
    codeLang: 'dockerfile',
    options: [
      { en: "The two stages are built on two machines in parallel", fr: "Les deux étapes sont construites en parallèle sur deux machines" },
      { en: "The final image contains two operating systems", fr: "L'image finale contient deux systèmes d'exploitation" },
      { en: "The final image only contains the built files on nginx, not Node, the sources or dev dependencies, so it is much smaller and safer", fr: "L'image finale ne contient que les fichiers construits sur nginx, sans Node, ni sources, ni dépendances de dev : elle est bien plus petite et plus sûre" },
      { en: "The container restarts automatically when it crashes", fr: "Le conteneur redémarre automatiquement en cas de plantage" },
    ],
    answer: 2,
    hint: {
      en: "Which stage becomes the image you ship, and what does it copy from the other one?",
      fr: "Quelle étape devient l'image livrée, et que copie-t-elle de l'autre ?",
    },
    explanation: {
      en: "Only the last stage becomes the final image; earlier stages are build-only and discarded. `COPY --from=build` cherry-picks the compiled output, shrinking the image from about 1 GB to a few dozen MB and reducing the attack surface. Pair it with a `.dockerignore` (node_modules, .git, .env) to keep the build context small and secrets out.",
      fr: "Seule la dernière étape devient l'image finale ; les précédentes ne servent qu'au build et sont jetées. `COPY --from=build` récupère uniquement le résultat compilé : l'image passe d'environ 1 Go à quelques dizaines de Mo et la surface d'attaque diminue. Ajoute un `.dockerignore` (node_modules, .git, .env) pour garder un contexte de build léger et sans secrets.",
    },
  },
  {
    id: 'devops-017',
    track: 'devops',
    tier: 3,
    kind: 'command',
    concept: { en: "terraform plan", fr: "terraform plan" },
    prompt: {
      en: "You edited `main.tf`. Preview what Terraform would create, change or destroy, WITHOUT touching real infrastructure.",
      fr: "Tu as modifié `main.tf`. Affiche ce que Terraform créerait, modifierait ou détruirait, SANS toucher à l'infrastructure réelle.",
    },
    accepted: ['terraform plan'],
    patterns: ['terraform plan(?: -out[= ]\\S+)?'],
    hint: {
      en: "It's the dry-run step that sits between `terraform init` and `terraform apply`.",
      fr: "C'est l'étape de simulation qui se place entre `terraform init` et `terraform apply`.",
    },
    explanation: {
      en: "Infrastructure as Code describes servers, networks and DNS in versioned files. `terraform plan` compares your code with the recorded state and shows a diff (+ create, ~ update, - destroy) so it can be reviewed, often directly in a pull request, before `terraform apply` makes it real.",
      fr: "L'Infrastructure as Code décrit serveurs, réseaux et DNS dans des fichiers versionnés. `terraform plan` compare ton code à l'état enregistré et affiche un diff (+ création, ~ modification, - destruction) que l'on peut relire, souvent dans une pull request, avant que `terraform apply` ne le rende réel.",
    },
  },

  // ───────────────────────── Tier 4 — Expert ─────────────────────────
  {
    id: 'devops-018',
    track: 'devops',
    tier: 4,
    kind: 'order',
    concept: { en: "Terraform workflow", fr: "Flux Terraform" },
    prompt: {
      en: "Order the Terraform workflow for a brand-new project directory, from first command to reading an output value of the created infrastructure.",
      fr: "Ordonne le flux Terraform pour un tout nouveau dossier de projet, de la première commande jusqu'à la lecture d'une valeur de sortie de l'infrastructure créée.",
    },
    lines: [
      'terraform init',
      'terraform validate',
      'terraform plan -out=tfplan',
      'terraform apply tfplan',
      'terraform output public_ip',
    ],
    hint: {
      en: "Providers must be downloaded before anything can be checked, and outputs only exist once resources do.",
      fr: "Les providers doivent être téléchargés avant toute vérification, et les sorties n'existent qu'une fois les ressources créées.",
    },
    explanation: {
      en: "`init` downloads providers and configures the state backend, `validate` checks syntax, `plan -out` saves a reviewed plan, and `apply tfplan` executes exactly that plan. Terraform provisions infrastructure; configuration management tools such as Ansible then configure software on the machines.",
      fr: "`init` télécharge les providers et configure le backend d'état, `validate` vérifie la syntaxe, `plan -out` enregistre un plan relu et `apply tfplan` exécute exactement ce plan. Terraform provisionne l'infrastructure ; des outils de gestion de configuration comme Ansible configurent ensuite les logiciels sur les machines.",
    },
  },
  {
    id: 'devops-019',
    track: 'devops',
    tier: 4,
    kind: 'riddle',
    concept: { en: "Canary release", fr: "Déploiement canari" },
    prompt: {
      en: "Like the little bird miners carried underground,\nI go first: the new version, shown to just 5% of users.\nIf the metrics stay healthy, I spread to everyone;\nif not, I'm rolled back before most even notice. What am I?",
      fr: "Comme le petit oiseau que les mineurs emportaient sous terre,\nje passe en premier : la nouvelle version, montrée à 5 % des utilisateurs.\nSi les métriques restent bonnes, je m'étends à tous ;\nsinon, on me retire avant que la plupart ne le remarquent. Qui suis-je ?",
    },
    accepted: ['canary', 'canary release', 'canary deployment', 'canari', 'deploiement canari', 'déploiement canari', 'release canari'],
    hint: {
      en: "A small yellow songbird that warned miners of toxic gas.",
      fr: "Un petit oiseau chanteur jaune qui avertissait les mineurs des gaz toxiques.",
    },
    explanation: {
      en: "A canary release routes a small share of real traffic to the new version and watches error rates and latency before increasing it. Blue-green keeps two full environments and switches all traffic at once (instant rollback), while a rolling update replaces instances gradually, the Kubernetes default.",
      fr: "Un déploiement canari envoie une petite part du trafic réel vers la nouvelle version et surveille taux d'erreur et latence avant d'augmenter la part. Le blue-green garde deux environnements complets et bascule tout le trafic d'un coup (retour arrière instantané), tandis que le rolling update remplace les instances progressivement, le comportement par défaut de Kubernetes.",
    },
  },
  {
    id: 'devops-020',
    track: 'devops',
    tier: 4,
    kind: 'bug',
    concept: { en: "Service selectors", fr: "Sélecteurs de Service" },
    prompt: {
      en: "All 3 pods are Running, but the Service `web` has no endpoints and requests time out. Which line is the bug?",
      fr: "Les 3 pods sont Running, mais le Service `web` n'a aucun endpoint et les requêtes expirent. Quelle ligne contient le bug ?",
    },
    lines: [
      'apiVersion: apps/v1',
      'kind: Deployment',
      'metadata:',
      '  name: web',
      'spec:',
      '  replicas: 3',
      '  selector:',
      '    matchLabels:',
      '      app: web',
      '  template:',
      '    metadata:',
      '      labels:',
      '        app: web',
      '    spec:',
      '      containers:',
      '        - name: web',
      '          image: acme/web:1.4.2',
      '          ports:',
      '            - containerPort: 8080',
      '---',
      'apiVersion: v1',
      'kind: Service',
      'metadata:',
      '  name: web',
      'spec:',
      '  selector:',
      '    app: frontend',
      '  ports:',
      '    - port: 80',
      '      targetPort: 8080',
    ],
    bugLine: 26,
    hint: {
      en: "A Service finds its pods by labels. Compare the labels the pods actually carry with what the Service is looking for.",
      fr: "Un Service trouve ses pods grâce aux labels. Compare les labels réellement portés par les pods avec ce que cherche le Service.",
    },
    explanation: {
      en: "A Service routes traffic to every pod whose labels match its `selector`. The pods are labeled `app: web` but the Service selects `app: frontend`, so it matches nothing; `kubectl describe service` would show `Endpoints: <none>`. The `targetPort` 8080 correctly matches the `containerPort`.",
      fr: "Un Service envoie le trafic vers tous les pods dont les labels correspondent à son `selector`. Les pods portent `app: web` mais le Service sélectionne `app: frontend` : il ne trouve rien, et `kubectl describe service` afficherait `Endpoints: <none>`. Le `targetPort` 8080 correspond bien au `containerPort`.",
    },
  },
  {
    id: 'devops-021',
    track: 'devops',
    tier: 4,
    kind: 'command',
    concept: { en: "Rollback a rollout", fr: "Annuler un déploiement" },
    prompt: {
      en: "The new version of the Deployment `web` is crashing in production. Roll it back to the previous revision.",
      fr: "La nouvelle version du Deployment `web` plante en production. Reviens à la révision précédente.",
    },
    accepted: ['kubectl rollout undo deployment/web'],
    patterns: ['kubectl rollout undo (?:deployment|deployments|deploy)[/ ]web'],
    hint: {
      en: "It's a `kubectl rollout` subcommand that means \"cancel what I just did\".",
      fr: "C'est une sous-commande de `kubectl rollout` qui signifie « annuler ce que je viens de faire ».",
    },
    explanation: {
      en: "Deployments keep a revision history, so `kubectl rollout undo` performs a rolling update back to the previous ReplicaSet in seconds. Use `kubectl rollout status` to watch progress and `kubectl rollout history` to list revisions; `--to-revision=N` targets a specific one.",
      fr: "Les Deployments conservent un historique des révisions : `kubectl rollout undo` effectue en quelques secondes une mise à jour progressive vers le ReplicaSet précédent. `kubectl rollout status` suit la progression et `kubectl rollout history` liste les révisions ; `--to-revision=N` cible une révision précise.",
    },
  },
  {
    id: 'devops-022',
    track: 'devops',
    tier: 4,
    kind: 'output',
    concept: { en: "Error budget", fr: "Budget d'erreur" },
    prompt: {
      en: "Given this SLO, how many minutes of downtime is the error budget for the window? (number only)",
      fr: "Avec ce SLO, combien de minutes d'indisponibilité représente le budget d'erreur sur la période ? (nombre seulement)",
    },
    code: `SLI:    share of minutes where the service is available
SLO:    99.9 %
Window: 30 days`,
    codeLang: 'text',
    accepted: ['43.2', '43,2', '43.2 min', '43,2 min', '43.2 minutes', '43,2 minutes'],
    hint: {
      en: "Count the minutes in 30 days, then take the share that is allowed to fail.",
      fr: "Compte les minutes dans 30 jours, puis prends la part autorisée à échouer.",
    },
    explanation: {
      en: "30 days × 24 h × 60 min = 43,200 minutes; 100% − 99.9% = 0.1%, so the budget is 43.2 minutes. In SRE, the SLI is what you measure, the SLO is the target, and the error budget is the allowed failure: while budget remains, the team ships features; once it's spent, it prioritizes reliability.",
      fr: "30 jours × 24 h × 60 min = 43 200 minutes ; 100 % − 99,9 % = 0,1 %, donc le budget est de 43,2 minutes. En SRE, le SLI est ce que l'on mesure, le SLO l'objectif et le budget d'erreur l'échec toléré : tant qu'il en reste, l'équipe livre des fonctionnalités ; une fois épuisé, elle priorise la fiabilité.",
    },
  },
];
