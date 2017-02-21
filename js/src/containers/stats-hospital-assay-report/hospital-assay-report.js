/**
 * Created by jiangyukun on 2016/12/8.
 */
import {GET} from '../../services/http'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'

export let fetchHospitalAssayPaginateList = dispatch => pageInfo => {
  let {start, limit} = pageInfo
  dispatch({
    type: types.FETCH_HOSPITAL_ASSAY_REPORT_PAGINATE_LIST + phase.START
  })

  return new Promise((resolve, reject) => {
    GET(`/archives/getAssayByHospitalReport/${start}/${limit}`).then(result => {
      let total = result['totalCount']
      let list = result['list']
      dispatch({
        type: types.FETCH_HOSPITAL_ASSAY_REPORT_PAGINATE_LIST + phase.SUCCESS, total, list
      })
      resolve(result)
    }, err => {
      reject(err)
    })
  })
}

export let fetchHistoryAssayReportList = dispatch => () => {
  dispatch({
    type: types.FETCH_HISTORY_ASSAY_REPORT_LIST + phase.START
  })

  return new Promise((resolve, reject) => {
    GET(`/archives/getFileDowloadUrl`).then(result => {
      dispatch({
        type: types.FETCH_HISTORY_ASSAY_REPORT_LIST + phase.SUCCESS
      })
      resolve(result)
    }, err => {
      reject(err)
    })
  })
}
