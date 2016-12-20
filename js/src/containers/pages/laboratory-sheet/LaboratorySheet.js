/**
 * Created by jiangyukun on 2016/12/15.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'
import {merge} from 'lodash'

import QueryFilter from '../../../components/core/QueryFilter'
import FilterItem from '../../../components/core/query-filter/FilterItem'
import CustomTextInput from '../../../components/core/query-filter/custom/CustomTextInput'
import PaginateList from '../../../components/core/PaginateList'
import SortBy from '../../../components/core/paginate-list/SortBy'
import SmartList from '../../../components/core/list/SmartList'
import HeadContainer from '../../../components/core/list/HeadContainer'
import BodyContainer from '../../../components/core/list/BodyContainer'
import EditLaboratorySheet from './EditLaboratorySheet'

import {ConditionResolver} from '../../../core/queryFilterHelper'
import {getFilterItem} from '../../../core/utils'
import {fetchHospitalList} from '../../../actions/hospital'
import * as actions from '../../../actions/pages/laboratory-sheet'

class LaboratorySheet extends Component {
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
        this.allConditions = this._queryFilter.getAllConditions()
        this.pageInfo = this._paginateList.getPageInfo()
        this.props.fetchLaboratorySheetList(merge({}, this.handleFetchConditions())).then(() => this.setState({loading: false}))
    }

    handleFetchConditions() {
        let option = new ConditionResolver(this.allConditions.filters)
            .resolve('hospital', 'hospital_Name', true)
            .resolve('infectionDoctor', 'infection_Doctor_Name')
            .resolve('obstetricsDoctor', 'obstetrics_Doctor_Name')
            .resolve('pediatricsDoctor', 'pediatrics_Doctor_Name')
            .resolve('visitDoctor', 'visit_Doctor_Name')
            .getCondition()
        option['key_Words'] = this.allConditions.searchKey
        option['start'] = this.pageInfo.start
        option['limit'] = this.pageInfo.length
        option['draw'] = this.pageInfo.draw
        if (this.pageInfo.by && this.pageInfo.order) {
            option['order_By'] = this.pageInfo.by
            option['order'] = this.pageInfo.order
        }
        return option
    }

    editLaboratorySheet(sheet, type) {
        this.mobile = sheet['assay_Owner_Phone']
        this.sheetType = type
        this.setState({showEdit: true})
    }

    componentDidMount() {
        this.beginFetch()
        if (this.props.hospitalList.length == 0) {
            this.props.fetchHospitalList()
        }
    }

    render() {
        let getSheetNumber = (sheet, name, index) => {
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
                                             onExited={() => this.setState({showEdit: false})}/>
                    )
                }

                <QueryFilter ref={c => this._queryFilter = c} className="ex-big-label"
                             beginFilter={() => this.beginFetch(1)}>

                    <FilterItem className="middle-filter-item" item={this.props.hospitalFilterList}/>
                    <FilterItem className="small-filter-item" item={this.props.visitDoctorFilterList}>
                        <CustomTextInput placeholder="请输入随访医生姓名"/>
                    </FilterItem>
                    <FilterItem className="small-filter-item" item={this.props.infectionDoctorFilterList}>
                        <CustomTextInput placeholder="请输入感染科医生姓名"/>
                    </FilterItem>
                    <FilterItem className="small-filter-item" item={this.props.obstetricsDoctorFilterList}>
                        <CustomTextInput placeholder="请输入妇产科医生姓名"/>
                    </FilterItem>
                    <FilterItem className="small-filter-item" item={this.props.pediatricsDoctorFilterList}>
                        <CustomTextInput placeholder="请输入儿科医生姓名"/>
                    </FilterItem>
                </QueryFilter>

                <PaginateList ref={c => this._paginateList = c} doFetch={() => this.doFetch()} total={this.props.total}>

                    <SmartList loading={this.state.loading} fixHead={true} style={{minWidth: '1600px'}} fixLeft={[0, 2]}>
                        <HeadContainer>
                            <ul className="flex-list header">
                                <li className="item" style={{width: '100px'}}>
                                    <SortBy by="owner_phone">手机号码</SortBy>
                                </li>
                                <li className="item flex2">患者编号</li>
                                <li className="item flex2">患者姓名</li>
                                <li className="item flex2">医院</li>
                                <li className="item flex2">随访医生</li>
                                <li className="item flex2">感染科医生</li>
                                <li className="item flex2">妇产科医生</li>
                                <li className="item flex2">儿科医生</li>
                                <li className="item" style={{width: '120px'}}>
                                    <SortBy by="visit_doctor_upload_count" activeWidth={120}>随访医生上传</SortBy>
                                </li>
                                <li className="item" style={{width: '90px'}}>
                                    <SortBy by="patient_count">患者上传</SortBy>
                                </li>
                                <li className="item" style={{width: '80px'}}>
                                    <SortBy by="is_input">已录入</SortBy>
                                </li>
                                <li className="item" style={{width: '80px'}}>
                                    <SortBy by="is_no_input">未录入</SortBy>
                                </li>
                                <li className="item" style={{width: '80px'}}>
                                    <SortBy by="invalid_count">无效</SortBy>
                                </li>
                                <li className="item" style={{width: '80px'}}>
                                    <SortBy by="delete_list">已删除</SortBy>
                                </li>
                            </ul>
                        </HeadContainer>
                        <BodyContainer>
                            <div>
                                {
                                    this.props.list.map((sheet, index) => {
                                        return (
                                            <ul key={index}
                                                style={{height: '50px'}}
                                                className={classnames('flex-list body', {'selected': this.state.currentIndex == index})}
                                                onClick={e => this.setState({currentIndex: index})}
                                                onDoubleClick={e => this.setState({currentIndex: index, showEdit: true})}
                                            >
                                                <li className="item" style={{width: '100px'}}>{sheet['assay_Owner_Phone']}</li>
                                                <li className="item flex2">{sheet['patient_Code']}</li>
                                                <li className="item flex2">{sheet['patient_Name']}</li>
                                                <li className="item flex2">{sheet['hospital_Name']}</li>
                                                <li className="item flex2">{sheet['visit_Doctor_Name']}</li>
                                                <li className="item flex2">{sheet['infection_Doctor']}</li>
                                                <li className="item flex2">{sheet['obstetrics_Doctor']}</li>
                                                <li className="item flex2">{sheet['pediatrics_Doctor']}</li>
                                                <li className="item" style={{width: '120px'}}>
                                                    {getSheetNumber(sheet, 'visit_Doctor_Upload_Count', 1)}
                                                </li>
                                                <li className="item" style={{width: '90px'}}>
                                                    {getSheetNumber(sheet, 'patient_Count', 2)}
                                                </li>
                                                <li className="item" style={{width: '80px'}}>
                                                    {getSheetNumber(sheet, 'is_Input', 3)}
                                                </li>
                                                <li className="item" style={{width: '80px'}}>
                                                    {getSheetNumber(sheet, 'is_No_Input', 4)}
                                                </li>
                                                <li className="item" style={{width: '80px'}}>
                                                    {getSheetNumber(sheet, 'invalid_Count', 5)}
                                                </li>
                                                <li className="item" style={{width: '80px'}}>
                                                    {getSheetNumber(sheet, 'delete_List', 6)}
                                                </li>
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
    const {list, total} = state.laboratorySheetList
    return {
        list,
        total,
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
    return {
        fetchLaboratorySheetList: actions.fetchLaboratorySheetList(dispatch),
        fetchHospitalList: fetchHospitalList(dispatch),
        fetchPictureUrlList: actions.fetchPictureUrlList(dispatch),
        markSheetItem: actions.markSheetItem(dispatch)
    }
}

export default connect(mapStateToProps, mapActionToProps)(LaboratorySheet)
