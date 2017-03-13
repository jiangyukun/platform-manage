/**
 * Created by jiangyukun on 2017/3/13.
 */
import React from 'react'
import {connect} from 'react-redux'
import {merge} from 'lodash'

import {QueryFilter, PaginateList} from '../../components/core/'
import {Layout, Head, HeadItem, Row, RowItem} from '../../components/table-layout'
import PageAuthority from './PageAuthority'
import EditRemark from '../common/EditRemark'
import AddRole from './dialog/AddRole'
import EditRole from './dialog/EditRole'
import AddPagePermission from './page-permission/AddPagePermission'
import EditPagePermission from './page-permission/EditPagePermission'

import * as antdUtil from '../../core/utils/antdUtil'
import {
  fetchList, addRole, clearAddRoleSuccess, cancelPermission,
  deleteRole, updateRole, clearUpdateRoleSuccess,
  clearDeleteRoleSuccess, fetchPagePermissionList, addPagePermission,
  clearAddPagePermissionSuccess, updatePagePermission, clearUpdatePagePermissionSuccess,
  deletePagePermission, clearDeletePagePermissionSuccess,
  updateRemark, clearUpdateRemarkSuccess
} from './authority-role-manage'

class AuthorityRoleManage extends React.Component {
  state = {
    index: -1,
    add: false,
    edit: false,
    addPage: false,
    editPage: false,
    showEditRemark: false
  }

  beginFetch(newPageIndex) {
    this._paginateList.beginFetch(newPageIndex)
  }

  doFetch() {
    this.setState({currentIndex: -1})
    this.props.fetchList(merge({}, this._queryFilter.getParams(), this._paginateList.getParams()))
  }

  updateRemark = (newRemark) => {
    this.props.updateRemark(this.props.list[this.state.index]['group_Id'], newRemark)
  }

  componentDidMount() {
    this.beginFetch()
    this.props.fetchPagePermissionList()
  }

  componentDidUpdate() {
    if (this.props.addRoleSuccess) {
      this.props.clearAddRoleSuccess()
      antdUtil.tipSuccess('新增分组成功！')
      this.beginFetch(1)
    }
    if (this.props.deleteRoleSuccess) {
      this.props.clearDeleteRoleSuccess()
      antdUtil.tipSuccess('删除分组成功！')
      this.beginFetch(1)
    }
    if (this.props.updateRoleSuccess) {
      this.props.clearUpdateRoleSuccess()
      antdUtil.tipSuccess('更新分组名称成功！')
      this.beginFetch()
    }
    if (this.props.addPagePermissionSuccess) {
      this.props.clearAddPagePermissionSuccess()
      antdUtil.tipSuccess('添加成功！')
      this.beginFetch()
    }
    if (this.props.updatePagePermissionSuccess) {
      this.props.clearUpdatePagePermissionSuccess()
      antdUtil.tipSuccess('更新成功！')
      this.beginFetch()
    }
    if (this.props.deletePagePermissionSuccess) {
      this.props.clearDeletePagePermissionSuccess()
      antdUtil.tipSuccess('删除成功！')
      this.beginFetch()
    }
    if (this.props.updateRemarkSuccess) {
      this.props.clearUpdateRemarkSuccess()
      antdUtil.tipSuccess('修改备注成功！')
      this.beginFetch()
    }
  }

