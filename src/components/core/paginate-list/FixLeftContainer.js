/**
 * Created by jiangyu2016 on 2016/12/5.
 */
import React, {Component, PropTypes} from 'react'

class FixLeftContainer extends Component {
  componentDidUpdate() {
    this._fixLeftContainer.scrollTop = this.props.scrollTop
  }

  render() {
    return (
      <div>
        <div className="fix-left-head">
          {
            this.props.leftHeadItems.map((leftHeadItem, index) => {
              return (
                <div key={index} className="fix-left-head-item" style={{width: leftHeadItem.width, height: leftHeadItem.height}}>
                  {leftHeadItem.text}
                </div>
              )
            })
          }
        </div>
        <div className="fix-left-container" ref={c => this._fixLeftContainer = c}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

FixLeftContainer.propTypes = {
  leftHeadItems: PropTypes.array,
  scrollTop: PropTypes.number
}

export default FixLeftContainer
