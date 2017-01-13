/**
 * Created by jiangyukun on 2017/1/10.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {merge} from 'lodash'
import classnames from 'classnames'

import QueryFilter from '../../../components/core/QueryFilter'
import FilterItem from '../../../components/core/query-filter/FilterItem'
import CustomDateRange from '../../../components/core/query-filter/custom/CustomDateRange'
import PaginateList from '../../../components/core/PaginateList'
import SendMessageDialog from './SendMessageDialog'

import {getFilterItem} from '../../../core/utils'
import {fetchBackendMemberList} from '../../../actions/backend-member'
import * as formatBusData from '../../../core/formatBusData'
import * as actions from '../../../actions/pages/sms-manage'

class SmsManage extends Component {
    constructor() {
        super()
        this.state = {
            currentIndex: -1,
            loading: false,
            showAdd: false,
            showApply: false
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

    componentDidMount() {
        this.beginFetch()
        this.props.fetchBackendMemberList()
    }

    getHead() {
        const Head = PaginateList.Layout.Head
        const Item = Head.Item

        return (
            <Head>
                <Item weight={1}>发送人</Item>
                <Item weight={1}>接收人账号</Item>
                <Item weight={1}>接收人姓名</Item>
                <Item weight={1}>接收人身份</Item>
                <Item weight={2}>短信内容</Item>
                <Item weight={1}>发送时间</Item>
            </Head>
        )
    }

    getBody() {
        return (
            <div>
                {
                    this.props.list.map((sms, index) => {
                        return (
                            <ul key={index} className={classnames('flex-list body', {'selected': this.state.currentIndex == index})}
                                style={{minHeight: '40px'}}
                                onClick={e => this.setState({currentIndex: index})}
                            >
                                <li className="item flex1">{sms['sender']}</li>
                                <li className="item flex1">{sms['receiver']}</li>
                                <li className="item flex1">{sms['receiverName']}</li>
                                <li className="item flex1">{formatBusData.getUserType(sms['receiverType'])}</li>
                                <li className="item flex2">{sms['content']}</li>
                                <li className="item flex1">{sms['createDate']}</li>
                            </ul>
                        )
                    })
                }
            </div>
        )
    }

    render() {
        const Layout = PaginateList.Layout

        return (
            <div className="app-function-page">
                {
                    this.state.showAdd && (
                        <SendMessageDialog
                            fetchUserTypeAndName={this.props.fetchUserTypeAndName}
                            smsTemplate={this.props.smsTemplate}
                            fetchAllSmsTemplate={this.props.fetchAllSmsTemplate}
                            sendSmsMessage={this.props.sendSmsMessage}
                            onExited={() => this.setState({showAdd: false})}/>
                    )
                }

                <QueryFilter ref={c => this._queryFilter = c} className="ex-big-label"
                             beginFilter={() => this.beginFetch(1)}
                             searchKeyName="searchKey"
                >
                    <button className="btn btn-primary mr-20" onClick={() => this.setState({showAdd: true})}>发送短信</button>

                    <button className="btn btn-primary mr-20" onClick={() => this.setState({showApply: true})}>申请模板</button>

                    <FilterItem item={this.props.senderFilterList} paramName="sender"/>

                    <FilterItem item={this.props.receiverIdentityFilterList} paramName="receiverType" useText={true}/>

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
                    <Layout loading={this.state.loading} fixHead={true} fixLeft={[1, 2]} head={this.getHead()} body={this.getBody()}/>
                </PaginateList>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {total, list} = state['smsPaginateList']
    const backendMemberList = state['backendMemberList']
    const smsTemplate = state['smsTemplateList']

    return {
        total,
        list,
        smsTemplate: smsTemplate,
        senderFilterList: {
            typeCode: 'sender',
            typeText: '发送人',
            typeItemList: backendMemberList.concat({value: 'system', text: '系统'})
        },
        receiverIdentityFilterList: {
            typeCode: 'receiverIdentity',
            typeText: '接受人身份',
            typeItemList: [{value: 'patient', text: '患者'}, {value: 'doctor', text: '医生'}]
        },
        sendDate: getFilterItem('sendDate', '发送时间', [])
    }
}

function mapActionToProps(dispatch) {
    return {
        fetchSmsPaginateList: actions.fetchSmsPaginateList(dispatch),
        fetchBackendMemberList: fetchBackendMemberList(dispatch),
        fetchAllSmsTemplate: actions.fetchAllSmsTemplate(dispatch),
        sendSmsMessage: actions.sendSmsMessage(dispatch),
        fetchUserTypeAndName: actions.fetchUserTypeAndName(dispatch)
    }
}

export default connect(mapStateToProps, mapActionToProps)(SmsManage)