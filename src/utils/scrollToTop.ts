import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { ROUTES } from '../constants/routes';

export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const excludedRoutes = [ROUTES.cart];

    console.log(excludedRoutes, pathname);

    if (excludedRoutes.some(route => route === pathname)) {
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
