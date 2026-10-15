import type { Challenge } from '../types';

export const challenges: Challenge[] = [
  // ───────────────────────────── Tier 1 — Novice ─────────────────────────────
  {
    id: 'linux-001',
    track: 'linux',
    tier: 1,
    kind: 'mcq',
    concept: { en: 'Filesystem hierarchy', fr: 'Arborescence des fichiers' },
    prompt: {
      en: 'Where does Linux conventionally keep system-wide configuration files (for example ssh or nginx settings)?',
      fr: 'Où Linux range-t-il par convention les fichiers de configuration du système (par exemple ceux de ssh ou de nginx) ?',
    },
    options: [
      { en: '/bin', fr: '/bin' },
      { en: '/home', fr: '/home' },
      { en: '/tmp', fr: '/tmp' },
      { en: '/etc', fr: '/etc' },
    ],
    answer: 3,
    hint: {
      en: 'It is a three-letter directory right under the root, often read aloud like "et cetera".',
      fr: 'C’est un répertoire de trois lettres juste sous la racine, souvent prononcé comme « et cetera ».',
    },
    explanation: {
      en: 'The Filesystem Hierarchy Standard puts configuration in /etc, executables in /bin and /usr/bin, user files in /home, logs and changing data in /var, and throwaway files in /tmp. Knowing this map tells you where to look on any distribution.',
      fr: 'Le Filesystem Hierarchy Standard place la configuration dans /etc, les exécutables dans /bin et /usr/bin, les fichiers des utilisateurs dans /home, les journaux et données variables dans /var, et les fichiers temporaires dans /tmp. Connaître cette carte t’indique où chercher sur n’importe quelle distribution.',
    },
  },
  {
    id: 'linux-002',
    track: 'linux',
    tier: 1,
    kind: 'command',
    concept: { en: 'Reading files: tail', fr: 'Lire un fichier : tail' },
    prompt: {
      en: 'Display only the last 20 lines of the file app.log.',
      fr: 'Affiche uniquement les 20 dernières lignes du fichier app.log.',
    },
    accepted: [
      'tail -n 20 app.log',
      'tail -20 app.log',
      'tail -n20 app.log',
      'tail --lines=20 app.log',
      'tail --lines 20 app.log',
    ],
    patterns: ['tail (-n ?20|-20|--lines[= ]20) (\\./)?app\\.log', 'tail (\\./)?app\\.log (-n ?20|--lines[= ]20)'],
    hint: {
      en: 'head shows the beginning of a file; its sibling shows the end. An option sets the number of lines.',
      fr: 'head affiche le début d’un fichier ; sa sœur en affiche la fin. Une option fixe le nombre de lignes.',
    },
    explanation: {
      en: 'tail prints the end of a file (10 lines by default) and -n sets how many. head does the same for the beginning, cat prints everything and less lets you scroll. tail -f app.log keeps following new lines, perfect for live logs.',
      fr: 'tail affiche la fin d’un fichier (10 lignes par défaut) et -n en fixe le nombre. head fait de même pour le début, cat affiche tout et less permet de défiler. tail -f app.log continue de suivre les nouvelles lignes, idéal pour des journaux en direct.',
    },
  },
  {
    id: 'linux-003',
    track: 'linux',
    tier: 1,
    kind: 'command',
    concept: { en: 'Listing files: ls', fr: 'Lister les fichiers : ls' },
    prompt: {
      en: 'List ALL files in the current directory, including hidden ones, in long format (permissions, owner, size...).',
      fr: 'Liste TOUS les fichiers du répertoire courant, y compris les fichiers cachés, au format long (permissions, propriétaire, taille...).',
    },
    accepted: ['ls -la', 'ls -al', 'ls -l -a', 'ls -a -l'],
    patterns: [
      'ls (-la|-al|-lA|-Al|-l -a|-a -l|-l -A|-A -l)( \\.| \\./)?',
      'ls (-l --all|--all -l|-l --almost-all|--almost-all -l)( \\.| \\./)?',
    ],
    hint: {
      en: 'Combine two single-letter options: one for "long", one for "all".',
      fr: 'Combine deux options d’une lettre : une pour « long », une pour « all » (tout).',
    },
    explanation: {
      en: 'Files whose name starts with a dot are hidden; -a shows them, -l adds permissions, owner, size and date. Short options can be combined in any order, so ls -la and ls -al are identical.',
      fr: 'Les fichiers dont le nom commence par un point sont cachés ; -a les affiche et -l ajoute permissions, propriétaire, taille et date. Les options courtes se combinent dans n’importe quel ordre : ls -la et ls -al sont identiques.',
    },
  },
  {
    id: 'linux-004',
    track: 'linux',
    tier: 1,
    kind: 'riddle',
    concept: { en: 'The root directory', fr: 'Le répertoire racine' },
    prompt: {
      en: 'I am a single stroke, the top of the tree;\nevery absolute path begins with me.\ncd with me alone and you stand at the base\nof the whole filesystem. What am I?',
      fr: 'Je suis un simple trait, le sommet de l’arbre ;\ntout chemin absolu commence par moi.\nUn cd vers moi seul, et te voilà à la base\nde tout le système de fichiers. Qui suis-je ?',
    },
    accepted: ['/', 'root', 'root directory', 'slash', 'racine', 'repertoire racine', 'répertoire racine'],
    hint: {
      en: 'It is also the character that separates folder names in a path.',
      fr: 'C’est aussi le caractère qui sépare les noms de dossiers dans un chemin.',
    },
    explanation: {
      en: '/ is the root directory: an absolute path such as /home/ada/notes.txt starts from it, whereas a relative path such as notes.txt or ../docs starts from the current directory. Do not confuse it with /root, the home directory of the root user.',
      fr: '/ est le répertoire racine : un chemin absolu comme /home/ada/notes.txt part de lui, alors qu’un chemin relatif comme notes.txt ou ../docs part du répertoire courant. Ne le confonds pas avec /root, le répertoire personnel de l’utilisateur root.',
    },
  },
  {
    id: 'linux-005',
    track: 'linux',
    tier: 1,
    kind: 'output',
    concept: { en: 'Relative paths & cd', fr: 'Chemins relatifs et cd' },
    prompt: {
      en: 'What does the last command print?',
      fr: 'Qu’affiche la dernière commande ?',
    },
    code: `cd /tmp
mkdir -p projects/game
cd projects/game
cd ../..
pwd`,
    codeLang: 'bash',
    accepted: ['/tmp'],
    hint: {
      en: '.. means "the parent directory". How many levels does ../.. climb?',
      fr: '.. signifie « le répertoire parent ». De combien de niveaux ../.. remonte-t-il ?',
    },
    explanation: {
      en: 'pwd prints the working directory. From /tmp/projects/game, each .. climbs one level, so ../.. lands back in /tmp. Paths that do not start with / are relative to where you currently are.',
      fr: 'pwd affiche le répertoire de travail. Depuis /tmp/projects/game, chaque .. remonte d’un niveau : ../.. ramène donc dans /tmp. Les chemins qui ne commencent pas par / sont relatifs à l’endroit où tu te trouves.',
    },
  },
  {
    id: 'linux-006',
    track: 'linux',
    tier: 1,
    kind: 'fill',
    concept: { en: 'mkdir & cp options', fr: 'Options de mkdir et cp' },
    prompt: {
      en: 'Complete the commands: create the whole folder chain at once (no error if parts already exist), then copy the projects folder and everything inside it to backup.',
      fr: 'Complète les commandes : crée toute la chaîne de dossiers d’un coup (sans erreur si certains existent déjà), puis copie le dossier projects et tout son contenu vers backup.',
    },
    template: `mkdir ___ projects/web/css
cp ___ projects backup`,
    blanks: [
      ['-p', '--parents'],
      ['-r', '-R', '-a', '--recursive'],
    ],
    hint: {
      en: 'One option creates missing Parents; the other makes cp descend Recursively into directories.',
      fr: 'Une option crée les dossiers Parents manquants ; l’autre fait descendre cp Récursivement dans les dossiers.',
    },
    explanation: {
      en: 'mkdir -p creates every missing parent directory and stays silent if they exist. cp refuses to copy a directory unless you add -r (recursive). The same idea applies to rm -r, which deletes a folder and its contents, permanently and without a trash bin.',
      fr: 'mkdir -p crée tous les répertoires parents manquants et ne dit rien s’ils existent déjà. cp refuse de copier un dossier sans -r (récursif). La même idée s’applique à rm -r, qui supprime un dossier et son contenu, définitivement et sans corbeille.',
    },
  },

  // ─────────────────────────── Tier 2 — Apprentice ───────────────────────────
  {
    id: 'linux-007',
    track: 'linux',
    tier: 2,
    kind: 'command',
    concept: { en: 'chmod: execute bit', fr: 'chmod : droit d’exécution' },
    prompt: {
      en: 'You wrote script.sh, but ./script.sh says "Permission denied". Make it executable for its owner.',
      fr: 'Tu as écrit script.sh, mais ./script.sh répond « Permission denied ». Rends-le exécutable pour son propriétaire.',
    },
    accepted: ['chmod u+x script.sh', 'chmod +x script.sh', 'chmod a+x script.sh', 'chmod ugo+x script.sh'],
    patterns: ['chmod [ugoa]*\\+x (\\./)?script\\.sh', 'chmod 0?(700|744|750|754|755) (\\./)?script\\.sh'],
    hint: {
      en: 'Use the "change mode" command with the symbolic form: who + what.',
      fr: 'Utilise la commande « change mode » avec la forme symbolique : qui + quoi.',
    },
    explanation: {
      en: 'Each file has read, write and execute bits for its user, group and others. chmod u+x adds execute for the owner (u); the numeric form chmod 755 sets all three digits at once (7 = rwx, 5 = r-x). Without the x bit, the shell refuses to run the file.',
      fr: 'Chaque fichier possède des droits de lecture, d’écriture et d’exécution pour son utilisateur, son groupe et les autres. chmod u+x ajoute l’exécution pour le propriétaire (u) ; la forme numérique chmod 755 fixe les trois chiffres d’un coup (7 = rwx, 5 = r-x). Sans le bit x, le shell refuse de lancer le fichier.',
    },
  },
  {
    id: 'linux-008',
    track: 'linux',
    tier: 2,
    kind: 'fill',
    concept: { en: 'Numeric permissions & chown', fr: 'Droits numériques et chown' },
    prompt: {
      en: 'Complete the commands: give the owner read+write, the group read only and others nothing; then hand the file to user alice and group devs.',
      fr: 'Complète les commandes : donne lecture+écriture au propriétaire, lecture seule au groupe et rien aux autres ; puis attribue le fichier à l’utilisateur alice et au groupe devs.',
    },
    template: `chmod ___ notes.txt
sudo ___ alice:devs notes.txt`,
    blanks: [['640', '0640', 'u=rw,g=r,o='], ['chown']],
    hint: {
      en: 'Add the values r=4, w=2, x=1 for each of owner, group, others. The second command "changes the owner".',
      fr: 'Additionne r=4, w=2, x=1 pour le propriétaire, le groupe et les autres. La seconde commande « change le propriétaire » (change owner).',
    },
    explanation: {
      en: 'rw- = 4+2 = 6, r-- = 4, --- = 0, hence 640 (shown by ls -l as -rw-r-----). chown user:group changes ownership; it needs sudo because only root may give files away. sudo runs one command with administrator rights.',
      fr: 'rw- = 4+2 = 6, r-- = 4, --- = 0, d’où 640 (affiché par ls -l sous la forme -rw-r-----). chown utilisateur:groupe change le propriétaire ; il faut sudo car seul root peut céder des fichiers. sudo exécute une seule commande avec les droits d’administrateur.',
    },
  },
  {
    id: 'linux-009',
    track: 'linux',
    tier: 2,
    kind: 'riddle',
    concept: { en: 'Pipes', fr: 'Tubes (pipes)' },
    prompt: {
      en: 'I am a vertical bar between two commands:\nwhat the left one prints, the right one reads.\nWith me, small tools join hands\ninto long chains of mighty deeds.\nWhat am I?',
      fr: 'Je suis une barre verticale entre deux commandes :\nce que la gauche affiche, la droite le lit.\nGrâce à moi, les petits outils se donnent la main\npour former de longues chaînes. Qui suis-je ?',
    },
    accepted: ['pipe', 'pipes', 'pipeline', 'tube', 'tubes', 'barre verticale'],
    hint: {
      en: 'Plumbers use it to carry water from one place to another.',
      fr: 'Les plombiers s’en servent pour faire circuler l’eau d’un endroit à un autre.',
    },
    explanation: {
      en: 'The pipe | connects the standard output of one command to the standard input of the next, as in ps aux | grep nginx. It embodies the Unix philosophy: small programs that each do one thing well, combined into powerful pipelines.',
      fr: 'Le tube | relie la sortie standard d’une commande à l’entrée standard de la suivante, comme dans ps aux | grep nginx. Il incarne la philosophie Unix : de petits programmes qui font chacun une chose bien, combinés en pipelines puissants.',
    },
  },
  {
    id: 'linux-010',
    track: 'linux',
    tier: 2,
    kind: 'command',
    concept: { en: 'Counting lines: wc', fr: 'Compter les lignes : wc' },
    prompt: {
      en: 'How many lines does access.log contain? Type a command that counts them.',
      fr: 'Combien de lignes contient access.log ? Tape une commande qui les compte.',
    },
    accepted: ['wc -l access.log', 'wc -l < access.log', 'cat access.log | wc -l', 'wc --lines access.log'],
    patterns: [
      'wc (-l|--lines) (< ?)?(\\./)?access\\.log',
      '< ?(\\./)?access\\.log wc (-l|--lines)',
      'cat (\\./)?access\\.log ?\\| ?wc (-l|--lines)',
      'grep -c (\'\'|""|\\^|\'\\^\'|"\\^") (\\./)?access\\.log',
    ],
    hint: {
      en: 'The tool is named after "word count", but an option restricts it to lines.',
      fr: 'L’outil doit son nom à « word count » (compte de mots), mais une option le limite aux lignes.',
    },
    explanation: {
      en: 'wc counts lines, words and bytes; -l keeps only the line count. Combined with pipes it answers many questions, e.g. grep " 404 " access.log | wc -l counts the not-found errors.',
      fr: 'wc compte les lignes, les mots et les octets ; -l ne garde que le nombre de lignes. Combiné aux tubes, il répond à beaucoup de questions : par exemple grep " 404 " access.log | wc -l compte les erreurs « introuvable ».',
    },
  },
  {
    id: 'linux-011',
    track: 'linux',
    tier: 2,
    kind: 'output',
    concept: { en: 'sort & uniq', fr: 'sort et uniq' },
    prompt: {
      en: 'What does this pipeline print?',
      fr: 'Qu’affiche ce pipeline ?',
    },
    code: `printf "pear\\napple\\npear\\nfig\\napple\\npear\\n" | sort | uniq -c | sort -rn`,
    codeLang: 'bash',
    accepted: ['3 pear\n2 apple\n1 fig'],
    hint: {
      en: 'uniq -c counts ADJACENT duplicates, which is why the first sort is there. -rn sorts numerically, biggest first.',
      fr: 'uniq -c compte les doublons ADJACENTS, d’où le premier sort. -rn trie numériquement, du plus grand au plus petit.',
    },
    explanation: {
      en: 'uniq only merges consecutive identical lines, so you sort first to group them; -c prefixes each line with its count. The final sort -rn ranks by count: a classic recipe for "top N" reports from logs.',
      fr: 'uniq ne fusionne que les lignes identiques consécutives : on trie donc d’abord pour les regrouper ; -c préfixe chaque ligne par son nombre d’occurrences. Le sort -rn final classe par nombre : une recette classique pour obtenir un « top N » à partir de journaux.',
    },
  },
  {
    id: 'linux-012',
    track: 'linux',
    tier: 2,
    kind: 'bug',
    concept: { en: 'Redirection > vs >>', fr: 'Redirection > et >>' },
    prompt: {
      en: 'This script must ADD lines to journal.log and never erase older entries. Yet after it runs, the old entries are gone. Click the faulty line.',
      fr: 'Ce script doit AJOUTER des lignes à journal.log sans jamais effacer les anciennes entrées. Pourtant, après exécution, elles ont disparu. Clique sur la ligne fautive.',
    },
    lines: [
      '#!/bin/bash',
      'date >> journal.log',
      'echo "Backup started" > journal.log',
      'tar -czf backup.tar.gz docs',
      'echo "Backup done" >> journal.log',
    ],
    bugLine: 2,
    hint: {
      en: 'Compare the redirection operators line by line.',
      fr: 'Compare les opérateurs de redirection ligne par ligne.',
    },
    explanation: {
      en: '> truncates the file before writing, while >> appends to the end. One stray > wipes the whole log. Remember too: 2> redirects errors (stderr), and 2>&1 sends them to the same place as normal output.',
      fr: '> vide le fichier avant d’écrire, alors que >> ajoute à la fin. Un seul > égaré efface tout le journal. Retiens aussi : 2> redirige les erreurs (stderr), et 2>&1 les envoie au même endroit que la sortie normale.',
    },
  },

  // ───────────────────────────── Tier 3 — Adept ──────────────────────────────
  {
    id: 'linux-013',
    track: 'linux',
    tier: 3,
    kind: 'order',
    concept: { en: 'Shell scripts & exit codes', fr: 'Scripts shell et codes de sortie' },
    prompt: {
      en: 'Order this script: with no argument it prints a usage message and exits with code 1; otherwise it greets the name and exits with 0.',
      fr: 'Remets ce script dans l’ordre : sans argument, il affiche un message d’usage et quitte avec le code 1 ; sinon, il salue le nom donné et quitte avec 0.',
    },
    lines: [
      '#!/bin/bash',
      'if [ -z "$1" ]; then',
      '  echo "Usage: greet.sh NAME"',
      '  exit 1',
      'fi',
      'echo "Hello, $1!"',
      'exit 0',
    ],
    hint: {
      en: 'The shebang always comes first. Inside the if, nothing after exit would ever run.',
      fr: 'Le shebang vient toujours en premier. Dans le if, rien de ce qui suit exit ne serait exécuté.',
    },
    explanation: {
      en: 'The shebang #!/bin/bash tells the kernel which interpreter runs the file. $1 is the first argument and [ -z ... ] tests for an empty string. By convention exit 0 means success and any non-zero code means failure, which lets other scripts react with && or if.',
      fr: 'Le shebang #!/bin/bash indique au noyau quel interpréteur exécute le fichier. $1 est le premier argument et [ -z ... ] teste si une chaîne est vide. Par convention, exit 0 signifie succès et tout code non nul un échec, ce qui permet aux autres scripts de réagir avec && ou if.',
    },
  },
  {
    id: 'linux-014',
    track: 'linux',
    tier: 3,
    kind: 'command',
    concept: { en: 'Processes & signals', fr: 'Processus et signaux' },
    prompt: {
      en: 'ps aux shows a stuck process with PID 4242. Ask it to terminate politely (the default SIGTERM signal, not the brutal SIGKILL).',
      fr: 'ps aux montre un processus bloqué de PID 4242. Demande-lui poliment de s’arrêter (le signal SIGTERM par défaut, pas le brutal SIGKILL).',
    },
    accepted: ['kill 4242', 'kill -15 4242', 'kill -TERM 4242', 'kill -SIGTERM 4242', 'kill -s TERM 4242'],
    patterns: ['kill( (-15|-TERM|-SIGTERM|-s ?(15|TERM|SIGTERM)|--signal[= ](15|TERM|SIGTERM)))? 4242'],
    hint: {
      en: 'Despite its name, this command simply sends a signal; without options it sends number 15.',
      fr: 'Malgré son nom, cette commande ne fait qu’envoyer un signal ; sans option, elle envoie le numéro 15.',
    },
    explanation: {
      en: 'kill sends SIGTERM (15) by default, which lets the program clean up and exit. kill -9 (SIGKILL) cannot be caught and stops it instantly, at the risk of corrupted data, so it is the last resort. ps and top show running processes and their PIDs.',
      fr: 'kill envoie SIGTERM (15) par défaut, ce qui laisse au programme le temps de faire le ménage et de quitter. kill -9 (SIGKILL) ne peut pas être intercepté et l’arrête net, au risque de corrompre des données : c’est le dernier recours. ps et top affichent les processus en cours et leurs PID.',
    },
  },
  {
    id: 'linux-015',
    track: 'linux',
    tier: 3,
    kind: 'output',
    concept: { en: 'Exit status $?', fr: 'Code de retour $?' },
    prompt: {
      en: 'What does this script print?',
      fr: 'Qu’affiche ce script ?',
    },
    code: `true
echo $?
false
echo $?
[ 3 -gt 5 ]
echo $?`,
    codeLang: 'bash',
    accepted: ['0\n1\n1'],
    hint: {
      en: '$? holds the exit code of the previous command. In the shell, 0 means success.',
      fr: '$? contient le code de sortie de la commande précédente. Dans le shell, 0 signifie succès.',
    },
    explanation: {
      en: 'Every command returns an exit status: 0 for success, non-zero for failure (the opposite of most languages’ true/false). The test [ 3 -gt 5 ] is false, so it returns 1. if, && and || all branch on this status.',
      fr: 'Chaque commande renvoie un code de sortie : 0 en cas de succès, une valeur non nulle en cas d’échec (l’inverse du vrai/faux de la plupart des langages). Le test [ 3 -gt 5 ] est faux, il renvoie donc 1. if, && et || se basent tous sur ce code.',
    },
  },
  {
    id: 'linux-016',
    track: 'linux',
    tier: 3,
    kind: 'riddle',
    concept: { en: 'The PATH variable', fr: 'La variable PATH' },
    prompt: {
      en: 'I am a list of folders split by colons;\ntype a command and the shell searches through me in order.\nIf your program is not inside my rows,\n"command not found" is all you get.\nWhich environment variable am I?',
      fr: 'Je suis une liste de dossiers séparés par des deux-points ;\ntape une commande et le shell me parcourt dans l’ordre.\nSi ton programme n’est dans aucun de mes dossiers,\n« command not found » sera ta seule réponse.\nQuelle variable d’environnement suis-je ?',
    },
    accepted: ['path', '$path', 'path variable', 'variable path'],
    hint: {
      en: 'Four capital letters; echo it with a dollar sign in front.',
      fr: 'Quatre lettres majuscules ; affiche-la avec un dollar devant.',
    },
    explanation: {
      en: 'PATH lists the directories searched for executables, from left to right; which python shows which one wins. Add a folder with export PATH="$HOME/bin:$PATH" (put it in ~/.bashrc to make it permanent). export makes a variable visible to child processes.',
      fr: 'PATH liste les répertoires où chercher les exécutables, de gauche à droite ; which python montre lequel l’emporte. Ajoute un dossier avec export PATH="$HOME/bin:$PATH" (dans ~/.bashrc pour que ce soit permanent). export rend une variable visible pour les processus enfants.',
    },
  },
  {
    id: 'linux-017',
    track: 'linux',
    tier: 3,
    kind: 'fill',
    concept: { en: 'apt & systemd', fr: 'apt et systemd' },
    prompt: {
      en: 'On Debian/Ubuntu: install nginx, start it right now, then make it start automatically at every boot.',
      fr: 'Sous Debian/Ubuntu : installe nginx, démarre-le tout de suite, puis fais-le démarrer automatiquement à chaque boot.',
    },
    template: `sudo apt ___ nginx
sudo systemctl ___ nginx
sudo systemctl ___ nginx`,
    blanks: [['install'], ['start'], ['enable']],
    hint: {
      en: 'Starting a service now and registering it for boot are two different systemctl verbs.',
      fr: 'Démarrer un service maintenant et l’inscrire au démarrage sont deux verbes différents de systemctl.',
    },
    explanation: {
      en: 'apt install downloads a package with its dependencies (run apt update first to refresh the index). systemctl start launches a service now, while systemctl enable only creates the links that start it at boot; enable --now does both. systemctl status nginx shows whether it is running.',
      fr: 'apt install télécharge un paquet avec ses dépendances (lance d’abord apt update pour rafraîchir l’index). systemctl start lance un service immédiatement, alors que systemctl enable crée seulement les liens qui le démarrent au boot ; enable --now fait les deux. systemctl status nginx indique s’il tourne.',
    },
  },

  // ───────────────────────────── Tier 4 — Expert ─────────────────────────────
  {
    id: 'linux-018',
    track: 'linux',
    tier: 4,
    kind: 'command',
    concept: { en: 'HTTP with curl', fr: 'HTTP avec curl' },
    prompt: {
      en: 'Fetch ONLY the HTTP response headers of https://example.com (status line, content type...), not the page body.',
      fr: 'Récupère UNIQUEMENT les en-têtes de réponse HTTP de https://example.com (ligne de statut, type de contenu...), sans le corps de la page.',
    },
    accepted: [
      'curl -I https://example.com',
      'curl --head https://example.com',
      'curl -sI https://example.com',
      'curl -Is https://example.com',
    ],
    patterns: [
      'curl (-[sSLv]*I[sSLv]*|--head)( -[sSLv]+)? ["\']?https?://example\\.com/?["\']?',
      'curl -[sSLv]+ (-I|--head) ["\']?https?://example\\.com/?["\']?',
      'curl ["\']?https?://example\\.com/?["\']? (-[sSLv]*I[sSLv]*|--head)',
    ],
    hint: {
      en: 'curl has an option that sends a HEAD request instead of GET; it is a capital letter.',
      fr: 'curl possède une option qui envoie une requête HEAD au lieu de GET ; c’est une lettre majuscule.',
    },
    explanation: {
      en: 'curl -I sends a HEAD request, so the server returns only the headers: handy to check a status code, a redirect or caching rules. For other network checks, ping tests reachability and ss -tlnp lists the ports your machine is listening on.',
      fr: 'curl -I envoie une requête HEAD : le serveur ne renvoie que les en-têtes, pratique pour vérifier un code de statut, une redirection ou des règles de cache. Pour d’autres diagnostics réseau, ping teste la joignabilité et ss -tlnp liste les ports sur lesquels ta machine écoute.',
    },
  },
  {
    id: 'linux-019',
    track: 'linux',
    tier: 4,
    kind: 'output',
    concept: { en: 'sed & awk', fr: 'sed et awk' },
    prompt: {
      en: 'What does this pipeline print?',
      fr: 'Qu’affiche ce pipeline ?',
    },
    code: `printf "alice 30\\nbob 25\\ncarol 35\\n" | sed 's/bob/dave/' | awk '$2 < 32 { print $1 }'`,
    codeLang: 'bash',
    accepted: ['alice\ndave'],
    hint: {
      en: 'sed rewrites text on the fly; awk splits each line into fields $1, $2... and runs the action only when the condition is true.',
      fr: 'sed réécrit le texte à la volée ; awk découpe chaque ligne en champs $1, $2... et n’exécute l’action que si la condition est vraie.',
    },
    explanation: {
      en: 'sed s/old/new/ substitutes the first match on each line, turning bob into dave. awk then keeps lines whose second field is below 32 and prints the first field: alice (30) and dave (25), but not carol (35).',
      fr: 'sed s/ancien/nouveau/ remplace la première occurrence sur chaque ligne et transforme bob en dave. awk garde ensuite les lignes dont le deuxième champ est inférieur à 32 et affiche le premier champ : alice (30) et dave (25), mais pas carol (35).',
    },
  },
  {
    id: 'linux-020',
    track: 'linux',
    tier: 4,
    kind: 'riddle',
    concept: { en: 'Scheduling with cron', fr: 'Planifier avec cron' },
    prompt: {
      en: 'Five fields decide when I wake:\nminute, hour, day, month, weekday.\n"0 3 * * *" and at three I take\nyour backup script out to play.\nWhich daemon am I?',
      fr: 'Cinq champs décident de mon réveil :\nminute, heure, jour, mois, jour de la semaine.\nAvec « 0 3 * * * », à trois heures sans sommeil\nje lance ton script de sauvegarde sans peine.\nQuel démon suis-je ?',
    },
    accepted: ['cron', 'crond', 'crontab', 'cron job', 'cronjob', 'tache cron', 'tâche cron'],
    hint: {
      en: 'You edit my table with a command ending in "tab -e".',
      fr: 'On modifie ma table avec une commande qui se termine par « tab -e ».',
    },
    explanation: {
      en: 'cron runs commands on a schedule described by five fields: minute, hour, day of month, month, day of week. Edit your jobs with crontab -e; 0 3 * * * means every day at 03:00. Use absolute paths in cron jobs, since cron runs with a minimal PATH.',
      fr: 'cron exécute des commandes selon un calendrier décrit par cinq champs : minute, heure, jour du mois, mois, jour de la semaine. On modifie ses tâches avec crontab -e ; 0 3 * * * signifie tous les jours à 3 h. Utilise des chemins absolus dans les tâches cron, car cron tourne avec un PATH minimal.',
    },
  },
  {
    id: 'linux-021',
    track: 'linux',
    tier: 4,
    kind: 'bug',
    concept: { en: 'ssh & scp', fr: 'ssh et scp' },
    prompt: {
      en: 'This deploy script should send site.tar.gz to the server’s /tmp folder, then unpack it there over ssh. The archive never reaches the server. Click the faulty line.',
      fr: 'Ce script de déploiement doit envoyer site.tar.gz dans le dossier /tmp du serveur, puis l’y décompresser via ssh. L’archive n’arrive jamais sur le serveur. Clique sur la ligne fautive.',
    },
    lines: [
      '#!/bin/bash',
      'set -e',
      'tar -czf site.tar.gz site',
      'scp site.tar.gz deploy@203.0.113.10/tmp/',
      'ssh deploy@203.0.113.10 "tar -xzf /tmp/site.tar.gz -C /var/www"',
    ],
    bugLine: 3,
    hint: {
      en: 'Look closely at how scp tells a remote destination apart from a local path.',
      fr: 'Regarde bien comment scp distingue une destination distante d’un chemin local.',
    },
    explanation: {
      en: 'scp needs a colon between host and path: deploy@203.0.113.10:/tmp/. Without it, scp treats the whole string as a local path and simply copies the file locally (or fails). ssh user@host "command" then runs a command on the remote machine.',
      fr: 'scp exige un deux-points entre l’hôte et le chemin : deploy@203.0.113.10:/tmp/. Sans lui, scp considère toute la chaîne comme un chemin local et se contente de copier le fichier localement (ou échoue). ssh utilisateur@hôte "commande" exécute ensuite une commande sur la machine distante.',
    },
  },
  {
    id: 'linux-022',
    track: 'linux',
    tier: 4,
    kind: 'order',
    concept: { en: 'Backups with tar & du', fr: 'Sauvegardes avec tar et du' },
    prompt: {
      en: 'Order this backup script: it builds a dated folder name, creates the folder, archives /home into it, then shows the archive size.',
      fr: 'Remets ce script de sauvegarde dans l’ordre : il construit un nom de dossier daté, crée le dossier, y archive /home, puis affiche la taille de l’archive.',
    },
    lines: [
      '#!/bin/bash',
      'DEST="/backups/$(date +%F)"',
      'mkdir -p "$DEST"',
      'tar -czf "$DEST/home.tar.gz" /home',
      'du -sh "$DEST/home.tar.gz"',
    ],
    hint: {
      en: 'Each line needs something created by the line before it.',
      fr: 'Chaque ligne a besoin de quelque chose créé par la ligne précédente.',
    },
    explanation: {
      en: '$(date +%F) inserts today’s date (YYYY-MM-DD). tar -czf creates (c) a gzip-compressed (z) archive file (f); tar -xzf extracts it. du -sh shows the size a file or folder uses, while df -h shows the free space left on each filesystem.',
      fr: '$(date +%F) insère la date du jour (AAAA-MM-JJ). tar -czf crée (c) un fichier (f) d’archive compressée avec gzip (z) ; tar -xzf l’extrait. du -sh affiche la taille occupée par un fichier ou un dossier, tandis que df -h affiche l’espace libre restant sur chaque système de fichiers.',
    },
  },
];
