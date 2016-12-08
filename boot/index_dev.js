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

const store = configureStore()

let browserHistory = useRouterHistory(createBrowserHistory)({basename: '/platform/'})
// history = syncHistoryWithStore(history, store)

render(
    <Root store={store} history={browserHistory}/>
    , document.getElementById('root')
)
