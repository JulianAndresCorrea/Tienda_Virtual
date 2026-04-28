export default function QuantitySelector({ quantity, onChange }) {
  return (
    <div className="quantity-selector">
      <button type="button" onClick={() => onChange(quantity - 1)}>-</button>
      <span>{quantity}</span>
      <button type="button" onClick={() => onChange(quantity + 1)}>+</button>
    </div>
  );
}
