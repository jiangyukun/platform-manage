/**
 * Created by jiangyukun on 2016/12/1.
 */
import {fromJS} from 'immutable'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'
import constants from '../../core/constants'

const defaultValue = {total: 0, list: []}

export function doctorAuditingPaginateList(state = defaultValue, action) {
    const iState = fromJS(state)

    return nextState()

    function nextState() {
        let nextIState = iState

        switch (action.type) {
            case types.FETCH_DOCTOR_PAGINATE_LIST + phase.SUCCESS:
                nextIState = fetchDoctorPaginateListSuccess()
                break

            case types.UPDATE_REMARK + phase.SUCCESS:
                nextIState = updateRemarkSuccess()
                break

            case types.UPDATE_DOCTOR_INFO + phase.SUCCESS:
                nextIState = updateDoctorInfoSuccess()
                break

            case types.UPDATE_DOCTOR_AUDITING_STATE + phase.SUCCESS:
                nextIState = updateDoctorAuditingStateSuccess()
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
        return iState.set('total', total).set('list', list)
    }

    function updateRemarkSuccess() {
        let {id, remarkType, remark} = action
        if (remarkType != constants.remarkFlag.DOCTOR_AUDITING) {
            return iState
        }
        return _updateList(iState, id, doctor => doctor.set('doctor_Info_Remark', remark))
    }

    function updateDoctorInfoSuccess() {
        const {
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
        return _updateList(iState, doctor_Id, doctor => doctor
            .set('doctor_Name', doctor_Name)
            .set('hospital_Id', hospitalName)
            .set('department_Id', departmentName)
            .set('title_Id', positionName)
            .set('doctor_Major', doctor_Major)
            .set('doctor_Photo', doctor_Photo)
            .set('doctor_Practicing_Photo', doctor_Practicing_Photo)
            .set('is_Doctor_Purview', is_Doctor_Purview)
        )
    }

    function updateDoctorAuditingStateSuccess() {
        const {doctorId, newAuditingState} = action
        return _updateList(iState, doctorId, doctor => doctor.set('doctor_Is_Checked', newAuditingState))
    }

    // -------------------------------------

    function _updateList(curIState, id, callback) {
        const list = curIState.get('list')
        const match = list.find(doctor => doctor.get('doctor_Id') == id)
        if (!match) {
            console.warn('no match')
            return curIState
        }
        return curIState.update('list', list => list.update(list.indexOf(match), doctor => callback(doctor)))
    }
}
