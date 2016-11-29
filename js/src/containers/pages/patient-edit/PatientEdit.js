/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React, {Component} from 'react'
import {render} from 'react-dom'
import {connect} from 'react-redux'
import classnames from 'classnames'
import {merge} from 'lodash'

import BasePage from '../base/BasePage'
import QueryFilter from '../../core/QueryFilter'
import FilterItem from '../../core/query-filter/FilterItem'
import PaginateList from '../../core/PaginateList'
import SortBy from '../../core/paginate-list/SortBy'
import SelectStartEndDate from '../../core/query-filter/custom/SelectStartEndDate'

import EditPatientDialog from './EditPatientDialog'
import ImagePreview from '../../core/ImagePreview'
import {fetchPatientList} from '../../../actions'

class PatientEdit extends BasePage {

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

    activeItem(index) {
        this.setState({currentIndex: index})
    }

    editPatient(patient) {
        if (patient) {
            this._editPatient.getWrappedInstance().open(patient)
        } else {
            this._editPatient.getWrappedInstance().open(this.props.patientListInfo.patientList[this.state.currentIndex])
        }
    }

    lookPhoto() {
        this._imagePreview.open()
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

                <QueryFilter ref={c=>this._queryFilter = c} filter={filterCondition=>this.filter(filterCondition)} className="big-label ">
                    <button className="btn btn-primary mr-20" onClick={e=>this.editPatient()} disabled={this.state.currentIndex == -1}>
                        修改/查看
                        <EditPatientDialog ref={c=>this._editPatient = c}/>
                    </button>
                    <FilterItem className="small-filter-item" item={this.props.hospitalList}/>
                    <FilterItem className="small-filter-item" item={this.props.positionList}/>
                    <FilterItem className="small-filter-item" item={this.props.departmentList}/>
                    <FilterItem className="small-filter-item" item={this.props.auditingStateList}/>
                    <FilterItem className="small-filter-item" item={this.props.createTime}>
                        <SelectStartEndDate/>
                    </FilterItem>
                </QueryFilter>

                <PaginateList ref={c=>this._paginateList = c} getPageList={pageInfo=>this.getPageList(pageInfo)} total={total} fixHead={true}>
                    <table className="table table-striped table-hover" style={{'minWidth': '1000px'}}>
                        <thead>
                        <tr>
                            <th className="th-left pl-15" width="150">
                                <SortBy by="patient_Phone">患者账号</SortBy>
                            </th>
                            <th className="th-left pl-15" width="120">
                                <SortBy by="patient_Name">姓名</SortBy>
                            </th>
                            <th className="th-left pl-15" width="150">
                                <SortBy by="patient_BirthDate">出生日期</SortBy>
                            </th>
                            <th className="th-left pl-15" width="120">民族</th>
                            <th className="th-left pl-15" width="120">是否乙肝</th>
                            <th className="th-left pl-15" width="120">是否孕妇</th>
                            <th className="th-left pl-15" width="70">头像</th>
                            <th className="th-left pl-15" width="180">
                                <SortBy by="id_Num">身份证号</SortBy>
                            </th>
                            <th className="th-left pl-15" width="120">审核状态</th>
                            <th className="th-left pl-15" width="150">备注</th>
                            <th className="th-left pl-15" width="150">
                                <SortBy by="creatTime">创建日期</SortBy>
                            </th>
                        </tr>
                        </thead>
                        <tbody>

                        {
                            patientList.map((patient, index)=> {
                                return (
                                    <tr key={index}
                                        className={classnames('h-50', {'selected': this.state.currentIndex == index})}
                                        onClick={e=>this.activeItem(index)}
                                        onDoubleClick={e=>this.editPatient(patient)}>

                                        <td>{patient['patient_Phone']}</td>
                                        <td>{patient['patient_Name']}</td>
                                        <td>{patient['patient_BirthDate']}</td>
                                        <td>{patient['patient_Nation']}</td>
                                        <td>{patient['patient_Is_Hepatitis']}</td>
                                        <td>{patient['patient_Is_Pregnant']}</td>
                                        <td className="w-sm">
                                            {
                                                patient['patient_Photo'] && (
                                                    <div className="table-cell-look">
                                                        <a onClick={e=>this.lookPhoto()}>
                                                            查看<ImagePreview ref={c=>this._imagePreview = c} url={patient['patient_Photo']}/>
                                                        </a>
                                                    </div>
                                                )
                                            }
                                        </td>
                                        <td>{patient['id_Num']}</td>
                                        <td>{patient['checked']}</td>
                                        <td>
                                            {patient['remark']}
                                            <div>
                                                <i className="fa fa-edit" onClick={e=>this.editMark(patient)}></i>
                                            </div>
                                        </td>
                                        <td>{patient['creatTime']}</td>
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

export default connect(mapStateToProps, {fetchPatientList})(PatientEdit)
