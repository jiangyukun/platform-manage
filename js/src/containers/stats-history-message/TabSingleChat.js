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
import Layout from '../../components/core/layout/Layout'
import HighLight from '../../components/txt/HighLight'
import Message from './message/Message'
import DownloadFileDialog from '../common/DownloadFileDialog'

import * as utils from '../../core/utils'
import {formatDateStr} from '../../core/dateUtils'
import {fetchSingleHistoryMessageList, fetchHistoryExcelList} from './history-message'

class TabSingleChat extends Component {
  state = {
    currentIndex: -1,
    searchKey1: '',
    searchKey2: '',
    showHistoryExcelDialog: false
  }

  beginFetch(newPageIndex) {
    this._paginateList.beginFetch(newPageIndex)
  }

  doFetch() {
    this.setState({currentIndex: -1})
    this.props.fetchSingleHistoryMessageList(merge({}, this._queryFilter.getParams(), this._paginateList.getParams()))
  }

  exportExcel = () => {
    let chatType = 'chat'
    location.href = `chat/report/currentMonth/export/${chatType}`
  }

  historyExcelList = () => {
    this.setState({showHistoryExcelDialog: true})
    this.props.fetchHistoryExcelList('chat')
  }

  componentDidMount() {
    this.beginFetch()
  }

  render() {
    const {Head, Row} = Layout

    return (
      <div className="flex-full">
        {
          this.state.showHistoryExcelDialog && (
            <DownloadFileDialog fileList={this.props.historyExcelList} onExited={() => this.setState({showHistoryExcelDialog: false})}/>
          )
        }
        <TwoSearchKey ref={c => this._queryFilter = c}
                      className="ex-big-label"
                      beginFilter={() => this.beginFetch(1)}
                      searchKeyName1="chat_Msg_Content"
                      searchKeyName2="patient_Phone"
                      onSearchKey1Change={searchKey1 => this.setState({searchKey1})}
                      onSearchKey2Change={searchKey2 => this.setState({searchKey2})}
        >
          <button className="btn btn-info mr-20" onClick={this.exportExcel}>导出本月单聊Excel</button>
          <button className="btn btn-default mr-20" onClick={this.historyExcelList}
                  disabled={this.props.total == 0}>下载单聊历史
          </button>
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
                  minWidth={1200}
                  fixHead={true}
                  fixLeft={[0, 2]}
                  weight={[1, 1, 1, 1, 2, 1]}
          >
            <Head>
              <Head.Item>发送人账号</Head.Item>
              <Head.Item>发送人姓名</Head.Item>
              <Head.Item>接收人账号</Head.Item>
              <Head.Item>接收人姓名</Head.Item>
              <Head.Item>消息内容</Head.Item>
              <Head.Item>发送时间</Head.Item>
            </Head>
            <div>
              {
                this.props.list.map((historyMessage, index) => {
                  return (
                    <Row key={index}
                         onClick={e => this.setState({currentIndex: index})}
                         selected={this.state.currentIndex == index}
                         style={{minHeight: '40px'}}
                    >
                      <Row.Item>
                        <HighLight match={this.state.searchKey2}>
                          {historyMessage['chat_From']}
                        </HighLight>
                      </Row.Item>
                      <Row.Item>{historyMessage['chat_From_Name']}</Row.Item>
                      <Row.Item>
                        <HighLight match={this.state.searchKey2}>
                          {historyMessage['chat_To']}
                        </HighLight>
                      </Row.Item>
                      <Row.Item>{historyMessage['chat_To_Name']}</Row.Item>
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

TabSingleChat.propTypes = {
  list: PropTypes.array,
  filters: PropTypes.object,
  loading: PropTypes.bool,
  total: PropTypes.number,
  fetchSingleHistoryMessageList: PropTypes.func,
  previewImage: PropTypes.func
}

const users = [
  {value: '1', text: '主治医生'},
  {value: '2', text: '在线医生'},
  {value: '3', text: '贝壳客服'}
]

export default connect(state => ({
  ...state['historyMessageSingle'],
  filters: {
    sendDate: utils.getFilterItem('sendDate', '消息发送时间', []),
    user: utils.getFilterItem('user', '消息对象', users)
  }
}), {
  fetchSingleHistoryMessageList,
  fetchHistoryExcelList
})(TabSingleChat)
