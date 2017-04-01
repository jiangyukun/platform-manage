/**
 * Created by jiangyukun on 2017/3/3.
 */
import React from 'react'

import PrematureBaby from '../check/baby/PrematureBaby'
import BabyWeight from '../check/baby/BabyWeight'
import FiveHepatitisBSituation from '../check/FiveHepatitisBSituation'
import HBsAbQuantitativeResult from '../check/baby/HBsAbQuantitativeResult'

import {checkNotEmpty} from '../../../constants/smart-analytic-constant'

class AddBaby extends React.Component {
  getValue() {
    let result = {}

    let prematureBabyValue = this._prematureBaby.getValue()

    result['baby_Premature_Children'] = prematureBabyValue.isPrematureBaby

    let babyWeightValue = this._babyWeight.getValue()
    result['baby_Birth_Weight_Prefix'] = babyWeightValue.rule
    result['baby_Birth_Weight_Result'] = babyWeightValue.weight

    const {first, second, third, four, five} = this._fiveHepatitisB.getValue()
    result['baby_HBsAg'] = first
    result['baby_HBsAb'] = second
    result['baby_HBeAg'] = third
    result['baby_HBeAb'] = four
    result['baby_HBcAb'] = five

    let quantitativeResultValue = this._quantitativeResult.getValue()
    result['baby_HBsAb_Prefix'] = quantitativeResultValue.rule
    result['baby_HBsAb_Result'] = quantitativeResultValue.number

    return result
  }

  render() {
    return (
      <div className="baby-situation">

        <PrematureBaby ref={c => this._prematureBaby = c}/>

        <BabyWeight ref={c => this._babyWeight = c}/>

        <FiveHepatitisBSituation ref={c => this._fiveHepatitisB = c}/>

        <HBsAbQuantitativeResult ref={c => this._quantitativeResult = c}/>
      </div>
    )
  }
}

export default AddBaby
