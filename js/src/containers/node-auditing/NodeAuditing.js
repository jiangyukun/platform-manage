/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {merge} from 'lodash'
import notification from 'antd/lib/notification'

import NodeAuditingQueryFilter from './NodeAuditingQueryFilter'
import FilterItem from '../../components/core/query-filter/FilterItem'
import {CustomDateRange, CustomTextInput, SubDateSelect, SubOptions} from '../../components/core/query-filter/custom/'
import PaginateList from '../../components/core/PaginateList'
import {SmartList, HeadContainer, BodyContainer} from '../../components/list/'
import Head from './table/Head'
import Body from './table/Body'
import EditPatientInfo from '../patient-edit/EditPatientInfo'
import EditVisitCard from './edit/EditVisitCard'
import EditRemark from './edit/EditRemark'
import EditIsCompleteVisit from './edit/EditIsCompleteVisit'

import * as utils from '../../core/utils'
import mapStateToProps from './data/mapStateToProps'
import {fetchHospitalList} from '../../actions/hospital'
import * as actions from './node-auditing'

class NodeAuditing extends Component {
  state = {
    open1: false,
    open2: false,
    currentIndex: -1,
    showEdit: false
  }

  beginFetch(newPageIndex) {
    this._paginateList.beginFetch(newPageIndex)
  }

  doFetch() {
    this.setState({currentIndex: -1})
    this.props.fetchPatientList(merge(this._queryFilter.getParams(), this._paginateList.getParams()))
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
    location.href = 'export/excel' + utils.urlParam(this._queryFilter.getParams())
  }

  componentDidMount() {
    this.beginFetch()
    if (this.props.hospitalList.length == 0) {
      this.props.fetchHospitalList()
    }
  }

  render() {
    const {isCanEdit, isCanExport} = this.props.authority

    let {total, list} = this.props
    let listWidth = 7040
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
            <EditPatientInfo
              patientId={list[this.state.currentIndex]['patient_Id']}
              fetchPatientInfo={this.props.fetchPatientInfo}
              updateAuditingState={this.props.updateAuditingState}
              updatePatientInfo={this.props.updatePatientInfo}
              patientInfoUpdated={() => this.beginFetch()}
              onExited={() => this.setState({showEdit: false})}
              isCanEdit={isCanEdit}/>
          )
        }
        <EditVisitCard ref={c => this._editVisitCard = c} editVisitCard={(...arg) => this.editVisitCard(...arg)}/>
        <EditRemark ref={c => this._editRemark = c} editRemark={(...arg) => this.editRemark(...arg)}/>
        <EditIsCompleteVisit ref={c => this._editIsCompleteVisit = c} editIsCompleteVisit={(...arg) => this.editIsCompleteVisit(...arg)}/>

        <NodeAuditingQueryFilter ref={c => this._queryFilter = c}
                                 className="ex-big-label"
                                 beginFilter={() => this.beginFetch(1)}
                                 searchKeyName1="doctor_key_Words"
                                 searchKeyName2="key_Words"
        >
          <button className="btn btn-primary mr-20"
                  onClick={e => this.setState({showEdit: true})}
                  disabled={this.state.currentIndex == -1}>查看
          </button>
          {
            isCanExport && (
              <button className="btn btn-primary mr-20" onClick={e => this.exportExcel()}>导出excel</button>
            )
          }

          <FilterItem item={this.props.hospitalFilterList} paramName="hsp_Name" useText={true}/>

          <FilterItem item={this.props.auditingStateList} paramName="check_Status"/>

          <FilterItem size="big" item={this.props.nodeFilterList} paramName="note_Type">
            <SubDateSelect startName="note_Begin_Time" endName="note_End_Time"/>
          </FilterItem>

          <FilterItem item={this.props.visitCardList} paramName="status"/>

          <FilterItem item={this.props.isPregnant12To14AcceptedVisit} paramName="visit_2_Accept_Visit"/>

          <FilterItem item={this.props.isBaby8MonthAcceptedVisit} paramName="visit_5_Accept_Visit"/>

          <FilterItem size="big" item={this.props.checkResultFilterList} paramName="visit_Type">
            <SubOptions options={this.props.resultList} title="结果为" paramName="visit_Result_Type"/>
          </FilterItem>

          <FilterItem item={this.props.backendMangerList}>
            <CustomTextInput placeholder="请输入后台管理人员" textName="backend_Manager"/>
          </FilterItem>

          <FilterItem size="small" item={this.props.operationPersonList}>
            <CustomTextInput placeholder="请输入运营人员" textName="operation_Manager"/>
          </FilterItem>

          <FilterItem size="small" item={this.props.register}>
            <CustomDateRange startName="registration_Begin_Time" endName="registration_End_Time"/>
          </FilterItem>
        </NodeAuditingQueryFilter>

        <PaginateList ref={c => this._paginateList = c}
                      doFetch={() => this.doFetch()}
                      total={this.props.total}
                      lengthName="limit"
                      byName="order_By"
        >

          <SmartList width={listWidth}
                     loading={this.props.loading}
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
                    openVisitCardDialog={(...arg) => this._editVisitCard.open(...arg)}
                    openEditRemarkDialog={(...arg) => this._editRemark.open(...arg)}
                    openIsCompleteVisitDialog={(...arg) => this._editIsCompleteVisit.open(...arg)}
                    isCanEdit={isCanEdit}/>
            </BodyContainer>
          </SmartList>
        </PaginateList>
      </div>
    )
  }
}

function mapActionToProps(dispatch) {
  return merge({}, bindActionCreators({
    fetchPatientList: actions.fetchPatientList
  }, dispatch), {
    fetchHospitalList: fetchHospitalList(dispatch),
    editVisitCardState: actions.editVisitCardState(dispatch),
    editRemark: actions.editRemark(dispatch),
    editIsCompleteVisit: actions.editIsCompleteVisit(dispatch),
    fetchPatientInfo: actions.fetchPatientInfo(dispatch),
    updateAuditingState: actions.updateAuditingState(dispatch),
    updatePatientInfo: actions.updatePatientInfo(dispatch)
  })
}

export default connect(mapStateToProps, mapActionToProps)(NodeAuditing)
