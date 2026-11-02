import type { LandId } from '@shared/game';
import { aiLand } from './ai';
import { javascriptLand } from './javascript';
import { linuxLand } from './linux';
import { pythonLand } from './python';
import { devopsLand, githubLand, gitLand, javaLand, nodejsLand, typescriptLand } from './template';
import type { LandContent } from './types';

/** Every course now has a Land: four hand-built maps and six themed template Lands. */
export const LAND_CONTENT: Partial<Record<LandId, LandContent>> = {
  javascript: javascriptLand,
  python: pythonLand,
  linux: linuxLand,
  ai: aiLand,
  typescript: typescriptLand,
  nodejs: nodejsLand,
  java: javaLand,
  git: gitLand,
  github: githubLand,
  devops: devopsLand,
};
