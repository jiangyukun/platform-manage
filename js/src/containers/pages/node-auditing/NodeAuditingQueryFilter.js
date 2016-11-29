/**
 *
 * Created by jiangyukun on 2016/11/29.
 */
import React, {Component} from 'react'
import QueryFilter from '../../../components/core/QueryFilter'
import Form from '../../../components/element/Form'

class NodeAuditingQueryFilter extends QueryFilter {
    searchKey1Change(event) {
        this.searchKey1 = event.target.value
    }

    searchKey2Change(event) {
        this.searchKey2 = event.target.value
    }

    getSearchCondition() {
        return {
            searchKey1: this.searchKey1,
            searchKey2: this.searchKey2
        }
    }

    getSearchToolbar() {
        return (
            <div className="group-input2">
                <label className="search-label">医生:</label>
                <div className="group-input" style={{'marginRight': '10px'}}>
                    <Form>
                        <input type="text" placeholder="输入手机号码查询" onChange={e => this.searchKey1Change(e)}/>
                        <button className="icon-search-btn" onClick={e => this.filter()}></button>
                    </Form>
                </div>

                <label className="search-label">患者:</label>
                <div className="group-input">
                    <Form>
                        <input type="text" placeholder="输入手机号码，编号查询" onChange={e => this.searchKey2Change(e)}/>
                        <button className="icon-search-btn" onClick={e => this.filter()}></button>
                    </Form>
                </div>

            </div>
        )
    }
}

export default NodeAuditingQueryFilter
