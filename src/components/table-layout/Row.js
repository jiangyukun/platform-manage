/**
 * Created by jiangyukun on 2017/1/19.
 */
import React, {Component, PropTypes, cloneElement, Children} from 'react'
import classnames from 'classnames'

import RowItem from './RowItem'

class Row extends Component {
  render() {
    const weight = this.context.weight

    const rowItems = []
    Children.forEach(this.props.children, (child, index) => {
      if (typeof weight[index] == 'string') {
        rowItems.push(cloneElement(child, {key: index, width: weight[index]}))
      } else {
        rowItems.push(cloneElement(child, {key: index, flex: weight[index]}))
      }
    })

    const {selected, ...props} = this.props
    return (
      <ul className={classnames('flex-list-row', {'selected': selected})} {...props}>
        {rowItems}
      </ul>
    )
  }
}

Row.contextTypes = {
  weight: PropTypes.array
}

Row.Item = RowItem

export default Row
