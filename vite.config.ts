import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'PythonRegex',
      formats: ['es'],
      fileName: () => 'index.esm.js',
    },
    rollupOptions: {
      external: ['pyodide', 'core-js'],
      output: {
        globals: {
          pyodide: 'Pyodide',
          'core-js': 'CoreJS',
        },
      },
    },
    target: 'esnext',
    minify: 'esbuild',
  },
});