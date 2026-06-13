import type React from 'react';
import type { Beer } from '../../types/Beer';
import { useMemo, useState } from 'react';
import { CartContext } from './CartContext';
import type { CartEntry } from '../../types/CartEntry';

export type CartContextType = {
  CartList: CartEntry[];
  totalCartEntrys: number;
  addToCart: (product: Beer) => void;
  deleteFromCart: (id: number) => void;
  clearCart: () => void;
  totalCartAmount: number;
};

type Props = {
  children: React.ReactNode;
};

export const CartContextProvider: React.FC<Props> = ({ children }) => {
  const [CartList, setCartList] = useState<CartEntry[]>([]);

  const addToCart = (beer: Beer) => {
    setCartList(prev => {
      const isAlreadyInCart = prev.some(p => p.id === beer.id);

      if (isAlreadyInCart) {
        return prev;
      }

      return [...prev, { id: beer.id, qty: 1, product: beer }];
    });
  };

  const deleteFromCart = (id: number) => {
    setCartList(prev => prev.filter(p => p.id !== id));
  };

  const clearCart = () => {
    setCartList([]);
  };

  const totalCartEntrys = useMemo(
    () => CartList.reduce((total, item) => total + item.qty, 0),
    [CartList],
  );

  const totalCartAmount = useMemo(
    () =>
      CartList.reduce((totalAmount, item) => {
        const productTotalAmount = Number(item.product.price) * item.qty;

        return totalAmount + productTotalAmount;
      }, 0),
    [CartList],
  );

  const value: CartContextType = useMemo(
    () => ({
      CartList,
      totalCartEntrys,
      addToCart,
      deleteFromCart,
      clearCart,
      totalCartAmount,
    }),
    [CartList, totalCartEntrys, totalCartAmount],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
