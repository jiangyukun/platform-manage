/**
 * 基于Flex的列表
 * Created by jiangyukun on 2017/3/6.
 */
import React, {Component, PropTypes} from 'react'
import Spinner from '../ui/Spinner'

class FlexList extends Component {
  onBodyScroll = (e) => {
    this.head.onBodyScroll(e)
  }

  setHead = (head) => {
    this.head = head
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
      weight: this.props.weight,
      onBodyScroll: this.onBodyScroll,
      setHead: this.setHead,
      minWidth: this.props.minWidth
    }
  }
}

FlexList.childContextTypes = {
  weight: PropTypes.array,
  minWidth: PropTypes.string,
  setHead: PropTypes.func,
  onBodyScroll: PropTypes.func
}

FlexList.propTypes = {
  weight: PropTypes.array,
  minWidth: PropTypes.string,
  loading: PropTypes.bool,
  total: PropTypes.number,
}

export default FlexList
