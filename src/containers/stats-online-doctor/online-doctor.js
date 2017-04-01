/**
 * Created by jiangyukun on 2016/12/29.
 */
import {_get, _post, _patch} from '../../services/http'
import * as types from '../../constants/ActionTypes'
import {THREE_PHASE} from '../../middleware/request_3_phase'
import constants from '../../core/constants'

export const fetchPaginateList = option => {
  return {
    [THREE_PHASE]: {
      type: types.onlineDoctor.FETCH_LIST,
      http: () => _post('/score/getChatScores', {body: option}),
      handleResponse: response => ({list: response['list'], total: response['totalCount']})
    }
  }
}

export function fetchStatisticsInfo(startday, endDay) {
  return {
    [THREE_PHASE]: {
      type: types.onlineDoctor.FETCH_STATISTICS_INFO,
      http: state => _get(`/score/scoreStatisticsResult/${startday}/${endDay}`),
      handleResponse: response => ({statisticsInfo: response})
    }
  }
}

export const updateRemark = (id, newRemark) => {
  const remarkType = constants.remarkFlag.SCORE_STATISTICS
  return {
    [THREE_PHASE]: {
      type: types.onlineDoctor.UPDATE_REMARK,
      http: state => _post(`/web/updateRemark/${id}/${remarkType}`, {type: 'text', body: {"remark": newRemark}}),
      handleResponse: response => ({id, newRemark})
    }
  }
}

export const updateIsStatistics = (id, isStatistics) => {
  return {
    [THREE_PHASE]: {
      type: types.onlineDoctor.UPDATE_IS_STATISTICS,
      http: state => _patch(`/score/updateChatScores/${id}/${isStatistics}`),
      handleResponse: response => ({id, isStatistics})
    }
  }
}

export function clearRemark() {
  return {
    type: types.onlineDoctor.CLEAR_REMARK
  }
}

export function clearStatisticsUpdated() {
  return {
    type: types.onlineDoctor.CLEAR_STATISTICS_UPDATED
  }
}