  render() {
    const getPagePermissionInfo = () => {
      let permissionId = this.state.permissionId
      const role = this.props.list[this.state.index]
      return role.pageList.find(pagePermission => pagePermission['permission_Id'] == permissionId)
    }

    return (
      <div className="app-function-page authority-role-manage">
        {
          this.state.add && (
            <AddRole
              addRole={this.props.addRole}
              addRoleSuccess={this.props.addRoleSuccess}
              onExited={() => this.setState({add: false})}/>
          )
        }

        {
          this.state.edit && this.state.index != -1 && (
            <EditRole
              roleInfo={this.props.list[this.state.index]}
              updateRole={this.props.updateRole}
              deleteRole={this.props.deleteRole}
              updateRoleSuccess={this.props.updateRoleSuccess}
              deleteRoleSuccess={this.props.deleteRoleSuccess}
              onExited={() => this.setState({edit: false})}/>
          )
        }

        {
          this.state.showEditRemark && this.state.index != -1 && (
            <EditRemark
              updateRemark={this.updateRemark}
              remarkUpdated={this.props.updateRemarkSuccess}
              onExited={() => this.setState({showEditRemark: false})}/>
          )
        }

        {
          this.state.addPage && this.state.index != -1 && (
            <AddPagePermission
              id={this.props.list[this.state.index]['group_Id']}
              name={this.props.list[this.state.index]['group_Name']}
              pageList={this.props.pageList}
              addPagePermission={this.props.addPagePermission}
              addPagePermissionSuccess={this.props.addPagePermissionSuccess}
              onExited={() => this.setState({addPage: false})}/>
          )
        }

        {
          this.state.editPage && this.state.index && this.state.permissionId && (
            <EditPagePermission
              roleName={this.props.list[this.state.index]['group_Name']}
              permissionInfo={getPagePermissionInfo()}
              pageList={this.props.pageList}
              updatePagePermission={this.props.updatePagePermission}
              deletePagePermission={this.props.deletePagePermission}
              updatePagePermissionSuccess={this.props.updatePagePermissionSuccess}
              deletePagePermissionSuccess={this.props.deletePagePermissionSuccess}
              onExited={() => this.setState({editPage: false, permissionId: ''})}/>
          )
        }

        <QueryFilter ref={c => this._queryFilter = c} className="ex-big-label"
                     beginFilter={() => this.beginFetch(1)}
                     searchKeyName="backend_User_Name"
                     placeholder="输入分组名称"
        >

          <button className="btn btn-primary mr-20" onClick={() => this.setState({add: true})}>新增分组</button>
          <button className="btn btn-info mr-20" onClick={() => this.setState({edit: true})} disabled={this.state.index == -1}>修改</button>
        </QueryFilter>

        <PaginateList ref={c => this._paginateList = c}
                      doFetch={() => this.doFetch()}
                      total={this.props.total}
                      startName="startRows"
                      lengthName="rows"
                      byName="order_By"
        >
          <Layout loading={this.props.loading}
                  minWidth={1200}
                  fixHead={true}
                  fixLeft={[0, 2]}
                  weight={['100px', '200px', 1]}
          >
            <Head>
              <HeadItem>分组名称</HeadItem>
              <HeadItem>备注</HeadItem>
              <HeadItem>权限</HeadItem>
            </Head>
            <div>
              {
                this.props.list.map((role, index) => {
                  return (
                    <Row key={role['group_Id']}
                         onClick={e => this.setState({index})}
                         selected={this.state.index == index}
                         onDoubleClick={() => this.setState({index, edit: true})}
                         style={{minHeight: '60px'}}
                    >
                      <RowItem>{role['group_Name']}</RowItem>
                      <RowItem>
                        {role['group_Remark']}
                        <i className="edit-remark-svg"
                           onClick={e => this.setState({showEditRemark: true, index})}/>
                      </RowItem>
                      <RowItem>
                        {
                          role['pageList'].map(page => {
                            const permissionId = page['permission_Id']
                            return (
                              <PageAuthority key={permissionId}
                                             permission={page['permission']}
                                             pageCode={page['page_Name']}
                                             pageName={page['page_Name_Remark']}
                                             export={page['export']}
                                             editPagePermission={() => this.setState({editPage: true, index, permissionId})}
                              />
                            )
                          })
                        }
                        <div className="plus-container" onClick={() => this.setState({index, addPage: true})}>
                          <i className="plus-svg-icon"></i>
                        </div>
                      </RowItem>
                    </Row>
                  )
                })
              }
            </div>
          </Layout>
        </PaginateList>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state['authorityRoleManage']
  }
}

export default connect(mapStateToProps, {
  fetchList, addRole,
  deleteRole, updateRole, cancelPermission,
  clearAddRoleSuccess, clearUpdateRoleSuccess,
  clearDeleteRoleSuccess, fetchPagePermissionList,
  addPagePermission, clearAddPagePermissionSuccess,
  updatePagePermission, clearUpdatePagePermissionSuccess,
  deletePagePermission, clearDeletePagePermissionSuccess,
  updateRemark, clearUpdateRemarkSuccess
})(AuthorityRoleManage)
