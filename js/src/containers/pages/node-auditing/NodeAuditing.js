/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {merge} from 'lodash'
import notification from 'antd/lib/notification'

import NodeAuditingQueryFilter from './NodeAuditingQueryFilter'
import FilterItem from '../../../components/core/query-filter/FilterItem'
import CustomDateRange from '../../../components/core/query-filter/custom/CustomDateRange'
import CustomTextInput from '../../../components/core/query-filter/custom/CustomTextInput'
import SubDateSelect from '../../../components/core/query-filter/custom/SubDateSelect'
import SubOptions from '../../../components/core/query-filter/custom/SubOptions'
import PaginateList from '../../../components/core/PaginateList'
import SmartList from '../../../components/core/list/SmartList'
import HeadContainer from '../../../components/core/list/HeadContainer'
import BodyContainer from '../../../components/core/list/BodyContainer'

import Head from './table/Head'
import Body from './table/Body'
import EditVisitCard from './edit/EditVisitCard'
import EditRemark from './edit/EditRemark'
import EditIsCompleteVisit from './edit/EditIsCompleteVisit'
import EditPatient from './EditPatient'
import mapStateToProps from './data/mapStateToProps'
import {ConditionResolver, getFilterConditionValue} from '../../../core/queryFilterHelper'

import * as utils from '../../../core/utils'
import {fetchHospitalList} from '../../../actions/hospital'
import * as actions from '../../../actions/pages/node-auditing'

