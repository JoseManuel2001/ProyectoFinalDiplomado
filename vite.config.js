import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api/clima': {
        target: 'https://www.7timer.info',
        changeOrigin: true,
        rewrite: (path) =>
          path.replace(/^\/api\/clima/, '/bin/api.pl'),
      },
    },
  },
})
