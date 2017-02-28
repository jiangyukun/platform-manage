/**
 * Created by jiangyukun on 2017/1/19.
 */
import React, {Component, PropTypes, Children} from 'react'

class RowItem extends Component {
  render() {
    const style = {}
    if (this.props.width) {
      style.width = this.props.width
    }
    if (this.props.flex) {
      style.flex = this.props.flex
    }

    return (
      <li className="item" style={style}>
        {this.props.children}
      </li>
    )
  }
}

RowItem.propTypes = {
  width: PropTypes.string,
  flex: PropTypes.number
}

export default RowItem
