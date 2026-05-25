import type { Beer } from "./Beer";

export type BasketItem = {
  id: number;
  qty: number;
  beer: Beer;
};
