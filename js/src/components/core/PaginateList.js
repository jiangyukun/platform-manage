/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React, {Component, PropTypes, cloneElement} from 'react'
import {findDOMNode} from 'react-dom'
import classnames from 'classnames'

import SmartList from './list/SmartList'
import {pageSize} from '../../common/constants'
import {calculatePageIndex} from '../../core/utils'

class PaginateList extends Component {
    constructor(props) {
        super(props)
        this.addSortBy = this.addSortBy.bind(this)
        this.sort = this.sort.bind(this)
        this.sortByList = []
        this.state = {
            draw: 1,
            currentPage: 1,
            by: '',
            order: 'default'
        }
    }

    beginFetch(page) {
        if (page) {
            this.setState({currentPage: page})
        }
        this.setState({draw: this.state.draw + 1}, () => this.props.doFetch())
    }

    addSortBy(sortBy) {
        this.sortByList.push(sortBy)
    }

    sort(by, order) {
        if (order == 'default') {
            order = ''
        }
        this.setState({by, order}, this.beginFetch(1))
        this.sortByList.forEach(sortBy => sortBy.reset(by))
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
            this.setState({currentPage: page}, () => this.beginFetch())
        }
    }

    getParams() {
        if (this.state.by && this.state.order) {
            return {
                [this.props.startName]: this.state.currentPage - 1,
                [this.props.lengthName]: pageSize,
                [this.props.drawName]: this.state.draw,
                [this.props.byName]: this.state.by,
                [this.props.orderName]: this.state.order
            }
        }
        return {
            [this.props.startName]: this.state.currentPage - 1,
            [this.props.lengthName]: pageSize,
            [this.props.drawName]: this.state.draw
        }
    }

    render() {
        this.pageTotal = parseInt((this.props.total + pageSize - 1) / pageSize)
        let pageIndexes = calculatePageIndex(this.pageTotal, this.state.currentPage)

        return (
            <div className="paginate-list" style={this.props.style}>
                {this.props.children}
                <div className="list-info">
                    <div className="list-count-info">
                        <span>当前第{this.state.currentPage}页，共{this.props.total}条数据</span>
                    </div>
                    <nav className="list-nav-button">
                        <ul className="pagination">
                            <li className={classnames({'disabled': this.state.currentPage == 1})} onClick={e => this.beforePage()}>
                                <a>上一页</a>
                            </li>

                            {
                                pageIndexes.map(page => {
                                    return (
                                        <li key={page} className={classnames({'active': this.state.currentPage == page})}>
                                            <a onClick={e => this.toPage(page)}>{page}</a>
                                        </li>
                                    )
                                })
                            }

                            <li className={classnames({'disabled': this.state.currentPage == this.pageTotal})} onClick={e => this.nextPage()}>
                                <a>下一页</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }

    getChildContext() {
        return {
            addSortBy: this.addSortBy,
            sort: this.sort,
            total: this.props.total
        }
    }
}

PaginateList.defaultProps = {
    startName: 'start',
    lengthName: 'length',
    drawName: 'draw',
    byName: 'by',
    orderName: 'order'
}

PaginateList.propTypes = {
    total: PropTypes.number.isRequired,
    loading: PropTypes.bool,
    doFetch: PropTypes.func.isRequired,

    startName: PropTypes.string,
    lengthName: PropTypes.string,
    drawName: PropTypes.string,
    byName: PropTypes.string,
    orderName: PropTypes.string
}

PaginateList.childContextTypes = {
    addSortBy: PropTypes.func,
    sort: PropTypes.func,
    total: PropTypes.number
}

PaginateList.Layout = SmartList

export default PaginateList
