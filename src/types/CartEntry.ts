import type { Beer } from './Beer';

export type CartEntry = {
  id: number;
  qty: number;
  product: Beer;
};
