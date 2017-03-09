/**
 * Created by jiangyukun on 2017/3/7.
 */
import React from 'react'

import Select1 from '../../../components/core/Select1'
import CheckItem from '../check/CheckItem'

import {all, altOptions} from '../../../constants/smart-analytic-constant'

class ALT extends React.Component {
  constructor(props) {
    super()
    this.uid = 1
    this.state = {
      altList: props.altList
    }
  }

  getValue() {
    return this.state.altList
  }

  addAlt = () => {
    this.state.altList.splice(this.state.altList.length, 0, {
      id: this.uid++
    })
    this.forceUpdate()
  }

  removeAlt = (index) => {
    this.state.altList.splice(index, 1)
    this.forceUpdate()
  }

  onResetAlt = () => {
    this.setState({
      altList: [{rule: all, number: ''}]
    })
  }

  handleNumberChange = (e, index) => {
    this.state.altList[index].number = e.target.value
    this.forceUpdate()
  }

  handleRuleChange = (value, index) => {
    if (value == all) {
      this.state.altList[index].number = ''
    }
    this.state.altList[index].rule = value
    this.forceUpdate()
  }

  render() {
    let empty = true
    this.state.altList.forEach(alt => {
      if (alt.rule != all) {
        empty = false
      }
    })

    return (
      <CheckItem label="ALT" btnName="添加ALT条件" onReset={this.onResetAlt} empty={empty}>
        {
          this.state.altList.map((alt, index) => {
            return (
              <div key={index} className="alt-form">
                <div className="select-alt-condition">
                  <Select1 selectItems={altOptions} value={alt.rule} onSelect={({value}) => this.handleRuleChange(value, index)}/>
                </div>
                <input placeholder="输入数值"
                       className="input"
                       value={alt.number || ''}
                       disabled={alt.rule == all}
                       onChange={e => this.handleNumberChange(e, index)}/>
                <span className="unit-txt">U/L</span>
                <div className="inline-block">
                  {
                    this.state.altList.length == 2 && index == 1 && (
                      <a className="icon-wrap">
                        <i className="minus-svg-icon" onClick={() => this.removeAlt(index)}></i>
                      </a>
                    )
                  }
                  {
                    this.state.altList.length == 1 && (
                      <a className="icon-wrap">
                        <i className="plus-svg-icon" onClick={this.addAlt}></i>
                      </a>
                    )
                  }
                </div>
              </div>
            )
          })
        }
      </CheckItem>
    )
  }
}

ALT.defaultProps = {
  altList: [{rule: all, number: ''}]
}

ALT.propTypes = {
  altList: React.PropTypes.array
}

export default ALT
