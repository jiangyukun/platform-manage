/**
 * Created by jiangyukun on 2016/12/1.
 */
import {fromJS} from 'immutable'
import {patientEdit} from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'

const defaultValue = {
  total: 0,
  list: [],
  loading: false,
  deleteAccountSuccess: false,
  undoDeleteAccountSuccess: false,
  updateRemarkSuccess: false
}

export function patient_edit(state = defaultValue, action) {
  const iState = fromJS(state)

  return nextState()

  function nextState() {
    let nextIState = iState

    switch (action.type) {
      case patientEdit.FETCH_LIST + phase.START:
        nextIState = iState.set('loading', true)
        break

      case patientEdit.FETCH_LIST + phase.SUCCESS:
        nextIState = fetchPatientPaginateListSuccess()
        break

      case patientEdit.UPDATE_REMARK + phase.SUCCESS:
        nextIState = updateRemarkSuccess()
        break

      case patientEdit.CLEAR_REMARK_UPDATED:
        nextIState = iState.set('updateRemarkSuccess', false)
        break

      case patientEdit.DELETE_ACCOUNT + phase.SUCCESS:
        nextIState = iState.set('deleteAccountSuccess', true)
        break

      case patientEdit.CLEAR_DELETE_ACCOUNT_SUCCESS:
        nextIState = iState.set('deleteAccountSuccess', false)
        break

      case patientEdit.UNDO_DELETE_ACCOUNT + phase.SUCCESS:
        nextIState = iState.set('undoDeleteAccountSuccess', true)
        break

      case patientEdit.CLEAR_UNDO_DELETE_ACCOUNT:
        nextIState = iState.set('undoDeleteAccountSuccess', false)
        break

      default:
        break
    }
    if (nextIState == iState) {
      return state
    }
    return nextIState.toJS()
  }

  // --------------------------------------

  function fetchPatientPaginateListSuccess() {
    let {total, list} = action
    return iState.set('total', total).set('list', list).set('loading', false)
  }

  function updateRemarkSuccess() {
    let {id, remark} = action
    return _updateList(iState, id, patient => patient.set('remark', remark)).set('updateRemarkSuccess', true)
  }

  // -------------------------------------

  function _updateList(curIState, id, callback) {
    const list = curIState.get('list')
    const match = list.find(patient => patient.get('patient_Id') == id)
    if (!match) {
      console.warn('no match')
      return curIState
    }
    return curIState.update('list', list => list.update(list.indexOf(match), patient => callback(patient)))
  }
}
