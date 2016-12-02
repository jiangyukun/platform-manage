/**
 * Created by jiangyukun on 2016/12/1.
 */
import {fromJS, List} from 'immutable'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'
import * as nodeAuditingHelper from '../../core/pages/nodeAuditingHelper'
import * as formatBusData from '../../core/formatBusData'

const defaultValue = {total: 0, list: []}
export function patientListInfo(state = defaultValue, action) {

    const iState = fromJS(state)

    return nextState()

    function nextState() {
        let nextIState = iState

        switch (action.type) {
            case types.FETCH_PATIENT_LIST + phase.SUCCESS:
                nextIState = fetchPatientListSuccess()
                break

            case types.UPDATE_VISIT_CARD + phase.SUCCESS:
                nextIState = updateVisitCardSuccess()
                break

            case types.UPDATE_NODE_AUDITING_REMARK + phase.SUCCESS:
                nextIState = updateRemarkSuccess()
                break

            case types.UPDATE_IS_COMPLETE_VISIT + phase.SUCCESS:
                nextIState = updateIsCompleteVisitSuccess()
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

    function updateVisitCardSuccess() {
        let {id, state} = action
        return _updateList(iState, id, patient => patient.set('visit_card_status', state))
    }

    function updateRemarkSuccess() {
        let {id, remarkType, remark} = action
        let remarkKey = nodeAuditingHelper.toRemarkTypeResponseKey(remarkType)
        return _updateList(iState, id, patient => patient.set(remarkKey, remark))
    }

    function updateIsCompleteVisitSuccess() {
        let {id, visitCardType, newVisitCardState} = action
        let isCompleteVisitKey = nodeAuditingHelper.toCompleteVisitTypeResponseKey(visitCardType)
        return _updateList(iState, id, patient => patient.set(isCompleteVisitKey, formatBusData.isCompleteVisit(newVisitCardState)))
    }

    function fetchPatientListSuccess() {
        let {data} =action.patientListInfo
        return iState.set('total', data['total_Patient_Count']).set('list', fromJS(data['patientCheckList']))
    }

    //-------------------------------------

    function _updateList(curIState, id, callback) {
        let match = curIState.get('list').find(patient => patient.get('patient_Id') == id)
        return curIState.update('list', list => list.update(list.indexOf(match), patient => callback(patient)))
    }

}
