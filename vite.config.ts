import { defineConfig } from 'vite'
import RailsPlugin from 'vite-plugin-rails'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  build: {
    sourcemap: 'inline',
  },
  plugins: [
    RailsPlugin(),
    react(),
    tsconfigPaths(),
  ],
})
