/**
 * Created by jiangyukun on 2017/3/7.
 */
import React from 'react'
import {fromJS, List} from 'immutable'

import Select1 from '../../../../components/core/Select1'
import CheckItem from '../../check/CheckItem'

import {all, altOptions} from '../../../../constants/smart-analytic-constant'

const initValue = [{rule: all, number: ''}]

class ALT extends React.Component {
  constructor(props) {
    super()
    this.state = {
      altList: fromJS(props.altList)
    }
  }

  getValue() {
    return this.state.altList.toJS()
  }

  addAlt = () => {
    const altList = this.state.altList.concat(List({rule: all, number: ''}))
    this.setState({altList})
  }

  removeAlt = (index) => {
    const altList = this.state.altList.delete(index)
    this.setState({altList})
  }

  onResetAlt = () => {
    this.setState({altList: fromJS(initValue)})
  }

  handleNumberChange = (e, index) => {
    const altList = this.state.altList.update(index, alt => alt.set('number', e.target.value))
    this.setState({altList})
  }

  handleRuleChange = (value, index) => {
    const altList = this.state.altList.update(index, alt => {
      if (value == all) {
        alt = alt.set('number', '')
      }
      return alt.set('rule', value)
    })
    this.setState({altList})
  }

  render() {
    let empty = true
    const altList = this.state.altList.toJS()
    altList.forEach(alt => {
      if (alt.rule != all) {
        empty = false
      }
    })

    return (
      <CheckItem label="ALT" btnName="添加ALT条件" onReset={this.onResetAlt} empty={empty}>
        {
          altList.map((alt, index) => {
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
                    altList.length == 2 && index == 1 && (
                      <a className="icon-wrap">
                        <i className="minus-svg-icon" onClick={() => this.removeAlt(index)}></i>
                      </a>
                    )
                  }
                  {
                    altList.length == 1 && (
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
  altList: initValue
}

ALT.propTypes = {
  altList: React.PropTypes.array
}

export default ALT
