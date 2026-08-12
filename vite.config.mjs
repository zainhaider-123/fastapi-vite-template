import path from 'node:path'
import { fileURLToPath } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  appType: 'custom',
  publicDir: false,
  base: '/static/dist/',
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/client'),
    },
  },
  build: {
    outDir: 'src/static/dist',
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'src/client/main.ts'),
      output: {
        entryFileNames: 'main.js',
        chunkFileNames: 'chunks/[name].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names?.[0] ?? ''
          if (name.endsWith('.css')) {
            return 'main.css'
          }
          return 'assets/[name][extname]'
        },
      },
    },
  },
})
