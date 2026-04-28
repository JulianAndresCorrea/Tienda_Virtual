const BASE_URL = 'https://fakestoreapi.com';

export async function fetchProducts() {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) {
    throw new Error('No se pudieron obtener los productos');
  }
  return response.json();
}

export async function fetchProductById(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error('No se pudo obtener el producto');
  }
  return response.json();
}
