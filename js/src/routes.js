/**
 * Created by jiangyu2016 on 16/10/15.
 */

import React from 'react'
import {Route, Redirect} from 'react-router'

import App from './containers/App'
import NodeAuditing from './containers/pages/node-auditing/NodeAuditing'
import HospitalManage from './containers/pages/hospital-manage/HospitalManage'
import PatientSituationStatistics from './containers/pages/statistics/patient-situation/PatientSituationStatistics'

let path = 'pages'
if (process.env.NODE_ENV == 'backend-server') {
    path = 'backend'
}

if (process.env.NODE_ENV == 'dev') {
    path = 'dev'
}

export default (
    <Route path="/">
        <Redirect from="" to="/pages/node-auditing"/>
        <Route path={path} component={App}>
            <Route path="node-auditing" component={NodeAuditing}/>
            <Route path="hospital-manage" component={HospitalManage}/>
            <Route path="patient-situation-statistics" component={PatientSituationStatistics}/>
        </Route>
    </Route>
)
