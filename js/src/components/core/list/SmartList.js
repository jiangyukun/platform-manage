/**
 * 能固定头部和设置固定的列的列表
 * Created by jiangyukun on 2016/12/5.
 */
import React, {Component, PropTypes, cloneElement} from 'react'
import {findDOMNode} from 'react-dom'
import {events} from 'dom-helpers'
import {throttle} from 'lodash'

import Loading from '../../ui/Loading'
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
        if (!this.props.fixHead && !this.props.fixLeft) {
            return
        }
        this.setState({scrollTop: this._tableContainer.scrollTop})
        this.setState({scrollLeft: this._tableContainer.scrollLeft})
        if (this.props.fixHead) {
            this.setState({showHead: this._tableContainer.scrollTop > 0})
        }
        if (this.props.fixLeft) {
            this.setState({showLeft: this._tableContainer.scrollLeft > 0})
        }
    }

    getLeftHeadItem() {
        const leftHeadItems = []
        let leftIndexes = [0]
        if (this.props.fixLeft instanceof Array) {
            leftIndexes = this.props.fixLeft
        }
        for (let i = 0; i < leftIndexes.length; i++) {
            let leftIndex = leftIndexes[i]
            let leftItem = this._getLeftHeadItem(leftIndex)
            if (leftItem) {
                leftHeadItems.push(leftItem)
            }
        }
        return leftHeadItems
    }

    _getLeftHeadItem(index) {
        if (this._getLeftTotalWidth(index) > this.state.scrollLeft) {
            return
        }
        let head = findDOMNode(this._head)
        let targetHeadItem = head.childNodes[index]
        return {
            text: targetHeadItem.innerText,
            width: 100, //targetHeadItem.clientWidth
            height: head.clientHeight
        }
    }

    getLeftItems() {
        let leftItems = []
        let leftIndexes = [0]
        if (this.props.fixLeft instanceof Array) {
            leftIndexes = this.props.fixLeft
        }

        for (let i = 0; i < leftIndexes.length; i++) {
            let leftIndex = leftIndexes[i]
            let leftItem = this._getLeftItem(leftIndex)
            if (leftItem) {
                leftItems.push(leftItem)
            }
        }
        return leftItems
    }

    _getLeftItem(index) {
        if (this._getLeftTotalWidth(index) > this.state.scrollLeft) {
            return
        }
        let leftItem = {items: []}

        let head = findDOMNode(this._head)
        let body = findDOMNode(this._body)

        leftItem.width = 100 //head.childNodes[index].clientWidth
        leftItem.items.push({text: head.childNodes[index].innerText, height: head.clientHeight})

        let listItems = body.childNodes
        for (let i = 0; i < listItems.length; i++) {
            let item = listItems[i]
            leftItem.items.push({text: item.childNodes[index].innerText, height: item.clientHeight})
        }
        return leftItem
    }

    _getLeftTotalWidth(index) {
        let head = findDOMNode(this._head)

        let leftTotalWidth = 0
        for (let i = 0; i < index; i++) {
            leftTotalWidth += head.childNodes[i].clientWidth
        }
        return leftTotalWidth
    }

    componentDidMount() {
        events.on(this._tableContainer, 'scroll', this.handleTableScroll)
    }

    componentDidUpdate() {
        if (!this._head || !this._body) return

        this.leftHeadItems = this.getLeftHeadItem()
        this.leftItems = this.getLeftItems()
    }

    componentWillUnmount() {
        events.off(this._tableContainer, 'scroll', this.handleTableScroll)
    }

    render() {
        let {children} = this.props
        if (!(children instanceof Array)) {
            children = [children]
        }
        let handledChildren = children.map((child, index) => {
            if (child.type == HeadContainer) {
                this.clonedHeadComponent = cloneElement(child.props.children, {key: index + '_clone', ref: c => this._head = c})
                return cloneElement(child, {key: index, ref: c => this._head = c})
            }
            if (child.type == BodyContainer) {
                return cloneElement(child, {key: index, ref: c => this._body = c})
            }
            return cloneElement(child, {key: index})
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
                        <FixLeftContainer leftHeadItems={this.leftHeadItems} scrollTop={this.state.scrollTop}>
                            {
                                this.leftItems.map((leftItem, index) => {
                                    return <FixLeft key={index} leftItem={leftItem.items} width={leftItem.width}/>
                                })
                            }
                        </FixLeftContainer>
                    )
                }

                <div className="js-table-container" ref={c => this._tableContainer = c}>
                    <div className={this.props.className} style={{width: this.props.width + 'px'}}>
                        {handledChildren}
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
