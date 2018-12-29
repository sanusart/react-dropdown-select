// Rollup plugins
import babel from 'rollup-plugin-babel';

module.exports = {
  entry: 'src/index.js',
  dest: 'dist/react-dropdown-select.js',
  format: 'iife',
  sourceMap: 'inline',
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};
