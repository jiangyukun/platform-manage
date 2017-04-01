/**
 * Created by jiangyukun on 2017/1/19.
 */
import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'

class HeadItem extends Component {
  render() {
    const style = {}
    if (this.props.width) {
      style.width = this.props.width
    }
    if (this.props.flex) {
      style.flex = this.props.flex
    }

    return (
      <li className={classnames('item', this.props.className)} style={style}>
        {this.props.children}
      </li>
    )
  }
}

HeadItem.propTypes = {
  width: PropTypes.string,
  flex: PropTypes.number
}

export default HeadItem
