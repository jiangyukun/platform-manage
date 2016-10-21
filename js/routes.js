/**
 * Created by jiangyu2016 on 16/10/15.
 */

import React from 'react'
import {Route, IndexRoute, Redirect} from 'react-router'

import App from './containers/App'
import DoctorAuditing from './components/pages/doctor-auditing/DoctorAuditing'
import PatientAuditing from './components/pages/patient-auditing/PatientAuditing'

export default (
    <Route path="/">
        <Redirect from="" to="/app/patient-auditing"/>
        <Route path="/app" component={App}>
            <Route path="patient-auditing" component={PatientAuditing}/>
            <Route path="patient-edit" component={DoctorAuditing}/>
            <Route path="laboratory-sheet" component={DoctorAuditing}/>
            <Route path="doctor-auditing" component={DoctorAuditing}/>
            <Route path="slider-config" component={DoctorAuditing}/>
            <Route path="knowledge-base" component={DoctorAuditing}/>
            <Route path="score-statistics" component={DoctorAuditing}/>
        </Route>
    </Route>
)
