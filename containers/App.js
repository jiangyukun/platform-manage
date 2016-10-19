/**
 * Created by jiangyu2016 on 16/10/15.
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'

import Header from '../components/Header'
import Aside from '../components/Aside'
import AppContent from '../components/AppContent'
import Message from '../components/Message'
import Settings from '../components/Settings'

class App extends Component {
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
                <Header app={this.props.app}/>
                <Aside/>
                <AppContent>
                    {this.props.children}
                </AppContent>
                <Message/>
                <Settings/>
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
