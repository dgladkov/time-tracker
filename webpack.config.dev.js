const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('development'),
  __DEV__: true,
};

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  noInfo: true,
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './js/index',
    './scss/index.scss',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
      inject: true
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'js'),
      },
      {
        test: /(\.css|\.scss)$/,
        include: path.join(__dirname, 'scss'),
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        loader: 'file',
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'file-loader?prefix=font/&limit=5000',
      },
      {
        test: /\.ttf(\?v=\d+.\d+.\d+)?$/,
        loader: 'file-loader?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        loader: 'file-loader?limit=10000&mimetype=image/svg+xml',
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: ['file'],
      },
      {
        test: /\.ico$/,
        loader: 'file-loader?name=[name].[ext]',
      },
    ],
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, 'node_modules/bootstrap/scss')],
  },
};
