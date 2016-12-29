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
        this.setState({
            current: e.key
        })
    }

    render() {
        const SubMenu = Menu.SubMenu
        const Item = Menu.Item

        const nodeAuditing = getPath('node-auditing')
        const patientEdit = getPath('patient-edit')
        const laboratorySheet = getPath('laboratory-sheet')
        const doctorAuditing = getPath('doctor-auditing')
        const hospitalManage = getPath('hospital-manage')
        const appUpdate = getPath('app-update')
        const patientSituationStatistics = getPath('patient-situation-statistics')

        return (
            <nav>
                <div className="hidden-folded padder m-t m-b-sm text-muted text-xs">
                    <span>导航</span>
                </div>

                <Menu theme="dark"
                      defaultOpenKeys={['sub1', 'sub3', 'sub2']}
                      onClick={e => this.handleClick(e)}
                      selectedKeys={[this.state.current]}
                      mode="inline"
                >
                    <SubMenu key="sub1" title={<span><Icon type="desktop"/><span>患者管理</span></span>}>
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

                    <SubMenu key="sub3" title={<span><Icon type="desktop"/><span>医生管理</span></span>}>
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
                    </SubMenu>

                    <SubMenu key="sub2" title={<span><Icon type="desktop"/><span>APP管理</span></span>}>
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


                    <Item key="5_1">
                        <a href="chat-system-new/chat.html" target="_blank" style={{display: 'block'}}>
                            <i className="glyphicon glyphicon-comment icon text-success"></i>
                            <span style={{marginLeft: '8px'}}>聊天系统</span>
                        </a>
                    </Item>

                    <SubMenu key="sub6" title={<span><Icon type="desktop"/><span>报表统计</span></span>}>
                        <Item key={patientSituationStatistics}>
                            <Link to={patientSituationStatistics}>
                                <span>病人情况报表</span>
                            </Link>
                        </Item>
                        <Item key="6_2">
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
                        </Item>
                        <Item key="6_5">
                            <a href="platform/home.html#/app.score-statistics">
                                <span>在线医生评分</span>
                            </a>
                        </Item>
                    </SubMenu>

                    <SubMenu key="sub7" title={<span><Icon type="desktop"/><span>后台管理</span></span>}>
                        <Item key="7_1">
                            <a >
                                <span>后台账号管理</span>
                            </a>
                        </Item>
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
