/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React, {Component, PropTypes, cloneElement} from 'react'
import {findDOMNode} from 'react-dom'
import classnames from 'classnames'

import {pageSize} from '../../common/constants'
import {calculatePageIndex} from '../../utils'

class PaginateList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            draw: 1,
            currentPage: 1
        }
    }

    beginFetch() {
        this.setState({draw: this.state.draw + 1}, () => this.props.doFetch())
    }

    getPageInfo() {
        return {
            start: this.state.currentPage - 1,
            length: pageSize,
            draw: this.state.draw
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
            this.setState({currentPage: page}, () => this.props.beginFetch())
        }
    }

    getChildContext() {
        return {
            sort: order => this.sort(order)
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
}

PaginateList.propTypes = {
    total: PropTypes.number,
    loading: PropTypes.bool,
    beginFetch: PropTypes.func,
    doFetch: PropTypes.func
}

PaginateList.childContextTypes = {
    sort: PropTypes.func
}

export default PaginateList
