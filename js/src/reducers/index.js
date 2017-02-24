/**
 * Created by jiangyu2016 on 16/10/15.
 */

import {combineReducers} from 'redux'

import * as app from './_app'
import * as message from './_message'
import * as hospital from './_hospital'
import * as hospitalManage from './pages/hospital_manage'
import * as patientEdit from './pages/patient_edit'
import * as laboratorySheet from '../containers/laboratory-sheet/laboratory_sheet'
import * as doctorAuditing from './pages/doctor_auditing'
import * as nodeAuditing from './pages/node_auditing'
import * as appUpdate from './pages/app_update'
import * as provinceList from './common/province_list'
import * as cityMapper from './common/city_mapper'
import * as positionList from './common/position_list'
import * as departmentList from './common/department_list'
import * as backendMember from './common/backend_member'
import * as smsTemplate from './common/sms_template'
import * as patientSituationStatistics from './pages/statistics/patient_situation_statistics'
import * as hospitalArrayReport from './pages/statistics/hospital_assay_report'
import * as doctorComprehensiveScore from './pages/statistics/doctor_comprehensive_score'
import * as smsManage from './pages/sms_manage'
import * as outPatientTime from './pages/out_patient_time'
import * as takeMedicineRecord from './pages/take_medicine_record'
import * as todoWorkTrack from './pages/todo_work_track'
import * as enrollment from '../containers/stats-enrollment-situation/enrollment_situation'
import * as onlineDoctor from '../containers/stats-online-doctor/online_doctor'
import * as historyMessageSingle from '../containers/stats-history-message/history_message_single'
import * as historyMessageGroup from '../containers/stats-history-message/history_message_group'

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
  routing
})
