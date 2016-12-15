var fetchDoctorList = require('./fetchDoctorList')
var fetchPatientList = require('./fetchPatientList')
var message = require('./message')
var hospitals = require('./hospitals')
var provinces = require('./provinces')
var hospitalManageList = require('./pages/hospital-manage/hospitalList')
var fetchHospitalInfo = require('./pages/hospital-manage/fetchHospitalInfo')
var patientSituation = require('./pages/statistics/patientSituation')
var fetchLaboratorySheet = require('./pages/laboratory-sheet/fetchLaboratorySheet')


module.exports = function configController(app) {
    app.get("/", function (req, res) {
        res.sendFile(__dirname + '/index.html')
    })

    fetchDoctorList(app)
    fetchPatientList(app)
    message(app)
    hospitals(app)
    provinces(app)
    hospitalManageList(app)
    fetchHospitalInfo(app)
    patientSituation(app)
    fetchLaboratorySheet(app)
}
