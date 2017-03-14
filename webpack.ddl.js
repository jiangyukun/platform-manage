/**
 * 将类库代码单独打包
 * Created by jiangyukun on 2016/12/9.
 */
const webpack = require('webpack')
const moment = require('moment')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
process.env.NODE_ENV = 'production'

const vendors = [
  "antd/lib/notification",
  "antd/lib/date-picker",
  "antd/lib/modal",
  "antd/lib/menu",
  "antd/lib/icon",
  "antd/lib/button",
  "antd/lib/tooltip",
  "antd/lib/upload",
  "antd/lib/Radio",
  "antd/lib/Checkbox",

  "babel-polyfill",
  "classnames",
  "dom-helpers",
  "history",
  "immutable",
  "lodash",
  "moment",
  "react",
  "react-addons-css-transition-group",
  "react-bootstrap/lib/Dropdown",
  "react-bootstrap/lib/MenuItem",
  "react-bootstrap/lib/Modal",
  "react-bootstrap/lib/Tabs",
  "react-bootstrap/lib/Tab",
  "react-dom",
  "react-overlays",
  "react-redux",
  "react-router",
  "react-router-redux",
  "redux",
  "redux-thunk"
];

module.exports = {
  output: {
    path: 'build',
    filename: 'lib-' + moment().format('MMDD') + '.min.js',
    library: '[name]',
  },
  entry: {
    "lib": vendors,
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
    new ExtractTextPlugin('common-' + moment().format('MMDD') + '.css'),
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DllPlugin({
      path: 'manifest.json',
      name: '[name]',
      context: __dirname,
    }),
  ],
};
