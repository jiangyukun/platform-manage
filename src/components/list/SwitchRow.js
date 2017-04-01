/**
 * Created by jiangyu2016 on 2017/3/12.
 */
import React from 'react'
import {events} from 'dom-helpers'

class SwitchRow extends React.Component {
  constructor(props, context) {
    super()
    this.state = {
      switch: false
    }
  }

  handleMouseDown = (e) => {
    this.targetRow = null
    this.startClientY = e.clientY
    this.pressFlag = true
    let row = e.target
    while (row && row.className.indexOf('switch-row') == -1) {
      row = row.parentNode
    }
    if (row) {
      this.targetRow = row
      row.style.position = 'absolute'
      row.style.left = '0px'
      row.style.right = '0px'
      this.initTop = this.context.getRowTop(this.props.index)
      row.style.top = this.initTop + 'px'
      this.context.onMoveStart(this.props.index)
    }
  }

  handleDocumentMove = (e) => {
    if (this.pressFlag && this.targetRow) {
      this.moveRow(e)
      e.stopPropagation()
    }
  }

  moveRow(e) {
    const row = this.targetRow

    let curTop = e.clientY - this.startClientY
    this.props.checkSwitch(this.props.index, this.targetRow.offsetTop)
    let top = this.initTop + curTop
    row.style.top = top + 'px'
    this.context.onMoving(this.props.index, top)
  }

  handleDocumentMouseUp = () => {
    this.pressFlag = false
    const row = this.targetRow
    if (row) {
      row.style.position = 'relative'
      row.style.top = 0
      this.setState({switch: false})
      this.context.onMoveEnd()
    }
  }

  componentDidMount() {
    this.context.addRow(this.props.index, this._container.clientHeight)
    events.on(document, 'mousemove', this.handleDocumentMove)
    events.on(document, 'mouseup', this.handleDocumentMouseUp)
  }

  componentWillUnmount() {
    events.off(document, 'mousemove', this.handleDocumentMove)
    events.off(document, 'mouseup', this.handleDocumentMouseUp)
  }

  render() {
    return (
      <div ref={c => this._container = c} className="switch-row"
           onMouseDown={this.handleMouseDown}
      >
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

SwitchRow.propTypes = {
  index: React.PropTypes.number,
  checkSwitch: React.PropTypes.func
}

SwitchRow.contextTypes = {
  addRow: React.PropTypes.func,
  getRowTop: React.PropTypes.func,
  onMoveStart: React.PropTypes.func,
  onMoving: React.PropTypes.func,
  onMoveEnd: React.PropTypes.func,
}

export default SwitchRow
