import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import QuantitySelector from '../components/QuantitySelector.jsx';

export default function CartPage() {
  const { cartItems, totals, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
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
            <span className="hero-label">Tu carrito</span>
            <h1>Revisa tus artículos</h1>
            <p className="text-muted">Administra los productos antes del checkout.</p>
          </div>
          <div className="hero-brand-box card">
            <Link to="/" className="brand-title">
              NovaShop
            </Link>
            <p className="brand-subtitle">Todo en un clic</p>
          </div>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="status-card">
          <p>Tu carrito está vacío.</p>
          <Link to="/" className="button button-secondary">
            Ir a productos
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-list">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item card">
                <img src={item.image} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <p className="product-category">{item.category}</p>
                  <p>${item.price.toFixed(2)} cada uno</p>
                  <QuantitySelector
                    quantity={item.quantity}
                    onChange={(value) => updateQuantity(item.id, value)}
                  />
                  <button className="link-button" onClick={() => removeFromCart(item.id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="cart-summary card">
            <h2>Resumen</h2>
            <div className="summary-row">
              <span>Productos</span>
              <span>{totals.totalItems}</span>
            </div>
            <div className="summary-row summary-total">
              <strong>Total</strong>
              <strong>${totals.totalPrice.toFixed(2)}</strong>
            </div>
            <Link to="/checkout" className="button button-primary">
              Continuar al pago
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
}
