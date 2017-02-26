/**
 * Created by jiangyukun on 2016/12/29
 */
import {fromJS} from 'immutable'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'

const defaultValue = {total: 0, list: [], loading: false}

export function smsPaginateList(state = defaultValue, action) {
  const iState = fromJS(state)

  return nextState()

  function nextState() {
    let nextIState = iState

    switch (action.type) {
      case types.FETCH_SMS_PAGINATE_LIST + phase.START:
        nextIState = iState.set('loading', true)
        break

      case types.FETCH_SMS_PAGINATE_LIST + phase.FAILURE:
        nextIState = iState.set('loading', false)
        break

      case types.FETCH_SMS_PAGINATE_LIST + phase.SUCCESS:
        nextIState = fetchSmsPaginateListSuccess()
        break

      default:
        break
    }
    if (nextIState == iState) {
      return state
    }
    return nextIState.toJS()
  }

  // --------------------------------------

  function fetchSmsPaginateListSuccess() {
    let {total, list} = action
    return iState.set('total', total).set('list', list).set('loading', false)
  }
}
