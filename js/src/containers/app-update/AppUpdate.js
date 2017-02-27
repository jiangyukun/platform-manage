/**
 * Created by jiangyukun on 2016/12/29.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import classnames from 'classnames'
import {merge} from 'lodash'

import QueryFilter from '../../components/core/QueryFilter'
import FilterItem from '../../components/core/query-filter/FilterItem'
import CustomDateRange from '../../components/core/query-filter/custom/CustomDateRange'
import PaginateList from '../../components/core/PaginateList'
import SmartList from '../../components/core/list/SmartList'
import HeadContainer from '../../components/core/list/HeadContainer'
import BodyContainer from '../../components/core/list/BodyContainer'
import constants from '../../core/constants'
import {getFilterItem} from '../../core/utils'

import * as actions from './app-update'

class AppUpdate extends Component {
  constructor() {
    super()
    this.state = {
      currentIndex: -1,
      loading: false,
      showAdd: false,
      showEdit: false
    }
  }

  beginFetch(newPageIndex) {
    this._paginateList.beginFetch(newPageIndex)
  }

  doFetch() {
    this.setState({currentIndex: -1, loading: true})
    this.props.fetchAppUpdatePaginateList(merge({}, this._queryFilter.getParams(), this._paginateList.getParams()))
      .then(() => this.setState({loading: false}))
  }

  componentDidMount() {
    this.beginFetch()
  }

  render() {
    return (
      <div className="app-function-page">
        <QueryFilter ref={c => this._queryFilter = c} className="ex-big-label"
                     beginFilter={() => this.beginFetch(1)}
                     searchKeyName="key_Words"
        >

          <FilterItem className="middle-filter-item" item={this.props.systemTypeFilterList} paramName="app_System_Type"/>

          <FilterItem className="middle-filter-item" item={this.props.forceUpdateFilterList} paramName="app_Is_Force_Update"/>

          <FilterItem className="big-filter-item" item={this.props.register}>
            <CustomDateRange startName="app_Update_Create_Begin_Time" endName="app_Update_Create_End_Time"/>
          </FilterItem>
        </QueryFilter>

        <PaginateList ref={c => this._paginateList = c}
                      doFetch={() => this.doFetch()}
                      total={this.props.total}
                      lengthName="limit"
                      byName="order_By"
        >

          <SmartList loading={this.state.loading} fixHead={true} fixLeft={[1, 2]}>
            <HeadContainer>
              <ul className="flex-list header">
                <li className="item flex2">更新日志</li>
                <li className="item flex1">系统类型</li>
                <li className="item flex1">客户端类型</li>
                <li className="item flex1">版本号</li>
                <li className="item flex1">强制更新</li>
                <li className="item flex1">上架日期</li>
                <li className="item flex1">更新文件</li>
                <li className="item flex1">MD5</li>
                <li className="item flex1">大小</li>
                <li className="item flex1">创建时间</li>
              </ul>
            </HeadContainer>
            <BodyContainer>
              <div>
                {
                  this.props.list.map((update, index) => {
                    return (
                      <ul key={index} className={classnames('flex-list body', {'selected': this.state.currentIndex == index})}
                          style={{height: '40px'}}
                          onClick={e => this.setState({currentIndex: index})}
                          onDoubleClick={e => this.setState({currentIndex: index, showEdit: true})}
                      >
                      </ul>
                    )
                  })
                }
              </div>
            </BodyContainer>
          </SmartList>
        </PaginateList>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    ...state['appUpdate'],
    systemTypeFilterList: getFilterItem('appType', '系统类型', [
      {value: constants.appSystemType.android, text: 'Android'},
      {value: constants.appSystemType.ios, text: 'IOS'}
    ]),
    forceUpdateFilterList: getFilterItem('forceUpdate', '强制更新', [
      {value: '1', text: '是'},
      {value: '0', text: '否'}
    ]),
    register: getFilterItem('register', '创建日期', [])
  }
}

function mapActionToProps(dispatch) {
  return {
    fetchAppUpdatePaginateList: actions.fetchAppUpdatePaginateList(dispatch)
  }
}

export default connect(mapStateToProps, mapActionToProps)(AppUpdate)
