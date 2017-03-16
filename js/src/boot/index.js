import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import {useRouterHistory} from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import {syncHistoryWithStore} from 'react-router-redux'

import configureStore from '../store/configureStore'
import Root from '../containers/Root'
import {_get} from '../services/http'

import {pagePriority} from '../constants/nav'
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

_get('/webBackend/getBackendUserPermissionPage').then(authorityInfo => {
  const roleList = authorityInfo['list'] || []
  const userName = authorityInfo['userName']
  const pageList = []
  roleList.forEach(role => {
    if (role.pageList) {
      role.pageList.map(page => {
        let pageName = page['page_Name']
        if (pageList.find(page => page['page_Name'] == pageName) == null) {
          pageList.push(page)
        }
      })
    }
  })

  // 页面优先级排序
  pageList.sort((page1, page2) => {
    if (!page1 || !page1['page_Name'] || !pagePriority[page1['page_Name']]) {
      return -1
    }
    if (!page2 || !page2['page_Name'] || !pagePriority[page2['page_Name']]) {
      return 1
    }
    return pagePriority[page1['page_Name']] - pagePriority[page2['page_Name']]
  })

  store.dispatch({
    type: types.INIT_USERNAME,
    username: userName
  })

  store.dispatch({
    type: types.INIT_ROLE_LIST, pageList
  })
  render(
    <Root pageList={pageList} store={store} history={browserHistory}/>,
    document.getElementById('root'))
})
