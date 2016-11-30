/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Dropdown, MenuItem} from 'react-bootstrap'
import classnames from 'classnames'

import {toggleAside, toggleMessagePanel} from '../actions/header'

class CustomWrap extends Component {
    render() {
        return (
            <li {...this.props}>{this.props.children}</li>
        )
    }
}

class Header extends Component {

    toggleMessagePanel() {
        this.props.toggleMessagePanel()
    }

    render() {
        let asideFolded = this.props.app.settings.asideFolded

        return (
            <div className="app-header navbar">
                <div className="navbar-header bg-black">
                    <button className="pull-right visible-xs dk" >
                        <i className="glyphicon glyphicon-cog"></i>
                    </button>
                    <button className="pull-right visible-xs">
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
                        <a className="btn no-shadow navbar-btn" onClick={e=>this.props.toggleAside()}>
                            <i className={classnames('fa', 'fa-fw', asideFolded ? 'fa-indent' : 'fa-dedent')}></i>
                        </a>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <a onClick={e=>this.toggleMessagePanel()}>
                                <span className="">消息通知</span>
                                <i className="icon-bell fa-fw"></i>
                                <span className="badge badge-sm up bg-danger pull-right-xs">{this.props.message.unreadTotal || ''}</span>
                            </a>
                        </li>
                        <Dropdown id="dropdown-system-menu" componentClass={CustomWrap}>
                            <Dropdown.Toggle useAnchor={true}>
                                    <span className="thumb-sm avatar pull-right m-t-n-sm m-b-n-sm m-l-sm">
                                        <img src="img/a0.jpg" alt="..."/>
                                        <i className="on md b-white bottom"></i>
                                    </span>
                                <span className="hidden-sm hidden-md">管理员</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="dropdown-menu animated fadeInRight w">
                                <MenuItem onClick={e=>this.props.openSettings()}>
                                    <span>设置</span>
                                </MenuItem>
                                <MenuItem className="divider"></MenuItem>
                                <MenuItem href="access/login.html">
                                    重新登录
                                </MenuItem>
                            </Dropdown.Menu>
                        </Dropdown>
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        app: state.app,
        message: state.message
    }
}

export default connect(mapStateToProps, {toggleAside, toggleMessagePanel})(Header)
