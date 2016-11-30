/**
 * Created by jiangyukun on 2016/10/20.
 */
import http from '../services/http'

export function fetchMessageInfo(option) {
    let {start, length} = option
    return dispatch => {
        http('/archives/assay/assayNote/' + start + '/' + length).then(response => response.json()).then(result => {
            // console.log(result);
            let count = result.data['totalCount']
            let unreadTotal = result.data['unReadCount']
            let messageList = result.data.list.map(message => {
                return {
                    id: message['assay_Id'],
                    name: message['patient_Name'],
                    url: message['url'],
                    mobile: message['patient_Phone'],
                    uploader: message['assay_Upload_Person'],
                    uploadDate: message['assay_Upload_Time']
                }
            })
            dispatch({
                type: 'REQUEST_MESSAGE_SUCCESS',
                messageListInfo: {
                    count, unreadTotal, messageList
                }
            })
        })
    }
}
