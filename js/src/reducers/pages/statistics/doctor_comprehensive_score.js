/**
 * Created by jiangyukun on 2016/12/29
 */
import {fromJS} from 'immutable'
import * as types from '../../../constants/ActionTypes'
import * as phase from '../../../constants/PhaseConstant'

const defaultValue = {total: 0, list: [], statisticsList: [], remarkUpdated: false}

export function doctorComprehensiveScoreList(state = defaultValue, action) {
  const iState = fromJS(state)

  return nextState()

  function nextState() {
    let nextIState = iState

    switch (action.type) {
      case types.FETCH_DOCTOR_COMPREHENSIVE_SCORE_PAGINATE_LIST + phase.SUCCESS:
        nextIState = fetchDcotorComprehensiveScoreListSuccess()
        break

      case types.CLEAR_DOCTOR_COMPREHENSIVE_SCORE_REMARK:
        nextIState = clearDoctorComprehensiveScoreRemark()
        break

      case types.UPDATE_DOCTOR_COMPREHENSIVE_SCORE_REMARK + phase.SUCCESS:
        nextIState = updateRemarkSuccess()
        break

      case types.FETCH_DOCTOR_STATISTICS_LIST + phase.SUCCESS:
        nextIState = fetchDoctorStatisticsList()
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

  function fetchDcotorComprehensiveScoreListSuccess() {
    let {total, list} = action
    return iState.set('total', total).set('list', list)
  }

  function updateRemarkSuccess() {
    const {doctorId, newRemark} = action
    return _updateList(iState.set('remarkUpdated', true), doctorId, record => record.set('doctor_Score_Remark', newRemark))
  }

  function clearDoctorComprehensiveScoreRemark() {
    return iState.set('remarkUpdated', false)
  }

  function fetchDoctorStatisticsList() {
    return iState.set('statisticsList', action.list)
  }

  // -------------------------------------------------

  function _updateList(curIState, id, callback) {
    const list = curIState.get('list')
    const match = list.find(hospital => hospital.get('doctor_User_Id') == id)
    if (!match) {
      console.log('item not found which the id specify')
    }
    return curIState.update('list', list => list.update(list.indexOf(match), hospital => callback(hospital)))
  }

}
