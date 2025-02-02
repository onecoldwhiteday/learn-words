import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';


// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte()],
  build: {
    emptyOutDir: false,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'public/index.html'),
        offline: resolve(__dirname, 'public/offline.html'),
        'preview/index': resolve(__dirname, 'public/index.html'),
      },
    },
  },
})
