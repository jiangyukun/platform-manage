/**
 * Created by jiangyukun on 2017/3/3.
 */
import React, {Component, PropTypes} from 'react'

import FiveHepatitisBSituation from '../check/FiveHepatitisBSituation'
import HBV_DNA from '../check/HBV_DNA'
import ALT from '../check/ALT'
import LiverB_Ultrasound from '../check/LiverB_Ultrasound'
import TakeMedicine from '../check/TakeMedicine'

class EditMother extends Component {
  render() {
    let first = this.props.analyticItem['mother_HBsAg']
    let second = this.props.analyticItem['mother_HBsAb']
    let third = this.props.analyticItem['mother_HBeAg']
    let four = this.props.analyticItem['mother_HBeAb']
    let five = this.props.analyticItem['mother_HBcAb']

    return (
      <div className="mother-situation">
        <FiveHepatitisBSituation
          first={first}
          second={second}
          third={third}
          four={four}
          five={five}
        />

        <HBV_DNA rule=">" base="1" power="1"/>

        <ALT altList={[{id: 1, rule: '>', number: 12}]}/>

        <LiverB_Ultrasound rule="包含" exception="abc"/>

        <TakeMedicine rule="服用过" medicineItems={['1', '2']}/>
      </div>
    )
  }
}

EditMother.propTypes = {
  analyticItem: PropTypes.object
}

export default EditMother
