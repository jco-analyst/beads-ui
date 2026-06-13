/// <reference types="vitest" />
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Vite dev server for the React 19 frontend (strangler migration — see bdui-321).
//
// Coexists with the existing esbuild/lit-html bundle (`app/`, `npm run build`).
// During migration the React app lives under `src/` and is served from the repo
// root `index.html`; the legacy lit-html app continues to be served by the Node
// HTTP server from `app/`.
//
// Mirrors the Work-wellness reference config: React Compiler via Babel + `@`→`/src`.
// Tailwind v4 is wired via `@tailwindcss/vite` (bdui-321.2); the CSS-first config
// (theme tokens, dark variant) lives in `src/index.css`.
const NODE_SERVER = 'http://127.0.0.1:3000';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', {}]]
      }
    }),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    port: 5173,
    // Proxy backend traffic to the existing Node HTTP + WebSocket server so the
    // React dev server is a drop-in front end during the migration.
    proxy: {
      '/api': { target: NODE_SERVER, changeOrigin: true },
      '/healthz': { target: NODE_SERVER, changeOrigin: true },
      '/ws': { target: NODE_SERVER, ws: true, changeOrigin: true }
    }
  }
});
