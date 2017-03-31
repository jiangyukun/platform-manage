/**
 * Created by jiangyukun on 2016/12/29.
 */
import React from 'react'
import {Route} from 'react-router'

import {appPageNames} from '../constants/nav'

import PlatformApp from '../containers/PlatformApp'
import IndexPage from '../containers/IndexPage'
import IllegalAuthority from '../containers/IllegalAuthority'

import node__auditing from './lazy-pages/node__auditing'
import patient__edit from './lazy-pages/patient__edit'
import laboratory__sheet from './lazy-pages/laboratory__sheet'
import take__medicine__record from './lazy-pages/take__medicine__record'

import doctor__auditing from './lazy-pages/doctor__auditing'
import hospital__manage from './lazy-pages/hospital__manage'
import out__patient__time from './lazy-pages/out__patient__time'
import todo__work__track from './lazy-pages/todo__work__track'

import smart__analytic__system from './lazy-pages/smart__analytic__system'
import app__update from './lazy-pages/app__update'

import history__message from './lazy-pages/history__message'
import hospital__assay__report from './lazy-pages/hospital__assay__report'
import patient__situation__statistics from './lazy-pages/patient__situation__statistics'
import doctor__comprehensive__score from './lazy-pages/doctor__comprehensive__score'
import enrollment__situation from './lazy-pages/enrollment__situation'
import online__doctor from './lazy-pages/online__doctor'

import sms_manage from './lazy-pages/sms_manage'
import console__account__manage from './lazy-pages/console__account__manage'
import authority__role__manage from './lazy-pages/authority__role__manage'
import patient__record__info from './lazy-pages/patient__record__info'

export default function getPageRoute(path, pageList) {
  const {
    nodeAuditing, patientEdit, laboratorySheet, takeMedicineRecord,
    doctorAuditing, hospitalManage, outPatientTime, todoWorkTrack,
    smartAnalyticSystem, appUpdate,
    historyMessage, hospitalAssayReport, patientSituationStatistics, doctorComprehensiveScore, enrollmentSituation, onlineDoctor,
    smsManage, consoleAccountManage, authorityRoleManage, patientRecordInfo
  } = appPageNames
  const mapper = {
    [nodeAuditing]: node__auditing(pageList, nodeAuditing),
    [patientEdit]: patient__edit(pageList, patientEdit),
    [laboratorySheet]: laboratory__sheet(pageList, laboratorySheet),
    [takeMedicineRecord]: take__medicine__record(pageList, takeMedicineRecord),

    [doctorAuditing]: doctor__auditing(pageList, doctorAuditing),
    [hospitalManage]: hospital__manage(pageList, hospitalManage),
    [outPatientTime]: out__patient__time(pageList, outPatientTime),
    [todoWorkTrack]: todo__work__track(pageList, todoWorkTrack),

    [smartAnalyticSystem]: smart__analytic__system(pageList, smartAnalyticSystem),
    [appUpdate]: app__update(pageList, appUpdate),

    [historyMessage]: history__message(pageList, historyMessage),
    [hospitalAssayReport]: hospital__assay__report(pageList, hospitalAssayReport),
    [patientSituationStatistics]: patient__situation__statistics(pageList, patientSituationStatistics),
    [doctorComprehensiveScore]: doctor__comprehensive__score(pageList, doctorComprehensiveScore),
    [enrollmentSituation]: enrollment__situation(pageList, enrollmentSituation),
    [onlineDoctor]: online__doctor(pageList, onlineDoctor),

    [smsManage]: sms_manage(pageList, smsManage),
    [consoleAccountManage]: console__account__manage(pageList, consoleAccountManage),
    [authorityRoleManage]: authority__role__manage(pageList, authorityRoleManage),
    [patientRecordInfo]: patient__record__info(pageList, patientRecordInfo),
  }

  if (process.env.NODE_ENV != 'production') {
    pageList.push({
      'page_Name': 'patient-record-info'
    })
  }

  return (
    <Route path={path} component={PlatformApp}>
      <Route path="index" component={IndexPage}/>
      {
        pageList.map(page => {
          const pageName = page['page_Name']
          return (
            <Route key={pageName} path={pageName} getComponent={mapper[pageName]}/>
          )
        })
      }
      <Route path=":pathname" component={IllegalAuthority}/>
    </Route>
  )
}
