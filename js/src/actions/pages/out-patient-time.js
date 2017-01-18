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
            const list = result['list']
            const total = result['total']
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
