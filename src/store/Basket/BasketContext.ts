import { createContext } from "react";
import type { BasketContextType } from "./BasketContextProvider";

export const BasketContext = createContext<BasketContextType | null>(null);
