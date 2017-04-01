/**
 * Created by jiangyukun on 2016/10/20.
 */
import {GET, PUT} from '../services/http'
import * as types from '../constants/ActionTypes'
import * as phase from '../constants/PhaseConstant'
import {THREE_PHASE} from '../middleware/request_3_phase'

export const fetchMessageInfo = dispatch => option => {
  let {start, length} = option
  GET('/archives/assay/assayNote/' + start + '/' + length).then(result => {
    let count = result['totalCount']
    let unreadTotal = result['unReadCount']
    let messageList = result.list.map(message => {
      return {
        id: message['assay_Note_Id'],
        assayId: message['assay_Id'],
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

export const markMessageState = dispatch => (sheetId, newState) => {
  return new Promise((resolve, reject) => {
    PUT(`/archives/assay/updateAssayNote/${sheetId}/${newState}`).then(() => {
      resolve()
      dispatch({
        type: types.MARK_MESSAGE_STATE + phase.SUCCESS, sheetId, newState
      })
    }, () => reject())
  })
}
