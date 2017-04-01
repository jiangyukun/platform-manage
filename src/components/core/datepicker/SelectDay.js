/**
 * Created by jiangyu2016 on 2016/10/23.
 */
import React, {Component} from 'react'

export default class SelectDay extends Component {

  render() {
    let showDay = () => {
      let days = []
      let dayRow
      for (let i = 1; i <= 30; i += 7) {
        dayRow = (
          <ul key={i} className="day-row">
            {getDayRow(i)}
          </ul>
        )
        days.push(dayRow)
      }
      return days
    }

    var getDayRow = start => {
      let dayRow = []
      for (let i = 0; i < 7; i++) {
        if (start + i <= 30) {
          dayRow.push((
            <li key={i} className="day" onClick={e => this.props.select(start + i)}>{start + i}</li>
          ))
        }
      }
      return dayRow
    }

    return this.props.show && (
        <div className="day-container">
          <ul className="one-to-seven">
            <li className="monday">一</li>
            <li className="tuesday">二</li>
            <li className="wednesday">三</li>
            <li className="thursday">四</li>
            <li className="friday">五</li>
            <li className="saturday">六</li>
            <li className="sunday">日</li>
          </ul>
          {showDay()}
        </div>
      )
  }
}
