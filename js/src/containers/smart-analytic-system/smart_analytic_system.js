/**
 * Created by jiangyukun on 2016/12/29
 */
import {fromJS} from 'immutable'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'

const defaultValue = {total: 0, list: [], loading: false, remarkUpdated: false}

export function smartAnalytic(state = defaultValue, action) {
  const iState = fromJS(state)

  return nextState()

  function nextState() {
    let nextIState = iState

    switch (action.type) {
      case types.smartAnalytic.FETCH_LIST + phase.START:
        nextIState = iState.set('loading', true)
        break

      case types.smartAnalytic.FETCH_LIST + phase.SUCCESS:
        nextIState = fetchListSuccess()
        break

      case types.UPDATE_TODO_WORK_REMARK + phase.SUCCESS:
        nextIState = updateRemarkSuccess()
        break

      case types.CLEAR_UPDATE_TODO_WORK_REMARK:
        nextIState = clearRemark()
        break

      default:
        break
    }
    if (nextIState == iState) {
      return state
    }
    return nextIState.toJS()
  }

  // -------------------------------------------------
  function fetchListSuccess() {
    let {total, list} = action
    return iState.set('total', total).set('list', list).set('loading', false)
  }

  function updateRemarkSuccess() {
    const {doctorId, newRemark} = action
    return _updateList(iState.set('remarkUpdated', true), doctorId, record => record.set('doctor_Need_Remark', newRemark))
  }

  function clearRemark() {
    return iState.set('remarkUpdated', false)
  }

  // -------------------------------------------------

  function _updateList(curIState, id, callback) {
    const list = curIState.get('list')
    const match = list.find(todo => todo.get('doctor_User_Id') == id)
    if (!match) {
      console.log('item not found which the id specify')
    }
    return curIState.update('list', list => list.update(list.indexOf(match), todo => callback(todo)))
  }

}
