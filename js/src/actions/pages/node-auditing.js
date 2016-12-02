/**
 * Created by jiangyu2016 on 16/10/16.
 */
import http, {POST} from '../../services/http'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'
import {toRemarkTypeRequestKey, toCompleteVisitTypeRequestKey} from '../../core/pages/nodeAuditingHelper'

export let fetchPatientList = dispatch => option => {
    return new Promise((resolve, reject) => {
        http('/web/patient/check/list/', {
            method: 'POST',
            body: option
        }).then(response => response.json()).then((patientListInfo) => {
            resolve()
            dispatch({
                type: types.FETCH_PATIENT_LIST + phase.SUCCESS, patientListInfo
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
                type: types.UPDATE_VISIT_CARD + phase.SUCCESS, id, state
            })
        }, err => {
            console.log(err)
            reject()
        })
    })
}

export let editRemark = dispatch => (id, remarkType, remark) => {
    let remarkKey = toRemarkTypeRequestKey(remarkType)
    return new Promise((resolve, reject) => {
        POST('/web/patient/check/contact/situation/update', {
            body: {
                user_Id: id, [remarkKey]: remark
            }
        }).then(result => {
            resolve()
            dispatch({
                type: types.UPDATE_NODE_AUDITING_REMARK + phase.SUCCESS, id, remarkType, remark
            })
        }, err => {
            console.log(err)
            reject()
        })
    })
}

export let editIsCompleteVisit = dispatch => (id, visitCardType, newVisitCardState) => {
    let visitKey = toCompleteVisitTypeRequestKey(visitCardType)
    return new Promise((resolve, reject) => {
        POST('/web/patient/check/contact/situation/update', {
            body: {
                user_Id: id, [visitKey]: newVisitCardState
            }
        }).then(result => {
            resolve()
            dispatch({
                type: types.UPDATE_IS_COMPLETE_VISIT + phase.SUCCESS, id, visitCardType, newVisitCardState
            })
        }, err => {
            console.log(err)
            reject()
        })
    })
}
