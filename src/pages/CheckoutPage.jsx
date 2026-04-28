import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function CheckoutPage() {
  const { cartItems, totals, clearCart } = useCart();
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: '', email: '', address: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    clearCart();
    setTimeout(() => navigate('/'), 2500);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (cartItems.length === 0 && !submitted) {
    return (
      <section className="page-section">
        <div className="status-card">
          <p>No hay productos en el carrito para procesar el pago.</p>
        </div>
      </section>
    );
  }

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
            <span className="hero-label">Finaliza tu compra</span>
            <h1>Checkout</h1>
            <p>Simula tu compra con una experiencia sencilla.</p>
          </div>
          <div className="hero-brand-box card">
            <Link to="/" className="brand-title">
              NovaShop
            </Link>
            <p className="brand-subtitle">Todo en un clic</p>
          </div>
        </div>
      </div>

      {submitted ? (
        <div className="status-card status-success">
          <h2>Compra completada</h2>
          <p>Gracias por tu pedido, {values.name || 'cliente'}.</p>
          <p>Serás redirigido a la página de inicio en unos segundos.</p>
        </div>
      ) : (
        <div className="checkout-layout">
          <form className="checkout-form card" onSubmit={handleSubmit}>
            <label>
              Nombre completo
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Correo electrónico
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Dirección de envío
              <textarea
                name="address"
                value={values.address}
                onChange={handleChange}
                rows="4"
                required
              />
            </label>
            <button className="button button-primary" type="submit">
              Confirmar pago
            </button>
          </form>

          <aside className="checkout-summary card">
            <h2>Resumen de compra</h2>
            <p>{cartItems.length} artículo(s) en el carrito</p>
            <div className="summary-row summary-total">
              <span>Total estimado</span>
              <strong>${totals.totalPrice.toFixed(2)}</strong>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
