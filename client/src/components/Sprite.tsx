import type { CSSProperties } from 'react';
import { frameXY } from '../game/assets';

/** A frame of a Kenney sheet as a crisp CSS sprite (portraits, hero previews). */
export function Sprite({
  frame,
  size = 48,
  sheet = 'dungeon',
  className = '',
  style,
}: {
  frame: number;
  size?: number;
  sheet?: 'dungeon' | 'town';
  className?: string;
  style?: CSSProperties;
}) {
  const { x, y } = frameXY(frame);
  const s = size / 16;
  return (
    <div
      aria-hidden
      className={className}
      style={{
        width: size,
        height: size,
        backgroundImage: `url(/assets/${sheet}.png)`,
        backgroundPosition: `-${x * s}px -${y * s}px`,
        backgroundSize: `${192 * s}px ${176 * s}px`,
        imageRendering: 'pixelated',
        ...style,
      }}
    />
  );
}
