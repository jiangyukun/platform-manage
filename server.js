const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.dev')
const bodyParser = require('body-parser')

const express = require('express')

const configController = require('./z-controller')

const app = new express()
const port = 3000

const compiler = webpack(config)
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
app.get('/dev/take-medicine-record', toIndex)
app.get('/dev/out-patient-time', toIndex)
app.get('/dev/app-update', toIndex)
app.get('/dev/todo-work-track', toIndex)
app.get('/dev/smart-analytic-system', toIndex)


configController(app)

app.listen(port, function (error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
})
