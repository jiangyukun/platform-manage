/**
 * Created by jiangyukun on 2017/2/6.
 */
import React, {Component, PropTypes} from 'react'

import Spinner from '../ui/Spinner'

class Image extends Component {
  state = {
    loading: true,
    showLoading: false,
    width: 0,
    angle: 0
  }

  onLoad = () => {
    this.setState({loading: false, showLoading: false})
    this.setState({width: this._img.width, angle: 0})
  }

  zoomIn() {
    this.setState({width: this.state.width * 1.2, showReset: true})
  }

  zoomOut() {
    this.setState({width: this.state.width * 0.8, showReset: true})
  }

  rotate() {
    this.setState({angle: this.state.angle + 90, showReset: true})
  }

  reset() {
    this.setState({width: this._img.naturalWidth, angle: 0, showReset: false})
  }

  componentDidMount() {
    //延迟200ms后，如果图片还没有加载完成，显示loading
    setTimeout(() => {
      if (this.state.loading) {
        this.setState({showLoading: true})
      }
    }, 200)
  }

  render() {
    const style = {
      transform: 'rotate(' + this.state.angle + 'deg)',
      width: this.state.width || '100%'
    }
    return (
      <div style={{position: 'relative'}}>
        {this.state.showLoading && (
          <div style={{position: 'absolute', left: 0, right: 0, zIndex: 1}}>
            <Spinner/>
          </div>
        )}
        <img ref={c => this._img = c}
             src={this.props.src}
             style={style}
             onLoad={this.onLoad}/>
      </div>
    )
  }
}

export default Image
