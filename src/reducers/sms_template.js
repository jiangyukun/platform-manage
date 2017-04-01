/**
 * Created by jiangyukun on 2017/01/13.
 */
import {fromJS} from 'immutable'
import * as types from '../constants/ActionTypes'
import * as phase from '../constants/PhaseConstant'

const defaultValue = []

export function smsTemplateList(state = defaultValue, action) {
  const iState = fromJS(state)
  return nextState()

  function nextState() {
    let nextIState = iState
    switch (action.type) {

      case types.FETCH_ALL_SMS_TEMPLATE + phase.SUCCESS:
        nextIState = fetchAllSmsTemplateSuccess()
        break
    }
    if (nextIState == iState) {
      return state
    }
    return nextIState.toJS()
  }

  //-----------------------------------------

  function fetchAllSmsTemplateSuccess() {
    let {smsTemplateList} = action
    return fromJS(smsTemplateList)
  }
}
