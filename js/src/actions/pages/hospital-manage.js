/**
 * Created by jiangyukun on 2016/11/30.
 */
import {GET, POST} from '../../services/http'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'

//获取省列表
export let fetchProvinceList = dispatch => () => {
  dispatch({
    type: types.FETCH_PROVINCE_LIST + phase.START
  })
  GET('/web/getCityProvinces').then((provinceList) => {
    provinceList = provinceList.map(provinceDto => {
      return {
        value: provinceDto['province_Id'],
        text: provinceDto['province_Name']
      }
    })
    dispatch({
      type: types.FETCH_PROVINCE_LIST + phase.SUCCESS, provinceList
    })
  })
}

//获取市列表
export let fetchCityList = dispatch => provinceId => {
  dispatch({
    type: types.FETCH_CITY_LIST + phase.START
  })
  GET(`/web/getCitys/${provinceId}`).then((cityList) => {
    cityList = cityList.map(cityDto => {
      return {
        value: cityDto['id'],
        text: cityDto['city_Name']
      }
    })
    dispatch({
      type: types.FETCH_CITY_LIST + phase.SUCCESS, provinceId, cityList
    })
  })
}

//获取医院列表
export let fetchHospitalList = dispatch => option => {
  dispatch({
    type: types.FETCH_HOSPITAL_MANAGE_LIST + phase.START
  })
  return new Promise((resolve, reject) => {
    POST('/web/getBackendHospitalList', {body: option}).then(result => {
      let {totalCount, list} = result
      dispatch({
        type: types.FETCH_HOSPITAL_MANAGE_LIST + phase.SUCCESS, totalCount, list
      })
      resolve()
    }, err => {
      dispatch({
        type: types.FETCH_HOSPITAL_MANAGE_LIST + phase.FAILURE, err
      })
      reject(err)
    })
  })

}

//添加医院
export let addHospital = dispatch => option => {
  dispatch({
    type: types.ADD_HOSPITAL + phase.START
  })
  return new Promise((resolve, reject) => {
    POST('/web/addHospital', {body: option}).then(result => {
      dispatch({
        type: types.ADD_HOSPITAL + phase.SUCCESS
      })
      resolve()
    }, err => {
      dispatch({
        type: types.ADD_HOSPITAL + phase.FAILURE, err
      })
      reject(err)
    })
  })
}

export let fetchHospitalInfo = dispatch => hospitalId => {
  dispatch({
    type: types.FETCH_HOSPITAL_INFO + phase.START
  })
  return new Promise((resolve, reject) => {
    GET(`/web/getBackendHospitalById/${hospitalId}`).then(result => {
      dispatch({
        type: types.FETCH_HOSPITAL_INFO + phase.SUCCESS, hospitalId
      })
      resolve(result)
    }, err => {
      dispatch({
        type: types.FETCH_HOSPITAL_INFO + phase.FAILURE, err
      })
      reject(err)
    })
  })
}

export let updateHospitalInfo = dispatch => newHospitalInfo => {
  dispatch({
    type: types.UPDATE_HOSPITAL_INFO + phase.START
  })
  return new Promise((resolve, reject) => {
    POST(`/web/updateBackendHospital`, {body: newHospitalInfo}).then(result => {
      dispatch({
        type: types.UPDATE_HOSPITAL_INFO + phase.SUCCESS, newHospitalInfo
      })
      resolve(result)
    }, err => {
      dispatch({
        type: types.UPDATE_HOSPITAL_INFO + phase.FAILURE, err
      })
      reject(err)
    })
  })
}

export let fetchCityMaxSerialNumber = dispatch => cityId => {
  dispatch({
    type: types.FETCH_CITY_MAX_SERIAL_NUMBER + phase.START
  })
  return new Promise((resolve, reject) => {
    GET(`/web/getMaxCode/${cityId}`).then(result => {
      const maxSerialNumber = result
      dispatch({
        type: types.FETCH_CITY_MAX_SERIAL_NUMBER + phase.SUCCESS, maxSerialNumber
      })
      resolve(maxSerialNumber)
    }, err => {
      dispatch({
        type: types.FETCH_CITY_MAX_SERIAL_NUMBER + phase.FAILURE, err
      })
      reject(err)
    })
  })
}
