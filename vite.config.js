import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/Tienda_Virtual/",
});

// en la terminal ejecutar comando:  npm i --save-dev gh-pages