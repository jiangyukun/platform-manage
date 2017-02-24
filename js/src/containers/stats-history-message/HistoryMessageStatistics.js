/**
 * Created by jiangyukun on 2017/2/22.
 */
import React, {Component, PropTypes} from 'react'

import Tabs from 'react-bootstrap/lib/Tabs'
import Tab from 'react-bootstrap/lib/Tab'
import ImagePreview from '../../components/core/ImagePreview'
import TabSingleChat from './TabSingleChat'
import TabGroupChat from './TabGroupChat'

class HistoryMessageStatistics extends Component {
  state = {
    key: 1,
    showImage: false,
    imageUrl: null
  }

  handleSelect = key => {
    this.setState({key})
  }

  previewImage = (url) => {
    this.setState({showImage: true, imageUrl: url})
  }

  render() {
    return (
      <div className="app-function-page history-message-statistics">
        {
          this.state.showImage && (
            <ImagePreview url={this.state.imageUrl} onExited={() => this.setState({showImage: false})}/>
          )
        }
        <Tabs id="tabs" activeKey={this.state.key} onSelect={this.handleSelect} className="flex-full" style={{marginTop: '10px'}}>
          <Tab title="个人聊天记录" eventKey={1}>
            <TabSingleChat {...this.props} previewImage={this.previewImage}/>
          </Tab>
          <Tab title="群组聊天记录" eventKey={2}>
            <TabGroupChat {...this.props} previewImage={this.previewImage}/>
          </Tab>
          {/*<Tab title="群组人数统计" eventKey={3}></Tab>*/}
        </Tabs>
      </div>
    )
  }
}

export default HistoryMessageStatistics
