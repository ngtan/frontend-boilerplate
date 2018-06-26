const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');

const getStyleRules = (options) => {
  const cssRules = [
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        minimize: options.mode !== 'development',
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: true,
        plugins: [
          autoprefixer,
        ],
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
      },
    },
  ];

  if (options.mode === 'development') {
    cssRules.unshift({
      loader: 'style-loader',
      options: {
        sourceMap: true,
      },
    });
  } else {
    cssRules.unshift(MiniCssExtractPlugin.loader);
  }

  return cssRules;
};

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
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: getStyleRules(options),
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
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: `images/[name].${(options.mode === 'development' ? '' : '[hash:7].')}[ext]`,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                enabled: false,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.json$/,
        use: {
          loader: 'json-loader',
        },
      },
    ],
  },

  plugins: options.plugins.concat([
    ...glob.sync(path.resolve(process.cwd(), 'app/pages/**/*.pug')).map(file => new HtmlWebpackPlugin({
      filename: file.split('/').pop().toLowerCase().replace(/\.pug$/, '.html'),
      template: file,
      inject: true,
    })),

    new MiniCssExtractPlugin({
      filename: `[name].${(options.mode === 'development' ? '' : '[hash:7].')}css`,
      chunkFilename: `[id].${(options.mode === 'development' ? '' : '[hash:7].')}css`,
    }),
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
