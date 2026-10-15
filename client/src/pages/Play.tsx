import { useEffect, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { music } from '../audio/music';
import { Overlay } from '../components/game/Overlay';
import { exitGame } from '../game/bridge';
import { createGame } from '../game/createGame';
import { useGame } from '../store';

/** Hosts the Phaser canvas and the React overlay (HUD, dialogues, challenges, menus). */
export function Play() {
  const hasSave = useGame((s) => !!s.save);
  const navigate = useNavigate();
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasSave || !host.current) return;
    music.unlock();
    const game = createGame(host.current);
    exitGame.handler = () => navigate('/');
    return () => {
      game.destroy(true);
      useGame.setState({ place: null, boss: null, dialogue: null, encounter: null, pause: null, gameOver: null, banner: null });
    };
    // The game is created once per visit to this page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasSave]);

  if (!hasSave) return <Navigate to="/hero" replace />;

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      <div ref={host} className="absolute inset-0" />
      <Overlay />
    </div>
  );
}
