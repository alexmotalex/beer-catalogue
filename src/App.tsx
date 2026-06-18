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
import { NewPasswordPage } from './pages/NewPasswordPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ROUTES } from './constants/routes';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={ROUTES.home} element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path={ROUTES.signUp} element={<SignUpPage />} />
          <Route path={ROUTES.activate} element={<ActivatePage />} />
          <Route path={ROUTES.signIn} element={<SigninPage />} />
          <Route path={ROUTES.editUser} element={<EditUserPage />} />
          <Route
            path={ROUTES.forgotPassword}
            element={<ForgotPasswordPage />}
          />
          <Route path={ROUTES.setNewPassword} element={<NewPasswordPage />} />
          <Route path={ROUTES.checkEmail} element={<CheckEmailPage />} />
          <Route path={ROUTES.catalogue} element={<Catalogue />} />
          <Route path="product/:productId" element={<ProductPage />} />
          <Route path={ROUTES.cart} element={<Cart />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
