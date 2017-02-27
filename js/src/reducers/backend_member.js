/**
 * Created by jiangyukun on 2017/01/13.
 */
import {fromJS} from 'immutable'
import * as types from '../constants/ActionTypes'
import * as phase from '../constants/PhaseConstant'

const defaultValue = []

export function backendMemberList(state = defaultValue, action) {
  const iState = fromJS(state)
  return nextState()

  function nextState() {
    let nextIState = iState
    switch (action.type) {

      case types.FETCH_BACKEND_MEMBER_LIST + phase.SUCCESS:
        nextIState = fetchBackendMemberListSuccess()
        break
    }
    if (nextIState == iState) {
      return state
    }
    return nextIState.toJS()
  }

  //-----------------------------------------

  function fetchBackendMemberListSuccess() {
    let {backendMemberList} = action
    return fromJS(backendMemberList)
  }
}
