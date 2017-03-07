/**
 * Created by jiangyukun on 2017/3/2.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {merge} from 'lodash'

import Button from '../../components/element/Button'
import FlexList from '../../components/list/FlexList'
import Head from '../../components/table-layout/Head'
import Row from '../../components/table-layout/Row'

import AddAnalyticDialog from './AddAnalyticDialog'
import EditAnalyticDialog from './EditAnalyticDialog'

import {fetchList, addAnalyticItem} from './smart-analytic-system'

class SmartAnalyticSystem extends Component {
  state = {
    index: -1,
    add: false,
    edit: false
  }

  handleMouseDown = () => {
    this.pressFlag = true
  }

  handleMouseMove = (e) => {
    if (this.pressFlag) {
      let row = e.target
      while (row && row.getAttribute("class").indexOf('body') == -1) {
        row = row.parentNode
      }
      if (row) {
        this._handleMove(row)
      }
    }
  }

  _handleMove(row) {
    row.style.position = 'absolute'
    row.style.left = '0px'
    row.style.right = '0px'
    let curTop = parseInt(row.style.top) || 0
    row.style.top = (curTop + 1) + 'px'
  }

  handleMouseUp = () => {
    this.pressFlag = false
  }

  componentDidMount() {
    this.props.fetchList({start: 0, limit: 100})
  }

  render() {
    return (
      <div className="app-function-page smart-analytic-system">
        {
          this.state.add && (
            <AddAnalyticDialog
              addAnalyticItem={this.props.addAnalyticItem}
              onExited={() => this.setState({add: false})}/>
          )
        }
        {
          this.state.edit && this.state.index != -1 && (
            <EditAnalyticDialog
              analyticItem={this.props.list[this.state.index]}
              onExited={() => this.setState({edit: false})}/>
          )
        }

        <div className="toolbar">
          <Button type="primary" onClick={() => this.setState({add: true})}>新增</Button>
          <Button type="info" onClick={() => this.setState({edit: true})} disabled={this.state.index == -1}>查看</Button>
          <div className="search-container">
            <input placeholder="输入关键字查询建议、备注"/>
            <button>搜索</button>
          </div>
        </div>

        <FlexList loading={this.props.loading}
                  minWidth={1200}
                  weight={[1, 1, 1, 1, 1, 10, 8]}
        >
          <Head>
            <Head.Item className="flex">
              <div className="flex-vertical-center">序号</div>
            </Head.Item>
            <Head.Item className="flex">
              <div className="flex-vertical-center">访视点</div>
            </Head.Item>
            <Head.Item className="flex">
              <div className="flex-vertical-center">诊疗建议</div>
            </Head.Item>
            <Head.Item className="flex">
              <div className="flex-vertical-center">备注</div>
            </Head.Item>
            <Head.Item className="flex">
              <div className="flex-vertical-center">创建时间</div>
            </Head.Item>
            <Head.CategoryItem categoryName="母亲情况">
              <Head.Item>HBsAg</Head.Item>
              <Head.Item>HBsAb</Head.Item>
              <Head.Item>HBeAg</Head.Item>
              <Head.Item>HBeAb</Head.Item>
              <Head.Item>HBcAb</Head.Item>
              <Head.Item>HBV-DNA (IU/mL)</Head.Item>
              <Head.Item>ALT (U/L)</Head.Item>
              <Head.Item>肝脏B超</Head.Item>
              <Head.Item>用药情况</Head.Item>
            </Head.CategoryItem>
            <Head.CategoryItem categoryName="宝宝情况">
              <Head.Item>出生体重</Head.Item>
              <Head.Item>HBsAg</Head.Item>
              <Head.Item>HBsAb</Head.Item>
              <Head.Item>HBeAg</Head.Item>
              <Head.Item>HBeAb</Head.Item>
              <Head.Item>HBcAb</Head.Item>
              <Head.Item>HBsAb滴度</Head.Item>
            </Head.CategoryItem>
          </Head>
          <div style={{position: 'relative'}}>
            {
              this.props.list.map((item, index) => {
                return (
                  <Row key={item['serial_Number']}
                       onClick={e => this.setState({index})}
                       onDoubleClick={() => this.setState({index, edit: true})}
                       selected={this.state.index == index}
                       onMouseDown={this.handleMouseDown}
                       onMouseMove={this.handleMouseMove}
                       onMouseUp={this.handleMouseUp}
                       style={{minHeight: '60px'}}
                  >
                    <Row.Item>{item['serial_Number']}</Row.Item>
                    <Row.Item>{item['visit_Type']}</Row.Item>
                    <Row.Item>{item['suggest']}</Row.Item>
                    <Row.Item>
                      {item['remark']}
                      <i className="edit-remark-svg"
                         onClick={e => this.setState({showEditRemark: true, index})}/>
                    </Row.Item>
                    <Row.Item>{item['create_Time']}</Row.Item>
                    <Row.CagetoryItem>
                      <Row.Item>{item['mother_HBsAg']}</Row.Item>
                      <Row.Item>{item['mother_HBsAb']}</Row.Item>
                      <Row.Item>{item['mother_HBeAg']}</Row.Item>
                      <Row.Item>{item['mother_HBeAb']}</Row.Item>
                      <Row.Item>{item['mother_HBcAb']}</Row.Item>
                      <Row.Item>{item['mother_HBV_DNA_Prefix']}</Row.Item>
                      <Row.Item>{item['mother_ALT_First_Prefix']}</Row.Item>
                      <Row.Item>{item['mother_Liver_B_Prefix']}</Row.Item>
                      <Row.Item>{item['mother_Use_Drug_Prefix']}</Row.Item>
                    </Row.CagetoryItem>

                    <Row.CagetoryItem>
                      <Row.Item>{item['baby_Birth_Weight_Result']}</Row.Item>
                      <Row.Item>{item['baby_HBeAg']}</Row.Item>
                      <Row.Item>{item['baby_HBsAb']}</Row.Item>
                      <Row.Item>{item['baby_HBeAg']}</Row.Item>
                      <Row.Item>{item['baby_HBeAb']}</Row.Item>
                      <Row.Item>{item['baby_HBcAb']}</Row.Item>
                      <Row.Item>{item['baby_HBsAb_Prefix']}</Row.Item>
                    </Row.CagetoryItem>
                  </Row>
                )
              })
            }
          </div>
        </FlexList>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state['smartAnalytic']
  }
}

export default connect(mapStateToProps, {fetchList, addAnalyticItem})(SmartAnalyticSystem)
