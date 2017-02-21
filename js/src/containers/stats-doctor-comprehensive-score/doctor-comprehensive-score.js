/**
 * Created by jiangyukun on 2016/12/29.
 */
import {POST} from '../../services/http'
import * as types from '../../constants/ActionTypes'
import {THREE_PHASE} from '../../middleware/request_3_phase'

export const fetchScoreList = option => {
  return {
    [THREE_PHASE]: {
      type: types.FETCH_DOCTOR_COMPREHENSIVE_SCORE_PAGINATE_LIST,
      http: state => POST('/doctorScore/getDoctorScoreList', {body: option}),
      handleResponse: response => ({list: response['list'], total: response['count']})
    }
  }
}

export const updateRemark = (doctorId, newRemark) => {
  return {
    [THREE_PHASE]: {
      type: types.UPDATE_DOCTOR_COMPREHENSIVE_SCORE_REMARK,
      http: state => POST(`/doctorScore/updateDoctorScoreRemark/${doctorId}`, {type: 'text', body: {"doctor_Score_Remark": newRemark}}),
      handleResponse: response => ({doctorId, newRemark})
    }
  }
}

export const fetchDoctorStatisticsList = (doctorId) => {
  return {
    [THREE_PHASE]: {
      type: types.FETCH_DOCTOR_STATISTICS_LIST,
      http: state => POST(`/doctorScore/getDoctorScoreDetails/${doctorId}`),
      handleResponse: response => ({list: response})
    }
  }
}

export function clearRemarkUpdated() {
  return {
    type: types.CLEAR_DOCTOR_COMPREHENSIVE_SCORE_REMARK
  }
}
