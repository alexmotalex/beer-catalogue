import type { Beer } from './Beer';

export type CartItem = {
  id: number;
  qty: number;
  beer: Beer;
};
