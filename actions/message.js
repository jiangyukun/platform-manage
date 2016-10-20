/**
 * Created by jiangyukun on 2016/10/20.
 */

export function fetchMessageInfo(option) {
    let {start, length} = option
    return dispatch=> {
        fetch('/fetchMessageInfo/' + start + '/' + length).then(response=>response.json()).then((messageListInfo)=> {
            dispatch({
                type: 'REQUEST_MESSAGE_SUCCESS', messageListInfo
            })
        })
    }
}
