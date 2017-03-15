/**
 * Created by jiangyukun on 2017/3/13.
 */
import React from 'react'
import classnames from 'classnames'

class PageAuthority extends React.Component {
  editPagePermission = () => {
    if (this.props.isCanEdit) {
      this.props.editPagePermission()
    }
  }

  render() {
    return (
      <div className={classnames('page-authority', {'cursor-pointer': this.props.isCanEdit})} onClick={this.editPagePermission}>
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
      </div>
    )
  }
}

PageAuthority.propTypes = {
  isCanEdit: React.PropTypes.bool,
  permission: React.PropTypes.string,
  pageCode: React.PropTypes.string,
  pageName: React.PropTypes.string,
  export: React.PropTypes.bool,
  editPagePermission: React.PropTypes.func
}

export default PageAuthority
