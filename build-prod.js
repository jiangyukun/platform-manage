const path = require('path')
const fs = require('fs')
const exec = require('child_process').exec
const webpack = require('webpack')
const config = require('./webpack.prod')
const stat = fs.stat

const prodPath = path.join(path.join(__dirname, 'build'), 'prod')
const distPath = 'D:/2017/company/app-parent/backed-web/src/main/webapp/platform-new/build/'
const deleteSrcDir = 'rd /s/q "' + prodPath + '"'
const deleteDistDir = 'rd /s/q "' + distPath + '"'
exec(deleteSrcDir, function (err) {
  if (err) {
    console.log(err)
  }
})
/*exec(deleteDistDir, function (err) {
  if (err) {
    console.log(err)
  }
  fs.mkdirSync(distPath)
})*/

let compile = webpack(config)
compile.run(function () {

  fs.readdir(prodPath, function (err, paths) {
    if (err) {
      console.log(err)
    }
    paths.forEach(function (filePath) {
      const fileCompletePath = path.join(prodPath, filePath)
      stat(fileCompletePath, function (err, st) {
        if (st.isFile()) {
          let readable = fs.createReadStream(fileCompletePath)
          let writable = fs.createWriteStream(distPath + filePath)
          readable.pipe(writable)
        }
      })
    })
  })

})

