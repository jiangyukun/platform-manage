/**
 * Created by jiangyu2016 on 16/10/16.
 */
import http from '../services/http'

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
