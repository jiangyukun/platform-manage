/**
 * Created by jiangyukun on 2017/3/7.
 */
import React from 'react'

import Select1 from '../../../../components/core/Select1'
import CheckItem from '../../check/CheckItem'

import {all, takeMedicineOption, isMedicineNameDisabled} from '../../../../constants/smart-analytic-constant'

class TakeMedicine extends React.Component {
  constructor(props) {
    super()
    this.state = {
      medicineNameList: props.medicineItems,
      rule: props.rule,
    }
  }

  getValue() {
    return this.state
  }

  addTakeMedicine = () => {
    this.state.medicineNameList.push('')
    this.forceUpdate()
  }

  removeTakeMedicine = () => {
    this.state.medicineNameList.pop()
    this.forceUpdate()
  }

  handleMedicineNameChange = (e, index) => {
    this.state.medicineNameList[index] = e.target.value
    this.forceUpdate()
  }

  onResetTakeMedicine = () => {
    this.setState({rule: all, medicineNameList: ['']})
  }

  onSelectChange = ({value}) => {
    if (isMedicineNameDisabled(value)) {
      this.setState({medicineNameList: ['']})
    }
    this.setState({rule: value})
  }

  render() {
    let empty = this.state.rule == all

    return (
      <CheckItem label="用药情况" btnName="添加用药情况条件" onReset={this.onResetTakeMedicine} empty={empty}>
        <div className="take-medicine-form">
          <div className="take-medicine-situation">
            <Select1 selectItems={takeMedicineOption} value={this.state.rule} onSelect={this.onSelectChange}/>
          </div>
          {
            this.state.medicineNameList.map((medicineName, index) => {
              return (
                <span key={index} className="inline-block">
                  {
                    index != 0 && (
                      <span className="unit-txt">或</span>
                    )
                  }
                  <input placeholder="输入药名"
                         className="dynamic-input"
                         value={medicineName}
                         disabled={isMedicineNameDisabled(this.state.rule)}
                         onChange={e => this.handleMedicineNameChange(e, index)}/>
                  </span>
              )
            })
          }
          <div className="inline-block">
            {
              this.state.medicineNameList.length > 1 && (
                <a className="icon-wrap">
                  <i className="minus-svg-icon" onClick={this.removeTakeMedicine}></i>
                </a>
              )
            }
            {
              !isMedicineNameDisabled(this.state.rule) && this.state.medicineNameList.length < 7 && (
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
