/**
 * jiangyukun on 2016/9/8 11:26
 */
import React, {Component} from 'react'

export default class Loading extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="rotate">
        <div className="rotate-container container1">
          <div className="circle1"></div>
          <div className="circle2"></div>
          <div className="circle3"></div>
          <div className="circle4"></div>
        </div>
        <div className="rotate-container container2">
          <div className="circle1"></div>
          <div className="circle2"></div>
          <div className="circle3"></div>
          <div className="circle4"></div>
        </div>
        <div className="rotate-container container3">
          <div className="circle1"></div>
          <div className="circle2"></div>
          <div className="circle3"></div>
          <div className="circle4"></div>
        </div>
      </div>
    )
  }
}
