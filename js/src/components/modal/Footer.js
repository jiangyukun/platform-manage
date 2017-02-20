/**
 * Created by jiangyukun on 2017/2/20.
 */
import React, {Component, PropTypes} from 'react'

class Footer extends Component {
  render() {
    return (
      <div className="my-modal-footer">
        {this.props.children}
      </div>
    )
  }
}

export default Footer