class NodeAuditing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open1: false,
            open2: false,
            currentIndex: -1,
            loading: false,
            showEdit: false
        }
    }

    beginFetch(newPageIndex) {
        this._paginateList.beginFetch(newPageIndex)
    }

    doFetch() {
        this.setState({loading: true})
        this.allConditions = this._queryFilter.getAllConditions()
        this.pageInfo = this._paginateList.getPageInfo()
        this.props.fetchPatientList(merge({}, this.pageInfo, this.handleFilterConditions()))
            .then(() => this.setState({loading: false, currentIndex: -1}))
    }

    handleFilterConditions() {
        let options = new ConditionResolver(this.allConditions.filters)
            .resolve('hospital', 'hsp_Name', true)
            .resolve('auditingState', 'check_Status')
            .resolve('visitCard', 'status')
            .resolve('isPregnant12To14AcceptedVisit', 'visit_2_Accept_Visit', true)
            .resolve('isBaby8MonthAcceptedVisit', 'visit_5_Accept_Visit', true)
            .resolve('checkResultFilter', 'visit_Type')
            .resolve('result', 'visit_Result_Type')
            .resolve('backendManager', 'backend_Manager')
            .resolveDate('register', 'registration_Begin_Time', 'registration_End_Time')
            .getCondition()

        let value = getFilterConditionValue(this.allConditions.filters, 'nodeFilter')
        if (value) {
            if (typeof value != 'object') {
                options['note_Type'] = value
            } else {
                options['note_Type'] = value.main.value
                let customValue = value.custom.value
                options['note_Begin_Time'] = customValue.startValue
                options['note_End_Time'] = customValue.endValue
            }
        }
        value = getFilterConditionValue(this.allConditions.filters, 'checkResultFilter')
        if (value) {
            if (typeof value != 'object') {
                options['visit_Type'] = value
            } else {
                options['visit_Type'] = value.main.value
                options['visit_Result_Type'] = value.custom.value
            }
        }

        if (this.allConditions.searchKey1) {
            options['doctor_key_Words'] = this.allConditions.searchKey1
        }
        if (this.allConditions.searchKey2) {
            options['key_Words'] = this.allConditions.searchKey2
        }
        return options
    }

    editVisitCard(id, state) {
        this.props.editVisitCardState(id, state).then(() => {
            notification.success({message: '提示', description: '更新随访卡成功！'})
        }, () => {
            notification.error({message: '提示', description: '更新随访卡失败！'})
        })
    }

    editRemark(id, remarkType, remark) {
        this.props.editRemark(id, remarkType, remark).then(() => {
            notification.success({message: '提示', description: '更新备注成功！'})
        }, () => {
            notification.error({message: '提示', description: '更新备注失败！'})
        })
    }

    editIsCompleteVisit(id, completeVisitType, completeVisitState) {
        this.props.editIsCompleteVisit(id, completeVisitType, completeVisitState)
            .then(() => notification.success({message: '提示', description: '更新是否完成随访成功！'}),
                () => notification.error({message: '提示', description: '更新是否完成随访失败！'}))
    }

    updateOpenFlag(openState) {
        this.setState(openState)
    }

    exportExcel() {
        let handledConditionInfo = this.handleFilterConditions()
        let paramUrl = utils.urlParam(handledConditionInfo)
        let exportExcelUrl = 'export/excel' + paramUrl;
        window.open(exportExcelUrl);
    }

    componentDidMount() {
        this.beginFetch()
        if (this.props.hospitalList.length == 0) {
            this.props.fetchHospitalList()
        }
    }

    render() {
        let {total, list} = this.props.patientListInfo
        let listWidth = 6920
        if (this.state.open1) {
            listWidth += 360
        }
        if (this.state.open2) {
            listWidth += 480
        }

        return (
            <div className="app-function-page">
                {
                    this.state.showEdit && (
                        <EditPatient
                            patientId={list[this.state.currentIndex]['patient_Id']}
                            fetchPatientInfo={this.props.fetchPatientInfo}
                            updateAuditingState={this.props.updateAuditingState}
                            updatePatientInfo={this.props.updatePatientInfo}
                            onClose={() => this.setState({showEdit: false})}/>
                    )
                }

                <EditVisitCard ref={c => this._editVisitCard = c} editVisitCard={(...arg) => this.editVisitCard(...arg)}/>
                <EditRemark ref={c => this._editRemark = c} editRemark={(...arg) => this.editRemark(...arg)}/>
                <EditIsCompleteVisit ref={c => this._editIsCompleteVisit = c} editIsCompleteVisit={(...arg) => this.editIsCompleteVisit(...arg)}/>
                <NodeAuditingQueryFilter ref={c => this._queryFilter = c} className="ex-big-label"
                                         beginFilter={() => this.beginFetch(1)}>
                    <button className="btn btn-primary mr-20" onClick={e => this.setState({showEdit: true})} disabled={this.state.currentIndex == -1}>查看</button>
                    <button className="btn btn-primary mr-20" onClick={e => this.exportExcel()}>导出excel</button>
                    <FilterItem className="middle-filter-item" item={this.props.hospitalFilterList}/>
                    <FilterItem className="middle-filter-item" item={this.props.auditingStateList}/>
                    <FilterItem className="big-filter-item" item={this.props.nodeFilterList}>
                        <SubDateSelect/>
                    </FilterItem>
                    <FilterItem className="middle-filter-item" item={this.props.visitCardList}/>
                    <FilterItem className="middle-filter-item" item={this.props.isPregnant12To14AcceptedVisit}/>
                    <FilterItem className="middle-filter-item" item={this.props.isBaby8MonthAcceptedVisit}/>
                    <FilterItem className="big-filter-item" item={this.props.checkResultFilterList}>
                        <SubOptions options={this.props.resultList} title="结果为"/>
                    </FilterItem>
                    <FilterItem className="middle-filter-item" item={this.props.backendMangerList}>
                        <CustomTextInput placeholder="请输入后台管理人员"/>
                    </FilterItem>
                    <FilterItem className="small-filter-item" item={this.props.register}>
                        <CustomDateRange/>
                    </FilterItem>
                </NodeAuditingQueryFilter>

                <PaginateList ref={c => this._paginateList = c}
                              beginFetch={() => this.beginFetch()} doFetch={() => this.doFetch()}
                              total={total}>

                    <SmartList className="paginate-list-data-container" width={listWidth}
                               loading={this.state.loading}
                               fixHead={true} fixLeft={[0, 1, 2]}>
                        <HeadContainer>
                            <Head open1={this.state.open1}
                                  open2={this.state.open2}
                                  updateOpenFlag={openFlag => this.updateOpenFlag(openFlag)}/>
                        </HeadContainer>
                        <BodyContainer>
                            <Body list={list}
                                  open1={this.state.open1}
                                  open2={this.state.open2}
                                  currentIndex={this.state.currentIndex}
                                  selectItem={index => this.setState({currentIndex: index})}
                                  openEditPatientDialog={index => this.setState({currentIndex: index, showEdit: true})}
                                  openVisitCardDialog={(...arg) => this._editVisitCard.open(...arg)}
                                  openEditRemarkDialog={(...arg) => this._editRemark.open(...arg)}
                                  openIsCompleteVisitDialog={(...arg) => this._editIsCompleteVisit.open(...arg)}/>
                        </BodyContainer>
                    </SmartList>
                </PaginateList>
            </div>
        )
    }
}

function mapActionToProps(dispatch) {
    return {
        fetchHospitalList: fetchHospitalList(dispatch),
        fetchPatientList: actions.fetchPatientList(dispatch),
        editVisitCardState: actions.editVisitCardState(dispatch),
        editRemark: actions.editRemark(dispatch),
        editIsCompleteVisit: actions.editIsCompleteVisit(dispatch),
        fetchPatientInfo: actions.fetchPatientInfo(dispatch),
        updateAuditingState: actions.updateAuditingState(dispatch),
        updatePatientInfo: actions.updatePatientInfo(dispatch)
    }
}

export default connect(mapStateToProps, mapActionToProps)(NodeAuditing)
