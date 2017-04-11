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

import {getIsCanEdit} from '../constants/authority'
import {appPageNames} from '../constants/nav'
import * as antdUtil from '../core/utils/antdUtil'
import {deleteErr} from '../actions/app'

class PlatformApp extends Component {
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
    let isCanEdit = getIsCanEdit(this.props.pageList, appPageNames.laboratorySheet)

    return (
      <div className="app">
        <Header isCanEdit={isCanEdit}/>
        <Aside pageList={this.props.pageList}/>
        <AppContent>
          {this.props.children}
        </AppContent>
        {
          isCanEdit && (
            <Message/>
          )
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    pageList: state.app.pageList,
  }
}

export default connect(mapStateToProps, {deleteErr})(PlatformApp)
