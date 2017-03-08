/**
 * Created by jiangyukun on 2017/3/2.
 */
import React, {Component, PropTypes} from 'react'
import {merge} from 'lodash'
import Modal from 'react-bootstrap/lib/Modal'
import Tabs from 'react-bootstrap/lib/Tabs'
import Tab from 'react-bootstrap/lib/Tab'
import Radio from 'antd/lib/Radio'

import AddMother from './add/AddMother'
import AddBaby from './add/AddBaby'

class AddAnalyticDialog extends Component {
  state = {
    show: true,

    suggest: '',
    remark: '',
    visitType: ''
  }

  close = () => {
    this.setState({show: false})
  }

  add = () => {
    this.props.addAnalyticItem(merge(
      {
        "visit_Type": this.state.visitType,
        "suggest": this.state.suggest,
        "remark": this.state.remark,
      },
      this._mother.getValue(),
      this._baby.getValue()
    ))
  }

  componentDidUpdate() {
    if (this.props.addSuccess) {
      this.close()
    }
  }

  render() {
    return (
      <Modal show={this.state.show}
             bsStyle="lg"
             backdrop="static"
             onHide={this.close}
             onExited={this.props.onExited}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>新增</Modal.Title>
        </Modal.Header>
        <Modal.Body className="add-analytic-item">
          <div className="form-container">
            <section className="main-form">
              <div className="visit-point">
                <label className="visit-point-label">访视点：</label>
                <Radio.Group className="visit-point-items" value={this.state.visitType}
                             onChange={e => this.setState({visitType: e.target.value})}>
                  <Radio value="1" className="visit-point-item">访视1-孕12~24周</Radio>
                  <Radio value="2" className="visit-point-item">访视2-孕24~32周</Radio>
                  <Radio value="3" className="visit-point-item">访视3-分娩</Radio>
                  <Radio value="4" className="visit-point-item">访视4-产后4~8周</Radio>
                  <Radio value="5" className="visit-point-item">访视5-产后7~12月</Radio>
                </Radio.Group>
              </div>

              <section className="mother-situation-container">
                <Tabs id="tabs" style={{marginTop: '10px'}}>
                  <Tab title="母亲" eventKey={1}>
                    <AddMother ref={c => this._mother = c}/>
                  </Tab>
                  <Tab title="宝宝" eventKey={2}>
                    <AddBaby ref={c => this._baby = c}/>
                  </Tab>
                </Tabs>
              </section>
            </section>
            <div className="other-form">
              <label>
                诊疗建议：
                <textarea className="form-control suggest" rows="8" placeholder="在此输入诊疗建议，不超过200字..."
                          value={this.state.suggest} onChange={e => this.setState({suggest: e.target.value})}
                ></textarea>
              </label>
              <label>
                备注：
                <textarea className="form-control remark" rows="6" placeholder="输入对此条的备注"
                          value={this.state.remark} onChange={e => this.setState({remark: e.target.value})}
                ></textarea>
              </label>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <input type="button"
                 className="btn btn-info btn-block"
                 value="保存"
                 disabled={!this.state.visitType || !this.state.suggest}
                 onClick={this.add}/>
        </Modal.Footer>
      </Modal>
    )
  }
}

AddAnalyticDialog.propTypes = {
  addAnalyticItem: PropTypes.func,
  addSuccess: PropTypes.bool,
  onExited: PropTypes.func,
}

export default AddAnalyticDialog
