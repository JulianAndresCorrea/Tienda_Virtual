import { useEffect, useMemo, useState } from 'react';
import { fetchProducts } from '../services/api.js';

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then((data) => {
        setProducts(data);
        const uniqueCategories = Array.from(new Set(data.map((product) => product.category)));
        setCategories(uniqueCategories);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchTerm = search.trim().toLowerCase();
      const matchesText =
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm);
      const matchesCategory = category === 'all' || product.category === category;
      return matchesText && matchesCategory;
    });
  }, [products, search, category]);

  return {
    products: filteredProducts,
    rawProducts: products,
    categories,
    loading,
    error,
    search,
    setSearch,
    category,
    setCategory,
  };
}
