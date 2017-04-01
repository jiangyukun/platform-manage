/**
 * Created by jiangyukun on 2017/2/20.
 */
import React, {Component, PropTypes} from 'react'

class Header extends Component {
  onHide = () => {
    this.context.onHide()
  }

  render() {
    return (
      <div className="my-modal-header">
        {
          this.props.closeButton && (
            <div className="my-close-btn" onClick={this.onHide}>
              <span>+</span>
            </div>
          )
        }
        {this.props.children}
      </div>
    )
  }
}

Header.propTypes = {
  closeButton: PropTypes.bool
}

Header.contextTypes = {
  onHide: PropTypes.func
}

export default Header
