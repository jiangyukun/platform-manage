/**
 * Created by jiangyukun on 2016/12/8.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'
import {merge} from 'lodash'
import PaginateList from '../../../../components/core/PaginateList'
import SmartList from '../../../../components/core/list/SmartList'
import HeadContainer from '../../../../components/core/list/HeadContainer'
import BodyContainer from '../../../../components/core/list/BodyContainer'
import * as actions from '../../../../actions/pages/patient-situation-statistics'

class PatientSituationStatistics extends Component {
    constructor() {
        super()
        this.state = {
            currentIndex: -1,
            loading: false
        }
    }

    beginFetch() {
        this._paginateList.beginFetch()
    }

    doFetch() {
        this.setState({currentIndex: -1, loading: true})
        this.pageInfo = this._paginateList.getPageInfo()
        this.props.fetchPatientSituationList(merge({}, this.pageInfo)).then(() => this.setState({loading: false}))
    }

    componentDidMount() {
        this.beginFetch()
    }

    render() {
        return (
            <div className="app-function-page">
                <div>
                    <button className="btn btn-primary"
                            style={{marginTop: '20px', marginBottom: '20px', marginLeft: '15px'}}
                             onClick={e=>window.open('export/patientReportExcel')}>导出excel</button>
                </div>
                <PaginateList ref={c => this._paginateList = c}
                              beginFetch={() => this.beginFetch()} doFetch={() => this.doFetch()}
                              total={this.props.total}>

                    <SmartList loading={this.state.loading} fixHead={true} fixLeft={[1, 2]}>
                        <HeadContainer>
                            <ul className="flex-list header">
                                <li className="item flex2">医院名称</li>
                                <li className="item flex1">医院编码</li>
                                <li className="item flex1">是否项目医院</li>
                                <li className="item flex1">非临床患者数</li>
                                <li className="item flex1">临床患者数</li>
                                <li className="item flex1">2期编号数</li>
                            </ul>
                        </HeadContainer>
                        <BodyContainer>
                            <div>
                                {
                                    this.props.list.map((statistics, index) => {
                                        return (
                                            <ul key={index} className={classnames('flex-list body', {'selected': this.state.currentIndex == index})}
                                                onClick={e => this.setState({currentIndex: index})}
                                            >
                                                <li className="item flex2">{statistics['hospital_name']}</li>
                                                <li className="item flex1">{statistics['hospital_code']}</li>
                                                <li className="item flex1">{statistics['is_project_hospital']}</li>
                                                <li className="item flex1">{statistics['non_clinical_patient_count']}</li>
                                                <li className="item flex1">{statistics['clinical_patient_count']}</li>
                                                <li className="item flex1">{statistics['patient_count']}</li>
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
    let {total, list} = state.patientSituationList
    return {
        total, list
    }
}

function mapActionToProps(dispatch) {
    return {
        fetchPatientSituationList: actions.fetchPatientSituationList(dispatch)
    }
}

export default connect(mapStateToProps, mapActionToProps)(PatientSituationStatistics)
