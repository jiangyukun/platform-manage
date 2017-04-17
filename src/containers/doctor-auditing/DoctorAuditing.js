import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {merge} from 'lodash'

import {QueryFilter, PaginateList} from '../../components/core/'
import FilterItem from '../../components/core/query-filter/FilterItem'
import {CustomTextInput, CustomDateRange} from '../../components/core/query-filter/custom/'
import SortBy from '../../components/core/paginate-list/SortBy'
import Layout from '../../components/table-layout/Layout'
import ShowMoreText from '../../components/txt/ShowMoreText'

import AddDoctorDialog from './dialog/AddDoctorDialog'
import EditDoctorDialog from './dialog/EditDoctorDialog'
import EditRemark from '../common/EditRemark'
import ImagePreview from '../../components/core/ImagePreview'
import CommonSelectDialog from "../common/CommonSelectDialog"

import constants from '../../core/constants'
import * as utils from '../../core/utils'
import * as antdUtil from '../../core/utils/antdUtil'
import {formatDateStr} from '../../core/dateUtils'
import {getAuditStatus, isVisitDoctor, getVisitStatus} from '../../core/formatBusData'
import * as commonActions from '../../actions/common'
import {fetchHospitalList} from '../../actions/hospital'
import * as actions from './doctor-auditing'

const visitStatusList = [
  {value: '0', text: '未完成'},
  {value: '1', text: '已完成'},
  {value: '2', text: '未联系'},
]

