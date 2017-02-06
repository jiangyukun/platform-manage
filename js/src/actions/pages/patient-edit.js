/**
 * Created by jiangyukun on 2016/11/30.
 */
import {GET, POST} from '../../services/http'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'

//获取分页列表
export let fetchPatientPaginateList = dispatch => option => {
  dispatch({
    type: types.FETCH_PATIENT_PAGINATE_LIST + phase.START
  })
  return new Promise((resolve, reject) => {
    POST('/web/getPatientInfos', {body: option}).then((patientListInfo) => {
      const total = patientListInfo['totalCount'] || 0
      const list = patientListInfo['list'] || []
      dispatch({
        type: types.FETCH_PATIENT_PAGINATE_LIST + phase.SUCCESS, total, list
      })
      resolve()
    }, err => reject(err))
  })
}
