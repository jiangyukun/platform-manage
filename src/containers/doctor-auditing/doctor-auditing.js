/**
 * Created by jiangyukun on 2016/11/30.
 */
import {_post, _put, _patch} from '../../services/http'
import {doctorAuditing} from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'
import {THREE_PHASE} from '../../middleware/request_3_phase'
import constants from '../../core/constants'

export let fetchDoctorPaginateList = dispatch => option => {
  dispatch({
    type: doctorAuditing.FETCH_LIST + phase.START
  })
  return new Promise((resolve, reject) => {
    _post('/web/getDoctorInfos', {body: option}).then((doctorListInfo) => {
      const total = doctorListInfo['totalCount'] || 0
      const list = doctorListInfo['list'] || []
      dispatch({
        type: doctorAuditing.FETCH_LIST + phase.SUCCESS, total, list
      })
      resolve()
    }, err => reject(err))
  })
}

export let updateDoctorAuditingState = dispatch => (doctorId, newAuditingState) => {
  dispatch({
    type: doctorAuditing.UPDATE_AUDITING_STATUS + phase.START
  })
  return new Promise((resolve, reject) => {
    _put(`/web/checkedDoctorInfo/${doctorId}/${newAuditingState}`).then(() => {
      dispatch({
        type: doctorAuditing.UPDATE_AUDITING_STATUS + phase.SUCCESS, doctorId, newAuditingState
      })
      resolve()
    }, err => reject(err))
  })
}

export let updateDoctorInfo = dispatch => (option, option1) => {
  return new Promise((resolve, reject) => {
    _patch(`/web/updateDoctorInfo`, {body: option}).then(() => {
      dispatch({
        type: doctorAuditing.UPDATE_DOCTOR_INFO + phase.SUCCESS, option, option1
      })
      resolve()
    }, err => reject(err))
  })
}

export let addNewDoctor = dispatch => option => {
  return new Promise((resolve, reject) => {
    _post(`/web/addDoctorInfo`, {body: option}).then(() => {
      dispatch({
        type: doctorAuditing.ADD_DOCTOR + phase.SUCCESS, option
      })
      resolve()
    }, err => reject(err))
  })
}

export function updateDoctorAuditingStatus(mobile, newStatus) {
  return {
    [THREE_PHASE]: {
      type: doctorAuditing.UPDATE_VISIT_STATUS,
      http: () => _patch(`/web/updateDoctorVisitInfo/${mobile}/${newStatus}`),
      handleResponse: () => ({mobile, newStatus})
    }
  }
}

export function clearVisitStatusUpdateSuccess() {
  return {
    type: doctorAuditing.CLEAR_VISIT_STATUS
  }
}

export function updateRemark(userId, remark) {
  const remarkType = constants.remarkFlag.DOCTOR_AUDITING
  return {
    [THREE_PHASE]: {
      type: doctorAuditing.UPDATE_REMARK,
      http: () => _post(`/web/updateRemark/${userId}/${remarkType}?remark=${remark}`),
      handleResponse: () => ({userId, remark})
    }
  }
}

export function clearRemarkUpdated() {
  return {
    type: doctorAuditing.CLEAR_UPDATE_REMARK
  }
}
