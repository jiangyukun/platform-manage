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
import EditRemark from '../common/EditRemark'

import * as utils from '../../../core/utils'
import * as antdUtil from '../../../core/utils/antdUtil'
import {fetchHospitalList} from '../../../actions/hospital'
import * as actions from '../../../actions/pages/take-medicine-record'

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
    this.props.fetchTakeMedicineRecordPaginateList(merge({}, this._queryFilter.getParams(), this._paginateList.getParams()))
  }

  exportExcel() {
    location.href = 'take-medicine-record/takeMedicineRecordListExcel'
  }

  updateRemark = (newRemark) => {
    this.props.updateRemark(this.props.list[this.state.currentIndex]['patient_User_Id'], newRemark)
  }

  componentDidMount() {
    this.beginFetch()
    if (this.props.hospitalList.length == 0) {
      this.props.fetchHospitalList()
    }
  }

  componentDidUpdate() {
    if (this.props.remarkUpdated) {
      if (this._editRemark) {
        this._editRemark.close()
      }
      this.props.clearRemarkUpdated()
      antdUtil.tipSuccess('更新备注成功！')
    }
  }

  render() {
    const {Head, Row} = Layout

    return (
      <AppFunctionPage>
        {
          this.state.showEditRemark && this.state.currentIndex != -1 && (
            <EditRemark ref={c => this._editRemark = c}
                        updateRemark={this.updateRemark}
                        value={this.props.list[this.state.currentIndex]['takeMedicine_Remark']}
                        onExited={() => this.setState({showEditRemark: false})}/>
          )
        }
        <QueryFilter ref={c => this._queryFilter = c} className="ex-big-label"
                     beginFilter={() => this.beginFetch(1)}
                     searchKeyName="search_key"
        >

          <button className="btn btn-primary mr-20" onClick={() => this.exportExcel()} disabled={this.props.total == 0}>导出excel</button>

          <FilterItem item={this.props.takeMedicineStatus} paramName="takeMedicine_Status" useText={true}/>
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
                  weight={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
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
              <Head.Item>处理结果</Head.Item>
              <Head.Item>处理原因</Head.Item>
              <Head.Item>医生备注</Head.Item>
              <Head.Item>医生确认时间</Head.Item>
            </Head>
            <div>
              {
                this.props.list.map((record, index) => {
                  return (
                    <Row key={record['patient_User_Id']}
                         onClick={e => this.setState({currentIndex: index})}
                         selected={this.state.currentIndex == index}
                         style={{minHeight: '60px'}}
                    >
                      <Row.Item>{record['patient_Code']}</Row.Item>
                      <Row.Item>{record['patient_Phone']}</Row.Item>
                      <Row.Item>{record['patient_Name']}</Row.Item>
                      <Row.Item>{record['department_id']}</Row.Item>
                      <Row.Item>{record['hospital_Name']}</Row.Item>
                      <Row.Item>{record['department_Name']}</Row.Item>
                      <Row.Item>{record['backend_manager']}</Row.Item>
                      <Row.Item>{record['operation_manager']}</Row.Item>
                      <Row.Item>
                        {record['takeMedicine_Remark']}
                        <i className="fa fa-edit"
                           onClick={e => this.setState({showEditRemark: true, currentIndex: index})}/>
                      </Row.Item>
                      <Row.Item>{record['takeMedicine_Status']}</Row.Item>
                      <Row.Item>{record['give_Up_Reason_Content']}</Row.Item>
                      <Row.Item>{record['doctor_Remark']}</Row.Item>
                      <Row.Item>{record['doctor_Confirm_Time']}</Row.Item>
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
  const {list, total, remarkUpdated} = state['takeMedicineRecordPaginateList']
  return {
    total,
    list,
    remarkUpdated,
    hospitalList: state['hospitalList'],
    hospitalFilterList: utils.getFilterItem('hospital', '医院', state.hospitalList),
    takeMedicineStatus: utils.getFilterItem('takeMedicineStatus', '服药状态', [{value: '1', text: '已服药'}, {value: '2', text: '放弃服药'}]),
    backendMangerList: utils.getFilterItem('backendManager', '后台管理人员', []),
    operationPersonList: utils.getFilterItem('operationPerson', '运营人员', [])
  }
}

function mapActionToProps(dispatch) {
  return merge(bindActionCreators({
    fetchTakeMedicineRecordPaginateList: actions.fetchTakeMedicineRecordPaginateList,
    updateRemark: actions.updateRemark,
    clearRemarkUpdated: actions.clearRemarkUpdated
  }, dispatch), {
    fetchHospitalList: fetchHospitalList(dispatch)
  })
}

export default connect(mapStateToProps, mapActionToProps)(TakeMedicineRecord)
