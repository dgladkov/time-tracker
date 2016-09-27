const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false,
};

module.exports = {
  devtool: 'source-map',
  noInfo: true,
  entry: [
    './js/index',
    './scss/index.scss',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
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
        loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap'),
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
