/**
 * Created by jiangyukun on 2017/1/20.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {merge} from 'lodash'

import QueryFilter from '../../../../components/core/QueryFilter'
import FilterItem from '../../../../components/core/query-filter/FilterItem'
import CustomTextInput from '../../../../components/core/query-filter/custom/CustomTextInput'
import PaginateList from '../../../../components/core/PaginateList'
import Layout from "../../../../components/core/layout/Layout"

import * as utils from '../../../../core/utils'
import {fetchHospitalList} from '../../../../actions/hospital'

class DoctorComprehensiveScore extends Component {
    state = {
        showExport: false
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
        const {Head, HeadItem, Row, RowItem} = Layout

        return (
            <div className="app-function-page">
                {this.state.showExport && (<div>a</div>)}


                <QueryFilter ref={c => this._queryFilter = c} className="ex-big-label"
                             beginFilter={() => this.beginFetch(1)}
                             searchKeyName="search_key"
                >
                    <button className="btn btn-primary mr-20" onClick={() => this.exportExcel()} disabled={this.props.total == 0}>导出excel</button>

                    <FilterItem item={this.props.hospitalFilterList} paramName="hospital_id"/>

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
                    <Layout loading={this.state.loading}
                            minWidth={1000}
                            fixHead={true}
                            fixLeft={[0, 2]}
                            weight={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
                    >
                        <Head>
                            <HeadItem>医生账号</HeadItem>
                            <HeadItem>姓名</HeadItem>
                            <HeadItem>医院</HeadItem>
                            <HeadItem>科室</HeadItem>
                            <HeadItem>后台管理人员</HeadItem>
                            <HeadItem>运营人员</HeadItem>
                            <HeadItem>备注</HeadItem>
                            <HeadItem>上周五评分</HeadItem>
                            <HeadItem>上周五排名</HeadItem>
                            <HeadItem>评分排名记录</HeadItem>
                        </Head>
                        {
                            this.props.list.map((comprehensiveScore, index) => {
                                return (
                                    <Row key={comprehensiveScore['id']}
                                         onClick={e => this.setState({currentIndex: index})}
                                         selected={this.state.currentIndex == index}
                                         style={{minHeight: '60px'}}
                                    >
                                        <RowItem>{comprehensiveScore['user_Name']}</RowItem>
                                        <RowItem>{comprehensiveScore['doctor_name']}</RowItem>
                                        <RowItem>{comprehensiveScore['hospital_name']}</RowItem>
                                        <RowItem>{comprehensiveScore['department_id']}</RowItem>
                                        <RowItem>{comprehensiveScore['backend_manager']}</RowItem>
                                        <RowItem>{comprehensiveScore['operation_manager']}</RowItem>
                                        <RowItem>
                                            {comprehensiveScore['remark']}
                                            <i className="fa fa-edit"
                                               onClick={e => this.setState({showEditRemark: true, currentIndex: index})}/>
                                        </RowItem>
                                        <RowItem>{comprehensiveScore['rate']}</RowItem>
                                        <RowItem>{comprehensiveScore['rate']}</RowItem>
                                        <RowItem>
                                            <div onClick={e => this.setState({showDetail: true, currentIndex: index})}>点击查看</div>
                                        </RowItem>
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
    const {total, list} = {}

    return {
        total: 0,
        list: [],
        hospitalList: state.hospitalList,
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
        fetchHospitalList: fetchHospitalList(dispatch),
    })
}

export default connect(mapStateToProps, mapActionToProps)(DoctorComprehensiveScore)
