/**
 * Created by jiangyukun on 2017/3/17.
 */
import getAuthority from '../getAuthority'

export default function getRoute(pageList, pageName) {
  return function node__auditing(nextState, cb) {
    require.ensure([], (require) => {
      const Component = require('../../containers/patient-record-info/PatientRecordInfo').default
      cb(null, getAuthority(pageList, pageName, Component))
    })
  }
}
