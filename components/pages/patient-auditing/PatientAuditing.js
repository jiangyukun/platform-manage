/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'
import {merge} from 'lodash'

import BasePage from '../base/BasePage'
import QueryFilter from '../../core/QueryFilter'
import FilterItem from '../../core/query-filter/FilterItem'
import PaginateList from '../../core/PaginateList'
import SortBy from '../../core/paginate-list/SortBy'
import SelectStartEndDate from '../../core/query-filter/custom/SelectStartEndDate'

import {fetchPatientList} from '../../../actions'
import EditPatient from './EditPatient'

class PatientAuditing extends BasePage {

    constructor(props) {
        super(props)
        this.state = {currentIndex: -1}
    }

    fetch() {
        this.setState({currentIndex: -1})
        this.filterConditions = this._queryFilter.getFilterConditions()
        this.pageInfo = this._paginateList.getPageInfo()
        this.props.fetchPatientList(merge({}, this.pageInfo, this.handleFilterConditions()))
    }

    filter(filterConditions) {
        this.filterConditions = filterConditions
        this.fetch()
    }

    getPageList(pageInfo) {
        this.pageInfo = pageInfo
        this.fetch()
    }

    handleFilterConditions() {
        return {
            hospital: super.handleFilterCondition('hospital', 'value')
        }
    }

    activeItem(patient, index) {
        this.setState({currentIndex: index})
    }

    editPatient(patient) {
        this._editPatient.open()
    }

    lookPicture(url) {

    }

    editMark(patient) {

    }

    componentDidMount() {
        this.fetch()
    }

