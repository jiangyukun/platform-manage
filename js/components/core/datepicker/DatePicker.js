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
            showDay: false
        }
    }

    render() {
        return (
            <div className="date-picker">
                <SelectYear show={this.state.showYear}/>
                <SelectMonth show={this.state.showMonth}/>
                <SelectDay show={this.state.showDay}/>
            </div>
        )
    }
}
