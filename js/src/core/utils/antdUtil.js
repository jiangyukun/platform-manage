/**
 * Created by jiangyukun on 2016/12/14.
 */
import notification from 'antd/lib/notification'

export function tip(type, message) {
    notification[type]({title: '提示', description: message})
}
export function tipSuccess(message) {
    tip('success', message)
}
export function tipErr(message) {
    tip('error', message)
}
