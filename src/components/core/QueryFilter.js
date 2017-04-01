/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React, {Component, PropTypes, Children} from 'react'
import classnames from 'classnames'
import {merge} from 'lodash'
import Form from '../element/Form'
import FilterItem from './query-filter/FilterItem'

class QueryFilter extends Component {
  constructor() {
    super()
    this.searchKey = ''
    this.filterItemList = []
    this.state = {more: false, filterConditions: []}
  }

  searchKeyChange(e) {
    this.searchKey = e.target.value.trim()
    this.props.onSearchKeyChange(e.target.value.trim())
  }

  toggleMoreState() {
    this.setState({more: !this.state.more})
  }

  updateFilterItem = (newFilterCondition) => {
    let match = this.state.filterConditions.find(condition => condition.typeCode == newFilterCondition.typeCode)
    if (match) {
      let index = this.state.filterConditions.indexOf(match)
      this.state.filterConditions[index] = newFilterCondition
    } else {
      this.state.filterConditions.push(newFilterCondition)
    }
    this.forceUpdate()
  }

  removeFilterItem = (typeCode) => {
    let newFilterCondition = this.state.filterConditions.filter(filterCondition => {
      if (filterCondition.typeCode == typeCode) {
        filterCondition.filterItem.reset()
      }
      return filterCondition.typeCode != typeCode
    })
    this.setState({filterConditions: newFilterCondition})
  }

  clearAllFilterCondition() {
    this.state.filterConditions.forEach(filterCondition => filterCondition.filterItem.reset())
    this.setState({filterConditions: []})
  }

  filter() {
    this.props.beginFilter()
  }

  addFilterItem = (filterItem) => {
    this.filterItemList.push(filterItem)
  }

  getSearchParam() {
    if (!this.searchKey) {
      return {}
    }
    return {[this.props.searchKeyName]: this.searchKey}
  }

  getParams() {
    let params = this.getSearchParam()
    this.filterItemList.forEach(filterItem => {
      merge(params, filterItem.getParam())
    })
    return params
  }

  getSearchToolbar() {
    return (
      <div className="group-input">
        <Form>
          <input type="text" placeholder={this.props.placeholder} onChange={e => this.searchKeyChange(e)}/>
          <button className="icon-search-btn" onClick={e => this.filter()}></button>
        </Form>
      </div>
    )
  }

  render() {
    let buttons = Children.map(this.props.children, child => {
      if (child && child.type != FilterItem) {
        return child
      }
    })

    let filterItems = Children.map(this.props.children, (child, index) => {
      if (child && child.type == FilterItem) {
        return child
      }
    })

    let showSelectFilterItem = () => {
      return this.state.filterConditions.map((filterCondition, index) => {
        return (
          <a key={index}
             className={classnames('select-result select-result2 select-resultqage', {'invalidate': filterCondition.invalidate})}>
            <span>{filterCondition.typeText}： {filterCondition.typeItem.text}</span>
            {
              filterCondition.invalidate && (
                <i className="fa fa-warning filter-item-warning" title={filterCondition.errorTip}></i>
              )
            }
            <i className="icon-close" onClick={e => this.removeFilterItem(filterCondition.typeCode)}></i>
          </a>
        )
      })
    }

    return (
      <div className={classnames('query-filter', this.props.className)}>
        <div className="group-tools">
          <div className="filter-toolbar">
            {buttons}
          </div>
          <div className="group-search">
            {this.getSearchToolbar()}
            <div className={classnames('group-select-btn', {'selected': this.state.more})}
                 onClick={e => this.toggleMoreState()}>
              <a>
                <span>更多筛选</span>
                <i className="icon-arrow-blue"></i>
              </a>
            </div>
          </div>
          <div>
            <div className={classnames('child', 'group-select-more', {'hide': !this.state.more})}>
              <div className="group-top">
                <div></div>
              </div>
              {filterItems}

              <div className="group-select-more-btm flex">
                <div style={{width: '80px'}}>筛选条件:</div>
                <div className="flex1 ">
                  <div className="clearfix">
                    {showSelectFilterItem()}
                  </div>
                </div>
                <div className="select-result">
                  <button
                    className={classnames('clear', {'disabled': this.state.filterConditions.length == 0})}
                    onClick={e => this.clearAllFilterCondition()}
                    disabled={this.state.filterConditions.length == 0}>
                    清除
                  </button>
                  <button className="submit" onClick={e => this.filter()}>确定</button>
                </div>
                <div className="clear disabled"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  getChildContext() {
    return {
      addFilterItem: this.addFilterItem,
      removeFilterItem: this.removeFilterItem,
      updateFilterItem: this.updateFilterItem
    }
  }
}

QueryFilter.defaultProps = {
  placeholder: '搜索关键词',
  onSearchKeyChange: () => {}
}

QueryFilter.propTypes = {
  className: PropTypes.string,
  beginFilter: PropTypes.func.isRequired,
  searchKeyName: PropTypes.string,
  placeholder: PropTypes.string,
  onSearchKeyChange: PropTypes.func
}

QueryFilter.childContextTypes = {
  addFilterItem: PropTypes.func,
  removeFilterItem: PropTypes.func,
  updateFilterItem: PropTypes.func
}

export default QueryFilter
