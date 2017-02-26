/**
 * Created by jiangyukun on 2016/12/29.
 */
import {GET, POST} from '../../services/http'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'
import {THREE_PHASE} from '../../middleware/request_3_phase'

export function fetchSmsPaginateList(option) {
  return {
    [THREE_PHASE]: {
      type: types.FETCH_SMS_PAGINATE_LIST,
      http: () => POST('/sms/list', {body: option}),
      handleResponse: response => ({
        list: response['list'], total: response['total']
      })
    }
  }
}

export function fetchUserTypeAndName(mobile) {
  return {
    [THREE_PHASE]: {
      type: types.FETCH_USER_TYPE_AND_NAME,
      http: () => GET(`/sms/userBasicInfo?mobile=${mobile}`),
      handleResponse: response => response
    }
  }
}

export function fetchSmsTemplateList() {
  return {
    [THREE_PHASE]: {
      type: types.FETCH_ALL_SMS_TEMPLATE,
      http: () => GET('/sms/allSmsTemplate'),
      handleResponse: response => ({
        smsTemplateList: response.map(template => {
          return {
            value: template['tpl_id'], text: template['tpl_content'], status: template['check_status']
          }
        })
      })
    }
  }
}

export function addSmsTemplate(smsTemplateContent) {
  return {
    [THREE_PHASE]: {
      type: types.ADD_SMS_TEMPLATE,
      http: () => POST('/sms/addSmsTemplate', {body: {content: smsTemplateContent}}),
      handleResponse: response => null
    }
  }
}

export function sendSmsMessage(mobile, content) {
  return {
    [THREE_PHASE]: {
      type: types.SEND_SMS_MESSAGE,
      http: () => POST(`/sms/sendSms`, {body: {mobile, content}}),
      handleResponse: response => null
    }
  }
}
