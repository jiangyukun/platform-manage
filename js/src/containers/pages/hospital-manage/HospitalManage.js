/**
 * Created by jiangyukun on 2016/11/30.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {merge} from 'lodash'
import moment from 'moment'
import classnames from 'classnames'


import QueryFilter from '../../../components/core/QueryFilter'
import FilterItem from '../../../components/core/query-filter/FilterItem'
import CustomDateRange from '../../../components/core/query-filter/custom/CustomDateRange'
import SubDateSelect from '../../../components/core/query-filter/custom/SubDateSelect'
import SubOptions from '../../../components/core/query-filter/custom/SubOptions'
import PaginateList from '../../../components/core/PaginateList'

import {getFilterItem, getStartEndDate} from '../../../core/utils'
import {getYesOrNoText} from '../../../core/formatBusData'
import {fetchHospitalList} from '../../../actions/pages/hospital-manage'

class HospitalManage extends Component {
    constructor() {
        super()
        this.state = {currentIndex: -1}
    }

    fetch() {
        this.setState({currentIndex: -1})
        this.allConditions = this._queryFilter.getAllConditions()
        this.pageInfo = this._paginateList.getPageInfo()
        this.props.fetchHospitalList(merge({}, this.pageInfo, this.handleFilterConditions()))
    }

    handleFilterConditions() {
        return {}
    }

    componentDidMount() {
        this.fetch()
    }

    render() {
        return (
            <div className="app-function-page">
                <QueryFilter ref={c => this._queryFilter = c} filter={filterCondition => this.filter(filterCondition)} className="ex-big-label ">
                    <button className="btn btn-primary mr-20" onClick={e => this.editDoctor()} disabled={this.state.currentIndex == -1}>查看</button>
                    <FilterItem className="middle-filter-item" item={this.props.hospitalList}/>

                    <FilterItem className="big-filter-item" item={this.props.register}>
                        <CustomDateRange/>
                    </FilterItem>
                </QueryFilter>

                <PaginateList ref={c => this._paginateList = c} total={this.props.total}>
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>医院名称</th>
                            <th>省份</th>
                            <th>城市/地区</th>
                            <th>区域号</th>
                            <th>流水号</th>
                            <th>是否项目医院</th>
                            <th>创建时间</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.props.list.map((hospital, index) => {
                                return (
                                    <tr key={index} style={{height: '50px'}}>
                                        <td>{hospital['hospital_Name']}</td>
                                        <td>{hospital['province']}</td>
                                        <td>{hospital['city']}</td>
                                        <td>{hospital['cityCode']}</td>
                                        <td>{hospital['hospitalSerialNumber']}</td>
                                        <td>{getYesOrNoText(hospital['hospital_In_Project'])}</td>
                                        <td>{moment(hospital['hospital_Create_Time']).format('YYYY-MM-DD HH:mm')}</td>
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

function mapStateToProps(state) {
    let {total, list} = state['hospitalManageList']
    return {
        total,
        list,
        hospitalList: {
            typeCode: 'hospital',
            typeText: '医院',
            typeItemList: state.hospitalList
        },
        register: getFilterItem('register', '创建日期', getStartEndDate())
    }
}

function mapActionToProps(dispatch) {
    return {
        fetchHospitalList: fetchHospitalList(dispatch)
    }
}

export default connect(mapStateToProps, mapActionToProps)(HospitalManage)
