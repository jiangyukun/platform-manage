/**
 * Created by jiangyukun on 2016/11/26.
 */

import http from '../services/http'

export function fetchHospitalList() {
    return dispatch => {

        http('/web/getHospitals').then(response => response.json()).then(result => {
            let hospitalList = result.data
            hospitalList = hospitalList.map(hospital => {
                return {
                    value: hospital['hospital_Id'],
                    text: hospital['hospital_Name']
                }
            })
            dispatch({
                type: 'FETCH_HOSPITAL_LIST_SUCCESS',
                hospitalList
            })
        })
        dispatch({
            type: 'FETCH_HOSPITAL_LIST_START'
        })
    }
}