class DoctorAuditing extends Component {
  state = {
    currentIndex: -1,
    showAdd: false,
    showEdit: false,
    showImage: false,
    showEditMark: false,
    showUpdateVisitDialog: false
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

  updateRemark = (newRemark) => {
    const item = this.props.list[this.state.currentIndex]
    this.props.updateRemark(item['user_Id'], newRemark)
  }

  updateVisit = (newStatus) => {
    const item = this.props.list[this.state.currentIndex]
    this.props.updateDoctorAuditingStatus(item['phone'], newStatus)
  }

  exportExcel() {
    utils.exportExcel('export/doctorInfoListExcel', this._queryFilter.getParams())
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

  componentDidUpdate() {
    if (this.props.visitStatusUpdateSuccess) {
      this.props.clearVisitStatusUpdateSuccess()
      antdUtil.tipSuccess('更新随访状态成功！')
    }
    if (this.props.remarkUpdateSuccess) {
      this.props.clearRemarkUpdated()
      antdUtil.tipSuccess('修改备注成功！')
    }
  }

  render() {
    const {isCanEdit, isCanExport} = this.props.authority
    const item = this.props.list[this.state.currentIndex]
    const {Head, Row} = Layout

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
            <EditDoctorDialog doctorId={item['doctor_Id']}
                              doctorInfo={item}
                              hospitalList={this.props.hospitalList}
                              positionList={this.props.positionList}
                              departmentList={this.props.departmentList}
                              updateDoctorAuditingState={this.props.updateDoctorAuditingState}
                              updateDoctorInfo={this.props.updateDoctorInfo}
                              updateDoctorInfoSuccess={() => this.beginFetch()}
                              isCanEdit={isCanEdit}
                              onExited={() => this.setState({showEdit: false})}/>
          )
        }

        {
          this.state.showEditMark && (
            <EditRemark value={item['doctor_Info_Remark']}
                        updateRemark={this.updateRemark}
                        remarkUpdated={this.props.remarkUpdateSuccess}
                        onExited={() => this.setState({showEditMark: false})}/>
          )
        }

        {
          this.state.showImage && (
            <ImagePreview url={this.imageUrl} onExited={() => this.setState({showImage: false})}/>
          )
        }

        {
          this.state.showUpdateVisitDialog && this.state.currentIndex != -1 && (
            <CommonSelectDialog title='更新随访状态'
                                value={item['is_Complete_Visit'] || constants.visitState.UN_CONTACT}
                                options={visitStatusList}
                                onConfirm={this.updateVisit}
                                closeSignal={this.props.visitStatusUpdateSuccess}
                                onExited={() => this.setState({showUpdateVisitDialog: false})}/>
          )
        }

        <QueryFilter ref={c => this._queryFilter = c} className="ex-big-label"
                     beginFilter={() => this.beginFetch(1)}
                     searchKeyName="key_Words"
        >
          {
            isCanEdit && (
              <button className="btn btn-primary mr-20" onClick={() => this.setState({showAdd: true})}>注册</button>
            )
          }
          <button className="btn btn-primary mr-20"
                  onClick={() => this.setState({showEdit: true})}
                  disabled={this.state.currentIndex == -1}>查看
          </button>
          {
            isCanExport && (
              <button className="btn btn-primary mr-20" onClick={() => this.exportExcel()}>导出到excel</button>
            )
          }

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
          <Layout loading={this.props.loading}
                  minWidth={1770}
                  fixHead={true}
                  fixLeft={[0, 1]}
                  weight={[100, 100, 120, 90, 110, 100, 80, 80, 110, 80, 80, 140, 100, 80, '120px', 90, '120px']}
          >
            <Head>
              <Head.Item>
                <SortBy by="phone">手机号码</SortBy>
              </Head.Item>
              <Head.Item>医生姓名</Head.Item>
              <Head.Item>医院</Head.Item>
              <Head.Item>科室</Head.Item>
              <Head.Item>是否随访医生</Head.Item>
              <Head.Item>职称</Head.Item>
              <Head.Item>个人照片</Head.Item>
              <Head.Item>持证照片</Head.Item>
              <Head.Item>
                <SortBy by="doctor_practicing_number" activeWidth={100}>执业证编号</SortBy>
              </Head.Item>
              <Head.Item>专长</Head.Item>
              <Head.Item>审核状态</Head.Item>
              <Head.Item>备注</Head.Item>
              <Head.Item>后台管理人员</Head.Item>
              <Head.Item>运营人员</Head.Item>
              <Head.Item>是否完成随访</Head.Item>
              <Head.Item>
                <SortBy by="doctor_info_creat_time" activeWidth={90}>创建日期</SortBy>
              </Head.Item>
              <Head.Item>医生完善信息时间</Head.Item>
            </Head>
            <div>
              {
                this.props.list.map((doctor, index) => {
                  return (
                    <Row key={doctor['user_Id'] || index}
                         onClick={e => this.setState({currentIndex: index})}
                         selected={this.state.currentIndex == index}
                         style={{minHeight: '50px'}}
                    >

                      <Row.Item>{doctor['phone']}</Row.Item>
                      <Row.Item>{doctor['doctor_Name']}</Row.Item>
                      <Row.Item>{doctor['hospital_Id']}</Row.Item>
                      <Row.Item>{doctor['department_Id']}</Row.Item>
                      <Row.Item>{isVisitDoctor(doctor['is_Doctor_Purview'])}</Row.Item>
                      <Row.Item>{doctor['title_Id']}</Row.Item>
                      <Row.Item>
                        {
                          doctor['doctor_Photo'] && (
                            <span className="look-picture-txt" onClick={e => this.imagePreview(doctor['doctor_Photo'])}>查看</span>
                          )
                        }
                      </Row.Item>
                      <Row.Item>
                        {
                          doctor['doctor_Practicing_Photo'] && (
                            <span className="look-picture-txt" onClick={e => this.imagePreview(doctor['doctor_Practicing_Photo'])}>查看</span>
                          )
                        }
                      </Row.Item>
                      <Row.Item>{doctor['doctor_Practicing_Number']}</Row.Item>
                      <Row.Item>
                        <ShowMoreText limit={20}>{doctor['doctor_Major'] || ''}</ShowMoreText>
                      </Row.Item>
                      <Row.Item>{getAuditStatus(doctor['doctor_Is_Checked'])}</Row.Item>
                      <Row.Item>
                        <ShowMoreText limit={50}>{doctor['doctor_Info_Remark']}</ShowMoreText>
                        {
                          isCanEdit && (
                            <span className="edit-remark-icon">
                              <i className="edit-remark-svg"
                                 onClick={() => this.setState({showEditMark: true})}></i>
                            </span>
                          )
                        }
                      </Row.Item>
                      <Row.Item>{doctor['backend_Manager']}</Row.Item>
                      <Row.Item>{doctor['operation_Manager']}</Row.Item>
                      <Row.Item>
                        {
                          getVisitStatus(doctor['is_Complete_Visit']) || '未知'
                        }
                        {
                          isCanEdit && (
                            <i className="edit-remark-svg"
                               onClick={e => this.setState({showUpdateVisitDialog: true, currentIndex: index})}/>
                          )
                        }
                      </Row.Item>
                      <Row.Item>{formatDateStr(doctor['doctor_Info_Creat_Time'])}</Row.Item>
                      <Row.Item>{formatDateStr(doctor['doctor_Complete_Info_Time'])}</Row.Item>
                    </Row>
                  )
                })
              }
            </div>
          </Layout>
        </PaginateList>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state['doctor_auditing'],
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
  return merge(bindActionCreators({
    updateDoctorAuditingStatus: actions.updateDoctorAuditingStatus,
    clearVisitStatusUpdateSuccess: actions.clearVisitStatusUpdateSuccess,
    updateRemark: actions.updateRemark,
    clearRemarkUpdated: actions.clearRemarkUpdated,
  }, dispatch), {
    fetchHospitalList: fetchHospitalList(dispatch),
    fetchDoctorPaginateList: actions.fetchDoctorPaginateList(dispatch),
    fetchPositionList: commonActions.fetchPositionList(dispatch),
    fetchDepartmentList: commonActions.fetchDepartmentList(dispatch),

    updateDoctorAuditingState: actions.updateDoctorAuditingState(dispatch),
    updateDoctorInfo: actions.updateDoctorInfo(dispatch),
    addNewDoctor: actions.addNewDoctor(dispatch)
  })
}

export default connect(mapStateToProps, mapActionToProps)(DoctorAuditing)
