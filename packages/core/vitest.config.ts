import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['../testing/src/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: [
        'src/**/*.test.ts',
        'src/**/*.spec.ts',
        'src/**/__tests__/**',
      ],
    },
  },
  resolve: {
    alias: {
      '@ribble-ui/testing': resolve(__dirname, '../testing/src'),
      '@ribble-ui/utils': resolve(__dirname, '../utils/src'),
    },
  },
});
