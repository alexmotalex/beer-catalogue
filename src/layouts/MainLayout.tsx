import { Outlet } from 'react-router';
import { Header } from '../pages/Header';
import { Footer } from '../pages/Footer';

export const MainLayout = () => {
  return (
    <>
      <Header />

      <Outlet />

      <Footer />
    </>
  );
};
