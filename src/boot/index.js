/**
 * Web App 启动代码
 */
import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import {useRouterHistory} from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import {syncHistoryWithStore} from 'react-router-redux'

import configureStore from '../store/configureStore'
import Root from '../containers/Root'
import {_get} from '../services/http'

import {EDIT_AUTHORITY} from '../constants/authority'
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

// 获取账号权限后开始渲染页面
_get('/webBackend/getBackendUserPermissionPage').then(authorityInfo => {
  const roleList = authorityInfo['list'] || []
  const userId = authorityInfo['userName']
  const username = authorityInfo['backendUserRealName']
  const pageList = []

  // 加入当前调试页面
  if (process.env.NODE_ENV != 'production') {
    pageList.push({
      'page_Name': 'patient-record-info',
      'permission': 1,
      'export': true
    })
  }

  roleList.forEach(role => {
    if (role.pageList) {
      role.pageList.map(newPageAuthority => {
        let pageName = newPageAuthority['page_Name']
        let matchPage = pageList.find(page => page['page_Name'] == pageName)
        if (matchPage == null) {
          pageList.push(newPageAuthority)
        } else {
          // 如果不同分组有同一个页面不同的权限配置，合并同一个页面的权限配置，高权限覆盖低权限
          if (newPageAuthority['permission'] == EDIT_AUTHORITY) {
            matchPage['permission'] = EDIT_AUTHORITY
          }
          if (newPageAuthority['export'] == true) {
            matchPage['export'] = true
          }
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
    type: types.INIT_ROLE_LIST, pageList, userId, username
  })

  render(
    <Root pageList={pageList} store={store} history={browserHistory}/>,
    document.getElementById('root'))
})
