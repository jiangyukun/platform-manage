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

import {fetchDoctorList} from '../../../actions'
import AddDoctor from './AddDoctor'

class DoctorAuditing extends BasePage {

    constructor(props) {
        super(props)
        this.state = {currentIndex: -1}
    }

    fetch() {
        this.setState({currentIndex: -1})
        this.filterConditions = this._queryFilter.getFilterConditions()
        this.pageInfo = this._paginateList.getPageInfo()
        this.props.fetchDoctorList(merge({}, this.pageInfo, this.handleFilterConditions()))
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

    activeItem(doctor, index) {
        this.setState({currentIndex: index})
    }

    addDoctor() {
        this._addDoctor.getWrappedInstance().open()
    }

    editDoctor(doctor) {

    }

    lookPicture(url) {

    }

    editMark(doctor) {

    }

    componentDidMount() {
        this.fetch()
    }

    render() {
        let {doctorList, total} = this.props.doctorListInfo

        function showDoctorPhoto(doctor) {
            if (doctor['doctor_Photo']) {
                return (
                    <div className="table-cell-look">
                        <a ng-click={this.lookPicture(doctor['doctor_Photo'])}>查看</a>
                    </div>
                )
            }
            return null
        }

        function showDoctorPracticingPhoto(doctor) {
            if (doctor['doctor_Practicing_Photo']) {
                return (
                    <div className="table-cell-look">
                        <a onClick={this.lookPicture(doctor['doctor_Practicing_Photo'])}>查看</a>
                    </div>
                )
            }
            return null
        }

        return (
            <div className="app-function-page">
                <AddDoctor ref={c=>this._addDoctor = c}/>
                <QueryFilter ref={c=>this._queryFilter = c} filter={filterCondition=>this.filter(filterCondition)}
                             className="big-label ">
                    <button className="btn btn-primary mr-20" onClick={e=>this.addDoctor()}>注册</button>
                    <button className="btn btn-primary mr-20"
                            onClick={e=>this.editDoctor()}
                            disabled={this.state.currentIndex == -1}>查看
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
                    <table className="table table-striped table-hover" style={{'minWidth': '1200px'}}>
                        <thead>
                        <tr>
                            <th className="th-left pl-15" width="150">
                                <SortBy by="phone">手机号码</SortBy>
                            </th>
                            <th className="th-left pl-15" width="120">医生姓名</th>
                            <th className="th-left pl-15" width="140">医院</th>
                            <th className="th-left pl-15" width="120">科室</th>
                            <th className="th-left pl-15" width="120">职称</th>
                            <th className="th-left pl-15" width="120">个人照片</th>
                            <th className="th-left pl-15" width="120">持证照片</th>
                            <th className="th-left pl-15" width="180" sort-by="doctor_Practicing_Number">执业证编号</th>
                            <th className="th-left pl-15" width="150">专长</th>
                            <th className="th-left pl-15" width="120">审核状态</th>
                            <th className="th-left pl-15" width="120">备注</th>
                            <th className="th-left pl-15" width="180" sort-by="doctor_Info_Creat_Time">创建时间</th>
                        </tr>
                        </thead>
                        <tbody>

                        {
                            doctorList.map((doctor, index)=> {
                                return (
                                    <tr key={index}
                                        className={classnames('h-50', {'selected': this.state['currentIndex'] == index})}
                                        onClick={e=>this.activeItem(doctor, index)}
                                        onDblClick={e=>this.editDoctor(doctor)}>
                                        <td>{doctor['phone']}</td>
                                        <td>{doctor['doctor_Name']}</td>
                                        <td>{doctor['hospital_Id']}</td>
                                        <td>{doctor['department_Id']}</td>
                                        <td>{doctor['title_Id']}</td>

                                        <td>{showDoctorPhoto(doctor)}</td>
                                        <td>{showDoctorPracticingPhoto(doctor)}</td>
                                        <td>{doctor['doctor_Practicing_Number']}</td>
                                        <td>{doctor['doctor_Major']}</td>
                                        <td>{doctor['doctor_Is_Checked']}</td>

                                        <td>
                                            {doctor['doctor_Info_Remark']}
                                            <div><i className="fa fa-edit" onClick={this.editMark(doctor)}></i></div>
                                        </td>
                                        <td>{doctor['doctor_Info_Creat_Time']}</td>
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
        doctorListInfo: state.doctorListInfo,
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

export default connect(mapStateToProps, {fetchDoctorList})(DoctorAuditing)
