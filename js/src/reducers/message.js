/**
 * Created by jiangyukun on 2016/10/20.
 */
import {fromJS, List} from 'immutable'

const defaultState = {count: 0, unreadTotal: 0, messageList: []}

export function message(state = defaultState, action) {
    const iState = fromJS(state)

    return nextState()

    function nextState() {
        let nextIState = iState
        switch (action.type) {
            case 'REQUEST_MESSAGE_SUCCESS':
                nextIState = requestMessageSuccess()
                break

            default:
                break
        }

        if (nextIState == iState) {
            return state
        }
        return nextIState.toJS()
    }

    //--------------------------------------------

    function requestMessageSuccess() {
        let {count, unreadTotal, messageList} = action.messageListInfo
        return iState
            .set('count', count)
            .set('unreadTotal', unreadTotal)
            .update('messageList', list => list.concat(List(messageList)))
    }

}
