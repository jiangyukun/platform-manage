/**
 * Created by jiangyukun on 2016/11/30.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {merge} from 'lodash'
import moment from 'moment'

import QueryFilter from '../../../components/core/QueryFilter'
import FilterItem from '../../../components/core/query-filter/FilterItem'
import CustomDateRange from '../../../components/core/query-filter/custom/CustomDateRange'
import SubOptions from '../../../components/core/query-filter/custom/SubOptions'
import PaginateList from '../../../components/core/PaginateList'
import SmartList from '../../../components/core/list/SmartList'

import {getFilterItem, getStartEndDate} from '../../../core/utils'
import {ConditionResolver, getFilterConditionValue} from '../../../core/busHelper'
import {getYesOrNoText} from '../../../core/formatBusData'
import {fetchHospitalList, fetchProvinceList, fetchCityList} from '../../../actions/pages/hospital-manage'

class HospitalManage extends Component {
    constructor() {
        super()
        this.onSelectProvince = this.onSelectProvince.bind(this)
        this.state = {currentIndex: -1, loading: false}
    }

    beginFetch() {
        this._paginateList.beginFetch()
    }

    doFetch() {
        this.setState({currentIndex: -1, loading: true})
        this.allConditions = this._queryFilter.getAllConditions()
        this.pageInfo = this._paginateList.getPageInfo()
        this.props.fetchHospitalList(merge({}, this.pageInfo, this.handleFilterConditions())).then(() => this.setState({loading: false}))
    }

    handleFilterConditions() {
        let option = new ConditionResolver(this.allConditions.filters)
            .resolve('isProjectHospital', 'hospital_In_Project')
            .resolve('hospital', 'hospital_Name', true)
            .resolve('serialNumber', 'hospital_Num')
            .resolveDate('register', 'hospital_Create_Begin_Time', 'hospital_Create_End_Time')
            .getCondition()

        let value = getFilterConditionValue(this.allConditions.filters, 'province')
        if (value) {
            if (typeof value != 'object') {
                option['province'] = value
            } else {
                option['province'] = value.main
                option['city'] = value.custom
            }
        }
        option['key_Words'] = this.allConditions.searchKey
        return option
    }

    onSelectProvince(selectedItem) {
        console.log(selectedItem)
        this.props.fetchCityList(selectedItem.value)
    }

    componentDidMount() {
        this.beginFetch()
        this.props.fetchProvinceList()
    }

    render() {
        return (
            <div className="app-function-page">
                <QueryFilter ref={c => this._queryFilter = c} className="ex-big-label"
                             beginFilter={() => this.beginFetch()}>
                    <button className="btn btn-primary mr-20" onClick={e => this.editDoctor()} disabled={this.state.currentIndex == -1}>查看</button>
                    <FilterItem className="middle-filter-item" item={this.props.hospitalList}/>
                    <FilterItem className="big-filter-item" item={this.props.provinceList} onSelect={this.onSelectProvince}>
                        <SubOptions title="城市" options={this.props.cityList}/>
                    </FilterItem>
                    <FilterItem className="middle-filter-item" item={this.props.serialNumberList}/>
                    <FilterItem className="middle-filter-item" item={this.props.isProjectHospital}/>
                    <FilterItem className="big-filter-item" item={this.props.register}>
                        <CustomDateRange/>
                    </FilterItem>
                </QueryFilter>

                <PaginateList ref={c => this._paginateList = c}
                              beginFetch={() => this.beginFetch()} doFetch={() => this.doFetch()}
                              total={this.props.total}>

                    <SmartList className="paginate-list-data-container"
                               loading={this.state.loading}
                               fixHead={true} fixLeft={[1, 2]}>
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
                    </SmartList>
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
        provinceList: {
            typeCode: 'province',
            typeText: '省份',
            typeItemList: state.provinceList
        },
        cityList: state.cityList,
        serialNumberList: getFilterItem('serialNumber', '流水号', [{value: '1', text: '有'}, {value: '0', text: '无'}]),
        isProjectHospital: getFilterItem('isProjectHospital', '是否项目医院'),
        register: getFilterItem('register', '创建日期', getStartEndDate())
    }
}

function mapActionToProps(dispatch) {
    return {
        fetchHospitalList: fetchHospitalList(dispatch),
        fetchProvinceList: fetchProvinceList(dispatch),
        fetchCityList: fetchCityList(dispatch)
    }
}

export default connect(mapStateToProps, mapActionToProps)(HospitalManage)
