/**
 * Created by jiangyukun on 2017/3/13.
 */
import React from 'react'

class PageAuthority extends React.Component {

  render() {
    return (
      <div className="page-authority" onClick={this.props.editPagePermission}>
        <p className="page-name">{this.props.pageName}</p>
        <div className="permission">
          {
            this.props.permission == '1' && (
              <span>编辑</span>
            )
          }
          {
            this.props.permission == '2' && (
              <span>查看</span>
            )
          }
          {
            !this.props.export && (
              <span style={{marginLeft: '15px'}}>不可导出</span>
            )
          }
        </div>
        <i className="close-btn edit-remark-icon" onClick={this.props.editPagePermission}></i>
      </div>
    )
  }
}

PageAuthority.propTypes = {
  permission: React.PropTypes.string,
  pageCode: React.PropTypes.string,
  pageName: React.PropTypes.string,
  export: React.PropTypes.bool,
  editPagePermission: React.PropTypes.func
}

export default PageAuthority
