import type React from 'react';
import type { Cart, CartEntry } from '../../types/Cart';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { instance } from '../../api/axiosInstance';
import { CartContext } from './CartContext';
import { useAuth } from '../../hooks/useAuth';
import { notifyAxiosError } from '../../utils/notifyAxiosError';

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
  isInitialLoading: boolean;
  isLoading: boolean;
  itemErrors: Map<number, string>;
  fetchCart: () => Promise<void>;
  addToCart: (beerId: number) => Promise<string | null>;
  getQuantityInCart: (beerId: number) => number;
  updateCartItemQuantity: (
    itemId: number,
    beerId: number,
    quantity: number,
  ) => Promise<void>;
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
  const [itemErrors, setItemErrors] = useState<Map<number, string>>(new Map());
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const { user, isLoading: isAuthLoading } = useAuth();

  const fetchCart = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await instance.get('/cart/');
      setCart(response.data);
    } catch (error) {
      notifyAxiosError(error);
    } finally {
      setIsLoading(false);
      setIsInitialLoading(false);
    }
  }, []);

  const addToCart = useCallback(
    async (beerId: number): Promise<string | null> => {
      if (!user) {
        return null;
      }

      setIsLoading(true);

      setItemErrors(prev => {
        const next = new Map(prev);
        next.delete(beerId);
        return next;
      });

      try {
        await instance.post(`/cart/${beerId}/`, null, {
          params: { quantity: 1 },
        });
        await fetchCart();

        return null;
      } catch (err: unknown) {
        const axiosError = err as {
          response?: { data?: { detail?: { beer_id?: string } } };
        };
        const msg =
          axiosError.response?.data?.detail?.beer_id ?? 'Failed to add item';

        setItemErrors(prev => {
          const next = new Map(prev);
          next.set(beerId, msg);

          return next;
        });

        return msg;
      } finally {
        setIsLoading(false);
      }
    },
    [user, fetchCart],
  );

  const updateCartItemQuantity = useCallback(
    async (itemId: number, beerId: number, quantity: number) => {
      setItemErrors(prev => {
        const next = new Map(prev);
        next.delete(beerId);
        return next;
      });

      try {
        await instance.patch(`/cart/${itemId}/`, null, {
          params: { quantity },
        });
        await fetchCart();
      } catch (err: unknown) {
        const axiosError = err as {
          response?: { data?: { detail?: { beer_id?: string } } };
        };
        const msg = axiosError.response?.data?.detail?.beer_id;

        setItemErrors(prev => {
          const next = new Map(prev);
          next.set(beerId, msg ?? 'Failed to update quantity');
          return next;
        });
      }
    },
    [fetchCart],
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
      } catch (error) {
        notifyAxiosError(error);
      }
    },
    [fetchCart],
  );

  const clearCart = useCallback(async () => {
    try {
      setItemErrors(new Map());

      await instance.delete('/cart/clear/');
      setCart(emptyCart);
    } catch (error) {
      notifyAxiosError(error);
    }
  }, []);

  const getQuantityInCart = useCallback(
    (beerId: number) =>
      cart.cart_items.find(item => item.beer_id === beerId)?.quantity ?? 0,
    [cart.cart_items],
  );
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

    if (!user) {
      const timeoutId = window.setTimeout(() => {
        setCart(emptyCart);
        setItemErrors(new Map());
        setIsLoading(false);
      }, 0);

      return () => {
        window.clearTimeout(timeoutId);
      };
    }

    const loadCart = async () => {
      await fetchCart();
    };

    void loadCart();
  }, [user, isAuthLoading, fetchCart]);

  const value = useMemo(
    () => ({
      cart,
      cartItems: cart.cart_items,
      subtotal: cart.subtotal,
      total: cart.total,
      quantity: totalCartItems,
      itemErrors,
      isInitialLoading,
      isLoading,
      fetchCart,
      addToCart,
      getQuantityInCart,
      updateCartItemQuantity,
      deleteFromCart,
      clearCart,
      isInCart,
    }),
    [
      cart,
      addToCart,
      getQuantityInCart,
      updateCartItemQuantity,
      clearCart,
      deleteFromCart,
      totalCartItems,
      itemErrors,
      isInitialLoading,
      isLoading,
      isInCart,
      fetchCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
