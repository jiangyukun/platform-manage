/**
 * Created by jiangyukun on 2017/1/10.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {merge} from 'lodash'
import moment from 'moment'
import classnames from 'classnames'
import QueryFilter from '../../../components/core/QueryFilter'
import FilterItem from '../../../components/core/query-filter/FilterItem'
import CustomTextInput from '../../../components/core/query-filter/custom/CustomTextInput'
import CustomDateRange from '../../../components/core/query-filter/custom/CustomDateRange'
import SubOptions from '../../../components/core/query-filter/custom/SubOptions'
import PaginateList from '../../../components/core/PaginateList'
import SendMessageDialog from './SendMessageDialog'

import {getFilterItem} from '../../../core/utils'
import {getYesOrNoText} from '../../../core/formatBusData'
import {fetchHospitalList} from '../../../actions/hospital'
import * as actions from '../../../actions/pages/sms-manage'


class SmsManage extends Component {
    constructor() {
        super()
        this.state = {
            currentIndex: -1,
            loading: false,
            showAdd: false,
            showEdit: false
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
                <Item weight={1}>短信内容</Item>
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
                                style={{height: '40px'}}
                                onClick={e => this.setState({currentIndex: index})}
                                onDoubleClick={e => this.setState({currentIndex: index, showEdit: true})}
                            >
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
                        <SendMessageDialog onExited={() => this.setState({showAdd: false})}/>
                    )
                }

                <QueryFilter ref={c => this._queryFilter = c} className="ex-big-label"
                             beginFilter={() => this.beginFetch(1)}
                             searchKeyName="key_Words"
                >
                    <button className="btn btn-primary mr-20" onClick={() => this.setState({showAdd: true})}>发送短信</button>

                    <button className="btn btn-primary mr-20"
                            onClick={() => this.setState({showEdit: true})}
                            disabled={this.state.currentIndex == -1}>查看
                    </button>

                    <FilterItem item={this.props.receiverIdentityFilterList} paramName="receiver" useText={true}/>

                    <FilterItem item={this.props.sendDate}>
                        <CustomDateRange startName="startDate" endName="endDate"/>
                    </FilterItem>
                </QueryFilter>

                <PaginateList ref={c => this._paginateList = c}
                              doFetch={() => this.doFetch()}
                              total={this.props.total}
                              lengthName="limit"
                              byName="order_By"
                >
                    <Layout loading={this.state.loading} fixHead={true} fixLeft={[1, 2]} head={this.getHead()} body={this.getBody()}/>
                </PaginateList>
            </div>
        )
    }
}


function mapStateToProps(state) {
    let {total, list} = state['smsPaginateList']
    return {
        total,
        list,
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
    }
}

export default connect(mapStateToProps, mapActionToProps)(SmsManage)
