/**
 * Created by jiangyukun on 2017/2/21.
 */
import {_post} from '../../services/http'
import * as types from '../../constants/ActionTypes'
import {THREE_PHASE} from '../../middleware/request_3_phase'

export function fetchList(option) {
  return {
    [THREE_PHASE]: {
      type: types.enrollment.FETCH_LIST,
      http: () => _post('/webGroupStatement/getGroupStatement', {body: option}),
      handleResponse: response => ({total: response['count'], list: response['groupStatementList']})
    }
  }
}
