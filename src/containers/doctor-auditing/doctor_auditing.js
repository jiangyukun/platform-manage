/**
 * Created by jiangyukun on 2016/12/1.
 */
import {fromJS} from 'immutable'
import {doctorAuditing} from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'
import {updateList} from '../../core/reduxUtils'

const defaultValue = {
  total: 0,
  list: [],
  loading: false,
  visitStatusUpdateSuccess: false,
  remarkUpdateSuccess: false
}

export function doctor_auditing(state = defaultValue, action) {
  const iState = fromJS(state)

  return nextState()

  function nextState() {
    let nextIState = iState

    switch (action.type) {
      case doctorAuditing.FETCH_LIST + phase.START:
        nextIState = iState.set('loading', true)
        break

      case doctorAuditing.FETCH_LIST + phase.SUCCESS:
        nextIState = fetchDoctorPaginateListSuccess()
        break

      case doctorAuditing.UPDATE_REMARK + phase.SUCCESS:
        nextIState = updateRemarkSuccess()
        break

      case doctorAuditing.CLEAR_UPDATE_REMARK:
        nextIState = iState.set('remarkUpdateSuccess', false)
        break

      case doctorAuditing.UPDATE_DOCTOR_INFO + phase.SUCCESS:
        nextIState = updateDoctorInfoSuccess()
        break

      case doctorAuditing.UPDATE_AUDITING_STATUS + phase.SUCCESS:
        nextIState = updateDoctorAuditingStateSuccess()
        break

      case doctorAuditing.UPDATE_VISIT_STATUS + phase.SUCCESS:
        const {mobile, newStatus} = action
        nextIState = updateList(iState, 'phone', mobile, doctor => doctor.set('is_Complete_Visit', newStatus))
          .set('visitStatusUpdateSuccess', true)
        break

      case doctorAuditing.CLEAR_VISIT_STATUS:
        nextIState = iState.set('visitStatusUpdateSuccess', false)
        break

      default:
        break
    }
    if (nextIState == iState) {
      return state
    }
    return nextIState.toJS()
  }

  // --------------------------------------

  function fetchDoctorPaginateListSuccess() {
    let {total, list} = action
    return iState.set('total', total).set('list', list).set('loading', false)
  }

  function updateRemarkSuccess() {
    let {userId, remark} = action
    return updateList(iState, 'user_Id', userId, doctor => doctor.set('doctor_Info_Remark', remark)).set('remarkUpdateSuccess', true)
  }

  function updateDoctorInfoSuccess() {
    const {
      hospital_Id,
      doctor_Department,
      doctor_Title,
      doctor_Id,
      doctor_Name,
      doctor_Major,
      doctor_Photo,
      doctor_Practicing_Photo,
      is_Doctor_Purview
    } = action.option
    const {
      hospitalName, positionName, departmentName
    } = action.option1
    return updateList(iState, 'doctor_Id', doctor_Id, doctor => doctor
      .set('doctor_Name', doctor_Name)
      .set('hid', hospital_Id)
      .set('hospital_Id', hospitalName)
      .set('did', doctor_Department)
      .set('department_Id', departmentName)
      .set('title_Id', positionName)
      .set('tid', doctor_Title)
      .set('doctor_Major', doctor_Major)
      .set('doctor_Photo', doctor_Photo)
      .set('doctor_Practicing_Photo', doctor_Practicing_Photo)
      .set('is_Doctor_Purview', is_Doctor_Purview)
    )
  }

  function updateDoctorAuditingStateSuccess() {
    const {doctorId, newAuditingState} = action
    return updateList(iState, 'doctor_Id', doctorId, doctor => doctor.set('doctor_Is_Checked', newAuditingState))
  }

}
