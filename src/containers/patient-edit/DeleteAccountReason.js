/**
 * Created by jiangyukun on 2016/12/22.
 */
import React, {Component, PropTypes} from 'react'
import CommonDialog from '../../components/core/CommonDialog'

class DeleteAccountReason extends Component {
  state = {
    show: true,
    value: ''
  }

  handleChange = (event) => {
    this.setState({value: event.target.value})
  }

  close = () => {
    this.setState({show: false})
  }

  confirm = () => {
    this.props.onConfirm(this.state.value)
  }

  render() {
    return (
      <CommonDialog show={this.state.show} onHide={this.close} onExited={this.props.onExited} width="30%" className="ngdialog ngdialog-theme-default">
        <h4>删除账号原因</h4>

        <p style={{marginTop: '15px', marginBottom: '15px'}}>
          <textarea className="form-control" rows="4" value={this.state.value} onChange={this.handleChange}></textarea>
        </p>
        <div className="ngdialog-buttons">
          <button type="button" className="ngdialog-button ngdialog-button-secondary" onClick={this.close}>取消</button>
          <button type="button" className="ngdialog-button ngdialog-button-primary"
                  onClick={this.confirm}
                  disabled={this.state.value == ''}>确定
          </button>
        </div>
      </CommonDialog>
    )
  }
}

DeleteAccountReason.defaultProps = {
  value: ''
}

DeleteAccountReason.propTypes = {
  value: PropTypes.string,
  onExited: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
}

export default DeleteAccountReason
