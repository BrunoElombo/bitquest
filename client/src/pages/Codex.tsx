import { CHALLENGES_BY_TRACK } from '@shared/content';
import { TRACKS } from '@shared/tracks';
import type { TrackId } from '@shared/types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMusicScene } from '../audio/useMusic';
import { CodeBlock } from '../components/CodeBlock';
import { RichText } from '../components/RichText';
import { langOf } from '../components/challenge/views';
import { useT } from '../i18n';
import { useGame } from '../store';

/** The learner's notebook: every concept they have solved, with its explanation. */
export function Codex() {
  const { t, tl } = useT();
  const solved = new Set(useGame((s) => s.solved));
  const [filter, setFilter] = useState<TrackId | 'all'>('all');
  const [query, setQuery] = useState('');
  useMusicScene('review', 0.15);

  const q = query.trim().toLowerCase();
  const entries = TRACKS.filter((tr) => filter === 'all' || tr.id === filter).map((tr) => ({
    track: tr,
    items: CHALLENGES_BY_TRACK[tr.id].filter(
      (c) =>
        solved.has(c.id) &&
        (!q || tl(c.concept).toLowerCase().includes(q) || tl(c.explanation).toLowerCase().includes(q)),
    ),
  }));
  const total = entries.reduce((n, e) => n + e.items.length, 0);

  return (
    <div className="space-y-5">
      <header>
        <Link to="/" className="text-arcade-muted hover:text-neon-cyan">
          ◀ {t('back')}
        </Link>
        <h1 className="title-pixel neon-text text-lg text-neon-purple">📖 {t('codex')}</h1>
        <p className="mt-2 text-xl text-arcade-muted">{t('codexIntro')}</p>
      </header>

      <div className="flex flex-wrap gap-2">
        <input className="pixel-input min-w-0 flex-1" placeholder={t('search')} value={query} onChange={(e) => setQuery(e.target.value)} />
        <select
          className="pixel-input"
          value={filter}
          onChange={(e) => setFilter(e.target.value as TrackId | 'all')}
          aria-label="track"
        >
          <option value="all">★ All</option>
          {TRACKS.map((tr) => (
            <option key={tr.id} value={tr.id}>
              {tr.name}
            </option>
          ))}
        </select>
      </div>

      {total === 0 && <p className="pixel-panel p-6 text-center text-xl">{t('codexEmpty')}</p>}

      {entries
        .filter((e) => e.items.length)
        .map(({ track, items }) => (
          <section key={track.id}>
            <h2 className="title-pixel mb-3 text-xs" style={{ color: track.color }}>
              {track.name} · {items.length}
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              {items.map((c) => (
                <details key={c.id} className="pixel-panel group p-4">
                  <summary className="cursor-pointer list-none text-xl">
                    <span className="mr-2 text-neon-yellow group-open:hidden">▸</span>
                    <span className="mr-2 hidden text-neon-yellow group-open:inline">▾</span>
                    <span className="text-neon-cyan">{tl(c.concept)}</span>
                    <span className="ml-2 text-base text-arcade-muted">T{c.tier}</span>
                  </summary>
                  <p className="mt-3 text-lg"><RichText text={tl(c.explanation)} /></p>
                  {c.kind === 'code' && <CodeBlock className="mt-3" code={c.solution} lang={c.language} />}
                  {c.kind === 'output' && <CodeBlock className="mt-3" code={c.code} lang={langOf(c)} />}
                </details>
              ))}
            </div>
          </section>
        ))}
    </div>
  );
}
