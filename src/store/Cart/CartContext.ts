import { createContext } from 'react';
import type { CartContextType } from './CartContextProvider';

export const CartContext = createContext<CartContextType | null>(null);
