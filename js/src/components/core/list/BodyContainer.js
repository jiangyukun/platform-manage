/**
 * Created by jiangyukun on 2016/12/5.
 */
import React, {Component, PropTypes, Children} from 'react'

class BodyContainer extends Component {

  render() {
    if (!this.props.children) {
      return null
    }
    return this.props.children
  }
}

export default BodyContainer
