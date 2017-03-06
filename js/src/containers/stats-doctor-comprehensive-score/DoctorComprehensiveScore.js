/**
 * Created by jiangyukun on 2017/1/20.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {merge} from 'lodash'

import QueryFilter from '../../components/core/QueryFilter'
import FilterItem from '../../components/core/query-filter/FilterItem'
import CustomTextInput from '../../components/core/query-filter/custom/CustomTextInput'
import PaginateList from '../../components/core/PaginateList'
import Layout from "../../components/table-layout/Layout"
import EditRemark from '../common/EditRemark'
import ExportExcelDialog from './ExportExcelDialog'
import DoctorStatisticsDialog from './DoctorStatisticsDialog'

import * as utils from '../../core/utils'
import * as antdUtil from '../../core/utils/antdUtil'
import {fetchHospitalList} from '../../actions/hospital'
import * as actions from './doctor-comprehensive-score'

class DoctorComprehensiveScore extends Component {
  state = {
    currentIndex: -1,
    showExport: false,
    showStatistics: false,
    showEditRemark: false
  }

  beginFetch(newPageIndex) {
    this._paginateList.beginFetch(newPageIndex)
  }

  doFetch() {
    this.setState({currentIndex: -1})
    this.props.fetchScoreList(merge({}, this._queryFilter.getParams(), this._paginateList.getParams()))
  }

  updateRemark = (newRemark) => {
    this.props.updateRemark(this.props.list[this.state.currentIndex]['doctor_User_Id'], newRemark)
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
      <div className="app-function-page">
        {
          this.state.showEditRemark && this.state.currentIndex != -1 && (
            <EditRemark ref={c => this._editRemark = c}
                        updateRemark={this.updateRemark}
                        value={this.props.list[this.state.currentIndex]['doctor_Score_Remark']}
                        onExited={() => this.setState({showEditRemark: false})}/>
          )
        }

        {
          this.state.showExport && (
            <ExportExcelDialog
              onExited={() => this.setState({showExport: false})}/>
          )
        }

        {
          this.state.showStatistics && (
            <DoctorStatisticsDialog
              doctorId={this.props.list[this.state.currentIndex]['doctor_User_Id']}
              doctorName={this.props.list[this.state.currentIndex]['doctor_Name']}
              hospitalName={this.props.list[this.state.currentIndex]['hospital_Name']}
              fetchDoctorStatisticsList={this.props.fetchDoctorStatisticsList}
              doctorStatisticsList={this.props.statisticsList}
              onExited={() => this.setState({showStatistics: false})}/>
          )
        }

        <QueryFilter ref={c => this._queryFilter = c} className="ex-big-label"
                     beginFilter={() => this.beginFetch(1)}
                     searchKeyName="doctor_Phone"
                     placeholder="医生手机号"
        >
          <button className="btn btn-primary mr-20" onClick={() => this.setState({showExport: true})}>选择开始结束时间，导出Excel</button>

          <FilterItem item={this.props.hospitalFilterList} paramName="hospital_Name" useText={true}/>

          <FilterItem item={this.props.backendMangerList}>
            <CustomTextInput placeholder="请输入后台管理人员" textName="backend_Manager"/>
          </FilterItem>

          <FilterItem className="small-filter-item" item={this.props.operationPersonList}>
            <CustomTextInput placeholder="请输入运营人员" textName="operation_Manager"/>
          </FilterItem>
        </QueryFilter>

        <PaginateList ref={c => this._paginateList = c}
                      doFetch={() => this.doFetch()}
                      total={this.props.total}
                      startName="startRows"
                      lengthName="rows"
                      byName="order_By"
        >
          <Layout loading={this.props.loading}
                  minWidth={1000}
                  fixHead={true}
                  fixLeft={[0, 2]}
                  weight={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
          >
            <Head>
              <Head.Item>医生账号</Head.Item>
              <Head.Item>姓名</Head.Item>
              <Head.Item>医院</Head.Item>
              <Head.Item>科室</Head.Item>
              <Head.Item>后台管理人员</Head.Item>
              <Head.Item>运营人员</Head.Item>
              <Head.Item>备注</Head.Item>
              <Head.Item>上周评分</Head.Item>
              <Head.Item>上周排名</Head.Item>
              <Head.Item>评分排名记录</Head.Item>
            </Head>
            <div>
              {
                this.props.list.map((comprehensiveScore, index) => {
                  return (
                    <Row key={comprehensiveScore['doctor_User_Id']}
                         onClick={e => this.setState({currentIndex: index})}
                         selected={this.state.currentIndex == index}
                         style={{minHeight: '60px'}}
                    >
                      <Row.Item>{comprehensiveScore['doctor_Phone']}</Row.Item>
                      <Row.Item>{comprehensiveScore['doctor_Name']}</Row.Item>
                      <Row.Item>{comprehensiveScore['hospital_Name']}</Row.Item>
                      <Row.Item>{comprehensiveScore['department_Name']}</Row.Item>
                      <Row.Item>{comprehensiveScore['backend_Manager']}</Row.Item>
                      <Row.Item>{comprehensiveScore['operation_Manager']}</Row.Item>
                      <Row.Item>
                        {comprehensiveScore['doctor_Score_Remark']}
                        <i className="edit-remark-svg"
                           onClick={e => this.setState({showEditRemark: true, currentIndex: index})}/>
                      </Row.Item>
                      <Row.Item>{comprehensiveScore['doctor_Last_Week_Score']}</Row.Item>
                      <Row.Item>{comprehensiveScore['doctor_Last_Week_Ranking']}</Row.Item>
                      <Row.Item>
                        <div className="click-to-look" onClick={e => this.setState({showStatistics: true, currentIndex: index})}>点击查看</div>
                      </Row.Item>
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
    ...state['doctorComprehensiveScoreList'],
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
  return merge(bindActionCreators({
    fetchScoreList: actions.fetchScoreList,
    updateRemark: actions.updateRemark,
    clearRemarkUpdated: actions.clearRemarkUpdated,
    fetchDoctorStatisticsList: actions.fetchDoctorStatisticsList
  }, dispatch), {
    fetchHospitalList: fetchHospitalList(dispatch)
  })
}

export default connect(mapStateToProps, mapActionToProps)(DoctorComprehensiveScore)
