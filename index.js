import 'babel-polyfill'
import React from 'react'
import {Router, hashHistory} from 'react-router'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

import configureStore from './store/configureStore'
import routes from './routes'

import './res/sass/app.scss'

const store = configureStore()


render(
    <Provider store={store}>
        <Router routes={routes} history={hashHistory}/>
    </Provider>,
    document.getElementById('root')
)
