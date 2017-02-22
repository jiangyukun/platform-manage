/**
 * Created by jiangyukun on 2016/12/29.
 */
import {_post} from '../../services/http'
import * as types from '../../constants/ActionTypes'
import {THREE_PHASE} from '../../middleware/request_3_phase'

export const fetchTodoWorkList = option => {
  return {
    [THREE_PHASE]: {
      type: types.FETCH_TODO_WORK_PAGINATE_LIST,
      http: state => _post('/doctorNeedTracking/getDoctorNeedList', {body: option}),
      handleResponse: response => ({list: response['list'], total: response['count']})
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
