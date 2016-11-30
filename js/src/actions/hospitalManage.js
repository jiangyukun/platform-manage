/**
 * Created by jiangyukun on 2016/11/30.
 */
import http from '../services/http'

//获取省列表
export function fetchProvinceList(option) {
    return dispatch => {
        dispatch({
            type: 'FETCH_PROVINCE_LIST_START'
        })
        http('', {
            method: 'POST',
            body: option
        }).then(response => response.json()).then((provinceList) => {
            dispatch({
                type: 'FETCH_PROVINCE_LIST_SUCCESS', provinceList
            })
        })

    }
}

//获取市列表
export function fetchCityList(option) {
    return dispatch => {
        dispatch({
            type: 'FETCH_CITY_LIST_START'
        })
        http('', {
            method: 'POST',
            body: option
        }).then(response => response.json()).then((cityList) => {
            dispatch({
                type: 'FETCH_CITY_LIST_SUCCESS', cityList
            })
        })

    }
}

//获取医院列表
export let fetchHospitalList = dispatch => (option) => {

    dispatch({
        type: 'FETCH_HOSPITAL_MANAGE_LIST_START'
    })
    http('/web/getBackendHospitalList', {
        method: 'POST',
        body: option
    }).then(response => response.json()).then((hospitalListInfo) => {
        console.log(hospitalListInfo);
        dispatch({
            type: 'FETCH_HOSPITAL_MANAGE_LIST_SUCCESS', hospitalListInfo
        })
    })
}
