import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    // Suppress verbose test names during execution - only show on failure
    reporters: process.env.CI ? ['verbose'] : ['basic'],
    // Stop after first failure to avoid flooding console
    bail: 1,
  },
});