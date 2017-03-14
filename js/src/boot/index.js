import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import {useRouterHistory} from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import {syncHistoryWithStore} from 'react-router-redux'

import configureStore from '../store/configureStore'
import Root from '../containers/Root'
import {_get} from '../services/http'

import * as utils from '../core/utils'
import * as types from '../constants/ActionTypes'

import './import-style'

let path
switch (process.env.NODE_ENV) {
  case 'dev':
    path = '/'
    break

  case 'inline':
  case 'test':
  case 'production':
    path = '/backend/'
    break

  default:
    throw new Error('illegal NODE_ENV value!')
}
let store = configureStore()
let browserHistory = syncHistoryWithStore(useRouterHistory(createBrowserHistory)({basename: path}), store)
store.dispatch({
  type: types.INIT_USERNAME,
  username: utils.getSession('userId')
})

_get('/webBackend/getBackendUserPermissionPage').then(roleList => {
  const pageList = []
  roleList.forEach(role => {
    role.pageList.map(page => {
      let pageName = page['page_Name']
      if (pageList.find(page => page['page_Name'] == pageName) == null) {
        pageList.push(page)
      }
    })
  })

  store.dispatch({
    type: types.INIT_ROLE_LIST, pageList
  })
  render(
    <Root pageList={pageList} store={store} history={browserHistory}/>,
    document.getElementById('root'))
})
