import React, { useEffect, useState } from "react";
import type { Beer, BeerResponse } from "../../types/Beer";
import { BeerContext } from "./BeerContext";
import { fetchBeer } from "../../services/fetchBeerFromServer";

type BeerContextValue = {
  beers: Beer[];
  nextOffset: number | null;
  isLoading: boolean;
  isError: boolean;
};

type Props = {
  children: React.ReactNode;
};

export const BeerContextProvider: React.FC<Props> = ({ children }) => {
  const [beers, setBeers] = useState<Beer[]>([]);
  const [nextOffset, setNextOffset] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchBeer()
      .then((data: BeerResponse) => {
        setBeers(data.beers);
        setNextOffset(data.next_offset);
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  const value: BeerContextValue = {
    beers,
    nextOffset,
    isLoading,
    isError,
  };

  return <BeerContext.Provider value={value}>{children}</BeerContext.Provider>;
};
