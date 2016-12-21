const webpack = require('webpack')
const moment = require('moment')
process.env.NODE_ENV = 'production'

module.exports = {
    entry: [
        './boot/index.js'
    ],

    output: {
        path: 'D:/2016/project1/tigermed-app/backed-web/src/main/webapp/platform-new/build/',
        filename: 'bundle' + '.min.js',
        publicPath: 'build/'
    },

    module: {
        loaders: [
            {test: /\.js$/, loaders: ['babel'], exclude: /node_modules/, include: __dirname},
            // {test: /\.css/, loader: 'style!css'},
            {test: /\.less$/, loader: 'style!css!autoprefixer!less'},
            {test: /\.scss$/, exclude: /node_modules/, loader: 'style!css!autoprefixer!sass?sourceMap'},
            {test: /\.(jpg|png)$/, loader: "url?limit=8192"},
            {test: /\.svg$/, loader: "file"}
        ]
    },

    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.json'),
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
}
