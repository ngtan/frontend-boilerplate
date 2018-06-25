const path = require('path');
const webpack = require('webpack');

module.exports = require('./webpack.config.base')({
  mode: 'development',

  entry: [
    path.join(process.cwd(), '/app/app.js'),
    path.join(process.cwd(), '/app/styles/main.scss'),
  ],

  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

  optimization: {
    minimize: false,
  },

  plugins: [
    // enables Hot Modules Replacement
    new webpack.HotModuleReplacementPlugin(),
  ],

  devtool: 'eval-source-map',

  performance: {
    hints: false,
  },
});
