/**
 * Created by jiangyukun on 2016/11/30.
 */
import {_post, _patch} from '../../services/http'
import {patientEdit} from '../../constants/ActionTypes'
import {THREE_PHASE} from '../../middleware/request_3_phase'

export function fetchPatientPaginateList(option) {
  return {
    [THREE_PHASE]: {
      type: patientEdit.FETCH_LIST,
      http: () => _post('/web/getPatientInfos', {body: option}),
      handleResponse: response => ({total: response['totalCount'] || 0, list: response['list'] || []})
    }
  }
}

export function updateRemark(id, updateRemarkId, remarkType, remark) {
  return {
    [THREE_PHASE]: {
      type: patientEdit.UPDATE_REMARK,
      http: () => _post(`/web/updateRemark/${updateRemarkId}/${remarkType}?remark=${remark}`),
      handleResponse: response => ({id, remark})
    }
  }
}

export function clearRemarkUpdated() {
  return {
    type: patientEdit.CLEAR_REMARK_UPDATED
  }
}

export function deleteAccount(userId, reason) {
  return {
    [THREE_PHASE]: {
      type: patientEdit.DELETE_ACCOUNT,
      http: () => _post(`/web/deletePatientUser/${userId}`, {type: 'text', body: {'delete_Remark': reason}}),
    }
  }
}

export function clearDeleteAccount() {
  return {
    type: patientEdit.CLEAR_DELETE_ACCOUNT_SUCCESS
  }
}


export function undoDeleteAccount(userId) {
  return {
    [THREE_PHASE]: {
      type: patientEdit.UNDO_DELETE_ACCOUNT,
      http: () => _patch(`/web/updateDeleteRecordStatus/${userId}`),
    }
  }
}

export function clearUndoDeleteAccount() {
  return {
    type: patientEdit.CLEAR_UNDO_DELETE_ACCOUNT
  }
}
