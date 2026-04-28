export default function Loading({ message = 'Cargando...' }) {
  return (
    <div className="status-card">
      <p>{message}</p>
    </div>
  );
}
