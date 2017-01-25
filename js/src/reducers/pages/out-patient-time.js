/**
 * Created by jiangyukun on 2016/12/29
 */
import {fromJS} from 'immutable'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'

const defaultValue = {
    total: 0,
    list: [],
    detail: {
        doctorName: '',
        hospital: '',
        dateList: []
    },
    remarkUpdated: false
}

export function outPatientTimePaginateList(state = defaultValue, action) {
    const iState = fromJS(state)

    return nextState()

    function nextState() {
        let nextIState = iState

        switch (action.type) {
            case types.FETCH_OUT_PATIENT_TIME_PAGINATE_LIST + phase.SUCCESS:
                nextIState = fetchOutPatientTimePaginateListSuccess()
                break

            case types.FETCH_DOCTOR_DATE_DETAIL + phase.SUCCESS:
                nextIState = fetchDoctorDateDetailSuccess()
                break

            case types.UPDATE_OUT_PATIENT_REMARK + phase.SUCCESS:
                nextIState = updateOutPatientRemarkSuccess()
                break

            case types.RESET_OUT_PATIENT_REMARK:
                nextIState = resetOutPatientRemark()
                break

            default:
                break
        }
        if (nextIState == iState) {
            return state
        }
        return nextIState.toJS()
    }

    // ----------------------------------------------

    function fetchOutPatientTimePaginateListSuccess() {
        let {total, list} = action
        return iState.set('total', total).set('list', list)
    }

    function fetchDoctorDateDetailSuccess() {
        const {hospital, doctorName, detailList} = action
        return _updateDetail(iState, detail => detail.set('doctorName', doctorName).set('hospital', hospital).set('dateList', detailList))
    }

    function updateOutPatientRemarkSuccess() {
        const {userId, newRemark} = action
        return _updateList(iState.set('remarkUpdated', true), userId, outPatient => outPatient.set('remark', newRemark))
    }

    function resetOutPatientRemark() {
        return iState.set('remarkUpdated', false)
    }

    // ----------------------------------------------

    function _updateList(curIState, id, callback) {
        const list = curIState.get('list')
        const match = list.find(outPatient => outPatient.get('user_id') == id)
        return curIState.update('list', list => list.update(list.indexOf(match), outPatient => callback(outPatient)))
    }

    function _updateDetail(curIState, callback) {
        return curIState.update('detail', detail => callback(detail))
    }
}
