/**
 * Created by jiangyukun on 2017/2/23.
 */
import React, {Component, PropTyps, Children} from 'react'

class Tabs extends Component {
  render() {
    const {children} = this.props
    const navItems = Children.map(children, child => {
      if (!child.props) {
        return null
      }
      if (child.props.title) {
        return (
          <div className="my-tab-nav-item"></div>
        )
      }
    })

    return (
      <div className="my-tabs-container">
        <div className="my-tabs-nav">
          {navItems}
        </div>
        <div className="my-tabs-content">
          {children}
        </div>
      </div>
    )
  }
}

Tabs.propTypes = {}

export default Tabs
