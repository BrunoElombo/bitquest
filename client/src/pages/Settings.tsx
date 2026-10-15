import { Link } from 'react-router-dom';
import { music } from '../audio/music';
import { useMusicScene } from '../audio/useMusic';
import { useT } from '../i18n';
import { useGame } from '../store';

export function Settings() {
  const { t } = useT();
  const { settings, updateSettings, touchControls, setTouchControls } = useGame();
  useMusicScene('menu', 0.3);

  const slider = (key: 'musicVolume' | 'sfxVolume', label: string) => (
    <label className="block">
      <span className="flex justify-between text-xl">
        {label} <span className="text-neon-yellow">{Math.round(settings[key] * 100)}%</span>
      </span>
      <input
        type="range"
        min={0}
        max={1}
        step={0.05}
        value={settings[key]}
        onChange={(e) => updateSettings({ [key]: Number(e.target.value) })}
        onMouseUp={() => key === 'sfxVolume' && music.sfx('coin')}
        className="w-full accent-neon-pink"
      />
    </label>
  );

  const toggle = (key: 'crt' | 'reducedMotion', label: string) => (
    <label className="flex cursor-pointer items-center justify-between text-xl">
      {label}
      <input type="checkbox" checked={settings[key]} onChange={(e) => updateSettings({ [key]: e.target.checked })} className="h-5 w-5 accent-neon-cyan" />
    </label>
  );

  return (
    <div className="mx-auto max-w-xl space-y-6 px-4 py-8">
      <Link to="/" className="text-arcade-muted hover:text-neon-cyan">
        ◀ {t('back')}
      </Link>
      <h1 className="title-pixel neon-text text-lg text-neon-cyan">⚙ {t('settings')}</h1>
      <section className="pixel-panel space-y-5 p-5">
        <div className="flex items-center justify-between text-xl">
          {t('language')}
          <div className="flex gap-2">
            {(['en', 'fr'] as const).map((l) => (
              <button key={l} onClick={() => updateSettings({ lang: l })} className={`pixel-btn ${settings.lang === l ? 'yellow' : 'ghost'}`}>
                {l === 'en' ? '🇬🇧 EN' : '🇫🇷 FR'}
              </button>
            ))}
          </div>
        </div>
        {slider('musicVolume', `🎵 ${t('music')}`)}
        {slider('sfxVolume', `🔊 ${t('sfx')}`)}
        {toggle('crt', `📺 ${t('crt')}`)}
        {toggle('reducedMotion', `🐢 ${t('reducedMotion')}`)}
        <label className="flex cursor-pointer items-center justify-between text-xl">
          📱 {t('touchControls')}
          <input type="checkbox" checked={touchControls} onChange={(e) => setTouchControls(e.target.checked)} className="h-5 w-5 accent-neon-cyan" />
        </label>
      </section>
      <section className="pixel-panel p-5">
        <h2 className="title-pixel mb-2 text-[10px] text-neon-pink">{t('controls')}</h2>
        <p className="whitespace-pre-line text-lg">{t('controlsList')}</p>
      </section>
    </div>
  );
}
