/**
 * Created by jiangyukun on 2017/2/23.
 */
import React, {Component, PropTyps, Children} from 'react'

class Tab extends Component {
  render() {
    return (
      <div className="my-tab-item">
        {this.props.children}
      </div>
    )
  }
}

Tab.propTypes = {}

export default Tab
