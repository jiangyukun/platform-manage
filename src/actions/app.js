/**
 * Created by jiangyukun on 2016/11/29.
 */
import {_get} from '../services/http'
import * as types from '../constants/ActionTypes'
import {THREE_PHASE} from '../middleware/request_3_phase'

export function deleteErr(errId) {
  return {
    type: types.DELETE_ERROR, errId
  }
}

export function setLaboratorySheetNeedRefresh() {
  return {
    type: types.REFRESH_LABORATORY_SHEET
  }
}

export function clearLaboratorySheetNeedRefresh() {
  return {
    type: types.CLEAR_REFRESH_LABORATORY_SHEET
  }
}

export function clearPasswordUpdateSuccess() {
  return {
    type: types.CLEAR_PASSWORD_UPDATE_SUCCESS
  }
}

export function changePassword(currentPassword, newPassword) {
  return {
    [THREE_PHASE]: {
      type: types.CHANGE_PASSWORD,
      http: () => _get(`/webBackend/updateBackendUserPassword/${currentPassword}/${newPassword}`),
      handleResponse: response => ({})
    }
  }
}

export function logout() {
  return {
    [THREE_PHASE]: {
      type: types.LOGOUT,
      http: () => _get(`/webBackend/logout`),
      handleResponse: response => ({})
    }
  }
}
