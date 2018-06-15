const path = require('path');
const webpack = require('webpack');

module.exports = require('./webpack.config.base')({
  mode: 'production',

  entry: [
    path.join(process.cwd(), '/app/bootstrap.js'),
  ],

  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

  plugins: [],
});
