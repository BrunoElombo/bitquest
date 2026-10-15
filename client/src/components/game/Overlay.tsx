import { HEROES, LAND_IDS, SHRINES_PER_LAND, type EncounterResponse } from '@shared/game';
import type { AnswerValue } from '@shared/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { api } from '../../api';
import { music } from '../../audio/music';
import { useT } from '../../i18n';
import { isFullscreen, toggleFullscreen, virtualInput } from '../../game/controls';
import { personalize, useGame, type EncounterUIRequest, type PauseView } from '../../store';
import { ChallengeCard, Feedback } from '../challenge/ChallengeCard';
import { RichText } from '../RichText';
import { Sprite } from '../Sprite';

/** Everything React draws on top of the Phaser canvas. */
export function Overlay() {
  const dialogue = useGame((s) => s.dialogue);
  const encounter = useGame((s) => s.encounter);
  const pause = useGame((s) => s.pause);
  const gameOver = useGame((s) => s.gameOver);
  useGlobalShortcuts();
  return (
    <>
      <Hud />
      <TouchPad />
      <Banner />
      {dialogue && <DialogueBox key={dialogue.lines.length + (dialogue.lines[0]?.text.en ?? '')} />}
      {encounter && <EncounterModal key={encounter.req.challenge.id + encounter.req.targetId} req={encounter.req} />}
      {pause && <PauseMenu />}
      {gameOver && <GameOverScreen />}
      <Toasts />
    </>
  );
}

// ------------------------------------------------------------------ HUD

