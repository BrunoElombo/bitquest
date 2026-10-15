import type { LandId } from '@shared/game';
import { aiLand } from './ai';
import { javascriptLand } from './javascript';
import { linuxLand } from './linux';
import { pythonLand } from './python';
import type { LandContent } from './types';

/** Lands whose content exists. The others show "in the fog" on the world map. */
export const LAND_CONTENT: Partial<Record<LandId, LandContent>> = {
  javascript: javascriptLand,
  python: pythonLand,
  linux: linuxLand,
  ai: aiLand,
};
