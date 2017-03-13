/**
 * Created by jiangyukun on 2017/3/13.
 */
import React from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import Checkbox  from 'antd/lib/Checkbox'

class EditConsoleUser extends React.Component {
  state = {
    name: '',
    allowRoleInfo: {},
    show: true
  }

  close = () => {
    this.setState({show: false})
  }

  onChange = (roleCode, e) => {
    this.state.allowRoleInfo[roleCode] = e.target.checked
    this.forceUpdate()
  }

  deleteAccount = () => {
    this.props.deleteAccount(this.id)
  }

  resetPassword = () => {
    this.props.resetPassword(this.id)
  }

  updateAccount = () => {
    const allowedRoles = []
    for (let role in this.state.allowRoleInfo) {
      if (role) {
        allowedRoles.push(role)
      }
    }
    this.props.updateConsoleUser(this.id, this.state.name, allowedRoles)
  }

  componentWillMount() {
    const {accountInfo} = this.props
    this.id = accountInfo['backend_UserId']
    this.name = accountInfo['backend_User_Name']
    const roleList = accountInfo['group_Id'].split(',')
    const allowRoleInfo = {}
    roleList.forEach(role => {
      allowRoleInfo[role] = true
    })
    this.setState({
      name: this.props.accountInfo['backend_User_Real_Name'] || '',
      allowRoleInfo
    })
  }

  componentWillReceiveProps(props) {
    if (props.updateConsoleUserSuccess || props.deleteConsoleUserSuccess || props.resetPasswordSuccess) {
      this.close()
    }
  }

  render() {
    const {accountInfo} = this.props || {}
    return (
      <Modal show={this.state.show}
             backdrop="static"
             className="console-account-manage-edit"
             onHide={this.close}
             onExited={this.props.onExited}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>修改</Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <article>
            <section className="mt-10">
              <label>
                <span className="label-for-input">账号：</span>
                <div className="input-wrap">
                  <input className="form-control" value={accountInfo['backend_User_Name']} disabled={true}/>
                </div>
              </label>
            </section>

            <section className="mt-10">
              <label>
                <span className="label-for-input">姓名：</span>
                <div className="input-wrap">
                  <input className="form-control" value={this.state.name} onChange={e => this.setState({name: e.target.value})}/>
                </div>
              </label>
            </section>

            <section className="role-select-area">
              <span className="label-for-input">权限分组</span>
              <div className="role-check-box">
                {
                  this.props.roleList.map(role => {
                    return (
                      <Checkbox key={role.value}
                                checked={this.state.allowRoleInfo[role.value] || false}
                                onChange={e => this.onChange(role.value, e)}>{role.text}</Checkbox>
                    )
                  })
                }
              </div>
            </section>
          </article>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-info" onClick={this.deleteAccount} disabled={this.name == 'admin'}>删除</button>
          <button className="btn btn-info" onClick={this.resetPassword}>重置密码</button>
          <button className="btn btn-info" disabled={this.state.username == ''} onClick={this.updateAccount}>确定修改</button>
        </Modal.Footer>
      </Modal>
    )
  }
}

EditConsoleUser.propTypes = {
  accountInfo: React.PropTypes.object,
  roleList: React.PropTypes.array,
  updateConsoleUser: React.PropTypes.func,
  deleteAccount: React.PropTypes.func,
  resetPassword: React.PropTypes.func,
  updateConsoleUserSuccess: React.PropTypes.bool,
  deleteConsoleUserSuccess: React.PropTypes.bool,
  resetPasswordSuccess: React.PropTypes.bool,
  onExited: React.PropTypes.func
}

export default EditConsoleUser
