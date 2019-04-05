const webpack = require('webpack');

module.exports = require('./webpack.config.base')({
  mode: 'development',

  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

  optimization: {
    minimize: false,
    splitChunks: {
      chunks: 'all',
    },
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
