import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const proxyUrl = import.meta.env.VITE_PROXY_URL || 'http://localhost:5000';

export default defineConfig({
  server: {
    proxy: {
      "/api": proxyUrl
    }
  },
  plugins: [react()]
});
