// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://distrimercar.example.com',
  integrations: [],
  vite: {
    plugins: [tailwindcss()],
  },
});
