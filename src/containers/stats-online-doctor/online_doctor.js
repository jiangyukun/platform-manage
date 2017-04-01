/**
 * Created by jiangyukun on 2016/12/29
 */
import {fromJS} from 'immutable'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'

const defaultValue = {
  total: 0,
  list: [],
  loading: false,
  statisticsInfo: {},
  remarkUpdated: false,
  statisticsValueUpdated: false
}

export function onlineDoctor(state = defaultValue, action) {
  const iState = fromJS(state)

  return nextState()

  function nextState() {
    let nextIState = iState

    switch (action.type) {
      case types.onlineDoctor.FETCH_LIST + phase.START:
        nextIState = fetchListStart()
        break

      case types.onlineDoctor.FETCH_LIST + phase.SUCCESS:
        nextIState = fetchListSuccess()
        break

      case types.onlineDoctor.UPDATE_REMARK + phase.SUCCESS:
        nextIState = updateRemarkSuccess()
        break

      case types.onlineDoctor.FETCH_STATISTICS_INFO + phase.START:
        nextIState = iState.set('statisticsInfo', {})
        break

      case types.onlineDoctor.FETCH_STATISTICS_INFO + phase.SUCCESS:
        nextIState = fetchStatisticsInfoSuccess()
        break

      case types.onlineDoctor.UPDATE_IS_STATISTICS + phase.SUCCESS:
        const {id, isStatistics} = action
        nextIState = _updateList(iState, id, onlineDoctor => onlineDoctor.set('is_Statistics', isStatistics))
          .set('statisticsValueUpdated', true)
        break

      case types.onlineDoctor.CLEAR_REMARK:
        nextIState = iState.set('remarkUpdated', false)
        break

      case types.onlineDoctor.CLEAR_STATISTICS_UPDATED:
        nextIState = iState.set('statisticsValueUpdated', false)
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
