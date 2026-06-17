import { Route, Routes } from 'react-router';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { SignUpPage } from './pages/SignUpPage/SignUpPage';
import { Cart } from './pages/Cart';
import { Catalogue } from './pages/Catalogue';
import { ProductPage } from './pages/ProductPage';
import { SigninPage } from './pages/SignInPage';
import { CheckEmailPage } from './pages/CheckEmailPage';
import { ActivatePage } from './pages/ActivatePage';
import { EditUserPage } from './pages/EditUserPage';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="activate" element={<ActivatePage />} />
          <Route path="signin" element={<SigninPage />} />
          <Route path="edit-user" element={<EditUserPage />} />
          <Route path="checkemail" element={<CheckEmailPage />} />
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
