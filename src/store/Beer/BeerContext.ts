import { createContext } from "react";
import type { BeerContextValue } from "./BeerContextProvider";

export const BeerContext = createContext<BeerContextValue | null>(null);
