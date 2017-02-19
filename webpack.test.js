const webpack = require('webpack')
const moment = require('moment')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

process.env.NODE_ENV = 'test'

module.exports = {
    entry: [
        './boot/index.js'
    ],

    output: {
        path: __dirname + '/build/',
        filename: '[name]-[hash].js',
        publicPath: 'build/'
    },

    module: {
        loaders: [
            {test: /\.js$/, loaders: ['babel'], exclude: /node_modules/, include: __dirname},
            // {test: /\.css/, loader: 'style!css'},
            {test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!less')},
            {test: /\.scss$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!sass')},
            {test: /\.(jpg|png)$/, loader: "url?limit=8192"},
            {test: /\.svg$/, loader: "file"}
        ]
    },

    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.json'),
        }),
        new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)}),
        new ExtractTextPlugin("styles.css")
    ]
}
