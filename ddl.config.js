/**
 * 将类库代码单独打包
 * Created by jiangyukun on 2016/12/9.
 */
const webpack = require('webpack');
process.env.NODE_ENV = 'production'

const vendors = [
    "antd/lib/notification",
    "antd/lib/date-picker",
    "antd/lib/modal",
    "antd/lib/menu",

    'antd/lib/style/index.less',
    'antd/lib/button/style/index.less',
    'antd/lib/modal/style/index.less',
    'antd/lib/notification/style/index.less',
    'antd/lib/date-picker/style/index.less',
    'antd/lib/upload/style/index.less',
    'antd/lib/tooltip/style/index.less',

    "babel-polyfill",
    "classnames",
    "dom-helpers",
    "history",
    "immutable",
    "lodash",
    "moment",
    "react",
    "react-addons-css-transition-group",
    "react-bootstrap",
    "react-dom",
    "react-overlays",
    "react-redux",
    "react-router",
    "react-router-redux",
    "redux",
    "redux-logger",
    "redux-thunk"
];

module.exports = {
    output: {
        path: 'build',
        filename: 'lib.min.js',
        library: '[name]',
    },
    entry: {
        "lib": vendors,
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
        new webpack.optimize.OccurenceOrderPlugin(),
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
