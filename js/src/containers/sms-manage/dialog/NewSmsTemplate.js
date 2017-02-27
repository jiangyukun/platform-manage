/**
 * Created by jiangyukun on 2017/1/16.
 */
import React, {Component, PropTypes} from 'react'

import CommonDialog from '../../../components/core/CommonDialog'

import * as antdUtil from '../../../core/utils/antdUtil'

class NewSmsTemplate extends Component {
  constructor() {
    super()
    this.state = {
      show: true,
      smsContent: ''
    }
  }

  handleChange(event) {
    this.setState({smsContent: event.target.value})
  }

  close() {
    this.setState({show: false})
  }

  confirm() {
    antdUtil.confirm('确定新增模板吗？', () => this.props.addSmsTemplate(this.state.smsContent))
  }

  componentDidUpdate() {
    if (this.props.templateAddSuccessFlag) {
      this.close()
    }
  }

  render() {
    return (
      <CommonDialog show={this.state.show} onHide={this.close} onExited={this.props.onExited} width="30%"
                    className="ngdialog ngdialog-theme-default">
        <h4>新增模板</h4>

        <p style={{marginTop: '15px', marginBottom: '15px'}}>
                    <textarea className="form-control" rows="4" value={this.state.smsContent}
                              onChange={e => this.handleChange(e)}></textarea>
        </p>
        <div className="ngdialog-buttons">
          <button type="button" className="ngdialog-button ngdialog-button-secondary"
                  onClick={e => this.close()}>
            取消
          </button>
          <button type="button" className="ngdialog-button ngdialog-button-primary"
                  onClick={e => this.confirm()}
                  disabled={!this.state.smsContent}>确定
          </button>
        </div>
      </CommonDialog>
    )
  }
}

NewSmsTemplate.propTypes = {
  addSmsTemplate: PropTypes.func,
  templateAddSuccessFlag: PropTypes.bool,
  onExited: PropTypes.func
}

export default NewSmsTemplate
