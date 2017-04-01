/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Dropdown from 'react-bootstrap/lib/Dropdown'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import moment from 'moment'

import ChangePassword from './ChangePassword'

import * as antdUtil from '../core/utils/antdUtil'
import {toggleAside, toggleMessagePanel} from '../actions/header'
import {logout, changePassword, clearPasswordUpdateSuccess} from '../actions/app'

const CustomWrap = (props) => <li {...props}>{props.children}</li>

class Header extends Component {
  state = {
    showChangePassword: false
  }

  toggleMessagePanel() {
    this.props.toggleMessagePanel()
  }

  logout = () => {
    let loginUrl = 'platform/access/login.html'
    //开发跳转路径
    if (location.href.indexOf('inline') != -1) {
      loginUrl = 'platform/inline/login'
    }
    this.props.logout()
    location.href = loginUrl
  }

  componentDidMount() {
    // 每30m 刷新当前时间显示
    this.taskId = setInterval(() => {
      this.forceUpdate()
    }, 30000)
  }

  componentDidUpdate() {
    if (this.props.passwordUpdateSuccess) {
      this.props.clearPasswordUpdateSuccess()
      antdUtil.tipSuccess('密码修改成功！')
      setTimeout(() => this.logout(), 1000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.taskId)
  }

  render() {
    let dayHour = moment().format('HH')
    let dayPhase
    if (dayHour < 1) {
      dayPhase = '午夜'
    } else if (dayHour < 5) {
      dayPhase = '凌晨'
    } else if (dayHour < 6) {
      dayPhase = '清晨'
    } else if (dayHour < 8) {
      dayPhase = '早上'
    } else if (dayHour < 11) {
      dayPhase = '上午'
    } else if (dayHour < 13) {
      dayPhase = '中午'
    } else if (dayHour < 17) {
      dayPhase = '下午'
    } else if (dayHour < 18) {
      dayPhase = '傍晚'
    } else if (dayHour < 24) {
      dayPhase = '晚上'
    }

    const {userId, username} = this.props.app
    return (
      <div className="app-header navbar">
        {
          this.state.showChangePassword && (
            <ChangePassword
              changePassword={this.props.changePassword}
              passwordUpdateSuccess={this.props.passwordUpdateSuccess}
              onExited={() => this.setState({showChangePassword: false})}/>
          )
        }
        <div className="navbar-header">
          <a href="/" className="navbar-brand">
            <i className="console-svg-icon"></i>
            <span className="console-name">{this.props.app.name}</span>
          </a>
        </div>

        <div className="collapse pos-rlt navbar-collapse box-shadow bg-white-only">
          <ul className="nav navbar-nav navbar-right">
            {
              this.props.isCanEdit && (
                <li>
                  <a onClick={e => this.toggleMessagePanel()}>
                    <span className="">消息通知</span>
                    <i className="icon-bell fa-fw"></i>
                    <span className="message-count">{this.props.message.unreadTotal || ''}</span>
                  </a>
                </li>
              )
            }
            <Dropdown id="dropdown-system-menu" componentClass={CustomWrap}>
              <Dropdown.Toggle useAnchor={true}>
                <span className="hidden-sm hidden-md">{(username || userId) + `，${dayPhase}好`}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu animated fadeInRight w">
                <MenuItem onClick={() => this.setState({showChangePassword: true})}>
                  修改密码
                </MenuItem>
                <MenuItem divider/>
                <MenuItem onClick={this.logout}>
                  重新登录
                </MenuItem>
              </Dropdown.Menu>
            </Dropdown>
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    app: state.app,
    passwordUpdateSuccess: state.app.passwordUpdateSuccess,
    message: state.message,
    isCanEdit: ownProps.isCanEdit
  }
}

export default connect(mapStateToProps, {
  toggleAside,
  toggleMessagePanel,
  logout,
  changePassword,
  clearPasswordUpdateSuccess
})(Header)
