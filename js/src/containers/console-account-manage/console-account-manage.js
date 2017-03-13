/**
 * Created by jiangyukun on 2016/12/29.
 */
import {_post, _delete} from '../../services/http'
import * as types from '../../constants/ActionTypes'
import {THREE_PHASE} from '../../middleware/request_3_phase'

export function fetchList(option) {
  return {
    [THREE_PHASE]: {
      type: types.consoleAccountManage.FETCH_LIST,
      http: state => _post('/webBackend/getBackendGroupUser', {body: option}),
      handleResponse: response => ({list: response['list'], total: response['total']})
    }
  }
}

export function fetchRoleList() {
  return {
    [THREE_PHASE]: {
      type: types.consoleAccountManage.FETCH_ROLE_LIST,
      http: state => _post('/webBackend/getBackendGroupList'),
      handleResponse: response => ({
        roleList: response.map(roleItem => ({
          value: roleItem['group_Id'],
          text: roleItem['group_Name']
        }))
      })
    }
  }
}

export function addConsoleUser(username, name, roleList) {
  let roleStr = roleList.reduce((total, current) => total + ',' + current, '')
  if (roleList.length > 0) {
    roleStr = roleStr.substring(1)
  }
  return {
    [THREE_PHASE]: {
      type: types.consoleAccountManage.ADD_CONSOLE_USER,
      http: state => _post('/webBackend/addBackendUser', {
        body: {
          "backend_User_Name": username,
          "backend_User_Real_Name": name,
          "group_Id": roleStr
        }
      }),
      handleResponse: response => null
    }
  }
}

export function updateConsoleUser(id, name, roleList) {
  let roleStr = roleList.reduce((total, current) => total + ',' + current, '')
  if (roleList.length > 0) {
    roleStr = roleStr.substring(1)
  }
  return {
    [THREE_PHASE]: {
      type: types.consoleAccountManage.UPDATE_CONSOLE_USER,
      http: state => _post('/webBackend/updateBackendGroupUser', {
        body: {
          "backend_UserId": id,
          "backend_User_Real_Name": name,
          "group_Id": roleStr
        }
      }),
      handleResponse: response => null
    }
  }
}

export function deleteAccount(accountId) {
  return {
    [THREE_PHASE]: {
      type: types.consoleAccountManage.DELETE_CONSOLE_USER,
      http: state => _delete(`/webBackend/deleteBackendUser/${accountId}`),
      handleResponse: response => null
    }
  }
}

export function resetPassword(accountId) {
  return {
    [THREE_PHASE]: {
      type: types.consoleAccountManage.RESET_CONSOLE_USER_PASSWORD,
      http: state => _post(`/webBackend/resetBackendUserPassword/${accountId}`),
      handleResponse: response => null
    }
  }
}

export function updateRemark(id, newRemark) {
  return {
    [THREE_PHASE]: {
      type: types.consoleAccountManage.UPDATE_REMARK,
      http: state => _post(`/webBackend/updateBackendUserRemark/${id}`, {type: 'text', body: {"backend_User_Remark": newRemark}}),
      handleResponse: response => ({id, newRemark})
    }
  }
}

export function clearAddConsoleUserSuccess() {
  return {
    type: types.consoleAccountManage.CLEAR_ADD_CONSOLE_USER_SUCCESS
  }
}

export function clearUpdateSuccess() {
  return {
    type: types.consoleAccountManage.CLEAR_UPDATE_CONSOLE_USER_SUCCESS
  }
}

export function clearDeleteConsoleUserSuccess() {
  return {
    type: types.consoleAccountManage.CLEAR_DELETE_CONSOLE_USER_SUCCESS
  }
}

export function clearResetPasswordSuccess() {
  return {
    type: types.consoleAccountManage.CLEAR_RESET_PASSWORD_SUCCESS
  }
}

export function clearUpdateRemarkSuccess() {
  return {
    type: types.consoleAccountManage.CLEAR_UPDATE_REMARK_SUCCESS
  }
}
