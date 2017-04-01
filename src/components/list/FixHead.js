/**
 * Created by jiangyukun on 2017/1/19.
 */
import React, {Component, PropTypes, Children, cloneElement} from 'react'

class FixHead extends Component {
  constructor(props, context) {
    super()
    context.setHead(this)
  }

  onBodyScroll = (e) => {
    this._fixHeadContainer.scrollLeft = e.target.scrollLeft
  }

  render() {
    const weight = this.context.weight

    const headItems = []
    Children.forEach(this.props.children, (child, index) => {
      if (typeof weight[index] == 'string') {
        headItems.push(cloneElement(child, {key: index, width: weight[index]}))
      } else {
        headItems.push(cloneElement(child, {key: index, flex: weight[index]}))
      }
    })

    let style = {}
    if (this.context.minWidth) {
      style.minWidth = this.context.minWidth
    }

    return (
      <div ref={c => this._fixHeadContainer = c} style={{overflowX: 'hidden', overflowY: this.context.isBodyScroll ? 'scroll' : 'hidden'}}>
        <div style={style}>
          <ul className="flex-list-header">
            {headItems}
          </ul>
        </div>
      </div>
    )
  }
}

FixHead.contextTypes = {
  isBodyScroll: PropTypes.bool,
  weight: PropTypes.array,
  minWidth: PropTypes.string,
  setHead: PropTypes.func
}

export default FixHead
