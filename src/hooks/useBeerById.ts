import { useEffect, useState } from 'react';
import type { Beer } from '../types/Beer';
import { fetchBeerById } from '../services/fetchBeerById';

export const useBeerById = (id: number) => {
  const [beer, setBeer] = useState<Beer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    fetchBeerById(id)
      .then(beer => setBeer(beer))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [id]);

  return {
    beer,
    isLoading,
    isError,
  };
};
