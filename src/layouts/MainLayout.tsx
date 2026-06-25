import { Outlet } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ScrollToTopButton } from '../components/ScrollToTopButton';

export const MainLayout = () => {
  return (
    <>
      <Header />

      <main className="main">
        <Outlet />
      </main>

      <Footer />
      <ScrollToTopButton />
    </>
  );
};
