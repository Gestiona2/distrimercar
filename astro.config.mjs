// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Demo: el sitio vive en una subcarpeta de demos.emp2web.com.
// Si Distrimercar recibe dominio propio, poner site: "https://..." y base: "/".
export default defineConfig({
  site: 'https://demos.emp2web.com',
  base: '/distrimercar',
  integrations: [],
  vite: {
    plugins: [tailwindcss()],
  },
});