function Hud() {
  const { t, tl } = useT();
  const save = useGame((s) => s.save);
  const account = useGame((s) => s.account);
  const place = useGame((s) => s.place);
  const boss = useGame((s) => s.boss);
  if (!save) return null;
  const hero = HEROES[save.hero];
  const slots = Math.max(save.maxHearts, save.hearts);
  const land = place?.land ? save.lands[place.land] : null;

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-wrap items-start gap-3 p-2 sm:p-3">
      <div className="pixel-panel flex items-center gap-3 px-3 py-2">
        <Sprite frame={hero.skins[save.skin]} size={32} />
        <div>
          <div className="title-pixel text-[9px] text-neon-cyan">{account?.username}</div>
          <div className="mt-1 flex gap-0.5 text-lg leading-none" aria-label={`${save.hearts} ${t('hearts')}`}>
            {Array.from({ length: slots }, (_, i) => (
              <span key={i} className={i < save.hearts ? 'text-neon-red' : 'text-arcade-border'}>
                ♥
              </span>
            ))}
          </div>
        </div>
        <div className="ml-2 text-right">
          <div className="title-pixel text-[8px] text-arcade-muted">{t('score')}</div>
          <div className="title-pixel text-sm text-neon-yellow">{save.score.toLocaleString()}</div>
        </div>
      </div>

      <div className="pixel-panel mx-auto px-3 py-2 text-center">
        {place && <div className="title-pixel text-[9px] text-neon-pink">{tl(place.label)}</div>}
        {land && (
          <div className="mt-1 text-base text-arcade-muted">
            {t('letters')}{' '}
            {Array.from({ length: SHRINES_PER_LAND }, (_, i) => (
              <span key={i} className={i < land.shrines.length ? 'text-neon-green' : 'text-arcade-border'}>
                ✉
              </span>
            ))}
          </div>
        )}
        {boss && (
          <div className="mt-1 w-56">
            <div className="text-sm text-neon-red">{tl(boss.name)}</div>
            <div className="h-3 border-2 border-arcade-deep bg-arcade-deep">
              <div
                className="h-full bg-neon-red transition-all duration-500"
                style={{ width: `${(1 - boss.hits / boss.needed) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="pixel-panel px-3 py-2">
          <div className="title-pixel text-[8px] text-arcade-muted">{t('keys')}</div>
          <div className="mt-1 flex gap-1">
            {LAND_IDS.map((id) => (
              <span key={id} title={id} className={save.lands[id].bossDefeated ? 'text-neon-yellow' : 'text-arcade-border'}>
                ✦
              </span>
            ))}
          </div>
        </div>
        <ControlBar />
      </div>
      <div className="absolute right-3 bottom-[-28px] hidden text-sm text-arcade-muted/80 md:block">{t('controlsHint')}</div>
    </div>
  );
}

/** Whether a React overlay currently owns the input (the world is frozen). */
const useOverlayOpen = () => useGame((s) => !!(s.dialogue || s.encounter || s.pause || s.gameOver));

/** Clickable game controls under the keys panel: pause, sound, fullscreen, help, quit. */
function ControlBar() {
  const { t } = useT();
  const muted = useGame((s) => s.muted);
  const toggleMute = useGame((s) => s.toggleMute);
  const blocked = useOverlayOpen();
  const full = useFullscreen();

  const btn =
    'pixel-panel pointer-events-auto flex h-9 w-9 items-center justify-center text-lg leading-none hover:border-neon-cyan disabled:cursor-not-allowed disabled:opacity-40';
  // Blur after a click so SPACE (the action key) never re-presses the button.
  const click = (fn: () => void) => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    music.sfx('click');
    fn();
  };
  const menu = (view: PauseView) => () => (virtualInput.menu = view);

  return (
    <div className="flex gap-1" role="toolbar" aria-label={t('controls')}>
      <button className={btn} title={`${t('pause')} (P)`} aria-label={t('pause')} disabled={blocked} onClick={click(menu('main'))}>
        ⏸
      </button>
      <button className={btn} title={`${muted ? t('unmute') : t('mute')} (M)`} aria-label={muted ? t('unmute') : t('mute')} aria-pressed={muted} onClick={click(toggleMute)}>
        {muted ? '🔇' : '🔊'}
      </button>
      <button className={btn} title={`${full ? t('exitFullscreen') : t('fullscreen')} (F)`} aria-label={full ? t('exitFullscreen') : t('fullscreen')} aria-pressed={full} onClick={click(toggleFullscreen)}>
        ⛶
      </button>
      <button className={btn} title={`${t('help')} (H)`} aria-label={t('help')} disabled={blocked} onClick={click(menu('controls'))}>
        ?
      </button>
      <button className={btn} title={t('quit')} aria-label={t('quit')} disabled={blocked} onClick={click(menu('quit'))}>
        ⏻
      </button>
    </div>
  );
}

function useFullscreen(): boolean {
  const [full, setFull] = useState(isFullscreen());
  useEffect(() => {
    const on = () => setFull(isFullscreen());
    document.addEventListener('fullscreenchange', on);
    return () => document.removeEventListener('fullscreenchange', on);
  }, []);
  return full;
}

/** M mutes, F toggles fullscreen, from anywhere in the game except while typing an answer. */
function useGlobalShortcuts() {
  const toggleMute = useGame((s) => s.toggleMute);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (e.ctrlKey || e.metaKey || e.altKey || el?.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el?.tagName ?? '')) return;
      const key = e.key.toLowerCase();
      if (key === 'm') toggleMute();
      else if (key === 'f') toggleFullscreen();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggleMute]);
}

/** On-screen joystick and action button for phones and tablets. */
function TouchPad() {
  const on = useGame((s) => s.touchControls);
  const blocked = useOverlayOpen();
  const pad = useRef<HTMLDivElement>(null);
  const [knob, setKnob] = useState({ x: 0, y: 0 });

  const release = useCallback(() => {
    virtualInput.vx = 0;
    virtualInput.vy = 0;
    setKnob({ x: 0, y: 0 });
  }, []);
  // Never leave the hero walking when the pad disappears under an overlay.
  useEffect(() => {
    if (!on || blocked) release();
  }, [on, blocked, release]);
  useEffect(() => release, [release]);

  if (!on) return null;

  const steer = (e: React.PointerEvent) => {
    const r = pad.current!.getBoundingClientRect();
    let dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    let dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    const len = Math.hypot(dx, dy);
    if (len > 1) {
      dx /= len;
      dy /= len;
    }
    virtualInput.vx = Math.abs(dx) > 0.25 ? dx : 0;
    virtualInput.vy = Math.abs(dy) > 0.25 ? dy : 0;
    setKnob({ x: dx, y: dy });
  };

  const pressA = () => {
    const s = useGame.getState();
    // Dialogues and the Game Over screen listen to the keyboard: forward the press as SPACE.
    if (s.dialogue || s.gameOver) window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    else virtualInput.act = true;
  };

  return (
    <>
      {!blocked && (
        <div
          ref={pad}
          aria-hidden
          className="pointer-events-auto absolute bottom-6 left-6 z-20 h-32 w-32 touch-none select-none rounded-full border-4 border-arcade-border bg-arcade-deep/60"
          onPointerDown={(e) => {
            try {
              e.currentTarget.setPointerCapture(e.pointerId);
            } catch {
              /* pointer already gone: steering still works without capture */
            }
            steer(e);
          }}
          onPointerMove={(e) => e.buttons && steer(e)}
          onPointerUp={release}
          onPointerCancel={release}
        >
          <div
            className="absolute top-1/2 left-1/2 h-12 w-12 rounded-full border-4 border-neon-cyan bg-arcade-panel"
            style={{ transform: `translate(calc(-50% + ${knob.x * 40}px), calc(-50% + ${knob.y * 40}px))` }}
          />
        </div>
      )}
      <button
        aria-label="A"
        className="title-pixel pointer-events-auto absolute right-8 bottom-8 z-20 h-20 w-20 touch-none select-none rounded-full border-4 border-neon-green bg-arcade-deep/70 text-xl text-neon-green active:bg-neon-green/30"
        onPointerDown={(e) => {
          e.preventDefault();
          pressA();
        }}
      >
        A
      </button>
    </>
  );
}

function Banner() {
  const banner = useGame((s) => s.banner);
  if (!banner) return null;
  return (
    <div key={banner.id} className="pointer-events-none absolute inset-x-0 top-[22%] z-10 animate-pop text-center">
      <div className="title-pixel neon-text text-xl text-neon-yellow sm:text-3xl">{banner.title}</div>
      {banner.sub && <div className="mt-2 text-2xl text-neon-pink">{banner.sub}</div>}
    </div>
  );
}

function Toasts() {
  const toasts = useGame((s) => s.toasts);
  return (
    <div className="pointer-events-none absolute right-3 bottom-3 z-40 flex w-72 flex-col gap-2">
      {toasts.map((t) => (
        <div key={t.id} className="pixel-panel flex animate-pop items-center gap-3 p-3">
          <span className="text-3xl">{t.icon}</span>
          <span>
            <span className="title-pixel block text-[9px] text-neon-yellow">{t.title}</span>
            {t.body && <span className="block text-lg leading-tight">{t.body}</span>}
          </span>
        </div>
      ))}
    </div>
  );
}

// ------------------------------------------------------------------ gamepad helper

/** Calls `onPress` when gamepad button `index` is pressed (edge-triggered). */
function useGamepadButton(index: number, onPress: () => void) {
  const cb = useRef(onPress);
  cb.current = onPress;
  useEffect(() => {
    let raf = 0;
    let was = true; // ignore a button already held when the overlay opens
    const loop = () => {
      const pad = navigator.getGamepads?.().find((p) => p);
      const now = !!pad?.buttons[index]?.pressed;
      if (now && !was) cb.current();
      was = now;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [index]);
}

/** Keyboard confirm (Space/Enter), armed after a short delay so the key that opened it doesn't skip it. */
function useConfirmKey(onConfirm: () => void, enabled = true) {
  const cb = useRef(onConfirm);
  cb.current = onConfirm;
  useEffect(() => {
    if (!enabled) return;
    let armed = false;
    const t = setTimeout(() => (armed = true), 250);
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (!armed || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'BUTTON') return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        cb.current();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', onKey);
    };
  }, [enabled]);
}

// ------------------------------------------------------------------ dialogue

function DialogueBox() {
  const { t, tl } = useT();
  const dialogue = useGame((s) => s.dialogue)!;
  const reduced = useGame((s) => s.settings.reducedMotion);
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(0);
  const line = dialogue.lines[i];
  const text = personalize(tl(line.text));
  const done = shown >= text.length;

  useEffect(() => {
    setShown(reduced ? text.length : 0);
    if (reduced) return;
    const id = setInterval(() => setShown((n) => (n >= text.length ? n : n + 2)), 28);
    return () => clearInterval(id);
  }, [i, text, reduced]);

  const advance = useCallback(() => {
    if (!done) return setShown(text.length);
    music.sfx('click');
    if (i + 1 < dialogue.lines.length) setI(i + 1);
    else dialogue.resolve();
  }, [done, text.length, i, dialogue]);

  useConfirmKey(advance);
  useGamepadButton(0, advance);

  return (
    <div className="absolute inset-x-0 bottom-0 z-30 flex justify-center p-3" onClick={advance}>
      <div className="pixel-panel flex w-full max-w-3xl cursor-pointer gap-4 p-4">
        {line.portrait !== undefined && (
          <div className="shrink-0 border-4 border-arcade-border bg-arcade-deep p-1">
            <Sprite frame={line.portrait} size={64} />
          </div>
        )}
        <div className="min-h-24 flex-1">
          {line.speaker && <div className="title-pixel mb-2 text-[10px] text-neon-yellow">{personalize(tl(line.speaker))}</div>}
          <p className={`text-2xl leading-snug ${line.speaker ? '' : 'italic text-arcade-muted'}`}>
            <RichText text={text.slice(0, shown)} />
          </p>
          <div className="mt-2 text-right">
            <span className={`title-pixel text-[9px] text-neon-cyan ${done ? 'animate-blink' : 'opacity-0'}`}>{t('spaceContinue')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------ encounter (challenge)

function EncounterModal({ req }: { req: EncounterUIRequest }) {
  const { t, tl } = useT();
  const resolve = useGame((s) => s.encounter!.resolve);
  const save = useGame((s) => s.save)!;
  const [phase, setPhase] = useState<'answering' | 'checking' | 'result'>('answering');
  const [result, setResult] = useState<EncounterResponse | null>(null);
  const [timedOut, setTimedOut] = useState(false);
  const [hint, setHint] = useState(false);
  const [error, setError] = useState('');
  const [left, setLeft] = useState(req.timeLimitMs ?? 0);
  const start = useRef(performance.now());

  const freeHint = HEROES[save.hero].freeHintsPerLand > save.lands[req.land].hintsUsed;

  const submit = useCallback(
    async (answer: AnswerValue) => {
      if (phase !== 'answering') return;
      setPhase('checking');
      const timeMs = Math.round(performance.now() - start.current);
      try {
        const r = await api.encounter({
          land: req.land,
          type: req.type,
          targetId: req.targetId,
          challengeId: req.challenge.id,
          answer,
          timeMs,
          hintUsed: hint,
        });
        music.sfx(r.correct ? 'correct' : 'wrong');
        useGame.getState().setSave(r.save);
        setResult(r);
        setPhase('result');
      } catch (e) {
        setError((e as Error).message);
        setPhase('result');
      }
    },
    [phase, req, hint],
  );

  // Countdown for monster and boss challenges.
  useEffect(() => {
    if (!req.timeLimitMs || phase !== 'answering') return;
    let lastSec = 99;
    const id = setInterval(() => {
      const remaining = Math.max(0, req.timeLimitMs! - (performance.now() - start.current));
      setLeft(remaining);
      const sec = Math.ceil(remaining / 1000);
      if (sec <= 5 && sec < lastSec && remaining > 0) {
        lastSec = sec;
        music.sfx('tick');
      }
      if (remaining <= 0) {
        setTimedOut(true);
        void submit({ kind: 'timeout' });
      }
    }, 100);
    return () => clearInterval(id);
  }, [req.timeLimitMs, phase, submit]);

  const close = () => {
    if (result) resolve(result);
    else resolve({ correct: false, pointsDelta: 0, events: [], gameOver: null, save });
  };

  return (
    <div className="absolute inset-0 z-30 overflow-y-auto bg-arcade-deep/80 p-3 backdrop-blur-[2px]">
      <div className="mx-auto max-w-3xl animate-pop pt-16">
        <div className="mb-3 flex items-center gap-3">
          {req.portrait !== undefined && (
            <div className="shrink-0 border-4 border-neon-red/70 bg-arcade-deep p-1">
              <Sprite frame={req.portrait} size={48} />
            </div>
          )}
          <h2 className="title-pixel neon-text flex-1 text-xs text-neon-pink sm:text-sm">{tl(req.title)}</h2>
          {req.timeLimitMs && phase === 'answering' && (
            <span className={`title-pixel text-sm ${left < 5000 ? 'animate-pulse text-neon-red' : 'text-neon-yellow'}`}>
              ⏱ {Math.ceil(left / 1000)}
            </span>
          )}
        </div>
        {req.timeLimitMs && (
          <div className="mb-3 h-2 bg-arcade-panel">
            <div
              className={`h-full ${left < 5000 ? 'bg-neon-red' : 'bg-neon-yellow'}`}
              style={{ width: `${(left / req.timeLimitMs) * 100}%` }}
            />
          </div>
        )}

        <ChallengeCard
          c={req.challenge}
          disabled={phase !== 'answering'}
          onAnswer={submit}
          hintAllowed={req.hintAllowed}
          hintShown={hint}
          hintLabel={freeHint ? t('hintFree') : t('hintCost')}
          onHint={() => {
            music.sfx('click');
            setHint(true);
          }}
        />

        {phase === 'checking' && <p className="title-pixel mt-4 animate-pulse text-center text-xs">{t('checking')}</p>}
        {phase === 'result' && error && (
          <div className="pixel-panel mt-4 p-4 text-neon-red">
            {t('error')}: {error}
            <div>
              <button className="pixel-btn mt-3" onClick={close}>
                {t('next')}
              </button>
            </div>
          </div>
        )}
        {phase === 'result' && result && (
          <Feedback c={req.challenge} correct={result.correct} timedOut={timedOut} points={result.pointsDelta} onNext={close} />
        )}
      </div>
    </div>
  );
}

// ------------------------------------------------------------------ pause & game over

function PauseMenu() {
  const { t, lang } = useT();
  const { req, resolve } = useGame((s) => s.pause!);
  const settings = useGame((s) => s.settings);
  const update = useGame((s) => s.updateSettings);
  const muted = useGame((s) => s.muted);
  const toggleMute = useGame((s) => s.toggleMute);
  const touch = useGame((s) => s.touchControls);
  const setTouch = useGame((s) => s.setTouchControls);
  const full = useFullscreen();
  const [view, setView] = useState(req.view);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'p' || e.key === 'P') resolve('resume');
      else if (e.key === 'h' || e.key === 'H') setView((v) => (v === 'controls' ? 'main' : 'controls'));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [resolve]);
  useGamepadButton(9, () => resolve('resume'));

  if (view === 'quit') {
    return (
      <div className="absolute inset-0 z-40 flex items-center justify-center bg-arcade-deep/80 p-4">
        <div className="pixel-panel w-full max-w-sm animate-pop space-y-4 p-6 text-center" role="alertdialog" aria-label={t('quit')}>
          <h2 className="title-pixel neon-text text-lg text-neon-red">⏻ {t('quit')}</h2>
          <p className="text-xl">{t('quitConfirm')}</p>
          <button autoFocus className="pixel-btn red w-full" onClick={() => resolve('quit')}>
            💾 {t('yesQuit')}
          </button>
          <button className="pixel-btn ghost w-full" onClick={() => setView('main')}>
            {t('cancel')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center overflow-y-auto bg-arcade-deep/80 p-4">
      <div className="pixel-panel my-auto w-full max-w-sm animate-pop space-y-3 p-6 text-center">
        <h2 className="title-pixel neon-text text-lg text-neon-cyan">{t('paused')}</h2>
        <button autoFocus className="pixel-btn green w-full" onClick={() => resolve('resume')}>
          ▶ {t('resume')}
        </button>
        {req.canRestart && (
          <button className="pixel-btn ghost w-full" onClick={() => resolve('checkpoint')}>
            ⛳ {t('restartCheckpoint')}
          </button>
        )}
        {req.canLeave && (
          <button className="pixel-btn ghost w-full" onClick={() => resolve('world')}>
            🗺 {t('backToWorld')}
          </button>
        )}
        <button className="pixel-btn ghost w-full" aria-expanded={view === 'controls'} onClick={() => setView(view === 'controls' ? 'main' : 'controls')}>
          🎮 {t('controls')}
        </button>
        {view === 'controls' && <p className="whitespace-pre-line text-left text-lg">{t('controlsList')}</p>}
        <div className="grid grid-cols-2 gap-2 text-lg">
          <button className="border-2 border-arcade-border py-1 hover:border-neon-cyan" aria-pressed={muted} onClick={toggleMute}>
            {muted ? `🔇 ${t('unmute')}` : `🔊 ${t('mute')}`}
          </button>
          <button className="border-2 border-arcade-border py-1 hover:border-neon-cyan" aria-pressed={full} onClick={toggleFullscreen}>
            ⛶ {full ? t('exitFullscreen') : t('fullscreen')}
          </button>
        </div>
        <div className="space-y-2 text-left text-lg">
          <label className="flex items-center justify-between gap-3">
            🎵 {t('music')}
            <input type="range" min={0} max={1} step={0.05} value={settings.musicVolume} onChange={(e) => update({ musicVolume: Number(e.target.value) })} className="accent-neon-pink" />
          </label>
          <label className="flex items-center justify-between gap-3">
            🔊 {t('sfx')}
            <input type="range" min={0} max={1} step={0.05} value={settings.sfxVolume} onChange={(e) => update({ sfxVolume: Number(e.target.value) })} className="accent-neon-pink" />
          </label>
          <button className="w-full border-2 border-arcade-border py-1 hover:border-neon-cyan" onClick={() => update({ lang: lang === 'en' ? 'fr' : 'en' })}>
            {t('language')}: {lang === 'en' ? 'English → Français' : 'Français → English'}
          </button>
          <button className="w-full border-2 border-arcade-border py-1 hover:border-neon-cyan" aria-pressed={touch} onClick={() => setTouch(!touch)}>
            📱 {t('touchControls')}: {touch ? t('on') : t('off')}
          </button>
        </div>
        <button className="pixel-btn red w-full" onClick={() => setView('quit')}>
          💾 {t('saveQuit')}
        </button>
      </div>
    </div>
  );
}

function GameOverScreen() {
  const { t } = useT();
  const go = useGame((s) => s.gameOver)!;
  useConfirmKey(go.resolve);
  useGamepadButton(0, go.resolve);
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/85 p-4">
      <div className="animate-pop text-center">
        <h2 className="title-pixel neon-text text-4xl text-neon-red">{t('gameOver')}</h2>
        <p className="mt-6 text-2xl">
          <span className="text-neon-yellow">−{go.info.pointsLost}</span> {t('pointsLost')}
        </p>
        <button className="pixel-btn mt-8" onClick={go.resolve}>
          ⛳ {t('backToCheckpoint')}
        </button>
      </div>
    </div>
  );
}
