/**
 * Created by jiangyukun on 2017/3/3.
 */
import React, {Component, PropTypes} from 'react'
import Radio from 'antd/lib/Radio'

class HepatitisBResult extends Component {
  render() {
    return (
      <Radio.Group value={this.props.value} onChange={this.props.onChange}>
        <Radio value="阳性" className="positive">阳性</Radio>
        <Radio value="阴性" className="negative">阴性</Radio>
        <Radio value="任意" className="all">任意</Radio>
      </Radio.Group>
    )
  }
}

HepatitisBResult.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
}

export default HepatitisBResult
