/**
 * Created by jiangyukun on 2017/3/2.
 */
import React, {Component, PropTypes} from 'react'
import {merge} from 'lodash'

import Modal from 'react-bootstrap/lib/Modal'
import Tabs from 'react-bootstrap/lib/Tabs'
import Tab from 'react-bootstrap/lib/Tab'
import Radio from 'antd/lib/Radio'

import EditMother from './edit/EditMother'
import EditBaby from './edit/EditBaby'

class EditAnalyticDialog extends Component {
  constructor(props) {
    super()
    const {analyticItem} = props
    this.id = analyticItem['info_Id']
    let suggest = analyticItem['suggest'] || ''
    let remark = analyticItem['remark'] || ''
    this.state = {
      visitType: analyticItem['visit_Type'],
      suggest: suggest,
      remark: remark,

      show: true
    }
  }

  close = () => {
    this.setState({show: false})
  }

  update = () => {
    this.props.updateAnalyticItem(merge(
      {
        "info_Id": this.id,
        "visit_Type": this.state.visitType,
        "suggest": this.state.suggest,
        "remark": this.state.remark,
      },
      this._mother.getValue(),
      this._baby.getValue()
    ))
  }

  deleteAnalyticItem = () => {
    this.props.deleteAnalyticItem(this.id)
  }

  componentDidUpdate() {
    if (this.props.updateSuccess || this.props.deleteSuccess) {
      this.close()
    }
  }

  render() {
    return (
      <Modal show={this.state.show}
             bsStyle="lg"
             backdrop="static"
             onHide={() => this.setState({show: false})}
             onExited={this.props.onExited}>
        <Modal.Header closeButton={true}>
          <Modal.Title>查看/编辑</Modal.Title>
        </Modal.Header>
        <Modal.Body className="edit-analytic-item">
          <div className="form-container">
            <section className="main-form">
              <div className="visit-point">
                <label className="visit-point-label">访视点：</label>
                <Radio.Group className="visit-point-items" value={this.state.visitType}>
                  <Radio value="1" className="visit-point-item">访视1-孕12~24周</Radio>
                  <Radio value="2" className="visit-point-item">访视2-孕24~32周</Radio>
                  <Radio value="3" className="visit-point-item">访视3-分娩</Radio>
                  <Radio value="4" className="visit-point-item">访视4-产后4~8周</Radio>
                  <Radio value="5" className="visit-point-item">访视5-产后7~12月</Radio>
                </Radio.Group>
              </div>

              <section className="mother-baby-tabs">
                <Tabs id="tabs" style={{marginTop: '10px'}}>
                  <Tab title="母亲" eventKey={1}>
                    <EditMother ref={c => this._mother = c} analyticItem={this.props.analyticItem}/>
                  </Tab>
                  <Tab title="宝宝" eventKey={2}>
                    <EditBaby ref={c => this._baby = c} analyticItem={this.props.analyticItem}/>
                  </Tab>
                </Tabs>
              </section>
            </section>
            <div className="other-form">
              <label className="w100">
                诊疗建议：
                <textarea className="form-control suggest"
                          rows="8"
                          placeholder="在此输入诊疗建议，不超过200字..."
                          value={this.state.suggest}
                          onChange={e => this.setState({suggest: e.target.value.substring(0, 200)})}
                >
                </textarea>
              </label>
              <div className="current-txt-count">
                {this.state.suggest.length}/200
              </div>

              <label className="w100">
                备注：
                <textarea
                  className="form-control remark"
                  rows="6"
                  placeholder="输入对此条的备注"
                  value={this.state.remark}
                  onChange={e => this.setState({remark: e.target.value.substring(0, 200)})}
                >
                </textarea>
              </label>
              <div className="current-txt-count">
                {this.state.remark.length}/200
              </div>

            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <input type="button" className="btn btn-info" value="删除" onClick={this.deleteAnalyticItem}/>
          <input type="button" className="btn btn-info" value="保存" onClick={this.update}/>
        </Modal.Footer>
      </Modal>
    )
  }
}

EditAnalyticDialog.propTypes = {
  analyticItem: PropTypes.object,
  updateAnalyticItem: PropTypes.func,
  deleteAnalyticItem: PropTypes.func,
  updateSuccess: PropTypes.bool,
  deleteSuccess: PropTypes.bool,
  onExited: PropTypes.func,
}

export default EditAnalyticDialog
