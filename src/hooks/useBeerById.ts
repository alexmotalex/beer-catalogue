import { useEffect, useState } from 'react';
import type { Beer } from '../types/Beer';
import { fetchBeerById } from '../services/fetchBeerById';
import { notifyAxiosError } from '../utils/notifyAxiosError';

export const useBeerById = (id: number) => {
  const [beer, setBeer] = useState<Beer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      return;
    }

    fetchBeerById(id)
      .then(beer => setBeer(beer))
      .catch(error => {
        notifyAxiosError(error);
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  return {
    beer,
    isLoading,
  };
};
