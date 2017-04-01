/**
 * Created by jiangyukun on 2016/12/6.
 */
import {fromJS} from 'immutable'
import * as types from '../constants/ActionTypes'
import * as phase from '../constants/PhaseConstant'

export function provinceList(state = [], action) {
  const iState = fromJS(state)
  return nextState()

  function nextState() {
    let nextIState = iState
    switch (action.type) {
      case types.FETCH_PROVINCE_LIST + phase.SUCCESS:
        nextIState = fetchProvinceListSuccess()
        break
    }
    if (nextIState == iState) {
      return state
    }
    return nextIState.toJS()
  }

  //-----------------------------------------

  function fetchProvinceListSuccess() {
    let {provinceList} = action
    return fromJS(provinceList)
  }
}
