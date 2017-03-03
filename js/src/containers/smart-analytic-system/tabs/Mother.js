/**
 * Created by jiangyukun on 2017/3/3.
 */
import React, {Component, PropTypes} from 'react'

import Select1 from '../../../components/core/Select1'
import CheckItem from '../check/CheckItem'
import FiveHepatitisBSituation from '../check/FiveHepatitisBSituation'

class Mother extends Component {
  uid = 2
  state = {
    takeMedicineList: [1]
  }

  addTakeMedicine = (index) => {
    this.state.takeMedicineList.splice(index + 1, 0, this.uid++)
    this.forceUpdate()
  }

  removeTakeMedicine = (index) => {
    this.state.takeMedicineList.splice(index, 1)
    this.forceUpdate()
  }

  onResetTakeMedicine = () => {
    this.setState({takeMedicineList: [1]})
  }

  render() {
    let hbvDNAOptions = [
      {value: '1', text: '>'},
      {value: '2', text: '>='},
      {value: '3', text: '='},
      {value: '4', text: '<'},
      {value: '5', text: '<='},
      {value: '6', text: '阴性'},
      {value: '7', text: '阳性'},
      {value: '8', text: '无数据'},
    ]

    return (
      <div className="mother-situation">
        <FiveHepatitisBSituation/>
        <CheckItem label="HBV-DNA" btnName="添加HBV-DNA条件">
          <div className="select-hbv-dna">
            <Select1 selectItems={hbvDNAOptions}/>
          </div>
          <input placeholder="系数" className="input"/>
          <span className="unit-txt">E+</span>
          <input placeholder="数量级" className="input"/>
          <span className="unit-txt">IU/mL</span>
        </CheckItem>
        <CheckItem label="ALT" btnName="添加ALT条件">
          a
        </CheckItem>
        <CheckItem label="肝脏B超" btnName="添加肝脏B超条件">
          b
        </CheckItem>
        <CheckItem label="用药情况" btnName="添加用药情况条件" onReset={this.onResetTakeMedicine}>
          {
            this.state.takeMedicineList.map((key, index) => {
              return (
                <div key={key} className="single-take-medicine-item">
                  <div className="take-medicine-situation">
                    <Select1 selectItems={hbvDNAOptions}/>
                  </div>
                  <input placeholder="输入药名" className="input"/>
                  <span className="unit-txt">或</span>
                  <input placeholder="输入药名" className="input"/>
                  <a className="icon-wrap">
                    <i className="minus-svg-icon" onClick={() => this.removeTakeMedicine(index)}></i>
                  </a>
                  <a className="icon-wrap">
                    <i className="plus-svg-icon" onClick={() => this.addTakeMedicine(index)}></i>
                  </a>
                </div>
              )
            })
          }
        </CheckItem>
      </div>
    )
  }
}

export default Mother
