import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      "/api": import.meta.env.VITE_PROXY_URL
    }
  },
  plugins: [react()]
});
