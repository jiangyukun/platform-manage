/**
 * Created by jiangyukun on 2016/12/1.
 */
import {fromJS} from 'immutable'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'

const defaultValue = {
  total: 0,
  list: [],
  loading: false,
  remarkUpdated: false
}

export function laboratorySheet(state = defaultValue, action) {
  const iState = fromJS(state)

  return nextState()

  function nextState() {
    let nextIState = iState

    switch (action.type) {
      case types.FETCH_LABORATORY_SHEET_LIST + phase.START:
        nextIState = iState.set('loading', true)
        break

      case types.FETCH_LABORATORY_SHEET_LIST + phase.SUCCESS:
        nextIState = fetchLaboratorySheetListSuccess()
        break

      case types.EDIT_LABORATORY_SHEET_REMARK + phase.SUCCESS:
        const {mobile, newRemark} = action
        nextIState = _updateList(iState.set('remarkUpdated', true), mobile, sheet => sheet.set('patient_Assay_Remark', newRemark))
        break

      case types.CLEAR_LABORATORY_SHEET_REMARK:
        nextIState = iState.set('remarkUpdated', false)
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

  function fetchLaboratorySheetListSuccess() {
    let {total, list} = action
    return iState.set('total', total).set('list', list).set('loading', false)
  }

  // -------------------------------------------------

  function _updateList(curIState, mobile, callback) {
    const list = curIState.get('list')
    const match = list.find(todo => todo.get('assay_Owner_Phone') == mobile)
    if (!match) {
      console.log('item not found which the id specify')
    }
    return curIState.update('list', list => list.update(list.indexOf(match), todo => callback(todo)))
  }
}
