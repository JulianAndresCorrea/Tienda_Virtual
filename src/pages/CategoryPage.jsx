import { useMemo } from 'react';
import { useParams, NavLink, Link } from 'react-router-dom';
import useProducts from '../hooks/useProducts.js';
import ProductCard from '../components/ProductCard.jsx';
import Loading from '../components/Loading.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';

const categoryMeta = {
  hombre: {
    label: 'Hombre',
    description: 'Explora la colección de hombre con estilo y calidad.',
    apiCategory: "men's clothing",
  },
  mujer: {
    label: 'Mujer',
    description: 'Descubre las últimas piezas de moda femenina.',
    apiCategory: "women's clothing",
  },
  niños: {
    label: 'Niños',
    description: 'Encuentra lo mejor para los más pequeños.',
    apiCategory: "men's clothing",
  },
  juguetes: {
    label: 'Juguetes',
    description: 'Diversión y creatividad en cada producto.',
    apiCategory: 'jewelery',
  },
  tecnologia: {
    label: 'Tecnología',
    description: 'Gadgets y electrónica para el día a día.',
    apiCategory: 'electronics',
  },
  aseo: {
    label: 'Aseo',
    description: 'Cuida tu bienestar con productos de aseo confiables.',
    apiCategory: "women's clothing",
  },
  varios: {
    label: 'Varios',
    description: 'Productos diversos para todas tus necesidades.',
    apiCategory: 'all',
  },
};

export default function CategoryPage() {
  const { categoryId } = useParams();
  const { products, loading, error } = useProducts();

  const meta = categoryMeta[categoryId] || {
    label: 'Categoría',
    description: 'Explora los productos disponibles.',
    apiCategory: 'all',
  };

  const featuredProducts = useMemo(() => {
    const categoryFilter = meta.apiCategory;
    const filtered =
      categoryFilter === 'all'
        ? products
        : products.filter((product) => product.category === categoryFilter);
    return filtered.slice(0, 6);
  }, [products, meta.apiCategory]);

  return (
    <section className="page-section">
      <div className="hero-panel card">
        <Link to="/" className="hero-back-icon" aria-label="Volver al inicio">
          ←
        </Link>
        <div className="hero-inner">
          <div className="hero-copy-left">
            <span className="hero-label">Nueva colección 2026</span>
            <h1>{meta.label}</h1>
            <p>{meta.description}</p>
          </div>
          <div className="hero-brand-box card">
            <Link to="/" className="brand-title">NovaShop</Link>
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
            <span>{meta.label}</span>
            <span>{categoryId ? 'Categoría seleccionada' : 'Invitado'}</span>
          </div>
        </div>
      </div>

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <div className="product-grid">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)
          ) : (
            <div className="status-card card" style={{ padding: '2rem', textAlign: 'center' }}>
              <h3>No hay productos disponibles para esta categoría.</h3>
              <p>Revisa otra categoría o vuelve al inicio para explorar más opciones.</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
