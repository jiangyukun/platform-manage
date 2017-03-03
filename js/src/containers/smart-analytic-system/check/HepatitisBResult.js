/**
 * Created by jiangyukun on 2017/3/3.
 */
import React, {Component, PropTypes} from 'react'
import Radio from 'antd/lib/Radio'

class HepatitisBResult extends Component {
  state = {
    empty: true
  }

  render() {
    return (
      <Radio.Group>
        <Radio value={1} className="positive">阳性</Radio>
        <Radio value={2} className="negative">阴性</Radio>
        <Radio value={3} className="all">任意</Radio>
      </Radio.Group>
    )
  }
}

export default HepatitisBResult
