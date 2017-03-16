/**
 * Created by jiangyu2016 on 16/10/15.
 */
import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {merge} from 'lodash'
import CssTransitionGroup from 'react-addons-css-transition-group'
import {connect} from 'react-redux'
import classnames from 'classnames'
import Modal from 'antd/lib/modal'
import notification from 'antd/lib/notification'
import ImagePreview from '../components/core/ImagePreview'

import constants from '../core/constants'
import {fetchMessageInfo, markMessageState} from '../actions/message'
import {setLaboratorySheetNeedRefresh} from '../actions/app'
import {closeMessagePanel} from '../actions/header'
import * as antdUtil from '../core/utils/antdUtil'
import {markSheetItem}  from './laboratory-sheet/laboratory-sheet'

class Message extends Component {
  constructor(props) {
    super(props)

    this.loadedMessageCount = 0
    this.start = 0
    this.state = {
      index: -1,
      showPhoto: false,
      photoUrl: null
    }
  }

  fetch() {
    this.props.fetchMessageInfo({start: this.start, length: 10})
  }

  close = () => {
    this.props.closeMessagePanel()
  }

  markUnRead = (msg) => {
    const {markMessageState} = this.props
    Modal.confirm({
      title: '提示',
      content: '确定标为未读吗？',
      onOk: () => {
        markMessageState(msg['id'], constants.messageState.unread).then(() => {
          notification.success({message: '提示', description: '标为未读成功！'})
        }, () => {
          notification.error({message: '提示', description: '标为未读失败！'})
        })
      }
    })
  }

  markHasRead = (msg) => {
    const {markMessageState} = this.props
    Modal.confirm({
      title: '提示',
      content: '确定标为已读吗？',
      onOk() {
        markMessageState(msg['id'], constants.messageState.read).then(() => {
          notification.success({message: '提示', description: '标为已读成功！'})

        }, () => {
          notification.error({message: '提示', description: '标为已读失败！'})
        })
      }
    })
  }

  loadMoreMessage() {
    this.start += 1
    this.fetch()
  }

  markRecorded = () => {
    this._mark('确定标为已录入吗？', '标为已录入成功！', constants.laboratoryState.RECORDED)
  }

  markUnPass = () => {
    this._mark('确定标为未录入吗？', '标为未录入成功！', constants.laboratoryState.UN_RECORDED)
  }

  markInvalid = () => {
    this._mark('确定标为无效吗？', '标为无效成功！', constants.laboratoryState.INVALID)
  }

  _mark(messageStart, messageSuccess, sheetType) {
    const assayId = this.props.message.messageList[this.state.index]['assayId']
    antdUtil.confirm(messageStart, () => {
      this.props.markSheetItem(assayId, sheetType)
        .then(antdUtil.tipSuccess(messageSuccess), err => antdUtil.tipErr(err))
        .then(this.setState({showPhoto: false}))
        .then(this.props.setLaboratorySheetNeedRefresh())
    })
  }

  componentDidMount() {
    this.fetch()
  }

  render() {
    let show = !this.props.app.settings.asideMessage
    return (
      <CssTransitionGroup transitionName="my-slide-left" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
        {
          this.state.showPhoto && (
            <ImagePreview url={this.state.photoUrl} onExited={() => this.setState({showPhoto: false})} showCloseButton={false}>
              <ImagePreview.ToolButton>
                <button className="ngdialog-button ngdialog-button-primary" onClick={this.markRecorded}>标为已录入</button>
              </ImagePreview.ToolButton>
              <ImagePreview.ToolButton>
                <button className="ngdialog-button ngdialog-button-secondary" onClick={this.markUnPass}>标为未录入</button>
              </ImagePreview.ToolButton>
              <ImagePreview.ToolButton>
                <button className="ngdialog-button ngdialog-button-secondary" onClick={this.markInvalid}>标为无效</button>
              </ImagePreview.ToolButton>
            </ImagePreview>
          )
        }
        {
          show && (
            <div className="app-message">
              <aside className="message-container">
                <div className="close-arrow" onClick={this.close}></div>
                <div className="message-wrap">
                  <ul className="app-message-list">
                    {
                      this.props.message.messageList.map((msg, index) => {
                        return (
                          <li key={msg.id} className={classnames('message-item', {'unread': msg.messageState == constants.messageState.unread})}>
                            <div>
                              新化验单
                              {
                                msg.readState == '2' && (
                                  <div className={classnames('message-state pull-right', {'unread': msg.messageState == constants.messageState.unread})}>
                                    {msg.readState}
                                  </div>
                                )
                              }
                            </div>
                            <div>患者名称： {msg.name}</div>
                            <div>手机号： {msg.mobile}</div>
                            <div>上传人： {msg.uploader}</div>
                            <div>上传时间： {msg.uploadDate}</div>
                            <div className="message-look-btn">
                              <button className="msg-btn full" onClick={e => this.setState({showPhoto: true, photoUrl: msg.url, index})}>
                                查看
                              </button>
                            </div>
                            <div className="clearfix">
                              <button className="msg-btn pull-left" onClick={e => this.markUnRead(msg)}>标为未读</button>
                              <button className="msg-btn pull-right" onClick={e => this.markHasRead(msg)}>标为已读</button>
                            </div>
                          </li>
                        )
                      })
                    }
                  </ul>
                  {
                    this.loadedMessageCount < this.props.message.count && (
                      <div><p className="load-more-message" onClick={e => this.loadMoreMessage()}>加载更多</p></div>
                    )
                  }
                </div>
              </aside>
            </div>
          )}
      </CssTransitionGroup>
    )
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    message: state.message
  }
}

function mapActionToProps(dispatch, ownProps) {
  return merge({}, bindActionCreators({
    setLaboratorySheetNeedRefresh
  }, dispatch), {
    markMessageState: markMessageState(dispatch),
    closeMessagePanel: () => dispatch(closeMessagePanel()),
    fetchMessageInfo: fetchMessageInfo(dispatch),
    markSheetItem: markSheetItem(dispatch)
  })
}

export default connect(mapStateToProps, mapActionToProps)(Message)
