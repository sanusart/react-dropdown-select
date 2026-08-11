import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

const libSrc = path.resolve(__dirname, '../react-dropdown-select/src/index.tsx');
const rootPkg = path.resolve(__dirname, '../react-dropdown-select/package.json');

export default defineConfig({
  base: '/react-dropdown-select/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      'react-dropdown-select': libSrc,
      'root-pkg': rootPkg,
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
});
