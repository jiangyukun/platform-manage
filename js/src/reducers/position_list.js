/**
 * Created by jiangyukun on 2016/12/6.
 */
import {fromJS} from 'immutable'
import * as types from '../constants/ActionTypes'
import * as phase from '../constants/PhaseConstant'

export function positionList(state = [], action) {
  const iState = fromJS(state)
  return nextState()

  function nextState() {
    let nextIState = iState
    switch (action.type) {
      case types.FETCH_POSITION_LIST + phase.SUCCESS:
        nextIState = fetchPositionListSuccess()
        break
    }
    if (nextIState == iState) {
      return state
    }
    return nextIState.toJS()
  }

  //-----------------------------------------

  function fetchPositionListSuccess() {
    let {positionList} = action
    return fromJS(positionList)
  }
}
