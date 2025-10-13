import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://truto-cms.yuvraj-432.workers.dev',
        changeOrigin: true,
        secure: true,
      }
    }
  },
  build: {
    sourcemap: false, // Disable source maps in production
    minify: 'esbuild', // Use esbuild for faster minification
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'query-vendor': ['@tanstack/react-query'],
          'syntax-highlighter': ['react-syntax-highlighter'], // Separate chunk for syntax highlighter
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true, // Enable CSS code splitting
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@tanstack/react-query'],
  },
})
