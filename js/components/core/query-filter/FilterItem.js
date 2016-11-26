/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React, {Component} from 'react'
import classnames from 'classnames'
import Select1 from '../Select1'

export default class FilterItem extends Component {

    constructor(props) {
        super(props)
        this.state = {selected: '', labelWidth: -1}
    }

    select(typeItem) {
        this.setState({'selected': typeItem.value})
        let {typeCode, typeText} = this.props.item

        this.props.updateFilterItem({typeCode, typeText, typeItem, filterItem: this})
    }

    selectDefault() {
        this.setState({'selected': ''})
        this.props.removeFilterItem(this.props.item.typeCode)
    }

    reset() {
        this.setState({'selected': ''})
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
            return this.props.item.typeItemList.map((typeItem, index) => {
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
                    <Select1 ref={c=>this._select1 = c} selectItems={this.props.item.typeItemList} onSelect={option => this.select(option)}/>
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
                </li>

            </ul>
        )
    }
}
