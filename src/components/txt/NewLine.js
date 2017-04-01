/**
 * Created by jiangyukun on 2017/3/10.
 */
import React from 'react'

const NewLine = (props) => {
  const rows = (props.str || '').split(/\n/)
  return (
    <div>
      {
        rows.map((item, index) => {
          return (
            <div key={index}>{item}</div>
          )
        })
      }
    </div>
  )
}

NewLine.propTypes = {
  str: React.PropTypes.string
}

export default NewLine
