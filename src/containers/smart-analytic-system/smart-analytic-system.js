/**
 * Created by jiangyukun on 2016/12/29.
 */
import {_post} from '../../services/http'
import * as types from '../../constants/ActionTypes'
import {THREE_PHASE} from '../../middleware/request_3_phase'

export function fetchList(option) {
  return {
    [THREE_PHASE]: {
      type: types.smartAnalytic.FETCH_LIST,
      http: state => _post('/archives/analysis/system/list', {body: option}),
      handleResponse: response => ({list: response['analysisSystemList'], total: response['totalCount']})
    }
  }
}

export function addAnalyticItem(option) {
  return {
    [THREE_PHASE]: {
      type: types.smartAnalytic.ADD_ANALYTIC_ITEM,
      http: state => _post('/archives/analysis/system/add', {body: option}),
      handleResponse: response => ({})
    }
  }
}

export function updateAnalyticItem(option) {
  return {
    [THREE_PHASE]: {
      type: types.smartAnalytic.UPDATE_ANALYTIC_ITEM,
      http: state => _post('/archives/analysis/system/edit', {body: option}),
      handleResponse: response => ({})
    }
  }
}

export function deleteAnalyticItem(id) {
  return {
    [THREE_PHASE]: {
      type: types.smartAnalytic.DELETE_ANALYTIC_ITEM,
      http: state => _post(`/archives/analysis/system/del/${id}`),
      handleResponse: response => ({})
    }
  }
}

export function updateRemark(id, newRemark) {
  return {
    [THREE_PHASE]: {
      type: types.smartAnalytic.UPDATE_REMARK,
      http: state => _post(`/archives/analysis/system/remark/edit/${id}`, {type: 'text', body: {"remark": newRemark}}),
      handleResponse: response => ({id, newRemark})
    }
  }
}

export function clearAddSuccess() {
  return {
    type: types.smartAnalytic.CLEAR_ADD_SUCCESS
  }
}

export function clearUpdateSuccess() {
  return {
    type: types.smartAnalytic.CLEAR_UPDATE_SUCCESS
  }
}

export function clearDeleteSuccess() {
  return {
    type: types.smartAnalytic.CLEAR_DELETE_SUCCESS
  }
}

export function clearUpdateRemarkSuccess() {
  return {
    type: types.smartAnalytic.CLEAR_UPDATE_REMARK_SUCCESS
  }
}
