/**
 * Created by jiangyukun on 2017/3/31.
 */
import {_post} from '../../services/http'
import {patientRecordInfo} from '../../constants/ActionTypes'
import {THREE_PHASE} from '../../middleware/request_3_phase'

export function fetchList(option) {
  return {
    [THREE_PHASE]: {
      type: patientRecordInfo.FETCH_LIST,
      http: () => _post('/archives/v3/patient/input/info/list', {body: option}),
      handleResponse: response => ({total: response['totalCount'], list: response['patientInputInfoList']})
    }
  }
}

export function fetchRecordTypeInfo(userId, extendId, recordType) {
  return {
    [THREE_PHASE]: {
      type: patientRecordInfo.FETCH_RECORD_TYPE_INFO,
      http: () => _post(`/archives/v3/patient/input/info/detail/${userId}/${extendId}/${recordType}`),
      handleResponse: response => ({total: response['totalCount'], list: response['patientInputInfoList']})
    }
  }
}

export function updateRemark(extendId, recordType, newRemark) {
  return {
    [THREE_PHASE]: {
      type: patientRecordInfo.UPDATE_REMARK,
      http: state => _post(`/archives/v3/patient/input/remark/edit/${extendId}/${recordType}`, {type: 'text', body: {"remark": newRemark}}),
      handleResponse: response => ({id, newRemark})
    }
  }
}
