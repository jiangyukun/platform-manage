/**
 * Created by jiangyukun on 2017/3/3.
 */
import React, {Component, PropTypes} from 'react'
import Radio from 'antd/lib/Radio'

import CheckItem from './CheckItem'
import HepatitisBResult from './HepatitisBResult'

class FiveHepatitisBSituation extends Component {
  state = {
    empty: true
  }

  render() {
    return (
      <CheckItem label="乙肝五项" btnName="添加乙肝五项条件">
        <div className="hepatitis-b-items">
          <section className="hepatitis-b-item">
            <label>HBsAg</label>
            <HepatitisBResult/>
          </section>

          <section className="hepatitis-b-item">
            <label>HBsAb</label>
            <HepatitisBResult/>
          </section>

          <section className="hepatitis-b-item">
            <label>HBeAg</label>
            <HepatitisBResult/>
          </section>

          <section className="hepatitis-b-item">
            <label>HBeAb</label>
            <HepatitisBResult/>
          </section>

          <section className="hepatitis-b-item">
            <label>HBcAb</label>
            <HepatitisBResult/>
          </section>
        </div>
      </CheckItem>
    )
  }
}

export default FiveHepatitisBSituation
