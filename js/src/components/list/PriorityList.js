/**
 * Created by jiangyu2016 on 2017/3/12.
 */
import React from 'react'

class PriorityList extends React.Component {
  constructor(props) {
    super()
    this.state = {
      listPriority: this.initPriority(props.list.length)
    }
  }

  initPriority(size) {
    let list = []
    for (let i = 0; i < size; i++) {
      list.push(i)
    }
    return list
  }

  switchTo(curPosition, switchTo) {
    let t = this.state.listPriority[curPosition]
    this.state.listPriority[curPosition] = this.state.listPriority[switchTo]
    this.state.listPriority[switchTo] = t
  }

  componentWillReceiveProps() {

  }

  render() {
    let list = []
    for (let i = 0; i < this.state.listPriority.length; i++) {
      let priority = this.state.listPriority[i]
      list.push(this.props.list[priority])
    }
    return (
      <div>
        {list}
      </div>
    )
  }
}

PriorityList.propTypes = {
  list: React.PropTypes.array
}

export default PriorityList
