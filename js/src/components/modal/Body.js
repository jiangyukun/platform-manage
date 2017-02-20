/**
 * Created by jiangyukun on 2017/2/20.
 */
import React, {Component, PropTypes} from 'react'

class Body extends Component {
  render() {
    return (
      <div className="my-modal-body">
        {this.props.children}
      </div>
    )
  }
}

export default Body
