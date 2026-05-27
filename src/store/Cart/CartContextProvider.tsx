import type React from 'react';
import type { Beer } from '../../types/Beer';
import { useMemo, useState } from 'react';
import { CartContext } from './CartContext';
import type { CartItem } from '../../types/CartItem';

export type CartContextType = {
  CartList: CartItem[];
  totalCartItems: number;
  addToCart: (product: Beer) => void;
  deleteFromCart: (id: number) => void;
  clearCart: () => void;
  totalCartAmount: number;
};

type Props = {
  children: React.ReactNode;
};

export const CartContextProvider: React.FC<Props> = ({ children }) => {
  const [CartList, setCartList] = useState<CartItem[]>([]);

  const addToCart = (beer: Beer) => {
    setCartList(prev => {
      const isAlreadyInCart = prev.some(p => p.id === beer.id);

      if (isAlreadyInCart) {
        return prev;
      }

      return [...prev, { id: beer.id, qty: 1, beer }];
    });
  };

  const deleteFromCart = (id: number) => {
    setCartList(prev => prev.filter(p => p.id !== id));
  };

  const clearCart = () => {
    setCartList([]);
  };

  const totalCartItems = useMemo(
    () => CartList.reduce((total, item) => total + item.qty, 0),
    [CartList],
  );

  const totalCartAmount = useMemo(
    () =>
      CartList.reduce((totalAmount, item) => {
        const productTotalAmount = Number(item.beer.price) * item.qty;

        return totalAmount + productTotalAmount;
      }, 0),
    [CartList],
  );

  const value: CartContextType = useMemo(
    () => ({
      CartList,
      totalCartItems,
      addToCart,
      deleteFromCart,
      clearCart,
      totalCartAmount,
    }),
    [CartList, totalCartItems, totalCartAmount],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
