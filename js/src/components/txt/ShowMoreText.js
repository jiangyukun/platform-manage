/**
 * Created by jiangyukun on 2017/2/27.
 */
import React, {PropTypes, Component, Children} from 'react'

class ShowMoreText extends Component {
  state = {
    showMore: false
  }

  getPartText() {
    return this.props.children.substring(0, this.props.limit)
  }

  getAllText() {
    return this.props.children
  }

  render() {
    if (typeof this.props.children != 'string') {
      return (
        <span>{this.props.children}</span>
      )
    }
    let toMuch = this.props.children.length > this.props.limit
    if (!toMuch || this.state.showMore) {
      return (
        <span>{this.getAllText()}</span>
      )
    }
    return (
      <span>
        {this.getPartText()}
        ...
        <a className="load-more-text" onClick={() => this.setState({showMore: true})}>加载更多</a>
      </span>
    )
  }
}

ShowMoreText.defaultProps = {
  limit: 100
}

ShowMoreText.propTypes = {
  limit: PropTypes.number
}

export default ShowMoreText
