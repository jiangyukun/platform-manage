/**
 * Created by jiangyukun on 2017/1/11.
 */
import React, {Component, PropTypes} from 'react'

class Flex extends Component {

  render() {
    return (
      <div style={{display: 'flex'}}>
        {this.props.children}
      </div>
    )
  }
}

class Item extends Component {
  render() {
    return (
      <div style={{flex: this.props.flex}}>
        {this.props.children}
      </div>
    )
  }
}

Flex.Item = Item

export default Flex
