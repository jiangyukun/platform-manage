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
import Layout from "../../components/core/layout/Layout"

import * as utils from '../../core/utils'
import {formatDateStr} from '../../core/dateUtils'
import {fetchSingleHistoryMessageList} from './history-message'

class TabSingleChat extends Component {
  state = {
    currentIndex: -1,
    searchKey1: '',
    searchKey2: ''
  }

  beginFetch(newPageIndex) {
    this._paginateList.beginFetch(newPageIndex)
  }

  doFetch() {
    this.setState({currentIndex: -1})
    this.props.fetchSingleHistoryMessageList(merge({}, this._queryFilter.getParams(), this._paginateList.getParams()))
  }

  exportExcel = () => {
  }

  componentDidMount() {
    this.beginFetch()
  }

  render() {
    const {Head, Row} = Layout

    return (
      <div className="flex-full">
        <TwoSearchKey ref={c => this._queryFilter = c}
                      className="ex-big-label"
                      beginFilter={() => this.beginFetch(1)}
                      searchKeyName1="chat_Msg_Content"
                      searchKeyName2="patient_Phone"
                      onSearchKey1Change={searchKey1 => this.setState({searchKey1})}
                      onSearchKey2Change={searchKey2 => this.setState({searchKey2})}
        >
          <button className="btn btn-primary mr-20" onClick={this.exportExcel} disabled={this.props.total == 0}>导出Excel</button>
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
                  weight={[1, 1, 1, 1, 1, 1]}
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
                      <Row.Item highlight={true} matchText={this.state.searchKey2}>
                        {historyMessage['chat_From']}
                      </Row.Item>
                      <Row.Item>{historyMessage['chat_From_Name']}</Row.Item>
                      <Row.Item highlight={true} matchText={this.state.searchKey2}>
                        {historyMessage['chat_To']}
                      </Row.Item>
                      <Row.Item>{historyMessage['chat_To_Name']}</Row.Item>
                      <Row.Item highlight={true} matchText={this.state.searchKey1}>
                        {historyMessage['chat_Msg_Content']}
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
  fetchSingleHistoryMessageList: PropTypes.func
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
})(TabSingleChat)
