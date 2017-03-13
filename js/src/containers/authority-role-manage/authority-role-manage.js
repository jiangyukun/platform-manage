/**
 * Created by jiangyukun on 2016/12/29.
 */
import {_get, _post, _delete} from '../../services/http'
import * as types from '../../constants/ActionTypes'
import {THREE_PHASE} from '../../middleware/request_3_phase'

export function fetchList(option) {
  return {
    [THREE_PHASE]: {
      type: types.authorityRoleManage.FETCH_LIST,
      http: state => _post('/webBackend/getBackendGroupAndPermissionList', {body: option}),
      handleResponse: response => ({list: response['list'], total: response['total']})
    }
  }
}

export function cancelPermission(id) {
  return {
    [THREE_PHASE]: {
      type: types.authorityRoleManage.CANCEL_PERMISSION,
      http: state => _post('/webBackend/getBackendGroupAndPermissionList', {body: option}),
      handleResponse: response => ({list: response['list'], total: response['total']})
    }
  }
}

export function fetchPagePermissionList() {
  return {
    [THREE_PHASE]: {
      type: types.authorityRoleManage.FETCH_PAGE_LIST,
      http: state => _get('/webBackend/getBackendPermissionPageList'),
      handleResponse: response => ({
        pageList: response.map(roleItem => ({
          value: roleItem['page_Id'],
          text: roleItem['page_Name_Remark']
        }))
      })
    }
  }
}

export function addRole(roleName) {
  return {
    [THREE_PHASE]: {
      type: types.authorityRoleManage.ADD_ROLE,
      http: state => _post('/webBackend/addGroup', {body: {"group_Name": roleName}}),
      handleResponse: response => null
    }
  }
}

export function addPagePermission(roleId, pageId, basicPermission, isCanExport) {
  return {
    [THREE_PHASE]: {
      type: types.authorityRoleManage.ADD_PAGE_PERMISSION,
      http: state => _post('/webBackend/updatePermissionPage', {
        body: {
          "group_Id": roleId,
          "permission": basicPermission,
          "export": isCanExport == '1',
          "permission_Page": pageId
        }
      }),
      handleResponse: response => null
    }
  }
}

export function updatePagePermission(permissionId, pageId, basicPermission, isCanExport) {
  return {
    [THREE_PHASE]: {
      type: types.authorityRoleManage.UPDATE_PAGE_PERMISSION,
      http: state => _post('/webBackend/updatePermissionPage', {
        body: {
          "permission_Id": permissionId,
          "permission_Page": pageId,
          "permission": basicPermission,
          "export": isCanExport == '1',
        }
      }),
      handleResponse: response => null
    }
  }
}

export function deletePagePermission(permissionId) {
  return {
    [THREE_PHASE]: {
      type: types.authorityRoleManage.DELETE_PAGE_PERMISSION,
      http: state => _delete(`/webBackend/deletePermission/${permissionId}`),
      handleResponse: response => null
    }
  }
}

export function deleteRole(id) {
  return {
    [THREE_PHASE]: {
      type: types.authorityRoleManage.DELETE_ROLE,
      http: state => _delete(`/webBackend/deleteGroup/${id}`),
      handleResponse: response => null
    }
  }
}

export function updateRole(id, roleName) {
  return {
    [THREE_PHASE]: {
      type: types.authorityRoleManage.UPDATE_ROLE,
      http: state => _post('/webBackend/updateGroup', {
        body: {
          "group_Id": id,
          "group_Name": roleName
        }
      }),
      handleResponse: response => null
    }
  }
}

export function updateRemark(id, newRemark) {
  return {
    [THREE_PHASE]: {
      type: types.authorityRoleManage.UPDATE_REMARK,
      http: state => _post(`/webBackend/updateGroupRemark/${id}`, {type: 'text', body: {"groupRemark": newRemark}}),
      handleResponse: response => ({id, newRemark})
    }
  }
}

export function clearAddRoleSuccess() {
  return {
    type: types.authorityRoleManage.CLEAR_ADD_ROLE_SUCCESS
  }
}

export function clearUpdateRoleSuccess() {
  return {
    type: types.authorityRoleManage.CLEAR_UPDATE_ROLE_SUCCESS
  }
}

export function clearDeleteRoleSuccess() {
  return {
    type: types.authorityRoleManage.CLEAR_DELETE_ROLE_SUCCESS
  }
}

export function clearAddPagePermissionSuccess() {
  return {
    type: types.authorityRoleManage.CLEAR_ADD_PAGE_PERMISSION_SUCCESS
  }
}

export function clearUpdatePagePermissionSuccess() {
  return {
    type: types.authorityRoleManage.CLEAR_UPDATE_PAGE_PERMISSION_SUCCESS
  }
}

export function clearDeletePagePermissionSuccess() {
  return {
    type: types.authorityRoleManage.CLEAR_DELETE_PAGE_PERMISSION_SUCCESS
  }
}

export function clearUpdateRemarkSuccess() {
  return {
    type: types.authorityRoleManage.CLEAR_UPDATE_REMARK_SUCCESS
  }
}
