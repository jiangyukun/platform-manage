/**
 * Created by jiangyu2016 on 16/10/16.
 */
import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import events from 'dom-helpers'

class SortBy extends Component {
    constructor(props, context) {
        super(props, context)
        context.addSortBy(this)
        this.handleDocumentClick = this.handleDocumentClick.bind(this)
        this.state = {active: false, order: 'default'}
    }

    componentDidMount() {
        events.on(document, 'click', this.handleDocumentClick)
    }

    componentWillUnmount() {
        events.off(document, 'click', this.handleDocumentClick)
    }

    componentDidUpdate() {
        if (this.state.active) {
            this.activeFlag = true
        }
    }

    handleDocumentClick() {
        if (this.activeFlag) {
            this.activeFlag = false
        } else {
            this.close()
        }
    }

    toggle() {
        this.setState({active: !this.state.active})
    }

    close() {
        this.setState({active: false})
    }

    sort(order) {
        this.setState({order})
        this.context.sort(this.props.by, order)
    }

    // PaginateList 重置SortBy
    reset(by) {
        if (by != this.props.by) {
            this.setState({order: 'default'})
        }
    }

    render() {
        const defaultIcon = () => {
            if (this.state.order != 'default') {
                return (
                    <li onClick={e => this.sort('default')} className="default">默认</li>
                )
            }
            return null
        }

        const ascIcon = () => {
            if (this.state.order != 'asc') {
                return (
                    <li onClick={e => this.sort('asc')} className="asc">
                        <a>{name}</a>
                        <i className="icon-arrow-desc"></i>
                    </li>
                )
            }
            return null
        }

        const descIcon = () => {
            if (this.state.order != 'desc') {
                return (
                    <li onClick={e => this.sort('desc')} className="desc">
                        <a>{name}</a>
                        <i className="icon-arrow-desc1"></i>
                    </li>
                )
            }
            return null
        }

        let name = this.props.children

        let style = {}
        if (this.state.active && this.props.activeWidth) {
            style.width = this.props.activeWidth + 'px'
        }

        return (
            <div
                className={classnames('sort',
                    {'active': this.state.active}, {'asc': this.state.order == 'asc'}, {'desc': this.state.order == 'desc'}
                )}
                onClick={e => this.toggle()}
            >
                <div className="sort-container" style={style}>
                    <div className="clearfix current-sort">
                        <a className="link">{name}</a>
                        <i className={classnames('arrow', {'icon-arrow-desc-red': this.state.order == 'asc'}, {'icon-arrow-desc1-red': this.state.order == 'desc'})}></i>
                        <i className="icon-more-select"></i>
                    </div>

                    {
                        this.state.active && (
                            <ul className="more">
                                {defaultIcon()}
                                {ascIcon()}
                                {descIcon()}
                            </ul>
                        )
                    }
                </div>
            </div>
        )
    }
}

SortBy.propTypes = {
    by: PropTypes.string,
    activeWidth: PropTypes.number
}

SortBy.contextTypes = {
    sort: PropTypes.func,
    addSortBy: PropTypes.func
}

export default SortBy
