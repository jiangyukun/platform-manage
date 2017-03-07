/**
 * Created by jiangyukun on 2017/3/3.
 */
import React, {Component, PropTypes} from 'react'

import FiveHepatitisBSituation from '../check/FiveHepatitisBSituation'
import HBV_DNA from '../check/HBV_DNA'
import ALT from '../check/ALT'
import LiverB_Ultrasound from '../check/LiverB_Ultrasound'
import TakeMedicine from '../check/TakeMedicine'

import {all} from '../../../constants/smart-analytic-constant'

class AddMother extends Component {

  getValue() {
    let result = {}
    const {first, second, third, four, five} = this.fiveHepatitisB.getValue()
    if (first != all) {
      result['mother_HBsAg'] = first
    }
    if (second != all) {
      result['mother_HBsAb'] = second
    }
    if (third != all) {
      result['mother_HBeAg'] = third
    }
    if (four != all) {
      result['mother_HBeAb'] = four
    }
    if (five != all) {
      result['mother_HBcAb'] = five
    }
    let hbvDNA = this._hbvDNA.getValue()
    if (hbvDNA.rule != all) {
      result['mother_HBV_DNA_Prefix'] = hbvDNA.rule
      result['mother_HBV_DNA_Modulus'] = hbvDNA.base
      result['mother_HBV_DNA_Up'] = hbvDNA.power
    }
    return result
  }

  render() {
    return (
      <div className="mother-situation">
        <FiveHepatitisBSituation ref={c => this.fiveHepatitisB = c}/>
        <HBV_DNA ref={c => this._hbvDNA = c}/>
        <ALT/>
        <LiverB_Ultrasound/>
        <TakeMedicine/>
      </div>
    )
  }
}

AddMother.propTypes = {}

export default AddMother
