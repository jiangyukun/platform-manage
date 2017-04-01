/**
 * Created by jiangyukun on 2017/3/13.
 */
import React, {Component, PropTypes} from 'react'
import Modal from 'react-bootstrap/lib/Modal'

import Select1 from '../../../components/core/Select1'

class EditPagePermission extends Component {
  constructor(props) {
    super(props)
    const {permissionInfo} = props
    this.permissionId = permissionInfo['permission_Id']
    this.state = {
      pageId: permissionInfo['permission_Page'],
      basicAuthority: permissionInfo['permission'],
      export: permissionInfo['export'] ? '1' : '0',
      show: true,
    }
  }

  close = () => {
    this.setState({show: false})
  }

  update = () => {
    this.props.updatePagePermission(this.permissionId, this.state.pageId, this.state.basicAuthority, this.state.export)
  }

  deletePermission = () => {
    this.props.deletePagePermission(this.permissionId)
  }

  componentDidMount() {
    this.props.fetchPagePermissionList()
  }

  componentDidUpdate() {
    if (this.props.updatePagePermissionSuccess || this.props.deletePagePermissionSuccess) {
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
          <Modal.Title>修改</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <section className="mt-15">
            <label>
              <span className="label-for-input">分组名称：</span>
              <div className="input-wrap">
                {this.props.roleName}
              </div>
            </label>
          </section>

          <section className="mt-15">
            <label>
              <span className="label-for-input">页面：<span className="red">*</span></span>
              <div className="input-wrap">
                <Select1 value={this.state.pageId}
                         disabled={true}
                         selectItems={this.props.pageList}/>
              </div>
            </label>
          </section>

          <section className="mt-15">
            <label>
              <span className="label-for-input">基本权限：<span className="red">*</span></span>
              <div className="input-wrap">
                <Select1
                  value={this.state.basicAuthority}
                  selectItems={[{value: '1', text: '编辑'}, {value: '2', text: '查看'}]}
                  onSelect={({value}) => this.setState({basicAuthority: value})}/>
              </div>
            </label>
          </section>

          <section className="mt-15">
            <label>
              <span className="label-for-input">是否导出：<span className="red">*</span></span>
              <div className="input-wrap">
                <Select1
                  value={this.state.export}
                  selectItems={[{value: '1', text: '是'}, {value: '0', text: '否'}]}
                  onSelect={({value}) => this.setState({export: value})}/>
              </div>
            </label>
          </section>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-info" disabled={this.state.pageId == ''} onClick={this.deletePermission}>删除</button>
          <button className="btn btn-info" disabled={this.state.pageId == ''} onClick={this.update}>更新</button>
        </Modal.Footer>
      </Modal>
    )
  }
}

EditPagePermission.propTypes = {
  roleName: PropTypes.string,
  permissionInfo: PropTypes.object,
  fetchPagePermissionList: PropTypes.func,
  pageList: PropTypes.array,
  updatePagePermission: PropTypes.func,
  deletePagePermission: PropTypes.func,
  updatePagePermissionSuccess: PropTypes.bool,
  deletePagePermissionSuccess: PropTypes.bool,
  onExited: PropTypes.func
}

export default EditPagePermission
