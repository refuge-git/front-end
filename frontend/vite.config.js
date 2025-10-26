import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Garantir que os assets sejam tratados como UTF-8
    charset: 'utf8',
    rollupOptions: {
      output: {
        // Adicionar charset nas tags script e link
        inlineDynamicImports: false,
      }
    }
  }
})
