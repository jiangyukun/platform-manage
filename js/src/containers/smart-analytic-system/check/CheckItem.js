/**
 * Created by jiangyukun on 2017/3/3.
 */
import React, {Component, PropTypes} from 'react'

class CheckItem extends Component {
  constructor(props) {
    super()
    this.state = {
      empty: props.empty
    }
  }

  reset = () => {
    this.setState({empty: true})
    this.props.onReset()
  }

  render() {
    return (
      <section className="check-item">
        <label className="check-item-label">
          <span>{this.props.label}：</span>
        </label>
        {
          this.state.empty && (
            <button className="add-item-btn" onClick={() => this.setState({empty: false})}>{this.props.btnName}</button>
          )
        }
        {
          !this.state.empty && (
            <div className="check-item-content">{this.props.children}</div>
          )
        }
        {
          !this.state.empty && (
            <div className="clear-item">
              <button className="clear-item-btn" onClick={this.reset}>重置此条</button>
            </div>
          )
        }
      </section>
    )
  }
}

CheckItem.defaultProps = {
  empty: true,
  onReset: () => {}
}

CheckItem.propTypes = {
  empty: PropTypes.bool,
  label: PropTypes.string,
  btnName: PropTypes.string,
  onReset: PropTypes.func
}

export default CheckItem
