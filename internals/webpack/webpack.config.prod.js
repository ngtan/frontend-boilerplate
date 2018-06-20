const path = require('path');

module.exports = require('./webpack.config.base')({
  mode: 'production',

  entry: [
    path.join(process.cwd(), '/app/bootstrap.js'),
    path.join(process.cwd(), '/app/styles/main.scss'),
  ],

  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },

  optimization: {
    minimize: true,
  },

  plugins: [],
});
