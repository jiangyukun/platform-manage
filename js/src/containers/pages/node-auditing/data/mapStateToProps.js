/**
 * Created by jiangyukun on 2016/12/1.
 */
import constants from '../../../../core/constants'
import {getFilterItem, getStartEndDate} from '../../../../core/utils'

export default function mapStateToProps(state) {
    let {auditingState} = constants
    return {
        hospitalList: state.hospitalList,
        patientListInfo: state.patientListInfo,
        hospitalFilterList: {
            typeCode: 'hospital',
            typeText: '医院',
            typeItemList: state.hospitalList
        },
        auditingStateList: getFilterItem('auditingState', '审核状态', [
            {value: auditingState.auditing, text: '审核中'},
            {value: auditingState.auditingPass, text: '审核通过'},
            {value: auditingState.auditingUnPass, text: '审核不通过'}
        ]),
        visitCardList: getFilterItem('visitCard', '随访卡', [{value: '1', text: '是'}, {value: '2', text: '否'}, {value: '3', text: '未知'}]),
        isPregnant12To14AcceptedVisit: getFilterItem('isPregnant12To14AcceptedVisit', '孕24-32周是否接受随访'),
        isBaby8MonthAcceptedVisit: getFilterItem('isBaby8MonthAcceptedVisit', '宝宝产后7-12月是否接受随访'),
        checkResultFilterList: getFilterItem('checkResultFilter', '检查结果筛选', [
            {value: 1, text: '孕12-24周访视'},
            {value: 2, text: '孕24-32周访视'},
            {value: 3, text: '分娩访视'},
            {value: 4, text: '产后4-8周访视'},
            {value: 5, text: '产后7-12周访视'}
        ]),
        resultList: [
            {value: 1, text: '无效'},
            {value: 2, text: '未查'},
            {value: 3, text: '待上传'},
            {value: 4, text: '已录入'},
            {value: 5, text: '未填写'},
            {value: 6, text: '待跟进'}
        ],
        nodeFilterList: getFilterItem('nodeFilter', '节点筛选', [
            {value: 1, text: '孕14周第一天'},
            {value: 2, text: '孕26周第一天'},
            {value: 3, text: '孕33周第一天'},
            {value: 4, text: '孕41周第一天'},
            {value: 5, text: '产后6周第一天'},
            {value: 6, text: '产后46周第一天'},
            {value: 7, text: '产后10周第一天'},
            {value: 8, text: '产后50周第一天'},
            {value: 9, text: '产后8月第一天'},
            {value: 10, text: '产后72周第一天'},
            {value: 11, text: '产后9月第一天'},
            {value: 12, text: '产后76周第一天'},
            {value: 13, text: '产后10月第一天'},
            {value: 14, text: '产后80周第一天'},
        ]),
        backendMangerList: getFilterItem('backendManager', '后台管理人员', []),
        operationPersonList: getFilterItem('operationPerson', '运营人员', []),
        register: getFilterItem('register', '注册日期', getStartEndDate())
    }
}
