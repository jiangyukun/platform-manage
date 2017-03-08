/**
 * Created by jiangyukun on 2017/3/7.
 */
import React from 'react'

import Select1 from '../../../../components/core/Select1'
import CheckItem from '../../check/CheckItem'
import {isEmpty, all, quantitativeResultOptions} from '../../../../constants/smart-analytic-constant'

class HBsAbQuantitativeResult extends React.Component {
  constructor(props) {
    super()
    this.state = {
      rule: props.rule,
      number: props.number,
    }
  }

  getValue() {
    return this.state
  }

  onSelectChange = ({value}) => {
    if (value == all) {
      this.setState({number: ''})
    }
    this.setState({rule: value})
  }

  onReset = () => {
    this.setState({rule: all, number: ''})
  }

  render() {
    let empty = this.state.rule == all

    return (
      <CheckItem label="HBsAb滴度" btnName="添加HBsAb滴度条件" empty={isEmpty(this.state.rule)}>
        <div className="HBsAb">
          <Select1 selectItems={quantitativeResultOptions} value={this.state.rule} onSelect={this.onSelectChange}/>
        </div>
        <input placeholder="输入数值"
               className="input"
               value={this.state.number}
               disabled={this.state.rule == all}
               onChange={e => this.setState({number: e.target.value})}/>
      </CheckItem>
    )
  }
}

HBsAbQuantitativeResult.defaultProps = {
  rule: all,
  number: ''
}

HBsAbQuantitativeResult.propTypes = {
  rule: React.PropTypes.string,
  number: React.PropTypes.string,
}

export default HBsAbQuantitativeResult
