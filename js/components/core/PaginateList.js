/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React, {Component, PropTypes, cloneElement} from 'react'
import {findDOMNode} from 'react-dom'
import {events} from 'dom-helpers'
import classnames from 'classnames'
import {throttle} from 'lodash'

import {pageSize} from '../../common/constants'
import {calculatePageIndex} from '../../utils'

class PaginateList extends Component {
    constructor(props) {
        super(props)
        this.handleTableScroll = throttle(this.handleTableScroll.bind(this), 20, {leading: true, trailing: true})
        this.state = {
            currentPage: 1,
            headFixed: false,
            leftFixed: false
        }
    }

    getPageInfo() {
        return {
            start: this.state.currentPage,
            length: pageSize
        }
    }

    sort(order) {

    }

    nextPage() {
        if (this.state.currentPage < this.pageTotal) {
            this.toPage(this.state.currentPage + 1)
        }
    }

    beforePage() {
        if (this.state.currentPage > 1) {
            this.toPage(this.state.currentPage - 1)
        }
    }

    toPage(page) {
        if (this.state.currentPage != page) {
            this.setState({currentPage: page}, () => this.props.getPageList())
        }
    }

    handleTableScroll(event) {
        if (this.props.fixHead) {
            if (this._tableContainer.scrollTop > 5) {
                this.setState({headFixed: true})
                this._fixHeadContainer.scrollLeft = this._tableContainer.scrollLeft
            } else {
                this.setState({headFixed: false})
            }
        }
        if (this.props.fixLeft) {
            if (this._tableContainer.scrollLeft > this.firstColumnWidth) { //this.firstColumnWidth * 2
                this.setState({leftFixed: true})
                this._fixLeftContainer.scrollTop = this._tableContainer.scrollTop
            } else {
                this.setState({leftFixed: false})
            }
        }
    }

    getHeadItems() {
        this.headerItems = []
        let ths = this._table.firstChild.firstChild.childNodes
        for (let i = 0; i < ths.length; i++) {
            let th = ths[i]
            if (i == 0) {
                this.firstColumnWidth = th.clientWidth
            }
            this.headerItems.push({text: th.innerText, width: th.clientWidth})
        }
    }

    getLeftItems() {
        this.leftItems = []
        let leftTopTh = this._table.firstChild.firstChild.firstChild

        this.leftItems.push({text: leftTopTh.innerText, height: leftTopTh.clientHeight})

        let trs = this._table.lastChild.childNodes
        for (let i = 0; i < trs.length; i++) {
            let th = trs[i].firstChild
            this.leftItems.push({text: th.innerText, height: th.clientHeight})
        }
    }

    componentDidMount() {
        events.on(this._tableContainer, 'scroll', this.handleTableScroll)

    }

    componentDidUpdate() {
        this.tableWidth = this._table.clientWidth
        this.tableHeight = this._table.clientHeight

        this.getHeadItems()
        this.getLeftItems()
    }

    componentWillUnmount() {
        events.off(this._tableContainer, 'scroll', this.handleTableScroll)
    }

    getChildContext() {
        return {
            sort: order => this.sort(order)
        }
    }

    render() {
        this.pageTotal = parseInt((this.props.total + pageSize - 1) / pageSize)
        this.pageIndexs = calculatePageIndex(this.pageTotal, this.state.currentPage)

        return (
            <div className="paginate-list">
                <div className="table relative">
                    {this.props.total == 0 && <span className="no-list-data">暂无数据</span>}

                    {
                        this.props.fixHead == true && (
                            <div className="js-fix-header-container" ref={c => this._fixHeadContainer = c}>
                                <div className="fix-header" style={{display: this.state.headFixed == true ? 'block' : 'none', width: this.tableWidth}}>
                                    {
                                        this.headerItems && this.headerItems.map((item, index) => {
                                            return <div key={index} className="fix-header-item" style={{width: item.width}}>{item.text}</div>
                                        })
                                    }
                                </div>
                            </div>
                        )
                    }

                    {
                        this.props.fixLeft && (
                            <div className="js-fix-left-container" ref={c => this._fixLeftContainer = c}>
                                <div className="fix-left" style={{display: this.state.leftFixed == true ? 'block' : 'none', width: this.firstColumnWidth}}>
                                    {
                                        this.leftItems && this.leftItems.map((item, index) => {
                                            return <div key={index} className="fix-left-item" style={{height: item.height}}>{item.text}</div>
                                        })
                                    }
                                </div>
                            </div>
                        )
                    }

                    <div className="js-table-container" ref={c => this._tableContainer = c}>
                        {cloneElement(this.props.children, {ref: c => this._table = c})}
                    </div>
                </div>

                {
                    this.props.total > 0 && <div className="list-info">
                        <div className="list-count-info">
                            <span>当前第{this.state.currentPage}页，共{this.props.total}条数据</span>
                        </div>
                        <nav className="list-nav-button">
                            <ul className="pagination">
                                <li className={classnames({'disabled': this.state.currentPage == 1})} onClick={e => this.beforePage()}>
                                    <a aria-label="Previous">上一页</a>
                                </li>

                                {
                                    this.pageIndexs.map(page => {
                                        return (
                                            <li key={page} className={classnames({'active': this.state.currentPage == page})}>
                                                <a onClick={e => this.toPage(page)}>{page}</a>
                                            </li>
                                        )
                                    })
                                }

                                <li className={classnames({'disabled': this.state.currentPage == this.pageTotal})} onClick={e => this.nextPage()}>
                                    <a aria-label="Next">下一页</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                }
            </div>
        )
    }
}

PaginateList.childContextTypes = {
    sort: PropTypes.func
}

export default PaginateList
