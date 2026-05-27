import { Outlet } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const MainLayout = () => {
  return (
    <>
      <Header />

      <main className="main">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};
