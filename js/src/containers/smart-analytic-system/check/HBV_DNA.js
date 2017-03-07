/**
 * Created by jiangyukun on 2017/3/7.
 */
import React from 'react'

import Select1 from '../../../components/core/Select1'
import CheckItem from '../check/CheckItem'

import {all, hbvDNAOptions} from '../../../constants/smart-analytic-constant'

class HBV_DNA extends React.Component {
  constructor(props) {
    super()
    this.state = {
      rule: props.rule,
      base: props.base,
      power: props.power,
    }
  }

  getValue() {
    let {rule, base, power} = this.state
    return {rule, base, power}
  }

  onReset = () => {
    this.setState({rule: all, base: '', power: ''})
  }

  render() {
    let empty = this.state.rule == all

    return (
      <CheckItem label="HBV-DNA" btnName="添加HBV-DNA条件" empty={empty} onReset={this.onReset}>
        <div className="select-hbv-dna">
          <Select1 selectItems={hbvDNAOptions} value={this.state.rule} onSelect={({value}) => this.setState({rule: value})}/>
        </div>
        <input placeholder="系数"
               className="input"
               value={this.state.base}
               onChange={e => this.setState({base: e.target.value})}
               disabled={this.state.rule == all}
        />
        <span className="unit-txt">E+</span>
        <input placeholder="数量级"
               className="input"
               value={this.state.power}
               onChange={e => this.setState({power: e.target.value})}
               disabled={this.state.rule == all}
        />
        <span className="unit-txt">IU/mL</span>
      </CheckItem>
    )
  }
}

HBV_DNA.defaultProps = {
  rule: all
}

HBV_DNA.propTypes = {
  rule: React.PropTypes.string,
  base: React.PropTypes.string,
  power: React.PropTypes.string,
}

export default HBV_DNA
