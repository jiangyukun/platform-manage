/**
 * Created by jiangyukun on 2017/3/3.
 */
import React, {Component, PropTypes} from 'react'

class CheckItem extends Component {
  state = {
    empty: true
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
  onReset: () => {}
}

CheckItem.propTypes = {
  label: PropTypes.string,
  btnName: PropTypes.string,
  onReset: PropTypes.func
}

export default CheckItem
