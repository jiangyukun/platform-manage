var path = require('path')
var webpack = require('webpack')

module.exports = {
  // devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './boot/index.js'
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
    publicPath: 'http://localhost:3000/static/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"inline"'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {test: /\.js$/, loaders: ['react-hot-loader', 'babel-loader'], exclude: /node_modules/, include: __dirname},
      {test: /\.less$/, loaders: ['style-loader', 'css-loader', 'less-loader']},
      {test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader']},
      {test: /\.(jpg|png)$/, loader: "url-loader?limit=8192"}
    ]
  }
}
