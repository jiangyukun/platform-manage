/**
 * Created by jiangyukun on 2016/12/8.
 */
import React, {Component, PropTypes} from 'react'
import {render, findDOMNode, unmountComponentAtNode, unstable_renderSubtreeIntoContainer} from 'react-dom'

function show(ParentComponent, Component) {
  let context = document.createElement('div')

  function close() {
    if (!context) {
      return
    }
    unmountComponentAtNode(context)
    document.body.removeChild(context)
    context = null
  }

  document.body.appendChild(context)
  unstable_renderSubtreeIntoContainer(ParentComponent, Component, context)
  return close
}

export default  {
  show
}
