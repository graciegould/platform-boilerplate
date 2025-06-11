import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'platform-ui': path.resolve(__dirname, '../../packages/platform-ui/src/index.ts'),
      '@platform-ui': path.resolve(__dirname, '../../packages/platform-ui/src'),
    },
  },
  server: {
    port: 3000,
  },
});
