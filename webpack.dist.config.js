const path = require('path');

module.exports = {
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'react-dropdown-select.js',
    library: 'react-dropdown-select',
    libraryTarget: 'umd',
    publicPath: '/dist/',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    }
  },
  externals: {
    react: 'umd react',
    'react-dom' : 'umd react-dom'
  }
};
