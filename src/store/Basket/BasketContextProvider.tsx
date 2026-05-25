import type React from "react";
import type { Beer } from "../../types/Beer";
import { useMemo, useState } from "react";
import type { BasketItem } from "../../types/BasketItem";
import { BasketContext } from "./BasketContext";

export type BasketContextType = {
  basketList: BasketItem[];
  totalBasketItems: number;
  addToBasket: (product: Beer) => void;
  deleteFromBasket: (id: number) => void;
  clearBasket: () => void;
  totalBasketAmount: number;
};

type Props = {
  children: React.ReactNode;
};

export const BasketContextProvider: React.FC<Props> = ({ children }) => {
  const [basketList, setBasketList] = useState<BasketItem[]>([]);

  const addToBasket = (beer: Beer) => {
    setBasketList((prev) => {
      const isAlreadyInBasket = prev.some((p) => p.id === beer.id);

      if (isAlreadyInBasket) {
        return prev;
      }

      return [...prev, { id: beer.id, qty: 1, beer }];
    });
  };

  const deleteFromBasket = (id: number) => {
    setBasketList((prev) => prev.filter((p) => p.id !== id));
  };

  const clearBasket = () => {
    setBasketList([]);
  };

  const totalBasketItems = useMemo(
    () => basketList.reduce((total, item) => total + item.qty, 0),
    [basketList],
  );

  const totalBasketAmount = useMemo(
    () =>
      basketList.reduce((totalAmount, item) => {
        const productTotalAmount = Number(item.beer.price) * item.qty;

        return totalAmount + productTotalAmount;
      }, 0),
    [basketList],
  );

  const value: BasketContextType = useMemo(
    () => ({
      basketList,
      totalBasketItems,
      addToBasket,
      deleteFromBasket,
      clearBasket,
      totalBasketAmount,
    }),
    [basketList, totalBasketItems, totalBasketAmount],
  );

  return (
    <BasketContext.Provider value={value}>{children}</BasketContext.Provider>
  );
};
