/**
 * Created by jiangyukun on 2016/12/8.
 */

var fs = require('fs')
var result = ''

fs.readFile('z-controller/pages/statistics/patient-situation.json', function (err, data) {
    result = data.toString()
})

module.exports = function (app) {
    app.get('/patientReport/getPatientInfoReport/:start/:length', function (req, res) {
        setTimeout(function () {
            res.json(JSON.parse(result))
        }, 1000)

    })
}
