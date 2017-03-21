/**
 * 修改密码
 * Created by jiangyukun on 2017/3/21.
 */
import React from 'react'
import Modal from 'react-bootstrap/lib/Modal'

class ChangePassword extends React.Component {
  state = {
    show: true,
    currentPassword: '',
    newPassword: ''
  }

  close = () => {
    this.setState({show: false})
  }

  update = () => {
    this.props.changePassword(this.state.currentPassword, this.state.newPassword)
  }

  componentDidUpdate() {
    if (this.props.passwordUpdateSuccess) {
      this.close()
    }
  }

  render() {
    return (
      <Modal show={this.state.show}
             backdrop="static"
             className=""
             onHide={this.close}
             onExited={this.props.onExited}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>修改密码</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label>
              <span className="label-for-input">原密码：</span>
              <div className="input-wrap">
                <input className="form-control" onChange={e => this.setState({currentPassword: e.target.value})}/>
              </div>
            </label>
          </div>
          <div className="mt-15">
            <label>
              <span className="label-for-input">新密码：</span>
              <div className="input-wrap">
                <input className="form-control" onChange={e => this.setState({newPassword: e.target.value})}/>
              </div>
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-info" disabled={this.state.currentPassword.trim() == '' || this.state.newPassword.trim() == ''}
                  onClick={this.update}>
            确认修改
          </button>
        </Modal.Footer>
      </Modal>
    )
  }
}

ChangePassword.propTypes = {
  changePassword: React.PropTypes.func,
  passwordUpdateSuccess: React.PropTypes.bool,
  onExited: React.PropTypes.func
}

export default ChangePassword
