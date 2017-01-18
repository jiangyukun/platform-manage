/**
 * Created by jiangyukun on 2016/12/29.
 */
import React from 'react'
import {Route} from 'react-router'

import ManagementPlatformApp from '../containers/ManagementPlatformApp'
import NodeAuditing from '../containers/pages/node-auditing/NodeAuditing'
import PatientEdit from '../containers/pages/patient-edit/PatientEdit'
import LaboratorySheet from '../containers/pages/laboratory-sheet/LaboratorySheet'
import DoctorAuditing from '../containers/pages/doctor-auditing/DoctorAuditing'
import HospitalManage from '../containers/pages/hospital-manage/HospitalManage'
import AppUpdate from '../containers/pages/app-update/AppUpdate'
import PatientSituationStatistics from '../containers/pages/statistics/patient-situation/PatientSituationStatistics'
import HospitalAssayReport from '../containers/pages/statistics/hospital-assay-report/HospitalAssayReport'
import SmsManage from '../containers/pages/sms-manage/SmsManage'
import OutPatientTime from '../containers/pages/out-patient-time/OutPatientTime'

export default function getPageRoute(path) {
    return (
        <Route path={path} component={ManagementPlatformApp}>
            <Route path="node-auditing" component={NodeAuditing}/>
            <Route path="patient-edit" component={PatientEdit}/>
            <Route path="laboratory-sheet" component={LaboratorySheet}/>
            <Route path="doctor-auditing" component={DoctorAuditing}/>
            <Route path="hospital-manage" component={HospitalManage}/>
            <Route path="app-update" component={AppUpdate}/>
            <Route path="patient-situation-statistics" component={PatientSituationStatistics}/>
            <Route path="hospital-assay-report" component={HospitalAssayReport}/>
            <Route path="sms-manage" component={SmsManage}/>
            <Route path="out-patient-time" component={OutPatientTime}/>
        </Route>
    )
}
