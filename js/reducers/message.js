/**
 * Created by jiangyukun on 2016/10/20.
 */

export function message(state = {count: 0, unreadTotal: 0, messageList: []}, action) {
    if (action.type == 'REQUEST_MESSAGE_SUCCESS') {
        return action.messageListInfo
    }
    return state
}
