import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      "/api": "https://todoxpress-363k.onrender.com"
    }
  },
  plugins: [react()]
});
