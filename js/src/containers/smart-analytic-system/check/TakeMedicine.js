/**
 * Created by jiangyukun on 2017/3/7.
 */
import React from 'react'

import Select1 from '../../../components/core/Select1'
import CheckItem from '../check/CheckItem'

import {all, takeMedicineOption} from '../../../constants/smart-analytic-constant'

class TakeMedicine extends React.Component {
  constructor(props) {
    super()
    this.uid = 1
    this.state = {
      takeMedicineList: props.medicineItems,

      rule: props.rule,
      exception: props.exception,
    }
  }

  addTakeMedicine = () => {
    this.state.takeMedicineList.push('')
    this.forceUpdate()
  }

  removeTakeMedicine = () => {
    this.state.takeMedicineList.pop()
    this.forceUpdate()
  }

  onResetTakeMedicine = () => {
    this.setState({takeMedicineList: ['']})
  }

  render() {
    let empty = this.state.rule == all

    return (
      <CheckItem label="用药情况" btnName="添加用药情况条件" onReset={this.onResetTakeMedicine} empty={empty}>
        <div className="take-medicine-form">
          <div className="take-medicine-situation">
            <Select1 selectItems={takeMedicineOption} value={this.state.rule}/>
          </div>
          {
            this.state.takeMedicineList.map((medicineName, index) => {
              return (
                <span key={index}>
                  {
                    index != 0 && (
                      <span className="unit-txt">或</span>
                    )
                  }
                  <input placeholder="输入药名" className="input" value={medicineName}/>
                  </span>
              )
            })
          }
          <div className="inline-block">
            {
              this.state.takeMedicineList.length > 1 && (
                <a className="icon-wrap">
                  <i className="minus-svg-icon" onClick={this.removeTakeMedicine}></i>
                </a>
              )
            }
            {
              this.state.takeMedicineList.length < 6 && (
                <a className="icon-wrap">
                  <i className="plus-svg-icon" onClick={this.addTakeMedicine}></i>
                </a>
              )
            }
          </div>
        </div>
      </CheckItem>
    )
  }
}

TakeMedicine.defaultProps = {
  rule: all,
  medicineItems: ['']
}

TakeMedicine.propTypes = {
  rule: React.PropTypes.string,
  medicineItems: React.PropTypes.array
}

export default TakeMedicine
