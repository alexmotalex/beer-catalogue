import type { Beer } from '../types/Beer';

export const getThreeUniqueRandoms = (arr: Beer[]) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, 3);
};
