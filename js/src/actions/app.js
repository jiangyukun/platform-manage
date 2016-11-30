/**
 * Created by jiangyukun on 2016/11/29.
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
