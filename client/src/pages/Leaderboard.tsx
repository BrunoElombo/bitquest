import { HEROES } from '@shared/game';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, type LeaderboardEntry } from '../api';
import { useMusicScene } from '../audio/useMusic';
import { Sprite } from '../components/Sprite';
import { useT } from '../i18n';
import { useGame } from '../store';

const MEDALS = ['🥇', '🥈', '🥉'];

export function Leaderboard() {
  const { t, tl } = useT();
  const me = useGame((s) => s.account);
  const [entries, setEntries] = useState<LeaderboardEntry[] | null>(null);
  useMusicScene('menu', 0.4);

  useEffect(() => {
    api
      .leaderboard()
      .then((r) => setEntries(r.entries))
      .catch(() => setEntries([]));
  }, []);

  return (
    <div className="mx-auto max-w-3xl space-y-5 px-4 py-8">
      <Link to="/" className="text-arcade-muted hover:text-neon-cyan">
        ◀ {t('back')}
      </Link>
      <h1 className="title-pixel neon-text text-center text-lg text-neon-yellow">🏆 {t('leaderboard')}</h1>
      <div className="pixel-panel p-4">
        <table className="w-full text-left text-xl">
          <thead className="title-pixel text-[9px] text-neon-cyan">
            <tr>
              <th className="py-2">{t('rank')}</th>
              <th>{t('player')}</th>
              <th className="text-right">{t('keys')}</th>
              <th className="text-right">{t('score')}</th>
            </tr>
          </thead>
          <tbody>
            {entries === null && (
              <tr>
                <td colSpan={4} className="animate-pulse py-6 text-center">
                  …
                </td>
              </tr>
            )}
            {entries?.map((e) => (
              <tr key={e.username} className={`border-t border-arcade-border/60 ${e.username === me?.username ? 'bg-neon-pink/15 text-neon-pink' : ''}`}>
                <td className="py-2">{MEDALS[e.rank - 1] ?? `#${e.rank}`}</td>
                <td>
                  <span className="flex items-center gap-2">
                    <Sprite frame={HEROES[e.hero].skins[0]} size={24} />
                    {e.username}
                    <span className="text-sm text-arcade-muted">{tl(HEROES[e.hero].name)}</span>
                  </span>
                </td>
                <td className="text-right text-neon-yellow">{'✦'.repeat(e.keys) || '–'}</td>
                <td className="text-right text-neon-yellow">{e.score.toLocaleString()}</td>
              </tr>
            ))}
            {entries?.length === 0 && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-arcade-muted">
                  —
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
