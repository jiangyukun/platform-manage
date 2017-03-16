/**
 * Created by jiangyukun on 2016/10/20.
 */
import {fromJS, List} from 'immutable'

import * as types from '../constants/ActionTypes'
import * as phase from '../constants/PhaseConstant'

const defaultState = {
  count: 0,
  unreadTotal: 0,
  messageList: []
}

export function message(state = defaultState, action) {
  const iState = fromJS(state)

  return nextState()

  function nextState() {
    let nextIState = iState
    switch (action.type) {
      case 'REQUEST_MESSAGE_SUCCESS':
        nextIState = requestMessageSuccess()
        break

      case types.MARK_MESSAGE_STATE + phase.SUCCESS:
        nextIState = markSheetItemSuccess()
        break

      default:
        break
    }

    if (nextIState == iState) {
      return state
    }
    return nextIState.toJS()
  }

  //--------------------------------------------

  function requestMessageSuccess() {
    let {count, unreadTotal, messageList} = action.messageListInfo
    return iState
      .set('count', count)
      .set('unreadTotal', unreadTotal)
      .update('messageList', list => list.concat(List(messageList)))
  }

  function markSheetItemSuccess() {
    const {sheetId, newState} = action
    return _updateMessageList(iState, sheetId, item => item.set('messageState', newState))
  }

  function _updateMessageList(curIState, assayId, callback) {
    const list = curIState.get('messageList')
    const match = list.find(todo => todo.get('id') == assayId)
    console.log(match)
    if (!match) {
      console.log('item not found which the id specify')
    }
    return curIState.update('messageList', list => list.update(list.indexOf(match), item => callback(item)))
  }
}
