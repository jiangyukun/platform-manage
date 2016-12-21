/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'
import {merge} from 'lodash'
import QueryFilter from '../../../components/core/QueryFilter'
import FilterItem from '../../../components/core/query-filter/FilterItem'
import CustomDateRange from '../../../components/core/query-filter/custom/CustomDateRange'
import PaginateList from '../../../components/core/PaginateList'
import SortBy from '../../../components/core/paginate-list/SortBy'
import SmartList from '../../../components/core/list/SmartList'
import HeadContainer from '../../../components/core/list/HeadContainer'
import BodyContainer from '../../../components/core/list/BodyContainer'
import EditPatientDialog from './EditPatientDialog'
import constants from '../../../core/constants'
import {getFilterItem} from '../../../core/utils'
import {getAuditStatus, getYesOrNoText} from '../../../core/formatBusData'
import {formatDateStr} from '../../../core/dateUtils'
import * as actions from '../../../actions/pages/patient-edit'

class PatientEdit extends Component {
    constructor() {
        super()
        this.state = {
            currentIndex: -1,
            loading: false,
            showEdit: false
        }
    }

    beginFetch(newPageIndex) {
        this._paginateList.beginFetch(newPageIndex)
    }

    doFetch() {
        this.setState({currentIndex: -1, loading: true})
        this.props.fetchPatientPaginateList(merge(this._queryFilter.getParams(), this._paginateList.getParams()))
            .then(() => this.setState({loading: false}))
    }

    editPatientInfo(patient) {
        this.setState({showEdit: true})
    }

    componentDidMount() {
        this.beginFetch()
    }

    render() {
        return (
            <div className="app-function-page">
                {
                    this.state.showEdit && (
                        <EditPatientDialog patientId=""
                                           onExited={() => this.setState({showEdit: false})}/>
                    )
                }

                <QueryFilter ref={c => this._queryFilter = c} className="ex-big-label"
                             beginFilter={() => this.beginFetch(1)}
                             searchKeyName="key_Words"
                >
                    <FilterItem className="middle-filter-item" item={this.props.isHepatitisBFilter} paramName="patient_Is_Hepatitis"/>

                    <FilterItem className="middle-filter-item" item={this.props.isPregnantWomenFilter} paramName="checked"/>

                    <FilterItem className="middle-filter-item" item={this.props.auditingStateFilter} paramName="patient_Is_Pregnant"/>

                    <FilterItem className="small-filter-item" item={this.props.registerFilter}>
                        <CustomDateRange startName="registration_Begin_Time" endName="registration_End_Time"/>
                    </FilterItem>
                </QueryFilter>

                <PaginateList ref={c => this._paginateList = c}
                              doFetch={() => this.doFetch()}
                              total={this.props.total}
                              lengthName="limit"
                              byName="order_By"
                >
                    <SmartList loading={this.state.loading} fixHead={true} style={{minWidth: '1000px'}} fixLeft={[0, 1]}>
                        <HeadContainer>
                            <ul className="flex-list header">
                                <li className="item" style={{width: '100px'}}>
                                    <SortBy by="patient_Phone">患者账号</SortBy>
                                </li>
                                <li className="item" style={{width: '100px'}}>
                                    <SortBy by="patient_Name" activeWidth={70}>姓名</SortBy>
                                </li>
                                <li className="item" style={{width: '100px'}}>
                                    <SortBy by="patient_BirthDate">出生日期</SortBy>
                                </li>
                                <li className="item flex1">民族</li>
                                <li className="item flex1">是否乙肝</li>
                                <li className="item flex1">是否孕妇</li>
                                <li className="item flex1">头像</li>
                                <li className="item" style={{width: '100px'}}>
                                    <SortBy by="id_Num" activeWidth={90}>身份证号</SortBy>
                                </li>
                                <li className="item flex1">审核状态</li>
                                <li className="item flex1">备注</li>
                                <li className="item" style={{width: '120px'}}>
                                    <SortBy by="creatTime" activeWidth={90}>创建日期</SortBy>
                                </li>
                            </ul>
                        </HeadContainer>
                        <BodyContainer>
                            <div>
                                {
                                    this.props.list.map((patient, index) => {
                                        return (
                                            <ul key={patient['patient_Id']}
                                                style={{height: '50px'}}
                                                className={classnames('flex-list body', {'selected': this.state.currentIndex == index})}
                                                onClick={e => this.setState({currentIndex: index})}
                                                onDoubleClick={e => this.setState({currentIndex: index, showEdit: true})}
                                            >
                                                <li className="item" style={{width: '100px'}}>{patient['patient_Phone']}</li>
                                                <li className="item" style={{width: '100px'}}>{patient['patient_Name']}</li>
                                                <li className="item" style={{width: '100px'}}>{patient['patient_BirthDate']}</li>
                                                <li className="item flex1">{patient['patient_Nation']}</li>
                                                <li className="item flex1">{getYesOrNoText(patient['patient_Is_Hepatitis'], '未知')}</li>
                                                <li className="item flex1">{getYesOrNoText(patient['patient_Is_Pregnant'], '未知')}</li>
                                                <li className="item flex1">look</li>
                                                <li className="item" style={{width: '100px'}}>{patient['id_Num']}</li>
                                                <li className="item flex1">{getAuditStatus(patient['checked'])}</li>
                                                <li className="item flex1">{patient['remark']}</li>
                                                <li className="item" style={{width: '120px'}}>{formatDateStr(patient['creatTime'])}</li>
                                            </ul>
                                        )
                                    })
                                }
                            </div>
                        </BodyContainer>
                    </SmartList>
                </PaginateList>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const {list, total} = state['patientEditPaginateList']
    return {
        list,
        total,
        isHepatitisBFilter: getFilterItem('isHepatitisB', '是否乙肝'),
        isPregnantWomenFilter: getFilterItem('isPregnantWomen', '是否孕妇'),
        minorityFilter: getFilterItem('minority', '民族', [
            {value: '汉族', text: '汉族'},
            {value: '其他', text: '其他'}
        ]),
        auditingStateFilter: getFilterItem('auditingState', '审核状态', [
            {value: constants.auditingState.auditing, text: '审核中'},
            {value: constants.auditingState.auditingPass, text: '审核通过'},
            {value: constants.auditingState.auditingUnPass, text: '审核不通过'}
        ]),
        registerFilter: getFilterItem('register', '创建日期', [])
    }
}

function mapActionToProps(dispatch) {
    return {
        fetchPatientPaginateList: actions.fetchPatientPaginateList(dispatch)
    }
}

export default connect(mapStateToProps, mapActionToProps)(PatientEdit)
