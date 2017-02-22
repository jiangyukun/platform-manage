/**
 * Created by jiangyukun on 2016/12/8.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'
import {merge} from 'lodash'

import PaginateList from '../../components/core/PaginateList'
import SmartList from '../../components/core/list/SmartList'
import HeadContainer from '../../components/core/list/HeadContainer'
import BodyContainer from '../../components/core/list/BodyContainer'

import * as utils from '../../core/utils'
import {fetchPatientSituationList} from './patient-situation'

class PatientSituationStatistics extends Component {
  constructor() {
    super()
    this.state = {
      currentIndex: -1,
    }
  }

  beginFetch(newPageIndex) {
    this._paginateList.beginFetch(newPageIndex)
  }

  doFetch() {
    this.setState({currentIndex: -1, loading: true})
    this.props.fetchPatientSituationList(this._paginateList.getParams())
  }

  exportExcel = () => {
    utils.exportExcel('export/patientReportExcel')
  }

  componentDidMount() {
    this.beginFetch()
  }

  render() {
    return (
      <div className="app-function-page">
        <div>
          <button className="btn btn-primary" style={{marginTop: '20px', marginBottom: '20px', marginLeft: '15px'}}
                  onClick={this.exportExcel}>导出excel
          </button>
        </div>
        <PaginateList ref={c => this._paginateList = c}
                      doFetch={() => this.doFetch()}
                      total={this.props.total}
                      lengthName="limit"
        >

          <SmartList loading={this.props.loading} fixHead={true} fixLeft={[1, 2]}>
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
                          style={{height: '40px'}}
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
  return {
    ...state.patientSituationList
  }
}

export default connect(mapStateToProps, {
  fetchPatientSituationList
})(PatientSituationStatistics)
