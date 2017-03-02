/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Dropdown from 'react-bootstrap/lib/Dropdown'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import classnames from 'classnames'
import moment from 'moment'

import {toggleAside, toggleMessagePanel} from '../actions/header'

class Header extends Component {
  toggleMessagePanel() {
    this.props.toggleMessagePanel()
  }

  componentDidMount() {
    setTimeout(() => {
      this.forceUpdate()
    }, 30000)
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

    return (
      <div className="app-header navbar">
        <div className="navbar-header">

          <a href="/" className="navbar-brand">
            <i className="console-svg-icon"></i>
            <span className="console-name">{this.props.app.name}</span>
          </a>
        </div>

        <div className="collapse pos-rlt navbar-collapse box-shadow bg-white-only">
          <ul className="nav navbar-nav navbar-right">
            <li>
              <a onClick={e => this.toggleMessagePanel()}>
                <span className="">消息通知</span>
                <i className="icon-bell fa-fw"></i>
                <span className="message-count">{this.props.message.unreadTotal || ''}</span>
              </a>
            </li>
            <Dropdown id="dropdown-system-menu" componentClass={CustomWrap}>
              <Dropdown.Toggle useAnchor={true}>
                <span className="hidden-sm hidden-md">{this.props.app.username + `，${dayPhase}好`}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu animated fadeInRight w">
                <MenuItem href="platform/access/login.html">
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

function mapStateToProps(state) {
  return {
    app: state.app,
    message: state.message
  }
}

export default connect(mapStateToProps, {toggleAside, toggleMessagePanel})(Header)

class CustomWrap extends Component {
  render() {
    return (
      <li {...this.props}>{this.props.children}</li>
    )
  }
}
