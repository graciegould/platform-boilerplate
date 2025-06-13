import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';


export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: parseInt(process.env.VITE_PORT || '3000'), 
    open: true, 
    allowedHosts: true,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL, 
        changeOrigin: true,
        secure: false,      
        ws: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'js/[name].[hash].js',
        entryFileNames: 'js/[name].[hash].js',
      },
    },
  },
  base: '/',
});
