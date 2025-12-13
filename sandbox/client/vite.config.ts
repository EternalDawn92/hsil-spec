import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  server: {
    proxy: {
      '/encode-intent': 'http://localhost:3001',
      '/health': 'http://localhost:3001'
    }
  }
})
