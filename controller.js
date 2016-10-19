var fetchDoctorList = require('./controller/fetchDoctorList')
var fetchPatientList = require('./controller/fetchPatientList')

module.exports = function configController(app) {

    app.get("/", function (req, res) {
        res.sendFile(__dirname + '/index.html')
    })

    fetchDoctorList(app)
    fetchPatientList(app)
}