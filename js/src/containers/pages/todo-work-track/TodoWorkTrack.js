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

import * as utils from '../../../core/utils'
import {fetchHospitalList} from '../../../actions/hospital'
import * as commonActions from '../../../actions/pages/common'
import * as actions from '../../../actions/pages/todo-work-track'

class TodoWorkTrack extends Component {
  state = {
    loading: false,
    currentIndex: -1
  }

  beginFetch(newPageIndex) {
    this._paginateList.beginFetch(newPageIndex)
  }

  doFetch() {
    this.setState({currentIndex: -1})
    this.props.fetchTodoWorkList(merge({}, this._queryFilter.getParams(), this._paginateList.getParams()))
  }

  exportExcel() {
    location.href = ''
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

    return (
      <AppFunctionPage>
        <QueryFilter ref={c => this._queryFilter = c} className="ex-big-label"
                     beginFilter={() => this.beginFetch(1)}
                     searchKeyName="search_key"
        >

          <button className="btn btn-primary mr-20" onClick={() => this.exportExcel()} disabled={this.props.total == 0}>导出Excel</button>

          <FilterItem item={this.props.hospitalFilterList} paramName="hospital_id"/>
          <FilterItem item={this.props.departmentFilterList} paramName="department_Name" useText={true}/>

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
              <Head.Item>医生账号</Head.Item>
              <Head.Item>姓名</Head.Item>
              <Head.Item>医院</Head.Item>
              <Head.Item>科室</Head.Item>
              <Head.Item>后台管理人员</Head.Item>
              <Head.Item>运营人员</Head.Item>
              <Head.Item>备注</Head.Item>
              <Head.Item>访视1未处理</Head.Item>
              <Head.Item>访视2未处理</Head.Item>
              <Head.Item>访视3未处理</Head.Item>
              <Head.Item>访视4未处理</Head.Item>
              <Head.Item>访视5未处理</Head.Item>
            </Head>
            <div>
              {
                this.props.list.map((todo, index) => {
                  return (
                    <Row key={index}
                         onClick={e => this.setState({currentIndex: index})}
                         selected={this.state.currentIndex == index}
                         style={{minHeight: '60px'}}
                    >
                      <Row.Item>{todo['patient_Code']}</Row.Item>
                      <Row.Item>{todo['patient_Phone']}</Row.Item>
                      <Row.Item>{todo['patient_Name']}</Row.Item>
                      <Row.Item>{todo['department_id']}</Row.Item>
                      <Row.Item>{todo['hospital_Name']}</Row.Item>
                      <Row.Item>{todo['department_Name']}</Row.Item>
                      <Row.Item>{todo['backend_manager']}</Row.Item>
                      <Row.Item>{todo['operation_manager']}</Row.Item>
                      <Row.Item>
                        {todo['takeMedicine_Remark']}
                        <i className="fa fa-edit"
                           onClick={e => this.setState({showEditRemark: true, currentIndex: index})}/>
                      </Row.Item>
                      <Row.Item>{todo['takeMedicine_Status']}</Row.Item>
                      <Row.Item>{todo['give_Up_Reason_Content']}</Row.Item>
                      <Row.Item>备注</Row.Item>
                      <Row.Item>{todo['doctor_Confirm_Time']}</Row.Item>
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
  const {list, total, remarkUpdated} = state['todoWorkTrackList'] || {list: [], total: 0}
  return {
    total,
    list,
    remarkUpdated,
    hospitalList: state['hospitalList'],
    departmentList: state['departmentList'],
    hospitalFilterList: utils.getFilterItem('hospital', '医院', state.hospitalList),
    departmentFilterList: {
      typeCode: 'department',
      typeText: '科室',
      typeItemList: state.departmentList
    },
    backendMangerList: utils.getFilterItem('backendManager', '后台管理人员', []),
    operationPersonList: utils.getFilterItem('operationPerson', '运营人员', [])
  }
}

function mapActionToProps(dispatch) {
  return merge(bindActionCreators({
    fetchTodoWorkList: actions.fetchTodoWorkList
  }, dispatch), {
    fetchHospitalList: fetchHospitalList(dispatch),
    fetchDepartmentList: commonActions.fetchDepartmentList(dispatch),
  })
}

export default connect(mapStateToProps, mapActionToProps)(TodoWorkTrack)
