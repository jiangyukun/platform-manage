/**
 * Created by jiangyukun on 2017/1/19.
 */
import React from 'react'

class FlexBodyWrap extends React.Component {
  render() {
    let style = this.props.style || {}
    if (this.context.minWidth) {
      style.minWidth = this.context.minWidth
    }

    return (
      <div className="flex-list-items" onScroll={this.context.onBodyScroll}>
        <div style={style} className={this.props.className}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

FlexBodyWrap.contextTypes = {
  onBodyScroll: React.PropTypes.func,
  minWidth: React.PropTypes.string,
}

export default FlexBodyWrap
