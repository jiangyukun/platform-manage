/**
 * Created by jiangyukun on 2016/12/15.
 */
import React, {Component, PropTypes} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {merge} from 'lodash'

import QueryFilter from '../../components/core/QueryFilter'
import FilterItem from '../../components/core/query-filter/FilterItem'
import CustomTextInput from '../../components/core/query-filter/custom/CustomTextInput'
import PaginateList from '../../components/core/PaginateList'
import SortBy from '../../components/core/paginate-list/SortBy'
import Layout from '../../components/table-layout/Layout'
import ShowMoreText from '../../components/txt/ShowMoreText'
import HighLight from '../../components/txt/HighLight'
import EditLaboratorySheet from './EditLaboratorySheet'
import EditRemark from '../common/EditRemark'

import {appPageNames} from '../../constants/nav'
import {getIsCanEdit, getIsCanExport} from '../../constants/authority'
import {getFilterItem} from '../../core/utils'
import * as antdUtil from '../../core/utils/antdUtil'
import {fetchHospitalList1} from '../../actions/hospital'
import * as actions from './laboratory-sheet'

class LaboratorySheet extends Component {
  state = {
    index: -1,
    showEdit: false,
    searchKey: '',
    editRemark: false
  }

  beginFetch(newPageIndex) {
    this._paginateList.beginFetch(newPageIndex)
  }

  doFetch() {
    this.setState({index: -1, loading: true})
    this.props.fetchLaboratorySheetList(merge(this._queryFilter.getParams(), this._paginateList.getParams()))
  }

  editLaboratorySheet(sheet, type) {
    this.mobile = sheet['assay_Owner_Phone']
    this.sheetType = type
    this.setState({showEdit: true})
  }

  updateRemark = (newRemark) => {
    this.props.updateRemark(this.props.list[this.state.index]['assay_Owner_Phone'], newRemark)
  }

  componentDidMount() {
    this.beginFetch()
    if (this.props.hospitalList.length == 0) {
      this.props.fetchHospitalList()
    }
  }

  componentDidUpdate() {
    if (this.props.remarkUpdated) {
      this.props.clearRemark()
      antdUtil.tipSuccess('更新备注成功！')
    }
  }

