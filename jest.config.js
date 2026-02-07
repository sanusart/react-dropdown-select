module.exports = {
  testEnvironment: 'jsdom',

  // Handle both JavaScript and TypeScript test files with the same transformer
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },

  testMatch: ['**/__tests__/**/*.spec.js', '**/__tests__/**/*.test.js'],

  snapshotSerializers: ['@emotion/jest/serializer'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/ClickOutside.ts',
    '!node_modules/**',
    '!docs/**',
    '!dist/**',
    '!coverage/**'
  ],
  collectCoverage: false,
  bail: true,
  roots: ['<rootDir>/__tests__'],

  // Module file extensions
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],

  // Resolve TypeScript modules without .tsx extensions
  moduleNameMapper: {
    '^.+\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  }
};
