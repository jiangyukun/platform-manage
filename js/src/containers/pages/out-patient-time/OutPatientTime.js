/**
 * Created by jiangyukun on 2017/1/18.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {merge} from 'lodash'
import {bindActionCreators} from 'redux'

import QueryFilter from "../../../components/core/QueryFilter"
import FilterItem from "../../../components/core/query-filter/FilterItem"
import CustomTextInput from '../../../components/core/query-filter/custom/CustomTextInput'
import PaginateList from "../../../components/core/PaginateList"

import {fetchHospitalList} from '../../../actions/hospital'
import * as utils from '../../../core/utils'
import * as commonActions from '../../../actions/pages/common'
import * as actions from '../../../actions/pages/out-patient-time'

class OutPatientTime extends Component {
    constructor() {
        super()
        this.state = {
            currentIndex: -1,
            loading: false,
            showAdd: false
        }
    }

    beginFetch(newPageIndex) {
        this._paginateList.beginFetch(newPageIndex)
    }

    doFetch() {
        this.setState({currentIndex: -1})
        this.props.fetchOutPatientTimePaginateList(merge({}, this._queryFilter.getParams(), this._paginateList.getParams()))
    }

    exportExcel() {
        location.href = ''
    }

    componentDidMount() {
        this.beginFetch()
        if (this.props.hospitalList.length == 0) {
            this.props.fetchHospitalList()
        }
        if (this.props.departmentList.length == 0) {
            this.props.fetchDepartmentList()
        }
    }

    render() {
        const head = ['医生账号', '姓名', '医院', '科室', '后台管理人员', '运营人员', '备注', '门诊时间',
            '周一', '周二', '周三', '周四', '周五', '周六', '周日', '生效临时通知', '临时通知记录']
        return (
            <div className="app-function-page">
                <QueryFilter ref={c => this._queryFilter = c} className="ex-big-label"
                             beginFilter={() => this.beginFetch(1)}
                             searchKeyName="searchKey"
                >

                    <button className="btn btn-primary mr-20" onClick={() => this.exportExcel()} disabled={this.props.total == 0}>导出excel</button>

                    <FilterItem item={this.props.temporaryNotifyFilter} paramName="doctor_short_notice_statusString"/>

                    <FilterItem item={this.props.hospitalFilterList} paramName="hospital_id"/>

                    <FilterItem item={this.props.departmentFilterList} paramName="department_id"/>

                    <FilterItem item={this.props.backendMangerList}>
                        <CustomTextInput placeholder="请输入后台管理人员" textName="backend_manager"/>
                    </FilterItem>

                    <FilterItem className="small-filter-item" item={this.props.operationPersonList}>
                        <CustomTextInput placeholder="请输入运营人员" textName="operation_manager"/>
                    </FilterItem>
                </QueryFilter>

                <PaginateList ref={c => this._paginateList = c}
                              doFetch={() => this.doFetch()}
                              total={this.props.total}
                              startName="startRows"
                              lengthName="rows"
                              byName="order_By"
                >
                    <PaginateList.Layout loading={this.state.loading}
                                         minWidth={1400}
                                         fixHead={true}
                                         fixLeft={[1, 2]}
                                         data={{
                                             weight: [],
                                             head: head,
                                             list: this.props.list.map(sms => {
                                                 return [
                                                     sms['sender'],
                                                     sms['receiver'],
                                                     sms['receiverName'],
                                                     sms['receiverType'],
                                                     sms['content'],
                                                     sms['createDate']
                                                 ]
                                             })
                                         }}/>
                </PaginateList>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {total, list} = state['smsPaginateList']

    return {
        total,
        list,
        hospitalList: state.hospitalList,
        departmentList: state.departmentList,
        temporaryNotifyFilter: utils.getFilterItem('temporaryNotify', '有无生效临时通知'),
        hospitalFilterList: {
            typeCode: 'hospital',
            typeText: '医院',
            typeItemList: state.hospitalList
        },
        departmentFilterList: {
            typeCode: 'department',
            typeText: '科室',
            typeItemList: state.departmentList
        },
        backendMangerList: utils.getFilterItem('backendManager', '后台管理人员', []),
        operationPersonList: utils.getFilterItem('operationPerson', '运营人员', [])
    }
}

function mapActionToProps(dispatch) {
    return merge(bindActionCreators({
        fetchOutPatientTimePaginateList: actions.fetchOutPatientTimePaginateList
    }, dispatch), {
        fetchHospitalList: fetchHospitalList(dispatch),
        fetchDepartmentList: commonActions.fetchDepartmentList(dispatch),
    })
}

export default connect(mapStateToProps, mapActionToProps)(OutPatientTime)
