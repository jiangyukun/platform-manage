/**
 * Created by jiangyukun on 2016/12/29
 */
import {fromJS} from 'immutable'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'

const defaultValue = {total: 0, list: [], remarkUpdated: false}

export function takeMedicineRecordPaginateList(state = defaultValue, action) {
  const iState = fromJS(state)

  return nextState()

  function nextState() {
    let nextIState = iState

    switch (action.type) {
      case types.FETCH_TAKE_MEDICINE_RECORD_PAGINATE_LIST + phase.SUCCESS:
        nextIState = fetchTakeMedicineRecordPaginateListSuccess()
        break

      case types.UPDATE_TAKE_MEDICINE_RECORD_REMARK + phase.SUCCESS:
        nextIState = updateTakeMedicineRecordRemarkSuccess()
        break
      case types.CLEAR_TAKE_MEDICINE_RECORD_REMARK_UPDATED:
        nextIState = clearTakeMedicineRecordRemarkUpdated()
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

  function fetchTakeMedicineRecordPaginateListSuccess() {
    let {total, list} = action
    return iState.set('total', total).set('list', list)
  }

  function updateTakeMedicineRecordRemarkSuccess() {
    const {userId, newRemark} = action
    return _updateList(iState.set('remarkUpdated', true), userId, record => record.set('takeMedicine_Remark', newRemark))
  }

  function clearTakeMedicineRecordRemarkUpdated() {
    return iState.set('remarkUpdated', false)
  }

  // -------------------------------------------------

  function _updateList(curIState, id, callback) {
    const list = curIState.get('list')
    const match = list.find(hospital => hospital.get('patient_User_Id') == id)
    if (!match) {
      console.log('item not found which the id specify')
    }
    return curIState.update('list', list => list.update(list.indexOf(match), hospital => callback(hospital)))
  }

}
