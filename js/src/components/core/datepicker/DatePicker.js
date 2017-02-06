/**
 * Created by jiangyu2016 on 2016/10/23.
 */
import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import {Modal} from 'react-overlays'
import {events} from 'dom-helpers'
import SelectYear from './SelectYear'
import SelectMonth from './SelectMonth'
import SelectDay from './SelectDay'

export default  class DatePicker extends Component {
  constructor() {
    super()
    this.handleContainerClick = this.handleContainerClick.bind(this)
    this.handleWindowClick = this.handleWindowClick.bind(this)
    this.flag = true
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

  handleContainerClick(event) {
    this.flag = true
  }

  handleWindowClick(event) {
    if (this.flag) {
      this.flag = false
      return
    }
    this.props.close()
  }

  componentWillReceiveProps(nextProps) {
    this.flag = true
    this.setState({showYear: true, showMonth: false, showDay: false})
  }

  componentDidMount() {
    let node = findDOMNode(this)
    if (!node) return
    events.on(node, 'click', this.handleContainerClick)
    events.on(document, 'click', this.handleWindowClick)
  }

  componentWillUnmount() {
    let node = findDOMNode(this)
    if (!node) return
    events.off(node, 'click', this.handleContainerClick)
    events.off(document, 'click', this.handleWindowClick)
  }

  render() {
    var showCurrentSelect = () => {
      let result = ''
      if (this.state.year) {
        result += this.state.year
      }
      if (this.state.month) {
        result += '-' + this.state.month
      }
      return result
    }

    return (
      <Modal show={this.props.show}>
        <div className="date-picker">
          <div className="dir-container clearfix">
            <div className="prev" onClick={e => this.prev()}>
              <i className="fa fa-lg fa-angle-left"></i>
            </div>
            <span className="current-select">{showCurrentSelect()}</span>
            <div className="next" onClick={e => this.next()}>
              <i className="fa fa-lg fa-angle-right"></i>
            </div>
          </div>
          <SelectYear show={this.state.showYear} select={year => this.selectYear(year)} ref={c => this.year = c}/>
          <SelectMonth show={this.state.showMonth} select={month => this.selectMonth(month)} ref={c => this.month = c}/>
          <SelectDay show={this.state.showDay} select={day => this.selectDay(day)} ref={c => this.day = c}/>
        </div>
      </Modal>
    )
  }
}
