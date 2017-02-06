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
import CustomTextInput from '../../../components/core/query-filter/custom/CustomTextInput'
import CustomDateRange from '../../../components/core/query-filter/custom/CustomDateRange'
import SubOptions from '../../../components/core/query-filter/custom/SubOptions'
import PaginateList from '../../../components/core/PaginateList'
import SmartList from '../../../components/core/list/SmartList'
import HeadContainer from '../../../components/core/list/HeadContainer'
import BodyContainer from '../../../components/core/list/BodyContainer'
import AddHospitalDialog from './dialog/AddHospitalDialog'
import EditHospitalDialog from './dialog/EditHospitalDialog'
import {getFilterItem} from '../../../core/utils'
import {getYesOrNoText} from '../../../core/formatBusData'
import {fetchHospitalList} from '../../../actions/hospital'
import * as actions from '../../../actions/pages/hospital-manage'

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

  beginFetch(newPageIndex) {
    this._paginateList.beginFetch(newPageIndex)
  }

  doFetch() {
    this.setState({currentIndex: -1, loading: true})
    this.props.fetchHospitalList(merge({}, this._queryFilter.getParams(), this._paginateList.getParams()))
      .then(() => this.setState({loading: false}))
  }

  onSelectProvince(selectedItem) {
    this.provinceId = selectedItem.value
    if (!this.props.cityMapper[this.provinceId]) {
      this.props.fetchCityList(selectedItem.value)
    }
  }

  componentDidMount() {
    this.beginFetch()
    if (this.props.provinceList.length == 0) {
      this.props.fetchProvinceList()
    }
    if (this.props.hospitalList.length == 0) {
      this.props.fetchHospitalFilterList()
    }
  }

  render() {
    let cityFilterList = []
    if (this.provinceId) {
      cityFilterList = this.props.cityMapper[this.provinceId]
    }

    return (
      <div className="app-function-page">
        {
          this.state.showAdd && <AddHospitalDialog
            ref={c => this._addHospitalDialog = c}
            provinceList={this.props.provinceList}
            cityMapper={this.props.cityMapper}
            fetchCityMaxSerialNumber={this.props.fetchCityMaxSerialNumber}
            fetchCityList={this.props.fetchCityList}
            addHospital={this.props.addHospital}
            onAddSuccess={() => this.beginFetch(1)}
            onExited={() => this.setState({showAdd: false})}/>
        }

        {
          this.state.showEdit && <EditHospitalDialog
            hospitalId={this.props.list[this.state.currentIndex]['id']}
            provinceList={this.props.provinceList}
            cityMapper={this.props.cityMapper}
            fetchCityList={this.props.fetchCityList}
            fetchCityMaxSerialNumber={this.props.fetchCityMaxSerialNumber}
            fetchHospitalInfo={this.props.fetchHospitalInfo}
            updateHospitalInfo={this.props.updateHospitalInfo}
            onExited={() => this.setState({showEdit: false})}
          />
        }

        <QueryFilter ref={c => this._queryFilter = c} className="ex-big-label"
                     beginFilter={() => this.beginFetch(1)}
                     searchKeyName="key_Words"
        >
          <button className="btn btn-primary mr-20" onClick={() => this.setState({showAdd: true})}>新增</button>

          <button className="btn btn-primary mr-20"
                  onClick={() => this.setState({showEdit: true})}
                  disabled={this.state.currentIndex == -1}>查看
          </button>

          <FilterItem className="middle-filter-item" item={this.props.hospitalFilterList} paramName="hospital_Name" useText={true}/>

          <FilterItem className="big-filter-item"
                      item={this.props.provinceFilterList}
                      onSelect={this.onSelectProvince}
                      paramName="province"
                      useText={true}
          >
            <SubOptions title="城市" options={cityFilterList} paramName="city" useText={true}/>
          </FilterItem>

          <FilterItem item={this.props.serialNumberList} paramName="hospital_Num"/>

          <FilterItem item={this.props.isProjectHospital} paramName="hospital_In_Project"/>

          <FilterItem item={this.props.backendMangerList}>
            <CustomTextInput placeholder="请输入后台管理人员" textName="backend_Manager"/>
          </FilterItem>

          <FilterItem className="small-filter-item" item={this.props.operationPersonList}>
            <CustomTextInput placeholder="请输入运营人员" textName="operation_Manager"/>
          </FilterItem>

          <FilterItem className="big-filter-item" item={this.props.register}>
            <CustomDateRange startName="hospital_Create_Begin_Time" endName="hospital_Create_End_Time"/>
          </FilterItem>
        </QueryFilter>

        <PaginateList ref={c => this._paginateList = c}
                      doFetch={() => this.doFetch()}
                      total={this.props.total}
                      lengthName="limit"
                      byName="order_By"
        >

          <SmartList loading={this.state.loading} fixHead={true} fixLeft={[1, 2]}>
            <HeadContainer>
              <ul className="flex-list header">
                <li className="item flex2">医院名称</li>
                <li className="item flex1">省份</li>
                <li className="item flex1">城市/地区</li>
                <li className="item flex1">区域号</li>
                <li className="item flex1">流水号</li>
                <li className="item flex1">是否项目医院</li>
                <li className="item flex1">后台管理人员</li>
                <li className="item flex1">运营人员</li>
                <li className="item flex1">创建时间</li>
              </ul>
            </HeadContainer>
            <BodyContainer>
              <div>
                {
                  this.props.list.map((hospital, index) => {
                    return (
                      <ul key={index} className={classnames('flex-list body', {'selected': this.state.currentIndex == index})}
                          style={{height: '40px'}}
                          onClick={e => this.setState({currentIndex: index})}
                          onDoubleClick={e => this.setState({currentIndex: index, showEdit: true})}
                      >
                        <li className="item flex2">{hospital['hospital_Name']}</li>
                        <li className="item flex1">{hospital['province']}</li>
                        <li className="item flex1">{hospital['city']}</li>
                        <li className="item flex1">{hospital['cityCode']}</li>
                        <li className="item flex1">{hospital['hospitalSerialNumber']}</li>
                        <li className="item flex1">{getYesOrNoText(hospital['hospital_In_Project'])}</li>
                        <li className="item flex1">{hospital['backend_Manager'] || '-'}</li>
                        <li className="item flex1">{hospital['operation_Manager'] || '-'}</li>
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
  let {total = 0, list = []} = state['hospitalManageList']
  return {
    total,
    list,
    hospitalList: state.hospitalList,
    provinceList: state.provinceList,
    cityMapper: state.cityMapper,
    hospitalFilterList: {
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
    backendMangerList: getFilterItem('backendManager', '后台管理人员', []),
    operationPersonList: getFilterItem('operationPerson', '运营人员', []),
    register: getFilterItem('register', '创建日期', [])
  }
}

function mapActionToProps(dispatch) {
  return {
    fetchHospitalFilterList: fetchHospitalList(dispatch),
    fetchHospitalList: actions.fetchHospitalList(dispatch),
    fetchProvinceList: actions.fetchProvinceList(dispatch),
    fetchCityList: actions.fetchCityList(dispatch),
    fetchCityMaxSerialNumber: actions.fetchCityMaxSerialNumber(dispatch),
    addHospital: actions.addHospital(dispatch),
    fetchHospitalInfo: actions.fetchHospitalInfo(dispatch),
    updateHospitalInfo: actions.updateHospitalInfo(dispatch)
  }
}

export default connect(mapStateToProps, mapActionToProps)(HospitalManage)
