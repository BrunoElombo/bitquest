import { useEffect, type ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { music } from './audio/music';
import { useT } from './i18n';
import { Codex } from './pages/Codex';
import { HeroSelect } from './pages/HeroSelect';
import { Leaderboard } from './pages/Leaderboard';
import { Play } from './pages/Play';
import { Settings } from './pages/Settings';
import { Title } from './pages/Title';
import { useGame } from './store';

/** Playing requires an account: every page except the title screen needs a login. */
function RequireAccount({ children }: { children: ReactNode }) {
  const account = useGame((s) => s.account);
  return account ? <>{children}</> : <Navigate to="/" replace />;
}

export function App() {
  const { t } = useT();
  const booting = useGame((s) => s.booting);
  const boot = useGame((s) => s.boot);
  const settings = useGame((s) => s.settings);

  useEffect(() => {
    void boot();
  }, [boot]);

  // Browsers only allow audio after a user gesture: start the engine on the first one.
  useEffect(() => {
    const unlock = () => music.unlock();
    window.addEventListener('pointerdown', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = settings.lang;
  }, [settings.lang]);

  return (
    <BrowserRouter>
      <div className={`min-h-screen ${settings.crt ? 'crt' : ''} ${settings.reducedMotion ? 'reduced-motion' : ''}`}>
        {booting ? (
          <p className="title-pixel pt-40 text-center text-xs animate-pulse">{t('loading')}</p>
        ) : (
          <Routes>
            <Route path="/" element={<Title />} />
            <Route path="/hero" element={<RequireAccount><HeroSelect /></RequireAccount>} />
            <Route path="/play" element={<RequireAccount><Play /></RequireAccount>} />
            <Route path="/codex" element={<RequireAccount><Codex /></RequireAccount>} />
            <Route path="/leaderboard" element={<RequireAccount><Leaderboard /></RequireAccount>} />
            <Route path="/settings" element={<RequireAccount><Settings /></RequireAccount>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}
