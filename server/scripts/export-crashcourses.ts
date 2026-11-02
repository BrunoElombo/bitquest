// Exports the dojo crash courses to Markdown, one plan per track in English and French.
// Usage: npm run crashcourses -w server (or npx tsx scripts/export-crashcourses.ts).
import { writeFileSync } from 'node:fs';
import { CHALLENGE_BY_ID } from '../../shared/content';
import { CRASH_COURSES } from '../../shared/crashcourse';
import { TRACKS, TRACK_BY_ID } from '../../shared/tracks';
import type { Lang } from '../../shared/types';

const KIND: Record<Lang, Record<string, string>> = {
  en: {
    mcq: 'multiple choice',
    fill: 'fill in the blanks',
    order: 'put in order',
    bug: 'bug hunt',
    command: 'command',
    output: 'predict output',
    riddle: 'riddle',
    code: 'write code',
  },
  fr: {
    mcq: 'choix multiple',
    fill: 'texte à trous',
    order: 'remise en ordre',
    bug: 'chasse au bug',
    command: 'commande',
    output: 'prédire la sortie',
    riddle: 'énigme',
    code: 'écrire du code',
  },
};

function plan(lang: Lang): string {
  const t = (l: { en: string; fr: string }) => l[lang];
  const lines: string[] = [];
  lines.push(`# BitQuest — ${lang === 'fr' ? 'Cours accélérés' : 'Crash courses'}`);
  lines.push('');
  lines.push(
    lang === 'fr'
      ? 'Chaque Terre possède un dojo à son entrée. Son maître propose un cours accéléré de cinq modules : quatre paliers de difficulté, puis un laboratoire du boss. Les exercices du dojo sont sans chronomètre, sans cœur perdu et sans point perdu ; on peut quitter et reprendre un module quand on veut. Le programme ci-dessous couvre **tous** les défis du cours, avec leurs identifiants, pour réviser hors du jeu.'
      : 'Every Land has a dojo at its entrance. Its master offers a five-module crash course: four difficulty tiers, then a boss lab. Dojo drills are untimed, cost no heart and no point, and a module can be left and resumed at any time. The syllabus below covers **every** challenge in the course, with its id, so you can revise outside the game too.',
  );
  lines.push('');
  lines.push(
    lang === 'fr'
      ? '**Comment suivre un cours :** lis le résumé et les résultats attendus, puis fais les modules dans l’ordre. Pour chaque module : lis l’objectif, réponds à tous les défis, lis chaque explication, puis note les concepts ratés dans ton Codex. Termine par le laboratoire du boss sans indice, puis affronte le vrai boss.'
      : '**How to follow a course:** read the summary and outcomes, then take the modules in order. For each module: read the goal, answer every drill, read every explanation, then add the concepts you missed to your Codex. Finish with the boss lab without hints, then face the real boss.',
  );
  lines.push('');
  lines.push(
    lang === 'fr'
      ? '**Les huit types de défis :** choix multiple, texte à trous, remise en ordre, chasse au bug, commande, prédiction de sortie, énigme et code. Un cours accéléré terminé signifie que tu as rencontré chacun d’eux.'
      : '**The eight challenge types:** multiple choice, fill in the blanks, ordering, bug hunt, command, output prediction, riddle and code. Finishing a crash course means you have met every one of them.',
  );
  lines.push('');
  lines.push(
    lang === 'fr'
      ? '**Chronomètres en combat :** 45 s pour un monstre, 35 s pour une rune de boss, +5 s avec le Voleur. Le dojo, lui, n’a jamais de chronomètre.'
      : '**Combat timers:** 45 s for a monster, 35 s for a boss rune, +5 s with the Rogue. The dojo never has a timer.',
  );
  lines.push('');
  lines.push('| # | ' + (lang === 'fr' ? 'Cours' : 'Course') + ' | ' + (lang === 'fr' ? 'Dojo' : 'Dojo') + ' | ' + (lang === 'fr' ? 'Maître' : 'Master') + ' | ' + (lang === 'fr' ? 'Durée' : 'Duration') + ' | ' + (lang === 'fr' ? 'Modules' : 'Modules') + ' |');
  lines.push('|---|---|---|---|---|---|');
  TRACKS.forEach((track, i) => {
    const c = CRASH_COURSES[track.id];
    lines.push(`| ${i + 1} | ${track.name} | ${t(c.dojo)} | ${t(c.master)} | ${t(c.duration)} | ${c.modules.length} |`);
  });
  lines.push('');

  for (const track of TRACKS) {
    const c = CRASH_COURSES[track.id];
    const boss = TRACK_BY_ID[track.id].boss;
    lines.push(`## ${track.name} — ${t(boss.name)}`);
    lines.push('');
    lines.push(`- **${lang === 'fr' ? 'Dojo' : 'Dojo'} :** ${t(c.dojo)}`);
    lines.push(`- **${lang === 'fr' ? 'Maître' : 'Master'} :** ${t(c.master)}`);
    lines.push(`- **${lang === 'fr' ? 'Durée' : 'Duration'} :** ${t(c.duration)}`);
    lines.push(`- **${lang === 'fr' ? 'Prérequis' : 'Prerequisites'} :** ${t(c.prerequisites)}`);
    lines.push(`- **${lang === 'fr' ? 'Boss' : 'Boss'} :** ${t(boss.name)} — ${t(boss.title)}`);
    lines.push('');
    lines.push(`**${lang === 'fr' ? 'Résumé' : 'Summary'} :** ${t(c.summary)}`);
    lines.push('');
    lines.push(`**${lang === 'fr' ? 'Résultats attendus' : 'Outcomes'} :**`);
    for (const o of c.outcomes) lines.push(`- ${t(o)}`);
    lines.push('');
    lines.push(`**${lang === 'fr' ? 'Méthodes de travail' : 'Study methods'} :**`);
    for (const m of c.methods) lines.push(`- ${t(m)}`);
    lines.push('');

    c.modules.forEach((m, i) => {
      lines.push(`### ${lang === 'fr' ? 'Module' : 'Module'} ${i + 1} — ${t(m.title)}`);
      lines.push('');
      lines.push(`**${lang === 'fr' ? 'Objectif' : 'Goal'} :** ${t(m.goal)}`);
      lines.push('');
      lines.push(`**${lang === 'fr' ? 'Concepts' : 'Concepts'} (${m.concepts.length}) :** ${m.concepts.map((x) => t(x)).join(' · ')}`);
      lines.push('');
      lines.push(`**${lang === 'fr' ? 'Exercices' : 'Drills'} (${m.drills.length}) :**`);
      for (const id of m.drills) {
        const ch = CHALLENGE_BY_ID.get(id);
        if (!ch) continue;
        lines.push(`- \`${id}\` — ${t(ch.concept)} (${KIND[lang][ch.kind]})`);
      }
      lines.push('');
      lines.push(`**${lang === 'fr' ? 'Méthode' : 'Method'} :** ${t(m.method)}`);
      lines.push('');
    });

    lines.push(`### ${lang === 'fr' ? 'Examen blanc' : 'Boss lab'}`);
    lines.push('');
    lines.push(t(c.exam));
    lines.push('');
    lines.push('---');
    lines.push('');
  }

  lines.push(
    lang === 'fr'
      ? '_Généré depuis `shared/crashcourse.ts` par `npm run crashcourses -w server`. Ne pas éditer à la main._'
      : '_Generated from `shared/crashcourse.ts` by `npm run crashcourses -w server`. Do not edit by hand._',
  );
  lines.push('');
  return lines.join('\n');
}

writeFileSync(new URL('../../CRASH_COURSES.md', import.meta.url), plan('en'), 'utf8');
writeFileSync(new URL('../../CRASH_COURSES.fr.md', import.meta.url), plan('fr'), 'utf8');
console.log('Wrote CRASH_COURSES.md and CRASH_COURSES.fr.md');
