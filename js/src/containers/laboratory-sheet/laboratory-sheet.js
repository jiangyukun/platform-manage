/**
 * Created by jiangyukun on 2016/12/15.
 */
import {GET, POST, PUT} from '../../services/http'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'

export let fetchLaboratorySheetList = dispatch => options => {
  return new Promise((resolve, reject) => {
    POST('/archives/assay/queryAssayList', {body: options}).then(result => {
      let {totalCount, list} = result
      dispatch({
        type: types.FETCH_LABORATORY_SHEET_LIST + phase.SUCCESS, totalCount, list
      })
      resolve()
    }, err => {
      dispatch({
        type: types.FETCH_LABORATORY_SHEET_LIST + phase.FAILURE, err
      })
      reject(err)
    })
  })
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


export let markSheetItem = dispatch => (sheetId, type) => {
  return new Promise((resolve, reject) => {
    PUT(`/archives/assay/updateAssayPicture/${sheetId}/${type}`).then(result => {
      dispatch({
        type: types.MARK_SHEET_ITEM + phase.SUCCESS
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
