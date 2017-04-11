/**
 * 患者录入信息
 * Created by jiangyukun on 2017/3/29.
 */
import React from 'react'
import {connect} from 'react-redux'
import {merge} from 'lodash'

import {QueryFilter, PaginateList} from '../../components/core/'
import FilterItem from '../../components/core/query-filter/FilterItem'
import {CustomDateRange} from '../../components/core/query-filter/custom/'
import {FlexList, FixHead, FlexBodyWrap, FixRow} from '../../components/list'
import {HeadItem, RowItem} from '../../components/table-layout'
import EditRemark from '../common/EditRemark'
import AntiVirusDialog from './dialog/AntiVirusDialog'
import BabyBirthInfoDialog from './dialog/BabyBirthInfoDialog'
import InoculationInfoDialog from './dialog/InoculationInfoDialog'
import BabyJulyInfoDialog from './dialog/BabyJulyInfoDialog'

import {getFilterItem} from '../../core/utils'
import * as antdUtils from '../../core/utils/antdUtil'
import {RECORD_TYPE, getRecordTypeText, getAuditingStatus} from '../../constants/patient-record-info'
import * as actions from './patient-record-info'

class PatientRecordInfo extends React.Component {
  state = {
    index: -1,
    recordType: '',
    showEditRemark: false
  }

  beginFetch = (fromPage) => {
    this._paginateList.beginFetch(fromPage)
  }

  doFetch = () => {
    this.props.fetchList(merge({}, this._queryFilter.getParams(), this._paginateList.getParams()))
  }

  fetchRecordTypeInfo = (index) => {
    const item = this.props.list[index]
    this.setState({index, recordType: item['info_Type']})
    this.props.fetchRecordTypeInfo(item['user_Id'], item['extend_Id'], item['info_Type'])
  }

  updateRemark = (newRemark) => {
    const item = this.props.list[this.state.index]
    this.props.updateRemark(item['extend_Id'], item['info_Type'], newRemark)
  }

  auditingRecordInfo = (newStatus) => {
    antdUtils.confirm(`确定修改审核状态为${getAuditingStatus(newStatus)}吗？`, () => {
      const item = this.props.list[this.state.index]
      this.props.auditingRecordInfo(item['extend_Id'], item['info_Type'], newStatus)
    })
  }

  componentDidMount() {
    this.beginFetch()
  }

  componentDidUpdate() {
    if (this.props.updateRemarkSuccess) {
      this.props.clearUpdateRemarkSuccess()
      antdUtils.tipSuccess('更新备注成功！')
    }
    if (this.props.auditingStatus) {
      this.props.clearAuditingStatus()
      this.beginFetch()
      antdUtils.tipSuccess('更新状态成功！')
    }
  }

