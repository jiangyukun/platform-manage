/**
 * Created by jiangyu2016 on 16/10/15.
 */

import React from 'react'
import {Route} from 'react-router'

import ManagementPlatformApp from '../containers/ManagementPlatformApp'
import NodeAuditing from '../containers/pages/node-auditing/NodeAuditing'
import LaboratorySheet from '../containers/pages/laboratory-sheet/LaboratorySheet'
import HospitalManage from '../containers/pages/hospital-manage/HospitalManage'
import PatientSituationStatistics from '../containers/pages/statistics/patient-situation/PatientSituationStatistics'

export default (
    <Route>
        <Route path="dev" component={ManagementPlatformApp}>
            <Route path="node-auditing" component={NodeAuditing}/>
            <Route path="laboratory-sheet" component={LaboratorySheet}/>
            <Route path="hospital-manage" component={HospitalManage}/>
            <Route path="patient-situation-statistics" component={PatientSituationStatistics}/>
        </Route>
    </Route>
)
