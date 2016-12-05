/**
 * Created by jiangyukun on 2016/10/19.
 */

var fs = require('fs')
var nodeAuditingList = ''

fs.readFile('z-controller/node-auditing.json', function (err, data) {
    nodeAuditingList = data.toString()
})

module.exports = function (app) {
    app.post('/web/patient/check/list/', function (req, res) {
        var start = req.body.start;
        var length = req.body.length;
        res.json(JSON.parse(nodeAuditingList))

    })

}
