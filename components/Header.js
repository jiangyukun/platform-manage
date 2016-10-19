/**
 * Created by jiangyu2016 on 16/10/15.
 */

import React, {Component} from 'react'

export default class Header extends Component {
    render() {
        return (
            <div className="app-header navbar">
                <div className="navbar-header bg-black">
                    <button className="pull-right visible-xs dk" ui-toggle-className="show"
                            data-target=".navbar-collapse">
                        <i className="glyphicon glyphicon-cog"></i>
                    </button>
                    <button className="pull-right visible-xs" ui-toggle-className="off-screen" data-target=".app-aside"
                            ui-scroll="app">
                        <i className="glyphicon glyphicon-align-justify"></i>
                    </button>
                    <a href="#/" className="navbar-brand text-lt">
                        <i className="fa fa-lemon-o"></i>
                        <img src="img/logo.png" alt="." className="hide"/>
                        <span className="hidden-folded m-l-xs">{this.props.app.name}</span>
                    </a>
                </div>

                <div className="collapse pos-rlt navbar-collapse box-shadow bg-white-only">
                    <div className="nav navbar-nav hidden-xs">
                        <a href className="btn no-shadow navbar-btn"
                           ng-click="app.settings.asideFolded = !app.settings.asideFolded">
                            <i className="fa {{app.settings.asideFolded ? 'fa-indent' : 'fa-dedent'}} fa-fw"></i>
                        </a>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <a ng-click="app.settings.asideMessage = !app.settings.asideMessage">
                                <span className="">消息通知</span>
                                <i className="icon-bell fa-fw"></i>
                                <span
                                    className="badge badge-sm up bg-danger pull-right-xs">{this.props.messageCount}</span>
                            </a>
                        </li>
                        <li uib-dropdown>
                            <a href uib-dropdown-toggle>
              <span className="thumb-sm avatar pull-right m-t-n-sm m-b-n-sm m-l-sm">
                <img src="img/a0.jpg" alt="..."/>
                <i className="on md b-white bottom"></i>
              </span>
                                <span className="hidden-sm hidden-md">管理员</span> <b className="caret"></b>
                            </a>
                            <ul className="dropdown-menu animated fadeInRight w">
                                <li>
                                    <a ng-click="openSetting()">
                                        <span>设置</span>
                                    </a>
                                </li>
                                <li className="divider"></li>
                                <li>
                                    <a href="access/login.html">重新登录</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

            </div>
        )
    }
}
