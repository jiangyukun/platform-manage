/**
 * Created by jiangyu2016 on 2016/12/15.
 */

var fs = require('fs')
var result = ''

module.exports = function (app) {
  app.get('/webBackend/getBackendUserPermissionPage', function (req, res) {

    fs.readFile(__dirname + '/authority.json', function (err, data) {
      result = data.toString()
      res.json(JSON.parse(result))
    })


  })

}
