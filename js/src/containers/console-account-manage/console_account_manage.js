/**
 * Created by jiangyukun on 2016/12/29
 */
import {fromJS} from 'immutable'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'

const defaultValue = {
  total: 0,
  list: [],
  roleList: [],
  loading: false,
  addConsoleUserSuccess: false,
  updateConsoleUserSuccess: false,
  deleteConsoleUserSuccess: false,
  resetPasswordSuccess: false,
  updateRemarkSuccess: false
}

export function consoleAccountManage(state = defaultValue, action) {
  const iState = fromJS(state)

  return nextState()

  function nextState() {
    let nextIState = iState

    switch (action.type) {
      case types.consoleAccountManage.FETCH_LIST + phase.START:
        nextIState = iState.set('loading', true)
        break

      case types.consoleAccountManage.FETCH_LIST + phase.SUCCESS:
        nextIState = fetchListSuccess()
        break

      case types.consoleAccountManage.FETCH_ROLE_LIST + phase.SUCCESS:
        nextIState = fetchRoleListSuccess()
        break

      case types.consoleAccountManage.ADD_CONSOLE_USER + phase.SUCCESS:
        nextIState = iState.set('addConsoleUserSuccess', true)
        break

      case types.consoleAccountManage.UPDATE_CONSOLE_USER + phase.SUCCESS:
        nextIState = iState.set('updateConsoleUserSuccess', true)
        break

      case types.consoleAccountManage.DELETE_CONSOLE_USER + phase.SUCCESS:
        nextIState = iState.set('deleteConsoleUserSuccess', true)
        break

      case types.consoleAccountManage.RESET_CONSOLE_USER_PASSWORD + phase.SUCCESS:
        nextIState = iState.set('resetPasswordSuccess', true)
        break

      case types.consoleAccountManage.UPDATE_REMARK + phase.SUCCESS:
        nextIState = _updateList(iState, action.id, item => item.set('backend_User_Remark', action.newRemark))
          .set('updateRemarkSuccess', true)
        break

      case types.consoleAccountManage.CLEAR_ADD_CONSOLE_USER_SUCCESS:
        nextIState = iState.set('addConsoleUserSuccess', false)
        break

      case types.consoleAccountManage.CLEAR_UPDATE_CONSOLE_USER_SUCCESS:
        nextIState = iState.set('updateConsoleUserSuccess', false)
        break

      case types.consoleAccountManage.CLEAR_DELETE_CONSOLE_USER_SUCCESS:
        nextIState = iState.set('deleteConsoleUserSuccess', false)
        break

      case types.consoleAccountManage.CLEAR_RESET_PASSWORD_SUCCESS:
        nextIState = iState.set('resetPasswordSuccess', false)
        break

      case types.consoleAccountManage.CLEAR_UPDATE_REMARK_SUCCESS:
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

  function fetchRoleListSuccess() {
    return iState.set('roleList', action.roleList)
  }

  function updateRemarkSuccess() {
    const {doctorId, newRemark} = action
    return _updateList(iState.set('remarkUpdated', true), doctorId, record => record.set('doctor_Need_Remark', newRemark))
  }

  function clearRemarkUpdateSuccess() {
    return iState.set('updateRemarkSuccess', false)
  }

  // -------------------------------------------------

  function _updateList(curIState, id, callback) {
    const list = curIState.get('list')
    const match = list.find(todo => todo.get('backend_UserId') == id)
    if (!match) {
      console.log('item not found which the id specify')
    }
    return curIState.update('list', list => list.update(list.indexOf(match), todo => callback(todo)))
  }

}
