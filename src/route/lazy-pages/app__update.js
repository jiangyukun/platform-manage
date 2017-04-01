/**
 * Created by jiangyukun on 2017/3/17.
 */
import getAuthority from '../getAuthority'

export default function getRoute(pageList, pageName) {
  return function node__auditing(nextState, cb) {
    require.ensure([], (require) => {
      const Component = require('../../containers/app-update/AppUpdate').default
      cb(null, getAuthority(pageList, pageName, Component))
    })
  }
}
