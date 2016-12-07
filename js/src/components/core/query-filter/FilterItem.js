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
        this.lastTypeItem = null
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

    // 添加自定义选项
    addCustomItem(customItem) {
        if (this.customItemList.indexOf(customItem) == -1) {
            this.customItemList.push(customItem)
        }
    }

    // 添加子选项
    addSubItem(subItem) {
        if (this.subItemList.indexOf(subItem) == -1) {
            this.subItemList.push(subItem)
        }
    }

    // 选择选项
    select(typeItem) {
        this.lastTypeItem = typeItem
        this.subItemList.forEach(subItem => subItem.onChange(typeItem))
        this.setState({'selected': typeItem.value})
        let {typeCode, typeText} = this.props.item
        this.props.onSelect(typeItem)
        this.context.updateFilterItem({typeCode, typeText, typeItem, filterItem: this})
    }

    // 选择子选项
    selectSubItem(title, value, text, errorTip) {
        let {typeCode, typeText} = this.props.item
        this.context.updateFilterItem({
            typeCode,
            typeText,
            typeItem: {
                value: {
                    main: this.lastTypeItem,
                    custom: {value, text}
                },
                text: this.lastTypeItem.text + title,
                errorTip: errorTip
            },
            filterItem: this
        })
    }

    // 点击“不限”
    selectDefault() {
        this.setState({'selected': ''})
        this.subItemList.forEach(subItem => subItem.onChange(this.defaultItem))
        this.customItemList.forEach(customItem => customItem.reset())
        this.context.removeFilterItem(this.props.item.typeCode)
        if (this._select1) {
            this._select1.reset()
        }
    }

    // QueryFilter 重置 FilterItem 调用方法
    reset() {
        this.setState({'selected': ''})
        this.subItemList.forEach(subItem => subItem.reset())
        this.customItemList.forEach(customItem => customItem.reset())
        if (this._select1) {
            this._select1.reset()
        }
    }

    render() {
        let {item} = this.props
        if (!item) {
            return null
        }

        let showItemUI = () => {
            if (item.typeItemList.length > 2) {
                return showItemTotal()
            }
            return showItemRespective()
        }

        let showItemRespective = () => {
            return item.typeItemList.map(typeItem => {
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
                             selectItems={item.typeItemList}
                             onSelect={option => this.select(option)}/>
                </li>
            )
        }

        /* - - - - - - - - - - - - - - - - - - - - - - - - - -*/

        let style = {}
        let labelLength = item.typeText.length
        if (labelLength > 6) {
            style.width = labelLength * 12
        }

        return (
            <ul className={this.props.className}>
                <li className="filter-item-label">
                    <label style={style}>{item.typeText}：</label>
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

FilterItem.defaultProps = {
    onSelect: () => {
    }
}

FilterItem.propTypes = {
    item: PropTypes.object,
    className: PropTypes.string
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
