import 'babel-polyfill'
import React from 'react'
import {Router, hashHistory} from 'react-router'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import configureStore from './js/store/configureStore'
import routes from './js/routes'

import './css/less/app.less'
import './css/scss/app.scss'

const store = configureStore()

render(
    <Provider store={store}>
        <Router routes={routes} history={hashHistory}/>
    </Provider>,
    document.getElementById('root')
)
