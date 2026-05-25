import { HashRouter as Router } from "react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthContextProvider } from "./store/Authorization/AuthContextProvider.tsx";
import { BeerContextProvider } from "./store/Beer/BeerContextProvider.tsx";
import { BasketContextProvider } from "./store/Basket/BasketContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <AuthContextProvider>
        <BeerContextProvider>
          <BasketContextProvider>
            <App />
          </BasketContextProvider>
        </BeerContextProvider>
      </AuthContextProvider>
    </Router>
  </StrictMode>,
);
