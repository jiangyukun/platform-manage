/**
 * Created by jiangyukun on 2016/12/1.
 */
import {fromJS} from 'immutable'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'

const defaultValue = {total: 0, list: []}

export function laboratorySheetList(state = defaultValue, action) {
    const iState = fromJS(state)

    return nextState()

    function nextState() {
        let nextIState = iState

        switch (action.type) {
            case types.FETCH_LABORATORY_SHEET_LIST + phase.SUCCESS:
                nextIState = fetchLaboratorySheetListSuccess()
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

    function fetchLaboratorySheetListSuccess() {
        let {totalCount, list} = action
        return iState.set('total', totalCount).set('list', list)
    }

}
