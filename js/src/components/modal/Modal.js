/**
 * 自己造的对话框
 * Created by jiangyukun on 2017/2/20.
 */
import React, {Component, PropTypes} from 'react'
import {unmountComponentAtNode, unstable_renderSubtreeIntoContainer as renderSubtreeIntoContainer} from 'react-dom'
import classnames from 'classnames'

import Header from './Header'
import Title from './Title'
import Body from './Body'
import Footer from './Footer'

class Modal extends Component {
  onHide = () => {
    this.props.onHide()
    setTimeout(() => this.onExited(), 375)
  }

  onExited = () => {
    this.props.onExited()
  }

  _wrapChildren() {
    return (
      <div className="my-modal">
        <div className={classnames('my-mask', this.props.show ? 'open1' : 'close1')}></div>
        <div className="my-modal-container">
          <div className={classnames('my-modal-box', this.props.show ? 'open1' : 'close1')}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.context = document.createElement('div')
    document.body.appendChild(this.context)
    renderSubtreeIntoContainer(this, this._wrapChildren(), this.context)
  }

  componentDidUpdate() {
    renderSubtreeIntoContainer(this, this._wrapChildren(), this.context)
  }

  componentWillUnmount() {
    unmountComponentAtNode(this.context)
    document.body.removeChild(this.context)
  }

  render() {
    return null
  }

  getChildContext() {
    return {
      onHide: this.onHide,
      onExited: this.onExited
    }
  }
}

Modal.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onExited: PropTypes.func
}

Modal.childContextTypes = {
  onHide: PropTypes.func,
  onExited: PropTypes.func
}

Modal.Header = Header
Modal.Title = Title
Modal.Body = Body
Modal.Footer = Footer

export default Modal
