export default function SearchFilter({ categories, search, category, onSearch, onCategory }) {
  return (
    <div className="filters card">
      <label>
        Buscar productos
        <input
          type="search"
          value={search}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Busca por nombre o descripción"
        />
      </label>
      <label>
        Filtrar categoría
        <select value={category} onChange={(event) => onCategory(event.target.value)}>
          <option value="all">Todas</option>
          {categories.map((option) => {
            const value = typeof option === 'string' ? option : option.id;
            const label = typeof option === 'string' ? option : option.label;
            return (
              <option key={value} value={value}>
                {label}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
}
