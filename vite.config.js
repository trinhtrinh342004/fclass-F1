import { defineConfig } from 'vite';

export default defineConfig({
  envPrefix: ['VITE_'],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
  },
});
