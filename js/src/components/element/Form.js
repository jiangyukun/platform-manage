/**
 * Created by jiangyukun on 2016/11/27.
 */
import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import {events} from 'dom-helpers'

class Form extends Component {
  constructor() {
    super()
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit(event) {
    event.preventDefault()
  }

  componentDidMount() {
    events.on(findDOMNode(this), 'submit', this.handleFormSubmit)
  }

  componentWillUnmount() {
    events.off(findDOMNode(this), 'submit', this.handleFormSubmit)
  }

  render() {
    return (
      <form {...this.props}/>
    )
  }
}

export default Form
