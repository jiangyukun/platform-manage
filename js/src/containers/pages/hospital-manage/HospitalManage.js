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
import SubOptions from '../../../components/core/query-filter/custom/SubOptions'
import PaginateList from '../../../components/core/PaginateList'
import SmartList from '../../../components/core/list/SmartList'
import HeadContainer from '../../../components/core/list/HeadContainer'
import BodyContainer from '../../../components/core/list/BodyContainer'

import AddHospitalDialog from './dialog/AddHospitalDialog'
import EditHospitalDialog from './dialog/EditHospitalDialog'
import {getFilterItem, getStartEndDate} from '../../../core/utils'
import {ConditionResolver, getFilterCondition} from '../../../core/queryFilterHelper'
import {getYesOrNoText} from '../../../core/formatBusData'
import {fetchHospitalList, fetchProvinceList, fetchCityList, addHospital, fetchHospitalInfo} from '../../../actions/pages/hospital-manage'

class HospitalManage extends Component {
    constructor() {
        super()
        this.onSelectProvince = this.onSelectProvince.bind(this)
        this.state = {
            currentIndex: -1,
            loading: false,
            showAdd: false,
            showEdit: false
        }
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

        let condition = getFilterCondition(this.allConditions.filters, 'province')
        if (condition) {
            const value = condition.value
            if (typeof value != 'object') {
                option['province'] = condition.text
            } else {
                option['province'] = value.main.text
                option['city'] = value.custom.text
            }
        }
        option['key_Words'] = this.allConditions.searchKey
        return option
    }

    onSelectProvince(selectedItem) {
        this.provinceId = selectedItem.value
        this.props.fetchCityList(selectedItem.value)
    }

    addHospital() {
        this._addHospitalDialog.open()
    }

    editHospital() {
        this.setState({showEdit: true})
    }

    componentDidMount() {
        this.beginFetch()
        this.props.fetchProvinceList()
    }

    render() {
        let cityFilterList = []
        if (this.provinceId) {
            cityFilterList = this.props.cityMapper[this.provinceId]
        }
        let selectHospitalId
        if (this.state.currentIndex != -1) {
            selectHospitalId = this.props.list[this.state.currentIndex]['id']
        }

        return (
            <div className="app-function-page">
                <AddHospitalDialog
                    ref={c => this._addHospitalDialog = c}
                    provinceList={this.props.provinceList}
                    cityMapper={this.props.cityMapper}
                    fetchCityList={this.props.fetchCityList}
                    addHospital={this.props.addHospital}/>

                    <EditHospitalDialog
                        ref={c => this._editHospitalDialog = c}
                        show={this.state.showEdit}
                        close={() => this.setState({showEdit: false})}
                        hospitalId={selectHospitalId}
                        provinceList={this.props.provinceList}
                        cityMapper={this.props.cityMapper}
                        fetchCityList={this.props.fetchCityList}
                        fetchHospitalInfo={this.props.fetchHospitalInfo}/>

                <QueryFilter ref={c => this._queryFilter = c} className="ex-big-label"
                             beginFilter={() => this.beginFetch()}>
                    <button className="btn btn-primary mr-20" onClick={this.addHospital.bind(this)}>新增</button>
                    <button className="btn btn-primary mr-20" onClick={this.editHospital.bind(this)} disabled={this.state.currentIndex == -1}>查看
                    </button>
                    <FilterItem className="middle-filter-item" item={this.props.hospitalList}/>
                    <FilterItem className="big-filter-item" item={this.props.provinceFilterList} onSelect={this.onSelectProvince}>
                        <SubOptions title="城市" options={cityFilterList}/>
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

                    <SmartList loading={this.state.loading} fixHead={true} fixLeft={[1, 2]}>
                        <HeadContainer>
                            <ul className="flex-list header">
                                <li className="item flex2">医院名称</li>
                                <li className="item flex1">省份</li>
                                <li className="item flex1">城市/地区</li>
                                <li className="item flex1">区域号</li>
                                <li className="item flex1">流水号</li>
                                <li className="item flex1">是否项目医院</li>
                                <li className="item flex1">创建时间</li>
                            </ul>
                        </HeadContainer>
                        <BodyContainer>
                            <div>
                                {
                                    this.props.list.map((hospital, index) => {
                                        return (
                                            <ul key={index} className={classnames('flex-list body', {'selected': this.state.currentIndex == index})}
                                                onClick={e => this.setState({currentIndex: index})}
                                            >
                                                <li className="item flex2">{hospital['hospital_Name']}</li>
                                                <li className="item flex1">{hospital['province']}</li>
                                                <li className="item flex1">{hospital['city']}</li>
                                                <li className="item flex1">{hospital['cityCode']}</li>
                                                <li className="item flex1">{hospital['hospitalSerialNumber']}</li>
                                                <li className="item flex1">{getYesOrNoText(hospital['hospital_In_Project'])}</li>
                                                <li className="item flex1">{moment(hospital['hospital_Create_Time']).format('YYYY-MM-DD HH:mm')}</li>
                                            </ul>
                                        )
                                    })
                                }
                            </div>
                        </BodyContainer>
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
        provinceList: state.provinceList,
        cityMapper: state.cityMapper,
        hospitalList: {
            typeCode: 'hospital',
            typeText: '医院',
            typeItemList: state.hospitalList
        },
        provinceFilterList: {
            typeCode: 'province',
            typeText: '省份',
            typeItemList: state.provinceList
        },
        serialNumberList: getFilterItem('serialNumber', '流水号', [{value: '1', text: '有'}, {value: '0', text: '无'}]),
        isProjectHospital: getFilterItem('isProjectHospital', '是否项目医院'),
        register: getFilterItem('register', '创建日期', getStartEndDate())
    }
}

function mapActionToProps(dispatch) {
    return {
        fetchHospitalList: fetchHospitalList(dispatch),
        fetchProvinceList: fetchProvinceList(dispatch),
        fetchCityList: fetchCityList(dispatch),
        addHospital: addHospital(dispatch),
        fetchHospitalInfo: fetchHospitalInfo(dispatch)
    }
}

export default connect(mapStateToProps, mapActionToProps)(HospitalManage)
