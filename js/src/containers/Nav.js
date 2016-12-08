/**
 * Created by jiangyu2016 on 16/10/15.
 */

import React, {Component} from 'react'
import {Link} from 'react-router'

export default class Nav extends Component {
    render() {

        let path = 'pages'
        if (process.env.NODE_ENV == 'backend-server') {
            path = 'backend'
        }

        if (process.env.NODE_ENV == 'dev') {
            path = 'dev'
        }

        function getPath(page) {
            return '/' + path + '/' + page
        }

        return (
            <nav className="navi">
                <ul className="nav">
                    <li className="hidden-folded padder m-t m-b-sm text-muted text-xs">
                        <span>导航</span>
                    </li>

                    {/*患者管理*/}
                    <li className="active">
                        <a className="auto">
                        <span className="pull-right text-muted">
                            <i className="fa fa-fw fa-angle-right text"></i>
                            <i className="fa fa-fw fa-angle-down text-active"></i>
                        </span>
                            <i className="fa fa-wheelchair icon text-primary-dker"></i>
                            <span>患者管理</span>
                        </a>
                        <ul className="nav nav-sub dk">
                            <li className="nav-sub-header">
                                <a>
                                    <span>患者管理</span>
                                </a>
                            </li>
                            <li>
                                <Link to={getPath('node-auditing')}>
                                    <span>病人审核</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/app/patient-edit">
                                    <span>病人修改</span>
                                </Link>
                            </li>
                            <li>
                                <a href="../platform/home.html#/app/laboratory-sheet">
                                    <span>化验单查看</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    {/*APP管理*/}
                    <li className="active">
                        <a className="auto">
                        <span className="pull-right text-muted">
                            <i className="fa fa-fw fa-angle-right text"></i>
                            <i className="fa fa-fw fa-angle-down text-active"></i>
                        </span>
                            <i className="fa fa-wheelchair-alt icon text-primary-dker"></i>
                            <span>APP管理</span>
                        </a>
                        <ul className="nav nav-sub dk">
                            <li className="nav-sub-header">
                                <a>
                                    <span>APP管理</span>
                                </a>
                            </li>
                            <li>
                                <a href="../platform/home.html#/app/slider-config">
                                    <span>轮播图管理</span>
                                </a>
                            </li>
                            <li>
                                <a href="../platform/home.html#/app/knowledge-base">
                                    <span>知识库维护</span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <span>群组维护</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    {/*医生管理*/}
                    <li className="active">
                        <a className="auto">
                        <span className="pull-right text-muted">
                            <i className="fa fa-fw fa-angle-right text"></i>
                            <i className="fa fa-fw fa-angle-down text-active"></i>
                        </span>
                            <i className="glyphicon glyphicon-file icon text-primary-dker"></i>
                            <span>医生管理</span>
                        </a>
                        <ul className="nav nav-sub dk">
                            <li className="nav-sub-header">
                                <Link to="/app">
                                    <span>医生管理</span>
                                </Link>
                            </li>
                            <li>
                                <a href="../platform/home.html#/app/doctor-auditing">
                                    <span>医生管理</span>
                                </a>
                            </li>
                            <li>
                                <Link to={getPath('hospital-manage')}>
                                    <span>医院管理</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a href="../chat-system-new/chat.html" target="_blank">
                            <i className="glyphicon glyphicon-comment icon text-success"></i>
                            <span>聊天系统</span>
                        </a>
                    </li>

                    {/*报表统计*/}
                    <li className="active">
                        <a href className="auto">
                        <span className="pull-right text-muted">
                            <i className="fa fa-fw fa-angle-right text"></i>
                            <i className="fa fa-fw fa-angle-down text-active"></i>
                        </span>
                            <i className="glyphicon glyphicon-list icon text-success"></i>
                            <span>报表统计</span>
                        </a>
                        <ul className="nav nav-sub dk">
                            <li className="nav-sub-header">
                                <a href>
                                    <span>报表统计</span>
                                </a>
                            </li>
                            <li>
                                <a >
                                    <span>用户统计</span>
                                </a>
                            </li>
                            <li>
                                <Link >
                                    <span>入组情况统计</span>
                                </Link>
                            </li>
                            <li>
                                <Link >
                                    <span>聊天记录报表</span>
                                </Link>
                            </li>
                            <li>
                                <Link to={getPath('patient-situation-statistics')}>
                                    <span>病人情况报表</span>
                                </Link>
                            </li>
                            <li>
                                <a href="../platform/home.html#/app.score-statistics">
                                    <span>在线医生评分</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li className="active">
                        <a href className="auto">
                        <span className="pull-right text-muted">
                            <i className="fa fa-fw fa-angle-right text"></i>
                            <i className="fa fa-fw fa-angle-down text-active"></i>
                        </span>
                            <i className="glyphicon glyphicon-user icon text-success"></i>
                            <span>后台管理</span>
                        </a>
                        <ul className="nav nav-sub dk">
                            <li className="nav-sub-header">
                                <a href>
                                    <span>后台管理</span>
                                </a>
                            </li>
                            <li>
                                <a >
                                    <span>后台账号管理</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        )
    }
}
