/**
 * Created by jiangyukun on 2016/12/22.
 */
import {GET, POST} from '../../services/http'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'

export let updateRemark = dispatch => (id, updateRemarkId, remarkType, remark) => {
    dispatch({
        type: types.UPDATE_REMARK + phase.START
    })

    return new Promise((resolve, reject) => {
        POST(`/web/updateRemark/${updateRemarkId}/${remarkType}?remark=${remark}`).then(() => {
            resolve()
            dispatch({
                type: types.UPDATE_REMARK + phase.SUCCESS, id, remarkType, remark
            })
        }, err => reject(err))
    })
}
