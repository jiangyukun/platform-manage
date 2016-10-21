/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'

import Header from './Header'
import Aside from './Aside'
import AppContent from './AppContent'
import Message from './Message'
import Settings from './Settings'

class App extends Component {
    constructor(props) {
        super(props)
    }

    openSettings() {
        this._settings.open()
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
                <Header openSettings={()=>this.openSettings()}/>
                <Aside/>
                <AppContent>
                    {this.props.children}
                </AppContent>
                <Message/>
                <Settings ref={c=>this._settings = c}/>
            </div>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        app: state.app
    }
}

export default connect(mapStateToProps)(App)
