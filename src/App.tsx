import { Route, Routes } from 'react-router';
import { MainLayout } from './layouts/MainLayout';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { SignupPage } from './pages/SignupPage/SignupPage';
import { Cart } from './pages/Cart';
import './App.scss';
import { Catalogue } from './pages/Catalogue';
import { ProductPage } from './pages/ProductPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="beers" element={<Catalogue />} />
          <Route path="product/:productId" element={<ProductPage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
