/**
 * Created by jiangyukun on 2017/1/11.
 */
import React, {Component, PropTypes} from "react"
import Modal from 'react-bootstrap/lib/Modal'

import Input from "../../../components/ui/Input"
import * as antdUtil from "../../../core/utils/antdUtil"

class SendMessageDialog extends Component {
  state = {
    show: true,
    valid: false,
    mobileValid: false,

    mobile: '',
    templateId: '',
    smsTemplate: '',
  }

  handleMobileChange(event) {
    const mobile = event.target.value
    if (this._mobile.isValid(mobile)) {
      this.setState({mobileValid: true})
      this.props.fetchUserTypeAndName(mobile)
    }
    this.setState({mobile}, this.checkValid)
  }

  handleTemplateIdChange(event) {
    const templateId = event.target.value
    const smsTemplate = this.props.smsTemplateList.find(template => template.value == templateId)
    this.setState({templateId}, this.checkValid)
    if (smsTemplate) {
      this.setState({smsTemplate: smsTemplate.text})
    } else {
      this.setState({smsTemplate: ''})
    }
  }

  checkValid = () => {
    if (this._mobile.isValid(this.state.mobile) && this.state.smsTemplate != '') {
      this.setState({valid: true})
      return
    }
    this.setState({valid: false})
  }

  sendSMS() {
    antdUtil.confirm('确定发送短信吗？', () => this.props.sendSmsMessage(this.state.mobile, this.state.smsTemplate))
  }

  close() {
    this.setState({show: false})
  }

  componentDidMount() {
    if (this.props.smsTemplateList.length == 0) {
      this.props.fetchSmsTemplateList()
    }
  }

  componentDidUpdate() {
    if (this.props.sendSmsSuccessFlag) {
      this.close()
    }
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={() => this.close()} onExited={this.props.onExited} backdrop="static">
        <Modal.Header closeButton={true}>
          <Modal.Title>发送短信</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              <div className="col-xs-4">
                <label className="mt-5">接收人账号：<span className="red">*</span></label>
              </div>
              <div className="col-xs-6">
                <Input type="text" className="form-control" placeholder="请输入接收人账号"
                       ref={c => this._mobile = c} format="^1[34578]\d{9}$" errorTip="请输入正确的手机号码！"
                       value={this.state.mobile} onChange={e => this.handleMobileChange(e)}/>
              </div>
            </div>

            <div className="row mt-10">
              <div className="col-xs-4">
                <label className="mt-5">接收人姓名：</label>
              </div>
              <div className="col-xs-6">
                <input type="text" className="form-control" placeholder="输入账号后自动获取"
                       value={this.state.mobileValid ? this.props.username : ''} disabled={true}/>
              </div>
            </div>

            <div className="row mt-10">
              <div className="col-xs-4">
                <label className="mt-5">接收人身份：</label>
              </div>
              <div className="col-xs-6">
                <input type="text" className="form-control" placeholder="输入账号后自动获取"
                       value={this.state.mobileValid ? this.props.userType : ''} disabled={true}/>
              </div>
            </div>

            <div className="row mt-10">
              <div className="col-xs-4">
                <label className="mt-5">短信模板ID：<span className="red">*</span></label>
              </div>
              <div className="col-xs-8">
                <Input className="form-control" placeholder="请输入短信模板ID" onChange={e => this.handleTemplateIdChange(e)}/>
              </div>
            </div>

            <div className="row mt-10">
              <div className="col-xs-4">
                <label className="mt-5">短信内容：</label>
              </div>
              <div className="col-xs-8">
                <textarea value={this.state.smsTemplate} disabled={true} rows="5" className="form-control break-all"></textarea>
              </div>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <div className="row">
            <div className="col-xs-6">
              <button className="btn btn-block btn-success" onClick={e => this.sendSMS()}
                      disabled={!this.state.valid}>
                发送短信
              </button>
            </div>
            <div className="col-xs-6">
              <button className="btn btn-block" onClick={e => this.close()}>取消</button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    )
  }
}

SendMessageDialog.propTypes = {
  fetchUserTypeAndName: PropTypes.func,
  username: PropTypes.string,
  userType: PropTypes.string,
  smsTemplateList: PropTypes.array,
  fetchSmsTemplateList: PropTypes.func,
  sendSmsMessage: PropTypes.func,
  sendSmsSuccessFlag: PropTypes.bool,
  onExited: PropTypes.func
}

export default SendMessageDialog
