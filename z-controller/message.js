/**
 * Created by jiangyukun on 2016/10/19.
 */
var fs = require('fs')
var result = ''

fs.readFile('z-controller/message.json', function (err, data) {
    result = data.toString()
})

module.exports = function (app) {
    app.get('/archives/assay/assayNote/:start/:length/', function (req, res) {
        res.json(JSON.parse(result))
    })

}