  render() {
    const isCanEdit = getIsCanEdit(this.context.pageList, appPageNames.laboratorySheet)
    const isCanExport = getIsCanExport(this.context.pageList, appPageNames.laboratorySheet)

    const {Head, Row} = Layout
    const getSheetNumber = (sheet, name, index) => {
      if (sheet[name] == 0) {
        return <span>0张</span>
      }
      return (
        <span className="editable-number" onClick={e => this.editLaboratorySheet(sheet, index)}>{sheet[name]}张</span>
      )
    }

    return (
      <div className="app-function-page">
        {
          this.state.showEdit && (
            <EditLaboratorySheet mobile={this.mobile}
                                 sheetType={this.sheetType}
                                 fetchPictureUrlList={this.props.fetchPictureUrlList}
                                 markSheetItem={this.props.markSheetItem}
                                 sheetStateUpdated={() => this.beginFetch()}
                                 isCanEdit={isCanEdit}
                                 onExited={() => this.setState({showEdit: false})}/>
          )
        }

        {
          this.state.editRemark && this.state.index != -1 && (
            <EditRemark updateRemark={this.updateRemark}
                        remarkUpdated={this.props.remarkUpdated}
                        onExited={() => this.setState({editRemark: false})}/>
          )
        }

        <QueryFilter ref={c => this._queryFilter = c} className="ex-big-label"
                     beginFilter={() => this.beginFetch(1)}
                     searchKeyName="key_Words"
                     placeholder="手机号码 / 姓名"
                     onSearchKeyChange={searchKey => this.setState({searchKey})}
        >
          <FilterItem className="middle-filter-item" item={this.props.hospitalFilterList} paramName="hospital_Name" useText={true}/>

          <FilterItem className="small-filter-item" item={this.props.visitDoctorFilterList}>
            <CustomTextInput placeholder="请输入随访医生姓名" textName="visit_Doctor_Name"/>
          </FilterItem>

          <FilterItem className="small-filter-item" item={this.props.infectionDoctorFilterList}>
            <CustomTextInput placeholder="请输入感染科医生姓名" textName="infection_Doctor_Name"/>
          </FilterItem>

          <FilterItem className="small-filter-item" item={this.props.obstetricsDoctorFilterList}>
            <CustomTextInput placeholder="请输入妇产科医生姓名" textName="obstetrics_Doctor_Name"/>
          </FilterItem>

          <FilterItem className="small-filter-item" item={this.props.pediatricsDoctorFilterList}>
            <CustomTextInput placeholder="请输入儿科医生姓名" textName="pediatrics_Doctor_Name"/>
          </FilterItem>
        </QueryFilter>

        <PaginateList ref={c => this._paginateList = c}
                      doFetch={() => this.doFetch()}
                      total={this.props.total}
                      lengthName="limit"
                      byName="order_By"
        >
          <Layout loading={this.props.loading}
                  minWidth={1250}
                  fixHead={true}
                  fixLeft={[0, 2]}
                  weight={['80px', 2, 2, 2, 2, 2, 2, 2, 2, '75px', '75px', '60px', '60px', '50px', '60px']}
          >
            <Head>
              <Head.Item>
                <SortBy by="owner_phone" activeWidth={85}>手机号码</SortBy>
              </Head.Item>
              <Head.Item>患者编号</Head.Item>
              <Head.Item>患者姓名</Head.Item>
              <Head.Item>医院</Head.Item>
              <Head.Item>随访医生</Head.Item>
              <Head.Item>感染科医生</Head.Item>
              <Head.Item>妇产科医生</Head.Item>
              <Head.Item>儿科医生</Head.Item>
              <Head.Item>备注</Head.Item>
              <Head.Item>
                <SortBy by="visit_doctor_upload_count" activeWidth={85}>医生上传</SortBy>
              </Head.Item>
              <Head.Item>
                <SortBy by="patient_count" activeWidth={85}>患者上传</SortBy>
              </Head.Item>
              <Head.Item>
                <SortBy by="is_input" activeWidth={80}>已录入</SortBy>
              </Head.Item>
              <Head.Item>
                <SortBy by="is_no_input" activeWidth={80}>未录入</SortBy>
              </Head.Item>
              <Head.Item>
                <SortBy by="invalid_count" activeWidth={65}>无效</SortBy>
              </Head.Item>
              <Head.Item>
                <SortBy by="delete_list" activeWidth={80}>已删除</SortBy>
              </Head.Item>
            </Head>
            <div>
              {
                this.props.list.map((sheet, index) => {
                  return (
                    <Row key={index}
                         onClick={e => this.setState({index: index})}
                         selected={this.state.index == index}
                         style={{minHeight: '50px'}}
                    >
                      <Row.Item>
                        <HighLight match={this.state.searchKey}>
                          {sheet['assay_Owner_Phone']}
                        </HighLight>
                      </Row.Item>
                      <Row.Item>{sheet['patient_Code']}</Row.Item>
                      <Row.Item>
                        <HighLight match={this.state.searchKey}>
                          {sheet['patient_Name']}
                        </HighLight>
                      </Row.Item>
                      <Row.Item>{sheet['hospital_Name']}</Row.Item>
                      <Row.Item>{sheet['visit_Doctor_Name']}</Row.Item>
                      <Row.Item>{sheet['infection_Doctor']}</Row.Item>
                      <Row.Item>{sheet['obstetrics_Doctor']}</Row.Item>
                      <Row.Item>{sheet['pediatrics_Doctor']}</Row.Item>
                      <Row.Item>
                        <ShowMoreText limit={50}>{sheet['patient_Assay_Remark']}</ShowMoreText>
                        {
                          isCanEdit && (
                            <i className="edit-remark-svg" onClick={() => this.setState({editRemark: true, index})}></i>
                          )
                        }
                      </Row.Item>
                      <Row.Item>{getSheetNumber(sheet, 'visit_Doctor_Upload_Count', 1)}</Row.Item>
                      <Row.Item>{getSheetNumber(sheet, 'patient_Count', 2)}</Row.Item>
                      <Row.Item>{getSheetNumber(sheet, 'is_Input', 3)}</Row.Item>
                      <Row.Item>{getSheetNumber(sheet, 'is_No_Input', 4)}</Row.Item>
                      <Row.Item>{getSheetNumber(sheet, 'invalid_Count', 5)}</Row.Item>
                      <Row.Item>{getSheetNumber(sheet, 'delete_List', 6)}</Row.Item>
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
  return {
    ...state['laboratorySheet'],
    hospitalList: state.hospitalList,
    hospitalFilterList: {
      typeCode: 'hospital',
      typeText: '医院',
      typeItemList: state.hospitalList
    },
    visitDoctorFilterList: getFilterItem('visitDoctor', '随访医生', []),
    infectionDoctorFilterList: getFilterItem('infectionDoctor', '感染科医生', []),
    obstetricsDoctorFilterList: getFilterItem('obstetricsDoctor', '妇产科医生', []),
    pediatricsDoctorFilterList: getFilterItem('pediatricsDoctor', '儿科医生', []),
  }
}

function mapActionToProps(dispatch) {
  return merge({}, bindActionCreators({
    fetchLaboratorySheetList: actions.fetchLaboratorySheetList,
    fetchHospitalList: fetchHospitalList1,
    updateRemark: actions.updateRemark,
    clearRemark: actions.clearRemark
  }, dispatch), {
    fetchPictureUrlList: actions.fetchPictureUrlList(dispatch),
    markSheetItem: actions.markSheetItem(dispatch)
  })
}

LaboratorySheet.contextTypes = {
  pageList: React.PropTypes.array
}

export default connect(mapStateToProps, mapActionToProps)(LaboratorySheet)
