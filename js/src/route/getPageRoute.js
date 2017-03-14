/**
 * Created by jiangyukun on 2016/12/29.
 */
import React from 'react'
import {Route} from 'react-router'

import PlatformApp from '../containers/PlatformApp'
import IndexPage from '../containers/IndexPage'
import IllegalAuthority from '../containers/IllegalAuthority'

import NodeAuditing from '../containers/node-auditing/NodeAuditing'
import PatientEdit from '../containers/patient-edit/PatientEdit'
import LaboratorySheet from '../containers/laboratory-sheet/LaboratorySheet'
import TakeMedicineRecord from '../containers/take-medicine-record/TakeMedicineRecord'

import DoctorAuditing from '../containers/doctor-auditing/DoctorAuditing'
import HospitalManage from '../containers/hospital-manage/HospitalManage'
import OutPatientTime from '../containers/out-patient-time/OutPatientTime'
import TodoWorkTrack from '../containers/todo-work-track/TodoWorkTrack'

import AppUpdate from '../containers/app-update/AppUpdate'

import PatientSituationStatistics from '../containers/stats-patient-situation/PatientSituationStatistics'
import HospitalAssayReport from '../containers/stats-hospital-assay-report/HospitalAssayReport'
import DoctorComprehensiveScore from '../containers/stats-doctor-comprehensive-score/DoctorComprehensiveScore'
import EnrollmentSituationStatistics from '../containers/stats-enrollment-situation/EnrollmentSituationStatistics'
import OnlineDoctorStatistics from '../containers/stats-online-doctor/OnlineDoctorStatistics'
import HistoryMessageStatistics from '../containers/stats-history-message/HistoryMessageStatistics'
import SmartAnalyticSystem from '../containers/smart-analytic-system/SmartAnalyticSystem'

import SmsManage from '../containers/sms-manage/SmsManage'
import ConsoleAccountManage from '../containers/console-account-manage/ConsoleAccountManage'
import AuthorityRoleManage from '../containers/authority-role-manage/AuthorityRoleManage'

export default function getPageRoute(path, pageList) {
  const mapper = {
    "node-auditing": NodeAuditing,
    "patient-edit": PatientEdit,
    "laboratory-sheet": LaboratorySheet,
    "take-medicine-record": TakeMedicineRecord,

    "doctor-auditing": DoctorAuditing,
    "hospital-manage": HospitalManage,
    "out-patient-time": OutPatientTime,
    "todo-work-track": TodoWorkTrack,

    "smart-analytic-system": SmartAnalyticSystem,
    "app-update": AppUpdate,

    "hospital-assay-report": HospitalAssayReport,
    "patient-situation-statistics": PatientSituationStatistics,
    "doctor-comprehensive-score": DoctorComprehensiveScore,
    "enrollment-situation": EnrollmentSituationStatistics,
    "online-doctor": OnlineDoctorStatistics,
    "history-message": HistoryMessageStatistics,

    "sms-manage": SmsManage,
    "console-account-manage": ConsoleAccountManage,
    "authority-role-manage": AuthorityRoleManage,
  }

  return (
    <Route path={path} component={PlatformApp}>
      <Route path="index" component={IndexPage}/>
      {
        pageList.map(page => {
          const pageName = page['page_Name']
          return (
            <Route key={pageName} path={pageName} component={mapper[pageName]}/>
          )
        })
      }
      <Route path=":pathname" component={IllegalAuthority}/>
    </Route>
  )
}
