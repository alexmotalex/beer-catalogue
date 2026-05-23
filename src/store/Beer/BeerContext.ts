import { createContext } from "react";
import type { BeerContextType } from "./BeerContextProvider";

export const BeerContext = createContext<BeerContextType | null>(null);
