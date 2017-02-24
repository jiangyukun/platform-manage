/**
 * Created by jiangyukun on 2017/2/24.
 */
import React, {Children, PropTypes} from 'react'
import {getMatchTextList} from '../../core/utils'

const HighLight = (props) => {
  let handledText = Children.map(props.children, child => {
    if (typeof child != 'string') {
      return child
    }
    const matches = getMatchTextList(child, props.match)
    return (
      <span>
            {
              matches.map((m, index) => {
                if (m == props.match) {
                  return <span key={index} style={{color: '#f05050'}}>{props.match}</span>
                }
                return m
              })
            }
          </span>
    )
  })
  return (
    <span>{handledText}</span>
  )
}

HighLight.propTypes = {
  match: PropTypes.string
}

export default HighLight
