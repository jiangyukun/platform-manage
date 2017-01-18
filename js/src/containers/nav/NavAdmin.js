/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React, {Component} from 'react'
import {Link, routerShape} from 'react-router'
import Menu from 'antd/lib/menu'
import Icon from 'antd/lib/icon'

import {getPath} from '../../core/utils'

export default class NavAdmin extends Component {
    constructor(props, context) {
        super(props, context)
        this.state = {current: context.router.getCurrentLocation().pathname}
    }

    handleClick(e) {
        const key = e.key
        if (key == 'chat-system') {
            return
        }
        this.setState({
            current: e.key
        })
    }

    render() {
        const SubMenu = Menu.SubMenu
        const Item = Menu.Item

        const nodeAuditing = getPath('node-auditing') // 节点审核
        const patientEdit = getPath('patient-edit') // 病人编辑
        const laboratorySheet = getPath('laboratory-sheet') // 化验单查看
        const doctorAuditing = getPath('doctor-auditing') // 医生审核
        const outPatientTime = getPath('out-patient-time') // 医生门诊时间
        const hospitalManage = getPath('hospital-manage') // 医院管理
        const appUpdate = getPath('app-update') // app更新
        const patientSituationStatistics = getPath('patient-situation-statistics') //病人情况统计
        const hospitalAssayReport = getPath('hospital-assay-report') // 中心验单情况表
        const smsManage = getPath('sms-manage') // 短信

        const openMenu = []
        switch (this.state.current) {
            case nodeAuditing:
            case patientEdit:
            case laboratorySheet:
                openMenu.push('-PATIENT-')
                break
            case doctorAuditing:
            case hospitalManage:
            case outPatientTime:
                openMenu.push('-DOCTOR-')
                break
            case appUpdate:
                openMenu.push('-APP-')
                break
            case patientSituationStatistics:
            case hospitalAssayReport:
                openMenu.push('-STATISTICS-')
                break
            case smsManage:
                openMenu.push('-SYSTEM-')
                break
        }

        return (
            <nav>
                <div className="hidden-folded padder m-t m-b-sm text-muted text-xs">
                    <span>导航</span>
                </div>

                <Menu theme="dark"
                      onClick={e => this.handleClick(e)}
                      defaultOpenKeys={openMenu}
                      selectedKeys={[this.state.current]}
                      mode="inline"
                >
                    <SubMenu key="-PATIENT-" title={<span><Icon type="desktop"/><span>患者管理</span></span>}>
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
                    </SubMenu>

                    <SubMenu key="-DOCTOR-" title={<span><Icon type="desktop"/><span>医生管理</span></span>}>
                        <Item key={doctorAuditing}>
                            <Link to={doctorAuditing}>
                                <span>医生管理</span>
                            </Link>
                        </Item>
                        <Item key={outPatientTime}>
                            <Link to={outPatientTime}>
                                <span>医生门诊时间</span>
                            </Link>
                        </Item>
                        <Item key={hospitalManage}>
                            <Link to={hospitalManage}>
                                <span>医院管理</span>
                            </Link>
                        </Item>
                    </SubMenu>

                    <SubMenu key="-APP-" title={<span><Icon type="desktop"/><span>APP管理</span></span>}>
                        <Item key={appUpdate}>
                            <Link to={appUpdate}>
                                <span>App更新</span>
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
                        <Item key="2_3">
                            <a>
                                <span>群组维护</span>
                            </a>
                        </Item>
                    </SubMenu>


                    <SubMenu key="-STATISTICS-" title={<span><Icon type="desktop"/><span>报表统计</span></span>}>
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
                        {/*<Item key="6_2">
                         <a>
                         <span>用户统计</span>
                         </a>
                         </Item>
                         <Item key="6_3">
                         <a>
                         <span>入组情况统计</span>
                         </a>
                         </Item>
                         <Item key="6_4">
                         <a>
                         <span>聊天记录报表</span>
                         </a>
                         </Item>*/}
                        <Item key="6_5">
                            <a href="platform/home.html#/app.score-statistics">
                                <span>在线医生评分</span>
                            </a>
                        </Item>
                    </SubMenu>

                    <Item key="chat-system">
                        <a href="chat-system-new/chat.html" target="_blank" style={{display: 'block'}}>
                            <i className="glyphicon glyphicon-comment icon text-success"></i>
                            <span style={{marginLeft: '8px'}}>聊天系统</span>
                        </a>
                    </Item>

                    <SubMenu key="-SYSTEM-" title={<span><Icon type="desktop"/><span>系统管理</span></span>}>
                        <Item key={smsManage}>
                            <Link to={smsManage}>
                                <span>短信系统</span>
                            </Link>
                        </Item>

                        {/*<Item key="7_3">
                         <a >
                         <span>后台账号管理</span>
                         </a>
                         </Item>*/}


                    </SubMenu>


                </Menu>

                {/*患者管理*/}

                {/*医生管理*/}

                {/*报表统计*/}

            </nav>
        )
    }
}

NavAdmin.contextTypes = {
    router: routerShape
}
