/**
 * Created by jiangyukun on 2016/12/8.
 */
import {GET} from '../../services/http'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'

export let fetchPatientSituationList = dispatch => pageInfo => {
    let {start, length} = pageInfo
    dispatch({
        type: types.FETCH_PATIENT_SITUATION_LIST + phase.START
    })

    return new Promise((resolve, reject) => {
        GET(`/patientReport/getPatientInfoReport/${start}/${length}`).then(result => {
            let total = result['totalCount']
            let list = result['list']
            dispatch({
                type: types.FETCH_PATIENT_SITUATION_LIST + phase.SUCCESS, total, list
            })
            resolve(result)
        }, err => {
            reject(err)
        })
    })
}
