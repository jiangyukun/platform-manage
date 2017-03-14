/**
 * Created by jiangyukun on 2017/3/13.
 */
import React, {Component, PropTypes} from 'react'
import Modal from 'react-bootstrap/lib/Modal'

import Select1 from '../../../components/core/Select1'

class AddPagePermission extends Component {
  state = {
    pageId: '',
    basicAuthority: '',
    export: '',
    show: true,
  }

  close = () => {
    this.setState({show: false})
  }

  add = () => {
    this.props.addPagePermission(this.props.roleId, this.state.pageId, this.state.basicAuthority, this.state.export)
  }

  componentDidMount() {
    this.props.fetchPagePermissionList(this.props.roleId)
  }

  componentDidUpdate() {
    if (this.props.addPagePermissionSuccess) {
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
          <Modal.Title>新增</Modal.Title>
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
              <span className="label-for-input">页面：</span>
              <div className="input-wrap">
                <Select1 value={this.state.pageId}
                         selectItems={this.props.pageList}
                         onSelect={({value}) => this.setState({pageId: value})}/>
              </div>
            </label>
          </section>

          <section className="mt-15">
            <label>
              <span className="label-for-input">基本权限：</span>
              <div className="input-wrap">
                <Select1
                  value={this.state.basicAuthority}
                  selectItems={[{value: '1', text: '修改'}, {value: '2', text: '查看'}]}
                  onSelect={({value}) => this.setState({basicAuthority: value})}/>
              </div>
            </label>
          </section>

          <section className="mt-15">
            <label>
              <span className="label-for-input">是否导出：</span>
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
          <button className="btn btn-info" disabled={this.state.pageId == ''} onClick={this.add}>保存</button>
        </Modal.Footer>
      </Modal>
    )
  }
}

AddPagePermission.propTypes = {
  roleId: PropTypes.string,
  roleName: PropTypes.string,
  fetchPagePermissionList: PropTypes.func,
  pageList: PropTypes.array,
  addPagePermission: PropTypes.func,
  addPagePermissionSuccess: PropTypes.bool,
  onExited: PropTypes.func
}

export default AddPagePermission
