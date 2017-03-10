/**
 * Created by jiangyukun on 2017/3/2.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {merge} from 'lodash'

import Button from '../../components/element/Button'
import Form from '../../components/element/Form'
import {FlexList, FixHead, HeadCategory, RowCategory, FlexBodyWrap, FixRow} from '../../components/list/'
import {HeadItem, RowItem} from '../../components/table-layout'
import {PopOverTxt} from '../../components/txt'

import AddAnalyticDialog from './AddAnalyticDialog'
import EditAnalyticDialog from './EditAnalyticDialog'
import EditRemark from '../common/EditRemark'

import {formatDateStr} from '../../core/dateUtils'
import * as antdUtil from '../../core/utils/antdUtil'
import {
  fetchList, addAnalyticItem, updateAnalyticItem,
  clearAddSuccess, clearUpdateSuccess, updateRemark,
  deleteAnalyticItem, clearDeleteSuccess, clearUpdateRemarkSuccess
} from './smart-analytic-system'

class SmartAnalyticSystem extends Component {
  state = {
    index: -1,
    searchKey: '',
    add: false,
    edit: false,
    showEditRemark: false
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
        // this._handleMove(row)
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

  _beginFetch() {
    this.props.fetchList({start: 0, limit: 100, keyWords: this.state.searchKey.trim()})
  }

  updateRemark = (newRemark) => {
    this.props.updateRemark(this.props.list[this.state.index]['info_Id'], newRemark)
  }

  componentDidMount() {
    this._beginFetch()
  }

  componentDidUpdate() {
    if (this.props.addSuccess) {
      this.props.clearAddSuccess()
      this._beginFetch()
      antdUtil.tipSuccess('添加成功！')
    }
    if (this.props.updateSuccess) {
      this.props.clearUpdateSuccess()
      this._beginFetch()
      antdUtil.tipSuccess('更新成功！')
    }
    if (this.props.deleteSuccess) {
      this.props.clearDeleteSuccess()
      this._beginFetch()
      antdUtil.tipSuccess('删除成功！')
    }
    if (this.props.updateRemarkSuccess) {
      this.props.clearUpdateRemarkSuccess()
      antdUtil.tipSuccess('更新备注成功！')
    }
  }

  render() {
    return (
      <div className="app-function-page smart-analytic-system">
        {
          this.state.add && (
            <AddAnalyticDialog
              addAnalyticItem={this.props.addAnalyticItem}
              addSuccess={this.props.addSuccess}
              onExited={() => this.setState({add: false})}/>
          )
        }
        {
          this.state.edit && this.state.index != -1 && (
            <EditAnalyticDialog
              analyticItem={this.props.list[this.state.index]}
              updateAnalyticItem={this.props.updateAnalyticItem}
              deleteAnalyticItem={this.props.deleteAnalyticItem}
              updateSuccess={this.props.updateSuccess}
              deleteSuccess={this.props.deleteSuccess}
              onExited={() => this.setState({edit: false})}/>
          )
        }

        {
          this.state.showEditRemark && this.state.index != -1 && (
            <EditRemark value={this.props.list[this.state.index]['remark']}
                        updateRemark={this.updateRemark}
                        remarkUpdated={this.props.updateRemarkSuccess}
                        onExited={() => this.setState({showEditRemark: false})}/>
          )
        }

        <div className="toolbar">
          <Button type="primary" onClick={() => this.setState({add: true})}>新增</Button>
          <Button type="info" onClick={() => this.setState({edit: true})} disabled={this.state.index == -1}>查看</Button>
          <div className="search-container">
            <Form className="inline-block" onSubmit={() => this._beginFetch()}>
              <input placeholder="输入关键字查询建议、备注" onChange={e => this.setState({searchKey: e.target.value})}/>
            </Form>
            <button onClick={() => this._beginFetch()}>搜索</button>
          </div>
        </div>

        <FlexList loading={this.props.loading}
                  total={this.props.total}
                  minWidth="1500px"
                  weight={[1, 1, 2, 1, 1, 10, 8]}
        >
          <FixHead>
            <HeadItem className="flex">
              <div className="flex-vertical-center">序号</div>
            </HeadItem>
            <HeadItem className="flex">
              <div className="flex-vertical-center">访视点</div>
            </HeadItem>
            <HeadItem className="flex">
              <div className="flex-vertical-center">诊疗建议</div>
            </HeadItem>
            <HeadItem className="flex">
              <div className="flex-vertical-center">备注</div>
            </HeadItem>
            <HeadItem className="flex">
              <div className="flex-vertical-center">创建时间</div>
            </HeadItem>
            <HeadCategory categoryName="母亲情况" weight={[1, 1, 1, 1, 1, 2, 2, 1, 2]}>
              <HeadItem>HBsAg</HeadItem>
              <HeadItem>HBsAb</HeadItem>
              <HeadItem>HBeAg</HeadItem>
              <HeadItem>HBeAb</HeadItem>
              <HeadItem>HBcAb</HeadItem>
              <HeadItem>HBV-DNA (IU/mL)</HeadItem>
              <HeadItem>ALT (U/L)</HeadItem>
              <HeadItem>肝脏B超</HeadItem>
              <HeadItem>用药情况</HeadItem>
            </HeadCategory>
            <HeadCategory categoryName="宝宝情况" weight={[1, 2, 1, 1, 1, 1, 1, 2]}>
              <HeadItem>是否足月</HeadItem>
              <HeadItem>出生体重</HeadItem>
              <HeadItem>HBsAg</HeadItem>
              <HeadItem>HBsAb</HeadItem>
              <HeadItem>HBeAg</HeadItem>
              <HeadItem>HBeAb</HeadItem>
              <HeadItem>HBcAb</HeadItem>
              <HeadItem>HBsAb滴度</HeadItem>
            </HeadCategory>
          </FixHead>
          <FlexBodyWrap style={{position: 'relative'}}>
            {
              this.props.list.map((item, index) => {
                return (
                  <FixRow key={item['info_Id']}
                          onClick={e => this.setState({index})}
                          onDoubleClick={() => this.setState({index, edit: true})}
                          selected={this.state.index == index}
                          style={{minHeight: '60px'}}
                  >
                    <RowItem>{item['serial_Number']}</RowItem>
                    <RowItem>{item['visit_Type_Desc']}</RowItem>
                    <RowItem>
                      <PopOverTxt str={item['suggest']}></PopOverTxt>
                    </RowItem>
                    <RowItem>
                      <PopOverTxt str={item['remark']}></PopOverTxt>
                      <i className="edit-remark-svg" onClick={e => this.setState({showEditRemark: true, index})}/>
                    </RowItem>
                    <RowItem>{formatDateStr(item['create_Time'])}</RowItem>
                    <RowCategory weight={[1, 1, 1, 1, 1, 2, 2, 1, 2]}>
                      <RowItem>{item['mother_HBsAg']}</RowItem>
                      <RowItem>{item['mother_HBsAb']}</RowItem>
                      <RowItem>{item['mother_HBeAg']}</RowItem>
                      <RowItem>{item['mother_HBeAb']}</RowItem>
                      <RowItem>{item['mother_HBcAb']}</RowItem>
                      <RowItem>{item['mother_HBV_DNA_Desc']}</RowItem>
                      <RowItem>{item['mother_ALT_Desc']}</RowItem>
                      <RowItem>{item['mother_Liver_B_Desc']}</RowItem>
                      <RowItem>{item['mother_Use_Drug_Desc']}</RowItem>
                    </RowCategory>

                    <RowCategory weight={[1, 2, 1, 1, 1, 1, 1, 2]}>
                      <RowItem>{item['baby_Premature_Children']}</RowItem>
                      <RowItem>{item['baby_Birth_Weight_Desc']}</RowItem>
                      <RowItem>{item['baby_HBeAg']}</RowItem>
                      <RowItem>{item['baby_HBsAb']}</RowItem>
                      <RowItem>{item['baby_HBeAg']}</RowItem>
                      <RowItem>{item['baby_HBeAb']}</RowItem>
                      <RowItem>{item['baby_HBcAb']}</RowItem>
                      <RowItem>{item['baby_HBsAb_Desc']}</RowItem>
                    </RowCategory>
                  </FixRow>
                )
              })
            }
          </FlexBodyWrap>
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

export default connect(mapStateToProps, {
  fetchList,
  addAnalyticItem,
  updateAnalyticItem,
  clearAddSuccess,
  clearUpdateSuccess,
  deleteAnalyticItem,
  clearDeleteSuccess,
  updateRemark,
  clearUpdateRemarkSuccess
})(SmartAnalyticSystem)
