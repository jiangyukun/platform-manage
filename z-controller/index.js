var fetchDoctorList = require('./fetchDoctorList')
var fetchPatientList = require('./fetchPatientList')
var message = require('./message')
var patientSituation = require('./pages/statistics/patientSituation')


module.exports = function configController(app) {
    app.get("/", function (req, res) {
        res.sendFile(__dirname + '/index.html')
    })

    fetchDoctorList(app)
    fetchPatientList(app)
    message(app)
    patientSituation(app)
}
