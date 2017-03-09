const webpack = require('webpack')
const moment = require('moment')

process.env.NODE_ENV = 'production'

const list = [
  './css/font-awesome/scss/font-awesome.scss',
  './css/boostrap/bootstrap.less',
  './css/antd/style/index.less',
  './css/antd/radio/style/index.less',
  './css/antd/button/style/index.less',
  './css/antd/modal/style/index.less',
  './css/antd/notification/style/index.less',
  './css/antd/date-picker/style/index.less',
  './css/antd/menu/style/index.less',
  './css/antd/upload/style/index.less',
  './css/antd/tooltip/style/index.less',
  './css/scss/index.scss'
]

module.exports = {
  entry: list,

  output: {
    // path: 'D:/2017/company/app-parent/backed-web/src/main/webapp/platform-new/build/',
    path: 'C:/Users/jiangyukun/WebstormProjects/platform-manage/build/prod/css/',
    filename: 'style-' + moment().format('MMDD') + '.min.css',
    publicPath: ''
  },

  module: {
    loaders: [
      {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
      {test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'},
      {test: /\.(jpg|png)$/, loader: "url-loader?limit=8192"},
      {test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, loader: "file-loader"}
    ]
  },

  plugins: []
}
