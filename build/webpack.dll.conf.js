const path = require('path')
const webpack = require('webpack')
const WebpackBar = require('webpackbar')
const config = require('../config')
module.exports = {

  entry: {
    vendor: ['react', 'react-dom', 'redux', 'react-redux', 'flyio', 'react-router-dom']
  },
  mode  : 'production',
  output: {
    path     : config.build.assetsDll,
    filename : '[name].dll.js',
    library  : '[name]_library'
  },
  performance: {
    hints: false
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new WebpackBar({
      minimal: false,
      compiledIn: false
    }),
    new webpack.DllPlugin({
      path: path.resolve(__dirname, '../dll', 'manifest.json'),
      name: '[name]_library',
      context: __dirname
    })
  ]
}