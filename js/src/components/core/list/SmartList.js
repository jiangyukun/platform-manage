/**
 * 能固定头部和设置固定的列的列表
 * Created by jiangyukun on 2016/12/5.
 */
import React, {Component, PropTypes, cloneElement} from 'react'
import {events} from 'dom-helpers'
import {throttle} from 'lodash'

import HeadContainer from './HeadContainer'
import BodyContainer from './BodyContainer'
import FixHead from '../paginate-list/FixHead'
import FixLeft from '../paginate-list/FixLeft'

class SmartList extends Component {
    constructor() {
        super()
        this.handleTableScroll = throttle(this.handleTableScroll.bind(this), 20, {leading: true, trailing: true})
        this.state = {
            showHead: false,
            showLeft: false,
            scrollLeft: 0,
            scrollTop: 0
        }
    }

    handleTableScroll() {
        if (this.props.fixHead) {
            if (this._tableContainer.scrollTop > 5) {
                this.setState({showHead: true, scrollLeft: this._tableContainer.scrollLeft})
            } else {
                this.setState({showHead: false})
            }
        }
        if (this.props.fixLeft) {
            if (this._tableContainer.scrollLeft > this.firstColumnWidth) {
                this.setState({showLeft: true, scrollTop: this._tableContainer.scrollTop})
            } else {
                this.setState({showLeft: false})
            }
        }
    }

    getLeftItems() {
        this.leftItems = []

        /*let leftTopTh = this._table.firstChild.firstChild.firstChild

         this.leftItems.push({text: leftTopTh.innerText, height: leftTopTh.clientHeight})

         let trs = this._table.lastChild.childNodes
         for (let i = 0; i < trs.length; i++) {
         let th = trs[i].firstChild
         this.leftItems.push({text: th.innerText, height: th.clientHeight})
         }*/
    }

    componentDidMount() {
        events.on(this._tableContainer, 'scroll', this.handleTableScroll)
    }

    componentDidUpdate() {
        if (!this._table) return

        this.tableWidth = this._table.clientWidth
        this.tableHeight = this._table.clientHeight

        this.getLeftItems()
    }

    componentWillUnmount() {
        events.off(this._tableContainer, 'scroll', this.handleTableScroll)
    }

    render() {
        let getChildren = () => {
            return this.props.children.map((child, index) => {
                if (child.type == HeadContainer) {
                    this.clonedHeadComponent = cloneElement(child, {key: index + '_clone', ref: c => this._head = c})
                    return cloneElement(child, {key: index, ref: c => this._head = c})
                }
                if (child.type == BodyContainer) {
                    return cloneElement(child, {key: index, ref: c => this._body = c})
                }
            })
        }

        return (
            <div className="table relative">
                {this.props.loading && <Loading/>}
                {this.props.total == 0 && <span className="no-list-data">暂无数据</span>}

                {this.state.showHead && <FixHead width={this.props.width}
                                                 scrollLeft={this.state.scrollLeft}
                                                 component={this.clonedHeadComponent}/>}
                {this.state.showLeft && <FixLeft leftItems={this.leftItems}/>}

                <div className="js-table-container" ref={c => this._tableContainer = c}>
                    <div className={this.props.className} style={{width: this.props.width + 'px'}}>
                        {getChildren()}
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
    fixLeft: PropTypes.bool
}

export default SmartList
