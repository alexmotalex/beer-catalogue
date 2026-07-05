import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { notifyAxiosError } from '../../utils/notifyAxiosError';
import { BeerContext } from './BeerContext';
import { fetchBeers } from '../../services/fetchBeers';
import type { Beer } from '../../types/Beer';

export type BeerContextType = {
  beers: Omit<Beer, 'description'>[];
  nextOffset: number | null;
  isLoading: boolean;
  loadBeers: (offset: number | null) => Promise<boolean>;
};

type Props = {
  children: React.ReactNode;
};

export const BeerContextProvider: React.FC<Props> = ({ children }) => {
  const [beers, setBeers] = useState<Omit<Beer, 'description'>[]>([]);
  const [nextOffset, setNextOffset] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const loadBeers = useCallback(
    async (offset: number | null) => {
      setIsLoading(true);

      let success = false;

      try {
        const data = await fetchBeers(searchParams, offset ?? undefined);

        setBeers(currentBeers =>
          offset === null ? data.beers : [...currentBeers, ...data.beers],
        );

        setNextOffset(data.next_offset);
        success = true;
      } catch (error) {
        notifyAxiosError(error);
      }

      setIsLoading(false);

      return success;
    },
    [searchParams],
  );

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
      loadBeers,
    }),
    [loadBeers, beers, nextOffset, isLoading],
  );

  return <BeerContext.Provider value={value}>{children}</BeerContext.Provider>;
};
