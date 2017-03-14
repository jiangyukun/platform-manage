/**
 * Created by jiangyukun on 2017/3/14.
 */
import {getPath} from '../core/utils'

const nodeAuditing = getPath('node-auditing') // 节点审核
const patientEdit = getPath('patient-edit') // 病人编辑
const laboratorySheet = getPath('laboratory-sheet') // 化验单查看
const takeMedicineRecord = getPath('take-medicine-record') // 服药记录

const doctorAuditing = getPath('doctor-auditing') // 医生审核
const outPatientTime = getPath('out-patient-time') // 医生门诊时间
const todoWorkTrack = getPath('todo-work-track') // 医生门诊时间
const hospitalManage = getPath('hospital-manage') // 医院管理

const smartAnalyticSystem = getPath('smart-analytic-system') // 智能分析系统
const appUpdate = getPath('app-update') // APP更新

const patientSituationStatistics = getPath('patient-situation-statistics') //病人情况统计
const hospitalAssayReport = getPath('hospital-assay-report') // 中心验单情况表
const doctorComprehensiveScore = getPath('doctor-comprehensive-score') // 医生综合评分
const enrollmentSituation = getPath('enrollment-situation') // 入组情况统计
const onlineDoctor = getPath('online-doctor') // 在线医生评分
const historyMessage = getPath('history-message') // 历史记录报表

const smsManage = getPath('sms-manage') // 短信
const chatSystem = getPath('chat-system') // 聊天系统
const consoleAccountManage = getPath('console-account-manage') // 后台账号管理
const authorityRoleManage = getPath('authority-role-manage') // 权限分组管理

export const PATIENT_CATEGORY = '-PATIENT-'
export const DOCTOR_CATEGORY = '-DOCTOR-'
export const APP_CATEGORY = '-APP-'
export const STATISTICS_CATEGORY = '-STATISTICS-'
export const SYSTEM_CATEGORY = '-SYSTEM-'

export const pageCategoryMapper = {
  'node-auditing': PATIENT_CATEGORY,
  'patient-edit': PATIENT_CATEGORY,
  'laboratory-sheet': PATIENT_CATEGORY,
  'take-medicine-record': PATIENT_CATEGORY,

  'doctor-auditing': DOCTOR_CATEGORY,
  'out-patient-time': DOCTOR_CATEGORY,
  'todo-work-track': DOCTOR_CATEGORY,
  'hospital-manage': DOCTOR_CATEGORY,

  'smart-analytic-system': APP_CATEGORY,
  'app-update': APP_CATEGORY,
  'slider-manage': APP_CATEGORY,
  'knowledge-base-manage': APP_CATEGORY,

  'patient-situation-statistics': STATISTICS_CATEGORY,
  'hospital-assay-report': STATISTICS_CATEGORY,
  'doctor-comprehensive-score': STATISTICS_CATEGORY,
  'enrollment-situation': STATISTICS_CATEGORY,
  'online-doctor': STATISTICS_CATEGORY,
  'history-message': STATISTICS_CATEGORY,

  'sms-manage': SYSTEM_CATEGORY,
  'chat-system': SYSTEM_CATEGORY,
  'console-account-manage': SYSTEM_CATEGORY,
  'authority-role-manage': SYSTEM_CATEGORY
}

export const pageInfo = {
  'node-auditing': {
    to: nodeAuditing,
    text: '病人审核'
  },
  'patient-edit': {
    to: patientEdit,
    text: '病人修改'
  },
  'laboratory-sheet': {
    to: laboratorySheet,
    text: '化验单查看'
  },
  'take-medicine-record': {
    to: takeMedicineRecord,
    text: '服药确认记录'
  },

  'doctor-auditing': {
    to: doctorAuditing,
    text: '医生管理'
  },
  'out-patient-time': {
    to: outPatientTime,
    text: '医生门诊时间'
  },
  'todo-work-track': {
    to: todoWorkTrack,
    text: '待办工作跟踪'
  },
  'hospital-manage': {
    to: hospitalManage,
    text: '医院管理'
  },

  'smart-analytic-system': {
    to: smartAnalyticSystem,
    text: '智能分析系统'
  },
  'app-update': {
    to: appUpdate,
    text: 'App更新'
  },
  'slider-manage': null,
  'knowledge-base-manage': null,

  'history-message': {
    to: historyMessage,
    text: '聊天记录报表'
  },
  'patient-situation-statistics': {
    to: patientSituationStatistics,
    text: '病人情况报表'
  },
  'hospital-assay-report': {
    to: hospitalAssayReport,
    text: '中心验单情况表'
  },
  'doctor-comprehensive-score': {
    to: doctorComprehensiveScore,
    text: '医生综合评分'
  },
  'enrollment-situation': {
    to: enrollmentSituation,
    text: '入组情况统计'
  },
  'online-doctor': {
    to: onlineDoctor,
    text: '在线医生评分'
  },

  'sms-manage': {
    to: smsManage,
    text: '短信系统'
  },
  'chat-system': null,
  'console-account-manage': {
    to: consoleAccountManage,
    text: '后台账号管理'
  },
  'authority-role-manage': {
    to: authorityRoleManage,
    text: '权限分组管理'
  }
}

export function getOpenMenu(currentPageName) {
  const openMenu = []
  switch (currentPageName) {
    case nodeAuditing:
    case patientEdit:
    case laboratorySheet:
    case takeMedicineRecord:
      openMenu.push(PATIENT_CATEGORY)
      break
    case doctorAuditing:
    case hospitalManage:
    case todoWorkTrack:
    case outPatientTime:
      openMenu.push(DOCTOR_CATEGORY)
      break
    case appUpdate:
    case smartAnalyticSystem:
      openMenu.push(APP_CATEGORY)
      break
    case patientSituationStatistics:
    case hospitalAssayReport:
    case doctorComprehensiveScore:
    case enrollmentSituation:
    case onlineDoctor:
    case historyMessage:
      openMenu.push(STATISTICS_CATEGORY)
      break
    case smsManage:
    case consoleAccountManage:
    case authorityRoleManage:
      openMenu.push(SYSTEM_CATEGORY)
      break
  }
  return openMenu
}
