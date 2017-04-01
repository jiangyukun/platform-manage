/**
 * Created by jiangyukun on 2017/2/23.
 */
import React, {Component, PropTypes} from 'react'
import {merge} from 'lodash'
import {connect} from 'react-redux'

import TwoSearchKey from './query-filter/TwoSearchKey'
import FilterItem from '../../components/core/query-filter/FilterItem'
import CustomDateRange from '../../components/core/query-filter/custom/CustomDateRange'
import PaginateList from '../../components/core/PaginateList'
import Layout from '../../components/table-layout/Layout'
import HighLight from '../../components/txt/HighLight'
import Message from './message/Message'
import DownloadFileDialog from '../common/DownloadFileDialog'

import * as utils from '../../core/utils'
import {formatDateStr} from '../../core/dateUtils'
import {fetchGroupHistoryMessageList, fetchGroupList, fetchHistoryExcelList} from './history-message'

class TabGroupChat extends Component {
  state = {
    searchKey1: '',
    searchKey2: '',
    showHistoryExcelDialog: false
  }

  beginFetch(newPageIndex) {
    this._paginateList.beginFetch(newPageIndex)
  }

  doFetch() {
    this.setState({currentIndex: -1})
    this.props.fetchGroupHistoryMessageList(merge({}, this._queryFilter.getParams(), this._paginateList.getParams()))
  }

  exportExcel = () => {
    let chatType = 'groupchat'
    location.href = `chat/report/currentMonth/export/${chatType}`
  }

  historyExcelList = () => {
    this.setState({showHistoryExcelDialog: true})
    this.props.fetchHistoryExcelList('groupchat')
  }

  componentDidMount() {
    this.beginFetch()
    this.props.fetchGroupList()
  }

  render() {
    const {Head, Row} = Layout

    return (
      <div className="flex-full">
        {
          this.state.showHistoryExcelDialog && (
            <DownloadFileDialog fileList={this.props.groupHistoryExcelList} onExited={() => this.setState({showHistoryExcelDialog: false})}/>
          )
        }
        <TwoSearchKey ref={c => this._queryFilter = c} className="ex-big-label"
                      beginFilter={() => this.beginFetch(1)}
                      searchKeyName1="chat_Msg_Content"
                      searchKeyName2="patient_Phone"
                      onSearchKey1Change={searchKey1 => this.setState({searchKey1})}
                      onSearchKey2Change={searchKey2 => this.setState({searchKey2})}
        >
          {
            this.props.isCanExport && (
              <button className="btn btn-primary mr-20" onClick={this.exportExcel} disabled={this.props.total == 0}>导出本月群聊Excel</button>
            )
          }
          {
            this.props.isCanExport && (
              <button className="btn btn-default mr-20" onClick={this.historyExcelList}
                      disabled={this.props.total == 0}>下载群聊历史
              </button>
            )
          }

          <FilterItem size="small" item={this.props.filters.sendDate}>
            <CustomDateRange startName="chat_Send_Begin_Time" endName="chat_Send_End_Time"/>
          </FilterItem>
          <FilterItem item={this.props.filters.user} paramName="chat_Target"/>
        </TwoSearchKey>

        <PaginateList ref={c => this._paginateList = c}
                      doFetch={() => this.doFetch()}
                      total={this.props.total}
                      lengthName="limit"
        >
          <Layout loading={this.props.loading}
                  minWidth={1000}
                  fixHead={true}
                  fixLeft={[0, 2]}
                  weight={[1, 1, 1, 2, 1]}
          >
            <Head>
              <Head.Item>群组</Head.Item>
              <Head.Item>发送人账号</Head.Item>
              <Head.Item>发送人姓名</Head.Item>
              <Head.Item>消息内容</Head.Item>
              <Head.Item>发送时间</Head.Item>
            </Head>
            <div>
              {
                this.props.list.map((historyMessage, index) => {
                  return (
                    <Row key={historyMessage['id']}
                         onClick={e => this.setState({currentIndex: index})}
                         onMouseEnter={() => this.setState({hoverIndex: index})}
                         selected={this.state.currentIndex == index}
                         style={{minHeight: '40px'}}
                    >
                      <Row.Item>{historyMessage['chat_Group_Name']}</Row.Item>
                      <Row.Item>
                        <HighLight match={this.state.searchKey2}>
                          {historyMessage['chat_From']}
                        </HighLight>
                      </Row.Item>
                      <Row.Item>{historyMessage['chat_From_Name']}</Row.Item>
                      <Row.Item>
                        <Message type={historyMessage['chat_Msg_Type']}
                                 data={historyMessage['chat_Msg_Content']}
                                 match={this.state.searchKey1}
                                 previewImage={this.props.previewImage}/>
                      </Row.Item>
                      <Row.Item>{formatDateStr(historyMessage['chat_Time'])}</Row.Item>
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

TabGroupChat.propTypes = {
  list: PropTypes.array,
  filters: PropTypes.object,
  loading: PropTypes.bool,
  total: PropTypes.number,
  isCanEdit: PropTypes.bool,
  isCanExport: PropTypes.bool,
  previewImage: PropTypes.func,
  fetchGroupHistoryMessageList: PropTypes.func
}

const users = [
  {value: '1', text: '主治医生'},
  {value: '2', text: '在线医生'},
  {value: '3', text: '贝壳客服'}
]

export default connect((state, ownProps) => {
  const {historyMessageGroup: {total, list, loading, groupList}} = state
  return {
    total, list, loading,
    isCanEdit: ownProps.isCanEdit,
    isCanExport: ownProps.isCanExport,
    filters: {
      sendDate: utils.getFilterItem('sendDate', '消息发送时间', []),
      user: utils.getFilterItem('user', '群组', groupList)
    }
  }
}, {
  fetchGroupHistoryMessageList,
  fetchGroupList,
  fetchHistoryExcelList
})(TabGroupChat)
