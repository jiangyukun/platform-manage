/**
 * 每个省对应市的object映射
 * Created by jiangyukun on 2016/12/6.
 */
import {fromJS} from 'immutable'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'

const defaultValue = {}

export function cityMapper(state = defaultValue, action) {
  const iState = fromJS(state)
  return nextState()

  function nextState() {
    let nextIState = iState
    switch (action.type) {
      case types.FETCH_CITY_LIST + phase.START:
        nextIState = fetchCityListStart()
        break

      case types.FETCH_CITY_LIST + phase.SUCCESS:
        nextIState = fetchCityListSuccess()
        break
    }
    if (nextIState == iState) {
      return state
    }
    return nextIState.toJS()
  }

  //-----------------------------------------

  function fetchCityListStart() {
    return iState
  }

  function fetchCityListSuccess() {
    let {provinceId, cityList} = action
    return iState.set(provinceId, fromJS(cityList))
  }
}
