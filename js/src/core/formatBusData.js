/**
 * Created by jiangyukun on 2016/11/29.
 */
import constants from './constants'

function _unKnowData(value) {
  if (!value) return '未知'
  return '错误数据'
}

export function getVisitCardState(state) {
  if (!state) {
    return '未知'
  } else if (state == '1') {
    return '是'
  } else if (state == '2') {
    return '否'
  } else if (state == '3') {
    return '未知'
  }
  return _unKnowData()
}

export function getYesOrNoText(flag, defaultValue) {
  if (flag == '0') {
    return '否'
  }
  if (flag == '1') {
    return '是'
  }
  return defaultValue || _unKnowData()
}

export function isCompleteVisit(state) {
  if (state == '1') {
    return '是'
  } else if (state == '0') {
    return '否'
  } else if (state == '2') {
    return '未联系'
  }
  return _unKnowData()
}

export function getAuditStatus(value) {
  if (constants.auditingState.auditing == value) {
    return '审核中'
  } else if (constants.auditingState.auditingPass == value) {
    return '审核通过'
  } else if (constants.auditingState.auditingUnPass == value) {
    return '审核不通过'
  }
  return _unKnowData(value)
}

export function isVisitDoctor(value) {
  if (!value) {
    return '否'
  } else if (value == '1') {
    return '否'
  } else if (value == '2') {
    return '是'
  }
  return _unKnowData()
}

export function getUserType(value) {
  if (!value) {
    return '未知'
  } else if (value == constants.userType.patient) {
    return '患者'
  } else if (value == constants.userType.doctor) {
    return '医生'
  }
  return _unKnowData()
}