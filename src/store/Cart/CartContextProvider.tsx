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
  itemErrors: Map<number, string>;
  fetchCart: () => Promise<void>;
  addToCart: (beerId: number) => Promise<void>;
  deleteFromCart: (itemId: number, beerId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isInCart: (beerId: number) => boolean;
};

type Props = {
  children: React.ReactNode;
};

export const CartContextProvider: React.FC<Props> = ({ children }) => {
  const [cart, setCart] = useState<Cart>(emptyCart);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [itemErrors, setItemErrors] = useState<Map<number, string>>(new Map());

  const { user, isLoading: isAuthLoading } = useAuth();

  const fetchCart = useCallback(async () => {
    if (!user) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await instance.get('/cart/');
      setCart(response.data);
    } catch {
      setError('Failed to load cart');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const addToCart = useCallback(
    async (beerId: number) => {
      if (!user) {
        return;
      }

      setIsLoading(true);

      setItemErrors(prev => {
        const next = new Map(prev);
        next.delete(beerId);

        return next;
      });

      try {
        await instance.post(`/cart/${beerId}/`);
        await fetchCart();
      } catch (err: unknown) {
        const axiosError = err as {
          response?: { data?: { detail?: { beer_id?: string } } };
        };
        const msg = axiosError.response?.data?.detail?.beer_id;

        setItemErrors(prev => {
          const next = new Map(prev);
          next.set(beerId, msg ?? 'Failed to add item');

          return next;
        });
      } finally {
        setIsLoading(false);
      }
    },
    [user, fetchCart],
  );

  const deleteFromCart = useCallback(
    async (itemId: number, beerId: number) => {
      try {
        setItemErrors(prev => {
          const next = new Map(prev);
          next.delete(beerId);

          return next;
        });

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
      setItemErrors(new Map());

      await instance.delete('/cart/clear/');
      setCart(emptyCart);
    } catch {
      setError('Failed to clear cart');
    }
  }, []);

  const isInCart = useCallback(
    (beerId: number) => cart.cart_items.some(item => item.beer_id === beerId),
    [cart.cart_items],
  );

  const totalCartItems = useMemo(
    () => cart.cart_items.reduce((total, item) => total + item.quantity, 0),
    [cart.cart_items],
  );

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }

    const loadCart = async () => {
      await fetchCart();
    };

    void loadCart();
  }, [isAuthLoading, fetchCart]);

  const value = useMemo(
    () => ({
      cart,
      cartItems: cart.cart_items,
      subtotal: cart.subtotal,
      total: cart.total,
      quantity: totalCartItems,
      error,
      itemErrors,
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
      itemErrors,
      isLoading,
      isInCart,
      fetchCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
