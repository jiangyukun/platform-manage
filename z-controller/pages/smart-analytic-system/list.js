/**
 * Created by jiangyu2016 on 2016/12/15.
 */

var fs = require('fs')
var result = ''

module.exports = function (app) {
  app.post('/archives/analysis/system/list', function (req, res) {


    fs.readFile(__dirname + '/list.json', function (err, data) {
      result = data.toString()
      res.json(JSON.parse(result))
    })


  })

}
