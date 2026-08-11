import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' para que funcione tanto en localhost como en GitHub Pages
// (https://<usuario>.github.io/<repo>/) sin tener que tocar nada.
export default defineConfig({
  plugins: [react()],
  base: './',
})
