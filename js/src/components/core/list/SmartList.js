/**
 * 能固定头部和设置固定的列的列表
 * Created by jiangyukun on 2016/12/5.
 */
import React, {Component, PropTypes, cloneElement} from 'react'
import {findDOMNode} from 'react-dom'
import {events} from 'dom-helpers'
import {throttle} from 'lodash'

import HeadContainer from './HeadContainer'
import BodyContainer from './BodyContainer'
import FixHead from '../paginate-list/FixHead'
import FixLeftContainer from '../paginate-list/FixLeftContainer'
import FixLeft from '../paginate-list/FixLeft'

class SmartList extends Component {
    constructor() {
        super()
        this.handleTableScroll = throttle(this.handleTableScroll.bind(this), 10, {leading: true, trailing: true})
        this.state = {
            showHead: false,
            showLeft: false,
            scrollLeft: 0,
            scrollTop: 0
        }
    }

    handleTableScroll() {
        if (this.props.fixHead) {
            if (this._tableContainer.scrollTop > 0) {
                this.setState({showHead: true, scrollLeft: this._tableContainer.scrollLeft})
            } else {
                this.setState({showHead: false})
            }
        }
        if (this.props.fixLeft) {
            if (this._tableContainer.scrollLeft > 0) {
                this.setState({showLeft: true, scrollTop: this._tableContainer.scrollTop})
            } else {
                this.setState({showLeft: false})
            }
        }
    }

    getLeftItems() {
        let leftIndexes = [1]
        if (this.props.fixLeft instanceof Array) {
            leftIndexes = this.props.fixLeft
        }
        return leftIndexes.map(leftIndex => this._getLeftItem(leftIndex))
    }

    _getLeftItem(index) {
        let leftItem = []

        let head = findDOMNode(this._head)
        let body = findDOMNode(this._body)

        leftItem.push({text: head.childNodes[index].innerText, height: head.clientHeight})

        let listItems = body.childNodes
        for (let i = 0; i < listItems.length; i++) {
            let item = listItems[i]
            leftItem.push({text: item.childNodes[index].innerText, height: item.clientHeight})
        }
        return leftItem
    }

    componentDidMount() {
        events.on(this._tableContainer, 'scroll', this.handleTableScroll)
    }

    componentDidUpdate() {
        if (!this._head || !this._body) return

        this.leftItems = this.getLeftItems()
        console.log(this.leftItems)
    }

    componentWillUnmount() {
        events.off(this._tableContainer, 'scroll', this.handleTableScroll)
    }

    render() {
        let children = this.props.children.map((child, index) => {
            if (child.type == HeadContainer) {
                this.clonedHeadComponent = cloneElement(child.props.children, {key: index + '_clone', ref: c => this._head = c})
                return cloneElement(child, {key: index, ref: c => this._head = c})
            }
            if (child.type == BodyContainer) {
                return cloneElement(child, {key: index, ref: c => this._body = c})
            }
        })

        return (
            <div className="table relative">
                {this.props.loading && <Loading/>}
                {this.props.total == 0 && <span className="no-list-data">暂无数据</span>}

                {this.state.showHead && <FixHead width={this.props.width}
                                                 scrollLeft={this.state.scrollLeft}
                                                 component={this.clonedHeadComponent}/>}
                {
                    this.state.showLeft && (
                        <FixLeftContainer scrollTop={this.state.scrollTop}>
                            {
                                this.leftItems.map((leftItem, index) => {
                                    return <FixLeft key={index} leftItem={leftItem}/>
                                })
                            }
                        </FixLeftContainer>
                    )
                }

                <div className="js-table-container" ref={c => this._tableContainer = c}>
                    <div className={this.props.className} style={{width: this.props.width + 'px'}}>
                        {children}
                    </div>
                </div>
            </div>
        )
    }
}

SmartList.propTypes = {
    loading: PropTypes.bool,
    total: PropTypes.number,
    width: PropTypes.number,
    fixHead: PropTypes.bool,
    fixLeft: PropTypes.oneOfType([PropTypes.bool, PropTypes.array])
}

export default SmartList
