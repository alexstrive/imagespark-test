import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

import path from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // alias: {
    //   '@': path.resolve(__dirname, './src'),
    //   '@pages': path.resolve(__dirname, './src/pages'),
    //   '@components': path.resolve(__dirname, './src/components'),
    // },
  },
  plugins: [vue()],
});
