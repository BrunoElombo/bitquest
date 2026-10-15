import type { L, Lang } from '@shared/types';
import { useGame } from './store';

const STRINGS = {
  // Title & account
  subtitle: { en: 'The Legend of Bytaria', fr: 'La Légende de Bytaria' },
  pressStart: { en: 'PRESS START', fr: 'APPUIE SUR START' },
  accountRequired: { en: 'An account is required to play: your adventure is saved online.', fr: 'Un compte est nécessaire pour jouer : ton aventure est sauvegardée en ligne.' },
  login: { en: 'Login', fr: 'Connexion' },
  register: { en: 'Create account', fr: 'Créer un compte' },
  username: { en: 'Username', fr: "Nom d'utilisateur" },
  password: { en: 'Password', fr: 'Mot de passe' },
  logout: { en: 'Logout', fr: 'Déconnexion' },
  continueGame: { en: 'Continue', fr: 'Continuer' },
  newGame: { en: 'New adventure', fr: 'Nouvelle aventure' },
  newGameWarning: { en: 'Starting over erases your current adventure. Continue?', fr: 'Recommencer efface ton aventure actuelle. Continuer ?' },
  welcome: { en: 'Welcome back', fr: 'Bon retour' },
  // Hero select
  chooseHero: { en: 'Choose your hero', fr: 'Choisis ton héros' },
  skin: { en: 'Look', fr: 'Apparence' },
  startAdventure: { en: 'Start the adventure', fr: "Commencer l'aventure" },
  hearts: { en: 'Hearts', fr: 'Cœurs' },
  // HUD
  score: { en: 'SCORE', fr: 'SCORE' },
  keys: { en: 'KEYS', fr: 'CLÉS' },
  letters: { en: 'LETTERS', fr: 'LETTRES' },
  controlsHint: { en: '←↑→↓ / WASD move · SPACE act · P pause · M mute · H help', fr: '←↑→↓ / ZQSD bouger · ESPACE agir · P pause · M muet · H aide' },
  spaceContinue: { en: 'SPACE ▶', fr: 'ESPACE ▶' },
  // Pause
  paused: { en: 'PAUSED', fr: 'PAUSE' },
  resume: { en: 'Resume', fr: 'Reprendre' },
  saveQuit: { en: 'Save & quit', fr: 'Sauvegarder et quitter' },
  controls: { en: 'Controls', fr: 'Commandes' },
  controlsList: {
    en: 'Move: arrow keys, WASD/ZQSD, gamepad stick or D-pad, or the touch pad\nTalk / open / enter: SPACE, ENTER, E, gamepad A or the touch A button\nPause menu: ESC, P or gamepad START\nControls help: H\nMute sound: M\nFullscreen: F',
    fr: 'Bouger : flèches, ZQSD/WASD, stick ou croix de la manette, ou le pavé tactile\nParler / ouvrir / entrer : ESPACE, ENTRÉE, E, bouton A ou le bouton tactile A\nMenu pause : ÉCHAP, P ou START\nAide des commandes : H\nCouper le son : M\nPlein écran : F',
  },
  pause: { en: 'Pause', fr: 'Pause' },
  help: { en: 'Help', fr: 'Aide' },
  mute: { en: 'Mute', fr: 'Couper le son' },
  unmute: { en: 'Unmute', fr: 'Rétablir le son' },
  fullscreen: { en: 'Fullscreen', fr: 'Plein écran' },
  exitFullscreen: { en: 'Exit fullscreen', fr: 'Quitter le plein écran' },
  quit: { en: 'Quit', fr: 'Quitter' },
  restartCheckpoint: { en: 'Restart from checkpoint', fr: 'Reprendre au point de contrôle' },
  backToWorld: { en: 'Back to the world map', fr: 'Retour à la carte du monde' },
  touchControls: { en: 'Touch controls', fr: 'Commandes tactiles' },
  on: { en: 'on', fr: 'activées' },
  off: { en: 'off', fr: 'désactivées' },
  quitConfirm: { en: 'Save your progress and return to the title screen?', fr: 'Sauvegarder ta progression et revenir à l’écran titre ?' },
  yesQuit: { en: 'Yes, save & quit', fr: 'Oui, sauvegarder et quitter' },
  cancel: { en: 'Cancel', fr: 'Annuler' },
  // Game over
  gameOver: { en: 'GAME OVER', fr: 'GAME OVER' },
  pointsLost: { en: 'points lost in this Land', fr: 'points perdus dans cette Terre' },
  backToCheckpoint: { en: 'Back to the last checkpoint', fr: 'Retour au dernier point de contrôle' },
  // Encounters
  submit: { en: 'Submit', fr: 'Valider' },
  next: { en: 'Continue', fr: 'Continuer' },
  hintCost: { en: 'Hint (−100 pts)', fr: 'Indice (−100 pts)' },
  hintFree: { en: 'Hint (free: Mage perk)', fr: 'Indice (gratuit : don du Mage)' },
  correct: { en: 'CORRECT!', fr: 'CORRECT !' },
  wrong: { en: 'WRONG!', fr: 'RATÉ !' },
  timeUp: { en: "TIME'S UP!", fr: 'TEMPS ÉCOULÉ !' },
  answerWas: { en: 'Answer', fr: 'Réponse' },
  why: { en: 'Why?', fr: 'Pourquoi ?' },
  heartLost: { en: '−1 ❤', fr: '−1 ❤' },
  extraLife: { en: 'Extra heart!', fr: 'Cœur bonus !' },
  checking: { en: 'Checking…', fr: 'Vérification…' },
  tier: { en: 'Tier', fr: 'Palier' },
  runTests: { en: 'Run tests', fr: 'Lancer les tests' },
  running: { en: 'Running…', fr: 'Exécution…' },
  giveUp: { en: 'Give up', fr: 'Abandonner' },
  reset: { en: 'Reset', fr: 'Réinitialiser' },
  loadingPython: { en: 'Loading Python runtime (first time only)…', fr: 'Chargement de Python (première fois seulement)…' },
  output: { en: 'Output', fr: 'Sortie' },
  yourOutput: { en: 'Type the exact output…', fr: 'Tape la sortie exacte…' },
  yourAnswer: { en: 'Your answer…', fr: 'Ta réponse…' },
  typeCommand: { en: 'type a command and press Enter', fr: 'tape une commande puis Entrée' },
  clickBugLine: { en: 'Click the buggy line', fr: 'Clique sur la ligne fautive' },
  reorder: { en: 'Use ▲ ▼ to put the lines in order', fr: 'Utilise ▲ ▼ pour remettre les lignes dans l’ordre' },
  console: { en: 'Console', fr: 'Console' },
  testsPassed: { en: 'All tests passed!', fr: 'Tous les tests passent !' },
  checkpointSaved: { en: 'Checkpoint saved', fr: 'Point de contrôle enregistré' },
  // Pages
  leaderboard: { en: 'Hall of Fame', fr: 'Panthéon' },
  codex: { en: 'Codex', fr: 'Codex' },
  codexIntro: { en: 'Every concept you master is written here: your personal programming notebook.', fr: 'Chaque concept maîtrisé est noté ici : ton carnet de programmation personnel.' },
  codexEmpty: { en: 'Answer challenges in the game to fill your Codex.', fr: 'Réponds aux défis du jeu pour remplir ton Codex.' },
  search: { en: 'Search…', fr: 'Rechercher…' },
  settings: { en: 'Settings', fr: 'Réglages' },
  language: { en: 'Language', fr: 'Langue' },
  music: { en: 'Music', fr: 'Musique' },
  sfx: { en: 'Sound effects', fr: 'Effets sonores' },
  crt: { en: 'CRT scanlines', fr: 'Effet écran CRT' },
  reducedMotion: { en: 'Reduce motion', fr: 'Réduire les animations' },
  rank: { en: 'Rank', fr: 'Rang' },
  player: { en: 'Player', fr: 'Joueur' },
  hero: { en: 'Hero', fr: 'Héros' },
  back: { en: 'Back', fr: 'Retour' },
  loading: { en: 'LOADING…', fr: 'CHARGEMENT…' },
  error: { en: 'Something went wrong', fr: 'Une erreur est survenue' },
} satisfies Record<string, L>;

export type StringKey = keyof typeof STRINGS;

export function translate(key: StringKey, lang: Lang): string {
  return STRINGS[key][lang];
}

/** `t('key')` for UI strings, `tl(l)` for bilingual content objects. */
export function useT() {
  const lang = useGame((s) => s.settings.lang);
  return {
    lang,
    t: (key: StringKey) => STRINGS[key][lang],
    tl: (l: L) => l[lang],
  };
}

/** Non-React access (Phaser scenes). */
export function tl(l: L): string {
  return l[useGame.getState().settings.lang];
}
