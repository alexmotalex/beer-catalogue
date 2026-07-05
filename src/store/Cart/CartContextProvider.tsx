import type React from 'react';
import type { Cart, CartEntry } from '../../types/Cart';
import { useEffect, useState } from 'react';
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

  const fetchCart = async () => {
    setIsLoading(true);

    try {
      const response = await instance.get('/cart/');
      setCart(response.data);
    } catch (error) {
      notifyAxiosError(error);
    }

    setIsLoading(false);
    setIsInitialLoading(false);
  };

  const addToCart = async (beerId: number): Promise<string | null> => {
    if (!user) {
      return null;
    }

    setIsLoading(true);

    setItemErrors(prev => {
      const next = new Map(prev);
      next.delete(beerId);
      return next;
    });

    let result: string | null = null;

    try {
      await instance.post(`/cart/${beerId}/`, null, {
        params: { quantity: 1 },
      });
      await fetchCart();
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

      result = msg;
    }

    setIsLoading(false);

    return result;
  };

  const updateCartItemQuantity = async (
    itemId: number,
    beerId: number,
    quantity: number,
  ) => {
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
  };

  const deleteFromCart = async (itemId: number, beerId: number) => {
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
  };

  const clearCart = async () => {
    try {
      setItemErrors(new Map());

      await instance.delete('/cart/clear/');
      setCart(emptyCart);
    } catch (error) {
      notifyAxiosError(error);
    }
  };

  const getQuantityInCart = (beerId: number) =>
    cart.cart_items.find(item => item.beer_id === beerId)?.quantity ?? 0;
  const isInCart = (beerId: number) =>
    cart.cart_items.some(item => item.beer_id === beerId);

  const totalCartItems = cart.cart_items.reduce(
    (total, item) => total + item.quantity,
    0,
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
  }, [user, isAuthLoading]);

  const value = {
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
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
