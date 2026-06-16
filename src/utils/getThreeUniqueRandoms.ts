import type { Beer } from '../types/Beer';

export const getThreeUniqueRandoms = (arr: Omit<Beer, 'description'>[]) => {
  const shuffled = [...arr]
    .filter(item => item.is_available !== false)
    .sort(() => 0.5 - Math.random());

  return shuffled.slice(0, 3);
};
