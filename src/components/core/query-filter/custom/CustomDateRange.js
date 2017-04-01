/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React, {Component, PropTypes} from 'react'
import DatePicker from 'antd/lib/date-picker'
import classnames from 'classnames'

class CustomDateRange extends Component {
  constructor(props, context) {
    super(props)
    this.startValue = null
    this.endValue = null
    this.state = {
      selected: false
    }
    context.addCustomItem(this)
  }

  onStartDateChange(moment) {
    this.startValue = moment
    this.switchToSelectState()
  }

  onEndDateChange(moment) {
    this.endValue = moment
    this.switchToSelectState()
  }

  switchToSelectState() {
    if (!this.startValue && !this.endValue) {
      return
    }
    let errorTip = ''
    let text = ''
    let startText = this.startValue && this.startValue.format('YYYY-MM-DD')
    let endText = this.endValue && this.endValue.format('YYYY-MM-DD')

    if (!startText) {
      text = endText + ' 之前'
    } else if (!endText) {
      text = startText + ' 之后'
    } else {
      text = startText + ' 到 ' + endText
      if (startText > endText) {
        errorTip = '开始时间不能大于结束时间！'
      }
    }
    this.setState({selected: true})
    this.context.selectCustom({
      value: (startText || '') + ',' + (endText || ''),
      text: text,
      errorTip: errorTip
    })
  }

  reset() {
    this.startValue = null
    this.endValue = null
    this.setState({selected: false})
  }

  getParam() {
    if (!this.props.startName || !this.props.endName) {
      console.log('未设置（startName或endName）参数名请勿调用此方法')
      return {}
    }
    if (this.startValue || this.endValue) {
      const startText = this.startValue && this.startValue.format('YYYY-MM-DD')
      const endText = this.endValue && this.endValue.format('YYYY-MM-DD')
      return {
        [this.props.startName]: startText,
        [this.props.endName]: endText
      }
    }
    return {}
  }

  render() {
    return (
      <div className={classnames('custom-item-wrap', {selected: this.state.selected})}>
                <span style={{display: 'inline-block', width: '100px'}}>
                    <DatePicker inputPrefixCls="my-input"
                                placeholder="开始时间"
                                size="small"
                                format="YYYY-MM-DD"
                                value={this.startValue}
                                onChange={e => this.onStartDateChange(e)}/>
                </span>
        -
        <span style={{display: 'inline-block', width: '100px'}}>
                     <DatePicker inputPrefixCls="my-input"
                                 placeholder="结束时间"
                                 size="small"
                                 format="YYYY-MM-DD"
                                 value={this.endValue}
                                 onChange={e => this.onEndDateChange(e)}/>
                </span>

      </div>
    )
  }
}

CustomDateRange.propTypes = {
  startName: PropTypes.string,
  endName: PropTypes.string
}

CustomDateRange.contextTypes = {
  selectCustom: PropTypes.func,
  addCustomItem: PropTypes.func
}

export default CustomDateRange
