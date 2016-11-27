import React, {Component, PropTypes} from 'react'
import {findDOMNode} from 'react-dom'
import classnames from 'classnames'
import {events} from 'dom-helpers'

import {select1, keyboard} from '../../common/constants'

export default class Select1 extends Component {
    constructor(props) {
        super(props)
        this.handleWindowClick = this.handleWindowClick.bind(this)
        this.handleContainerKeyDown = this.handleContainerKeyDown.bind(this)
        this.state = {
            active: false,
            value: props.value || '',
            maxLength: select1.init,
            searchKey: '',
            selectIndex: -1,
            touched: false,
            touchIndex: -1
        }
    }

    toggle() {
        this.setState({active: !this.state.active})
    }

    close() {
        this.setState({active: false, touched: true})
    }

    open() {
        this.setState({active: true, touchIndex: this.state.selectIndex})
    }

    select(option, index) {
        this.setState({value: option.value, selectIndex: index})
        this.props.onSelect(option)
        this.close()
    }

    reset() {
        this.setState({value: '', selectIndex: -1})
    }

    touch(index) {
        this.setState({touchIndex: index})
    }

    search(event) {
        let searchKey = event.target.value.trim()
        this.setState({searchKey})
    }

    showMoreItems() {
        this.setState({maxLength: this.state.maxLength + select1.increase})
    }

    activeOpenFlag() {
        this.openFlag = true
    }

    handleWindowClick(event) {
        if (this.openFlag) {
            this.openFlag = false
        } else {
            this.close()
        }
    }

    handleContainerKeyDown(event) {
        if (!this.state.active) {
            switch (event.which) {
                case keyboard.ENTER:
                    this.open()
                    break
                default:
                    break
            }
            return
        }
        switch (event.which) {
            case keyboard.ESCAPE:
                event.stopPropagation()
                this.close()
                break
            case keyboard.DOWN:
                if (this.state.touchIndex + 1 <= this.currentCount - 1) {
                    this.setState({touchIndex: this.state.touchIndex + 1})
                }
                break
            case keyboard.UP:
                if (this.state.touchIndex - 1 >= 0) {
                    this.setState({touchIndex: this.state.touchIndex - 1})
                }
                break
            case keyboard.ENTER:
                let touchIndex = this.state.touchIndex
                let selectItems = this.props.selectItems
                if (touchIndex >= 0 && touchIndex < selectItems.length) {
                    this.select(selectItems[touchIndex], touchIndex)
                }
                break
            default:
                break
        }
    }

    componentDidMount() {
        events.on(findDOMNode(this._container), 'keyup', this.handleContainerKeyDown)
        events.on(document, 'click', this.handleWindowClick)
    }

    componentWillUnmount() {
        events.off(findDOMNode(this._container), 'keyup', this.handleContainerKeyDown)
        events.off(document, 'click', this.handleWindowClick)
    }

    render() {
        let selectText = '请选择'
        this.props.selectItems.forEach(selectItem => {
            if (selectItem.value == this.state.value) {
                selectText = selectItem.text
            }
        })
        let showMore = false, noMatch = true

        let showSelectItems = () => {
            let currentCount = 0, filterTotalCount = 0
            try {
                return this.props.selectItems.map((option, index) => {
                    if (option.text.indexOf(this.state.searchKey) != -1) {
                        noMatch = false
                        filterTotalCount++
                        if (currentCount < this.state.maxLength) {
                            currentCount++
                            return (
                                <li key={index}
                                    className={classnames('select-item', {'selected': index == this.state.selectIndex}, {'last-touched': index == this.state.touchIndex})}
                                    onClick={e => this.select(option, index)}
                                    onMouseEnter={e => this.touch(index)}>
                                    {option.text}
                                </li>
                            )
                        }
                        return null
                    }
                })
            } finally {
                this.currentCount = currentCount
                if (currentCount != filterTotalCount) {
                    showMore = true
                }
            }
        }

        return (
            <div ref={c => this._container = c} onClick={e => this.activeOpenFlag(e)} className="select1-container"
                 tabIndex="-1">
                <div onClick={e => this.toggle()}
                     className={classnames('selected-item', {'open': this.state.active}, {'invalid': this.props.required && this.state.touched && !this.state.value})}>
                    <span className="select-item-text">{selectText}</span>
                    <span className="dropdown"><b></b></span>
                </div>

                {
                    this.state.active && (
                        <div className="all-select-items">
                            {
                                this.props.selectItems.length > 10 && (
                                    <input value={this.state.searchKey} className="search" onChange={e => this.search(e)}
                                           placeholder="请输入查询条件"/>
                                )
                            }
                            <ul className="select-items-container">
                                {showSelectItems()}
                            </ul>
                            {
                                showMore && (
                                    <div className="show-more" onClick={e => this.showMoreItems()}>
                                        <span>加载更多...</span>
                                    </div>
                                )
                            }

                            {
                                noMatch && (
                                    <div className="no-match-result">
                                        <span>暂无符合条件的数据</span>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        )
    }
}

Select1.defaultProps = {
    selectItems: [],
    onSelect: function () {
    }
}

Select1.propTypes = {
    selectItems: PropTypes.array,
    onSelect: PropTypes.func
}
