const path = require('path');
const WebpackPwaManifest = require('webpack-pwa-manifest');

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
    new WebpackPwaManifest({
      name: 'frontend boilerplate',
      short_name: 'fe boilerplate',
      description: 'Make the development process as fast as possible',
      fingerprints: false,
      icons: [
        {
          src: path.resolve('app/images/icon-512x512.png'),
          sizes: [72, 96, 120, 128, 144, 152, 167, 180, 192, 384, 512],
        },
      ],
    }),
  ],
});
