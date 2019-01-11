module.exports = {
  plugins: [
    'emotion',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    'transform-dynamic-import'
  ],
  presets: [
    'minify',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry'
      }
    ],
    '@babel/preset-react'
  ]
};
