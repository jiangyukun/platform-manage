/**
 * Created by jiangyukun on 2016/11/26.
 */
import {GET} from '../services/http'
import * as types from '../constants/ActionTypes'
import * as phase from '../constants/PhaseConstant'

export let fetchBackendMemberList = dispatch => () => {
  GET('/sms/allBackendUser').then(backendMemberList => {
    backendMemberList = backendMemberList.map(backendMember => {
      return {
        value: backendMember['id'],
        text: backendMember['userName']
      }
    })
    dispatch({
      type: types.FETCH_BACKEND_MEMBER_LIST + phase.SUCCESS, backendMemberList
    })
  })
}
