/**
 * Created by jiangyu2016 on 2016/12/8.
 */
var fs = require('fs')
var result = ''

fs.readFile('z-controller/hospitals.json', function (err, data) {
    result = data.toString()
})

module.exports = function (app) {
    app.get('/web/getHospitals', function (req, res) {
        res.json(JSON.parse(result))
    })

}
