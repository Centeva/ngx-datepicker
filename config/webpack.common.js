var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './demo/main.ts'
  },

  resolve: {
    extensions: ['', '.ts', '.js', '.css']
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
        test: /\.less$/,
        exclude: [helpers.root('demo', 'app'), helpers.root('src')],
        loader: ExtractTextPlugin.extract('style', ['raw', 'less'])
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

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'demo/index.html'
    })
  ]
};
