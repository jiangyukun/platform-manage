var path = require('path')
var webpack = require('webpack')

module.exports = {
  // devtool: 'cheap-module-eval-source-map',
  entry: [
    './js/src/boot/index.js'
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 3000
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/static/',
    chunkFilename: '[name].[chunkhash:5].chunk.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"inline"'
    })
  ],
  module: {
    loaders: [
      {test: /\.js$/, loaders: ['react-hot-loader', 'babel-loader'], exclude: /node_modules/, include: __dirname},
      {test: /\.less$/, loaders: ['style-loader', 'css-loader', 'less-loader']},
      {test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader']},
      {test: /\.(jpg|png)$/, loader: "url-loader?limit=8192"},
      {test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/, loader: "file-loader"}
    ]
  }
}
