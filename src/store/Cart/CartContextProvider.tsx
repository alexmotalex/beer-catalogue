import type React from 'react';
import type { Cart, CartEntry } from '../../types/Cart';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { instance } from '../../api/axiosInstance';
import { CartContext } from './CartContext';
import { useAuth } from '../../hooks/useAuth';

const emptyCart: Cart = {
  id: 0,
  cart_items: [],
  subtotal: '0',
  total: '0',
};

export type CartContextType = {
  cart: Cart;
  cartItems: CartEntry[];
  quantity: number;
  subtotal: string;
  total: string;
  isLoading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addToCart: (beerId: number) => Promise<void>;
  deleteFromCart: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isInCart: (beerId: number) => boolean;
};

type Props = {
  children: React.ReactNode;
};

export const CartContextProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useState<Cart>(emptyCart);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { isAuthenticated } = useAuth();

  const fetchCart = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await instance.get('/cart/');
      setCart(response.data);
    } catch {
      setError('Failed to load cart');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addToCart = useCallback(
    async (beerId: number) => {
      try {
        await instance.post(`/cart/${beerId}/`);
        await fetchCart();
      } catch {
        setError('Failed to add item');
      }
    },
    [fetchCart],
  );

  const deleteFromCart = useCallback(
    async (itemId: number) => {
      try {
        await instance.delete(`/cart/${itemId}/`);
        await fetchCart();
      } catch {
        setError('Failed to remove item');
      }
    },
    [fetchCart],
  );

  const clearCart = useCallback(async () => {
    try {
      await instance.delete('/cart/clear/');
      setCart(emptyCart);
    } catch {
      setError('Failed to clear cart');
    }
  }, []);

  const isInCart = useCallback(
    (beerId: number) => cart.cart_items.some(item => item.id === beerId),
    [cart.cart_items],
  );

  const totalCartItems = useMemo(
    () => cart.cart_items.reduce((total, item) => total + item.quantity, 0),
    [cart.cart_items],
  );
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const loadCart = async () => {
      await fetchCart();
    };

    void loadCart();
  }, [isAuthenticated, fetchCart]);

  const value = useMemo(
    () => ({
      cart,
      cartItems: cart.cart_items,
      subtotal: cart.subtotal,
      total: cart.total,
      quantity: totalCartItems,
      error,
      isLoading,
      fetchCart,
      addToCart,
      deleteFromCart,
      clearCart,
      isInCart,
    }),
    [
      cart,
      addToCart,
      clearCart,
      deleteFromCart,
      totalCartItems,
      error,
      isLoading,
      isInCart,
      fetchCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
