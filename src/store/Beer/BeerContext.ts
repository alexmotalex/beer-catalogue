import { createContext } from 'react';
import type { Beer } from '../../types/Beer';

export type BeerContextValue = {
  beers: Beer[];
  nextOffset: number | null;
  isLoading: boolean;
  isError: boolean;
};

export const BeerContext = createContext<BeerContextValue | null>(null);
