/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React, {Component, PropTypes} from 'react'
import NavAdmin from './common/nav/NavAdmin'
import NavCrc from './common/nav/NavCrc'

export default class Aside extends Component {
  render() {
    return (
      <div className="app-aside bg-black">
        <div className="aside-wrap">
          <div className="navi-wrap">
            {this.context.role == 'admin' && <NavAdmin route={this.props.route}/>}
            {this.context.role == 'crc' && <NavCrc route={this.props.route}/>}
          </div>
        </div>
      </div>
    )
  }
}

Aside.propTypes = {
  route: PropTypes.object
}

Aside.contextTypes = {
  role: PropTypes.string
}
