/**
 * Created by jiangyukun on 2016/11/27.
 */
import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import Select1 from '../../Select1'

class SubOptions extends Component {
  constructor(props, context) {
    super(props, context)
    this.selectOption = this.selectOption.bind(this)
    this.state = {active: false}
    context.addSubItem(this)
  }

  // FilterItem 调用的方法(onChange, getParam)

  onChange(typeItem) {
    if (typeItem.value) {
      this.setState({active: true})
    } else {
      this.setState({active: false})
    }
    this._select1.reset()
  }

  getParam() {
    if (!this.lastOption) {
      return {}
    }
    let {text, value} = this.lastOption
    return {
      [this.props.paramName]: this.props.useText ? text : value
    }
  }

  // ------------------------------------

  selectOption(option) {
    let {text, value} = option
    this.lastOption = option
    this.context.selectSubItem(`，${this.props.title}：` + text, value, text)
  }

  reset() {
    this.setState({active: false})
    this.lastOption = null
    this._select1.reset()
  }

  render() {
    return (
      <div className={classnames('custom-item-wrap', {'hidden': !this.state.active})}>
        {this.props.title}：
        <span style={{width: '150px', display: 'inline-block'}}>
                    <Select1 ref={c => this._select1 = c} selectItems={this.props.options} onSelect={this.selectOption}/>
                </span>
      </div>
    )
  }
}

SubOptions.defaultProps = {
  options: []
}

SubOptions.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  paramName: PropTypes.string,
  useText: PropTypes.bool
}

SubOptions.contextTypes = {
  selectSubItem: PropTypes.func,
  addSubItem: PropTypes.func
}

export default SubOptions
