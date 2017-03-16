/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React, {Component, PropTypes} from 'react'
import {Link, routerShape} from 'react-router'
import Menu from 'antd/lib/menu'

import {getPath} from '../core/utils'

import {
  PATIENT_CATEGORY, DOCTOR_CATEGORY, APP_CATEGORY, STATISTICS_CATEGORY, SYSTEM_CATEGORY,
  pageCategoryMapper, pageInfo, getOpenMenu, appPageNames
} from '../constants/nav'

class Nav extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {current: context.router.getCurrentLocation().pathname}
  }

  handleClick(e) {
    const key = e.key
    if (key == appPageNames.chatSystem || key == appPageNames.sliderManage || key == appPageNames.knowledgeBaseManage) {
      return
    }
    this.setState({current: e.key})
  }

  componentWillMount() {
    const menus = [
      {
        categoryName: PATIENT_CATEGORY,
        title: <span><i className="patient-manage"></i><span>患者管理</span></span>,
        subMenus: []
      },
      {
        categoryName: DOCTOR_CATEGORY,
        title: <span><i className="doctor-svg-icon"></i><span>医生管理</span></span>,
        subMenus: []
      },
      {
        categoryName: APP_CATEGORY,
        title: <span><i className="app-svg-icon"></i><span>APP管理</span></span>,
        subMenus: []
      },
      {
        categoryName: STATISTICS_CATEGORY,
        title: <span><i className="statistics-svg-icon"></i><span>报表统计</span></span>,
        subMenus: []
      },
      {
        categoryName: SYSTEM_CATEGORY,
        title: <span><i className="system-manage-svg-icon"></i><span>系统管理</span></span>,
        subMenus: []
      }
    ]

    // 构建1, 2 级菜单
    this.context.pageList.forEach(page => {
      const pageName = page['page_Name']
      const menu = menus.find(menu => menu.categoryName == pageCategoryMapper[pageName])
      if (!menu) {
        return
      }
      const subMenu = menu.subMenus.find(subMenu => subMenu.pageName == pageName)
      if (subMenu) {
        return
      }
      menu.subMenus.push({
        pageName,
        ...pageInfo[pageName]
      })
    })

    // index 跳转到第一个有权限的页面
    this.menus = menus
    if (this.state.current == getPath('index')) {
      for (let i = 0; i < menus.length; i++) {
        let menu = menus[i]
        if (menu.subMenus.length > 0) {
          let toPage = menu.subMenus[0].to
          if (this.state.current != toPage) {
            this.context.router.replace(toPage)
            this.setState({current: toPage})
          }
          break
        }
      }
    }
  }

  render() {
    const SubMenu = Menu.SubMenu
    const Item = Menu.Item

    // 页面个数少于5个，展开所有1级菜单
    let openCategoryList = []
    if (this.context.pageList.length <= 10) {
      this.menus.map(menu => {
        if (menu.subMenus.length > 0) {
          openCategoryList.push(menu.categoryName)
        }
      })
    } else {
      openCategoryList = getOpenMenu(this.state.current)
    }

    return (
      <nav>
        <div className="navigate-text">
          <span>导航</span>
        </div>

        <Menu theme="dark"
              onClick={e => this.handleClick(e)}
              defaultOpenKeys={openCategoryList}
              selectedKeys={[this.state.current]}
              mode="inline"
        >
          {
            this.menus.map(menu => {
              if (menu.subMenus.length > 0) {
                return (
                  <SubMenu key={menu.categoryName} title={menu.title}>
                    {
                      menu.subMenus.map(subMenu => {
                        if (subMenu.pageName == appPageNames.sliderManage) {
                          return (
                            <Item key="slider-manage">
                              <a href="platform/home.html#/app/slider-config">
                                <span>轮播图管理</span>
                              </a>
                            </Item>
                          )
                        } else if (subMenu.pageName == appPageNames.knowledgeBaseManage) {
                          return (
                            <Item key="knowledge-base-manage">
                              <a href="platform/home.html#/app/knowledge-base">
                                <span>知识库维护</span>
                              </a>
                            </Item>
                          )
                        } else if (subMenu.pageName == 'chat-system') {
                          return (
                            <Item key="chat-system">
                              <a href="chat-system-new/chat.html" target="_blank" style={{display: 'block'}}>
                                <span>聊天系统</span>
                              </a>
                            </Item>
                          )
                        }
                        return (
                          <Item key={subMenu.to}>
                            <Link to={subMenu.to}>
                              <span>{subMenu.text}</span>
                            </Link>
                          </Item>
                        )
                      })
                    }
                  </SubMenu>
                )
              }
              return null
            })
          }
        </Menu>
      </nav>
    )
  }
}

Nav.contextTypes = {
  router: routerShape,
  pageList: PropTypes.array
}

export default Nav
