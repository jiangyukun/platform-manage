/**
 * Created by jiangyukun on 2017/3/10.
 */
import React from 'react'
import {NewLine} from './'

class PopOverTxt extends React.Component {

  state = {
    show: false
  }

  handleMouseEnter = e => {
    this.willAppear = true
    this.willDisappear = false
    setTimeout(() => {
      if (this.willAppear == true) {
        this.setState({show: true})
      }
    }, 300)
  }

  handleMouseLeave = e => {
    this.willAppear = false
    this.willDisappear = true
    setTimeout(() => {
      if (this.willDisappear == true) {
        this.setState({show: false})
      }
    }, 50)
  }

  render() {
    const str = this.props.str || ''
    let cut = false
    if (str.length > 20) {
      cut = true
    }

    return (
      <div className="relative"
           onMouseEnter={this.handleMouseEnter}
           onMouseLeave={this.handleMouseLeave}
      >
        <NewLine str={cut ? str.substring(0, 19) + '...' : str}/>
        {
          this.state.show && cut && (
            <div className="txt-popover-container" style={{top: '20px'}}>
              <div className="popover bottom show">
                <div className="popover-title"></div>
                <div className="arrow"></div>
                <div className="popover-content">
                  <NewLine str={str}></NewLine>
                </div>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

PopOverTxt.propTypes = {
  str: React.PropTypes.string
}

export default PopOverTxt
