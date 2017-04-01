/**
 * Created by jiangyukun on 2016/12/29
 */
import {fromJS} from 'immutable'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'

const defaultValue = {
  total: 0,
  list: [],
  loading: false,
  addSuccess: false,
  updateSuccess: false,
  deleteSuccess: false,
  updateRemarkSuccess: false,
  remarkUpdated: false
}

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

      case types.smartAnalytic.ADD_ANALYTIC_ITEM + phase.SUCCESS:
        nextIState = iState.set('addSuccess', true)
        break

      case types.smartAnalytic.CLEAR_ADD_SUCCESS:
        nextIState = iState.set('addSuccess', false)
        break

      case types.smartAnalytic.UPDATE_ANALYTIC_ITEM + phase.SUCCESS:
        nextIState = iState.set('updateSuccess', true)
        break

      case types.smartAnalytic.UPDATE_REMARK + phase.SUCCESS:
        nextIState = _updateList(iState.set('updateRemarkSuccess', true), action.id, item => item.set('remark', action.newRemark))
        break

      case types.smartAnalytic.CLEAR_UPDATE_SUCCESS:
        nextIState = iState.set('updateSuccess', false)
        break

      case types.smartAnalytic.DELETE_ANALYTIC_ITEM + phase.SUCCESS:
        nextIState = iState.set('deleteSuccess', true)
        break

      case types.smartAnalytic.CLEAR_DELETE_SUCCESS:
        nextIState = iState.set('deleteSuccess', false)
        break

      case types.smartAnalytic.CLEAR_UPDATE_REMARK_SUCCESS:
        nextIState = iState.set('updateRemarkSuccess', false)
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

  // -------------------------------------------------

  function _updateList(curIState, id, callback) {
    const list = curIState.get('list')
    const match = list.find(todo => todo.get('info_Id') == id)
    if (!match) {
      console.log('item not found which the id specify')
    }
    return curIState.update('list', list => list.update(list.indexOf(match), todo => callback(todo)))
  }

}
