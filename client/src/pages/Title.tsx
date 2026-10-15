import { TRACKS } from '@shared/tracks';
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { music } from '../audio/music';
import { useMusicScene } from '../audio/useMusic';
import { Sprite } from '../components/Sprite';
import { DUNGEON } from '../game/assets';
import { useT } from '../i18n';
import { useGame } from '../store';

export function Title() {
  const { t, lang } = useT();
  const navigate = useNavigate();
  const { account, save, login, register, logout, updateSettings } = useGame();
  const [started, setStarted] = useState(false);
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  useMusicScene('menu', 0.2);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await (tab === 'login' ? login(username, password) : register(username, password));
      music.sfx('coin');
    } catch (err) {
      setError((err as Error).message);
      music.sfx('wrong');
    } finally {
      setBusy(false);
    }
  };

  const newGame = () => {
    if (save && !confirm(t('newGameWarning'))) return;
    navigate('/hero');
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col items-center px-4 pt-10 pb-16 text-center">
      <div className="mb-6 flex items-end gap-3">
        <Sprite frame={DUNGEON.knight} size={48} className="animate-bob" />
        <Sprite frame={DUNGEON.princess} size={48} className="animate-bob" style={{ animationDelay: '0.3s' }} />
        <Sprite frame={DUNGEON.crab} size={64} className="animate-bob" style={{ animationDelay: '0.6s', filter: 'hue-rotate(220deg)' }} />
      </div>
      <h1 className="title-pixel neon-text text-4xl text-neon-pink sm:text-6xl">BITQUEST</h1>
      <h2 className="title-pixel neon-text mt-3 text-xs text-neon-cyan sm:text-sm">{t('subtitle')}</h2>
      <div className="mt-5 flex flex-wrap justify-center gap-1.5">
        {TRACKS.map((tr) => (
          <span key={tr.id} className="font-pixel border-2 border-arcade-deep px-1.5 py-0.5 text-[8px] text-arcade-deep" style={{ background: tr.color }}>
            {tr.name}
          </span>
        ))}
      </div>

      {!started ? (
        <button
          autoFocus
          className="title-pixel mt-14 animate-blink text-sm text-neon-yellow sm:text-base"
          onClick={() => {
            music.unlock();
            music.sfx('start');
            setStarted(true);
          }}
        >
          ▶ {t('pressStart')} ◀
        </button>
      ) : account ? (
        <div className="pixel-panel mt-10 w-full max-w-sm animate-pop space-y-3 p-6">
          <p className="text-xl text-arcade-muted">
            {t('welcome')}, <span className="text-neon-cyan">{account.username}</span>
          </p>
          {save && (
            <button autoFocus className="pixel-btn green w-full" onClick={() => navigate('/play')}>
              ▶ {t('continueGame')}
            </button>
          )}
          <button autoFocus={!save} className={`pixel-btn w-full ${save ? 'ghost' : 'green'}`} onClick={newGame}>
            ✦ {t('newGame')}
          </button>
          <Link to="/leaderboard" className="pixel-btn ghost block w-full">
            🏆 {t('leaderboard')}
          </Link>
          <Link to="/codex" className="pixel-btn ghost block w-full">
            📖 {t('codex')}
          </Link>
          <Link to="/settings" className="pixel-btn ghost block w-full">
            ⚙ {t('settings')}
          </Link>
          <button className="pt-2 text-lg text-arcade-muted hover:text-neon-red" onClick={logout}>
            ⏻ {t('logout')}
          </button>
        </div>
      ) : (
        <div className="pixel-panel mt-10 w-full max-w-sm animate-pop p-6 text-left">
          <p className="mb-4 text-lg text-arcade-muted">{t('accountRequired')}</p>
          <div className="mb-4 flex gap-2">
            {(['login', 'register'] as const).map((k) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`flex-1 border-b-4 pb-1 text-xl ${tab === k ? 'border-neon-pink text-neon-pink' : 'border-transparent text-arcade-muted'}`}
              >
                {t(k)}
              </button>
            ))}
          </div>
          <form onSubmit={submit} className="space-y-3">
            <input autoFocus className="pixel-input w-full" placeholder={t('username')} value={username} autoComplete="username" onChange={(e) => setUsername(e.target.value)} />
            <input
              className="pixel-input w-full"
              type="password"
              placeholder={t('password')}
              value={password}
              autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-neon-red">{error}</p>}
            <button className="pixel-btn pink w-full" disabled={busy || !username || !password}>
              {t(tab)}
            </button>
          </form>
        </div>
      )}

      <button className="mt-8 border-2 border-arcade-border px-3 text-lg hover:border-neon-cyan" onClick={() => updateSettings({ lang: lang === 'en' ? 'fr' : 'en' })}>
        {lang === 'en' ? '🇫🇷 Français' : '🇬🇧 English'}
      </button>
      <p className="mt-6 text-sm text-arcade-muted">Pixel art: Kenney.nl (CC0)</p>
    </div>
  );
}
