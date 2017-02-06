import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'
import {merge} from 'lodash'

import QueryFilter from '../../../components/core/QueryFilter'
import FilterItem from '../../../components/core/query-filter/FilterItem'
import CustomTextInput from '../../../components/core/query-filter/custom/CustomTextInput'
import CustomDateRange from '../../../components/core/query-filter/custom/CustomDateRange'
import PaginateList from '../../../components/core/PaginateList'
import SortBy from '../../../components/core/paginate-list/SortBy'
import SmartList from '../../../components/core/list/SmartList'
import HeadContainer from '../../../components/core/list/HeadContainer'
import BodyContainer from '../../../components/core/list/BodyContainer'
import AddDoctorDialog from './dialog/AddDoctorDialog'
import EditDoctorDialog from './dialog/EditDoctorDialog'
import EditRemark from '../common/EditRemark'
import ImagePreview from '../../../components/core/ImagePreview'

import constants from '../../../core/constants'
import * as utils from '../../../core/utils'
import * as antdUtil from '../../../core/utils/antdUtil'
import {formatDateStr} from '../../../core/dateUtils'
import {getAuditStatus, isVisitDoctor} from '../../../core/formatBusData'
import * as commonActions from '../../../actions/pages/common'
import {fetchHospitalList} from '../../../actions/hospital'
import * as actions from '../../../actions/pages/doctor-auditing'

class DoctorAuditing extends Component {
  constructor() {
    super()
    this.state = {
      currentIndex: -1,
      loading: false,
      showAdd: false,
      showEdit: false,
      showImage: false,
      showEditMark: false
    }
  }

  beginFetch(newPageIndex) {
    this._paginateList.beginFetch(newPageIndex)
  }

  doFetch() {
    this.setState({currentIndex: -1, loading: true})
    this.props.fetchDoctorPaginateList(merge(this._queryFilter.getParams(), this._paginateList.getParams()))
      .then(() => this.setState({loading: false}))
  }

  imagePreview(imageUrl) {
    this.imageUrl = imageUrl
    this.setState({showImage: true})
  }

  editRemark(doctorId, remark) {
    console.log(doctorId)
    this.doctorId = doctorId
    this.remark = remark
    this.setState({showEditMark: true})
  }

  updateDoctorRemark(newRemark) {
    this.props.updateDoctorRemark(this.doctorId, this.doctorId, constants.remarkFlag.DOCTOR_AUDITING, newRemark)
      .then(() => antdUtil.tipSuccess('修改备注成功！'), err => antdUtil.tipErr(err))
      .then(() => this.setState({showEditMark: false}))
  }

  exportExcel() {
    location.href = 'export/doctorInfoListExcel' + utils.urlParam(this._queryFilter.getParams())
  }

  componentDidMount() {
    this.beginFetch()
    if (this.props.hospitalList.length == 0) {
      this.props.fetchHospitalList()
    }
    if (this.props.positionList.length == 0) {
      this.props.fetchPositionList()
    }
    if (this.props.departmentList.length == 0) {
      this.props.fetchDepartmentList()
    }
  }

