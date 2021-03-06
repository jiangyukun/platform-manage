/**
 * Created by jiangyukun on 2016/10/21.
 */
import React, {Component, PropTypes} from 'react'
import {Modal} from 'react-overlays'
import classnames from 'classnames'

import Fly from '../transition/Fly'

class CommonDialog extends Component {
  render() {
    return (
      <Modal show={this.props.show}
             className={classnames(this.props.className, {'ngdialog-closing': !this.props.show})}
             backdrop="static"
             backdropClassName="ngdialog-overlay"
             transition={Fly}
             dialogTransitionTimeout={450}
             onHide={() => this.props.onHide()}
             onExited={e => this.props.onExited()}>
        <div className="ngdialog-content" style={{width: this.props.width}}>
          <div className="ngdialog-close" onClick={() => this.props.onHide()}></div>
          {this.props.children}
        </div>
      </Modal>
    )
  }
}

CommonDialog.propTypes = {
  show: PropTypes.bool,
  width: PropTypes.string,
  className: PropTypes.string,
  onHide: PropTypes.func,
  onExited: PropTypes.func
}

export default CommonDialog
