import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/emr-dashboard/', // ← replace with your actual repo name
  plugins: [react()],
})
