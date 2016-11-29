/**
 * Created by jiangyukun on 2016/11/29.
 */
export function getVisitCardState(state) {
    if (!state) {
        return '未知';
    } else if (state == '1') {
        return '是';
    } else if (state == '2') {
        return '否';
    } else if (state == '3') {
        return '未知'
    }
    return '错误数据';
}
