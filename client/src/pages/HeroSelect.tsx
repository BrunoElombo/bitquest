import { HEROES, type HeroClass } from '@shared/game';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { music } from '../audio/music';
import { useMusicScene } from '../audio/useMusic';
import { Sprite } from '../components/Sprite';
import { useT } from '../i18n';
import { useGame } from '../store';

const ORDER: HeroClass[] = ['knight', 'mage', 'rogue', 'bard'];

/** Arcade character select: ← → choose a hero, ↑ ↓ change the look, Enter to start. */
export function HeroSelect() {
  const { t, tl } = useT();
  const navigate = useNavigate();
  const newGame = useGame((s) => s.newGame);
  const [idx, setIdx] = useState(0);
  const [skins, setSkins] = useState<Record<HeroClass, number>>({ knight: 0, mage: 0, rogue: 0, bard: 0 });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  useMusicScene('menu', 0.45);

  const hero = HEROES[ORDER[idx]];
  const skin = skins[hero.id];

  const start = useCallback(async () => {
    if (busy) return;
    setBusy(true);
    try {
      await newGame(hero.id, skin);
      music.sfx('levelUp');
      navigate('/play');
    } catch (e) {
      setError((e as Error).message);
      setBusy(false);
    }
  }, [busy, newGame, hero.id, skin, navigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key;
      if (k === 'ArrowLeft' || k === 'a' || k === 'q') setIdx((i) => (i + ORDER.length - 1) % ORDER.length);
      else if (k === 'ArrowRight' || k === 'd') setIdx((i) => (i + 1) % ORDER.length);
      else if (k === 'ArrowUp' || k === 'ArrowDown' || k === 'w' || k === 's' || k === 'z') {
        const n = HEROES[ORDER[idx]].skins.length;
        const d = k === 'ArrowUp' || k === 'w' || k === 'z' ? -1 : 1;
        setSkins((s) => ({ ...s, [ORDER[idx]]: (s[ORDER[idx]] + n + d) % n }));
      } else if (k === 'Enter') void start();
      else return;
      music.sfx('click');
      e.preventDefault();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [idx, start]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Link to="/" className="text-arcade-muted hover:text-neon-cyan">
        ◀ {t('back')}
      </Link>
      <h1 className="title-pixel neon-text mt-4 mb-8 text-center text-lg text-neon-yellow sm:text-2xl">{t('chooseHero')}</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {ORDER.map((id, i) => {
          const h = HEROES[id];
          const selected = i === idx;
          return (
            <button
              key={id}
              onClick={() => {
                setIdx(i);
                music.sfx('click');
              }}
              className={`pixel-panel flex flex-col items-center p-4 transition-transform ${selected ? 'scale-105 border-neon-yellow!' : 'opacity-70 hover:opacity-100'}`}
            >
              <Sprite frame={h.skins[skins[id]]} size={96} className={selected ? 'animate-bob' : ''} />
              <div className="title-pixel mt-4 text-xs text-neon-cyan">{tl(h.name)}</div>
              <div className="mt-2 text-lg text-neon-red">{'♥'.repeat(h.maxHearts)}</div>
              <p className="mt-2 min-h-14 text-lg leading-tight">{tl(h.perk)}</p>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="flex items-center gap-4 text-xl">
          <span className="text-arcade-muted">{t('skin')}:</span>
          {hero.skins.map((f, i) => (
            <button
              key={f}
              onClick={() => setSkins((s) => ({ ...s, [hero.id]: i }))}
              className={`border-4 p-1 ${i === skin ? 'border-neon-pink' : 'border-arcade-border'}`}
              aria-label={`${t('skin')} ${i + 1}`}
            >
              <Sprite frame={f} size={40} />
            </button>
          ))}
        </div>
        {error && <p className="text-neon-red">{error}</p>}
        <button className="pixel-btn green text-sm" disabled={busy} onClick={start}>
          ⚔ {t('startAdventure')}
        </button>
        <p className="text-base text-arcade-muted">← → · ↑ ↓ · Enter</p>
      </div>
    </div>
  );
}
