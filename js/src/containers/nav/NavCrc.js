/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React, {Component} from 'react'
import Menu from 'antd/lib/menu'
import Icon from 'antd/lib/icon'
import {Link} from 'react-router'

import {getPath} from '../../core/utils'

export default class NavCrc extends Component {
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
        const SubMenu = Menu.SubMenu
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
                        <Menu.Item key="1">
                            <Link to={getPath('node-auditing')}>
                                <span>病人审核</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <a href="platform/home.html#/app/laboratory-sheet">
                                <span>化验单查看</span>
                            </a>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </nav>
        )
    }
}
