/**
 * Created by jiangyukun on 2016/12/5.
 */
import React, {Component, PropTypes} from 'react'

class FixHead extends Component {
  constructor() {
    super()
    this.state = {show: false}
  }

  componentDidUpdate() {
    this._fixHeadContainer.scrollLeft = this.props.scrollLeft
  }

  render() {
    return (
      <div className="js-fix-header-container" ref={c => this._fixHeadContainer = c}>
        <div className="fix-header" style={{width: this.props.width + 'px'}}>
          {this.props.component}
        </div>
      </div>
    )
  }
}

FixHead.propTypes = {
  component: PropTypes.element,
  scrollLeft: PropTypes.number,
  width: PropTypes.number
}

export default FixHead
