import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs/dev/config/
export default defineConfig({
  // ESTA ES LA LÍNEA MÁGICA QUE ARREGLA TODO
  base: '/kannawey/', 
  plugins: [react()],
})
