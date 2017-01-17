/**
 * Created by jiangyukun on 2016/12/29.
 */
import {GET, POST} from '../../services/http'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'

//获取省列表
export let fetchSmsPaginateList = dispatch => option => {
    return new Promise((resolve, reject) => {
        POST('/sms/list', {body: option}).then(result => {
            const list = result['list']
            const total = result['total']
            dispatch({
                type: types.FETCH_SMS_PAGINATE_LIST + phase.SUCCESS, list, total
            })
            resolve()
        }, err => reject(err))
    })
}

export let fetchUserTypeAndName = dispatch => mobile => {
    return new Promise((resolve, reject) => {
        GET(`/sms/userBasicInfo?mobile=${mobile}`).then(result => {
            dispatch({
                type: types.FETCH_USER_TYPE_AND_NAME + phase.SUCCESS
            })
            resolve(result)
        }, err => reject(err))
    })
}

export let fetchSmsTemplateList = dispatch => () => {
    return new Promise((resolve, reject) => {
        GET('/sms/allSmsTemplate').then(result => {
            const smsTemplateList = result.map(template => {
                return {
                    value: template['tpl_id'], text: template['tpl_content'], status: template['check_status']
                }
            })
            dispatch({
                type: types.FETCH_ALL_SMS_TEMPLATE + phase.SUCCESS, smsTemplateList
            })
            resolve(result)
        }, err => reject(err))
    })
}

export let addSmsTemplate = dispatch => smsTemplateContent => {
    return new Promise((resolve, reject) => {
        POST('/sms/addSmsTemplate', {body: {content: smsTemplateContent}}).then(result => {
            dispatch({
                type: types.ADD_SMS_TEMPLATE + phase.SUCCESS
            })
            resolve(result)
        }, err => reject(err))
    })
}

export let sendSmsMessage = dispatch => (mobile, content) => {
    return new Promise((resolve, reject) => {
        POST(`/sms/sendSms`, {body: {mobile, content}}).then(result => {
            dispatch({
                type: types.SEND_SMS_MESSAGE + phase.SUCCESS
            })
            resolve(result)
        }, err => reject(err))
    })
}
