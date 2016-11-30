/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'
import {merge} from 'lodash'

import NodeAuditingQueryFilter from './NodeAuditingQueryFilter'
import FilterItem from '../../../components/core/query-filter/FilterItem'
import CustomDateRange from '../../../components/core/query-filter/custom/CustomDateRange'
import SubDateSelect from '../../../components/core/query-filter/custom/SubDateSelect'
import SubOptions from '../../../components/core/query-filter/custom/SubOptions'
import PaginateList from '../../../components/core/PaginateList'

import EditPatient from './EditPatient'

import constants from '../../../core/constants'
import {getFilterItem, getStartEndDate} from '../../../core/utils'
import {ConditionResolver, getFilterConditionValue} from '../../../core/busHelper'
import {getVisitCardState} from '../../../core/formatBusData'

import {fetchPatientList} from '../../../actions/node-auditing'

class NodeAuditing extends Component {
    constructor(props) {
        super(props)
        this.state = {open1: false, open2: false, currentIndex: -1, loading: false}
    }

    beginFetch() {
        this._paginateList.beginFetch()
    }

    doFetch() {
        this.setState({loading: true, currentIndex: -1})
        this.allConditions = this._queryFilter.getAllConditions()
        this.pageInfo = this._paginateList.getPageInfo()
        this.props.fetchPatientList(merge({}, this.pageInfo, this.handleFilterConditions())).then(() => this.setState({loading: false}))
    }

    handleFilterConditions() {
        let options = new ConditionResolver(this.allConditions.filters)
            .resolve('hospital', 'hsp_Name', true)
            .resolve('auditingState', 'check_Status')
            .resolve('visitCard', 'status')
            .resolve('isPregnant12To14AcceptedVisit', 'visit_2_Accept_Visit', true)
            .resolve('isBaby8MonthAcceptedVisit', 'visit_5_Accept_Visit', true)
            .resolve('checkResultFilter', 'visit_Type')
            .resolve('result', 'visit_Result_Type')
            .resolveDate('register', 'registration_Begin_Time', 'registration_End_Time')
            .getCondition()

        let value = getFilterConditionValue(this.allConditions.filters, 'nodeFilter')
        if (value) {
            if (typeof value != 'object') {
                options['note_Type'] = value
            } else {
                options['note_Type'] = value.main
                let customValue = value.custom
                options['note_Begin_Time'] = customValue.startValue
                options['note_End_Time'] = customValue.endValue
            }
        }
        value = getFilterConditionValue(this.allConditions.filters, 'checkResultFilter')
        if (value) {
            if (typeof value != 'object') {
                options['visit_Type'] = value
            } else {
                options['visit_Type'] = value.main
                options['visit_Result_Type'] = value.custom
            }
        }

        if (this.allConditions.searchKey1) {
            options['doctor_key_Words'] = this.allConditions.searchKey1
        }
        if (this.allConditions.searchKey2) {
            options['key_Words'] = this.allConditions.searchKey2
        }
        return options
    }

    activeItem(index) {
        this.setState({currentIndex: index})
    }

    editPatient() {
        this._editPatient.open()
    }

    editMark(patient) {

    }

    componentDidMount() {
        this.beginFetch()
    }

