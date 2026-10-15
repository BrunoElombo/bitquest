import { useEffect } from 'react';
import { music, type Scene } from './music';

/** Sets the background music scene while a page is mounted. */
export function useMusicScene(scene: Scene, intensity: number): void {
  useEffect(() => {
    music.setScene(scene, intensity);
  }, [scene, intensity]);
}
