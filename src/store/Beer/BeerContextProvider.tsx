import React, { useEffect, useMemo, useState } from 'react';
import type { Beer, BeerResponse } from '../../types/Beer';
import { BeerContext } from './BeerContext';
import { fetchBeers } from '../../services/fetchBeers';

export type BeerContextType = {
  beers: Omit<Beer, 'description'>[];
  nextOffset: number | null;
  isLoading: boolean;
  isError: boolean;
  loadBeers: (offset: number | null) => Promise<void>;
};

type Props = {
  children: React.ReactNode;
};

export const BeerContextProvider: React.FC<Props> = ({ children }) => {
  const [beers, setBeers] = useState<Omit<Beer, 'description'>[]>([]);
  const [nextOffset, setNextOffset] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const loadBeers = async (offset: number | null) => {
    try {
      setIsLoading(true);
      setIsError(false);

      const data = await fetchBeers(offset ?? undefined);

      setBeers(currentBeers => [...currentBeers, ...data.beers]);

      setNextOffset(data.next_offset);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBeers()
      .then((data: BeerResponse) => {
        setBeers(data.beers);
        setNextOffset(data.next_offset);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const value = useMemo(
    () => ({
      beers,
      nextOffset,
      isLoading,
      isError,
      loadBeers,
    }),
    [beers, isError, isLoading, nextOffset],
  );

  return <BeerContext.Provider value={value}>{children}</BeerContext.Provider>;
};
