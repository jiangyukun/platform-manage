/**
 * Created by jiangyukun on 2017/3/13.
 */
import React from 'react'
import Modal from 'react-bootstrap/lib/Modal'

class AddRole extends React.Component {
  state = {
    roleName: '',
    show: true
  }

  close = () => {
    this.setState({show: false})
  }

  add = () => {
    this.props.addRole(this.state.roleName.trim())
  }

  componentWillReceiveProps(props) {
    if (props.addRoleSuccess) {
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
        <Modal.Body>
          <article>
            <label>
              <span className="label-for-input">分组名称：</span>
              <div className="input-wrap">
                <input className="form-control" onChange={e => this.setState({roleName: e.target.value})}/>
              </div>
            </label>
          </article>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-info" disabled={this.state.roleName.trim() == ''} onClick={this.add}>新增</button>
        </Modal.Footer>
      </Modal>
    )
  }
}

AddRole.propTypes = {
  addRole: React.PropTypes.func,
  addRoleSuccess: React.PropTypes.bool,
  onExited: React.PropTypes.func
}

export default AddRole
