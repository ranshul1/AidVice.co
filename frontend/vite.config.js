import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias for `src` directory
    },
    extensions: ['.js', '.jsx'], // Add `.jsx` if not present
  },
  server: {
    proxy: {
      '/sos': {
        target: 'http://localhost:4001',
        changeOrigin: true,
        secure: false,
      },
    },
  },  
});
