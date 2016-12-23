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
        return _updateList(iState, id, doctor => doctor.set('remark', remark))
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
