/**
 * Created by jiangyukun on 2016/12/8.
 */

var fs = require('fs')
var nodeAuditingList = ''

fs.readFile('z-controller/pages/statistics/patient-situation.json', function (err, data) {
    nodeAuditingList = data.toString()
})

module.exports = function (app) {
    app.get('/patientReport/getPatientInfoReport/:start/:length', function (req, res) {
        var start = req.body.start;
        var length = req.body.length;
        res.json(JSON.parse(nodeAuditingList))

    })

}
