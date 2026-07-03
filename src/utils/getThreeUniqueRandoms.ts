import type { Beer } from '../types/Beer';

export const getUniqueRandoms = (
  arr: Omit<Beer, 'description'>[],
  qty: number,
) => {
  const shuffled = [...arr]
    .filter(item => item.is_available !== false)
    .sort(() => 0.5 - Math.random());

  return shuffled.slice(0, qty);
};
