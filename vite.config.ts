/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  test: {
    environment: 'jsdom', // Configura el entorno para pruebas en el navegador
    setupFiles: './src/mocks/test.setup.ts', // Archivo para configurar MSW y otras dependencias
    globals: true, 
  },
});
