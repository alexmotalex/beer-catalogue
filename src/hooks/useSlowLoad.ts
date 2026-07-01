import { useEffect, useState } from 'react';

const SLOW_THRESHOLD_MS = 8000;

export const useSlowLoad = (isLoading: boolean) => {
  const [isSlow, setIsSlow] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      const id = setTimeout(() => setIsSlow(false), 0);
      return () => clearTimeout(id);
    }

    const timer = setTimeout(() => {
      setIsSlow(true);
    }, SLOW_THRESHOLD_MS);

    return () => clearTimeout(timer);
  }, [isLoading]);

  return isSlow;
};
