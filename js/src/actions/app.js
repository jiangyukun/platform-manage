/**
 * Created by jiangyukun on 2016/11/29.
 */
import * as types from '../constants/ActionTypes'

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
