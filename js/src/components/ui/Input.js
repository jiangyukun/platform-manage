/**
 * Created by jiangyu2016 on 2016/10/19.
 */
import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import ToolTip from 'antd/lib/tooltip'

class Input extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {valid: this._getIsValid(props.value), touched: false, focus: false}
  }

  getInput() {
    return this._input
  }

  handleBlur() {
    this.setState({touched: true, focus: false})
  }

  handleChange(event) {
    this.props.onChange(event)
    const value = event.target.value
    setTimeout(() => this.setState({valid: this._getIsValid(value)}), 0)
  }

  isValid(value) {
    return this._getIsValid(value)
  }

  _getIsValid(value) {
    if (!this.props.format) {
      return !!value
    }
    const regex = new RegExp(this.props.format)
    return regex.test(value)
  }

  render() {
    let {className, errorTip, ...props} = this.props
    if (errorTip && typeof errorTip == 'string') {
      errorTip = <span>{errorTip}</span>
    }

    const getInput = () => {
      return (
        <input {...props}
               className={ classnames(className, {'invalid': !this.state.valid}, {'touched': this.state.touched})}
               ref={c => this._input = c}
               onFocus={e => this.setState({focus: true})}
               onBlur={ e => this.handleBlur()}
               onChange={e => this.handleChange(e)}/>
      )
    }

    if (this.props.format) {
      return (
        <ToolTip overlay={errorTip} visible={this.props.format && !this.state.valid && this.state.touched && this.state.focus}>
          {getInput()}
        </ToolTip>
      )
    }
    return getInput()
  }
}

Input.propTypes = {
  required: PropTypes.bool,
  onChange: PropTypes.func,
  format: PropTypes.string,
  errorTip: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
}

export default Input
