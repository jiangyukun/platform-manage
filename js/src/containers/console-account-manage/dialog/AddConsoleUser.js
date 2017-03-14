/**
 * Created by jiangyukun on 2017/3/13.
 */
import React from 'react'
import Modal from 'react-bootstrap/lib/Modal'
import Checkbox  from 'antd/lib/Checkbox'

class AddConsoleUser extends React.Component {
  state = {
    username: '',
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

  add = () => {
    const allowedRoles = []
    for (let role in this.state.allowRoleInfo) {
      if (this.state.allowRoleInfo[role]) {
        allowedRoles.push(role)
      }
    }
    this.props.addConsoleUser(this.state.username, this.state.name, allowedRoles)
  }

  componentWillReceiveProps(props) {
    if (props.addConsoleUserSuccess) {
      this.close()
    }
  }

  render() {
    return (
      <Modal show={this.state.show}
             backdrop="static"
             className="console-account-manage-add"
             onHide={this.close}
             onExited={this.props.onExited}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>新增</Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <article>
            <section className="mt-10">
              <label>
                <span className="label-for-input">账号：</span>
                <div className="input-wrap">
                  <input className="form-control" value={this.state.username} onChange={e => this.setState({username: e.target.value})}/>
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
          <button className="btn btn-info" disabled={this.state.username == ''} onClick={this.add}>新增</button>
        </Modal.Footer>
      </Modal>
    )
  }
}

AddConsoleUser.propTypes = {
  roleList: React.PropTypes.array,
  addConsoleUser: React.PropTypes.func,
  addConsoleUserSuccess: React.PropTypes.bool,
  onExited: React.PropTypes.func
}

export default AddConsoleUser
