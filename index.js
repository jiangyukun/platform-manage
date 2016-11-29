import 'babel-polyfill'
import React from 'react'
import {Router, hashHistory} from 'react-router'
import {render} from 'react-dom'
import {syncHistoryWithStore} from 'react-router-redux'

import configureStore from './js/src/store/configureStore'
import Root from './js/src/containers/root/Root'

import './css/less/index.less'
import './css/scss/index.scss'

const store = configureStore()
const history = syncHistoryWithStore(hashHistory, store)

render(
    <Root store={store} history={history}/>,
    document.getElementById('root')
)
