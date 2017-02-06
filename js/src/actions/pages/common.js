/**
 * Created by jiangyukun on 2016/12/22.
 */
import {GET, POST} from '../../services/http'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'

export let updateRemark = dispatch => (id, updateRemarkId, remarkType, remark) => {
  dispatch({
    type: types.UPDATE_REMARK + phase.START
  })

  return new Promise((resolve, reject) => {
    POST(`/web/updateRemark/${updateRemarkId}/${remarkType}?remark=${remark}`).then(() => {
      resolve()
      dispatch({
        type: types.UPDATE_REMARK + phase.SUCCESS, id, remarkType, remark
      })
    }, err => reject(err))
  })
}

export let fetchPositionList = dispatch => () => {
  return new Promise((resolve, reject) => {
    GET('/web/getDoctorTitles').then(result => {
      const positionList = result.map(position => {
        return {
          value: position['title_Id'],
          text: position['title_Name']
        }
      })
      resolve()
      dispatch({
        type: types.FETCH_POSITION_LIST + phase.SUCCESS, positionList
      })
    }, err => reject(err))
  })

}

export let fetchDepartmentList = dispatch => () => {
  return new Promise((resolve, reject) => {
    GET('/web/getDepartments').then(result => {
      const departmentList = result.map(department => {
        return {
          value: department['department_Id'],
          text: department['department_Name']
        }
      })
      resolve()
      dispatch({
        type: types.FETCH_DEPARTMENT_LIST + phase.SUCCESS, departmentList
      })
    }, err => reject(err))
  })
}
