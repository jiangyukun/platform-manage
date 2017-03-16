/**
 * Created by jiangyukun on 2016/12/29.
 */
import React from 'react'
import {Route} from 'react-router'

import getAuthority from './getAuthority'
import {appPageNames} from '../constants/nav'

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
  const {
    nodeAuditing, patientEdit, laboratorySheet, takeMedicineRecord,
    doctorAuditing, hospitalManage, outPatientTime, todoWorkTrack,
    smartAnalyticSystem, appUpdate,
    historyMessage, hospitalAssayReport, patientSituationStatistics, doctorComprehensiveScore, enrollmentSituation, onlineDoctor,
    smsManage, consoleAccountManage, authorityRoleManage,
  } = appPageNames
  const mapper = {
    [nodeAuditing]: getAuthority(pageList, nodeAuditing, NodeAuditing),
    [patientEdit]: getAuthority(pageList, patientEdit, PatientEdit),
    [laboratorySheet]: getAuthority(pageList, laboratorySheet, LaboratorySheet),
    [takeMedicineRecord]: getAuthority(pageList, takeMedicineRecord, TakeMedicineRecord),

    [doctorAuditing]: getAuthority(pageList, doctorAuditing, DoctorAuditing),
    [hospitalManage]: getAuthority(pageList, hospitalManage, HospitalManage),
    [outPatientTime]: getAuthority(pageList, outPatientTime, OutPatientTime),
    [todoWorkTrack]: getAuthority(pageList, todoWorkTrack, TodoWorkTrack),

    [smartAnalyticSystem]: getAuthority(pageList, smartAnalyticSystem, SmartAnalyticSystem),
    [appUpdate]: getAuthority(pageList, appUpdate, AppUpdate),

    [historyMessage]: getAuthority(pageList, historyMessage, HistoryMessageStatistics),
    [hospitalAssayReport]: getAuthority(pageList, hospitalAssayReport, HospitalAssayReport),
    [patientSituationStatistics]: getAuthority(pageList, patientSituationStatistics, PatientSituationStatistics),
    [doctorComprehensiveScore]: getAuthority(pageList, doctorComprehensiveScore, DoctorComprehensiveScore),
    [enrollmentSituation]: getAuthority(pageList, enrollmentSituation, EnrollmentSituationStatistics),
    [onlineDoctor]: getAuthority(pageList, onlineDoctor, OnlineDoctorStatistics),

    [smsManage]: getAuthority(pageList, smsManage, SmsManage),
    [consoleAccountManage]: getAuthority(pageList, consoleAccountManage, ConsoleAccountManage),
    [authorityRoleManage]: getAuthority(pageList, authorityRoleManage, AuthorityRoleManage),
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
