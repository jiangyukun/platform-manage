/**
 * Created by jiangyu2016 on 16/10/16.
 */
import http, {GET, POST, PATCH} from '../../services/http'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'
import {toRemarkTypeRequestKey, toCompleteVisitTypeRequestKey} from '../../core/pages/nodeAuditingHelper'

export let fetchPatientList = dispatch => option => {
  let url = '/web/patient/check/list/'

  dispatch({type: types.FETCH_PATIENT_LIST + phase.START})
  return new Promise((resolve, reject) => {
    http(url, {
      method: 'POST',
      body: option
    }).then(response => response.json()).then((patientListInfo) => {
      resolve()
      dispatch({
        type: types.FETCH_PATIENT_LIST + phase.SUCCESS, patientListInfo
      })
    })
  })
}

export let editVisitCardState = dispatch => (id, state) => {
  return new Promise((resolve, reject) => {
    POST('/web/patient/visitCard/update', {
      body: {
        userdId: id, status: state
      }
    }).then(result => {
      resolve()
      dispatch({
        type: types.UPDATE_VISIT_CARD + phase.SUCCESS, id, state
      })
    }, err => {
      console.log(err)
      reject()
    })
  })
}

export let editRemark = dispatch => (id, remarkType, remark) => {
  let remarkKey = toRemarkTypeRequestKey(remarkType)
  return new Promise((resolve, reject) => {
    POST('/web/patient/check/contact/situation/update', {
      body: {
        user_Id: id, [remarkKey]: remark
      }
    }).then(result => {
      resolve()
      dispatch({
        type: types.UPDATE_NODE_AUDITING_REMARK + phase.SUCCESS, id, remarkType, remark
      })
    }, err => {
      console.log(err)
      reject()
    })
  })
}

export let editIsCompleteVisit = dispatch => (id, visitCardType, newVisitCardState) => {
  let visitKey = toCompleteVisitTypeRequestKey(visitCardType)
  return new Promise((resolve, reject) => {
    POST('/web/patient/check/contact/situation/update', {
      body: {
        user_Id: id, [visitKey]: newVisitCardState
      }
    }).then(result => {
      resolve()
      dispatch({
        type: types.UPDATE_IS_COMPLETE_VISIT + phase.SUCCESS, id, visitCardType, newVisitCardState
      })
    }, err => {
      console.log(err)
      reject()
    })
  })
}

export let fetchPatientInfo = dispatch => patientId => {
  dispatch({
    type: types.FETCH_PATIENT_INFO + phase.START
  })
  return new Promise((resolve, reject) => {
    GET(`/web/getPatientInfoByid/${patientId}`).then(result => {
      const patientInfo = result
      dispatch({
        type: types.FETCH_PATIENT_INFO + phase.SUCCESS
      })
      resolve(patientInfo)
    }, err => {
      dispatch({
        type: types.FETCH_PATIENT_INFO + phase.FAILURE, err
      })
      reject(err)
    })
  })
}

export let updateAuditingState = dispatch => (infoId, patientId, newAuditingState) => {
  dispatch({
    type: types.UPDATE_AUDITING_STATE + phase.START
  })
  return new Promise((resolve, reject) => {
    PATCH(`/web/checkedPatientInfo/${infoId}/${newAuditingState}`).then(() => {
      dispatch({
        type: types.UPDATE_AUDITING_STATE + phase.SUCCESS, patientId, newAuditingState
      })
      resolve()
    }, err => {
      dispatch({
        type: types.UPDATE_AUDITING_STATE + phase.FAILURE, err
      })
      reject(err)
    })
  })
}

export let updatePatientInfo = dispatch => (patientInfo) => {
  return new Promise((resolve, reject) => {
    POST('/web/updatePatientInfo_version_3', {body: patientInfo}).then(result => {
      dispatch({
        type: types.UPDATE_PATIENT_INFO + phase.SUCCESS, patientInfo
      })
      resolve(result)
    }, err => {
      dispatch({
        type: types.UPDATE_PATIENT_INFO + phase.FAILURE, err
      })
      reject(err)
    })
  })
}
