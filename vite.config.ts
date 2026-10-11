import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Le site est servi par GitHub Pages sous /Juliette-apprend-l-arabe/.
export default defineConfig({
  base: '/Juliette-apprend-l-arabe/',
  plugins: [react(), tailwindcss()],
})
