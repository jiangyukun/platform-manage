/**
 * Created by jiangyukun on 2016/12/8.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'
import {merge} from 'lodash'
import PaginateList from '../../components/core/PaginateList'
import SmartList from '../../components/list/SmartList'
import HeadContainer from '../../components/list/HeadContainer'
import BodyContainer from '../../components/list/BodyContainer'
import DownloadExcelDialog from './DownloadExcelDialog'

import {appPageNames} from '../../constants/nav'
import {getIsCanEdit, getIsCanExport} from '../../constants/authority'
import * as actions from './hospital-assay-report'

class HospitalAssayReport extends Component {
  constructor() {
    super()
    this.state = {
      currentIndex: -1,
      loading: false,
      showDialog: false
    }
  }

  beginFetch(newPageIndex) {
    this._paginateList.beginFetch(newPageIndex)
  }

  doFetch() {
    this.setState({currentIndex: -1, loading: true})
    this.props.fetchHospitalAssayPaginateList(this._paginateList.getParams()).then(() => this.setState({loading: false}))
  }

  componentDidMount() {
    this.beginFetch()
  }

  render() {
    const isCanEdit = getIsCanEdit(this.context.pageList, appPageNames.hospitalAssayReport)
    const isCanExport = getIsCanExport(this.context.pageList, appPageNames.hospitalAssayReport)

    return (
      <div className="app-function-page">
        {
          this.state.showDialog && (
            <DownloadExcelDialog
              show={this.state.showDialog}
              fetchHistoryAssayReportList={this.props.fetchHistoryAssayReportList}
              onExited={() => this.setState({showDialog: false})}
            />
          )
        }

        <div className="mt-20">
          {
            isCanExport && (
              <button className="btn btn-primary"
                      style={{marginTop: '20px', marginBottom: '20px', marginLeft: '15px'}}
                      onClick={e => this.setState({showDialog: true})}>导出每周记录
              </button>
            )
          }

        </div>
        <PaginateList ref={c => this._paginateList = c}
                      doFetch={() => this.doFetch()}
                      total={this.props.total}
                      lengthName="limit"
        >

          <SmartList loading={this.state.loading} fixHead={true} fixLeft={[1]}>
            <HeadContainer>
              <ul className="flex-list-header">
                <li className="item flex1">省份</li>
                <li className="item flex1">中心</li>
                <li className="item flex1">中心编号</li>
                <li className="item flex1">注册年份</li>
                <li className="item flex1">中心新注册人数</li>
                <li className="item flex1">化验单上传人数</li>
                <li className="item flex1">化验单上传数</li>
                <li className="item flex1">化验单录入数</li>
                <li className="item flex1">无效化验单数</li>
                <li className="item flex1">未录入数</li>
                <li className="item flex1">已删除化验单数</li>
              </ul>
            </HeadContainer>
            <BodyContainer>
              <div>
                {
                  this.props.list.map((statistics, index) => {
                    return (
                      <ul key={index} className={classnames('flex-list-row', {'selected': this.state.currentIndex == index})}
                          style={{height: '50px'}}
                          onClick={e => this.setState({currentIndex: index})}
                      >
                        <li className="item flex1">{statistics['hospital_province']}</li>
                        <li className="item flex1">{statistics['hospital_name']}</li>
                        <li className="item flex1">{statistics['hospital_code']}</li>
                        <li className="item flex1">{statistics['patient_year']}</li>
                        <li className="item flex1">{statistics['patient_count']}</li>
                        <li className="item flex1">{statistics['assayUploadPersonCount']}</li>
                        <li className="item flex1">{statistics['assayCount']}</li>
                        <li className="item flex1">{statistics['is_Input']}</li>
                        <li className="item flex1">{statistics['invalid_Count']}</li>
                        <li className="item flex1">{statistics['is_No_Input']}</li>
                        <li className="item flex1">{statistics['delete_Count']}</li>
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
  let {total, list} = state.hospitalAssayReportPaginateList
  return {
    total, list
  }
}

function mapActionToProps(dispatch) {
  return {
    fetchHospitalAssayPaginateList: actions.fetchHospitalAssayPaginateList(dispatch),
    fetchHistoryAssayReportList: actions.fetchHistoryAssayReportList(dispatch)
  }
}

HospitalAssayReport.contextTypes = {
  pageList: React.PropTypes.array
}

export default connect(mapStateToProps, mapActionToProps)(HospitalAssayReport)
