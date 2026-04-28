import { Link, NavLink } from 'react-router-dom';
import useProducts from '../hooks/useProducts.js';
import ProductCard from '../components/ProductCard.jsx';
import Loading from '../components/Loading.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import SearchFilter from '../components/SearchFilter.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';

export default function HomePage() {
  const {
    products,
    categories,
    loading,
    error,
    search,
    setSearch,
    category,
    setCategory,
  } = useProducts();

  const featuredCategories = [
    {
      id: 'hombre',
      name: 'Hombre',
      description: 'Moda y accesorios pensados para hombre.',
      image: 'https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=1200&q=80',
      layout: 'span-3',
    },
    {
      id: 'mujer',
      name: 'Mujer',
      description: 'Ropa y complementos con estilo femenino.',
      image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
      layout: 'span-3',
    },
    {
      id: 'niños',
      name: 'Niños',
      description: 'Todo para los más pequeños de la casa.',
      image: 'https://images.unsplash.com/photo-1516048963594-0c61a792d3b7?auto=format&fit=crop&w=1200&q=80',
      layout: 'span-3',
    },
    {
      id: 'juguetes',
      name: 'Juguetes',
      description: 'Diversión y creatividad para cada edad.',
      image: 'https://images.unsplash.com/photo-1534152022751-dcfd15ed8f22?auto=format&fit=crop&w=1200&q=80',
      layout: 'span-3',
    },
    {
      id: 'tecnologia',
      name: 'Tecnología',
      description: 'Gadgets y electrónica de última generación.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      layout: 'span-6',
    },
    {
      id: 'aseo',
      name: 'Aseo',
      description: 'Productos de cuidado personal y limpieza.',
      image: 'https://images.unsplash.com/photo-1586159480222-1e46d747ff3d?auto=format&fit=crop&w=1200&q=80',
      layout: 'span-3',
    },
    {
      id: 'varios',
      name: 'Varios',
      description: 'Encuentra lo que necesitas en nuestra selección diversa.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
      layout: 'span-3',
    },
  ];

  const { user } = useAuth();
  const { totals } = useCart();

  const showResults = category !== 'all' || search.trim() !== '';

  return (
    <section className="page-section">
      <div className="hero-panel card">
        <div className="hero-inner">
          <div className="hero-copy-left">
            <span className="hero-label">Nueva colección 2026</span>
            <h1>Todo lo que buscas, en un solo lugar</h1>
            <p>Explora las 7 categorías destacadas y encuentra productos únicos para cada estilo.</p>
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
            <span>{totals.totalItems} producto(s) en carrito</span>
            <span>{user ? user.name : 'Invitado'}</span>
          </div>
        </div>
      </div>

      <div className="category-grid">
        {featuredCategories.map((categoryItem) => (
          <article
            key={categoryItem.name}
            className={`category-card card ${categoryItem.layout}`}>
            <div className="category-image">
              <img src={categoryItem.image} alt={categoryItem.name} />
              <div className="category-overlay" />
            </div>
            <div className="category-content">
              <div>
                <h2>{categoryItem.name}</h2>
                <p>{categoryItem.description}</p>
              </div>
              <Link className="button secondary" to={`/category/${categoryItem.id}`}>
                Ver más...
              </Link>
            </div>
          </article>
        ))}
      </div>

      {showResults && (
        <>
          <SearchFilter
            categories={categories}
            search={search}
            category={category}
            onSearch={setSearch}
            onCategory={setCategory}
          />

          {!loading && !error && (
            <div className="product-grid">
              {products.length === 0 ? (
                <div className="status-card">
                  <p>No hay productos que coincidan con la búsqueda o categoría seleccionada.</p>
                </div>
              ) : (
                products.map((product) => <ProductCard key={product.id} product={product} />)
              )}
            </div>
          )}
        </>
      )}

      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
    </section>
  );
}
