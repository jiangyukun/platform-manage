/**
 * Created by jiangyukun on 2017/2/27.
 */
import React, {PropTypes, Component, Children} from 'react'

import ShowMoreText from './ShowMoreText'
import HighLight from './HighLight'

class LoadMoreAndHighLight extends ShowMoreText {
  getPartText() {
    return (
      <HighLight match={this.props.match}>
        {this.props.children.substring(0, 200)}
      </HighLight>
    )
  }

  getAllText() {
    return (
      <HighLight match={this.props.match}>
        {this.props.children}
      </HighLight>
    )
  }
}

LoadMoreAndHighLight.propTypes = {
  ...ShowMoreText.propTypes,
  match: PropTypes.string
}

export default LoadMoreAndHighLight
