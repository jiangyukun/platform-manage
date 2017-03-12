const fetchDoctorList = require('./fetchDoctorList')
const fetchPatientList = require('./fetchPatientList')
const message = require('./message')
const hospitals = require('./hospitals')
const provinces = require('./provinces')
const hospitalManageList = require('./pages/hospital-manage/hospitalList')
const fetchHospitalInfo = require('./pages/hospital-manage/fetchHospitalInfo')
const patientSituation = require('./pages/statistics/patientSituation')
const fetchLaboratorySheet = require('./pages/laboratory-sheet/fetchLaboratorySheet')
const smartAnalyticSystem = require('./pages/smart-analytic-system/list')


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
  smartAnalyticSystem(app)
}