    render() {
        let {total, list} = this.props.patientListInfo
        return (
            <div className="app-function-page">
                <EditPatient ref={c => this._editPatient = c}/>
                <NodeAuditingQueryFilter ref={c => this._queryFilter = c} beginFilter={filterCondition => this.beginFetch()} className="ex-big-label ">
                    <button className="btn btn-primary mr-20" onClick={e => this.editDoctor()} disabled={this.state.currentIndex == -1}>查看</button>
                    <FilterItem className="middle-filter-item" item={this.props.hospitalList}/>
                    <FilterItem className="middle-filter-item" item={this.props.auditingStateList}/>
                    <FilterItem className="big-filter-item" item={this.props.nodeFilterList}>
                        <SubDateSelect/>
                    </FilterItem>
                    <FilterItem className="middle-filter-item" item={this.props.visitCardList}/>
                    <FilterItem className="middle-filter-item" item={this.props.isPregnant12To14AcceptedVisit}/>
                    <FilterItem className="middle-filter-item" item={this.props.isBaby8MonthAcceptedVisit}/>
                    <FilterItem className="big-filter-item" item={this.props.checkResultFilterList}>
                        <SubOptions options={this.props.resultList} title="结果为"/>
                    </FilterItem>
                    <FilterItem className="big-filter-item" item={this.props.register}>
                        <CustomDateRange/>
                    </FilterItem>
                </NodeAuditingQueryFilter>

                <PaginateList ref={c => this._paginateList = c} loading={this.state.loading}
                              beginFetch={() => this.beginFetch()} doFetch={() => this.doFetch()}
                              total={total} fixHead={true} fixLeft={true}>

                    <table className="table table-striped table-hover more-than-7column" style={{"minWidth": "5500px"}}>
                        <thead>
                        <tr>
                            <th className="th-left w-120">患者编号</th>
                            <th className="th-left w-120">患者姓名</th>
                            <th className="th-left w-120">手机号码</th>
                            <th className="th-left w-150">医院</th>
                            <th className="th-left w-120">主治医生
                                {
                                    !this.state.open1 && (
                                        <i className="fa fa-arrow-right" title="展开其他医生" onClick={e => this.setState({open1: true})}></i>
                                    )
                                }
                                {
                                    this.state.open1 && (
                                        <i className="fa fa-arrow-left" title="收起其他医生" onClick={e => this.setState({open1: false})}></i>
                                    )
                                }
                            </th>
                            { this.state.open1 && <th className="th-left w-120">感染科医生</th>}
                            { this.state.open1 && <th className="th-left w-120">妇产科医生</th>}
                            { this.state.open1 && <th className="th-left w-120">儿科医生</th> }
                            <th className="th-left w-120">是否乙肝</th>
                            <th className="th-left w-120">是否孕妇</th>
                            <th className="th-left w-120">注册时间</th>
                            <th className="th-left w-120">审核状态</th>

                            <th className="th-left w-120">
                                孕周/月龄
                                {
                                    !this.state.open2 && (
                                        <i className="fa fa-arrow-right" title="展开其他"
                                           onClick={e => this.setState({open2: true})}></i>
                                    )
                                }
                                {
                                    this.state.open2 && (
                                        <i className="fa fa-arrow-left" title="收起其他"
                                           onClick={e => this.setState({open2: false})}></i>
                                    )
                                }

                            </th>
                            {this.state.open2 && <th className="th-left w-120">抗病毒情况</th>}
                            {this.state.open2 && <th className="th-left w-120">阻断结果</th>}
                            {this.state.open2 && <th className="th-left w-120">APP版本</th>}
                            {this.state.open2 && <th className="th-left w-120">手机型号</th>}

                            <th className="th-left w-120">随访卡</th>

                            <th className="th-left w-140">是否完成随访</th>
                            <th className="th-left w-140">联系情况备注</th>

                            <th className="th-left w-175">检查项目</th>
                            <th className="th-left w-120">妊娠12~24周</th>
                            <th className="th-left w-120">孕14周日期</th>
                            <th className="th-left w-140">是否完成随访</th>
                            <th className="th-left w-140">联系情况备注</th>

                            <th className="th-left w-120">妊娠24~32周</th>
                            <th className="th-left w-140">是否接受随访</th>
                            <th className="th-left w-120">孕26周日期</th>
                            <th className="th-left w-140">是否完成随访</th>
                            <th className="th-left w-140">联系情况备注</th>
                            <th className="th-left w-120">孕33周日期</th>
                            <th className="th-left w-140">是否完成随访</th>
                            <th className="th-left w-140">联系情况备注</th>

                            <th className="th-left w-120">分娩</th>
                            <th className="th-left w-120">孕41周日期</th>
                            <th className="th-left w-140">是否完成随访</th>
                            <th className="th-left w-140">联系情况备注</th>

                            <th className="th-left w-120">产后4~8周</th>
                            <th className="th-left w-140">产后6周日期</th>
                            <th className="th-left w-120">孕46周日期</th>
                            <th className="th-left w-140">是否完成随访</th>
                            <th className="th-left w-140">联系情况备注</th>
                            <th className="th-left w-140">产后10周日期</th>
                            <th className="th-left w-120">孕50周日期</th>
                            <th className="th-left w-140">是否完成随访</th>
                            <th className="th-left w-140">联系情况备注</th>

                            <th className="th-left w-120">产后7~12月</th>
                            <th className="th-left w-140">是否接受随访</th>
                            <th className="th-left w-140">产后8月日期</th>
                            <th className="th-left w-120">孕72周日期</th>
                            <th className="th-left w-140">是否完成随访</th>
                            <th className="th-left w-140">联系情况备注</th>
                            <th className="th-left w-140">产后9月日期</th>
                            <th className="th-left w-120">孕76周日期</th>
                            <th className="th-left w-140">是否完成随访</th>
                            <th className="th-left w-140">联系情况备注</th>

                            <th className="th-left w-140">产后10月日期</th>
                            <th className="th-left w-120">孕80周日期</th>
                            <th className="th-left w-140">是否完成随访</th>
                            <th className="th-left w-140">联系情况备注</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            list.map((patient, index) => {
                                return (
                                    <tr key={index}
                                        onClick={e => this.activeItem(index)}
                                        onDoubleClick={e => this.editPatient(patient)}
                                        className={classnames({'selected': this.state.currentIndex == index})}>


                                        <td className="w-120">{patient['patient_Code']}</td>
                                        <td className="w-120">{patient['patient_Name']}</td>
                                        <td className="w-120">{patient['patient_Phone']}</td>
                                        <td className="w-150">{patient['hospital_Name']}</td>
                                        <td className="w-120">{patient['indications_Doctor_Name']}</td>
                                        {this.state.open1 && ( <td className="w-120">{patient['infection_Doctor']}</td>)}
                                        {this.state.open1 && (<td className="w-120">{patient['obstetrics_Doctor']}</td>)}
                                        {this.state.open1 && (<td className="w-120">{patient['pediatrics_Doctor']}</td>)}

                                        <td className="w-120">{patient['is_Hepatitis']}</td>
                                        <td className="w-120">{patient['is_Pregnant']}</td>
                                        <td className="w-120">{patient['regrist_Time']}</td>
                                        <td className="w-120">{patient['is_Checked']}</td>

                                        <td className="w-120">{patient['pregnancy_week']}</td>
                                        {this.state.open2 && <td className="w-120">{patient['antiviral_Record']}</td>}
                                        {this.state.open2 && <td className="w-120">{patient['blocking_Results']}</td> }
                                        {this.state.open2 && <td className="w-120">{patient['app_version']}</td>}
                                        {this.state.open2 && <td className="w-120">{patient['device_Model']}</td>}

                                        <td className="w-120">
                                            {getVisitCardState(patient['visit_card_status'])}
                                            <i className="fa fa-edit" data-ng-click="nodepatientCtrl.editVisitCardState(patient)"></i>
                                        </td>
                                        <td className="w-120">
                                            {patient['is_First_Complete_Visit']}
                                            <i className="fa fa-edit" data-ng-click="nodepatientCtrl.editIsCompleteVisit(patient, '1')"></i>
                                        </td>
                                        <td className="w-120">
                                            {patient['first_Contact_Remark']}
                                            <i className="fa fa-edit" data-ng-click="nodepatientCtrl.editMark(patient, '1')"></i>
                                        </td>

                                        <td className="w-150">
                                            <div>肝功能</div>
                                            <div>HBV-DNA</div>
                                            <div>乙肝五项定性</div>
                                            <div>乙肝五项定量</div>
                                            <div>肝脏B超</div>
                                            <div>婴儿乙肝五项定性</div>
                                            <div>婴儿乙肝五项定量</div>
                                            <div>婴儿HBV-DNA</div>
                                        </td>

                                        {/*访视1*/}
                                        <td className="w-120">
                                            <div>{patient['visit_1_Liver_Function']}</div>
                                            <div>{patient['visit_1_HBV_DNA']}</div>
                                            <div>{patient['visit_1_Liver_Five_Dx']}</div>
                                            <div>{patient['visit_1_Liver_Five_Dl']}</div>
                                            <div>{patient['visit_1_Liver_B']}</div>
                                            <div>{patient['visit_1_Liver_Baby_Five_Dx']}</div>
                                            <div>{patient['visit_1_Liver_Baby_Five_Dl']}</div>
                                            <div>{patient['visit_1_Baby_HBV_DNA']}</div>
                                        </td>
                                        <td className="w-120">{patient['pregnant_14_Weeks_Date']}</td>
                                        <td className="w-120">
                                            {patient['is_Pregnant_14_Weeks_Complete_Visit']}
                                            <i className="fa fa-edit" data-ng-click="nodepatientCtrl.editIsCompleteVisit(patient, '2')"></i>
                                        </td>
                                        <td className="w-120">
                                            {patient['pregnant_14_Weeks_Contact_Remark']}
                                            <i className="fa fa-edit" data-ng-click="nodepatientCtrl.editMark(patient, '2')"></i>
                                        </td>

                                        {/*访视2*/}
                                        <td className="w-120">
                                            <div>{patient['visit_2_Liver_Function']}</div>
                                            <div>{patient['visit_2_HBV_DNA']}</div>
                                            <div>{patient['visit_2_Liver_Five_Dx']}</div>
                                            <div>{patient['visit_2_Liver_Five_Dl']}</div>
                                            <div>{patient['visit_2_Liver_B']}</div>
                                            <div>{patient['visit_2_Liver_Baby_Five_Dx']}</div>
                                            <div>{patient['visit_2_Liver_Baby_Five_Dl']}</div>
                                            <div>{patient['visit_2_Baby_HBV_DNA']}</div>
                                        </td>
                                        <td className="w-120">{patient['visit_2_Accept_Visit']}</td>
                                        <td className="w-120">{patient['pregnant_26_Weeks_Date']}</td>
                                        <td className="w-120">
                                            {patient['is_Pregnant_26_Weeks_Complete_Visit']}
                                            <i className="fa fa-edit" data-ng-click="nodepatientCtrl.editIsCompleteVisit(patient, '3')"></i>
                                        </td>
                                        <td className="w-120">
                                            {patient['pregnant_26_Weeks_Contact_Remark']}
                                            <i className="fa fa-edit" data-ng-click="nodepatientCtrl.editMark(patient, '3')"></i>
                                        </td>
                                        <td className="w-120">{patient['pregnant_33_Weeks_Date']}</td>
                                        <td className="w-120">
                                            {patient['is_Pregnant_33_Weeks_Complete_Visit']}
                                            <i className="fa fa-edit"
                                               data-ng-click="nodepatientCtrl.editIsCompleteVisit(patient, '4')"></i>
                                        </td>
                                        <td className="w-120">
                                            {patient['pregnant_33_Weeks_Contact_Remark']}
                                            <i className="fa fa-edit" data-ng-click="nodepatientCtrl.editMark(patient, '4')"></i>
                                        </td>


                                        {/*访视3*/}
                                        <td className="w-120">
                                            <div>{patient['visit_3_Liver_Function']}</div>
                                            <div>{patient['visit_3_HBV_DNA']}</div>
                                            <div>{patient['visit_3_Liver_Five_Dx']}</div>
                                            <div>{patient['visit_3_Liver_Five_Dl']}</div>
                                            <div>{patient['visit_3_Liver_B']}</div>
                                            <div>{patient['visit_3_Liver_Baby_Five_Dx']}</div>
                                            <div>{patient['visit_3_Liver_Baby_Five_Dl']}</div>
                                            <div>{patient['visit_3_Baby_HBV_DNA']}</div>
                                        </td>
                                        <td className="w-120">{patient['pregnant_41_Weeks_Date']}</td>
                                        <td className="w-120">
                                            {patient['is_Pregnant_41_Weeks_Complete_Visit']}
                                            <i className="fa fa-edit"
                                               data-ng-click="nodepatientCtrl.editIsCompleteVisit(patient, '5')"></i>
                                        </td>
                                        <td className="w-120">
                                            {patient['pregnant_41_Weeks_Contact_Remark']}
                                            <i className="fa fa-edit" data-ng-click="nodepatientCtrl.editMark(patient, '5')"></i>
                                        </td>


                                        {/*访视4*/}
                                        <td className="w-120">
                                            <div>{patient['visit_4_Liver_Function']}</div>
                                            <div>{patient['visit_4_HBV_DNA']}</div>
                                            <div>{patient['visit_4_Liver_Five_Dx']}</div>
                                            <div>{patient['visit_4_Liver_Five_Dl']}</div>
                                            <div>{patient['visit_4_Liver_B']}</div>
                                            <div>{patient['visit_4_Liver_Baby_Five_Dx']}</div>
                                            <div>{patient['visit_4_Liver_Baby_Five_Dl']}</div>
                                            <div>{patient['visit_4_Baby_HBV_DNA']}</div>
                                        </td>
                                        <td className="w-120">{patient['postpartum_6_Weeks_Date']}</td>
                                        <td className="w-120">{patient['pregnant_46_Weeks_Date']}</td>
                                        <td className="w-120">
                                            {patient['is_Pregnant_46_Weeks_Complete_Visit']}
                                            <i className="fa fa-edit"
                                               data-ng-click="nodepatientCtrl.editIsCompleteVisit(patient, '6')"></i>
                                        </td>
                                        <td className="w-120">
                                            {patient['pregnant_46_Weeks_Contact_Remark']}
                                            <i className="fa fa-edit" data-ng-click="nodepatientCtrl.editMark(patient, '6')"></i>
                                        </td>
                                        <td className="w-120">{patient['postpartum_10_Weeks_Date']}</td>
                                        <td className="w-120">{patient['pregnant_50_Weeks_Date']}</td>
                                        <td className="w-120">
                                            {patient['is_Pregnant_50_Weeks_Complete_Visit']}
                                            <i className="fa fa-edit"
                                               data-ng-click="nodepatientCtrl.editIsCompleteVisit(patient, '7')"></i>
                                        </td>
                                        <td className="w-120">
                                            {patient['pregnant_50_Weeks_Contact_Remark']}
                                            <i className="fa fa-edit" data-ng-click="nodepatientCtrl.editMark(patient, '7')"></i>
                                        </td>


                                        {/*访视5*/}
                                        <td className="w-120">
                                            <div>{patient['visit_5_Liver_Function']}</div>
                                            <div>{patient['visit_5_HBV_DNA']}</div>
                                            <div>{patient['visit_5_Liver_Five_Dx']}</div>
                                            <div>{patient['visit_5_Liver_Five_Dl']}</div>
                                            <div>{patient['visit_5_Liver_B']}</div>
                                            <div>{patient['visit_5_Liver_Baby_Five_Dx']}</div>
                                            <div>{patient['visit_5_Liver_Baby_Five_Dl']}</div>
                                            <div>{patient['visit_5_Baby_HBV_DNA']}</div>
                                        </td>

                                        <td className="w-120">{patient['visit_5_Accept_Visit']}</td>
                                        <td className="w-120">{patient['postpartum_8_Months_Date']}</td>
                                        <td className="w-120">{patient['pregnant_72_Weeks_Date']}</td>
                                        <td className="w-120">
                                            {patient['is_Pregnant_72_Weeks_Complete_Visit']}
                                            <i className="fa fa-edit"
                                               data-ng-click="nodepatientCtrl.editIsCompleteVisit(patient, '8')"></i>
                                        </td>
                                        <td className="w-120">
                                            {patient['pregnant_72_Weeks_Contact_Remark']}
                                            <div>
                                                <i className="fa fa-edit" data-ng-click="nodepatientCtrl.editMark(patient, '8')"></i>
                                            </div>
                                        </td>
                                        <td className="w-120">{patient['postpartum_9_Months_Date']}</td>
                                        <td className="w-120">{patient['pregnant_76_Weeks_Date']}</td>
                                        <td className="w-120">
                                            {patient['is_Pregnant_76_Weeks_Complete_Visit']}
                                            <i className="fa fa-edit"
                                               data-ng-click="nodepatientCtrl.editIsCompleteVisit(patient, '9')"></i>
                                        </td>
                                        <td className="w-120">
                                            {patient['pregnant_76_Weeks_Contact_Remark']}
                                            <i className="fa fa-edit" data-ng-click="nodepatientCtrl.editMark(patient, '9')"></i>
                                        </td>

                                        <td className="w-120">{patient['postpartum_10_Months_Date']}</td>
                                        <td className="w-120">{patient['pregnant_80_Weeks_Date']}</td>
                                        <td className="w-120">
                                            {patient['is_Pregnant_80_Weeks_Complete_Visit']}
                                            <i className="fa fa-edit"
                                               data-ng-click="nodepatientCtrl.editIsCompleteVisit(patient, '10')"></i>
                                        </td>
                                        <td className="w-120">
                                            {patient['pregnant_80_Weeks_Contact_Remark']}
                                            <i className="fa fa-edit" data-ng-click="nodepatientCtrl.editMark(patient, '10')"></i>
                                        </td>

                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </PaginateList>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    let {auditingState} = constants
    return {
        patientListInfo: state.patientListInfo,
        hospitalList: {
            typeCode: 'hospital',
            typeText: '医院',
            typeItemList: state.hospitalList
        },
        auditingStateList: getFilterItem('auditingState', '审核状态', [
            {value: auditingState.auditing, text: '审核中'},
            {value: auditingState.auditingPass, text: '审核通过'},
            {value: auditingState.auditingUnPass, text: '审核不通过'},
            {value: auditingState.auditingUnKnow, text: '未填写'}
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
        register: getFilterItem('register', '注册日期', getStartEndDate())
    }
}

function mapActionToProps(dispatch, props) {
    return {
        fetchPatientList: fetchPatientList(dispatch)
    }
}

export default connect(mapStateToProps, mapActionToProps)(NodeAuditing)
