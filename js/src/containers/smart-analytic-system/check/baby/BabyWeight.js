/**
 * Created by jiangyukun on 2017/3/7.
 */
import React from 'react'

import Select1 from '../../../../components/core/Select1'
import CheckItem from '../../check/CheckItem'

import {isEmpty, all, weightOptions} from '../../../../constants/smart-analytic-constant'

class BabyWeight extends React.Component {
  constructor(props) {
    super()
    this.state = {
      rule: props.rule,
      weight: props.weight,
    }
  }

  getValue() {
    return this.state
  }

  onReset = () => {
    this.setState({rule: all, weight: ''})
  }

  onSelectChange = ({value}) => {
    if (value == all) {
      this.setState({weight: ''})
    }
    this.setState({rule: value})
  }

  render() {
    return (
      <CheckItem label="宝宝出生体重" btnName="添加体重条件" empty={isEmpty(this.state.rule)}>
        <div className="baby-weight">
          <Select1 selectItems={weightOptions} value={this.state.rule} onSelect={this.onSelectChange}/>
        </div>
        <input placeholder="输入数值"
               className="input"
               value={this.state.weight}
               disabled={this.state.rule == all}
               onChange={e => this.setState({weight: e.target.value})}/>
        <span className="unit-txt">g</span>
      </CheckItem>
    )
  }
}

BabyWeight.defaultProps = {
  rule: all,
  weight: ''
}

BabyWeight.propTypes = {
  rule: React.PropTypes.string,
  weight: React.PropTypes.string,
}

export default BabyWeight
