/**
 * Created by jiangyukun on 2016/12/8.
 */
import {fromJS} from 'immutable'
import * as types from '../../../constants/ActionTypes'
import * as phase from '../../../constants/PhaseConstant'

const defaultValue = {total: 0, list: []}

export function patientSituationList(state = defaultValue, action) {
  const iState = fromJS(state)
  return nextState()

  function nextState() {
    let nextIState = iState
    switch (action.type) {
      case types.FETCH_PATIENT_SITUATION_LIST + phase.SUCCESS:
        nextIState = fetchPatientSituationListSuccess()
        break
    }
    if (nextIState == iState) {
      return state
    }
    return nextIState.toJS()
  }

//

  function fetchPatientSituationListSuccess() {
    let {total, list} = action
    return iState.set('total', total).set('list', list)
  }
}
