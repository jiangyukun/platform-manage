/**
 * Created by jiangyukun on 2017/2/22.
 */
import React, {Component, PropTypes} from 'react'

import Tabs from 'react-bootstrap/lib/Tabs'
import Tab from 'react-bootstrap/lib/Tab'
import TabSingleChat from './TabSingleChat'
import TabGroupChat from './TabGroupChat'

class HistoryMessageStatistics extends Component {
  state = {
    key: 1
  }

  handleSelect = key => {
    this.setState({key})
  }

  render() {
    return (
      <div className="app-function-page history-message-statistics">
        <Tabs id="tabs" activeKey={this.state.key} onSelect={this.handleSelect} className="flex-full" style={{marginTop: '10px'}}>
          <Tab title="个人聊天记录" eventKey={1}>
            <TabSingleChat {...this.props}/>
          </Tab>
          <Tab title="群组聊天记录" eventKey={2}>
            <TabGroupChat {...this.props}/>
          </Tab>
          {/*<Tab title="群组人数统计" eventKey={3}></Tab>*/}
        </Tabs>
      </div>
    )
  }
}

export default HistoryMessageStatistics
