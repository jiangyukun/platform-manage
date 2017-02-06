/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'

class CustomTextInput extends Component {
  constructor(props, context) {
    super(props)
    context.addCustomItem(this)
    this.state = {
      value: '',
      selected: false
    }
  }

  handleInputChange(e) {
    const value = e.target.value
    this.setState({value: value, selected: !!value})
    this.context.selectCustom({
      value,
      text: value
    })
  }

  reset() {
    this.setState({value: '', selected: false})
  }

  getParam() {
    if (!this.props.textName) {
      return {}
    }
    if (!this.state.selected || !this.state.value) {
      return {}
    }
    return {
      [this.props.textName]: this.state.value
    }
  }

  render() {
    return (
      <div className={classnames('custom-item-wrap', {selected: this.state.selected})}>
        <input value={this.state.value}
               className={classnames('custom-text-search', this.props.className)}
               placeholder={this.props.placeholder}
               onChange={e => this.handleInputChange(e)}/>
      </div>
    )
  }
}

CustomTextInput.propTypes = {
  textName: PropTypes.string
}

CustomTextInput.contextTypes = {
  selectCustom: PropTypes.func,
  addCustomItem: PropTypes.func
}

CustomTextInput.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
}

export default CustomTextInput
