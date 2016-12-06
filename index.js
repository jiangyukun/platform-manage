import 'babel-polyfill'
import React from 'react'
import {browserHistory} from 'react-router'
import {render} from 'react-dom'
import {syncHistoryWithStore} from 'react-router-redux'

import configureStore from './js/src/store/configureStore'
import Root from './js/src/containers/root/Root'

import 'antd/lib/style/index.less'
import 'antd/lib/button/style/index.less'
import 'antd/lib/modal/style/index.less'
import 'antd/lib/notification/style/index.less'
import 'antd/lib/date-picker/style/index.less'

import './css/less/index.less'
import './css/scss/index.scss'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

render(
    <Root store={store} history={history}/>, document.getElementById('root')
)
