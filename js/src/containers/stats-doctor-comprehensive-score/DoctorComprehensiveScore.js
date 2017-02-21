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
import Layout from "../../components/core/layout/Layout"
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
    const {Head, HeadItem, Row, RowItem} = Layout

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

        {this.state.showExport && (
          <ExportExcelDialog
            onExited={() => this.setState({showExport: false})}/>
        )}

        {this.state.showStatistics && (
          <DoctorStatisticsDialog
            doctorId={this.props.list[this.state.currentIndex]['doctor_User_Id']}
            doctorName={this.props.list[this.state.currentIndex]['doctor_Name']}
            hospitalName={this.props.list[this.state.currentIndex]['hospital_Name']}
            fetchDoctorStatisticsList={this.props.fetchDoctorStatisticsList}
            doctorStatisticsList={this.props.statisticsList}
            onExited={() => this.setState({showStatistics: false})}/>
        )}

        <QueryFilter ref={c => this._queryFilter = c} className="ex-big-label"
                     beginFilter={() => this.beginFetch(1)}
                     searchKeyName="search_key"
        >
          <button className="btn btn-primary mr-20" onClick={() => this.setState({showExport: true})}
                  disabled={this.props.total == 0}>导出excel
          </button>

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
          <Layout loading={this.props.loading}
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
            <div>
              {
                this.props.list.map((comprehensiveScore, index) => {
                  return (
                    <Row key={comprehensiveScore['doctor_User_Id']}
                         onClick={e => this.setState({currentIndex: index})}
                         selected={this.state.currentIndex == index}
                         style={{minHeight: '60px'}}
                    >
                      <RowItem>{comprehensiveScore['doctor_Phone']}</RowItem>
                      <RowItem>{comprehensiveScore['doctor_Name']}</RowItem>
                      <RowItem>{comprehensiveScore['hospital_Name']}</RowItem>
                      <RowItem>{comprehensiveScore['department_Name']}</RowItem>
                      <RowItem>{comprehensiveScore['backend_Manager']}</RowItem>
                      <RowItem>{comprehensiveScore['operation_Manager']}</RowItem>
                      <RowItem>
                        {comprehensiveScore['doctor_Score_Remark']}
                        <i className="fa fa-edit"
                           onClick={e => this.setState({showEditRemark: true, currentIndex: index})}/>
                      </RowItem>
                      <RowItem>{comprehensiveScore['doctor_Last_Week_Score']}</RowItem>
                      <RowItem>{comprehensiveScore['doctor_Last_Week_Ranking']}</RowItem>
                      <RowItem>
                        <div className="click-to-look" onClick={e => this.setState({showStatistics: true, currentIndex: index})}>点击查看</div>
                      </RowItem>
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
