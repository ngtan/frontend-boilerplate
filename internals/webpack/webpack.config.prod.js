const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = require('./webpack.config.base')({
  mode: 'production',

  entry: [
    path.join(process.cwd(), '/app/app.js'),
    path.join(process.cwd(), '/app/styles/main.scss'),
  ],

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