    render() {
        let {patientList, total} = this.props.patientListInfo

        return (
            <div className="app-function-page">
                <EditPatient ref={c=>this._editPatient = c}/>
                <QueryFilter ref={c=>this._queryFilter = c} filter={filterCondition=>this.filter(filterCondition)} className="big-label ">
                    <button className="btn btn-primary mr-20" onClick={e=>this.addDoctor()}>注册</button>
                    <button className="btn btn-primary mr-20" onClick={e=>this.editDoctor()} disabled={this.state.currentIndex == -1}>查看</button>
                    <FilterItem className="small-filter-item" item={this.props.hospitalList}/>
                    <FilterItem className="small-filter-item" item={this.props.positionList}/>
                    <FilterItem className="small-filter-item" item={this.props.departmentList}/>
                    <FilterItem className="small-filter-item" item={this.props.auditingStateList}/>
                    <FilterItem className="small-filter-item" item={this.props.createTime}>
                        <SelectStartEndDate/>
                    </FilterItem>
                </QueryFilter>

                <PaginateList ref={c=>this._paginateList = c} getPageList={pageInfo=>this.getPageList(pageInfo)} total={total} fixHead={true} fixLeft={true}>
                    <table className="table table-striped table-hover more-than-7column" style={{"minWidth": "4800px"}}>
                        <thead>
                        <tr>
                            <th className="th-left w-120">账号</th>
                            <th className="th-left w-120">患者姓名</th>
                            <th className="th-left w-150">医院</th>
                            <th className="th-left w-120">随访医生</th>
                            <th className="th-left w-120">感染科医生</th>
                            <th className="th-left w-120">妇产科医生</th>
                            <th className="th-left w-120">儿科医生</th>
                            <th className="th-left w-120">是否乙肝</th>
                            <th className="th-left w-120">是否孕妇</th>
                            <th className="th-left w-120">审核状态</th>

                            <th className="th-left w-120">注册时间</th>
                            <th className="th-left w-120">孕周</th>
                            <th className="th-left w-120">预产期</th>
                            <th className="th-left w-120">抗病毒情况</th>
                            <th className="th-left w-120">阻断结果</th>
                            <th className="th-left w-120">使用的APP版本</th>
                            <th className="th-left w-120">使用的系统类型</th>
                            <th className="th-left w-120">检查项目</th>
                            <th className="th-left w-120">妊娠12~24周</th>
                            <th className="th-left w-120">孕14周日期</th>

                            <th className="th-left w-120">是否联系</th>
                            <th className="th-left w-120">联系情况备注</th>
                            <th className="th-left w-120">妊娠24~32周</th>
                            <th className="th-left w-120">孕26周日期</th>
                            <th className="th-left w-120">是否联系</th>
                            <th className="th-left w-120">联系情况备注</th>
                            <th className="th-left w-120">分娩</th>
                            <th className="th-left w-120">孕36周日期</th>
                            <th className="th-left w-120">是否联系</th>
                            <th className="th-left w-120">联系情况备注</th>

                            <th className="th-left w-120">产后4~8周</th>
                            <th className="th-left w-120">产后6周日期</th>
                            <th className="th-left w-120">是否联系</th>
                            <th className="th-left w-120">联系情况备注</th>
                            <th className="th-left w-120">产后7~12月</th>
                            <th className="th-left w-120">产后8个月日期</th>
                            <th className="th-left w-120">是否联系</th>
                            <th className="th-left w-120">联系情况备注</th>
                        </tr>
                        </thead>
                        <tbody>

                        {
                            patientList.map((patient, index)=> {
                                return (
                                    <tr key={index}
                                        onClick={e=>this.activeItem(patient, index)}
                                        onDblClick={e=>this.editPatient(patient)}
                                        className={classnames({'selected':this.state.currentIndex == index})}>
                                        <td className="w-120">{patient['patient_Phone']}</td>
                                        <td className="w-120">{patient['patient_Name']}</td>
                                        <td className="w-150">{patient['hospital_Name']}</td>
                                        <td className="w-120">{patient['visit_Doctor']}</td>
                                        <td className="w-120">{patient['infection_Doctor']}</td>
                                        <td className="w-120">{patient['obstetrics_Doctor']}</td>
                                        <td className="w-120">{patient['pediatrics_Doctor']}</td>
                                        <td className="w-120">{patient['is_Hepatitis']}</td>
                                        <td className="w-120">{patient['is_Pregnant']}</td>
                                        <td className="w-120">{patient['is_Checked']}</td>

                                        <td className="w-120">{patient['regrist_Time']}</td>
                                        <td className="w-120">{patient['pregnancy_week']}</td>
                                        <td className="w-120">{patient['expected_Child_Birth_Date']}</td>
                                        <td className="w-120">{patient['antiviral_Record']}</td>
                                        <td className="w-120">{patient['blocking_Results']}</td>
                                        <td className="w-120">{patient['app_version']}</td>
                                        <td className="w-120">{patient['device_Model']}</td>


                                        <td className="w-120">
                                            <div>肝功能</div>
                                            <div>HBV-DNA</div>
                                            <div>乙肝五项</div>
                                            <div>肝脏B超</div>
                                        </td>


                                        <td className="w-120">
                                            <div>{patient['visit_1_Liver_Function']}</div>
                                            <div>{patient['visit_1_HBV_DNA']}</div>
                                            <div>{patient['visit_1_Liver_Five']}</div>
                                            <div>{patient['visit_1_Liver_B']}</div>
                                        </td>
                                        <td className="w-120">{patient['pregnant_14_Weeks_Date']}</td>
                                        <td className="w-120">
                                            {patient['is_Pregnant_14_Weeks_Contact']}
                                            <div>
                                                <i className="fa fa-edit"
                                                   ng-click="patientAuditingCtrl.editIsContact(patient, 'pregnant_14')"></i>
                                            </div>
                                        </td>
                                        <td className="w-120">
                                            {patient['pregnant_14_Weeks_Contact_Remark']}
                                            <div>
                                                <i className="fa fa-edit"
                                                   ng-click="patientAuditingCtrl.editMark(patient, 'pregnant_14')"></i>
                                            </div>
                                        </td>


                                        <td className="w-120">
                                            <div>{patient['visit_2_Liver_Function']}</div>
                                            <div>{patient['visit_2_HBV_DNA']}</div>
                                            <div>{patient['visit_2_Liver_Five']}</div>
                                            <div>{patient['visit_2_Liver_B']}</div>
                                        </td>
                                        <td className="w-120">{patient['pregnant_26_Weeks_Date']}</td>
                                        <td className="w-120">
                                            {patient['is_Pregnant_26_Weeks_Contact']}
                                            <div>
                                                <i className="fa fa-edit"
                                                   ng-click="patientAuditingCtrl.editIsContact(patient, 'pregnant_26')"></i>
                                            </div>
                                        </td>
                                        <td className="w-120">
                                            {patient['pregnant_26_Weeks_Contact_Remark']}
                                            <div>
                                                <i className="fa fa-edit"
                                                   ng-click="patientAuditingCtrl.editMark(patient, 'pregnant_26')"></i>
                                            </div>
                                        </td>


                                        <td className="w-120">
                                            <div>{patient['visit_3_Liver_Function']}</div>
                                            <div>{patient['visit_3_HBV_DNA']}</div>
                                            <div>{patient['visit_3_Liver_Five']}</div>
                                            <div>{patient['visit_3_Liver_B']}</div>
                                        </td>
                                        <td className="w-120">{patient['pregnant_36_Weeks_Date']}</td>
                                        <td className="w-120">
                                            {patient['is_Pregnant_36_Weeks_Contact']}
                                            <div>
                                                <i className="fa fa-edit"
                                                   ng-click="patientAuditingCtrl.editIsContact(patient, 'pregnant_36')"></i>
                                            </div>
                                        </td>
                                        <td className="w-120">
                                            {patient['pregnant_36_Weeks_Contact_Remark']}
                                            <div>
                                                <i className="fa fa-edit"
                                                   ng-click="patientAuditingCtrl.editMark(patient, 'pregnant_36')"></i>
                                            </div>
                                        </td>


                                        <td className="w-120">
                                            <div>{patient['visit_4_Liver_Function']}</div>
                                            <div>{patient['visit_4_HBV_DNA']}</div>
                                            <div>{patient['visit_4_Liver_Five']}</div>
                                            <div>{patient['visit_4_Liver_B']}</div>
                                        </td>
                                        <td className="w-120">{patient['postpartum_6_Weeks_Date']}</td>
                                        <td className="w-120">
                                            {patient['is_Postpartum_6_Weeks_Contact']}
                                            <div>
                                                <i className="fa fa-edit"
                                                   ng-click="patientAuditingCtrl.editIsContact(patient, 'postpartum_6')"></i>
                                            </div>
                                        </td>
                                        <td className="w-120">
                                            {patient['postpartum_6_Weeks_Contact_Remark']}
                                            <div>
                                                <i className="fa fa-edit"
                                                   ng-click="patientAuditingCtrl.editMark(patient, 'postpartum_6')"></i>
                                            </div>
                                        </td>

                                        <td className="w-120">
                                            <div>{patient['visit_5_Liver_Function']}</div>
                                            <div>{patient['visit_5_HBV_DNA']}</div>
                                            <div>{patient['visit_5_Liver_Five']}</div>
                                            <div>{patient['visit_5_Liver_B']}</div>
                                        </td>
                                        <td className="w-120">{patient['postpartum_8_Months_Date']}</td>
                                        <td className="w-120">
                                            {patient['is_Postpartum_8_Months_Contact']}
                                            <div>
                                                <i className="fa fa-edit"
                                                   ng-click="patientAuditingCtrl.editIsContact(patient, 'postpartum_8')"></i>
                                            </div>
                                        </td>
                                        <td className="w-120">
                                            {patient['postpartum_8_Months_Contact_Remark']}
                                            <div>
                                                <i className="fa fa-edit"
                                                   ng-click="patientAuditingCtrl.editMark(patient, 'postpartum_8')"></i>
                                            </div>
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

function mapStateToProps(state, props) {
    return {
        patientListInfo: state.patientListInfo,
        hospitalList: {
            typeCode: 'hospital',
            typeText: '医院',
            typeItemList: [
                {value: 'zhejiang hospital', text: '浙江医院'}
            ]
        },
        positionList: {
            typeCode: 'b',
            typeText: '医生',
            typeItemList: [
                {value: 'zhao', text: '找医生'}
            ]
        }
    }
}

export default connect(mapStateToProps, {fetchPatientList})(PatientAuditing)
