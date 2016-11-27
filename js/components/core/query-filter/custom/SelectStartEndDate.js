/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React, {Component, PropTypes} from 'react'
import DatePicker from 'antd/lib/date-picker'
import 'antd/dist/antd.css'
import classnames  from 'classnames'

class SelectStartEndDate extends Component {
    constructor(props, context) {
        super(props)
        this.startDate = null
        this.endDate = null
        this.state = {
            selected: false
        }
        context.addCustomItem(this)
    }

    onStartDateChange(moment) {
        this.startDate = moment.format('YYYY-MM-DD')
        this.switchToSelectState()
    }

    onEndDateChange(moment) {
        this.endDate = moment.format('YYYY-MM-DD')
        this.switchToSelectState()
    }

    switchToSelectState() {
        let errorTip = ''
        let text = ''
        if (!this.startDate && !this.endDate) {
            return
        }
        if (!this.startDate) {
            text = this.endDate + ' 之前'
        } else if (!this.endDate) {
            text = this.startDate + ' 之后'
        } else {
            text = this.startDate + ' 到 ' + this.endDate
            if (this.startDate > this.endDate) {
                errorTip = '开始时间不能大于结束时间！'
            }
        }
        this.setState({selected: true})
        this.context.select({
            value: (this.startDate || '') + ',' + (this.endDate || ''),
            text: text,
            errorTip: errorTip
        }, 'custom')
    }

    reset() {
        // this._startDate.clear()
        this.setState({selected: false})
    }

    render() {
        return (
            <div className={classnames('custom-item-wrap', {selected: this.state.selected})}>
                <DatePicker ref={c => this._startDate = c}
                            placeholder="开始时间"
                            size="small"
                            format="YYYY-MM-DD"
                            allowClear={true}
                            onChange={e => this.onStartDateChange(e)}/>

                -

                <DatePicker ref={c => this._endDate = c}
                            placeholder="结束时间"
                            size="small"
                            format="YYYY-MM-DD"
                            allowClear={true}
                            onChange={e => this.onEndDateChange(e)}/>
            </div>
        )
    }
}

SelectStartEndDate.contextTypes = {
    select: PropTypes.func,
    addCustomItem: PropTypes.func
}

export default SelectStartEndDate
