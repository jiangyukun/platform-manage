/**
 * Created by jiangyukun on 2017/3/13.
 */
import React from 'react'
import Modal from 'react-bootstrap/lib/Modal'

class EditRole extends React.Component {
  constructor(props) {
    super()
    this.id = props.roleInfo['group_Id']
    this.state = {
      roleName: props.roleInfo['group_Name'],
      show: true
    }
  }

  close = () => {
    this.setState({show: false})
  }

  deleteRole = () => {
    this.props.deleteRole(this.id)
  }

  update = () => {
    this.props.updateRole(this.id, this.state.roleName)
  }

  componentWillReceiveProps(props) {
    if (props.updateRoleSuccess || props.deleteRoleSuccess) {
      this.close()
    }
  }

  render() {
    const {roleInfo} = this.props
    return (
      <Modal show={this.state.show}
             backdrop="static"
             className="authority-role-manage-edit"
             onHide={this.close}
             onExited={this.props.onExited}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>修改</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>
            <span className="label-for-input">分组名称：</span>
            <div className="input-wrap">
              <input className="form-control" value={this.state.roleName} onChange={e => this.setState({roleName: e.target.value})}/>
            </div>
          </label>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-default" disabled={!this.props.isCanEdit} onClick={this.deleteRole}>删除</button>
          <button className="btn btn-info" disabled={!this.props.isCanEdit || this.state.roleName.trim() == ''} onClick={this.update}>
            修改
          </button>
        </Modal.Footer>
      </Modal>
    )
  }
}

EditRole.propTypes = {
  roleInfo: React.PropTypes.object,
  updateRole: React.PropTypes.func,
  deleteRole: React.PropTypes.func,
  updateRoleSuccess: React.PropTypes.bool,
  deleteRoleSuccess: React.PropTypes.bool,
  isCanEdit: React.PropTypes.bool,
  onExited: React.PropTypes.func
}

export default EditRole
