/**
 * Created by jiangyukun on 2017/2/6.
 */
import React, {Component, PropTypes} from 'react'

class Button extends Component {

  render() {

    return (
      <button className={'btn btn-' + this.props.type} {...this.props}/>
    )
  }
}

Button.propTypes = {
  type: PropTypes.string
}

export default Button
