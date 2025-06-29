import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [react(), vue(), svelte()],
  resolve: {
    alias: {
      '@ui-kit/core': '../core',
      '@ui-kit/react': '../react/src',
      '@ui-kit/vue': '../../vue/src',
      '@ui-kit/svelte': '../../svelte/src',
      '@ui-kit/angular': '../../angular/src',
    },
  },
  server: {
    open: true,
    hmr: true,
  },
  build: {
    sourcemap: true,
  },
  envDir: '.',
});
