/**
 * 登录成功引导页，权限控制
 * Created by jiangyukun on 16/10/15.
 */
import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'
import Header from './Header'
import Aside from './Aside'
import AppContent from './AppContent'
import Message from './Message'
import Settings from './Settings'
import * as utils from '../core/utils'
import * as antdUtil from '../core/utils/antdUtil'
import {deleteErr} from '../actions/app'

class ManagementPlatformApp extends Component {
    openSettings() {
        this._settings.open()
    }

    getChildContext() {
        return {
            role: this.props.role
        }
    }

    componentDidMount() {
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

        function getClassName() {
            return classnames('app', {
                'app-header-fixed': app.settings.headerFixed,
                'app-aside-fixed': app.settings.asideFixed,
                'app-aside-folded': app.settings.asideFolded,
                'app-aside-dock': app.settings.asideDock,
                'app-aside-message': app.settings.asideMessage,
                'container': app.settings.container
            })
        }

        return (
            <div className={getClassName()}>
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

ManagementPlatformApp.childContextTypes = {
    role: PropTypes.string
}

function mapStateToProps(state) {
    let role = 'admin'
    if (utils.getSession('userId') == 'crc001') {
        role = 'crc'
    }
    return {
        app: state.app,
        errQueue: state.errQueue,
        role
    }
}

export default connect(mapStateToProps, {deleteErr})(ManagementPlatformApp)
