/**
 * Created by jiangyu2016 on 2016/10/23.
 */
import React, {Component} from 'react'

import SelectYear from './SelectYear'
import SelectMonth from './SelectMonth'
import SelectDay from './SelectDay'

export default  class DatePicker extends Component {
    constructor() {
        super()
        this.state = {
            showYear: true,
            showMonth: false,
            showDay: false,
            year: null,
            month: null,
            day: null
        }
    }

    prev() {
        if (this.state.showYear) {
            this.year.prev()
        }
        if (this.state.showMonth) {
            this.month.prev()
        }
        if (this.state.showDay) {
            this.day.prev()
        }
    }

    next() {
        if (this.state.showYear) {
            this.year.next()
        }
        if (this.state.showMonth) {
            this.month.next()
        }
        if (this.state.showDay) {
            this.day.next()
        }
    }

    selectYear(year) {
        this.setState({showYear: false, showMonth: true, showDay: false, year})
    }

    selectMonth(month) {
        this.setState({showYear: false, showMonth: false, showDay: true, month})
    }

    selectDay(day) {
        this.setState({showYear: false, showMonth: false, showDay: false, day})
        this.props.close()
    }

    componentWillReceiveProps(nextProps) {
        this.setState({showYear: true, showMonth: false, showDay: false})
    }

    render() {
        var showCurrentSelect = ()=> {
            let result = ''
            if (this.state.year) {
                result += this.state.year
            }
            if (this.state.month) {
                result += '-' + this.state.month
            }
            return result
        }

        return this.props.show && (
                <div className="date-picker">
                    <div className="dir-container clearfix">
                        <div className="prev" onClick={e=>this.prev()}>
                            <i className="fa fa-lg fa-angle-left"></i>
                        </div>
                        <span className="current-select">{showCurrentSelect()}</span>
                        <div className="next" onClick={e=>this.next()}>
                            <i className="fa fa-lg fa-angle-right"></i>
                        </div>
                    </div>
                    <SelectYear show={this.state.showYear} select={year=>this.selectYear(year)} ref={c=>this.year = c}/>
                    <SelectMonth show={this.state.showMonth} select={month=>this.selectMonth(month)} ref={c=>this.month = c}/>
                    <SelectDay show={this.state.showDay} select={day=>this.selectDay(day)} ref={c=>this.day = c}/>
                </div>
            )
    }
}
