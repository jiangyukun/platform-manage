/**
 * Created by jiangyukun on 2016/12/29.
 */
import {GET, POST} from '../../services/http'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'

export function fetchOutPatientTimePaginateList(option) {
    return dispatch => {
        dispatch({
            type: types.FETCH_OUT_PATIENT_TIME_PAGINATE_LIST + phase.START
        })

        POST(`/clinicTime/getDoctorListByScreen`, {body: option}).then(result => {
            const list = result['allDoctorInfoList']
            const total = result['count']
            dispatch({
                type: types.FETCH_OUT_PATIENT_TIME_PAGINATE_LIST + phase.SUCCESS, list, total
            })
        }, err => {
            dispatch({
                type: types.FETCH_OUT_PATIENT_TIME_PAGINATE_LIST + phase.FAILURE, err
            })
        })
    }
}

// 获取医生门诊时间
export function fetchDoctorDateDetail(userId) {
    return dispatch => {
        dispatch({
            type: types.FETCH_DOCTOR_DATE_DETAIL + phase.START
        })

        GET(`/clinicTime/getDoctorShortNoticeRecord/${userId}`).then(result => {
            const doctorName = result['doctor_name']
            const hospital = result['hospital']
            const detailList = result['shortNoticeRecordList']

            dispatch({
                type: types.FETCH_DOCTOR_DATE_DETAIL + phase.SUCCESS, doctorName, hospital, detailList
            })
        }, err => {
            dispatch({
                type: types.FETCH_DOCTOR_DATE_DETAIL + phase.FAILURE, err
            })
        })
    }
}

// 更新医生门诊时间备注
export function updateRemark(userId, doctorMobile, newRemark) {
    return dispatch => {
        dispatch({
            type: types.UPDATE_OUT_PATIENT_REMARK + phase.START
        })

        POST(`/clinicTime/updateBackendRemark`, {body: {'user_id': userId, 'doctor_phone': doctorMobile, 'remark': newRemark}}).then(result => {
            dispatch({
                type: types.UPDATE_OUT_PATIENT_REMARK + phase.SUCCESS, userId, newRemark
            })
        }, err => {
            dispatch({
                type: types.UPDATE_OUT_PATIENT_REMARK + phase.FAILURE, err
            })
        })
    }
}
