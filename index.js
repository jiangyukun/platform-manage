import 'babel-polyfill'
import React from 'react'
import {Router, hashHistory} from 'react-router'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {syncHistoryWithStore} from 'react-router-redux'

import configureStore from './js/store/configureStore'
import routes from './js/routes'

import './css/less/app.less'
import './css/scss/app.scss'

const store = configureStore()
const history = syncHistoryWithStore(hashHistory, store)

render(
    <Provider store={store}>
        <Router routes={routes} history={history}/>
    </Provider>,
    document.getElementById('root')
)
