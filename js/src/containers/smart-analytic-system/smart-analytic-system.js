/**
 * Created by jiangyukun on 2016/12/29.
 */
import {_post} from '../../services/http'
import * as types from '../../constants/ActionTypes'
import {THREE_PHASE} from '../../middleware/request_3_phase'

export function fetchList(option) {
  return {
    [THREE_PHASE]: {
      type: types.smartAnalytic.FETCH_LIST,
      http: state => _post('/archives/analysis/system/list', {body: option}),
      handleResponse: response => ({list: response['analysisSystemList'], total: response['totalCount']})
    }
  }
}

export function addAnalyticItem(option) {
  return {
    [THREE_PHASE]: {
      type: types.smartAnalytic.ADD_ANALYTIC_ITEM,
      http: state => _post('/archives/analysis/system/add', {body: option}),
      handleResponse: response => ({list: response['analysisSystemList'], total: response['totalCount']})
    }
  }
}

export function clearRemark() {
  return {
    type: types.CLEAR_UPDATE_TODO_WORK_REMARK
  }
}

export const updateRemark = (doctorId, newRemark) => {
  return {
    [THREE_PHASE]: {
      type: types.UPDATE_TODO_WORK_REMARK,
      http: state => _post(`/doctorNeedTracking/updateDoctorNeedRemark/${doctorId}`, {type: 'text', body: {"doctor_Need_Remark": newRemark}}),
      handleResponse: response => ({doctorId, newRemark})
    }
  }
}
