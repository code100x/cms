// vitest.config.integration.ts
import { defineConfig } from 'vitest/config';

import dotenv from 'dotenv';

dotenv.config({ path: './.env.test' });

process.env.DATABASE_URL =
  'postgresql://postgres:postgres@localhost:5432/cms?schema=public';

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
