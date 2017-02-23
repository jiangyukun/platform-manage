/**
 * Created by jiangyukun on 2017/2/23.
 */
import React, {Component, PropTypes} from 'react'
import {merge} from 'lodash'
import QueryFilter from '../../../components/core/QueryFilter'
import Form from '../../../components/element/Form'

class TwoSearchKey extends QueryFilter {
  searchKey1Change(event) {
    this.searchKey1 = event.target.value
    this.props.onSearchKey1Change(event.target.value)
  }

  searchKey2Change(event) {
    this.searchKey2 = event.target.value
    this.props.onSearchKey2Change(event.target.value)
  }

  getSearchCondition() {
    return {
      searchKey1: this.searchKey1,
      searchKey2: this.searchKey2
    }
  }

  getSearchParam() {
    let param = {}
    if (this.searchKey1) {
      merge(param, {[this.props.searchKeyName1]: this.searchKey1})
    }
    if (this.searchKey2) {
      merge(param, {[this.props.searchKeyName2]: this.searchKey2})
    }
    return param
  }

  getSearchToolbar() {
    return (
      <div className="inline-block">
        <div className="group-input" style={{marginRight: '5px'}}>
          <label className="search-label">消息内容:</label>
          <Form className="input-form">
            <input type="text" placeholder="请输入消息内容" onChange={e => this.searchKey1Change(e)}/>
            <button className="icon-search-btn" onClick={e => this.filter()}></button>
          </Form>
        </div>

        <div className="group-input">
          <label className="search-label">患者:</label>
          <Form className="input-form">
            <input type="text" placeholder="输入患者手机号码" onChange={e => this.searchKey2Change(e)}/>
            <button className="icon-search-btn" onClick={e => this.filter()}></button>
          </Form>
        </div>
      </div>
    )
  }
}

TwoSearchKey.defaultProps = {
  onSearchKey1Change: () => {},
  onSearchKey2Change: () => {}
}

TwoSearchKey.propTypes = {
  searchKeyName1: PropTypes.string,
  searchKeyName2: PropTypes.string,
  onSearchKey1Change: PropTypes.func,
  onSearchKey2Change: PropTypes.func
}

export default TwoSearchKey
