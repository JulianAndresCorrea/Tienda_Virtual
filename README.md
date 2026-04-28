# E-commerce React Final

Proyecto de tienda en línea desarrollado con React y Vite como trabajo final de curso.

## Características incluidas

- Página de inicio con listado de productos
- Detalle de producto
- Carrito de compras con agregar, eliminar y actualizar cantidad
- Simulación de checkout
- Barra de navegación con estado de usuario y cantidad de items
- Manejo de carga y errores de API
- Persistencia del carrito con `localStorage`
- Simulación de autenticación básica
- Búsqueda y filtrado de productos
- Diseño responsive y moderno

## Estructura del proyecto

- `src/main.jsx`: entrada de la aplicación React.
- `src/App.jsx`: rutas principales y envoltura de contextos.
- `src/context/CartContext.jsx`: estado global del carrito con persistencia.
- `src/context/AuthContext.jsx`: estado simulado de autenticación.
- `src/services/api.js`: funciones para consumir la API pública Fake Store.
- `src/hooks/useProducts.js`: hook personalizado para cargar productos, filtros y estado.
- `src/components/`: componentes reutilizables como `Navbar`, `ProductCard`, `Loading`, `ErrorMessage`, `QuantitySelector` y filtros.
- `src/pages/`: vistas de la aplicación (Home, ProductDetail, Cart, Checkout, Auth, NotFound).
- `src/App.css` y `src/index.css`: estilos globales y de componentes.

## Cómo ejecutar el proyecto

1. Instala dependencias:

```bash
npm install
```

2. Inicia el servidor de desarrollo:

```bash
npm run dev
```

3. Abre la URL que indique Vite en el navegador, generalmente `http://localhost:5173`.

## Buenas prácticas aplicadas

- Uso de `React Router` para navegación entre vistas.
- Estado global con `Context API` para separar comportamiento del carrito y autenticación.
- Consumo de API externo con manejo de estado de carga y mensajes de error.
- Persistencia de carrito en `localStorage` para recuperar datos entre recargas.
- Separación de componentes presentacionales y de lógica.
- Props claras y reutilizables.
- Diseño responsive con CSS moderno.

## Notas adicionales

- La aplicación usa la API pública de Fake Store (`https://fakestoreapi.com`). Si la API falla, aparecerá un mensaje de error.
- El checkout es una simulación; el formulario limpia el carrito y muestra el estado de compra.
- El inicio de sesión es simulado y guarda el usuario en `localStorage`.
