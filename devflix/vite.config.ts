import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '127.0.0.1', // O usa 'localhost'
    port: 5173, // Puerto por defecto
  },
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
