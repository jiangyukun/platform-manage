const webpack = require('webpack')
const moment = require('moment')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: [
    './js/src/boot/index.js'
  ],

  output: {
    // path: 'D:/2017/company/app-parent/backed-web/src/main/webapp/platform-new/build/',
    path: 'C:/Users/jiangyukun/WebstormProjects/platform-manage/build/prod/',
    filename: 'bundle-' + moment().format('MMDD') + '.min.js',
    publicPath: 'build/'
  },

  module: {
    loaders: [
      {test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/, include: __dirname},
      {test: /\.less$/, loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader', 'postcss-loader', 'less-loader']})},
      {test: /\.scss$/, loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader', 'postcss-loader', 'sass-loader']})},
      {test: /\.(jpg|png)$/, loader: "url-loader?limit=8192"},
      {test: /\.svg$/, loader: "file-loader"}
    ]
  },

  plugins: [
    new ExtractTextPlugin('style-' + moment().format('MMDD') + '.css'),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./manifest.json'),
    }),
    new webpack.DefinePlugin({'process.env.NODE_ENV': 'test'}),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: false
    })
  ]
}
