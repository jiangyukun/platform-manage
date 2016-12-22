/**
 * Created by jiangyukun on 2016/12/1.
 */
import {fromJS} from 'immutable'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'
import constants from '../../core/constants'

const defaultValue = {total: 0, list: []}

export function patientEditPaginateList(state = defaultValue, action) {
    const iState = fromJS(state)

    return nextState()

    function nextState() {
        let nextIState = iState

        switch (action.type) {
            case types.FETCH_PATIENT_PAGINATE_LIST + phase.SUCCESS:
                nextIState = fetchPatientPaginateListSuccess()
                break

            case types.UPDATE_REMARK + phase.SUCCESS:
                nextIState = updateRemarkSuccess()
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

    function fetchPatientPaginateListSuccess() {
        let {total, list} = action
        return iState.set('total', total).set('list', list)
    }

    function updateRemarkSuccess() {
        let {id, remarkType, remark} = action
        if (remarkType != constants.remarkFlag.PATIENT_EDIT) {
            return iState
        }
        return _updateList(iState, id, patient => patient.set('remark', remark))
    }

    // -------------------------------------

    function _updateList(curIState, id, callback) {
        const list = curIState.get('list')
        const match = list.find(patient => patient.get('patient_Id') == id)
        if (!match) {
            console.warn('no match')
            return curIState
        }
        return curIState.update('list', list => list.update(list.indexOf(match), patient => callback(patient)))
    }
}
