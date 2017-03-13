/**
 * Created by jiangyu2016 on 16/10/15.
 */

import {combineReducers} from 'redux'

import * as app from './_app'
import * as message from './_message'
import * as hospital from './_hospital'
import * as hospitalManage from '../containers/hospital-manage/hospital_manage'
import * as patientEdit from '../containers/patient-edit/patient_edit'
import * as laboratorySheet from '../containers/laboratory-sheet/laboratory_sheet'
import * as doctorAuditing from '../containers/doctor-auditing/doctor_auditing'
import * as nodeAuditing from '../containers/node-auditing/node_auditing'
import * as appUpdate from '../containers/app-update/app_update'
import * as provinceList from './province_list'
import * as cityMapper from './city_mapper'
import * as positionList from './position_list'
import * as departmentList from './department_list'
import * as backendMember from './backend_member'
import * as smsTemplate from './sms_template'
import * as patientSituationStatistics from '../containers/stats-patient-situation/patient_situation'
import * as hospitalArrayReport from '../containers/stats-hospital-assay-report/hospital_assay_report'
import * as doctorComprehensiveScore from '../containers/stats-doctor-comprehensive-score/doctor_comprehensive_score'
import * as smsManage from '../containers/sms-manage/sms_manage'
import * as outPatientTime from '../containers/out-patient-time/out_patient_time'
import * as takeMedicineRecord from '../containers/take-medicine-record/take_medicine_record'
import * as todoWorkTrack from '../containers/todo-work-track/todo_work_track'
import * as enrollment from '../containers/stats-enrollment-situation/enrollment_situation'
import * as onlineDoctor from '../containers/stats-online-doctor/online_doctor'
import * as historyMessageSingle from '../containers/stats-history-message/history_message_single'
import * as historyMessageGroup from '../containers/stats-history-message/history_message_group'
import * as smartAnalytic from '../containers/smart-analytic-system/smart_analytic_system'
import * as consoleAccountManage from '../containers/console-account-manage/console_account_manage'
import * as authorityRoleManage from '../containers/authority-role-manage/authority_role_manage'

import {routerReducer as routing} from 'react-router-redux'

export default combineReducers({
  ...app,
  ...message,
  ...hospital,
  ...hospitalManage,
  ...patientEdit,
  ...laboratorySheet,
  ...doctorAuditing,
  ...nodeAuditing,
  ...app,
  ...appUpdate,
  ...provinceList,
  ...cityMapper,
  ...positionList,
  ...departmentList,
  ...backendMember,
  ...smsTemplate,
  ...patientSituationStatistics,
  ...hospitalArrayReport,
  ...doctorComprehensiveScore,
  ...smsManage,
  ...outPatientTime,
  ...takeMedicineRecord,
  ...todoWorkTrack,
  ...enrollment,
  ...onlineDoctor,
  ...historyMessageSingle,
  ...historyMessageGroup,
  ...smartAnalytic,
  ...consoleAccountManage,
  ...authorityRoleManage,
  routing
})
