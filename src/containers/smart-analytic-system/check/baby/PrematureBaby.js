/**
 * Created by jiangyukun on 2017/3/7.
 */
import React from 'react'
import Radio from 'antd/lib/Radio'

import CheckItem from '../../check/CheckItem'
import {isEmpty, all} from '../../../../constants/smart-analytic-constant'

class PrematureBaby extends React.Component {
  constructor(props) {
    super()
    this.state = {
      isPrematureBaby: props.isPrematureBaby
    }
  }

  getValue() {
    return this.state
  }

  onReset = () => {
    this.setState({rule: all, base: '', power: ''})
  }

  render() {
    let empty = this.state.rule == all

    return (
      <CheckItem label="是否是早产儿" btnName="添加早产儿条件" empty={isEmpty(this.state.isPrematureBaby)}>
        <Radio.Group value={this.state.isPrematureBaby} onChange={e => this.setState({isPrematureBaby: e.target.value})}>
          <Radio value="是" className="positive">是</Radio>
          <Radio value="否" className="negative">否</Radio>
          <Radio value={all} className="all">任意</Radio>
        </Radio.Group>
      </CheckItem>
    )
  }
}

PrematureBaby.defaultProps = {
  isPrematureBaby: all
}

PrematureBaby.propTypes = {
  isPrematureBaby: React.PropTypes.string,
}

export default PrematureBaby
