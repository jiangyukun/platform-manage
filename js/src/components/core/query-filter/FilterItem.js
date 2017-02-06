/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React, {Component, PropTypes, cloneElement} from 'react'
import classnames from 'classnames'
import {merge} from 'lodash'
import Select1 from '../Select1'

class FilterItem extends Component {
  constructor(props, context) {
    super(props, context)

    context.addFilterItem(this)
    this.defaultItem = {value: '', text: '不限'}
    this.customItemList = []
    this.subItemList = []
    this.lastTypeItem = null
    this.state = {selected: '', labelWidth: -1}
  }

  // QueryFilter 重置 FilterItem 调用方法
  reset = () => {
    this.setState({'selected': ''})
    this.lastTypeItem = null
    this.subItemList.forEach(subItem => subItem.reset())
    this.customItemList.forEach(customItem => customItem.reset())
    if (this._select1) {
      this._select1.reset()
    }
  }

  getSelectInfo = () => {

  }

  // QueryFilter 调用此方法合成所有过滤请求参数
  getParam = () => {
    let result = {}
    const {paramName, useText} = this.props
    if (paramName && this.lastTypeItem) {
      result[paramName] = useText ? this.lastTypeItem.text : this.lastTypeItem.value
    }
    this.customItemList.forEach(customItem => {
      try {
        merge(result, customItem.getParam())
      } catch (e) {
        console.log('customItem 暂不支持getParam方法')
      }
    })
    this.subItemList.forEach(subItem => {
      try {
        merge(result, subItem.getParam())
      } catch (e) {
        console.log('subItem 暂不支持getParam方法')
      }
    })
    return result
  }

  // 添加自定义选项
  addCustomItem = (customItem) => {
    if (this.customItemList.indexOf(customItem) == -1) {
      this.customItemList.push(customItem)
    }
  }

  // 添加子选项
  addSubItem = (subItem) => {
    if (this.subItemList.indexOf(subItem) == -1) {
      this.subItemList.push(subItem)
    }
  }

  // 选择选项
  select = (typeItem) => {
    this.lastTypeItem = typeItem
    this.subItemList.forEach(subItem => subItem.onChange(typeItem))
    this.setState({'selected': typeItem.value})
    let {typeCode, typeText} = this.props.item
    this.props.onSelect(typeItem)
    this.context.updateFilterItem({typeCode, typeText, typeItem, filterItem: this})
  }

  selectCustom = (typeItem) => {
    this.lastTypeItem = null
    this.setState({'selected': null})
    let {typeCode, typeText} = this.props.item
    this.props.onSelect(typeItem)
    this.context.updateFilterItem({typeCode, typeText, typeItem, filterItem: this})
  }

  // 选择子选项
  selectSubItem = (title, value, text, errorTip) => {
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
  selectDefault = () => {
    this.setState({'selected': ''})
    this.subItemList.forEach(subItem => subItem.onChange(this.defaultItem))
    this.customItemList.forEach(customItem => customItem.reset())
    this.context.removeFilterItem(this.props.item.typeCode)
    if (this._select1) {
      this._select1.reset()
    }
  }

  render() {
    const {item} = this.props
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
      style.width = labelLength * 15
    }

    let sizeClass = ''
    if (!this.props.className && this.props.size) {
      sizeClass = this.props.size + sizeClass + '-filter-item'
    }

    return (
      <ul className={classnames(sizeClass, this.props.className)}>
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

  getChildContext() {
    return {
      selectCustom: this.selectCustom,
      selectSubItem: this.selectSubItem,
      addCustomItem: this.addCustomItem,
      addSubItem: this.addSubItem
    }
  }
}

FilterItem.defaultProps = {
  paramName: '',
  useText: false,
  size: 'middle',
  onSelect: () => {
  }
}

FilterItem.propTypes = {
  item: PropTypes.object,
  className: PropTypes.string,
  onSelect: PropTypes.func,

  size: PropTypes.oneOf(['small', 'middle', 'big']),
  paramName: PropTypes.string,
  useText: PropTypes.bool
}

FilterItem.contextTypes = {
  addFilterItem: PropTypes.func,
  updateFilterItem: PropTypes.func,
  removeFilterItem: PropTypes.func
}

FilterItem.childContextTypes = {
  selectCustom: PropTypes.func,
  selectSubItem: PropTypes.func,
  addCustomItem: PropTypes.func,
  addSubItem: PropTypes.func
}

export default FilterItem
