/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React, {Component} from 'react'
import classnames from 'classnames'
import {connect} from 'react-redux'

class AppContent extends Component {

  render() {
    let show = !this.props.app.settings.asideMessage
    return (
      <div className="app-content">
        <div className="app-content-body fade-in-up">
          {this.props.children}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    app: state.app
  }
}

export default connect(mapStateToProps)(AppContent)
