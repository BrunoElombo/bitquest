import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // Keep paths as written: on some Windows setups real paths point into an unreadable app container.
    preserveSymlinks: true,
    alias: {
      '@shared': fileURLToPath(new URL('../shared', import.meta.url)),
    },
  },
  server: {
    port: 5180,
    strictPort: true,
    proxy: {
      '/api': 'http://localhost:3001',
    },
    fs: { allow: ['..'] },
  },
  worker: { format: 'es' },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom', 'zustand'],
          editor: ['@uiw/react-codemirror', '@codemirror/lang-javascript', '@codemirror/lang-python'],
          sucrase: ['sucrase'],
          phaser: ['phaser'],
        },
      },
    },
  },
});
