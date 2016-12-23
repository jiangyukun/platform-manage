/**
 * Created by jiangyukun on 2016/11/30.
 */
import {GET, POST, PUT, PATCH} from '../../services/http'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'

//获取分页列表
export let fetchDoctorPaginateList = dispatch => option => {
    dispatch({
        type: types.FETCH_DOCTOR_PAGINATE_LIST + phase.START
    })
    return new Promise((resolve, reject) => {
        POST('/web/getDoctorInfos', {body: option}).then((doctorListInfo) => {
            const total = doctorListInfo['totalCount'] || 0
            const list = doctorListInfo['list'] || []
            dispatch({
                type: types.FETCH_DOCTOR_PAGINATE_LIST + phase.SUCCESS, total, list
            })
            resolve()
        }, err => reject(err))
    })
}

export let updateDoctorAuditingState = dispatch => (doctorId, newAuditingState) => {
    dispatch({
        type: types.UPDATE_DOCTOR_AUDITING_STATE + phase.START
    })
    return new Promise((resolve, reject) => {
        PUT(`/web/checkedDoctorInfo/${doctorId}/${newAuditingState}`).then(() => {
            dispatch({
                type: types.UPDATE_DOCTOR_AUDITING_STATE + phase.SUCCESS, doctorId, newAuditingState
            })
            resolve()
        }, err => reject(err))
    })
}

export let updateDoctorInfo = dispatch => option => {
    dispatch({
        type: types.UPDATE_DOCTOR_INFO + phase.START
    })
    return new Promise((resolve, reject) => {
        PATCH(`/web/updateDoctorInfo`, {body: option}).then(() => {
            dispatch({
                type: types.UPDATE_DOCTOR_INFO + phase.SUCCESS, doctorId, newAuditingState
            })
            resolve()
        }, err => reject(err))
    })
}

export let addNewDoctor = dispatch => option => {
    dispatch({
        type: types.ADD_NEW_DOCTOR + phase.START
    })
    return new Promise((resolve, reject) => {
        POST(`/web/addDoctorInfo`, {body: option}).then(() => {
            dispatch({
                type: types.ADD_NEW_DOCTOR + phase.SUCCESS, option
            })
            resolve()
        }, err => reject(err))
    })
}
