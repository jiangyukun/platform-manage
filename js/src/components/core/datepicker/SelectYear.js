/**
 * Created by jiangyu2016 on 2016/10/23.
 */
import React, {Component} from 'react'

export default class SelectYear extends Component {
    constructor(props) {
        super(props)
        this.state = {
            year: 2016
        }
    }

    prev() {
        this.setState({year: this.state.year - 10})
    }

    next() {
        this.setState({year: this.state.year + 10})
    }

    render() {
        let startYear = this.state.year - (this.state.year % 10)

        var showYear = () => {
            let years = []
            let yearRow
            for (let i = 0; i < 10; i += 4) {
                yearRow = (
                    <ul key={i} className="year-row">
                        {getYearRow(startYear, i)}
                    </ul>
                )
                years.push(yearRow)
            }
            return years
        }

        var getYearRow = (startYear, start)=> {
            let yearRow = []
            for (let i = 0; i < 4; i++) {
                if (start + i < 10) {
                    yearRow.push((
                        <li key={i} className="year" onClick={e=>this.props.select(startYear + start + i)}>{startYear + start + i}</li>
                    ))
                }
            }
            return yearRow
        }

        return this.props.show && (
                <div className="select-year">
                    {showYear()}
                </div>
            )
    }
}
