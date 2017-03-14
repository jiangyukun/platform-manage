/**
 * Created by jiangyukun on 2017/3/9.
 */
import React from 'react'
import {connect} from 'react-redux'
import {merge} from 'lodash'

import {QueryFilter, PaginateList} from '../../components/core/'
import FilterItem from '../../components/core/query-filter/FilterItem'
import {Layout, Head, HeadItem, Row, RowItem} from '../../components/table-layout'
import  AddConsoleUser from './dialog/AddConsoleUser'
import  EditConsoleUser from './dialog/EditConsoleUser'
import EditRemark from '../common/EditRemark'

import * as utils from '../../core/utils'
import * as antdUtil from '../../core/utils/antdUtil'

import {
  fetchList, fetchRoleList,
  addConsoleUser, updateConsoleUser, deleteAccount, resetPassword,
  clearAddConsoleUserSuccess, clearUpdateSuccess,
  clearDeleteConsoleUserSuccess, clearResetPasswordSuccess,
  updateRemark, clearUpdateRemarkSuccess
} from './console-account-manage'

class ConsoleAccountManage extends React.Component {
  state = {
    index: -1,
    add: false,
    edit: false,
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
    this.props.updateRemark(this.props.list[this.state.index]['backend_UserId'], newRemark)
  }

  componentDidMount() {
    this.beginFetch()
    this.props.fetchRoleList()
  }

  componentDidUpdate() {
    if (this.props.addConsoleUserSuccess) {
      this.props.clearAddConsoleUserSuccess()
      this.setState({index: -1})
      this.beginFetch(1)
      antdUtil.tipSuccess('新增后台用户成功！')
    }
    if (this.props.updateConsoleUserSuccess) {
      this.props.clearUpdateSuccess()
      antdUtil.tipSuccess('更新成功！')
      this.beginFetch(1)
    }
    if (this.props.deleteConsoleUserSuccess) {
      this.setState({index: -1})
      this.beginFetch(1)
      this.props.clearDeleteConsoleUserSuccess()
      antdUtil.tipSuccess('删除成功！')
    }
    if (this.props.resetPasswordSuccess) {
      this.props.clearResetPasswordSuccess()
      antdUtil.tipSuccess('重置密码成功！')
    }
    if (this.props.updateRemarkSuccess) {
      this.props.clearUpdateRemarkSuccess()
      antdUtil.tipSuccess('备注修改成功！')
    }
  }

  render() {
    return (
      <div className="app-function-page console-account-manage">
        {
          this.state.add && (
            <AddConsoleUser
              roleList={this.props.roleList}
              addConsoleUser={this.props.addConsoleUser}
              addConsoleUserSuccess={this.props.addConsoleUserSuccess}
              onExited={() => this.setState({add: false})}/>
          )
        }

        {
          this.state.edit && this.state.index != -1 && (
            <EditConsoleUser
              accountInfo={this.props.list[this.state.index]}
              roleList={this.props.roleList}
              updateConsoleUser={this.props.updateConsoleUser}
              deleteAccount={this.props.deleteAccount}
              resetPassword={this.props.resetPassword}
              updateConsoleUserSuccess={this.props.updateConsoleUserSuccess}
              deleteConsoleUserSuccess={this.props.deleteConsoleUserSuccess}
              resetPasswordSuccess={this.props.resetPasswordSuccess}
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

        <QueryFilter ref={c => this._queryFilter = c} className="ex-big-label"
                     beginFilter={() => this.beginFetch(1)}
                     searchKeyName="backend_User_Name"
                     placeholder="输入后台账号"
        >

          <button className="btn btn-primary mr-20" onClick={() => this.setState({add: true})}>新增账号</button>
          <button className="btn btn-info mr-20" onClick={() => this.setState({edit: true})} disabled={this.state.index == -1}>修改</button>

          <FilterItem item={this.props.roleFilterList} paramName="group_Id"></FilterItem>
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
                  weight={[1, 1, 1, 1, 1]}
          >
            <Head>
              <HeadItem>账号</HeadItem>
              <HeadItem>姓名</HeadItem>
              <HeadItem>权限分组</HeadItem>
              <HeadItem>备注</HeadItem>
              <HeadItem>创建时间</HeadItem>
            </Head>
            <div>
              {
                this.props.list.map((account, index) => {
                  return (
                    <Row key={account['backend_UserId']}
                         onClick={e => this.setState({index})}
                         selected={this.state.index == index}
                         onDoubleClick={() => this.setState({index, edit: true})}
                         style={{minHeight: '60px'}}
                    >
                      <RowItem>{account['backend_User_Name']}</RowItem>
                      <RowItem>{account['backend_User_Real_Name']}</RowItem>
                      <RowItem>{account['group_Name'].join(',')}</RowItem>
                      <RowItem>
                        {account['backend_User_Remark']}
                        <i className="edit-remark-svg"
                           onClick={e => this.setState({showEditRemark: true, index})}/>
                      </RowItem>
                      <RowItem>{account['backend_User_Create_Time']}</RowItem>
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
  const consoleAccountManage = state['consoleAccountManage']
  return {
    ...consoleAccountManage,
    roleFilterList: utils.getFilterItem('role', '权限包含', consoleAccountManage.roleList)
  }
}

export default connect(mapStateToProps, {
  fetchList, fetchRoleList, addConsoleUser, updateConsoleUser,
  deleteAccount, resetPassword,
  clearAddConsoleUserSuccess, clearUpdateSuccess,
  clearDeleteConsoleUserSuccess, clearResetPasswordSuccess,
  updateRemark, clearUpdateRemarkSuccess
})(ConsoleAccountManage)
