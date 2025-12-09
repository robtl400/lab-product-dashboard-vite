import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      // Use original class names in test environment
      localsConvention: 'camelCaseOnly',
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/__tests__/setup.js',
    css: {
      modules: {
        classNameStrategy: 'non-scoped',
      },
    },
  },
})
