/**
 * Created by jiangyukun on 2017/1/18.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {merge} from 'lodash'
import {bindActionCreators} from 'redux'

import QueryFilter from '../../../components/core/QueryFilter'
import FilterItem from '../../../components/core/query-filter/FilterItem'
import CustomTextInput from '../../../components/core/query-filter/custom/CustomTextInput'
import PaginateList from '../../../components/core/PaginateList'
import Layout from "../../../components/core/layout/Layout"
import DoctorDateDetailDialog from './dialog/DoctorDateDetailDialog'
import EditRemark from '../common/EditRemark'

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
            showDetail: false,
            showEditRemark: false
        }
    }

    beginFetch(newPageIndex) {
        this._paginateList.beginFetch(newPageIndex)
    }

    doFetch() {
        this.setState({currentIndex: -1})
        this.props.fetchOutPatientTimePaginateList(merge({}, this._queryFilter.getParams(), this._paginateList.getParams()))
    }

    updateRemark(newRemark) {
        const doctorOutPatient = this.props.list[this.state.currentIndex]
        this.props.updateRemark(doctorOutPatient['user_id'], doctorOutPatient['user_Name'], newRemark)
    }

    exportExcel() {
        location.href = 'clinicTime/DoctorClinicExportExcel'
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
        const {Head, Row} = Layout
        const weight = [2, 1, 2, 1, 3, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2]

        return (
            <div className="app-function-page">
                {
                    this.state.showDetail && this.state.currentIndex != -1 && (
                        <DoctorDateDetailDialog
                            userId={this.props.list[this.state.currentIndex]['user_id']}
                            fetchDoctorDateDetail={this.props.fetchDoctorDateDetail}
                            doctorDateDetail={this.props.doctorDateDetail}
                            onExited={() => this.setState({showDetail: false})}/>
                    )
                }

                {
                    this.state.showEditRemark && this.state.currentIndex != -1 && (
                        <EditRemark
                            updateRemark={newRemark => this.updateRemark(newRemark)}
                            onExited={() => this.setState({showEditRemark: false})}/>
                    )
                }

                <QueryFilter ref={c => this._queryFilter = c} className="ex-big-label"
                             beginFilter={() => this.beginFetch(1)}
                             searchKeyName="search_key"
                >

                    <button className="btn btn-primary mr-20" onClick={() => this.exportExcel()} disabled={this.props.total == 0}>导出excel</button>

                    <FilterItem item={this.props.temporaryNotifyFilter} paramName="doctor_short_notice_statusString"/>

                    <FilterItem item={this.props.hospitalFilterList} paramName="hospital_id"/>

                    <FilterItem item={this.props.departmentFilterList} paramName="department_id"/>

                    <FilterItem item={this.props.backendMangerList}>
                        <CustomTextInput placeholder="请输入后台管理人员" textName="backend_manager"/>
                    </FilterItem>

                    <FilterItem size="small" item={this.props.operationPersonList}>
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
                    <Layout loading={this.state.loading}
                            minWidth={1400}
                            fixHead={true}
                            fixLeft={[0, 2]}
                            weight={weight}
                    >
                        <Head>
                            <Head.Item>医生账号</Head.Item>
                            <Head.Item>姓名</Head.Item>
                            <Head.Item>医院</Head.Item>
                            <Head.Item>科室</Head.Item>
                            <Head.Item>后台管理人员</Head.Item>
                            <Head.Item>运营人员</Head.Item>
                            <Head.Item>备注</Head.Item>
                            <Head.Item>门诊时间</Head.Item>
                            <Head.Item>周一</Head.Item>
                            <Head.Item>周二</Head.Item>
                            <Head.Item>周三</Head.Item>
                            <Head.Item>周四</Head.Item>
                            <Head.Item>周五</Head.Item>
                            <Head.Item>周六</Head.Item>
                            <Head.Item>周日</Head.Item>
                            <Head.Item>生效临时通知</Head.Item>
                            <Head.Item>临时通知记录</Head.Item>
                        </Head>
                        {
                            this.props.list.map((outPatient, index) => {
                                return (
                                    <Row key={outPatient['user_id']}
                                         onClick={e => this.setState({currentIndex: index})}
                                         selected={this.state.currentIndex == index}
                                         style={{minHeight: '60px'}}
                                    >
                                        <Row.Item>{outPatient['user_Name']}</Row.Item>
                                        <Row.Item>{outPatient['doctor_name']}</Row.Item>
                                        <Row.Item>{outPatient['hospital_name']}</Row.Item>
                                        <Row.Item>{outPatient['department_id']}</Row.Item>
                                        <Row.Item>{outPatient['backend_manager']}</Row.Item>
                                        <Row.Item>{outPatient['operation_manager']}</Row.Item>
                                        <Row.Item>
                                            {outPatient['remark']}
                                            <i className="fa fa-edit"
                                               onClick={e => this.setState({showEditRemark: true, currentIndex: index})}/>
                                        </Row.Item>
                                        <Row.Item>{outPatient['doctor_clinic_time']}</Row.Item>
                                        <Row.Item>{outPatient['day1']}</Row.Item>
                                        <Row.Item>{outPatient['day1']}</Row.Item>
                                        <Row.Item>{outPatient['day1']}</Row.Item>
                                        <Row.Item>{outPatient['day1']}</Row.Item>
                                        <Row.Item>{outPatient['day1']}</Row.Item>
                                        <Row.Item>{outPatient['day1']}</Row.Item>
                                        <Row.Item>{outPatient['day1']}</Row.Item>
                                        <Row.Item>{outPatient['l1']}</Row.Item>
                                        <Row.Item>
                                            <div onClick={e => this.setState({showDetail: true, currentIndex: index})}>点击查看</div>
                                        </Row.Item>
                                    </Row>
                                )
                            })
                        }
                    </Layout>
                </PaginateList>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {total, list, detail} = state['outPatientTimePaginateList']

    return {
        total,
        list,
        doctorDateDetail: detail,
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

    }
}

function mapActionToProps(dispatch) {
    return merge(bindActionCreators({
        fetchOutPatientTimePaginateList: actions.fetchOutPatientTimePaginateList,
        fetchDoctorDateDetail: actions.fetchDoctorDateDetail,
        updateRemark: actions.updateRemark
    }, dispatch), {
        fetchHospitalList: fetchHospitalList(dispatch),
        fetchDepartmentList: commonActions.fetchDepartmentList(dispatch),
    })
}

export default connect(mapStateToProps, mapActionToProps)(OutPatientTime)
