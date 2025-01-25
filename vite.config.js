import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fetchTitlePlugin from './src/plugins/fetch-title-plugin'

export default defineConfig({
  plugins: [
    react(),
    fetchTitlePlugin()
  ]
})
