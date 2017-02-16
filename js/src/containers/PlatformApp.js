/**
 * 登录成功引导页，权限控制
 * Created by jiangyukun on 16/10/15.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Header from './Header'
import Aside from './Aside'
import AppContent from './AppContent'
import Message from './Message'
import Settings from './Settings'
import * as utils from '../core/utils'
import * as antdUtil from '../core/utils/antdUtil'
import {deleteErr} from '../actions/app'

class PlatformApp extends Component {
  openSettings() {
    this._settings.open()
  }

  getChildContext() {
    return {
      role: this.props.role
    }
  }

  componentDidUpdate() {
    const {errQueue} = this.props.app
    if (errQueue.length != 0) {
      errQueue.forEach(errInfo => {
        antdUtil.tipErr(errInfo.err)
        this.props.deleteErr(errInfo.errId)
      })
    }
  }

  render() {
    let app = this.props.app

    return (
      <div className="app">
        <Header openSettings={() => this.openSettings()}/>
        <Aside/>
        <AppContent>
          {this.props.children}
        </AppContent>
        <Message/>
        <Settings ref={c => this._settings = c}/>
      </div>
    )
  }
}

PlatformApp.childContextTypes = {
  role: PropTypes.string
}

function mapStateToProps(state) {
  let role = 'admin'
  if (utils.getSession('userId') == 'crc001') {
    role = 'crc'
  }

  return {
    app: state.app,
    role
  }
}

export default connect(mapStateToProps, {deleteErr})(PlatformApp)
