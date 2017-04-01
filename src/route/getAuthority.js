/**
 * Created by jiangyukun on 2017/3/16.
 */
import React from 'react'

import {getIsCanEdit, getIsCanExport} from '../constants/authority'

export default function getAuthority(pageList, currentPageName, Component) {
  class WrapAuthority extends React.Component {
    render() {
      let isCanEdit = getIsCanEdit(pageList, currentPageName)
      let isCanExport = getIsCanExport(pageList, currentPageName)
      return (
        <Component authority={{isCanEdit, isCanExport}}/>
      )
    }
  }

  return WrapAuthority
}
