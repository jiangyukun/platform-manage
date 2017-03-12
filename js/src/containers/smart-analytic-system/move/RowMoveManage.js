/**
 * Created by jiangyu2016 on 2017/3/12.
 */
import React from 'react'

class RowMoveManage extends React.Component {
  state = {
    current: -1
  }

  heightList = []

  addRow = (index, rowHeight) => {
    this.heightList[index] = rowHeight
  }

  getRowTop = (index) => {
    let totalHeight = 0
    for (let i = 0; i < index; i++) {
      totalHeight += this.heightList[i]
    }
    return totalHeight
  }

  onMoveStart = (index) => {
    this.setState({current: index})
  }

  onMoving = (index, top) => {
    // console.log(top)
    let currentTop = 0, newPosition = this.heightList.length - 1
    for (let i = 0; i < this.heightList.length; i++) {
      currentTop += this.heightList[i]
      if (top < currentTop) {
        newPosition = i
        break
      }
    }
    console.log(newPosition)
    this.setState({current: newPosition})
  }

  onMoveEnd = () => {
    this.setState({current: -1})
  }

  getChildContext() {
    return {
      addRow: this.addRow,
      getRowTop: this.getRowTop,
      onMoveStart: this.onMoveStart,
      onMoving: this.onMoving,
      onMoveEnd: this.onMoveEnd,
    }
  }

  render() {
    let rows = []
    React.Children.forEach(this.props.children, (child, index) => {
      if (index == this.state.current) {
        rows.push((
          <div key="row-place-holder" className="row-place-holder" style={{height: this.heightList[index]}}></div>
        ))
      }
      rows.push(child)
    })
    return (
      <div>
        {rows}
      </div>
    )
  }
}

RowMoveManage.childContextTypes = {
  addRow: React.PropTypes.func,
  getRowTop: React.PropTypes.func,
  onMoveStart: React.PropTypes.func,
  onMoving: React.PropTypes.func,
  onMoveEnd: React.PropTypes.func,
}

export default RowMoveManage
