/**
 * Created by jiangyukun on 2016/12/5.
 */
import React, {Component, PropTypes} from 'react'

class FixLeft extends Component {

  render() {
    return (
      <div className="fix-left" style={{width: this.props.width}}>
        {
          this.props.leftItem && this.props.leftItem.map((item, index) => {
            return <div key={index} className="fix-left-item" style={{height: item.height + 'px'}}>
              <span>{item.text}</span>
            </div>
          })
        }
      </div>
    )
  }
}

FixLeft.propTypes = {
  leftItem: PropTypes.array,
  width: PropTypes.number
}

export default FixLeft
