const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = require('./webpack.config.base')({
  mode: 'production',

  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },

  optimization: {
    minimize: true,
  },

  plugins: [
    new CleanWebpackPlugin([
      path.resolve(process.cwd(), 'public'),
    ], { allowExternal: true }),
  ],
});
