/**
 * Created by jiangyukun on 2017/3/3.
 */
import React, {Component, PropTypes} from 'react'

import CheckItem from './CheckItem'
import HepatitisBResult from './HepatitisBResult'
import {checkAllEmpty, all} from '../../../constants/smart-analytic-constant'

class FiveHepatitisBSituation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      first: props.first,
      second: props.second,
      third: props.third,
      four: props.four,
      five: props.five
    }
  }

  reset = () => {
    this.setState({first: all, second: all, third: all, four: all, five: all})
  }

  getValue() {
    return this.state
  }

  render() {
    const {first, second, third, four, five} = this.state

    let empty = checkAllEmpty(first, second, third, four, five)
    return (
      <CheckItem label="乙肝五项" btnName="添加乙肝五项条件" onReset={this.reset} empty={empty}>
        <div className="hepatitis-b-items">
          <section className="hepatitis-b-item">
            <label>HBsAg</label>
            <HepatitisBResult value={this.state.first} onChange={e => this.setState({first: e.target.value})}/>
          </section>

          <section className="hepatitis-b-item">
            <label>HBsAb</label>
            <HepatitisBResult value={this.state.second} onChange={e => this.setState({second: e.target.value})}/>
          </section>

          <section className="hepatitis-b-item">
            <label>HBeAg</label>
            <HepatitisBResult value={this.state.third} onChange={e => this.setState({third: e.target.value})}/>
          </section>

          <section className="hepatitis-b-item">
            <label>HBeAb</label>
            <HepatitisBResult value={this.state.four} onChange={e => this.setState({four: e.target.value})}/>
          </section>

          <section className="hepatitis-b-item">
            <label>HBcAb</label>
            <HepatitisBResult value={this.state.five} onChange={e => this.setState({five: e.target.value})}/>
          </section>
        </div>
      </CheckItem>
    )
  }
}

FiveHepatitisBSituation.defaultProps = {
  first: all,
  second: all,
  third: all,
  four: all,
  five: all
}

FiveHepatitisBSituation.propTypes = {
  first: PropTypes.string,
  second: PropTypes.string,
  third: PropTypes.string,
  four: PropTypes.string,
  five: PropTypes.string
}

export default FiveHepatitisBSituation
