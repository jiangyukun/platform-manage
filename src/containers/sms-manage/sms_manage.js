/**
 * Created by jiangyukun on 2016/12/29
 */
import {fromJS} from 'immutable'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'
import * as formatBusData from '../../core/formatBusData'

const defaultValue = {
  total: 0,
  list: [],
  loading: false,
  userInfo: {
    username: '', userType: ''
  },
  templateAddSuccessFlag: false,
  sendSmsSuccessFlag: false
}

export function smsManage(state = defaultValue, action) {
  const iState = fromJS(state)

  return nextState()

  function nextState() {
    let nextIState = iState

    switch (action.type) {
      case types.FETCH_SMS_PAGINATE_LIST + phase.START:
        nextIState = iState.set('loading', true)
        break

      case types.FETCH_SMS_PAGINATE_LIST + phase.FAILURE:
        nextIState = iState.set('loading', false)
        break

      case types.FETCH_SMS_PAGINATE_LIST + phase.SUCCESS:
        nextIState = fetchSmsPaginateListSuccess()
        break

      case types.ADD_SMS_TEMPLATE + phase.SUCCESS:
        nextIState = iState.set('templateAddSuccessFlag', true)
        break

      case types.CLEAR_ADD_SMS_TEMPLATE_SUCCESS:
        nextIState = iState.set('templateAddSuccessFlag', false)
        break

      case types.SEND_SMS_MESSAGE + phase.SUCCESS:
        nextIState = iState.set('sendSmsSuccessFlag', true)
        break

      case types.CLEAR_SEND_SMS_SUCCESS:
        nextIState = iState.set('sendSmsSuccessFlag', false)
        break

      case types.FETCH_USER_TYPE_AND_NAME + phase.START:
        nextIState = iState.set('userInfo', fromJS({username: '', userType: ''}))
        break

      case types.FETCH_USER_TYPE_AND_NAME + phase.SUCCESS:
        const {name, userType} = action
        nextIState = iState.set('userInfo', fromJS({username: name, userType: formatBusData.getUserType(userType)}))
        break

      case types.FETCH_USER_TYPE_AND_NAME + phase.FAILURE:
        nextIState = iState.set('userInfo', fromJS({username: '无此用户', userType: '无此用户'}))
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

  function fetchSmsPaginateListSuccess() {
    let {total, list} = action
    return iState.set('total', total).set('list', list).set('loading', false)
  }
}
