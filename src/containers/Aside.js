/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React, {Component, PropTypes} from 'react'
import Nav from './Nav'

class Aside extends Component {
  render() {
    return (
      <div className="app-aside bg-black">
        <div className="aside-wrap">
          <div className="navi-wrap">
            <Nav pageList={this.props.pageList}/>
          </div>
        </div>
      </div>
    )
  }
}

Aside.propTypes = {
  pageList: PropTypes.array
}

export default Aside
