/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React from 'react'
import {Route} from 'react-router'
import ManagementPlatformApp from '../containers/ManagementPlatformApp'
import NodeAuditing from '../containers/pages/node-auditing/NodeAuditing'
import PatientEdit from '../containers/pages/patient-edit/PatientEdit'
import LaboratorySheet from '../containers/pages/laboratory-sheet/LaboratorySheet'
import HospitalManage from '../containers/pages/hospital-manage/HospitalManage'
import PatientSituationStatistics from '../containers/pages/statistics/patient-situation/PatientSituationStatistics'

export default (
    <Route path="platform">
        <Route path="inline" component={ManagementPlatformApp}>
            <Route path="node-auditing" component={NodeAuditing}/>
            <Route path="patient-edit" component={PatientEdit}/>
            <Route path="laboratory-sheet" component={LaboratorySheet}/>
            <Route path="hospital-manage" component={HospitalManage}/>
            <Route path="patient-situation-statistics" component={PatientSituationStatistics}/>
        </Route>
    </Route>
)
