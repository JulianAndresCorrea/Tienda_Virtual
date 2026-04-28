import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="page-section">
      <div className="status-card">
        <h1>Página no encontrada</h1>
        <p>La ruta que buscas no existe. Regresa al catálogo o al carrito.</p>
        <Link to="/" className="button button-secondary">
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
