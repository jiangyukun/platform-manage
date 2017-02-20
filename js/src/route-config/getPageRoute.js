/**
 * Created by jiangyukun on 2016/12/29.
 */
import React from 'react'
import {Route} from 'react-router'

import PlatformApp from '../containers/PlatformApp'

import NodeAuditing from '../containers/pages/node-auditing/NodeAuditing'
import PatientEdit from '../containers/pages/patient-edit/PatientEdit'
import LaboratorySheet from '../containers/pages/laboratory-sheet/LaboratorySheet'
import TakeMedicineRecord from '../containers/pages/take-medicine-record/TakeMedicineRecord'

import DoctorAuditing from '../containers/pages/doctor-auditing/DoctorAuditing'
import HospitalManage from '../containers/pages/hospital-manage/HospitalManage'
import OutPatientTime from '../containers/pages/out-patient-time/OutPatientTime'
import TodoWorkTrack from '../containers/pages/todo-work-track/TodoWorkTrack'

import AppUpdate from '../containers/pages/app-update/AppUpdate'

import PatientSituationStatistics from '../containers/pages/statistics/patient-situation/PatientSituationStatistics'
import HospitalAssayReport from '../containers/pages/statistics/hospital-assay-report/HospitalAssayReport'
import DoctorComprehensiveScore from '../containers/pages/statistics/doctor-comprehensive-score/DoctorComprehensiveScore'
import EnrollmentSituationStatistics from '../containers/pages/statistics/enrollment-situation/EnrollmentSituationStatistics'

import SmsManage from '../containers/pages/sms-manage/SmsManage'

export default function getPageRoute(path) {
  return (
    <Route path={path} component={PlatformApp}>
      <Route path="node-auditing" component={NodeAuditing}/>
      <Route path="patient-edit" component={PatientEdit}/>
      <Route path="laboratory-sheet" component={LaboratorySheet}/>
      <Route path="take-medicine-record" component={TakeMedicineRecord}/>

      <Route path="doctor-auditing" component={DoctorAuditing}/>
      <Route path="hospital-manage" component={HospitalManage}/>
      <Route path="out-patient-time" component={OutPatientTime}/>
      <Route path="todo-work-track" component={TodoWorkTrack}/>

      <Route path="app-update" component={AppUpdate}/>

      <Route path="hospital-assay-report" component={HospitalAssayReport}/>
      <Route path="patient-situation-statistics" component={PatientSituationStatistics}/>
      <Route path="doctor-comprehensive-score" component={DoctorComprehensiveScore}/>
      <Route path="enrollment-situation" component={EnrollmentSituationStatistics}/>

      <Route path="sms-manage" component={SmsManage}/>
    </Route>
  )
}
