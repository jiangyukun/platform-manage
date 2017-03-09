/**
 * Created by jiangyukun on 2017/3/9.
 */
import React from 'react'
import {connect} from 'react-redux'

class ConsoleAccountManage extends React.Component {

  render() {
    return (
      <div className="app-function-page">
        <div className="relative" style={{top: '30px'}}>
          abc
          <div className="popover bottom show">
            <div className="popover-title">sdfsdf</div>
            <div className="arrow"></div>
            <div className="popover-content">asdgsgfsagcxvasdfsdfsadfgsadgsdd cccdfs</div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps, {})(ConsoleAccountManage)
