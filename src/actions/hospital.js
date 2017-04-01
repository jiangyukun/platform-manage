/**
 * Created by jiangyukun on 2016/11/26.
 */
import {GET} from '../services/http'
import * as types from '../constants/ActionTypes'
import * as phase from '../constants/PhaseConstant'
import {THREE_PHASE} from '../middleware/request_3_phase'

export let fetchHospitalList = dispatch => () => {
  GET('/web/getHospitals').then(hospitalList => {
    hospitalList = hospitalList.map(hospital => {
      return {
        value: hospital['hospital_Id'],
        text: hospital['hospital_Name']
      }
    })
    dispatch({
      type: types.FETCH_HOSPITAL_LIST + phase.SUCCESS, hospitalList
    })
  })

}

export function fetchHospitalList1() {
  return {
    [THREE_PHASE]: {
      type: types.FETCH_HOSPITAL_LIST,
      http: () => GET('/web/getHospitals'),
      handleResponse: response => ({
        hospitalList: response.map(hospital => {
          return {
            value: hospital['hospital_Id'],
            text: hospital['hospital_Name']
          }
        })
      })
    }
  }
}