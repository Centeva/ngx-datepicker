var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge({
  entry: {
    'app': './src/lib.ts'
  },

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: "ctng.umd.js",
    libraryTarget: "umd"
  },

  externals: [
    '@angular/core',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/core',
    '@angular/common',
    '@angular/http',
    '@angular/router',
    '@angular/forms',
    'rxjs',
    'moment',
    'jquery'
  ],

  resolve: {
      extensions: ['', '.ts', '.js']
  },

  module: {
      loaders: [
        {
          test: /\.ts$/,
          loaders: ['awesome-typescript-loader', 'angular2-template-loader']
        },
        {
          test: /\.html$/,
          loader: 'html'
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          loader: 'file?name=assets/[name].[hash].[ext]'
        },
        {
          test: /\.css$/,
          include: [helpers.root('demo', 'app'), helpers.root('src')],
          loader: 'raw'
        },
        {
          test: /\.less$/,
          include: [helpers.root('demo', 'app'), helpers.root('src')],
          loaders: ['raw','less']
        }
      ]
    },

    htmlLoader: {
        minimize: false // workaround for ng2
    },

    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
        mangle: {
          keep_fnames: true
        }
      })
    ]
});
