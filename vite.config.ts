import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Firebase pesa mucho: se separa en su propio chunk para que el
        // código de la app cargue (y se cachee) aparte.
        manualChunks: {
          firebase: ['firebase/app', 'firebase/firestore'],
        },
      },
    },
  },
});
