import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  base: '/Scream2Wish/',
  publicDir: path.resolve(__dirname, '../public'),

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@cmp': path.resolve(__dirname, './src/components'),
      '@root': path.resolve(__dirname, '../'),
    }
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})