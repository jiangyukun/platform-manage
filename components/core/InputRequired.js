/**
 * Created by jiangyu2016 on 2016/10/19.
 */


import React, {Component, createElement} from 'react'
import classnames from 'classnames'

export default class InputRequired extends Component {

    constructor() {
        super()
        this.state = {invalid: true, touched: false}
    }

    blur(event) {
        this.setState({touched: true})
        if (!event.target.value) {
            this.setState({invalid: true})
        } else {
            this.setState({invalid: false})
        }
    }

    input(event) {
        this.setState({touched: true})
        if (!event.target.value) {
            this.setState({invalid: true})
        } else {
            this.setState({invalid: false})
        }
    }

    render() {
        let {className, ...props} = this.props
        return createElement('input', {
            ...props,
            onBlur: e=>this.blur(e),
            onInput: e=>this.input(e),
            className: classnames(className, {'invalid': this.state.invalid}, {'touched': this.state.touched})
        })
    }
}