  render() {
    const item = this.props.list[this.state.index]

    return (
      <div className='app-function-page'>
        {
          this.state.index != -1 && this.state.recordType == RECORD_TYPE.antiVirus && (
            <AntiVirusDialog
              basicInfo={item}
              recordTypeInfo={this.props.recordTypeInfo}
              auditingRecordInfo={this.auditingRecordInfo}
              auditingStatusUpdated={this.props.auditingStatus != ''}
              onExited={() => this.setState({recordType: ''})}/>
          )
        }
        {
          this.state.index != -1 && this.state.recordType == RECORD_TYPE.babyBirthInfo && (
            <BabyBirthInfoDialog
              basicInfo={item}
              recordTypeInfo={this.props.recordTypeInfo}
              auditingRecordInfo={this.auditingRecordInfo}
              auditingStatusUpdated={this.props.auditingStatus != ''}
              onExited={() => this.setState({recordType: ''})}/>
          )
        }
        {
          this.state.index != -1 && this.state.recordType == RECORD_TYPE.inoculationInfo && (
            <InoculationInfoDialog
              basicInfo={item}
              recordTypeInfo={this.props.recordTypeInfo}
              auditingRecordInfo={this.auditingRecordInfo}
              auditingStatusUpdated={this.props.auditingStatus != ''}
              onExited={() => this.setState({recordType: ''})}/>
          )
        }
        {
          this.state.index != -1 && this.state.recordType == RECORD_TYPE.babyJulyInfo && (
            <BabyJulyInfoDialog
              basicInfo={item}
              recordTypeInfo={this.props.recordTypeInfo}
              auditingRecordInfo={this.auditingRecordInfo}
              auditingStatusUpdated={this.props.auditingStatus != ''}
              onExited={() => this.setState({recordType: ''})}/>
          )
        }
        {
          this.state.showEditRemark && (
            <EditRemark value={item['remark']}
                        remarkUpdated={this.props.updateRemarkSuccess}
                        updateRemark={this.updateRemark}
                        onExited={() => this.setState({showEditRemark: false})}/>
          )
        }

        <QueryFilter ref={c => this._queryFilter = c} className='big'
                     beginFilter={() => this.beginFetch(1)}
                     searchKeyName='key_Words'
                     placeholder='输入手机号码，患者编号'>

          <FilterItem item={this.props.recordTypeFilter} paramName='info_Type'/>
          <FilterItem item={this.props.recordStateFilter} paramName='info_Status'/>

          <FilterItem item={this.props.recordDateFilter}>
            <CustomDateRange startName='input_Begin_Time' endName='input_End_Time'/>
          </FilterItem>

        </QueryFilter>

        <PaginateList ref={c => this._paginateList = c}
                      total={this.props.total}
                      doFetch={this.doFetch}
                      lengthName='limit'
        >
          <FlexList minWidth='1200px'
                    weight={['110px', '80px', '60px', 1, '90px', 1, 1, 1, '80px', 1, 1, 2]}
                    total={this.props.total}
                    loading={this.props.loading}
          >
            <FixHead>
              <HeadItem>患者编号</HeadItem>
              <HeadItem>账号</HeadItem>
              <HeadItem>姓名</HeadItem>
              <HeadItem>医院</HeadItem>
              <HeadItem>感染/肝病科医生</HeadItem>
              <HeadItem>妇产科医生</HeadItem>
              <HeadItem>儿科医生</HeadItem>
              <HeadItem>信息种类</HeadItem>
              <HeadItem>患者录入时间</HeadItem>
              <HeadItem>信息状态</HeadItem>
              <HeadItem>查看</HeadItem>
              <HeadItem>备注</HeadItem>
            </FixHead>
            <FlexBodyWrap>
              {
                this.props.list.map((item, index) => {
                  return (
                    <FixRow key={item['extend_Id']}
                            selected={this.state.index == index}
                            onClick={() => this.setState({index})}
                            style={{minHeight: '50px'}}
                    >
                      <RowItem>{item['patient_Code']}</RowItem>
                      <RowItem>{item['patient_Phone']}</RowItem>
                      <RowItem>{item['patient_Name']}</RowItem>
                      <RowItem>{item['hospital_Name']}</RowItem>
                      <RowItem>{item['infection_Doctor']}</RowItem>
                      <RowItem>{item['obstetrics_Doctor']}</RowItem>
                      <RowItem>{item['pediatrics_Doctor']}</RowItem>
                      <RowItem>{getRecordTypeText(item['info_Type'])}</RowItem>
                      <RowItem>{item['created_Time']}</RowItem>
                      <RowItem>{getAuditingStatus(item['info_Status'])}</RowItem>
                      <RowItem>
                        <span className="click-to-look"
                              onClick={e => this.fetchRecordTypeInfo(index)}>点击查看
                        </span>
                      </RowItem>
                      <RowItem>
                        {item['remark']}
                        <i className="edit-remark-svg" onClick={e => this.setState({showEditRemark: true, index})}/>
                      </RowItem>
                    </FixRow>
                  )
                })
              }
            </FlexBodyWrap>
          </FlexList>
        </PaginateList>
      </div>
    )
  }
}

const recordTypeList = [
  {value: '1', text: '抗病毒'},
  {value: '2', text: '宝宝出生信息'},
  {value: '3', text: '接种信息'},
  {value: '4', text: '宝宝7月信息'},
]
const recordStateList = [
  {value: '1', text: '未录入'},
  {value: '2', text: '已录入'},
  {value: '3', text: '无效'},
]
function mapStateToProps(state) {
  return {
    ...state['patient_record_info'],
    recordTypeFilter: getFilterItem('recordType', '信息种类', recordTypeList),
    recordDateFilter: getFilterItem('', '录入时间', []),
    recordStateFilter: getFilterItem('', '信息状态', recordStateList),
  }
}

export default connect(mapStateToProps, {...actions})(PatientRecordInfo)
