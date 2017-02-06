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
    const Item = Menu.Item

    const nodeAuditing = getPath('node-auditing')
    const laboratorySheet = getPath('laboratory-sheet')

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
            <Item key={nodeAuditing}>
              <Link to={nodeAuditing}>
                <span>病人审核</span>
              </Link>
            </Item>
            <Item key={laboratorySheet}>
              <Link to={laboratorySheet}>
                <span>化验单查看</span>
              </Link>
            </Item>
          </SubMenu>
        </Menu>
      </nav>
    )
  }
}
