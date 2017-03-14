/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React from 'react'
import {Route} from 'react-router'

import getPageRoute from './getPageRoute'

export default function getRoute(pageList) {
  return (
    <Route path="platform">
      {getPageRoute('inline', pageList)}
    </Route>
  )
}
