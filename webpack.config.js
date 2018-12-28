const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'lib', 'index.js'),
  output: {
    path: __dirname,
    filename: 'bat.js',
  },
  mode: 'production',

  optimization: {
    minimize: true,
  },

  module: {

    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: [path.join(__dirname, 'node_modules')],
        options: {
          presets: ['env', 'es2016'],
        },
      },
    ],

  },
};
