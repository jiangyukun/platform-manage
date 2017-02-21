/**
 * Created by jiangyukun on 2016/11/26.
 */
import React, {Component} from 'react'
import {Router} from 'react-router'
import {Provider} from 'react-redux'
import routes from '../route/routes'

export default class Root extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router routes={routes} history={this.props.history}/>
      </Provider>
    )
  }
}
