/**
 * Created by jiangyukun on 2016/10/20.
 */
import {GET, PUT} from '../services/http'

export const fetchMessageInfo = dispatch => option => {
  let {start, length} = option
  GET('/archives/assay/assayNote/' + start + '/' + length).then(result => {
    let count = result['totalCount']
    let unreadTotal = result['unReadCount']
    let messageList = result.list.map(message => {
      return {
        id: message['assay_Note_Id'],
        name: message['patient_Name'],
        url: message['url'],
        mobile: message['patient_Phone'],
        uploader: message['assay_Upload_Person'],
        uploadDate: message['assay_Upload_Time'],
        messageState: message['is_read']
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

export const markMessageState = dispatch => (id, state) => {
  return new Promise((resolve, reject) => {
    PUT(`/archives/assay/updateAssayNote/${id}/${state}`).then(() => resolve(), () => reject())
  })
}
