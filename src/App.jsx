import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import CategoryPage from './pages/CategoryPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import './App.css';

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const hideNavbarOnDetail = location.pathname.startsWith('/product/');
  const hideNavbarOnCategory = location.pathname.startsWith('/category/');
  const hideNavbarOnCart = location.pathname === '/cart';
  const hideNavbarOnCheckout = location.pathname === '/checkout';
  const hideNavbarOnAuth = location.pathname === '/login';
  const hideNavbarOnProducts = location.pathname === '/products';

  return (
    <div className="app-shell">
      {!isHome && !hideNavbarOnDetail && !hideNavbarOnCategory && !hideNavbarOnCart && !hideNavbarOnCheckout && !hideNavbarOnAuth && !hideNavbarOnProducts && <Navbar />}
      <main className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer className="page-footer">
        <div>
          <p>© 2026 NovaShop. Todos los derechos reservados.</p>
          <p>Envíos a todo el país | Soporte 24/7</p>
        </div>
        <div>
          <p>Contacto: soporte@novashop.com</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter basename="/Tienda_Virtual">
          <AppContent />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
