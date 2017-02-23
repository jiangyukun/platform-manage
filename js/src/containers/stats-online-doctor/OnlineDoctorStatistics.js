/**
 * Created by jiangyukun on 2016/12/8.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {merge} from 'lodash'
import moment from 'moment'
import DatePicker from 'antd/lib/date-picker'

import QueryFilter from '../../components/core/QueryFilter'
import FilterItem from '../../components/core/query-filter/FilterItem'
import CustomDateRange from '../../components/core/query-filter/custom/CustomDateRange'
import PaginateList from '../../components/core/PaginateList'
import SortBy from '../../components/core/paginate-list/SortBy'
import Layout from "../../components/core/layout/Layout"
import EditRemark from '../common/EditRemark'
import YesOrNoDialog from '../common/YesOrNoDialog'

import * as utils from '../../core/utils'
import {formatDateStr} from '../../core/dateUtils'
import {getYesOrNoText} from '../../core/formatBusData'
import * as antdUtil from '../../core/utils/antdUtil'
import {
  fetchPaginateList, fetchStatisticsInfo, updateRemark, updateIsStatistics,
  clearRemark, clearStatisticsUpdated
} from './online-doctor'

class OnlineDoctorStatistics extends Component {
  state = {
    currentIndex: -1,
    hoverIndex: -1,
    showEditIsStatistics: false,
    showEditRemark: false,
    startDay: moment().startOf('month'),
    endDay: moment()
  }

  beginFetch(newPageIndex) {
    this._paginateList.beginFetch(newPageIndex)
  }

  doFetch() {
    this.setState({currentIndex: -1})
    this.props.fetchPaginateList(merge({}, this._queryFilter.getParams(), this._paginateList.getParams()))
  }

  updateRemark = (newRemark) => {
    this.props.updateRemark(this.props.list[this.state.currentIndex]['score_Log_Id'], newRemark)
  }

  updateIsStatistics = (newValue) => {
    this.props.updateIsStatistics(this.props.list[this.state.currentIndex]['score_Log_Id'], newValue)
  }

  handleStartDayChange = (m) => {
    this.setState({startDay: m}, this.refreshStatisticsInfo)
  }

  handleEndDayChange = (m) => {
    this.setState({endDay: m}, this.refreshStatisticsInfo)
  }

  refreshStatisticsInfo = () => {
    if (this.state.startDay && this.state.endDay) {
      this.props.fetchStatisticsInfo(this.state.startDay.format('YYYY-MM-DD'), this.state.endDay.format('YYYY-MM-DD'))
    }
  }

  componentDidMount() {
    this.beginFetch()
    this.refreshStatisticsInfo()
  }

  componentDidUpdate() {
    if (this.props.remarkUpdated) {
      antdUtil.tipSuccess('更新备注成功！')
      this.props.clearRemark()
    }
    if (this.props.statisticsValueUpdated) {
      antdUtil.tipSuccess('更新是否统计成功！')
      this.props.clearStatisticsUpdated()
    }
  }

  render() {
    const {Head, Row} = Layout
    let {statisticsInfo} = this.props

    return (
      <div className="app-function-page online-doctor-statistics">
        {
          this.state.showEditRemark && this.state.currentIndex != -1 && (
            <EditRemark updateRemark={this.updateRemark}
                        value={this.props.list[this.state.currentIndex]['score_Log_Remark']}
                        remarkUpdated={this.props.remarkUpdated}
                        onExited={() => this.setState({showEditRemark: false})}/>
          )
        }
        {
          this.state.showEditIsStatistics && this.state.currentIndex != -1 && (
            <YesOrNoDialog title="修改是否统计"
                           value={this.props.list[this.state.currentIndex]['is_Statistics']}
                           updateYesOrNo={this.updateIsStatistics}
                           valueUpdated={this.props.statisticsValueUpdated}
                           onExited={() => this.setState({showEditIsStatistics: false})}/>
          )
        }

        <header>
          <label>统计结果：</label>
          <span className="select-date-wrap">
           <DatePicker inputPrefixCls="my-start"
                       placeholder="开始时间"
                       format="YYYY-MM-DD"
                       value={this.state.startDay}
                       onChange={this.handleStartDayChange}/>
          </span>
          到
          <span className="select-date-wrap">
            <DatePicker inputPrefixCls="my-end"
                        placeholder="结束时间"
                        format="YYYY-MM-DD"
                        value={this.state.endDay}
                        onChange={this.handleEndDayChange}/>
          </span>
          <div>
            <div className="score-level-item">
              <span>5分：</span>
              <span>{statisticsInfo['fiveCount']}次</span>
              {statisticsInfo['fivePercent'] && (
                <span>
                  占{statisticsInfo['fivePercent']}
                </span>
              )}
            </div>
            <div className="score-level-item">
              <span>4分：</span>
              <span>{statisticsInfo['fourCount']}次</span>
              {statisticsInfo['fourPercent'] && (
                <span>
                  占{statisticsInfo['fourPercent']}
                </span>
              )}
            </div>
            <div className="score-level-item">
              <span>3分：</span>
              <span>{statisticsInfo['threeCount']}次</span>
              {statisticsInfo['threePercent'] && (
                <span>
                  占{statisticsInfo['threePercent']}
                </span>
              )}
            </div>
            <div className="score-level-item">
              <span>2分：</span>
              <span>{statisticsInfo['twoCount']}次</span>
              {statisticsInfo['twoPercent'] && (
                <span>
                  占{statisticsInfo['twoPercent']}
                </span>
              )}
            </div>
            <div className="score-level-item">
              <span>1分：</span>
              <span>{statisticsInfo['oneCount']}次</span>
              {statisticsInfo['onePercent'] && (
                <span>
                  占{statisticsInfo['onePercent']}
                </span>
              )}
            </div>
            <div className="score-level-item">
              <span>被关闭：</span>
              <span>{statisticsInfo['lessOneCount']}次</span>
              {statisticsInfo['lessOnePercent'] && (
                <span>
                  占{statisticsInfo['lessOnePercent']}
                </span>
              )}
            </div>
          </div>
        </header>

        <QueryFilter ref={c => this._queryFilter = c} className="ex-big-label"
                     beginFilter={() => this.beginFetch(1)}
                     searchKeyName="key_Words"
        >
          <FilterItem item={this.props.isStatisticsList} paramName="is_Statistics"/>
          <FilterItem size="small" item={this.props.register}>
            <CustomDateRange startName="score_Create_Begin_Time" endName="score_Create_End_Time"/>
          </FilterItem>
        </QueryFilter>

        <PaginateList ref={c => this._paginateList = c}
                      doFetch={() => this.doFetch()}
                      total={this.props.total}
                      lengthName="limit"
                      byName="order_By"
        >
          <Layout loading={this.props.loading}
                  minWidth={1200}
                  fixHead={true}
                  fixLeft={[0, 2]}
                  weight={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
          >
            <Head>
              <Head.Item>评分人</Head.Item>
              <Head.Item>
                <SortBy by="score_Log_Value">评分</SortBy>
              </Head.Item>
              <Head.Item>是否统计</Head.Item>
              <Head.Item>备注</Head.Item>
              <Head.Item>评分时间</Head.Item>
            </Head>
            <div>
              {
                this.props.list.map((onlineDoctor, index) => {
                  return (
                    <Row key={onlineDoctor['score_Log_Id']}
                         onClick={e => this.setState({currentIndex: index})}
                         onMouseEnter={() => this.setState({hoverIndex: index})}
                         selected={this.state.currentIndex == index}
                         style={{minHeight: '40px'}}
                    >
                      <Row.Item>{onlineDoctor['score_Name']}</Row.Item>
                      <Row.Item>{onlineDoctor['score_Log_Value']}</Row.Item>
                      <Row.Item>
                        {getYesOrNoText(onlineDoctor['is_Statistics'])}
                        {
                          this.state.hoverIndex == index && (
                            <i className="fa fa-edit" onClick={e => this.setState({showEditIsStatistics: true, currentIndex: index})}/>
                          )
                        }
                      </Row.Item>
                      <Row.Item>
                        {onlineDoctor['score_Log_Remark']}
                        <i className="fa fa-edit" onClick={e => this.setState({showEditRemark: true, currentIndex: index})}/>
                      </Row.Item>
                      <Row.Item>{formatDateStr(onlineDoctor['score_Log_Time'])}</Row.Item>
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

export default connect(state => ({
  ...state['onlineDoctor'],
  isStatisticsList: utils.getFilterItem('isStatistics', '是否统计'),
  register: utils.getFilterItem('register', '创建日期', [])
}), {
  fetchPaginateList,
  fetchStatisticsInfo,
  updateIsStatistics,
  updateRemark,
  clearRemark,
  clearStatisticsUpdated
})(OnlineDoctorStatistics)
