import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../services/api.js';
import { useCart } from '../context/CartContext.jsx';
import Loading from '../components/Loading.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchProductById(id)
      .then((data) => setProduct(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAdd = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  const handleClose = () => {
    navigate(-1);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return <ErrorMessage message="Producto no encontrado." />;

  return (
    <section className="page-section">
      <div className="detail-header">
        <button type="button" className="detail-close" onClick={handleClose} aria-label="Cerrar detalle">
          ×
        </button>
      </div>

      <div className="detail-grid card">
        <div className="detail-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="detail-info">
          <p className="product-category">{product.category}</p>
          <h1>{product.title}</h1>
          <p className="product-price detail-price">${product.price.toFixed(2)}</p>
          <p className="text-muted">{product.description}</p>
          <div className="detail-controls">
            <label>
              Cantidad
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
              />
            </label>
            <button className="button button-primary" onClick={handleAdd}>
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
