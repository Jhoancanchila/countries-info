/// <reference types="vitest" />
/// <reference types="Vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Simula el DOM en el navegador
    globals: true,        // Permite usar describe, it, etc. sin importar vitest
    setupFiles: './src/setupTests.ts', // Archivo para configuración global de pruebas
    css: false, // Deshabilita el procesamiento CSS en las pruebas para simplificar
  },
})
