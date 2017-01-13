/**
 * Created by jiangyukun on 2016/12/29
 */
import {fromJS} from 'immutable'
import * as types from '../../constants/ActionTypes'
import * as phase from '../../constants/PhaseConstant'

const defaultValue = {total: 0, list: []}

export function smsPaginateList(state = defaultValue, action) {
    const iState = fromJS(state)

    return nextState()

    function nextState() {
        let nextIState = iState

        switch (action.type) {
            case types.FETCH_SMS_PAGINATE_LIST + phase.SUCCESS:
                nextIState = fetchSmsPaginateListSuccess()
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

    function fetchSmsPaginateListSuccess() {
        let {total, list} = action
        return iState.set('total', total).set('list', list)
    }

    // ---------------------------

    function _updateList(curIState, id, callback) {
        const list = curIState.get('list')
        const match = list.find(hospital => hospital.get('id') == id)
        return curIState.update('list', list => list.update(list.indexOf(match), hospital => callback(hospital)))
    }
}