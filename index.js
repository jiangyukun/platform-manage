import 'babel-polyfill'
import React from 'react'
import {Router, hashHistory} from 'react-router'
import {render} from 'react-dom'
import {syncHistoryWithStore} from 'react-router-redux'

import configureStore from './js/store/configureStore'
import Root from './js/containers/root/Root'

import './css/less/app.less'
import './css/scss/app.scss'

const store = configureStore()
const history = syncHistoryWithStore(hashHistory, store)

render(
    <Root store={store} history={history}/>,
    document.getElementById('root')
)
