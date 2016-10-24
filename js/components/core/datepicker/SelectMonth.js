/**
 * Created by jiangyu2016 on 2016/10/23.
 */
import React, {Component} from 'react'

export default class SelectMonth extends Component {

    render() {

        var showMonth = () => {
            let months = []
            let monthRow
            for (let i = 1; i <= 12; i += 3) {
                monthRow = (
                    <ul key={i} className="month-row">
                        {getMonthRow(i)}
                    </ul>
                )
                months.push(monthRow)
            }
            return months
        }

        var getMonthRow = (start)=> {
            let monthRow = []
            for (let i = 0; i < 3; i++) {
                if (start + i <= 12) {
                    monthRow.push((
                        <li key={i} className="month" onClick={e=>this.props.select(start + i)}>{start + i}</li>
                    ))
                }
            }
            return monthRow
        }

        return this.props.show && (
                <div className="month-container">
                    {showMonth()}
                </div>
            )
    }
}
