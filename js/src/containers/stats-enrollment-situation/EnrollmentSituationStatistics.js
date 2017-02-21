/**
 * Created by jiangyukun on 2017/2/20.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {merge} from 'lodash'

import QueryFilter from '../../components/core/QueryFilter'
import FilterItem from '../../components/core/query-filter/FilterItem'
import CustomDateRange from '../../components/core/query-filter/custom/CustomDateRange'
import PaginateList from '../../components/core/PaginateList'
import Layout from "../../components/core/layout/Layout"

import * as utils from '../../core/utils'
import {fetchHospitalList1} from '../../actions/hospital'
import * as actions from './enrolement-situation'

class EnrollmentSituationStatistics extends Component {
  state = {
    show: false,
    showExport: false
  }

  beginFetch(newPageIndex) {
    this._paginateList.beginFetch(newPageIndex)
  }

  doFetch() {
    this.setState({currentIndex: -1})
    this.props.fetchList(merge({}, this._queryFilter.getParams(), this._paginateList.getParams()))
  }

  componentDidMount() {
    this.beginFetch()
    if (this.props.hospitalList.length == 0) {
      this.props.fetchHospitalList1()
    }
  }

  render() {
    const {Head, Row} = Layout

    return (
      <div className="app-function-page">

        <QueryFilter ref={c => this._queryFilter = c} className="ex-big-label"
                     beginFilter={() => this.beginFetch(1)}
                     searchKeyName="search_key"
        >
          <button className="btn btn-primary mr-20" onClick={() => this.setState({showExport: true})}
                  disabled={this.props.total == 0}>导出excel
          </button>

          <FilterItem item={this.props.hospitalFilterList} paramName="hospital_id"/>

          <FilterItem size="small" item={this.props.registerFilterList}>
            <CustomDateRange startName="patient_Info_Create_Begin_Time" endName="patient_Info_Create_End_Time"/>
          </FilterItem>
        </QueryFilter>

        <PaginateList ref={c => this._paginateList = c}
                      doFetch={() => this.doFetch()}
                      total={this.props.total}
                      startName="startRows"
                      lengthName="rows"
                      byName="order_By"
        >
          <Layout loading={this.props.loading}
                  minWidth={1000}
                  fixHead={true}
                  fixLeft={[0, 2]}
                  weight={[1, 1]}
          >
            <Head>
              <Head.Item>医院/医生</Head.Item>
              <Head.Item>入组数2</Head.Item>
            </Head>
            <div>
              {
                this.props.list.map((enrollment, index) => {
                  if (enrollment['isHospital'] == 1) {
                    return (
                      <Row key={index}
                           onClick={e => this.setState({currentIndex: index})}
                           selected={this.state.currentIndex == index}
                           style={{height: '30px', fontSize: '14px', fontWeight: 'bold'}}
                      >
                        <Row.Item>{enrollment['hospital_Or_Doctor_Name']}</Row.Item>
                        <Row.Item>{enrollment['hospital_Or_Doctor_Count']}</Row.Item>
                      </Row>
                    )
                  }
                  return (
                    <Row key={index}
                         onClick={e => this.setState({currentIndex: index})}
                         selected={this.state.currentIndex == index}
                         style={{minHeight: '40px'}}
                    >
                      <Row.Item>{enrollment['hospital_Or_Doctor_Name']}</Row.Item>
                      <Row.Item>{enrollment['hospital_Or_Doctor_Count']}</Row.Item>
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
    ...state['enrollmentList'],
    hospitalList: state['hospitalList'],
    hospitalFilterList: utils.getFilterItem('hospital', '医院', state.hospitalList),
    registerFilterList: utils.getFilterItem('register', '注册日期', [])
  }
}

export default connect(mapStateToProps, {
  fetchList: actions.fetchList,
  fetchHospitalList1
})(EnrollmentSituationStatistics)
