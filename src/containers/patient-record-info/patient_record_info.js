/**
 * Created by jiangyukun on 2016/12/1.
 */
import {fromJS} from 'immutable'
import {patientRecordInfo} from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'
import constants from '../../core/constants'

const defaultValue = {
  total: 0,
  list: [],
  loading: false,
  recordTypeInfo: {},
  updateRemarkSuccess: false,
  auditingStatus: ''
}

export function patient_record_info(state = defaultValue, action) {
  const iState = fromJS(state)

  return nextState()

  function nextState() {
    let nextIState = iState

    switch (action.type) {
      case patientRecordInfo.FETCH_LIST + phase.START:
        nextIState = iState.set('loading', true)
        break

      case patientRecordInfo.FETCH_LIST + phase.SUCCESS:
        const {total, list} = action
        nextIState = iState.set('total', total).set('list', list).set('loading', false)
        break

      case patientRecordInfo.FETCH_RECORD_TYPE_INFO + phase.SUCCESS:
        nextIState = iState.set('recordTypeInfo', action.recordTypeInfo)
        break

      case patientRecordInfo.AUDITING_RECORD_INFO + phase.SUCCESS:
        nextIState = iState.set('auditingStatus', action.newStatus)
        break

      case patientRecordInfo.CLEAR_AUDITING_STATUS:
        nextIState = iState.set('auditingStatus', '')
        break

      case patientRecordInfo.UPDATE_REMARK + phase.SUCCESS:
        const {extendId, newRemark} = action
        nextIState = _updateList(iState, extendId, item => item.set('remark', newRemark)).set('updateRemarkSuccess', true)
        break

      case patientRecordInfo.CLEAR_REMARK_UPDATE_SUCCESS:
        nextIState = iState.set('updateRemarkSuccess', false)
        break

      default:
        break
    }
    if (nextIState === iState) {
      return state
    }
    return nextIState.toJS()
  }

  // --------------------------------------

  function updateRemarkSuccess() {
    let {id, remarkType, remark} = action
    if (remarkType != constants.remarkFlag.PATIENT_EDIT) {
      return iState
    }
    return _updateList(iState, id, patient => patient.set('remark', remark))
  }

  // -------------------------------------

  function _updateList(curIState, id, callback) {
    const list = curIState.get('list')
    const match = list.find(patient => patient.get('extend_Id') == id)
    if (!match) {
      console.warn('no match')
      return curIState
    }
    return curIState.update('list', list => list.update(list.indexOf(match), patient => callback(patient)))
  }
}
