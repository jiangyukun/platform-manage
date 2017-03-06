/**
 * 基于Flex的列表
 * Created by jiangyukun on 2017/3/6.
 */
import React, {Component, PropTypes} from 'react'

class FlexList extends Component {

  render() {
    let style = {}
    if (this.props.minWidth) {
      style.minWidth = this.props.minWidth
    }
    return (
      <div style={{overflow: 'auto', height: '100%'}}>
        <div style={style}>
          {this.props.children}
        </div>
      </div>
    )
  }

  getChildContext() {
    return {
      weight: this.props.weight
    }
  }
}

FlexList.childContextTypes = {
  weight: PropTypes.array
}

FlexList.propTypes = {
  weight: PropTypes.array,
  minWidth: PropTypes.number
}

export default FlexList
