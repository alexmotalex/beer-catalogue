import { useContext } from 'react';
import { BeerContext } from '../store/Beer/BeerContext';

export const useBeer = () => {
  const context = useContext(BeerContext);

  if (!context) {
    throw new Error('useBeer must be used inside BeerProvider');
  }

  return context;
};
