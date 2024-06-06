import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/tests/**/*.test.tsx'],
    setupFiles: ['src/tests/helpers/setup.ts'],
  },
  resolve: {
    alias: {
      '@': '/src',
      '@public': '/public',
    },
  },
});
