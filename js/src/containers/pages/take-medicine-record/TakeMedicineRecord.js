/**
 * Created by jiangyukun on 2017/1/22.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {merge} from 'lodash'
import {bindActionCreators} from 'redux'

import AppFunctionPage from '../common/AppFunctionPage'
import QueryFilter from '../../../components/core/QueryFilter'
import FilterItem from '../../../components/core/query-filter/FilterItem'
import CustomTextInput from '../../../components/core/query-filter/custom/CustomTextInput'
import PaginateList from '../../../components/core/PaginateList'
import Layout from "../../../components/core/layout/Layout"

import {fetchHospitalList} from '../../../actions/hospital'
import * as utils from '../../../core/utils'

class TakeMedicineRecord extends Component {
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
        // this.props.fetchOutPatientTimePaginateList(merge({}, this._queryFilter.getParams(), this._paginateList.getParams()))
    }

    componentDidMount() {
        this.beginFetch()
        if (this.props.hospitalList.length == 0) {
            this.props.fetchHospitalList()
        }
    }

    render() {
        const {Head, Row} = Layout

        return (
            <AppFunctionPage>
                <QueryFilter ref={c => this._queryFilter = c} className="ex-big-label"
                             beginFilter={() => this.beginFetch(1)}
                             searchKeyName="search_key"
                >

                    <button className="btn btn-primary mr-20" onClick={() => this.exportExcel()} disabled={this.props.total == 0}>导出excel</button>

                    <FilterItem item={this.props.hospitalFilterList} paramName="hospital_id"/>

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
                            minWidth={1200}
                            fixHead={true}
                            fixLeft={[0, 2]}
                            weight={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
                    >
                        <Head>
                            <Head.Item>患者编号</Head.Item>
                            <Head.Item>手机号码</Head.Item>
                            <Head.Item>患者姓名</Head.Item>
                            <Head.Item>主治医生</Head.Item>
                            <Head.Item>医院</Head.Item>
                            <Head.Item>科室</Head.Item>
                            <Head.Item>后台管理人员</Head.Item>
                            <Head.Item>运营人员</Head.Item>
                            <Head.Item>备注</Head.Item>
                            <Head.Item>服药状态</Head.Item>
                            <Head.Item>放弃服药原因</Head.Item>
                            <Head.Item>医生确认时间</Head.Item>
                        </Head>
                        <div>
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
                                        </Row>
                                    )
                                })
                            }
                        </div>
                    </Layout>
                </PaginateList>
            </AppFunctionPage>
        )
    }
}

function mapStateToProps(state) {
    return {
        total: 0,
        list: [],
        hospitalList: state['hospitalList'],
        hospitalFilterList: {
            typeCode: 'hospital',
            typeText: '医院',
            typeItemList: state.hospitalList
        },

        backendMangerList: utils.getFilterItem('backendManager', '后台管理人员', []),
        operationPersonList: utils.getFilterItem('operationPerson', '运营人员', [])
    }
}

function mapActionToProps(dispatch) {
    return merge(bindActionCreators({}, dispatch), {
        fetchHospitalList: fetchHospitalList(dispatch)
    })
}

export default connect(mapStateToProps, mapActionToProps)(TakeMedicineRecord)
