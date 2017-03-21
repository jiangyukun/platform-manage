/**
 * Created by jiangyukun on 2016/10/20.
 */
import {fromJS, Map} from 'immutable'
import * as types from '../constants/ActionTypes'
import * as phase from '../constants/PhaseConstant'

let errId = 1

const initValue = {
  name: '小贝壳控制台',
  version: '1.0',
  userId: '',
  username: '',
  pageList: [],
  settings: {
    asideMessage: true
  },
  errQueue: [],
  laboratorySheetNeedRefresh: false,
  passwordUpdateSuccess: false
}

export function app(state = initValue, action) {
  const iState = fromJS(state)
  return nextState()

  function nextState() {
    let nextIState = iState
    switch (action.type) {
      case 'TOGGLE_MESSAGE_PANEL':
        nextIState = toggleMessagePanel()
        break
      case 'CLOSE_MESSAGE_PANEL':
        nextIState = closeMessagePanel()
        break
      case types.DELETE_ERROR:
        nextIState = deleteError()
        break

      case types.INIT_ROLE_LIST:
        nextIState = iState.set('pageList', action.pageList).set('userId', action.userId).set('username', action.username)
        break

      case types.CHANGE_PASSWORD + phase.SUCCESS:
        nextIState = iState.set('passwordUpdateSuccess', true)
        break

      case types.CLEAR_PASSWORD_UPDATE_SUCCESS:
        nextIState = iState.set('passwordUpdateSuccess', false)
        break

      case types.REFRESH_LABORATORY_SHEET:
        nextIState = iState.set('laboratorySheetNeedRefresh', true)
        break

      case types.CLEAR_REFRESH_LABORATORY_SHEET:
        nextIState = iState.set('laboratorySheetNeedRefresh', false)
        break
    }

    if (action.type.indexOf(phase.FAILURE) != -1) {
      nextIState = addError()
    }
    if (nextIState == iState) {
      return state
    }
    return nextIState.toJS()
  }

  function toggleMessagePanel() {
    return _updateSettings(iState, settings => settings.set('asideMessage', !settings.get('asideMessage')))
  }

  function closeMessagePanel() {
    return _updateSettings(iState, settings => settings.set('asideMessage', true))
  }

  function addError() {
    const {err} = action
    const errInfo = {
      errId: errId++,
      err
    }
    return iState.update('errQueue', errQueue => errQueue.push(Map(errInfo)))
  }

  function deleteError() {
    const {errId} = action
    const matchErr = iState.get('errQueue').find(err => err.get('errId') == errId)
    if (matchErr) {
      const index = iState.get('errQueue').indexOf(matchErr)
      return iState.update('errQueue', errQueue => errQueue.delete(index))
    }

    return iState
  }

  //--------------------------------

  function _updateSettings(curIState, callback) {
    return curIState.update('settings', settings => callback(settings))
  }
}
