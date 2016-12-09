import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import {useRouterHistory} from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import {syncHistoryWithStore} from 'react-router-redux'

import configureStore from '../js/src/store/configureStore'
import Root from '../js/src/containers/root/Root'

import 'antd/lib/style/index.less'
import 'antd/lib/button/style/index.less'
import 'antd/lib/modal/style/index.less'
import 'antd/lib/notification/style/index.less'
import 'antd/lib/date-picker/style/index.less'

import '../css/less/index.less'
import '../css/scss/index.scss'

let path
switch (process.env.NODE_ENV) {
    case 'dev':
        path = '/'
        break

    case 'inline':
        path = '/backend/'
        break

    case 'test':
    case 'production':
        path = '/backend/'
        break

    default:
        throw new Error('illegal NODE_ENV value!')
}
let store = configureStore()
let browserHistory = syncHistoryWithStore(useRouterHistory(createBrowserHistory)({basename: path}), store)

render(
    <Root store={store} history={browserHistory}/>,
    document.getElementById('root')
)
