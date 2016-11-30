/**
 * Created by jiangyu2016 on 16/10/15.
 */

import React from 'react'
import {Route, Redirect} from 'react-router'

import App from './containers/App'
import NodeAuditing from './containers/pages/node-auditing/NodeAuditing'
import HospitalManage from './containers/pages/hospital-manage/HospitalManage'

export default (
    <Route path="/">
        <Redirect from="" to="/app/node-auditing"/>
        <Route path="/app" component={App}>
            <Route path="node-auditing" component={NodeAuditing}/>
            <Route path="hospital-manage" component={HospitalManage}/>

        </Route>
    </Route>
)
