/**
 * Created by jiangyukun on 2016/10/20.
 */
import {fromJS, Map} from 'immutable'
import * as types from '../constants/ActionTypes'
import * as phase from '../constants/PhaseConstant'

let errId = 1

const initValue = {
  username: '',
  settings: {
    asideFolded: false,
    asideMessage: true
  },
  errQueue: []
}

export function app(state = initValue, action) {
  const iState = fromJS(state)
  return nextState()

  function nextState() {
    let nextIState = iState
    switch (action.type) {
      case types.INIT_USERNAME:
        nextIState = initUsername()
        break

      case 'TOGGLE_ASIDE':
        nextIState = toggleAside()
        break
      case 'TOGGLE_MESSAGE_PANEL':
        nextIState = toggleMessagePanel()
        break
      case 'CLOSE_MESSAGE_PANEL':
        nextIState = closeMessagePanel()
        break
      case types.DELETE_ERROR:
        nextIState = deleteError()
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

  function initUsername() {
    return iState.set('username', action.username)
  }

  function toggleAside() {
    return _updateSettings(iState, settings => settings.set('asideFolded', !settings.get('asideFolded')))
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
    //todo
    return iState
  }

  //--------------------------------

  function _updateSettings(curIState, callback) {
    return curIState.update('settings', settings => callback(settings))
  }
}
