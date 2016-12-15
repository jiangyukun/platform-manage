/**
 * Created by jiangyu2016 on 16/10/15.
 */

import React, {Component} from 'react'
import {Link} from 'react-router'
import Menu from 'antd/lib/menu'
import Icon from 'antd/lib/icon'

export default class Nav extends Component {
    constructor() {
        super()
        this.state = {current: '1'}
    }

    handleClick(e) {
        this.setState({
            current: e.key
        })
    }

    render() {
        let path = ''
        let prefix = ''
        if (process.env.NODE_ENV == 'production') {
            prefix = 'platform/'
        }
        if (process.env.NODE_ENV == 'inline') {
            prefix = 'platform/'
            path = 'inline/'
        }
        if (process.env.NODE_ENV == 'dev') {
            path = 'dev/'
        }

        function getPath(page) {
            return prefix + path + page
        }

        const SubMenu = Menu.SubMenu
        const Item = Menu.Item

        return (
            <nav>
                <div className="hidden-folded padder m-t m-b-sm text-muted text-xs">
                    <span>导航</span>
                </div>

                <Menu theme="dark"
                      defaultOpenKeys={['sub1']}
                      onClick={e => this.handleClick(e)}
                      selectedKeys={[this.state.current]}
                      mode="inline"
                >
                    <SubMenu key="sub1" title={<span><Icon type="desktop"/><span>患者管理</span></span>}>
                        <Item key="1">
                            <Link to={getPath('node-auditing')}>
                                <span>病人审核</span>
                            </Link>
                        </Item>
                        <Item key="2">
                            <a href="platform/home.html#/app/patient-edit">
                                <span>病人修改</span>
                            </a>
                        </Item>
                        <Item key="3">
                            <a href="platform/home.html#/app/laboratory-sheet">
                                <span>化验单查看</span>
                            </a>
                        </Item>
                    </SubMenu>

                    <SubMenu key="sub2" title={<span><Icon type="desktop"/><span>APP管理</span></span>}>
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


                    <SubMenu key="sub3" title={<span><Icon type="desktop"/><span>医生管理</span></span>}>
                        <Item key="3_1">
                            <a href="platform/home.html#/app/doctor-auditing">
                                <span>医生管理</span>
                            </a>
                        </Item>
                        <Item key="3_2">
                            <Link to={getPath('hospital-manage')}>
                                <span>医院管理</span>
                            </Link>
                        </Item>
                    </SubMenu>


                    <Item key="5_1">
                        <a href="chat-system-new/chat.html" target="_blank" style={{display: 'block'}}>
                            <i className="glyphicon glyphicon-comment icon text-success"></i>
                            <span style={{marginLeft: '8px'}}>聊天系统</span>
                        </a>
                    </Item>


                    <SubMenu key="sub6" title={<span><Icon type="desktop"/><span>报表统计</span></span>}>
                        <Item key="6_1">
                            <Link to={getPath('patient-situation-statistics')}>
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
