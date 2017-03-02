/**
 * Created by jiangyukun on 2017/3/2.
 */
import React, {Component, PropTypes} from 'react'

import Button from '../../components/element/Button'
import AddDialog from './AddDialog'

class SmartAnalyticSystem extends Component {
  state = {
    add: false
  }

  render() {
    return (
      <div className="app-function-page">
        {
          this.state.add && (
            <AddDialog onExited={() => this.setState({add: false})}/>
          )
        }
        <div>
          <Button type="primary" onClick={() => this.setState({add: true})}>新增</Button>
          <button>查看</button>
          <div>
            <input placeholder="输入关键字查询建议、备注"/>
            <button>搜索</button>
          </div>
        </div>

        <div>

        </div>
      </div>
    )
  }
}

export default SmartAnalyticSystem
