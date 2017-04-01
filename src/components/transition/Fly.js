/**
 * Created by jiangyukun on 2017/3/2.
 */
import React from 'react'
import {Transition} from 'react-overlays'
import classnames from 'classnames'

const Fly = (props) => {
  return (
    <Transition
      {...props}
      className={classnames(props.className, 'fly')}
      enteredClassName="in"
      enteringClassName="in"/>
  )
}

export default Fly
