/**
 * Created by jiangyukun on 2016/12/29
 */
import {fromJS} from 'immutable'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'

const defaultValue = {
  total: 0,
  list: [],
  pageList: [],
  loading: false,
  addRoleSuccess: false,
  updateRoleSuccess: false,
  deleteRoleSuccess: false,
  addPagePermissionSuccess: false,
  updatePagePermissionSuccess: false,
  deletePagePermissionSuccess: false,
  updateRemarkSuccess: false
}

export function authorityRoleManage(state = defaultValue, action) {
  const iState = fromJS(state)

  return nextState()

  function nextState() {
    let nextIState = iState

    switch (action.type) {
      case types.authorityRoleManage.FETCH_LIST + phase.START:
        nextIState = iState.set('loading', true)
        break

      case types.authorityRoleManage.FETCH_LIST + phase.SUCCESS:
        nextIState = fetchListSuccess()
        break

      case types.authorityRoleManage.FETCH_PAGE_LIST + phase.SUCCESS:
        nextIState = iState.set('pageList', action.pageList)
        break

      case types.authorityRoleManage.ADD_ROLE + phase.SUCCESS:
        nextIState = iState.set('addRoleSuccess', true)
        break

      case types.authorityRoleManage.UPDATE_ROLE + phase.SUCCESS:
        nextIState = iState.set('updateRoleSuccess', true)
        break

      case types.authorityRoleManage.DELETE_ROLE + phase.SUCCESS:
        nextIState = iState.set('deleteRoleSuccess', true)
        break

      case types.authorityRoleManage.ADD_PAGE_PERMISSION + phase.SUCCESS:
        nextIState = iState.set('addPagePermissionSuccess', true)
        break

      case types.authorityRoleManage.UPDATE_PAGE_PERMISSION + phase.SUCCESS:
        nextIState = iState.set('updatePagePermissionSuccess', true)
        break

      case types.authorityRoleManage.DELETE_PAGE_PERMISSION + phase.SUCCESS:
        nextIState = iState.set('deletePagePermissionSuccess', true)
        break

      case types.authorityRoleManage.UPDATE_REMARK + phase.SUCCESS:
        nextIState = updateRemarkSuccess()
        break

      case types.authorityRoleManage.CLEAR_OPERATION_ROLE_STATE:
        nextIState = iState.set(action.operation + 'RoleSuccess', false)
        break

      case types.authorityRoleManage.CLEAR_OPERATION_PAGE_PERMISSION_STATE:
        nextIState = iState.set(action.operation + 'PagePermissionSuccess', false)
        break

      case types.authorityRoleManage.CLEAR_UPDATE_REMARK_SUCCESS:
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

  function updateRemarkSuccess() {
    const {id, newRemark} = action
    return _updateList(iState.set('updateRemarkSuccess', true), id, item => item.set('group_Remark', newRemark))
  }

  // -------------------------------------------------

  function _updateList(curIState, id, callback) {
    const list = curIState.get('list')
    const match = list.find(todo => todo.get('group_Id') == id)
    if (!match) {
      console.log('item not found which the id specify')
    }
    return curIState.update('list', list => list.update(list.indexOf(match), todo => callback(todo)))
  }

}
