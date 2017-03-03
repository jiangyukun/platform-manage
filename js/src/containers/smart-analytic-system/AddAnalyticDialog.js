/**
 * Created by jiangyukun on 2017/3/2.
 */
import React, {Component, PropTypes} from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import Tabs from 'react-bootstrap/lib/Tabs'
import Tab from 'react-bootstrap/lib/Tab'
import Radio from 'antd/lib/Radio'

import Mother from './tabs/Mother'
import Baby from './tabs/Baby'

class AddAnalyticDialog extends Component {
  state = {
    show: true,
    key: 1
  }

  close = () => {
    this.setState({show: false})
  }

  render() {
    return (
      <Modal show={this.state.show}
             bsStyle="lg"
             backdrop="static"
             onHide={() => this.setState({show: false})}
             onExited={this.props.onExited}>
        <Modal.Header closeButton={true}>
          <Modal.Title>新增</Modal.Title>
        </Modal.Header>
        <Modal.Body className="add-analytic-item">
          <div className="form-container">
            <section className="main-form">
              <div className="visit-point">
                <label className="visit-point-label">访视点：</label>
                <Radio.Group className="visit-point-items">
                  <Radio value={1} className="visit-point-item">访视1-孕12~24周</Radio>
                  <Radio value={2} className="visit-point-item">访视2-孕24~32周</Radio>
                  <Radio value={3} className="visit-point-item">访视3-分娩</Radio>
                  <Radio value={4} className="visit-point-item">访视4-产后4~8周</Radio>
                  <Radio value={5} className="visit-point-item">访视5-产后7~12月</Radio>
                </Radio.Group>
              </div>

              <section>
                <Tabs id="tabs" activeKey={this.state.key} onSelect={key => this.setState({key})} className="" style={{marginTop: '10px'}}>
                  <Tab title="母亲" eventKey={1}>
                    <Mother/>
                  </Tab>
                  <Tab title="宝宝" eventKey={2}>
                    <Baby/>
                  </Tab>
                </Tabs>
              </section>
            </section>
            <div className="suggest">
              <label>
                诊疗建议：
                <textarea className="form-control" rows="8" placeholder="在此输入诊疗建议，不超过200字..."></textarea>
              </label>
              <label>
                备注：
                <textarea className="form-control" rows="6" placeholder="输入对此条的备注"></textarea>
              </label>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    )
  }
}

AddAnalyticDialog.propTypes = {
  onExited: PropTypes.func
}

export default AddAnalyticDialog
