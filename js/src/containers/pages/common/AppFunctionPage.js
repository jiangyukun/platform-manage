/**
 * Created by jiangyukun on 2017/1/23.
 */
import React, {Component, PropTypes} from 'react'

class AppFunctionPage extends Component {

  render() {
    return (
      <div className="app-function-page">
        {this.props.children}
      </div>
    )
  }
}

export default AppFunctionPage
