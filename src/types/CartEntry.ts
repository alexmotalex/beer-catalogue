import type { Beer } from './Beer';

export type CartEntry = {
  id: string;
  qty: number;
  product: Beer;
};
