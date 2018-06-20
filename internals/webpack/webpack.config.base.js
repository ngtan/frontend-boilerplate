const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = options => ({
  mode: options.mode,

  entry: options.entry,

  output: Object.assign({
    path: path.resolve(process.cwd(), 'public'),
    publicPath: '/',
  }, options.output),

  optimization: options.optimization,

  module: {
    rules: [
      {
        test: /\.pug$/,
        use: {
          loader: 'pug-loader',
          options: {
            pretty: true,
            self: true,
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env'],
          },
        },
      },
      {
        test: /\.modernizrrc$/,
        use: ['modernizr-loader', 'json-loader'],
      },
      {
        test: /\.(eot|svg|otf|ttf|woff2?)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: `fonts/[name].${(options.mode === 'development' ? '' : '[hash:7].')}[ext]`,
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loaders: [
          {
            loader: 'url-loader',
            options: {
              limit: 2000,
              name: `images/[name].${(options.mode === 'development' ? '' : '[hash:7].')}[ext]`,
            },
          },
        ],
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      },
    ],
  },

  plugins: options.plugins.concat([
    ...glob.sync(path.resolve(process.cwd(), 'app/pages/**/*.pug')).map(file => new HtmlWebpackPlugin({
      filename: file.split('/').pop().toLowerCase().replace(/\.pug$/, '.html'),
      template: file,
      inject: true,
    })),
  ]),

  resolve: {
    modules: [
      path.resolve(process.cwd(), 'app'),
      'node_modules',
    ],

    alias: {
      modernizr$: path.resolve(process.cwd(), '.modernizrrc'),
    },
  },

  devServer: {
    hot: true,
    inline: true,
    contentBase: path.resolve(process.cwd(), 'app'),
    watchContentBase: true,
    compress: true,
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
  },

  devtool: options.devtool,

  performance: options.performance || {},
});
