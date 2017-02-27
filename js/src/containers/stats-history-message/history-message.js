/**
 * Created by jiangyukun on 2016/12/29.
 */
import {_get, _post, _patch} from '../../services/http'
import * as types from '../../constants/ActionTypes'
import {THREE_PHASE} from '../../middleware/request_3_phase'

export function fetchSingleHistoryMessageList(option) {
  option['chat_Type'] = 'chat'
  return {
    [THREE_PHASE]: {
      type: types.historyMessage.FETCH_SINGLE_HISTORY_MESSAGE_LIST,
      http: () => _post('/chat/report', {body: option}),
      handleResponse: response => ({list: response['dataArray'], total: response['totalCount']})
    }
  }
}

export function fetchGroupHistoryMessageList(option) {
  option['chat_Type'] = 'groupchat'
  return {
    [THREE_PHASE]: {
      type: types.historyMessage.FETCH_GROUP_HISTORY_MESSAGE_LIST,
      http: () => _post('/chat/report', {body: option}),
      handleResponse: response => ({list: response['dataArray'], total: response['totalCount']})
    }
  }
}

export function fetchGroupList(option) {
  return {
    [THREE_PHASE]: {
      type: types.historyMessage.FETCH_HUANXIN_GROUP_LIST,
      http: () => _get('/chat/group/list'),
      handleResponse: response => ({list: response.map(group => ({value: group['chat_Group_Id'], text: group['chat_Group_Name']}))})
    }
  }
}

export function fetchHistoryExcelList(chatType) {
  return {
    [THREE_PHASE]: {
      type: types.historyMessage.FETCH_HISTORY_EXCEL_LIST,
      http: () => _get(`/chat/report/export/log/${chatType}/list`),
      handleResponse: response => ({chatType, historyExcelList: response})
    }
  }
}
