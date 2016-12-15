/**
 * Created by jiangyu2016 on 2016/12/15.
 */

var fs = require('fs')
var result = ''

fs.readFile('z-controller/pages/laboratory-sheet/fetch-laboratory-sheet.json', function (err, data) {
    result = data.toString()
})

module.exports = function (app) {
    app.post('/archives/assay/queryAssayList', function (req, res) {


        res.json(JSON.parse(result))
    })

}
