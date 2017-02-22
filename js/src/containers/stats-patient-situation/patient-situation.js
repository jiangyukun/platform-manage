/**
 * Created by jiangyukun on 2016/12/8.
 */
import {GET} from '../../services/http'
import * as types from '../../constants/ActionTypes'
import {THREE_PHASE} from '../../middleware/request_3_phase'

export function fetchPatientSituationList(pageInfo) {
  let {start, limit} = pageInfo
  return {
    [THREE_PHASE]: {
      type: types.FETCH_PATIENT_SITUATION_LIST,
      http: () => GET(`/patientReport/getPatientInfoReport/${start}/${limit}`),
      handleResponse: response => ({list: response['list'], total: response['totalCount']})
    }
  }
}
