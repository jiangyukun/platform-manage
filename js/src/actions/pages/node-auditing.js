/**
 * Created by jiangyu2016 on 16/10/16.
 */
import http, {POST} from '../../services/http'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'

export let fetchPatientList = dispatch => option => {
    return new Promise((resolve, reject) => {
        http('/web/patient/check/list/', {
            method: 'POST',
            body: option
        }).then(response => response.json()).then((patientListInfo) => {
            resolve()
            dispatch({
                type: 'fetchPatientList', patientListInfo
            })
        })
    })
}

export let editVisitCardState = dispatch => (id, state) => {
    return new Promise((resolve, reject) => {
        POST('/web/patient/visitCard/update', {
            body: {
                userdId: id, status: state
            }
        }).then(result => {
            resolve()
            dispatch({
                type: types.UPDATE_VISIT_CARD + phase.SUCCESS
            })
        }, err => {
            console.log(err)
            reject()
        })
    })
}
