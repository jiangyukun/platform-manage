var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.dev')
var bodyParser = require('body-parser')

var express = require('express')

var configController = require('./z-controller')

var app = new express()
var port = 3000

var compiler = webpack(config)
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json({limit: '1mb'}))
app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}))
app.use(webpackHotMiddleware(compiler))

app.use(express.static('./'))

function toIndex(req, res) {
    res.sendFile(__dirname + '/index.html')
}

app.get('/dev/node-auditing', toIndex)
app.get('/dev/laboratory-sheet', toIndex)
app.get('/dev/patient-situation-statistics', toIndex)
app.get('/dev/hospital-manage', toIndex)
app.get('/dev/patient-edit', toIndex)
app.get('/dev/doctor-auditing', toIndex)


configController(app)

app.listen(port, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
})
