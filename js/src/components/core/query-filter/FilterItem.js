/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React, {Component, PropTypes, cloneElement} from 'react'
import classnames from 'classnames'
import Select1 from '../Select1'

class FilterItem extends Component {
    constructor(props) {
        super(props)

        this.select = this.select.bind(this)
        this.selectSubItem = this.selectSubItem.bind(this)
        this.addCustomItem = this.addCustomItem.bind(this)
        this.addSubItem = this.addSubItem.bind(this)

        this.defaultItem = {value: '', text: '不限'}
        this.customItemList = []
        this.subItemList = []
        this.beforeTypeItem = null
        this.state = {selected: '', labelWidth: -1}
    }

    getChildContext() {
        return {
            select: this.select,
            selectSubItem: this.selectSubItem,
            addCustomItem: this.addCustomItem,
            addSubItem: this.addSubItem
        }
    }

    addCustomItem(customItem) {
        if (this.customItemList.indexOf(customItem) == -1) {
            this.customItemList.push(customItem)
        }
    }

    addSubItem(subItem) {
        if (this.subItemList.indexOf(subItem) == -1) {
            this.subItemList.push(subItem)
        }
    }

    select(typeItem) {
        this.beforeTypeItem = typeItem
        this.subItemList.forEach(subItem => subItem.onChange(typeItem))
        this.setState({'selected': typeItem.value})
        let {typeCode, typeText} = this.props.item

        this.context.updateFilterItem({typeCode, typeText, typeItem, filterItem: this})
    }

    selectSubItem(subItem) {
        let {typeCode, typeText} = this.props.item
        this.context.updateFilterItem({
            typeCode, typeText, typeItem: {
                value: {
                    main: this.beforeTypeItem.value,
                    custom: subItem.value
                },
                text: this.beforeTypeItem.text + subItem.text,
                errorTip: subItem.errorTip
            }, filterItem: this
        })
    }

    selectDefault() {
        this.setState({'selected': ''})
        this.subItemList.forEach(subItem => subItem.onChange(this.defaultItem))
        this.customItemList.forEach(customItem => customItem.reset())
        this.context.removeFilterItem(this.props.item.typeCode)
        if (this._select1) {
            this._select1.reset()
        }
    }

    reset() {
        this.setState({'selected': ''})
        this.subItemList.forEach(subItem => subItem.reset())
        this.customItemList.forEach(customItem => customItem.reset())
        if (this._select1) {
            this._select1.reset()
        }
    }

    componentDidMount() {
        if (!this.props.item) {
            return null
        }
        let labelLength = this.props.item.typeText.length
        if (labelLength > 6) {
            this.setState({labelWidth: labelLength * 12})
        }
    }

    render() {
        let showItemUI = () => {
            if (this.props.item.typeItemList.length > 2) {
                return showItemTotal()
            }
            return showItemRespective()
        }

        let showItemRespective = () => {
            return this.props.item.typeItemList.map(typeItem => {
                return (
                    <li key={typeItem.value}
                        className={classnames('filter-item-single', {'selected': typeItem.value == this.state.selected})}
                        onClick={e => this.select(typeItem)}>
                        {typeItem.text}
                    </li>
                )
            })
        }

        let showItemTotal = () => {
            return (
                <li className="select-option-container filter-item-single">
                    <Select1 ref={c => this._select1 = c}
                             className={classnames({'selected': this.state.selected != ''})}
                             selectItems={this.props.item.typeItemList}
                             onSelect={option => this.select(option)}/>
                </li>
            )
        }


        /* - - - - - - - - - - - - - - - - - - - - - - - - - -*/

        if (!this.props.item) {
            return null
        }

        let style = {}
        if (this.state.labelWidth) {
            style.width = this.state.labelWidth + 'px'
        }

        return (
            <ul className={this.props.className}>
                <li className="filter-item-label">
                    <label style={style}>{this.props.item.typeText}：</label>
                </li>
                <li className="flex1 filter-items">
                    <ul className="filter-item-main">
                        <li className={classnames('filter-item-single', {'selected': this.state.selected == ''})}
                            onClick={e => this.selectDefault()}>不限
                        </li>
                        {showItemUI()}
                    </ul>
                    {this.props.children}
                </li>

            </ul>
        )
    }
}

FilterItem.contextTypes = {
    updateFilterItem: PropTypes.func,
    removeFilterItem: PropTypes.func
}

FilterItem.childContextTypes = {
    select: PropTypes.func,
    selectSubItem: PropTypes.func,
    addCustomItem: PropTypes.func,
    addSubItem: PropTypes.func
}

export default FilterItem
