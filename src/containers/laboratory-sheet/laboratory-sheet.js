/**
 * Created by jiangyukun on 2016/12/15.
 */
import {GET, POST, PUT} from '../../services/http'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'
import {THREE_PHASE} from '../../middleware/request_3_phase'

export function fetchLaboratorySheetList(options) {
  return {
    [THREE_PHASE]: {
      type: types.FETCH_LABORATORY_SHEET_LIST,
      http: () => POST('/archives/assay/queryAssayList', {body: options}),
      handleResponse: response => ({total: response['totalCount'], list: response['list']})
    }
  }
}

export let fetchPictureUrlList = dispatch => (mobile, sheetType) => {
  return new Promise((resolve, reject) => {
    GET(`/archives/assay/queryAssayCountByType/${mobile}/${sheetType}`).then(sheetList => {
      dispatch({
        type: types.FETCH_PICTURE_URL_LIST + phase.SUCCESS, sheetList
      })
      resolve(sheetList)
    }, err => {
      dispatch({
        type: types.FETCH_PICTURE_URL_LIST + phase.FAILURE, err
      })
      reject(err)
    })
  })
}

export let markSheetItem = dispatch => (sheetId, newState) => {
  return new Promise((resolve, reject) => {
    PUT(`/archives/assay/updateAssayPicture/${sheetId}/${newState}`).then(result => {
      dispatch({
        type: types.MARK_SHEET_ITEM + phase.SUCCESS, sheetId, newState
      })
      resolve()
    }, err => {
      dispatch({
        type: types.MARK_SHEET_ITEM + phase.FAILURE, err
      })
      reject(err)
    })
  })
}

export function updateRemark(mobile, newRemark) {
  return {
    [THREE_PHASE]: {
      type: types.EDIT_LABORATORY_SHEET_REMARK,
      http: () => POST(`/archives/assay/updatePatientAssayRemark/${mobile}`, {type: 'text', body: {"patient_Assay_Remark": newRemark}}),
      handleResponse: response => ({mobile, newRemark})
    }
  }
}

export function clearRemark(mobile, newRemark) {
  return {
    type: types.CLEAR_LABORATORY_SHEET_REMARK
  }
}
