import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totals } = useCart();

  return (
    <header className="navbar card">
      <div className="navbar-brand">
        <Link to="/" className="brand-title">
          NovaShop
        </Link>
        <p className="brand-subtitle">Todo en un clic</p>
      </div>
      <nav className="navbar-links">
        <NavLink to="/products" end>
          Productos
        </NavLink>
        <NavLink to="/cart">Carrito</NavLink>
        <NavLink to="/checkout">Checkout</NavLink>
        <NavLink to="/login">Cuenta</NavLink>
      </nav>
      <div className="navbar-status">
        <span>{totals.totalItems} producto(s) en carrito</span>
        {user ? (
          <div className="user-badge">
            <span>{user.name}</span>
            <button className="link-button" onClick={logout}>
              Salir
            </button>
          </div>
        ) : (
          <span>Invitado</span>
        )}
      </div>
    </header>
  );
}
