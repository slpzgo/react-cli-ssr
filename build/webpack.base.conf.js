const path = require('path')
const webpack = require('webpack')
const WebpackBar = require('webpackbar')
const config = require('../config')
const utils = require('./utils')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    alias: {
      '@': resolve('src')
    },
    extensions: ['.js', '.jsx', '.json', '.less', '.css']
  },
  externals: {
    'prop-types': 'PropTypes'
    // 'react': 'React',
    // 'react-dom': 'ReactDOM'
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [utils.createLintingRule()] : []),
      {
        test: /\.js$/,
        include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  performance: {
    hints: false
  },
  plugins: [
    new WebpackBar({
      minimal: false,
      compiledIn: false
    }),
    new webpack.DllReferencePlugin({
      manifest: resolve('dll/manifest.json'),
      context: __dirname
    })
  ]
}
