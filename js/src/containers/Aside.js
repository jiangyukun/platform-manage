/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React, {Component, PropTypes} from 'react'
import NavAdmin from './nav/NavAdmin'
import NavCrc from './nav/NavCrc'

export default class Aside extends Component {
  render() {
    return (
      <div className="app-aside hidden-xs bg-black">
        <div className="aside-wrap">
          <div className="navi-wrap">
            {this.context.role == 'admin' && <NavAdmin/>}
            {this.context.role == 'crc' && <NavCrc/>}
          </div>
        </div>
      </div>
    )
  }
}

Aside.contextTypes = {
  role: PropTypes.string
}
