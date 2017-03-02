/**
 * Created by jiangyukun on 2016/10/21.
 */
import React, {Component, PropTypes} from 'react'
import {Modal} from 'react-overlays'
import classnames from 'classnames'

import Fly from '../transition/Fly'

class AppModal extends Component {
  render() {
    return (
      <Modal show={this.props.show}
             className={classnames('app-modal', {'ngdialog-closing': !this.props.show})}
             backdrop="static"
             backdropClassName="ngdialog-overlay"
             transition={Fly}
             dialogTransitionTimeout={450}
             onHide={this.props.onHide}
             onExited={this.props.onExited}>
        <div className="modal-container" tabIndex="-1" role="dialog">
          <div className="modal-content" style={{width: this.props.width}}>
            <div className="modal-close" onClick={this.props.onHide}></div>
            {this.props.children}
          </div>
        </div>
      </Modal>
    )
  }

  getChildContext() {
    return {
      $bs_modal: {
        onHide: this.props.onHide
      }
    }
  }
}

AppModal.propTypes = {
  show: PropTypes.bool,
  width: PropTypes.string,
  className: PropTypes.string,
  onHide: PropTypes.func,
  onExited: PropTypes.func
}

AppModal.childContextTypes = {
  $bs_modal: PropTypes.shape({
    onHide: React.PropTypes.func
  })
}

export default AppModal
