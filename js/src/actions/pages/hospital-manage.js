/**
 * Created by jiangyukun on 2016/11/30.
 */
import http from '../../services/http'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'

//获取省列表
export function fetchProvinceList(option) {
    return dispatch => {
        dispatch({
            type: types.FETCH_PROVINCE_LIST + phase.START
        })
        http('', {
            method: 'POST',
            body: option
        }).then(response => response.json()).then((provinceList) => {
            dispatch({
                type: types.FETCH_PROVINCE_LIST + phase.FAILURE, provinceList
            })
        })

    }
}

//获取市列表
export function fetchCityList(option) {
    return dispatch => {
        dispatch({
            type: types.FETCH_CITY_LIST + phase.START
        })
        http('', {
            method: 'POST',
            body: option
        }).then(response => response.json()).then((cityList) => {
            dispatch({
                type: types.FETCH_CITY_LIST + phase.SUCCESS, cityList
            })
        })
    }
}

//获取医院列表
export let fetchHospitalList = dispatch => option => {
    dispatch({
        type: types.FETCH_HOSPITAL_MANAGE_LIST + phase.START
    })

    http('/web/getBackendHospitalList', {
        method: 'POST',
        body: option
    }).then(response => response.json()).then(({status, rspMsg, data}) => {
        if (status != 0) {
            dispatch({
                type: types.FETCH_HOSPITAL_MANAGE_LIST + phase.FAILURE, rspMsg
            })
            return
        }
        let {totalCount, list} = data
        dispatch({
            type: types.FETCH_HOSPITAL_MANAGE_LIST + phase.SUCCESS, totalCount, list
        })
    })
}
