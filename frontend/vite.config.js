import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { Server } from 'lucide-react'
import { tr } from 'zod/locales'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  server : {
    host: true
  }
})
