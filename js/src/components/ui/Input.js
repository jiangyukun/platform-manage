/**
 * Created by jiangyu2016 on 2016/10/19.
 */
import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import ToolTip from 'antd/lib/tooltip'

class Input extends Component {
    constructor() {
        super()
        this.state = {invalid: true, touched: false, focus: false}
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
        setTimeout(() => {
            if (!this.props.format) {
                this.setState({invalid: !value})
            } else {
                const regex = new RegExp(this.props.format)
                this.setState({invalid: !regex.test(value)})
            }
        }, 0)
    }

    render() {
        let {className, errorTip, ...props} = this.props

        const getInput = () => {
            return (
                <input {...props}
                       className={ classnames(className, {'invalid': this.state.invalid}, {'touched': this.state.touched})}
                       ref={c => this._input = c}
                       onFocus={e => this.setState({focus: true})}
                       onBlur={ e => this.handleBlur()}
                       onChange={e => this.handleChange(e)}/>
            )
        }

        if (this.props.format) {
            return (
                <ToolTip overlay={errorTip} visible={this.props.format && this.state.invalid && this.state.touched && this.state.focus}>
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
    errorTip: PropTypes.element
}

export default Input
