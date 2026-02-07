import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.tsx',
      name: 'reactDropdownSelect',
      formats: ['es', 'umd'],
      fileName: (format) => {
        return format === 'es' ? 'lib/index.js' : 'react-dropdown-select.js';
      }
    },
    outDir: 'dist',
    rollupOptions: {
      external: ['react', 'react-dom', '@emotion/react', '@emotion/styled'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@emotion/react': 'emotionReact',
          '@emotion/styled': 'emotionStyled'
        }
      }
    }
  },
  resolve: {
    alias: {
      'react-dropdown-select': './types.ts'
    }
  }
});
