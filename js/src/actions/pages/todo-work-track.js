/**
 * Created by jiangyukun on 2016/12/29.
 */
import {POST} from '../../services/http'
import * as types from '../../constants/ActionTypes'
import {THREE_PHASE} from '../../middleware/request_3_phase'

export const fetchTodoWorkList = option => {
  return {
    [THREE_PHASE]: {
      type: types.FETCH_TODO_WORK_PAGINATE_LIST,
      http: state => POST('/take-medicine-record/getTakeMedicineRecordList', {body: option}),
      handleResponse: response => ({list: response['takeMedicineRecordList'], total: response['count']})
    }
  }
}

export function clearRemarkUpdated() {
  return {
    type: types.CLEAR_UPDATE_TODO_WORK_REMARK
  }
}

export const updateRemark = (userId, newRemark) => {
  return {
    [THREE_PHASE]: {
      type: types.UPDATE_TODO_WORK_REMARK,
      http: state => POST(`/take-medicine-record/updateTakeMedicineRemark/${userId}`, {type: 'text', body: {"takeMedicine_Remark": newRemark}}),
      handleResponse: response => ({userId, newRemark})
    }
  }
}
