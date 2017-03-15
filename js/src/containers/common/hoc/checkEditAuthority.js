/**
 * HOC
 * 如果有编辑权限则返回子节点，否则返回null，不展示子节点
 * Created by jiangyukun on 2017/3/15.
 */
import React, {Component, PropTypes, Children} from 'react'

const EDIT_AUTHORITY = '1'
const LOOK_AUTHORITY = '2'

export default function checkEditAuthority(currentPageName) {
  class NoEditAuthority extends Component {
    render() {
      if (!this.context.pageList) {
        return null
      }
      let page = this.context.pageList.find(page => page['page_Name'] == currentPageName)
      return (page && page['permission'] == EDIT_AUTHORITY) ? Children.only(this.props.children) : null
    }
  }
  NoEditAuthority.contextTypes = {
    pageList: PropTypes.array
  }

  return NoEditAuthority
}
