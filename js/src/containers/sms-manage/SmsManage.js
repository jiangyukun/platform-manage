/**
 * Created by jiangyukun on 2017/1/10.
 */
import React, {Component, PropTypes} from "react"
import {connect} from "react-redux"
import {merge} from "lodash"
import QueryFilter from "../../components/core/QueryFilter"
import FilterItem from "../../components/core/query-filter/FilterItem"
import CustomDateRange from "../../components/core/query-filter/custom/CustomDateRange"
import PaginateList from "../../components/core/PaginateList"
import Layout from "../../components/core/layout/Layout"

import SendMessageDialog from "./dialog/SendMessageDialog"
import SmsTemplateManage from "./dialog/SmsTemplateManage"
import * as utils from "../../core/utils"
import {fetchBackendMemberList} from "../../actions/backend-member"
import * as formatBusData from "../../core/formatBusData"
import * as actions from "./sms-manage"

class SmsManage extends Component {
  constructor() {
    super()
    this.state = {
      currentIndex: -1,
      loading: false,
      showAdd: false,
      showSmsManage: false
    }
  }

  beginFetch(newPageIndex) {
    this._paginateList.beginFetch(newPageIndex)
  }

  doFetch() {
    this.setState({currentIndex: -1, loading: true})
    this.props.fetchSmsPaginateList(merge({}, this._queryFilter.getParams(), this._paginateList.getParams()))
      .then(() => this.setState({loading: false}))
  }

  exportExcel() {
    location.href = 'sms/exportExcel' + utils.urlParam(this._queryFilter.getParams())
  }

  componentDidMount() {
    this.beginFetch()
    if (this.props.backendMemberList.length == 0) {
      this.props.fetchBackendMemberList()
    }
  }

  render() {
    const {Head, Row} = Layout

    return (
      <div className="app-function-page">
        {
          this.state.showAdd && (
            <SendMessageDialog
              fetchUserTypeAndName={this.props.fetchUserTypeAndName}
              smsTemplateList={this.props.smsTemplateList}
              fetchSmsTemplateList={this.props.fetchSmsTemplateList}
              sendSmsMessage={this.props.sendSmsMessage}
              sendSmsMessageSuccess={() => this.beginFetch(1)}
              onExited={() => this.setState({showAdd: false})}/>
          )
        }

        {
          this.state.showSmsManage && (
            <SmsTemplateManage
              smsTemplateList={this.props.smsTemplateList}
              fetchSmsTemplateList={this.props.fetchSmsTemplateList}
              addSmsTemplate={this.props.addSmsTemplate}
              onExited={() => this.setState({showSmsManage: false})}/>
          )
        }

        <QueryFilter ref={c => this._queryFilter = c} className="ex-big-label"
                     beginFilter={() => this.beginFetch(1)}
                     searchKeyName="searchKey"
        >
          <button className="btn btn-primary mr-20" onClick={() => this.setState({showAdd: true})}>发送短信</button>

          <button className="btn btn-primary mr-20" onClick={() => this.setState({showSmsManage: true})}>短信模板管理</button>

          <button className="btn btn-primary mr-20" onClick={() => this.exportExcel()} disabled={this.props.total == 0}>
            导出excel
          </button>

          <FilterItem item={this.props.senderFilterList} paramName="sender"/>

          <FilterItem item={this.props.receiverIdentityFilterList} paramName="receiverType"/>

          <FilterItem item={this.props.sendDate}>
            <CustomDateRange startName="startDate" endName="endDate"/>
          </FilterItem>
        </QueryFilter>

        <PaginateList ref={c => this._paginateList = c}
                      doFetch={() => this.doFetch()}
                      total={this.props.total}
                      startName="page"
                      lengthName="pageSize"
                      byName="order_By"
        >
          <Layout loading={this.state.loading}
                  minWidth={1100}
                  fixHead={true}
                  fixLeft={[1, 2]}
                  weight={[1, 1, 1, 1, 3, 1]}>

            <Head>
              <Head.Item>发送人</Head.Item>
              <Head.Item>接收人账号</Head.Item>
              <Head.Item>接收人姓名</Head.Item>
              <Head.Item>接收人身份</Head.Item>
              <Head.Item>短信内容</Head.Item>
              <Head.Item>发送时间</Head.Item>
            </Head>
            <div>
              {
                this.props.list.map((sms, index) => {
                  return (
                    <Row key={sms['id']}
                         onClick={e => this.setState({currentIndex: index})}
                         selected={this.state.currentIndex == index}
                         style={{minHeight: '60px'}}
                    >
                      <Row.Item>{sms['sender']}</Row.Item>
                      <Row.Item>{sms['receiver']}</Row.Item>
                      <Row.Item>{sms['receiverName']}</Row.Item>
                      <Row.Item>{formatBusData.getUserType(sms['receiverType'])}</Row.Item>
                      <Row.Item>{sms['content']}</Row.Item>
                      <Row.Item>{sms['createDate']}</Row.Item>
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
  const {total, list} = state['smsPaginateList']
  const backendMemberList = state['backendMemberList']
  const smsTemplateList = state['smsTemplateList']

  return {
    total,
    list,
    backendMemberList,
    smsTemplateList: smsTemplateList,
    senderFilterList: {
      typeCode: 'sender',
      typeText: '发送人',
      typeItemList: backendMemberList.concat({value: 'system', text: '系统'})
    },
    receiverIdentityFilterList: {
      typeCode: 'receiverIdentity',
      typeText: '接受人身份',
      typeItemList: [{value: '1', text: '患者'}, {value: '2', text: '医生'}]
    },
    sendDate: utils.getFilterItem('sendDate', '发送时间', [])
  }
}

function mapActionToProps(dispatch) {
  return {
    fetchSmsPaginateList: actions.fetchSmsPaginateList(dispatch),
    fetchBackendMemberList: fetchBackendMemberList(dispatch),
    sendSmsMessage: actions.sendSmsMessage(dispatch),
    fetchUserTypeAndName: actions.fetchUserTypeAndName(dispatch),
    fetchSmsTemplateList: actions.fetchSmsTemplateList(dispatch),
    addSmsTemplate: actions.addSmsTemplate(dispatch)
  }
}

export default connect(mapStateToProps, mapActionToProps)(SmsManage)
