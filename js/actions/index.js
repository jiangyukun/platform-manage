/**
 * Created by jiangyu2016 on 16/10/16.
 */
import http from '../services/http'

export function fetchDoctorList(option) {
    let {start, length} = option
    return dispatch => {
        http('/fetchDoctorList/' + start + '/' + length).then(response => {
            return response.json()
        }).then((doctorListInfo) => {
            dispatch({
                type: 'fetchDoctorList', doctorListInfo
            })
        })
    }
}

export let fetchPatientList = dispatch => option => {
    http('/web/patient/check/list/', {
        method: 'POST',
        body: option
    }).then(response => response.json()).then((patientListInfo) => {
        dispatch({
            type: 'fetchPatientList', patientListInfo
        })
    })
}
