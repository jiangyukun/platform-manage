/**
 * Created by jiangyukun on 2017/1/19.
 */
import React, {PropTypes} from 'react'

class FlexBodyWrap extends React.Component {
  componentDidUpdate() {
    this.context.setBodyScroll(this._body.scrollHeight > this._body.clientHeight)
  }

  render() {
    let style = this.props.style || {}
    if (this.context.minWidth) {
      style.minWidth = this.context.minWidth
    }

    return (
      <div ref={c => {this._body = c}} className="flex-list-items" onScroll={this.context.onBodyScroll}>
        <div style={style} className={this.props.className}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

FlexBodyWrap.contextTypes = {
  onBodyScroll: PropTypes.func,
  setBodyScroll: PropTypes.func,
  minWidth: PropTypes.string,
}

export default FlexBodyWrap
