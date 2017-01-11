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
