/**
 * Created by jiangyu2016 on 2016/12/8.
 */
var fs = require('fs')
var result = ''

fs.readFile('z-controller/pages/hospital-manage/fetch-hospital-info.json', function (err, data) {
    result = data.toString()
})

module.exports = function (app) {
    app.get('/web/getBackendHospitalList', function (req, res) {


        res.json(JSON.parse(result))
    })

}
