/**
 * Created by jiangyukun on 2017/2/20.
 */
import React, {Component, PropTypes} from 'react'

class Title extends Component {
  render() {
    return (
      <div className="my-modal-title">
        {this.props.children}
      </div>
    )
  }
}

export default Title
