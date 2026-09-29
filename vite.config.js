import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { apiApp } from './server/apiApp.js';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'portfolio-backend-api',
      configureServer(server) {
        server.middlewares.use(apiApp);
      }
    }
  ],
  server: {
    port: 3000,
    open: false
  }
});