  render() {
    return (
      <div className="app-function-page">
        {
          this.state.showAdd && (
            <AddDoctorDialog
              hospitalList={this.props.hospitalList}
              positionList={this.props.positionList}
              departmentList={this.props.departmentList}
              addNewDoctor={this.props.addNewDoctor}
              addDoctorSuccess={() => this.beginFetch()}
              onExited={() => this.setState({showAdd: false})}/>
          )
        }

        {
          this.state.showEdit && this.state.currentIndex != -1 && (
            <EditDoctorDialog doctorId={this.props.list[this.state.currentIndex]['doctor_Id']}
                              doctorInfo={this.props.list[this.state.currentIndex]}
                              hospitalList={this.props.hospitalList}
                              positionList={this.props.positionList}
                              departmentList={this.props.departmentList}
                              updateDoctorAuditingState={this.props.updateDoctorAuditingState}
                              updateDoctorInfo={this.props.updateDoctorInfo}
                              updateDoctorInfoSuccess={() => this.beginFetch()}
                              onExited={() => this.setState({showEdit: false})}/>
          )
        }

        {
          this.state.showEditMark && (
            <EditRemark value={this.remark}
                        updateRemark={newRemark => this.updateDoctorRemark(newRemark)}
                        onExited={() => this.setState({showEditMark: false})}/>
          )
        }

        {
          this.state.showImage && (
            <ImagePreview url={this.imageUrl} onExited={() => this.setState({showImage: false})}/>
          )
        }

        <QueryFilter ref={c => this._queryFilter = c} className="ex-big-label"
                     beginFilter={() => this.beginFetch(1)}
                     searchKeyName="key_Words"
        >
          <button className="btn btn-primary mr-20" onClick={() => this.setState({showAdd: true})}>注册</button>
          <button className="btn btn-primary mr-20"
                  onClick={() => this.setState({showEdit: true})}
                  disabled={this.state.currentIndex == -1}>查看
          </button>
          <button className="btn btn-primary mr-20" onClick={() => this.exportExcel()}>导出到excel</button>

          <FilterItem item={this.props.hospitalFilterList} paramName="hospital_Name" useText={true}/>

          <FilterItem item={this.props.positionFilterList} paramName="title_Name" useText={true}/>

          <FilterItem item={this.props.departmentFilterList} paramName="department_Name" useText={true}/>

          <FilterItem item={this.props.auditingStateFilter} paramName="doctor_Is_Checked"/>

          <FilterItem item={this.props.backendMangerList}>
            <CustomTextInput placeholder="请输入后台管理人员" textName="backend_Manager"/>
          </FilterItem>

          <FilterItem className="small-filter-item" item={this.props.operationPersonList}>
            <CustomTextInput placeholder="请输入运营人员" textName="operation_Manager"/>
          </FilterItem>

          <FilterItem className="small-filter-item" item={this.props.registerFilter}>
            <CustomDateRange startName="doctor_Info_Create_Begin_Time" endName="doctor_Info_Create_End_Time"/>
          </FilterItem>
        </QueryFilter>

        <PaginateList ref={c => this._paginateList = c}
                      doFetch={() => this.doFetch()}
                      total={this.props.total}
                      lengthName="limit"
                      byName="order_By"
        >
          <SmartList loading={this.state.loading} fixHead={true} width={1660} fixLeft={[0, 1]}>
            <HeadContainer>
              <ul className="flex-list header">
                <li className="item" style={{width: '100px'}}>
                  <SortBy by="phone">手机号码</SortBy>
                </li>
                <li className="item" style={{width: '100px'}}>医生姓名</li>
                <li className="item" style={{width: '120px'}}>医院</li>
                <li className="item" style={{width: '100px'}}>科室</li>
                <li className="item" style={{width: '130px'}}>是否随访医生</li>
                <li className="item" style={{width: '100px'}}>职称</li>
                <li className="item" style={{width: '80px'}}>个人照片</li>
                <li className="item" style={{width: '80px'}}>持证照片</li>
                <li className="item" style={{width: '120px'}}>
                  <SortBy by="doctor_practicing_number" activeWidth={100}>执业证编号</SortBy>
                </li>
                <li className="item" style={{width: '100px'}}>专长</li>
                <li className="item" style={{width: '100px'}}>审核状态</li>
                <li className="item" style={{width: '140px'}}>备注</li>
                <li className="item" style={{width: '110px'}}>后台管理人员</li>
                <li className="item" style={{width: '80px'}}>运营人员</li>
                <li className="item" style={{width: '120px'}}>
                  <SortBy by="doctor_info_creat_time" activeWidth={90}>创建日期</SortBy>
                </li>
              </ul>
            </HeadContainer>
            <BodyContainer>
              <div>
                {
                  this.props.list.map((doctor, index) => {
                    return (
                      <ul key={doctor['doctor_Id'] || index}
                          style={{minHeight: '50px'}}
                          className={classnames('flex-list body', {'selected': this.state.currentIndex == index})}
                          onClick={e => this.setState({currentIndex: index})}
                          onDoubleClick={e => this.setState({currentIndex: index, showEdit: true})}
                      >

                        <li className="item" style={{width: '100px'}}>{doctor['phone']}</li>
                        <li className="item" style={{width: '100px'}}>{doctor['doctor_Name']}</li>
                        <li className="item" style={{width: '120px'}}>{doctor['hospital_Id']}</li>
                        <li className="item" style={{width: '100px'}}>{doctor['department_Id']}</li>
                        <li className="item" style={{width: '130px'}}>{isVisitDoctor(doctor['is_Doctor_Purview'])}</li>
                        <li className="item" style={{width: '100px'}}>{doctor['title_Id']}</li>
                        <li className="item" style={{width: '80px'}}>
                          {
                            doctor['doctor_Photo'] && (
                              <span className="look-picture-txt" onClick={e => this.imagePreview(doctor['doctor_Photo'])}>查看</span>
                            )
                          }
                        </li>
                        <li className="item" style={{width: '80px'}}>
                          {
                            doctor['doctor_Practicing_Photo'] && (
                              <span className="look-picture-txt" onClick={e => this.imagePreview(doctor['doctor_Practicing_Photo'])}>查看</span>
                            )
                          }
                        </li>
                        <li className="item" style={{width: '120px'}}>{doctor['doctor_Practicing_Number']}</li>
                        <li className="item" style={{width: '100px'}}>{doctor['doctor_Major'] || ''}</li>
                        <li className="item" style={{width: '100px'}}>{getAuditStatus(doctor['doctor_Is_Checked'])}</li>
                        <li className="item" style={{width: '140px'}}>
                          {doctor['doctor_Info_Remark']}
                          <span>
                                                        <i className="fa fa-edit"
                                                           onClick={() => this.editRemark(doctor['doctor_Id'], doctor['doctor_Info_Remark'])}></i>
                                                    </span>
                        </li>
                        <li className="item" style={{width: '110px'}}>{doctor['backend_Manager']}</li>
                        <li className="item" style={{width: '80px'}}>{doctor['operation_Manager']}</li>
                        <li className="item" style={{width: '120px'}}>{formatDateStr(doctor['doctor_Info_Creat_Time'])}</li>
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
  const {list, total} = state['doctorAuditingPaginateList']
  return {
    list,
    total,
    hospitalList: state.hospitalList,
    positionList: state.positionList,
    departmentList: state.departmentList,
    hospitalFilterList: {
      typeCode: 'hospital',
      typeText: '医院',
      typeItemList: state.hospitalList
    },
    positionFilterList: {
      typeCode: 'position',
      typeText: '职位',
      typeItemList: state.positionList
    },
    departmentFilterList: {
      typeCode: 'department',
      typeText: '科室',
      typeItemList: state.departmentList
    },
    auditingStateFilter: utils.getFilterItem('auditingState', '审核状态', [
      {value: constants.auditingState.auditing, text: '审核中'},
      {value: constants.auditingState.auditingPass, text: '审核通过'},
      {value: constants.auditingState.auditingUnPass, text: '审核不通过'}
    ]),
    backendMangerList: utils.getFilterItem('backendManager', '后台管理人员', []),
    operationPersonList: utils.getFilterItem('operationPerson', '运营人员', []),
    registerFilter: utils.getFilterItem('register', '创建日期', [])
  }
}

function mapActionToProps(dispatch) {
  return {
    fetchHospitalList: fetchHospitalList(dispatch),
    fetchDoctorPaginateList: actions.fetchDoctorPaginateList(dispatch),
    fetchPositionList: commonActions.fetchPositionList(dispatch),
    fetchDepartmentList: commonActions.fetchDepartmentList(dispatch),

    updateDoctorAuditingState: actions.updateDoctorAuditingState(dispatch),
    updateDoctorInfo: actions.updateDoctorInfo(dispatch),
    updateDoctorRemark: commonActions.updateRemark(dispatch),
    addNewDoctor: actions.addNewDoctor(dispatch)
  }
}

export default connect(mapStateToProps, mapActionToProps)(DoctorAuditing)
