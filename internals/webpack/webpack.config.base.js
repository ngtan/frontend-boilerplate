const path = require('path');
const autoprefixer = require('autoprefixer');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const resolvePath = segment => path.resolve(process.cwd(), segment);

const getFiles = segment => glob.sync(resolvePath(segment));

const getScripts = () => getFiles('app/components/**/*.js');

const getStyles = () => getFiles('app/components/**/*.scss');

const getStyleRules = (options) => {
  const cssRules = [
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
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

const getHtmlPlugin = (options) => {
  const minify = options.mode === 'development' ? false : {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true,
  };
  const pages = glob.sync(resolvePath('app/pages/**/*.pug'));

  return pages.map(page => new HtmlWebpackPlugin({
    filename: page.split('/').pop().toLowerCase().replace(/\.pug$/, '.html'),
    template: page,
    inject: true,
    minify,
  }));
};

module.exports = options => ({
  mode: options.mode,

  entry: [
    path.join(process.cwd(), '/app/app.js'),
    ...getScripts(),
    path.join(process.cwd(), '/app/styles/main.scss'),
    ...getStyles(),
  ],

  output: Object.assign({
    path: resolvePath('public'),
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
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(eot|otf|ttf|woff2?)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: `fonts/[name].${(options.mode === 'development' ? '' : '[hash:7].')}[ext]`,
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
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
      {
        test: /\.(mp3|mp4|webm|ogg|wav)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: `media/[name].${(options.mode === 'development' ? '' : '[hash:7].')}[ext]`,
          },
        },
      },
    ],
  },

  plugins: options.plugins.concat([
    ...getHtmlPlugin(options),

    new MiniCssExtractPlugin({
      filename: `[name].${(options.mode === 'development' ? '' : '[hash:7].')}css`,
      chunkFilename: `[id].${(options.mode === 'development' ? '' : '[hash:7].')}css`,
    }),

    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ]),

  resolve: {
    modules: [
      resolvePath('app'),
      'node_modules',
    ],

    alias: {
      '@images': resolvePath('app/images'),
    },
  },

  devServer: {
    watchContentBase: true,
    compress: true,
    host: '0.0.0.0',
    port: process.env.PORT || 3000,
    stats: 'errors-only',
  },

  devtool: options.devtool,

  performance: options.performance || {},
});
