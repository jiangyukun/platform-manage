/**
 * Created by jiangyu2016 on 2016/12/6.
 */
import React, {Component, PropTypes} from 'react'
import {render, findDOMNode, unmountComponentAtNode} from 'react-dom'
import {events} from 'dom-helpers'

class ContextMenu extends Component {
  constructor() {
    super()
    this.handleContainerClick = this.handleContainerClick.bind(this)
    this.handleDocumentClick = this.handleDocumentClick.bind(this)
  }

  handleContainerClick() {
    this.keep = true
  }

  handleDocumentClick() {
    if (this.keep) {
      this.keep = false
      return
    }
    destroy()
  }

  componentDidMount() {
    events.on(findDOMNode(this), 'click', this.handleContainerClick)
    events.on(document, 'click', this.handleDocumentClick)
  }

  componentWillUnmount() {
    events.off(findDOMNode(this), 'click', this.handleContainerClick)
    events.off(document, 'click', this.handleDocumentClick)
  }

  render() {
    let style = {
      position: 'fixed',
      background: '#fff',
      top: this.props.top,
      left: this.props.left,
      zIndex: 9999
    }
    return (
      <div style={style}>
        134
      </div>
    )
  }
}

ContextMenu.propTypes = {
  top: PropTypes.number
}

let context

function show(top, left, component) {
  if (context) {
    destroy()
  }
  context = document.createElement('div')
  document.body.appendChild(context)
  render(<ContextMenu top={top} left={left}/>, context)
}

function destroy() {
  if (context) {
    unmountComponentAtNode(context)
    document.body.removeChild(context)
    context = null
  }
}

export let contextMenu = {
  show
}
