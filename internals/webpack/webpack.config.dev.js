const path = require('path');
const webpack = require('webpack');

module.exports = require('./webpack.config.base')({
  mode: 'development',

  entry: [
    path.join(process.cwd(), '/app/bootstrap.js'),
  ],

  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

  plugins: [],

  pugQuery: {
    pretty: true,
  },
});
