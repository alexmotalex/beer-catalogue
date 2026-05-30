import { useContext } from 'react';
import { BeerContext } from '../store/Beer/BeerContext';

export const useBeers = () => {
  const context = useContext(BeerContext);

  if (!context) {
    throw new Error('useBeers must be used inside BeerProvider');
  }

  return context;
};
