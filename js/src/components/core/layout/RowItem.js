/**
 * Created by jiangyukun on 2017/1/19.
 */
import React, {Component, PropTypes, Children} from 'react'

import {getMatchTextList} from '../../../core/utils'

class RowItem extends Component {
  render() {
    const style = {}
    if (this.props.width) {
      style.width = this.props.width
    }
    if (this.props.flex) {
      style.flex = this.props.flex
    }

    let textList = this.props.children
    if (this.props.highlight && this.props.matchText) {
      textList = Children.map(this.props.children, child => {
        if (typeof child != 'string') {
          return child
        }
        const matches = getMatchTextList(child, this.props.matchText)
        return (
          <span>
            {
              matches.map((match, index) => {
                if (match == this.props.matchText) {
                  return <span key={index} style={{color: 'red'}}>{this.props.matchText}</span>
                }
                return match
              })
            }
          </span>
        )
      })
    }

    return (
      <li className="item" style={style}>
        {textList}
      </li>
    )
  }
}

RowItem.propTypes = {
  width: PropTypes.number,
  flex: PropTypes.number,
  highlight: PropTypes.bool,
  matchText: PropTypes.string
}

export default RowItem
