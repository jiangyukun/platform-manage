/**
 * HOC
 * 如果有导出权限则返回子节点，否则返回null，不展示子节点
 * Created by jiangyukun on 2017/3/15.
 */
import React, {Component, PropTypes, Children} from 'react'

export default function checkExportAuthority(currentPageName) {
  class NoExportAuthority extends Component {
    render() {
      console.log(11)
      if (!this.context.pageList) {
        return null
      }
      let page = this.context.pageList.find(page => page['page_Name'] == currentPageName)
      return (page && page['export'] == true) ? Children.only(this.props.children) : null
    }
  }
  NoExportAuthority.contextTypes = {
    pageList: PropTypes.array
  }

  return NoExportAuthority
}
