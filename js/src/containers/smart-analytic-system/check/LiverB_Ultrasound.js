/**
 * Created by jiangyukun on 2017/3/7.
 */
import React from 'react'

import Select1 from '../../../components/core/Select1'
import CheckItem from '../check/CheckItem'

import {all, liverBOptions} from '../../../constants/smart-analytic-constant'

class LiverB_Ultrasound extends React.Component {
  constructor(props) {
    super()
    this.state = {
      rule: props.rule,
      exception: props.exception,
    }
  }

  render() {
    let empty = this.state.rule == all

    return (
      <CheckItem label="肝脏B超" btnName="添加肝脏B超条件" empty={empty}>
        <div className="liver-b-ultrasound-select">
          <Select1 selectItems={liverBOptions} value={this.state.rule} onSelect={({value}) => this.setState({rule: value})}/>
        </div>
        <input placeholder="输入异常" className="input"
               disabled={this.state.rule == all}
               value={this.state.exception} onChange={e => this.setState({exception: e.target.value})}/>
      </CheckItem>
    )
  }
}

LiverB_Ultrasound.defaultProps = {
  rule: all
}

LiverB_Ultrasound.propTypes = {
  rule: React.PropTypes.string,
  exception: React.PropTypes.string
}

export default LiverB_Ultrasound
