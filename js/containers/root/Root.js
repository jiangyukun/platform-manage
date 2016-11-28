/**
 * Created by jiangyukun on 2016/11/26.
 */
import React, {Component} from 'react'

import {Provider} from 'react-redux'

import App from '../App'
import NodeAuditing from '../pages/node-auditing/NodeAuditing'

export default class Root extends Component {
    render() {
        return (
            <Provider store={this.props.store}>
                <App>
                    <NodeAuditing />
                </App>
            </Provider>
        )
    }
}
