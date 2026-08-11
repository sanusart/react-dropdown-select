import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      'packages/react-dropdown-select/dist/**',
      'packages/react-dropdown-select/lib/**',
      'packages/react-dropdown-select/types/**',
      'packages/react-dropdown-select/types.d.ts',
      'packages/react-dropdown-select/coverage/**',
      'packages/react-dropdown-select/storybook-static/**',
      'packages/docs-site/dist/**',
      'packages/docs-site/vendor/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,
  reactHooks.configs.flat.recommended,
  {
    files: [
      'packages/react-dropdown-select/src/**/*.{js,ts,tsx}',
      'packages/docs-site/src/**/*.{js,jsx,ts,tsx}',
    ],
    languageOptions: {
      globals: { ...globals.browser },
    },
  },
  {
    files: [
      '*.{js,mjs,cjs}',
      'packages/react-dropdown-select/scripts/**/*.{js,mjs,cjs}',
      'packages/react-dropdown-select/webpack.config.js',
      'packages/docs-site/vite.config.js',
      'eslint.config.mjs',
    ],
    languageOptions: {
      globals: { ...globals.node },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    rules: {
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        { allowShortCircuit: true, allowTernary: true },
      ],
      'react-hooks/refs': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/set-state-in-render': 'off',
      'react-hooks/unsupported-syntax': 'off',
      'react-hooks/static-components': 'off',
      'react-hooks/use-memo': 'off',
      'react-hooks/void-use-memo': 'off',
      'react-hooks/preserve-manual-memoization': 'off',
      'react-hooks/incompatible-library': 'off',
      'react-hooks/globals': 'off',
      'react-hooks/error-boundaries': 'off',
      'react-hooks/gating': 'off',
      'react-hooks/config': 'off',
    },
    settings: {
      react: {
        version: '18',
      },
    },
  },
  {
    files: ['packages/react-dropdown-select/__tests__/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.jest, ...globals.node },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
  {
    files: ['packages/react-dropdown-select/.storybook/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  eslintConfigPrettier,
);
