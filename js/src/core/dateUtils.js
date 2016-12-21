/**
 * Created by jiangyukun on 2016/11/26.
 */
import moment from 'moment'

export function formatDateStr(dateStr) {
    if (!dateStr) return ''
    return moment(dateStr).format('YYYY-MM-DD HH:mm')
}
