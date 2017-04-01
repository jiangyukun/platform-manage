/**
 * Created by jiangyukun on 2016/12/14.
 */
import notification from 'antd/lib/notification'
import Modal from 'antd/lib/modal'

export function tip(type, message) {
  notification[type]({message: '提示', description: message})
}
export function tipSuccess(message) {
  tip('success', message)
}
export function tipErr(message) {
  tip('error', message)
}

export function confirm(message, okCallback, cancelCallback = () => {}) {
  Modal.confirm({
    title: '提示',
    content: message,
    onOk: okCallback,
    onCancel: cancelCallback
  })
}
