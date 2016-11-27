/**
 * Created by jiangyukun on 2016/11/27.
 */
import React, {Component, PropTypes} from 'react'
import DatePicker from 'antd/lib/date-picker'
import classnames  from 'classnames'

class SubDateSelect extends Component {
    constructor(props, context) {
        super(props)
        this.state = {active: false}
        context.addSubItem(this)
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
        this.context.selectSubItem({
            value: (this.startDate || '') + ',' + (this.endDate || ''),
            text: text,
            errorTip: errorTip
        }, 'custom')
    }

    onChange(typeItem) {
        if (typeItem.value) {
            this.setState({active: true})
        } else {
            this.setState({active: false})
        }
    }

    reset() {
        this.setState({active: false})
    }

    render() {
        return (
            <div className={classnames('custom-item-wrap', {'hidden': !this.state.active})}>

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

SubDateSelect.contextTypes = {
    selectSubItem: PropTypes.func,
    addSubItem: PropTypes.func
}

export default SubDateSelect
