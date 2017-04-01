/**
 * Created by jiangyukun on 2016/11/26.
 */
import {GET} from '../services/http'
import * as types from '../constants/ActionTypes'
import {THREE_PHASE} from '../middleware/request_3_phase'

export function fetchBackendMemberList() {
  return {
    [THREE_PHASE]: {
      type: types.FETCH_BACKEND_MEMBER_LIST,
      http: () => GET('/sms/allBackendUser'),
      handleResponse: response => ({
        backendMemberList: response.map(backendMember => {
          return {
            value: backendMember['id'],
            text: backendMember['userName']
          }
        })
      })
    }
  }
}
