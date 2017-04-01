/**
 * Created by jiangyukun on 2017/3/3.
 */
import React, {Component, PropTypes} from 'react'

import FiveHepatitisBSituation from '../check/FiveHepatitisBSituation'
import HBV_DNA from '../check/mother/HBV_DNA'
import ALT from '../check/mother/ALT'
import LiverB_Ultrasound from '../check/mother/LiverB_Ultrasound'
import TakeMedicine from '../check/mother/TakeMedicine'

import {all} from '../../../constants/smart-analytic-constant'

class AddMother extends Component {
  getValue() {
    let result = {}
    const {first, second, third, four, five} = this._fiveHepatitisB.getValue()
    result['mother_HBsAg'] = first
    result['mother_HBsAb'] = second
    result['mother_HBeAg'] = third
    result['mother_HBeAb'] = four
    result['mother_HBcAb'] = five

    let hbvDNA = this._hbvDNA.getValue()
    result['mother_HBV_DNA_Prefix'] = hbvDNA.rule
    result['mother_HBV_DNA_Modulus'] = hbvDNA.base
    result['mother_HBV_DNA_Up'] = hbvDNA.power

    let altList = this._alt.getValue()
    if (altList) {
      if (altList[0]) {
        let firstAlt = altList[0]
        result['mother_ALT_First_Prefix'] = firstAlt.rule
        result['mother_ALT_First_Result'] = firstAlt.number
      }
      if (altList[1]) {
        let secondAlt = altList[1]
        result['mother_ALT_Second_Prefix'] = secondAlt.rule
        result['mother_ALT_Second_Result'] = secondAlt.number
      } else {
        result['mother_ALT_Second_Prefix'] = all
      }
    }

    let liverB = this._liverB.getValue()
    result['mother_Liver_B_Prefix'] = liverB.rule
    result['mother_Liver_B_Result'] = liverB.exception

    let takeMedicine = this._takeMedicine.getValue()
    result['mother_Use_Drug_Prefix'] = takeMedicine.rule

    let medicineNameStr = takeMedicine.medicineNameList.reduce((total, medicineName) => total + ',' + medicineName, '')
    if (medicineNameStr.length > 0) {
      medicineNameStr = medicineNameStr.substring(1)
    }
    result['mother_Use_Drug_Name'] = medicineNameStr

    return result
  }

  render() {
    return (
      <div className="mother-situation">
        <FiveHepatitisBSituation ref={c => this._fiveHepatitisB = c}/>
        <HBV_DNA ref={c => this._hbvDNA = c}/>
        <ALT ref={c => this._alt = c}/>
        <LiverB_Ultrasound ref={c => this._liverB = c}/>
        <TakeMedicine ref={c => this._takeMedicine = c}/>
      </div>
    )
  }
}

AddMother.propTypes = {}

export default AddMother
