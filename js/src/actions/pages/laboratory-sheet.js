/**
 * Created by jiangyukun on 2016/12/15.
 */
import {GET, POST} from '../../services/http'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'

export let fetchLaboratorySheetList = dispatch => options => {
    return new Promise((resolve, reject) => {
        POST('/archives/assay/queryAssayList', {body: options}).then(result => {
            let {totalCount, list} = result
            dispatch({
                type: types.FETCH_LABORATORY_SHEET_LIST + phase.SUCCESS, totalCount, list
            })
            resolve()
        }, err => {
            dispatch({
                type: types.FETCH_LABORATORY_SHEET_LIST + phase.FAILURE, err
            })
            reject(err)
        })
    })
}
