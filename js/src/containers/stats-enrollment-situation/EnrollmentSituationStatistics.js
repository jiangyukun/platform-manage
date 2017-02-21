/**
 * Created by jiangyukun on 2017/2/20.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import QueryFilter from '../../components/core/QueryFilter'
import FilterItem from '../../components/core/query-filter/FilterItem'
import CustomTextInput from '../../components/core/query-filter/custom/CustomTextInput'
import PaginateList from '../../components/core/PaginateList'
import Layout from "../../components/core/layout/Layout"

import Modal from '../../components/modal/Modal'

class EnrollmentSituationStatistics extends Component {
  state = {
    show: false,
    show1: true,
    showExport: false
  }

  render() {
    const {Head, Row} = Layout

    return (
      <div className="app-function-page">

        {
          this.state.show && (
            <Modal show={this.state.show1} onHide={() => this.setState({show1: false})} onExited={() => this.setState({show: false})}>
              <Modal.Header closeButton={true}>
                <Modal.Title>测测看看</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                xsjos
              </Modal.Body>
            </Modal>
          )
        }
        <QueryFilter ref={c => this._queryFilter = c} className="ex-big-label"
                     beginFilter={() => this.beginFetch(1)}
                     searchKeyName="search_key"
        >
          <button className="btn btn-primary mr-20" onClick={() => this.setState({showExport: true})}
                  disabled={this.props.total == 0}>导出excel
          </button>

          <FilterItem item={this.props.hospitalFilterList} paramName="hospital_id"/>

          <FilterItem item={this.props.backendMangerList}>
            <CustomTextInput placeholder="请输入后台管理人员" textName="backend_manager"/>
          </FilterItem>

          <FilterItem className="small-filter-item" item={this.props.operationPersonList}>
            <CustomTextInput placeholder="请输入运营人员" textName="operation_manager"/>
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
                this.props.list.map((comprehensiveScore, index) => {
                  return (
                    <Row key={comprehensiveScore['doctor_User_Id']}
                         onClick={e => this.setState({currentIndex: index})}
                         selected={this.state.currentIndex == index}
                         style={{minHeight: '60px'}}
                    >
                      <Row.Item>{comprehensiveScore['doctor_Phone']}</Row.Item>
                      <Row.Item>{comprehensiveScore['doctor_Name']}</Row.Item>
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
    list: [],
    total: 0
  }
}

function mapActionToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapActionToProps)(EnrollmentSituationStatistics)
