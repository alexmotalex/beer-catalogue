import { BrowserRouter as Router } from 'react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { AuthContextProvider } from './store/Authorization/AuthContextProvider.tsx';
import { BeerContextProvider } from './store/Beer/BeerContextProvider.tsx';
import { CartContextProvider } from './store/Cart/CartContextProvider.tsx';
import { ScrollToTop } from './utils/scrollToTop.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router basename="/beer-catalogue/">
      <ScrollToTop />
      <AuthContextProvider>
        <BeerContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </BeerContextProvider>
      </AuthContextProvider>
    </Router>
  </StrictMode>,
);
