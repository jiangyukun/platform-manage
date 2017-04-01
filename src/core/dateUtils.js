/**
 * Created by jiangyukun on 2016/11/26.
 */
import moment from 'moment'

export function formatDateStr(dateStr, format) {
  if (!dateStr) return ''
  return moment(dateStr).format(format || 'YYYY-MM-DD HH:mm')
}
