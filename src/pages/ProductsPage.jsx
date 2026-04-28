import { useMemo, useState } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import useProducts from '../hooks/useProducts.js';
import ProductCard from '../components/ProductCard.jsx';
import Loading from '../components/Loading.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import SearchFilter from '../components/SearchFilter.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

const featuredCategoryOptions = [
  { id: 'hombre', label: 'Hombre', apiCategory: "men's clothing" },
  { id: 'mujer', label: 'Mujer', apiCategory: "women's clothing" },
  { id: 'niños', label: 'Niños', apiCategory: "men's clothing" },
  { id: 'juguetes', label: 'Juguetes', apiCategory: 'jewelery' },
  { id: 'tecnologia', label: 'Tecnología', apiCategory: 'electronics' },
  { id: 'aseo', label: 'Aseo', apiCategory: "women's clothing" },
  { id: 'varios', label: 'Varios', apiCategory: 'all' },
];

export default function ProductsPage() {
  const { rawProducts, loading, error } = useProducts();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const { user } = useAuth();
  const { totals } = useCart();
  const navigate = useNavigate();

  const filteredProducts = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();
    const selectedCategory = featuredCategoryOptions.find((option) => option.id === category);
    const apiCategory = selectedCategory?.apiCategory ?? 'all';

    return rawProducts.filter((product) => {
      const matchesText =
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm);
      const matchesCategory =
        category === 'all' || apiCategory === 'all' || product.category === apiCategory;
      return matchesText && matchesCategory;
    });
  }, [rawProducts, search, category]);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
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
            <span className="hero-label">Productos</span>
            <h1>Productos</h1>
            <p className="text-muted">Explora todos los productos disponibles en nuestra tienda.</p>
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
            <span>{rawProducts.length} producto(s)</span>
            <span>{user ? user.name : 'Invitado'}</span>
          </div>
        </div>
      </div>

      <SearchFilter
        categories={featuredCategoryOptions}
        search={search}
        category={category}
        onSearch={setSearch}
        onCategory={setCategory}
      />

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <div className="product-grid">
          {filteredProducts.length === 0 ? (
            <div className="status-card">
              <p>No hay productos que coincidan con la búsqueda o categoría seleccionada.</p>
            </div>
          ) : (
            filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
          )}
        </div>
      )}
    </section>
  );
}
