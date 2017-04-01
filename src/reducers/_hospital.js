/**
 * Created by jiangyukun on 2016/11/26.
 */
import {fromJS} from 'immutable'

export function hospitalList(state = [], action) {
  const iState = fromJS(state)
  return nextState()

  function nextState() {
    let nextIState = iState
    switch (action.type) {
      case 'FETCH_HOSPITAL_LIST_SUCCESS':
        nextIState = fetchHospitalListSuccess()
        break
    }
    if (nextIState == iState) {
      return state
    }
    return nextIState.toJS()
  }

  //--------------------------------

  function fetchHospitalListSuccess() {
    let {hospitalList} = action
    return fromJS(hospitalList)
  }
}
