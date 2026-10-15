import { correctAnswerText } from '@shared/check';
import { TIER_NAMES, TRACK_BY_ID } from '@shared/tracks';
import type { AnswerValue, Challenge } from '@shared/types';
import { useEffect, type ReactNode } from 'react';
import { useT } from '../../i18n';
import { CodeBlock } from '../CodeBlock';
import { RichText } from '../RichText';
import { BugView, CodeView, CommandView, FillView, langOf, McqView, OrderView, OutputView, RiddleView } from './views';

interface Props {
  c: Challenge;
  disabled: boolean;
  onAnswer: (a: AnswerValue) => void;
  hintAllowed?: boolean;
  hintShown?: boolean;
  onHint?: () => void;
  headerRight?: ReactNode;
  hintLabel?: string;
}

export function ChallengeCard({ c, disabled, onAnswer, hintAllowed = true, hintShown, onHint, headerRight, hintLabel }: Props) {
  const { t, tl } = useT();
  const track = TRACK_BY_ID[c.track];
  // Output snippets are rendered by OutputView; fill templates contain their own code.
  const showCode = c.code && c.kind !== 'output' && c.kind !== 'fill';

  return (
    <div className="pixel-panel p-4 sm:p-6">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-sm">
        <span className="font-pixel px-2 py-1 text-[9px] text-arcade-deep" style={{ background: track.color }}>
          {track.name}
        </span>
        <span className="border-2 border-arcade-border px-2 text-arcade-muted">
          {t('tier')} {c.tier} · {tl(TIER_NAMES[c.tier])}
        </span>
        <span className="border-2 border-neon-purple/60 px-2 text-neon-purple">{tl(c.concept)}</span>
        <span className="ml-auto">{headerRight}</span>
      </div>

      <h2 className="mb-4 text-2xl leading-snug text-arcade-text whitespace-pre-line"><RichText text={tl(c.prompt)} /></h2>

      {showCode && <CodeBlock code={c.code!} lang={langOf(c)} className="mb-4" />}

      {hintAllowed && !disabled && (
        <div className="mb-4">
          {hintShown ? (
            <p className="border-l-4 border-neon-yellow bg-neon-yellow/10 px-3 py-2 text-neon-yellow">💡 <RichText text={tl(c.hint)} /></p>
          ) : (
            <button className="text-neon-yellow underline decoration-dotted hover:text-neon-orange" onClick={onHint}>
              💡 {hintLabel ?? t('hintCost')}
            </button>
          )}
        </div>
      )}

      <ChallengeInput key={c.id} c={c} disabled={disabled} onAnswer={onAnswer} />
    </div>
  );
}

function ChallengeInput(props: { c: Challenge; disabled: boolean; onAnswer: (a: AnswerValue) => void }) {
  const { c, disabled, onAnswer } = props;
  switch (c.kind) {
    case 'mcq':
      return <McqView c={c} disabled={disabled} onAnswer={onAnswer} />;
    case 'fill':
      return <FillView c={c} disabled={disabled} onAnswer={onAnswer} />;
    case 'order':
      return <OrderView c={c} disabled={disabled} onAnswer={onAnswer} />;
    case 'bug':
      return <BugView c={c} disabled={disabled} onAnswer={onAnswer} />;
    case 'command':
      return <CommandView c={c} disabled={disabled} onAnswer={onAnswer} />;
    case 'output':
      return <OutputView c={c} disabled={disabled} onAnswer={onAnswer} />;
    case 'riddle':
      return <RiddleView c={c} disabled={disabled} onAnswer={onAnswer} />;
    case 'code':
      return <CodeView c={c} disabled={disabled} onAnswer={onAnswer} />;
  }
}

/** Shown after an answer: verdict, the right answer when missed, and the explanation (the real lesson). */
export function Feedback({
  c,
  correct,
  timedOut,
  onNext,
  points,
}: {
  c: Challenge;
  correct: boolean;
  timedOut?: boolean;
  onNext: () => void;
  points?: number;
}) {
  const { t, tl, lang } = useT();

  useEffect(() => {
    // Delay so the Enter that submitted the answer does not also skip the feedback.
    let armed = false;
    const arm = setTimeout(() => (armed = true), 350);
    const onKey = (e: KeyboardEvent) => {
      // A focused button already turns Enter into a click: don't advance twice.
      if (armed && e.key === 'Enter' && (e.target as HTMLElement)?.tagName !== 'BUTTON') onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(arm);
      window.removeEventListener('keydown', onKey);
    };
  }, [onNext]);

  return (
    <div
      className={`pixel-panel mt-4 animate-pop p-4 sm:p-5 ${correct ? 'border-neon-green!' : 'border-neon-red!'}`}
      role="status"
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className={`title-pixel neon-text text-lg ${correct ? 'text-neon-green' : 'text-neon-red'}`}>
          {correct ? t('correct') : timedOut ? t('timeUp') : t('wrong')}
        </span>
        {points !== undefined && points !== 0 && (
          <span className={`title-pixel text-xs ${points > 0 ? 'text-neon-yellow' : 'text-neon-red'}`}>
            {points > 0 ? '+' : ''}
            {points} pts
          </span>
        )}
        {!correct && <span className="title-pixel text-xs text-neon-red">{t('heartLost')}</span>}
      </div>

      {!correct && c.kind !== 'mcq' && c.kind !== 'bug' && c.kind !== 'order' && (
        <div className="mt-3">
          <div className="text-sm uppercase text-arcade-muted">{t('answerWas')}</div>
          <CodeBlock code={correctAnswerText(c, lang)} lang={c.kind === 'code' ? c.language : langOf(c)} />
        </div>
      )}

      <div className="mt-3">
        <div className="text-sm uppercase text-arcade-muted">{t('why')}</div>
        <p className="text-xl"><RichText text={tl(c.explanation)} /></p>
      </div>

      <button className="pixel-btn mt-4" onClick={onNext}>
        {t('next')} ▶
      </button>
    </div>
  );
}
