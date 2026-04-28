import { useState } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function AuthPage() {
  const { user, login, logout } = useAuth();
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email.trim()) {
      login(email.trim());
      navigate('/');
    }
  };

  return (
    <section className="page-section">
      <div className="hero-panel card">
        <button
          type="button"
          className="hero-back-icon"
          onClick={handleGoBack}
          aria-label="Volver atrás"
        >
          ←
        </button>
        <div className="hero-inner">
          <div className="hero-copy-left">
            <span className="hero-label">Cuenta</span>
            <h1>Cuenta</h1>
            <p className="text-muted">Inicia sesión de forma simulada para ver el estado de usuario.</p>
          </div>
          <div className="hero-brand-box card">
            <Link to="/" className="brand-title">
              NovaShop
            </Link>
            <p className="brand-subtitle">Todo en un clic</p>
          </div>
        </div>
        <div className="hero-secondary">
          <nav className="hero-links">
            <NavLink to="/products">Productos</NavLink>
            <NavLink to="/cart">Carrito</NavLink>
            <NavLink to="/checkout">Checkout</NavLink>
            <NavLink to="/login">Cuenta</NavLink>
          </nav>
          <div className="hero-status">
            <span>Cuenta</span>
            <span>{user ? user.name : 'Invitado'}</span>
          </div>
        </div>
      </div>

      <div className="auth-card card">
        {user ? (
          <div>
            <p>Bienvenido, <strong>{user.name}</strong></p>
            <p>Correo: {user.email}</p>
            <button className="button button-secondary" onClick={logout}>
              Cerrar sesión
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            <label>
              Ingresa tu correo
              <input
                type="email"
                placeholder="usuario@correo.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
            <button className="button button-primary" type="submit">
              Iniciar sesión
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
