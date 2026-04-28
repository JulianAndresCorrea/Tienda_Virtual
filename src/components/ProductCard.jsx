import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <article className="product-card card">
      <div className="product-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-card-body">
        <p className="product-category">{product.category}</p>
        <h3>{product.title}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <Link to={`/product/${product.id}`} className="button button-primary">
          Ver detalle
        </Link>
      </div>
    </article>
  );
}
