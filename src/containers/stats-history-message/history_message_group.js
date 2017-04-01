/**
 * Created by jiangyukun on 2016/12/29
 */
import {fromJS} from 'immutable'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'

const defaultValue = {
  total: 0,
  list: [],
  groupList: [],
  loading: false,
  groupHistoryExcelList: []
}

export function historyMessageGroup(state = defaultValue, action) {
  const iState = fromJS(state)

  return nextState()

  function nextState() {
    let nextIState = iState

    switch (action.type) {
      case types.historyMessage.FETCH_GROUP_HISTORY_MESSAGE_LIST + phase.START:
        nextIState = iState.set('loading', true)
        break

      case types.historyMessage.FETCH_GROUP_HISTORY_MESSAGE_LIST + phase.SUCCESS:
        nextIState = iState.set('list', action.list).set('total', action.total).set('loading', false)
        break

      case types.historyMessage.FETCH_HUANXIN_GROUP_LIST + phase.SUCCESS:
        nextIState = iState.set('groupList', action.list)
        break

      case types.historyMessage.FETCH_HISTORY_EXCEL_LIST + phase.SUCCESS:
        if (action.chatType != 'groupchat') {
          nextIState = iState
        }
        nextIState = iState.set('groupHistoryExcelList', action.historyExcelList)
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

  function fetchListStart() {
    return iState.set('loading', true)
  }

  function fetchListSuccess() {
    let {total, list} = action
    return iState.set('total', total).set('list', list).set('loading', false)
  }

  function updateRemarkSuccess() {
    const {id, newRemark} = action
    return _updateList(iState, id, onlineDoctor => onlineDoctor.set('score_Log_Remark', newRemark)).set('remarkUpdated', true)
  }

  function fetchStatisticsInfoSuccess() {
    const {statisticsInfo} = action
    return iState.set('statisticsInfo', statisticsInfo)
  }

  // -------------------------------------------------

  function _updateList(curIState, id, callback) {
    const list = curIState.get('list')
    const match = list.find(item => item.get('score_Log_Id') == id)
    if (!match) {
      console.log('item not found which the id specify')
    }
    return curIState.update('list', list => list.update(list.indexOf(match), item => callback(item)))
  }
}
