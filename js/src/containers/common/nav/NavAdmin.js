/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React, {Component} from 'react'
import {Link, routerShape} from 'react-router'
import Menu from 'antd/lib/menu'

import {getPath} from '../../../core/utils'

class NavAdmin extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {current: context.router.getCurrentLocation().pathname}
  }

  handleClick(e) {
    const key = e.key
    if (key == 'chat-system') {
      return
    }
    this.setState({current: e.key})
  }

  render() {
    const SubMenu = Menu.SubMenu
    const Item = Menu.Item

    const nodeAuditing = getPath('node-auditing') // 节点审核
    const patientEdit = getPath('patient-edit') // 病人编辑
    const laboratorySheet = getPath('laboratory-sheet') // 化验单查看
    const takeMedicineRecord = getPath('take-medicine-record') // 服药记录

    const doctorAuditing = getPath('doctor-auditing') // 医生审核
    const outPatientTime = getPath('out-patient-time') // 医生门诊时间
    const todoWorkTrack = getPath('todo-work-track') // 医生门诊时间
    const hospitalManage = getPath('hospital-manage') // 医院管理

    const smartAnalyticSystem = getPath('smart-analytic-system') // 智能分析系统
    const appUpdate = getPath('app-update') // APP更新

    const patientSituationStatistics = getPath('patient-situation-statistics') //病人情况统计
    const hospitalAssayReport = getPath('hospital-assay-report') // 中心验单情况表
    const doctorComprehensiveScore = getPath('doctor-comprehensive-score') // 医生综合评分
    const enrollmentSituation = getPath('enrollment-situation') // 入组情况统计
    const onlineDoctor = getPath('online-doctor') // 在线医生评分
    const historyMessage = getPath('history-message') // 历史记录报表

    const smsManage = getPath('sms-manage') // 短信
    const chatSystem = getPath('chat-system') // 聊天系统
    const consoleAccountManage = getPath('console-account-manage') // 后台账号管理
    const authorityRoleManage = getPath('authority-role-manage') // 权限分组管理

    const openMenu = []
    switch (this.state.current) {
      case nodeAuditing:
      case patientEdit:
      case laboratorySheet:
      case takeMedicineRecord:
        openMenu.push('-PATIENT-')
        break
      case doctorAuditing:
      case hospitalManage:
      case todoWorkTrack:
      case outPatientTime:
        openMenu.push('-DOCTOR-')
        break
      case appUpdate:
      case smartAnalyticSystem:
        openMenu.push('-APP-')
        break
      case patientSituationStatistics:
      case hospitalAssayReport:
      case doctorComprehensiveScore:
      case enrollmentSituation:
      case onlineDoctor:
      case historyMessage:
        openMenu.push('-STATISTICS-')
        break
      case smsManage:
      case consoleAccountManage:
      case authorityRoleManage:
        openMenu.push('-SYSTEM-')
        break
    }

    return (
      <nav>
        <div className="navigate-text">
          <span>导航</span>
        </div>

        <Menu theme="dark"
              onClick={e => this.handleClick(e)}
              defaultOpenKeys={openMenu}
              selectedKeys={[this.state.current]}
              mode="inline"
        >
          <SubMenu key="-PATIENT-" title={<span><i className="patient-manage"></i><span>患者管理</span></span>}>
            <Item key={nodeAuditing}>
              <Link to={nodeAuditing}>
                <span>病人审核</span>
              </Link>
            </Item>
            <Item key={patientEdit}>
              <Link to={patientEdit}>
                <span>病人修改</span>
              </Link>
            </Item>
            <Item key={laboratorySheet}>
              <Link to={laboratorySheet}>
                <span>化验单查看</span>
              </Link>
            </Item>
            <Item key={takeMedicineRecord}>
              <Link to={takeMedicineRecord}>
                <span>服药确认记录</span>
              </Link>
            </Item>
          </SubMenu>

          <SubMenu key="-DOCTOR-" title={<span><i className="doctor-svg-icon"></i><span>医生管理</span></span>}>
            <Item key={doctorAuditing}>
              <Link to={doctorAuditing}>
                <span>医生管理</span>
              </Link>
            </Item>
            <Item key={hospitalManage}>
              <Link to={hospitalManage}>
                <span>医院管理</span>
              </Link>
            </Item>
            <Item key={outPatientTime}>
              <Link to={outPatientTime}>
                <span>医生门诊时间</span>
              </Link>
            </Item>
            <Item key={todoWorkTrack}>
              <Link to={todoWorkTrack}>
                <span>待办工作跟踪</span>
              </Link>
            </Item>
          </SubMenu>

          <SubMenu key="-APP-" title={<span><i className="app-svg-icon"></i><span>APP管理</span></span>}>
            {/*<Item key={appUpdate}>
             <Link to={appUpdate}>
             <span>App更新</span>
             </Link>
             </Item>*/}
            <Item key={smartAnalyticSystem}>
              {/*<i className="smart-analytic-system"></i>*/}
              <Link to={smartAnalyticSystem}>
                <span>智能分析系统</span>
              </Link>
            </Item>

            <Item key="2_1">
              <a href="platform/home.html#/app/slider-config">
                <span>轮播图管理</span>
              </a>
            </Item>
            <Item key="2_2">
              <a href="platform/home.html#/app/knowledge-base">
                <span>知识库维护</span>
              </a>
            </Item>
            {/*<Item key="2_3">
             <a>
             <span>群组维护</span>
             </a>
             </Item>*/}
          </SubMenu>

          <SubMenu key="-STATISTICS-" title={<span><i className="statistics-svg-icon"></i><span>报表统计</span></span>}>
            <Item key={historyMessage}>
              <Link to={historyMessage}>
                <span>聊天记录报表</span>
              </Link>
            </Item>
            <Item key={hospitalAssayReport}>
              <Link to={hospitalAssayReport}>
                <span>中心验单情况表</span>
              </Link>
            </Item>
            <Item key={patientSituationStatistics}>
              <Link to={patientSituationStatistics}>
                <span>病人情况报表</span>
              </Link>
            </Item>
            <Item key={doctorComprehensiveScore}>
              <Link to={doctorComprehensiveScore}>
                <span>医生综合评分</span>
              </Link>
            </Item>
            <Item key={enrollmentSituation}>
              <Link to={enrollmentSituation}>
                <span>入组情况统计</span>
              </Link>
            </Item>
            <Item key={onlineDoctor}>
              <Link to={onlineDoctor}>
                <span>在线医生评分</span>
              </Link>
            </Item>
          </SubMenu>

          <SubMenu key="-SYSTEM-" title={<span><i className="system-manage-svg-icon"></i><span>系统管理</span></span>}>
            <Item key={chatSystem}>
              <a href="chat-system-new/chat.html" target="_blank" style={{display: 'block'}}>
                {/*<i className="chat-svg-icon"></i>*/}
                <span>聊天系统</span>
              </a>
            </Item>
            <Item key={smsManage}>
              <Link to={smsManage}>
                <span>短信系统</span>
              </Link>
            </Item>
            <Item key={consoleAccountManage}>
              <Link to={consoleAccountManage}>
                <span>后台账号管理</span>
              </Link>
            </Item>
            <Item key={authorityRoleManage}>
              <Link to={authorityRoleManage}>
                <span>权限分组管理</span>
              </Link>
            </Item>

          </SubMenu>
        </Menu>
      </nav>
    )
  }
}

NavAdmin.contextTypes = {
  router: routerShape
}

export default NavAdmin
