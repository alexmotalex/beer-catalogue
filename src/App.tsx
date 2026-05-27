import { Route, Routes } from 'react-router';
import { MainLayout } from './layouts/MainLayout';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage/RegisterPage';
import { Cart } from './pages/Cart';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
