import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { Beer } from '../../types/Beer';
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

  const loadBeers = useCallback(async (offset: number | null) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const data = await fetchBeers(offset ?? undefined);

      setBeers(currentBeers =>
        offset === null ? data.beers : [...currentBeers, ...data.beers],
      );

      setNextOffset(data.next_offset);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const initializeBeers = async () => {
      await loadBeers(null);
    };

    initializeBeers();
  }, [loadBeers]);

  const value = useMemo(
    () => ({
      beers,
      nextOffset,
      isLoading,
      isError,
      loadBeers,
    }),
    [loadBeers, beers, nextOffset, isLoading, isError],
  );

  return <BeerContext.Provider value={value}>{children}</BeerContext.Provider>;
};
