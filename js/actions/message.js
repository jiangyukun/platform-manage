/**
 * Created by jiangyukun on 2016/10/20.
 */
import http from '../services/http'

export function fetchMessageInfo(option) {
    let {start, length} = option
    return dispatch=> {
        http('/archives/assay/assayNote/' + start + '/' + length)
    }
}
