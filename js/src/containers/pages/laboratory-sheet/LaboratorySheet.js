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
import SmartList from '../../../components/core/list/SmartList'
import HeadContainer from '../../../components/core/list/HeadContainer'
import BodyContainer from '../../../components/core/list/BodyContainer'

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
        this.props.fetchLaboratorySheetList(merge({}, this.pageInfo, this.handleFilterConditions())).then(() => this.setState({loading: false}))
    }

    handleFilterConditions() {

    }

    editLaboratorySheet() {

    }

    componentDidMount() {
        this.beginFetch()
        if (this.props.hospitalList.length == 0) {
            this.props.fetchHospitalList()
        }
    }

    render() {
        return (
            <div className="app-function-page">
                {
                    this.state.showEdit && (
                        <EditLaboratorySheet />
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

                <PaginateList ref={c => this._paginateList = c}
                              beginFetch={() => this.beginFetch()} doFetch={() => this.doFetch()}
                              total={this.props.total}>

                    <SmartList loading={this.state.loading} fixHead={true} style={{minWidth: '1600px'}} fixLeft={[0, 2]}>
                        <HeadContainer>
                            <ul className="flex-list header">
                                <li className="item flex2">手机号码</li>
                                <li className="item flex2">患者编号</li>
                                <li className="item flex2">患者姓名</li>
                                <li className="item flex2">医院</li>
                                <li className="item flex2">随访医生</li>
                                <li className="item flex2">感染科医生</li>
                                <li className="item flex2">妇产科医生</li>
                                <li className="item flex2">儿科医生</li>
                                <li className="item flex2">随访医生上传</li>
                                <li className="item flex1">患者上传</li>
                                <li className="item flex1">已录入</li>
                                <li className="item flex1">未录入</li>
                                <li className="item flex1">无效</li>
                                <li className="item flex1">已删除</li>
                            </ul>
                        </HeadContainer>
                        <BodyContainer>
                            <div>
                                {
                                    this.props.list.map((sheet, index) => {
                                        return (
                                            <ul key={index} className={classnames('flex-list body', {'selected': this.state.currentIndex == index})}
                                                onClick={e => this.setState({currentIndex: index})}
                                                onDoubleClick={e => this.setState({currentIndex: index, showEdit: true})}
                                            >
                                                <li className="item flex2">{sheet['assay_Owner_Phone']}</li>
                                                <li className="item flex2">{sheet['patient_Code']}</li>
                                                <li className="item flex2">{sheet['patient_Name']}</li>
                                                <li className="item flex2">{sheet['hospital_Name']}</li>
                                                <li className="item flex2">{sheet['visit_Doctor_Name']}</li>
                                                <li className="item flex2">{sheet['infection_Doctor']}</li>
                                                <li className="item flex2">{sheet['obstetrics_Doctor']}</li>
                                                <li className="item flex2">{sheet['pediatrics_Doctor']}</li>
                                                <li className="item flex2">
                                                    <span className="editable-number" onClick={e => this.editLaboratorySheet(sheet, 1)}>{sheet['visit_Doctor_Upload_Count']}张</span>
                                                </li>
                                                <li className="item flex1">
                                                    <span className="editable-number" onClick={e => this.editLaboratorySheet(sheet, 1)}>{sheet['patient_Count']}</span>
                                                </li>
                                                <li className="item flex1">
                                                    <span className="editable-number" onClick={e => this.editLaboratorySheet(sheet, 1)}>{sheet['is_Input']}</span>
                                                </li>
                                                <li className="item flex1">
                                                    <span className="editable-number" onClick={e => this.editLaboratorySheet(sheet, 1)}>{sheet['is_No_Input']}</span>
                                                </li>
                                                <li className="item flex1">
                                                    <span className="editable-number" onClick={e => this.editLaboratorySheet(sheet, 1)}>{sheet['invalid_Count']}</span>
                                                </li>
                                                <li className="item flex1">
                                                    <span className="editable-number" onClick={e => this.editLaboratorySheet(sheet, 1)}>{sheet['delete_List']}</span>
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
        fetchHospitalList: fetchHospitalList(dispatch)
    }
}

export default connect(mapStateToProps, mapActionToProps)(LaboratorySheet)
