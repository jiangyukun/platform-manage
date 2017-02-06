/**
 * Created by jiangyukun on 2017/1/19.
 */
import React, {Component, PropTypes, Children, cloneElement} from 'react'
import HeadItem from './HeadItem'

class Head extends Component {
  render() {
    const weight = this.context.weight

    const headItems = []
    Children.forEach(this.props.children, (child, index) => {
      headItems.push(cloneElement(child, {key: index, flex: weight[index]}))
    })

    return (
      <ul className="flex-list header">
        {headItems}
      </ul>
    )
  }
}

Head.contextTypes = {
  weight: PropTypes.array
}

Head.Item = HeadItem

export default Head
