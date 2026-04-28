export default function ErrorMessage({ message }) {
  return (
    <div className="status-card status-error">
      <p>{message}</p>
    </div>
  );
}
