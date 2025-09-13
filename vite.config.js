import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false
    },
    fs: {
      cachedChecks: false
    }
  },
  optimizeDeps: {
    exclude: ['@vitejs/plugin-react-swc']
  }
})
