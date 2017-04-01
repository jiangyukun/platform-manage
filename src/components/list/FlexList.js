/**
 * 基于Flex的列表
 * Created by jiangyukun on 2017/3/6.
 */
import React, {Component, PropTypes} from 'react'
import Spinner from '../ui/Spinner'

class FlexList extends Component {
  state = {
    isBodyScroll: false
  }

  onBodyScroll = (e) => {
    this.head.onBodyScroll(e)
  }

  setHead = (head) => {
    this.head = head
  }

  setBodyScroll = (value) => {
    if (value != this.state.isBodyScroll)
      this.setState({isBodyScroll: value})
  }

  render() {
    let style = {}
    if (this.props.minWidth) {
      style.minWidth = this.props.minWidth
    }
    return (
      <div className="flex-list">
        <div className="flex-list-wrap">
          {this.props.children}
        </div>
        {
          this.props.loading && (
            <div className="spinner-layout">
              <Spinner/>
            </div>
          )
        }
        {
          this.props.total == 0 && !this.props.loading && (
            <div className="no-list-data">
              暂无数据
            </div>
          )
        }
      </div>
    )
  }

  getChildContext() {
    return {
      isBodyScroll: this.state.isBodyScroll,
      weight: this.props.weight,
      setBodyScroll: this.setBodyScroll,
      onBodyScroll: this.onBodyScroll,
      setHead: this.setHead,
      minWidth: this.props.minWidth
    }
  }
}

FlexList.childContextTypes = {
  isBodyScroll: PropTypes.bool,
  weight: PropTypes.array,
  minWidth: PropTypes.string,
  setHead: PropTypes.func,
  onBodyScroll: PropTypes.func,
  setBodyScroll: PropTypes.func,
}

FlexList.propTypes = {
  weight: PropTypes.array,
  minWidth: PropTypes.string,
  loading: PropTypes.bool,
  total: PropTypes.number,
}

export default FlexList
